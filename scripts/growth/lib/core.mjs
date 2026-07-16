import fs from "node:fs/promises";
import path from "node:path";

export const DEFAULT_CONFIG = {
  schemaVersion: 1,
  repository: "AnkitParekh007/ai-tools-cheatsheets",
  timezone: "Asia/Kolkata",
  reportingPeriodDays: 7,
  reportTitlePrefix: "Weekly Growth Review",
  reportIssueLabels: ["growth-report", "analytics", "automation"],
  enableGitHubTraffic: true,
  enableDiscussions: true,
  enableExternalAnalytics: false,
  maxHighlightedItems: 5,
  maxAiInputChars: 18000,
  createMissingLabels: false,
  deliveryMode: "branch-and-issue",
  reportBranch: "automation/weekly-growth-reports",
  commitHistory: true,
  allowTrafficDetailsInAi: false,
  exposeTrafficDetailsInPublicIssue: false,
  ai: {
    provider: "auto",
    openaiModel: "gpt-5.2",
    anthropicModel: "claude-sonnet-5",
    maxOutputTokens: 1800,
    timeoutMs: 45000
  },
  externalAnalytics: {
    websiteAnalytics: null,
    searchConsole: {
      adapter: "search-console-sanitized-csv",
      summaryPath: null,
      queriesPath: null,
      pagesPath: null,
      topItemLimit: 5
    },
    linkedinCsv: {
      adapter: "linkedin-sanitized-csv",
      summaryPath: null,
      postsPath: null,
      topItemLimit: 5
    }
  }
};

const NUMERIC_DELTA_PATHS = {
  repositoryMetrics: [
    "stars",
    "forks",
    "subscribers",
    "watchers",
    "openIssues",
    "openPullRequests",
    "sizeKb",
    "totalReleases",
    "contributorCount"
  ],
  issueMetrics: [
    "newIssues",
    "closedIssues",
    "openIssues",
    "goodFirstIssueOpen",
    "helpWantedOpen",
    "issueComments",
    "openIssuesWithoutMaintainerResponse",
    "averageHoursToFirstMaintainerResponse"
  ],
  pullRequestMetrics: [
    "newPullRequests",
    "mergedPullRequests",
    "closedWithoutMerge",
    "openPullRequests",
    "firstTimeContributors",
    "repeatContributors",
    "averageTimeToMergeHours",
    "awaitingReview",
    "openPullRequestsWithoutMaintainerResponse",
    "averageHoursToFirstMaintainerResponse"
  ],
  contributorMetrics: [
    "currentContributorCount",
    "commitsDuringPeriod",
    "newContributors",
    "repeatContributors"
  ],
  releaseMetrics: ["releasesPublished", "totalReleases", "daysSinceLastRelease"],
  discussionMetrics: [
    "newDiscussions",
    "newComments",
    "answeredDiscussions",
    "unansweredQuestions"
  ],
  trafficMetrics: [
    "views.count",
    "views.uniqueDailySumApproximation",
    "clones.count",
    "clones.uniqueDailySumApproximation"
  ],
  externalMetrics: [
    "searchConsole.totals.clicks",
    "searchConsole.totals.impressions",
    "searchConsole.totals.ctr",
    "linkedinCampaigns.totals.postsPublished",
    "linkedinCampaigns.totals.impressions",
    "linkedinCampaigns.totals.clicks",
    "linkedinCampaigns.totals.engagementRate"
  ]
};

export function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }

    const [key, inlineValue] = token.slice(2).split("=", 2);
    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }
  return args;
}

export async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

export async function writeJson(filePath, value) {
  await ensureParentDirectory(filePath);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function writeText(filePath, value) {
  await ensureParentDirectory(filePath);
  await fs.writeFile(filePath, value, "utf8");
}

export async function ensureParentDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

export function parseBoolean(value, fallback) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  if (typeof value === "boolean") {
    return value;
  }
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

export function deepMerge(base, extra) {
  if (!extra || typeof extra !== "object" || Array.isArray(extra)) {
    return extra === undefined ? base : extra;
  }
  const result = Array.isArray(base) ? [...base] : { ...(base ?? {}) };
  for (const [key, value] of Object.entries(extra)) {
    const previous = result[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = deepMerge(previous ?? {}, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export async function loadConfig({
  repoRoot = process.cwd(),
  configPath = path.join(repoRoot, "growth-review", "config.json"),
  env = process.env,
  cli = {}
} = {}) {
  const fileConfig = await readJson(configPath);
  const merged = deepMerge(DEFAULT_CONFIG, fileConfig);
  const config = deepMerge(merged, removeUndefined({
    repository: cli.repository ?? env.GROWTH_REPOSITORY,
    timezone: cli.timezone ?? env.GROWTH_TIMEZONE,
    reportingPeriodDays: toNumber(cli.reportingDays ?? env.GROWTH_REPORTING_PERIOD_DAYS, merged.reportingPeriodDays),
    enableGitHubTraffic: parseBoolean(cli.enableTraffic ?? env.GROWTH_ENABLE_GITHUB_TRAFFIC, merged.enableGitHubTraffic),
    enableDiscussions: parseBoolean(cli.enableDiscussions ?? env.GROWTH_ENABLE_DISCUSSIONS, merged.enableDiscussions),
    enableExternalAnalytics: parseBoolean(
      cli.enableExternalAnalytics ?? env.GROWTH_ENABLE_EXTERNAL_ANALYTICS,
      merged.enableExternalAnalytics
    ),
    maxHighlightedItems: toNumber(cli.maxHighlightedItems ?? env.GROWTH_MAX_HIGHLIGHTED_ITEMS, merged.maxHighlightedItems),
    deliveryMode: cli.deliveryMode ?? env.GROWTH_DELIVERY_MODE,
    reportBranch: cli.reportBranch ?? env.GROWTH_REPORT_BRANCH,
    commitHistory: parseBoolean(cli.commitHistory ?? env.GROWTH_COMMIT_HISTORY, merged.commitHistory),
    createMissingLabels: parseBoolean(cli.createLabels ?? env.GROWTH_CREATE_LABELS, merged.createMissingLabels),
    ai: {
      provider: cli.aiProvider ?? env.GROWTH_AI_PROVIDER,
      openaiModel: cli.openaiModel ?? env.OPENAI_MODEL,
      anthropicModel: cli.anthropicModel ?? env.ANTHROPIC_MODEL,
      maxOutputTokens: toNumber(cli.maxOutputTokens ?? env.GROWTH_AI_MAX_OUTPUT_TOKENS, merged.ai.maxOutputTokens),
      timeoutMs: toNumber(cli.aiTimeoutMs ?? env.GROWTH_AI_TIMEOUT_MS, merged.ai.timeoutMs)
    },
    externalAnalytics: {
      searchConsole: {
        summaryPath: cli.searchConsoleSummaryPath ?? env.GROWTH_SEARCH_CONSOLE_SUMMARY_PATH,
        queriesPath: cli.searchConsoleQueriesPath ?? env.GROWTH_SEARCH_CONSOLE_QUERIES_PATH,
        pagesPath: cli.searchConsolePagesPath ?? env.GROWTH_SEARCH_CONSOLE_PAGES_PATH,
        topItemLimit: toNumber(cli.searchConsoleTopItemLimit ?? env.GROWTH_SEARCH_CONSOLE_TOP_ITEM_LIMIT, merged.externalAnalytics.searchConsole?.topItemLimit)
      },
      linkedinCsv: {
        summaryPath: cli.linkedinSummaryPath ?? env.GROWTH_LINKEDIN_SUMMARY_PATH,
        postsPath: cli.linkedinPostsPath ?? env.GROWTH_LINKEDIN_POSTS_PATH,
        topItemLimit: toNumber(cli.linkedinTopItemLimit ?? env.GROWTH_LINKEDIN_TOP_ITEM_LIMIT, merged.externalAnalytics.linkedinCsv?.topItemLimit)
      }
    }
  }));

  const validation = validateConfig(config);
  if (!validation.valid) {
    throw new Error(`Invalid growth-review config:\n- ${validation.errors.join("\n- ")}`);
  }
  return config;
}

export function validateConfig(config) {
  const errors = [];
  const warnings = [];

  if (!/^[^/]+\/[^/]+$/.test(config.repository ?? "")) {
    errors.push("repository must be in owner/name format");
  }
  if (!config.timezone) {
    errors.push("timezone is required");
  }
  if (!Number.isInteger(config.reportingPeriodDays) || config.reportingPeriodDays < 1 || config.reportingPeriodDays > 31) {
    errors.push("reportingPeriodDays must be an integer between 1 and 31");
  }
  if (!Array.isArray(config.reportIssueLabels)) {
    errors.push("reportIssueLabels must be an array");
  }
  if (!config.ai || typeof config.ai !== "object") {
    errors.push("ai configuration is required");
  }
  if (config.ai && !["auto", "none", "openai", "anthropic"].includes(config.ai.provider)) {
    errors.push("ai.provider must be one of auto, none, openai, anthropic");
  }
  if (config.enableExternalAnalytics && !config.externalAnalytics) {
    warnings.push("enableExternalAnalytics is true, but no externalAnalytics adapters are configured");
  }
  if (config.enableExternalAnalytics) {
    const searchConsole = config.externalAnalytics?.searchConsole;
    const linkedinCsv = config.externalAnalytics?.linkedinCsv;
    if (!searchConsole?.summaryPath && !searchConsole?.queriesPath && !searchConsole?.pagesPath) {
      warnings.push("Search Console adapter is enabled, but no CSV paths are configured.");
    }
    if (!linkedinCsv?.summaryPath && !linkedinCsv?.postsPath) {
      warnings.push("LinkedIn adapter is enabled, but no CSV paths are configured.");
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function resolveReportContext({
  reportDateInput,
  collectedAt = new Date(),
  timezone = "UTC",
  reportingPeriodDays = 7
} = {}) {
  const collectedDate = new Date(collectedAt);
  const reportDate = reportDateInput
    ? new Date(`${reportDateInput}T00:00:00.000Z`)
    : collectedDate;
  const reportDateLabel = formatDateInTimeZone(reportDate, timezone);
  const periodEnd = collectedDate;
  const periodStart = new Date(periodEnd.getTime() - reportingPeriodDays * 24 * 60 * 60 * 1000);

  return {
    reportDate: reportDateLabel,
    collectedAt: collectedDate.toISOString(),
    period: {
      start: periodStart.toISOString(),
      end: periodEnd.toISOString(),
      days: reportingPeriodDays,
      timezone
    }
  };
}

export function formatDateInTimeZone(date, timezone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(new Date(date));
}

export function getOutputPaths(repoRoot, reportDate) {
  const [year] = reportDate.split("-");
  return {
    reportDirectory: path.join(repoRoot, "growth-review", "reports", year),
    snapshotDirectory: path.join(repoRoot, "growth-review", "snapshots", year),
    reportPath: path.join(repoRoot, "growth-review", "reports", year, `${reportDate}.md`),
    snapshotPath: path.join(repoRoot, "growth-review", "snapshots", year, `${reportDate}.json`)
  };
}

export async function listSnapshotFiles(snapshotRoot) {
  const discovered = [];
  async function walk(current) {
    let entries = [];
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        discovered.push(entryPath);
      }
    }
  }
  await walk(snapshotRoot);
  return discovered.sort();
}

export async function findPreviousSnapshot({ snapshotRoot, currentSnapshotPath } = {}) {
  const snapshots = await listSnapshotFiles(snapshotRoot);
  const filtered = currentSnapshotPath ? snapshots.filter((entry) => path.resolve(entry) !== path.resolve(currentSnapshotPath)) : snapshots;
  if (!filtered.length) {
    return null;
  }
  return filtered.at(-1);
}

export function createUnavailableMetric(reason, details = {}) {
  return {
    status: "unavailable",
    reason,
    ...details
  };
}

export function createAvailability(status, reason = null, details = {}) {
  return {
    status,
    reason,
    ...details
  };
}

export function validateSnapshot(snapshot) {
  const errors = [];
  const warnings = [];

  const requiredKeys = [
    "schemaVersion",
    "repository",
    "collectedAt",
    "reportDate",
    "period",
    "repositoryMetrics",
    "issueMetrics",
    "pullRequestMetrics",
    "contributorMetrics",
    "releaseMetrics",
    "discussionMetrics",
    "trafficMetrics",
    "externalMetrics",
    "availability",
    "warnings",
    "errors"
  ];

  for (const key of requiredKeys) {
    if (!(key in snapshot)) {
      errors.push(`snapshot missing ${key}`);
    }
  }

  for (const dateKey of ["collectedAt", "period.start", "period.end"]) {
    const value = readPath(snapshot, dateKey);
    if (!isIsoTimestamp(value)) {
      errors.push(`${dateKey} must be an ISO 8601 timestamp`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.reportDate ?? "")) {
    errors.push("reportDate must be YYYY-MM-DD");
  }

  if (!Array.isArray(snapshot.warnings)) {
    errors.push("warnings must be an array");
  }
  if (!Array.isArray(snapshot.errors)) {
    errors.push("errors must be an array");
  }

  if (snapshot.period && snapshot.period.days !== undefined && (!Number.isInteger(snapshot.period.days) || snapshot.period.days < 1)) {
    errors.push("period.days must be a positive integer");
  }

  if (snapshot.errors?.length) {
    warnings.push("snapshot contains collection errors");
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function calculateGrowthDeltas(currentSnapshot, previousSnapshot) {
  const delta = {
    mode: previousSnapshot ? "comparison" : "baseline",
    reportDate: currentSnapshot.reportDate,
    currentCollectedAt: currentSnapshot.collectedAt,
    previousCollectedAt: previousSnapshot?.collectedAt ?? null,
    domains: {},
    availability: {
      current: currentSnapshot.availability,
      previous: previousSnapshot?.availability ?? null
    },
    warnings: [...(currentSnapshot.warnings ?? [])],
    errors: [...(currentSnapshot.errors ?? [])]
  };

  for (const [domain, metricPaths] of Object.entries(NUMERIC_DELTA_PATHS)) {
    delta.domains[domain] = {};
    for (const metricPath of metricPaths) {
      const currentValue = readPath(currentSnapshot[domain], metricPath);
      const previousValue = previousSnapshot ? readPath(previousSnapshot[domain], metricPath) : null;
      delta.domains[domain][metricPath] = calculateSingleDelta(previousValue, currentValue, Boolean(previousSnapshot));
    }
  }

  return delta;
}

export function calculateSingleDelta(previous, current, hasPrevious) {
  if (!hasPrevious) {
    return {
      previous: null,
      current: normalizeNumber(current),
      absoluteChange: null,
      percentageChange: null,
      direction: "baseline",
      meaningful: false
    };
  }

  if (!isFiniteNumber(current) || !isFiniteNumber(previous)) {
    return {
      previous: normalizeNumber(previous),
      current: normalizeNumber(current),
      absoluteChange: null,
      percentageChange: null,
      direction: "unavailable",
      meaningful: false
    };
  }

  const absoluteChange = current - previous;
  const direction = absoluteChange === 0 ? "unchanged" : absoluteChange > 0 ? "increased" : "decreased";
  const percentageChange =
    previous === 0
      ? current === 0
        ? 0
        : null
      : Number((((current - previous) / previous) * 100).toFixed(2));

  return {
    previous,
    current,
    absoluteChange,
    percentageChange,
    direction,
    meaningful: previous !== null && current !== null
  };
}

export function buildFallbackReport({
  config,
  currentSnapshot,
  previousSnapshot,
  delta,
  runUrl = null,
  aiStatus = "skipped",
  aiStatusNote = "AI interpretation was skipped."
}) {
  const lines = [];
  lines.push(`# ${config.reportTitlePrefix} - ${currentSnapshot.reportDate}`);
  lines.push("");
  lines.push(issueMarker(currentSnapshot.reportDate));
  lines.push("");
  lines.push("## Executive Summary");
  lines.push("");
  if (delta.mode === "baseline") {
    lines.push(
      `Baseline report. This is the first stored snapshot for \`${currentSnapshot.repository}\`, so week-over-week comparisons will begin after the next successful run.`
    );
  } else {
    lines.push(buildExecutiveSummary(delta));
  }
  lines.push("");
  lines.push(`AI status: ${aiStatus}. ${aiStatusNote}`);
  lines.push("");
  lines.push("## Metric Scorecard");
  lines.push("");
  lines.push("| Domain | Metric | Previous | Current | Change | Direction |");
  lines.push("| --- | --- | ---: | ---: | ---: | --- |");
  for (const [domain, metrics] of Object.entries(delta.domains)) {
    for (const [metric, metricDelta] of Object.entries(metrics)) {
      lines.push(
        `| ${humanize(domain)} | \`${metric}\` | ${formatMetricValue(metricDelta.previous)} | ${formatMetricValue(metricDelta.current)} | ${formatDeltaChange(metricDelta)} | ${metricDelta.direction} |`
      );
    }
  }
  lines.push("");
  lines.push("## What Changed");
  lines.push("");
  lines.push(...buildChangeBullets(delta));
  lines.push("");
  lines.push("## Growth Drivers");
  lines.push("");
  lines.push(...buildGrowthDriverBullets(currentSnapshot));
  lines.push("");
  lines.push("## What Underperformed");
  lines.push("");
  lines.push(...buildUnderperformedBullets(delta, currentSnapshot));
  lines.push("");
  lines.push("## Contributor and Community Health");
  lines.push("");
  lines.push(...buildContributorBullets(currentSnapshot));
  lines.push("");
  lines.push("## Content and Distribution Signals");
  lines.push("");
  lines.push(...buildContentSignalBullets(currentSnapshot, config));
  lines.push("");
  lines.push("## Risks and Data Limitations");
  lines.push("");
  lines.push(...buildRiskBullets(currentSnapshot, previousSnapshot));
  lines.push("");
  lines.push("## Three Priorities for Next Week");
  lines.push("");
  lines.push(...buildPriorityBullets(currentSnapshot, delta));
  lines.push("");
  lines.push("## Experiments to Run");
  lines.push("");
  lines.push(...buildExperimentBullets(currentSnapshot, delta));
  lines.push("");
  lines.push("## Follow-Up Checklist");
  lines.push("");
  lines.push("- Review the scorecard and data limitations before sharing publicly.");
  lines.push("- Confirm whether the highlighted issues and pull requests still need maintainer follow-up.");
  lines.push("- Refresh the sanitized external analytics CSV summaries before the next run if new campaign data is available.");
  if (runUrl) {
    lines.push(`- Workflow run: ${runUrl}`);
  }
  lines.push("");
  lines.push("## Data Availability");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(currentSnapshot.availability, null, 2));
  lines.push("```");
  lines.push("");
  if (currentSnapshot.errors?.length || currentSnapshot.warnings?.length) {
    lines.push("## Collector Warnings");
    lines.push("");
    for (const item of [...(currentSnapshot.errors ?? []), ...(currentSnapshot.warnings ?? [])]) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

export function buildAiPromptInput({ promptTemplate, currentSnapshot, previousSnapshot, delta, config }) {
  const payload = {
    currentSnapshot,
    previousSnapshot,
    delta,
    availability: currentSnapshot.availability,
    warnings: currentSnapshot.warnings,
    errors: currentSnapshot.errors,
    constraints: {
      maxHighlightedItems: config.maxHighlightedItems,
      exposeTrafficDetailsInPublicIssue: config.exposeTrafficDetailsInPublicIssue,
      allowTrafficDetailsInAi: config.allowTrafficDetailsInAi
    }
  };

  const serialized = JSON.stringify(payload, null, 2);
  const truncated =
    serialized.length > config.maxAiInputChars
      ? `${serialized.slice(0, config.maxAiInputChars)}\n...[truncated for cost control]`
      : serialized;

  return `${promptTemplate.trim()}\n\n## Data\n\n\`\`\`json\n${truncated}\n\`\`\`\n`;
}

export function issueMarker(reportDate) {
  return `<!-- weekly-growth-review:${reportDate} -->`;
}

export function filterAvailableLabels(existingLabels, desiredLabels) {
  const existing = new Set(existingLabels.map((label) => label.toLowerCase()));
  return desiredLabels.filter((label) => existing.has(label.toLowerCase()));
}

export function findIssueByMarker(issues, reportDate) {
  const marker = issueMarker(reportDate);
  return issues.find((issue) => issue.body?.includes(marker)) ?? null;
}

export function buildIssueTitle(prefix, reportDate) {
  return `${prefix} - ${reportDate}`;
}

export function sanitizeMarkdown(markdown) {
  return String(markdown ?? "").replace(/\u0000/g, "").trim();
}

export function humanize(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\./g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatMetricValue(value) {
  if (value === null || value === undefined) {
    return "Unavailable";
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  return String(value);
}

export function formatDeltaChange(delta) {
  if (!delta || delta.absoluteChange === null || delta.absoluteChange === undefined) {
    return "Unavailable";
  }
  const absolute = delta.absoluteChange > 0 ? `+${delta.absoluteChange}` : String(delta.absoluteChange);
  if (delta.percentageChange === null || delta.percentageChange === undefined) {
    return absolute;
  }
  const percentage = delta.percentageChange > 0 ? `+${delta.percentageChange}%` : `${delta.percentageChange}%`;
  return `${absolute} (${percentage})`;
}

export function buildExecutiveSummary(delta) {
  const standout = [];
  for (const domain of Object.values(delta.domains)) {
    for (const [metric, metricDelta] of Object.entries(domain)) {
      if (metricDelta.direction === "increased" && Math.abs(metricDelta.absoluteChange ?? 0) > 0) {
        standout.push(`\`${metric}\` ${metricDelta.direction} by ${metricDelta.absoluteChange}`);
      }
    }
  }
  if (!standout.length) {
    return "No numeric growth signals changed materially during this reporting window, or the available data was too limited for comparison.";
  }
  return `The strongest measurable movement came from ${standout.slice(0, 3).join(", ")}. Interpret causal explanations cautiously unless the linked activity supports them.`;
}

export function buildChangeBullets(delta) {
  const bullets = [];
  for (const [domain, metrics] of Object.entries(delta.domains)) {
    const changedMetrics = Object.entries(metrics).filter(([, value]) => ["increased", "decreased"].includes(value.direction));
    if (!changedMetrics.length) {
      continue;
    }
    const summary = changedMetrics
      .slice(0, 4)
      .map(([metric, value]) => `\`${metric}\` ${value.direction} by ${value.absoluteChange}`)
      .join(", ");
    bullets.push(`- ${humanize(domain)}: ${summary}.`);
  }
  return bullets.length ? bullets : ["- No meaningful week-over-week deltas were available for the measured metrics."];
}

export function buildGrowthDriverBullets(snapshot) {
  const bullets = [];
  const topIssues = (snapshot.issueMetrics.mostActiveIssues ?? []).filter((issue) => (issue.comments ?? 0) > 0).slice(0, 2);
  const topPrs = (snapshot.pullRequestMetrics.mostActivePullRequests ?? []).filter((pull) => (pull.comments ?? 0) > 0).slice(0, 2);
  for (const issue of topIssues) {
    bullets.push(`- Issue activity highlight: [#${issue.number}](${issue.url}) reached ${issue.comments} comments.`);
  }
  for (const pr of topPrs) {
    bullets.push(`- Pull request activity highlight: [#${pr.number}](${pr.url}) recorded ${pr.comments} comments.`);
  }
  if (!bullets.length) {
    bullets.push("- No strong activity clusters were available to explain growth signals this week.");
  }
  return bullets;
}

export function buildUnderperformedBullets(delta, snapshot) {
  const bullets = [];
  for (const [domain, metrics] of Object.entries(delta.domains)) {
    const decreased = Object.entries(metrics).filter(([, value]) => value.direction === "decreased");
    for (const [metric, metricDelta] of decreased.slice(0, 2)) {
      bullets.push(`- ${humanize(domain)} \`${metric}\` decreased by ${metricDelta.absoluteChange}.`);
    }
  }
  if (snapshot.trafficMetrics?.status === "unavailable") {
    bullets.push("- GitHub traffic metrics were unavailable, so distribution performance is incomplete.");
  }
  return bullets.length ? bullets : ["- No major underperformance signals were detected in the available metrics."];
}

export function buildContributorBullets(snapshot) {
  const bullets = [];
  bullets.push(
    `- Accepted contributors in the period: ${snapshot.contributorMetrics.acceptedContributors?.length ?? 0}; new contributors: ${snapshot.contributorMetrics.newContributors}.`
  );
  if (Number.isFinite(snapshot.issueMetrics.averageHoursToFirstMaintainerResponse)) {
    bullets.push(
      `- Maintainer first-response time for new issues averaged ${snapshot.issueMetrics.averageHoursToFirstMaintainerResponse.toFixed(2)} hours.`
    );
  }
  if (Number.isFinite(snapshot.pullRequestMetrics.averageHoursToFirstMaintainerResponse)) {
    bullets.push(
      `- Maintainer first-response time for new pull requests averaged ${snapshot.pullRequestMetrics.averageHoursToFirstMaintainerResponse.toFixed(2)} hours.`
    );
  }
  const highlights = snapshot.contributorMetrics.acceptedContributors?.slice(0, 3) ?? [];
  for (const person of highlights) {
    bullets.push(
      `- ${person.login} contributed ${person.acceptedActivity} accepted activity units (${person.mergedPullRequests} merged PRs, ${person.commits} commits).`
    );
  }
  return bullets;
}

export function buildContentSignalBullets(snapshot, config) {
  const bullets = [];
  if (snapshot.trafficMetrics.views?.count !== undefined) {
    bullets.push(
      `- GitHub traffic captured ${snapshot.trafficMetrics.views.count} views during the retained window; unique totals are approximate because GitHub only exposes daily unique counts.`
    );
  }
  if (snapshot.availability?.externalMetrics?.status === "disabled") {
    bullets.push("- External analytics adapters are disabled for this run, so Search Console and LinkedIn distribution signals are unavailable.");
  }
  if (snapshot.externalMetrics.searchConsole?.status === "available") {
    const totals = snapshot.externalMetrics.searchConsole.totals ?? {};
    bullets.push(
      `- Search Console captured ${formatMetricValue(totals.clicks)} clicks from ${formatMetricValue(totals.impressions)} impressions in the imported summary window.`
    );
  }
  if (snapshot.externalMetrics.linkedinCampaigns?.status === "available") {
    const totals = snapshot.externalMetrics.linkedinCampaigns.totals ?? {};
    bullets.push(
      `- LinkedIn summaries captured ${formatMetricValue(totals.impressions)} impressions across ${formatMetricValue(totals.postsPublished)} posts in the imported window.`
    );
  }
  const paths = snapshot.trafficMetrics.topPaths?.slice(0, 3) ?? [];
  for (const item of paths) {
    bullets.push(`- Popular GitHub content path: \`${item.path}\` with ${item.count} views.`);
  }
  const topQueries = snapshot.externalMetrics.searchConsole?.topQueries?.slice(0, 2) ?? [];
  for (const item of topQueries) {
    bullets.push(`- Search Console query highlight: \`${item.query}\` drove ${formatMetricValue(item.clicks)} clicks.`);
  }
  const topPosts = snapshot.externalMetrics.linkedinCampaigns?.topPosts?.slice(0, 2) ?? [];
  for (const item of topPosts) {
    bullets.push(`- LinkedIn post highlight: ${item.title} reached ${formatMetricValue(item.impressions)} impressions.`);
  }
  return bullets.length ? bullets : ["- No content or distribution metrics were available in this run."];
}

export function buildRiskBullets(currentSnapshot, previousSnapshot) {
  const bullets = [];
  const combined = [...(currentSnapshot.warnings ?? []), ...(currentSnapshot.errors ?? [])];
  if (!previousSnapshot) {
    bullets.push("- This is a baseline run, so week-over-week interpretation is intentionally limited.");
  }
  for (const item of combined.slice(0, 6)) {
    bullets.push(`- ${item}`);
  }
  if (!combined.length) {
    bullets.push("- No collector warnings were recorded.");
  }
  return bullets;
}

export function buildPriorityBullets(snapshot, delta) {
  const bullets = [];
  const topUnanswered = snapshot.issueMetrics.openIssuesWithoutMaintainerResponse;
  if (typeof topUnanswered === "number" && topUnanswered > 0) {
    bullets.push(
      "- Action: reduce open issues with no maintainer response. Reason: response lag weakens contributor conversion. Expected signal: lower unresponded issue count next week. Measurement: `issueMetrics.openIssuesWithoutMaintainerResponse`. Suggested owner: maintainer triage. Effort: medium."
    );
  }
  const unansweredPulls = snapshot.pullRequestMetrics.openPullRequestsWithoutMaintainerResponse;
  if (typeof unansweredPulls === "number" && unansweredPulls > 0) {
    bullets.push(
      "- Action: assign a maintainer sweep for open pull requests with no maintainer response. Reason: contributor momentum drops when PRs sit without a maintainer signal. Expected signal: lower unresponded PR count and faster first-response time. Measurement: `pullRequestMetrics.openPullRequestsWithoutMaintainerResponse` and `pullRequestMetrics.averageHoursToFirstMaintainerResponse`. Suggested owner: reviewer rotation. Effort: medium."
    );
  }
  const mergedDelta = delta.domains.pullRequestMetrics["mergedPullRequests"];
  if (mergedDelta?.direction === "decreased") {
    bullets.push(
      "- Action: unblock merge-ready pull requests. Reason: merged pull requests decreased week over week. Expected signal: more merged PRs and lower awaiting-review count. Measurement: `pullRequestMetrics.mergedPullRequests` and `pullRequestMetrics.awaitingReview`. Suggested owner: reviewer rotation. Effort: medium."
    );
  }
  bullets.push(
    "- Action: expand the most active handbook topic into a follow-up asset. Reason: issue and PR activity indicate what contributors and readers are already engaging with. Expected signal: more qualified stars, forks, or issue participation. Measurement: next week's repository metrics and content-path traffic. Suggested owner: content maintainer. Effort: medium."
  );
  return bullets.slice(0, 3);
}

export function buildExperimentBullets(snapshot, delta) {
  const bullets = [];
  if ((snapshot.issueMetrics.goodFirstIssueOpen ?? 0) > 0) {
    bullets.push(
      "- Turn one `good first issue` into a contributor-ready starter kit and measure whether first-time contributor count increases."
    );
  }
  if (delta.domains.repositoryMetrics["stars"]?.direction !== "increased") {
    bullets.push("- Publish one source-backed distribution post tied to a high-interest handbook section and measure stars, forks, and contributor clicks next week.");
  }
  if (snapshot.externalMetrics.searchConsole?.status === "available" || snapshot.externalMetrics.linkedinCampaigns?.status === "available") {
    bullets.push("- Compare top Search Console pages and top LinkedIn posts against the most active repository pages to find which content themes create both traffic and contribution intent.");
  } else {
    bullets.push("- Import at least one sanitized Search Console or LinkedIn summary before the next run so repository activity can be compared with off-platform distribution.");
  }
  return bullets.slice(0, 3);
}

export function normalizeNumber(value) {
  return isFiniteNumber(value) ? value : null;
}

export function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function toNumber(value, fallback = null) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function isIsoTimestamp(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
}

export function readPath(object, pathExpression) {
  return pathExpression.split(".").reduce((current, key) => current?.[key], object);
}

function removeUndefined(value) {
  if (Array.isArray(value)) {
    return value.map(removeUndefined);
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entry]) => entry !== undefined)
      .map(([key, entry]) => [key, removeUndefined(entry)])
  );
}
