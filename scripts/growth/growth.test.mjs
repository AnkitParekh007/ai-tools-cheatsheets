import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAiPromptInput,
  buildFallbackReport,
  calculateGrowthDeltas,
  calculateSingleDelta,
  DEFAULT_CONFIG,
  filterAvailableLabels,
  findIssueByMarker,
  issueMarker,
  validateConfig,
  validateSnapshot
} from "./lib/core.mjs";
import { resolveProvider } from "./lib/ai.mjs";
import { formatGitHubError, getRetryDelay } from "./lib/github.mjs";

function createSnapshot(overrides = {}) {
  return {
    schemaVersion: 1,
    repository: "AnkitParekh007/ai-tools-cheatsheets",
    collectedAt: "2026-07-16T08:00:00.000Z",
    reportDate: "2026-07-16",
    period: {
      start: "2026-07-09T08:00:00.000Z",
      end: "2026-07-16T08:00:00.000Z",
      days: 7,
      timezone: "Asia/Kolkata"
    },
    repositoryMetrics: {
      stars: 10,
      forks: 2,
      subscribers: 1,
      watchers: 1,
      openIssues: 4,
      openPullRequests: 2,
      sizeKb: 1000,
      totalReleases: 0,
      contributorCount: 3
    },
    issueMetrics: {
      newIssues: 2,
      closedIssues: 1,
      openIssues: 4,
      goodFirstIssueOpen: 1,
      helpWantedOpen: 1,
      issueComments: 3,
      mostActiveIssues: [],
      openIssuesWithoutMaintainerResponse: null
    },
    pullRequestMetrics: {
      newPullRequests: 2,
      mergedPullRequests: 1,
      closedWithoutMerge: 0,
      openPullRequests: 2,
      firstTimeContributors: 1,
      repeatContributors: 1,
      averageTimeToMergeHours: 12.5,
      awaitingReview: 1,
      mostActivePullRequests: []
    },
    contributorMetrics: {
      currentContributorCount: 3,
      commitsDuringPeriod: 5,
      newContributors: 1,
      repeatContributors: 1,
      acceptedContributors: [],
      commitAuthors: []
    },
    releaseMetrics: {
      releasesPublished: 0,
      latestRelease: null,
      totalReleases: 0,
      daysSinceLastRelease: null,
      tagsCreated: null
    },
    discussionMetrics: {
      newDiscussions: 0,
      newComments: 0,
      answeredDiscussions: 0,
      unansweredQuestions: 0,
      mostActiveDiscussions: []
    },
    trafficMetrics: {
      views: {
        count: 20,
        uniqueDailySumApproximation: 12
      },
      clones: {
        count: 4,
        uniqueDailySumApproximation: 3
      },
      topReferrers: [],
      topPaths: []
    },
    externalMetrics: {
      websiteAnalytics: { status: "unavailable" },
      searchConsole: { status: "unavailable" },
      linkedinCampaigns: { status: "unavailable" }
    },
    availability: {
      repositoryMetrics: { status: "available" },
      issueMetrics: { status: "available" },
      pullRequestMetrics: { status: "available" },
      contributorMetrics: { status: "available" },
      releaseMetrics: { status: "available" },
      discussionMetrics: { status: "unavailable", reason: "disabled for test" },
      trafficMetrics: { status: "available" },
      externalMetrics: { status: "unavailable" }
    },
    warnings: [],
    errors: [],
    ...overrides
  };
}

test("config validation accepts the default configuration", () => {
  const result = validateConfig(DEFAULT_CONFIG);
  assert.equal(result.valid, true);
});

test("config validation rejects malformed repositories", () => {
  const result = validateConfig({ ...DEFAULT_CONFIG, repository: "broken" });
  assert.equal(result.valid, false);
});

test("snapshot validation rejects invalid schema shape", () => {
  const snapshot = createSnapshot({ collectedAt: "not-a-date" });
  const result = validateSnapshot(snapshot);
  assert.equal(result.valid, false);
});

test("delta calculation produces a baseline when no previous snapshot exists", () => {
  const delta = calculateGrowthDeltas(createSnapshot(), null);
  assert.equal(delta.mode, "baseline");
  assert.equal(delta.domains.repositoryMetrics.stars.direction, "baseline");
});

test("delta calculation handles normal week-over-week growth", () => {
  const current = createSnapshot();
  const previous = createSnapshot({
    repositoryMetrics: { ...createSnapshot().repositoryMetrics, stars: 7 }
  });
  const delta = calculateGrowthDeltas(current, previous);
  assert.equal(delta.mode, "comparison");
  assert.equal(delta.domains.repositoryMetrics.stars.absoluteChange, 3);
  assert.equal(delta.domains.repositoryMetrics.stars.direction, "increased");
});

test("delta calculation handles negative growth", () => {
  const result = calculateSingleDelta(10, 6, true);
  assert.equal(result.direction, "decreased");
  assert.equal(result.absoluteChange, -4);
});

test("delta calculation handles previous value of zero without fake percentages", () => {
  const result = calculateSingleDelta(0, 5, true);
  assert.equal(result.percentageChange, null);
  assert.equal(result.direction, "increased");
});

test("prompt input truncates oversized payloads for cost control", () => {
  const config = { ...DEFAULT_CONFIG, maxAiInputChars: 50 };
  const prompt = buildAiPromptInput({
    promptTemplate: "Analyze the project.",
    currentSnapshot: createSnapshot(),
    previousSnapshot: null,
    delta: calculateGrowthDeltas(createSnapshot(), null),
    config
  });
  assert.match(prompt, /truncated for cost control/);
});

test("fallback report includes the hidden weekly marker and baseline note", () => {
  const snapshot = createSnapshot();
  const delta = calculateGrowthDeltas(snapshot, null);
  const report = buildFallbackReport({
    config: DEFAULT_CONFIG,
    currentSnapshot: snapshot,
    previousSnapshot: null,
    delta,
    aiStatus: "skipped",
    aiStatusNote: "Missing AI key."
  });
  assert.match(report, new RegExp(issueMarker("2026-07-16").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(report, /Baseline report/);
});

test("label filtering avoids missing labels", () => {
  const labels = filterAvailableLabels(["documentation", "automation"], ["growth-report", "automation"]);
  assert.deepEqual(labels, ["automation"]);
});

test("duplicate weekly issue detection uses the hidden marker", () => {
  const issue = findIssueByMarker(
    [
      { number: 10, body: "plain text" },
      { number: 11, body: `${issueMarker("2026-07-16")}\nreport body` }
    ],
    "2026-07-16"
  );
  assert.equal(issue.number, 11);
});

test("provider resolution falls back cleanly when no AI key exists", () => {
  const provider = resolveProvider({ config: DEFAULT_CONFIG, openAiApiKey: "", anthropicApiKey: "" });
  assert.equal(provider, "none");
});

test("provider resolution prefers OpenAI in auto mode when available", () => {
  const provider = resolveProvider({ config: DEFAULT_CONFIG, openAiApiKey: "token", anthropicApiKey: "token-2" });
  assert.equal(provider, "openai");
});

test("formatGitHubError preserves rate-limit messages without secrets", () => {
  const error = formatGitHubError(
    { status: 403, statusText: "Forbidden" },
    { message: "API rate limit exceeded", documentation_url: "https://docs.github.com" }
  );
  assert.match(error, /API rate limit exceeded/);
  assert.doesNotMatch(error, /gho_/);
});

test("retry delay honors explicit retry-after headers", () => {
  const response = {
    headers: new Headers({
      "retry-after": "7"
    })
  };
  assert.equal(getRetryDelay(response, 0), 7000);
});

test("retry delay falls back to bounded rate-limit resets", () => {
  const response = {
    headers: new Headers({
      "x-ratelimit-remaining": "0",
      "x-ratelimit-reset": String(Math.floor((Date.now() + 120000) / 1000))
    })
  };
  assert.equal(getRetryDelay(response, 0), 60000);
});

test("empty activity weeks still generate usable fallback sections", () => {
  const snapshot = createSnapshot({
    issueMetrics: { ...createSnapshot().issueMetrics, newIssues: 0, closedIssues: 0, issueComments: 0 },
    pullRequestMetrics: { ...createSnapshot().pullRequestMetrics, newPullRequests: 0, mergedPullRequests: 0, awaitingReview: 0 },
    contributorMetrics: { ...createSnapshot().contributorMetrics, commitsDuringPeriod: 0, newContributors: 0, repeatContributors: 0 }
  });
  const report = buildFallbackReport({
    config: DEFAULT_CONFIG,
    currentSnapshot: snapshot,
    previousSnapshot: createSnapshot(),
    delta: calculateGrowthDeltas(snapshot, createSnapshot()),
    aiStatus: "skipped",
    aiStatusNote: "No AI key configured."
  });
  assert.match(report, /Three Priorities for Next Week/);
});
