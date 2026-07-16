import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
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
import { collectExternalMetrics } from "./lib/external-adapters.mjs";
import { formatGitHubError, getFirstMaintainerResponse, getRetryDelay, summarizeMaintainerResponseAnalysis } from "./lib/github.mjs";

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
      openIssuesWithoutMaintainerResponse: 1,
      averageHoursToFirstMaintainerResponse: 12.5,
      firstMaintainerResponseByAssociation: { OWNER: 1 }
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
      openPullRequestsWithoutMaintainerResponse: 1,
      averageHoursToFirstMaintainerResponse: 6.75,
      firstMaintainerResponseByAssociation: { MEMBER: 1 },
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
      websiteAnalytics: { status: "disabled" },
      searchConsole: {
        status: "available",
        totals: {
          clicks: 20,
          impressions: 400,
          ctr: 0.05
        },
        topQueries: [{ query: "codex cli", clicks: 8 }],
        topPages: []
      },
      linkedinCampaigns: {
        status: "available",
        totals: {
          postsPublished: 2,
          impressions: 1200,
          clicks: 30,
          engagementRate: 0.04
        },
        topPosts: [{ title: "Weekly update", impressions: 800 }]
      }
    },
    availability: {
      repositoryMetrics: { status: "available" },
      issueMetrics: { status: "available" },
      pullRequestMetrics: { status: "available" },
      contributorMetrics: { status: "available" },
      releaseMetrics: { status: "available" },
      discussionMetrics: { status: "unavailable", reason: "disabled for test" },
      trafficMetrics: { status: "available" },
      externalMetrics: { status: "partial" }
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

test("maintainer response analysis uses collaborator-role attribution", () => {
  const response = getFirstMaintainerResponse(
    {
      number: 12,
      created_at: "2026-07-10T10:00:00.000Z",
      author_association: "CONTRIBUTOR",
      user: { login: "external-user" }
    },
    [
      {
        createdAt: "2026-07-10T12:30:00.000Z",
        authorAssociation: "MEMBER",
        login: "maintainer-1"
      }
    ]
  );

  assert.equal(response.responded, true);
  assert.equal(response.firstResponseAssociation, "MEMBER");
  assert.equal(response.hoursToFirstMaintainerResponse, 2.5);
});

test("maintainer response summary counts unanswered open items", () => {
  const summary = summarizeMaintainerResponseAnalysis(
    [
      {
        number: 10,
        response: {
          responded: false,
          authorIsMaintainer: false,
          firstResponseAssociation: null,
          hoursToFirstMaintainerResponse: null
        }
      },
      {
        number: 11,
        response: {
          responded: true,
          authorIsMaintainer: false,
          firstResponseAssociation: "OWNER",
          hoursToFirstMaintainerResponse: 4
        }
      }
    ],
    {
      openNumbers: new Set([10, 11]),
      createdDuringPeriodNumbers: new Set([11])
    }
  );

  assert.equal(summary.openItemsWithoutMaintainerResponse, 1);
  assert.equal(summary.averageHoursToFirstMaintainerResponse, 4);
  assert.deepEqual(summary.firstResponseByAssociation, { OWNER: 1 });
});

test("external adapters load sanitized Search Console and LinkedIn CSV summaries", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "growth-review-"));
  await fs.mkdir(path.join(tempRoot, "external"), { recursive: true });

  await fs.writeFile(
    path.join(tempRoot, "external", "search-console-summary.csv"),
    ["metric,value", "start_date,2026-07-09", "end_date,2026-07-16", "clicks,187", "impressions,6240", "ctr,3.0%", "average_position,18.4"].join("\n"),
    "utf8"
  );
  await fs.writeFile(
    path.join(tempRoot, "external", "search-console-queries.csv"),
    ["query,clicks,impressions,ctr,position", "\"codex cli\",72,1400,5.1%,6.2"].join("\n"),
    "utf8"
  );
  await fs.writeFile(
    path.join(tempRoot, "external", "linkedin-summary.csv"),
    ["metric,value", "start_date,2026-07-09", "end_date,2026-07-16", "posts_published,3", "impressions,4100", "clicks,89", "engagement_rate,3.1%"].join("\n"),
    "utf8"
  );
  await fs.writeFile(
    path.join(tempRoot, "external", "linkedin-posts.csv"),
    ["published_at,title,url,impressions,clicks,reactions,comments,reposts,engagement_rate", "2026-07-12,Release post,https://example.com/post,2200,41,18,4,2,3.8%"].join("\n"),
    "utf8"
  );

  const config = {
    ...DEFAULT_CONFIG,
    enableExternalAnalytics: true,
    externalAnalytics: {
      ...DEFAULT_CONFIG.externalAnalytics,
      searchConsole: {
        ...DEFAULT_CONFIG.externalAnalytics.searchConsole,
        summaryPath: "external/search-console-summary.csv",
        queriesPath: "external/search-console-queries.csv"
      },
      linkedinCsv: {
        ...DEFAULT_CONFIG.externalAnalytics.linkedinCsv,
        summaryPath: "external/linkedin-summary.csv",
        postsPath: "external/linkedin-posts.csv"
      }
    }
  };

  const result = await collectExternalMetrics({
    config,
    context: createSnapshot().period ? {
      period: createSnapshot().period
    } : { period: { start: "2026-07-09T00:00:00.000Z", end: "2026-07-16T00:00:00.000Z" } },
    repoRoot: tempRoot
  });

  assert.equal(result.metrics.searchConsole.status, "available");
  assert.equal(result.metrics.searchConsole.totals.clicks, 187);
  assert.equal(result.metrics.searchConsole.topQueries[0].query, "codex cli");
  assert.equal(result.metrics.linkedinCampaigns.status, "available");
  assert.equal(result.metrics.linkedinCampaigns.totals.postsPublished, 3);
  assert.equal(result.metrics.linkedinCampaigns.topPosts[0].title, "Release post");
  assert.equal(result.availability.status, "partial");
});
