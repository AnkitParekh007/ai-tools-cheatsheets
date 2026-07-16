import fs from "node:fs/promises";
import path from "node:path";
import { createAvailability, createUnavailableMetric } from "./core.mjs";

const SEARCH_CONSOLE_ADAPTER = "search-console-sanitized-csv";
const LINKEDIN_ADAPTER = "linkedin-sanitized-csv";

export async function collectExternalMetrics({ config, context, repoRoot }) {
  if (!config.enableExternalAnalytics) {
    return {
      metrics: {
        websiteAnalytics: {
          status: "disabled",
          reason: "External analytics are disabled in config."
        },
        searchConsole: {
          status: "disabled",
          reason: "External analytics are disabled in config."
        },
        linkedinCampaigns: {
          status: "disabled",
          reason: "External analytics are disabled in config."
        }
      },
      availability: createAvailability("disabled", "External analytics are disabled in config.", {
        adapters: {
          websiteAnalytics: createAvailability("disabled", "External analytics are disabled in config."),
          searchConsole: createAvailability("disabled", "External analytics are disabled in config."),
          linkedinCampaigns: createAvailability("disabled", "External analytics are disabled in config.")
        }
      }),
      warnings: []
    };
  }

  const warnings = [];
  const [searchConsole, linkedinCampaigns] = await Promise.all([
    withAdapterGuard(() => collectSearchConsoleMetrics({ config, context, repoRoot }), "Search Console", warnings),
    withAdapterGuard(() => collectLinkedInMetrics({ config, context, repoRoot }), "LinkedIn", warnings)
  ]);

  const websiteAnalytics = {
    status: "disabled",
    reason: "No website analytics adapter is configured for this repository yet."
  };

  const adapterAvailability = {
    websiteAnalytics: createAvailability("disabled", websiteAnalytics.reason),
    searchConsole: createAvailability(searchConsole.status, searchConsole.reason ?? null, {
      adapter: searchConsole.adapter ?? SEARCH_CONSOLE_ADAPTER,
      sourceFiles: searchConsole.sourceFiles ?? {}
    }),
    linkedinCampaigns: createAvailability(linkedinCampaigns.status, linkedinCampaigns.reason ?? null, {
      adapter: linkedinCampaigns.adapter ?? LINKEDIN_ADAPTER,
      sourceFiles: linkedinCampaigns.sourceFiles ?? {}
    })
  };

  return {
    metrics: {
      websiteAnalytics,
      searchConsole,
      linkedinCampaigns
    },
    availability: buildExternalAvailability(adapterAvailability),
    warnings
  };
}

export async function collectSearchConsoleMetrics({ config, context, repoRoot }) {
  const adapterConfig = normalizeAdapterConfig(config.externalAnalytics?.searchConsole, SEARCH_CONSOLE_ADAPTER);
  const summaryPath = resolveOptionalPath(repoRoot, adapterConfig.summaryPath);
  const queriesPath = resolveOptionalPath(repoRoot, adapterConfig.queriesPath);
  const pagesPath = resolveOptionalPath(repoRoot, adapterConfig.pagesPath);
  const topItemLimit = normalizeTopItemLimit(adapterConfig.topItemLimit, config.maxHighlightedItems);

  if (!summaryPath && !queriesPath && !pagesPath) {
    return createUnavailableMetric("Search Console adapter is enabled, but no sanitized CSV paths were configured.", {
      adapter: adapterConfig.adapter,
      sourceFiles: {
        summaryPath: null,
        queriesPath: null,
        pagesPath: null
      }
    });
  }

  const [summaryRows, queryRows, pageRows] = await Promise.all([
    summaryPath ? readCsvFile(summaryPath) : Promise.resolve([]),
    queriesPath ? readCsvFile(queriesPath) : Promise.resolve([]),
    pagesPath ? readCsvFile(pagesPath) : Promise.resolve([])
  ]);

  const summary = createMetricMap(summaryRows);
  const topQueries = queryRows
    .map((row) => ({
      query: row.query ?? row.keyword ?? row.term ?? "Unknown query",
      clicks: parseNumber(row.clicks),
      impressions: parseNumber(row.impressions),
      ctr: parsePercent(row.ctr),
      position: parseNumber(row.position ?? row.average_position)
    }))
    .filter((row) => row.query && hasAnyMetric(row, ["clicks", "impressions", "ctr", "position"]))
    .sort((left, right) => (right.clicks ?? 0) - (left.clicks ?? 0))
    .slice(0, topItemLimit);

  const topPages = pageRows
    .map((row) => ({
      page: row.page ?? row.path ?? row.url ?? "Unknown page",
      clicks: parseNumber(row.clicks),
      impressions: parseNumber(row.impressions),
      ctr: parsePercent(row.ctr),
      position: parseNumber(row.position ?? row.average_position)
    }))
    .filter((row) => row.page && hasAnyMetric(row, ["clicks", "impressions", "ctr", "position"]))
    .sort((left, right) => (right.clicks ?? 0) - (left.clicks ?? 0))
    .slice(0, topItemLimit);

  const totals = {
    clicks: parseNumber(summary.clicks),
    impressions: parseNumber(summary.impressions),
    ctr: parsePercent(summary.ctr),
    averagePosition: parseNumber(summary.average_position ?? summary.position),
    queries: parseNumber(summary.queries),
    pages: parseNumber(summary.pages)
  };

  if (!Object.values(totals).some((value) => value !== null) && topQueries.length === 0 && topPages.length === 0) {
    return createUnavailableMetric("Configured Search Console CSV files were readable, but no usable metrics were found.", {
      adapter: adapterConfig.adapter,
      sourceFiles: {
        summaryPath: describeSourceFile(repoRoot, summaryPath),
        queriesPath: describeSourceFile(repoRoot, queriesPath),
        pagesPath: describeSourceFile(repoRoot, pagesPath)
      }
    });
  }

  return {
    status: "available",
    adapter: adapterConfig.adapter,
    window: {
      startDate: summary.start_date ?? context.period.start.slice(0, 10),
      endDate: summary.end_date ?? context.period.end.slice(0, 10)
    },
    totals,
    topQueries,
    topPages,
    sourceFiles: {
      summaryPath: describeSourceFile(repoRoot, summaryPath),
      queriesPath: describeSourceFile(repoRoot, queriesPath),
      pagesPath: describeSourceFile(repoRoot, pagesPath)
    }
  };
}

export async function collectLinkedInMetrics({ config, context, repoRoot }) {
  const adapterConfig = normalizeAdapterConfig(config.externalAnalytics?.linkedinCsv, LINKEDIN_ADAPTER);
  const summaryPath = resolveOptionalPath(repoRoot, adapterConfig.summaryPath);
  const postsPath = resolveOptionalPath(repoRoot, adapterConfig.postsPath);
  const topItemLimit = normalizeTopItemLimit(adapterConfig.topItemLimit, config.maxHighlightedItems);

  if (!summaryPath && !postsPath) {
    return createUnavailableMetric("LinkedIn adapter is enabled, but no sanitized CSV paths were configured.", {
      adapter: adapterConfig.adapter,
      sourceFiles: {
        summaryPath: null,
        postsPath: null
      }
    });
  }

  const [summaryRows, postRows] = await Promise.all([
    summaryPath ? readCsvFile(summaryPath) : Promise.resolve([]),
    postsPath ? readCsvFile(postsPath) : Promise.resolve([])
  ]);

  const summary = createMetricMap(summaryRows);
  const topPosts = postRows
    .map((row) => ({
      publishedAt: row.published_at ?? row.date ?? row.published_on ?? null,
      title: row.title ?? row.post_title ?? row.headline ?? "Untitled post",
      url: row.url ?? row.post_url ?? null,
      impressions: parseNumber(row.impressions),
      clicks: parseNumber(row.clicks),
      reactions: parseNumber(row.reactions ?? row.likes),
      comments: parseNumber(row.comments),
      reposts: parseNumber(row.reposts ?? row.shares),
      engagementRate: parsePercent(row.engagement_rate ?? row.ctr)
    }))
    .filter((row) => row.title && hasAnyMetric(row, ["impressions", "clicks", "reactions", "comments", "reposts", "engagementRate"]))
    .sort((left, right) => (right.impressions ?? 0) - (left.impressions ?? 0))
    .slice(0, topItemLimit);

  const totals = {
    postsPublished: parseNumber(summary.posts_published ?? summary.posts),
    impressions: parseNumber(summary.impressions),
    clicks: parseNumber(summary.clicks),
    reactions: parseNumber(summary.reactions ?? summary.likes),
    comments: parseNumber(summary.comments),
    reposts: parseNumber(summary.reposts ?? summary.shares),
    engagementRate: parsePercent(summary.engagement_rate ?? summary.ctr),
    followersGained: parseNumber(summary.followers_gained ?? summary.new_followers)
  };

  if (!Object.values(totals).some((value) => value !== null) && topPosts.length === 0) {
    return createUnavailableMetric("Configured LinkedIn CSV files were readable, but no usable metrics were found.", {
      adapter: adapterConfig.adapter,
      sourceFiles: {
        summaryPath: describeSourceFile(repoRoot, summaryPath),
        postsPath: describeSourceFile(repoRoot, postsPath)
      }
    });
  }

  return {
    status: "available",
    adapter: adapterConfig.adapter,
    window: {
      startDate: summary.start_date ?? context.period.start.slice(0, 10),
      endDate: summary.end_date ?? context.period.end.slice(0, 10)
    },
    totals,
    topPosts,
    sourceFiles: {
      summaryPath: describeSourceFile(repoRoot, summaryPath),
      postsPath: describeSourceFile(repoRoot, postsPath)
    }
  };
}

async function withAdapterGuard(task, adapterName, warnings) {
  try {
    return await task();
  } catch (error) {
    warnings.push(`${adapterName} adapter failed: ${error.message}`);
    return createUnavailableMetric(`${adapterName} adapter failed: ${error.message}`);
  }
}

function buildExternalAvailability(adapters) {
  const statuses = Object.values(adapters).map((item) => item.status);
  if (statuses.every((status) => status === "disabled")) {
    return createAvailability("disabled", "No external analytics adapters were active for this run.", { adapters });
  }
  if (statuses.every((status) => status === "available")) {
    return createAvailability("available", null, { adapters });
  }
  if (statuses.some((status) => status === "available")) {
    return createAvailability("partial", "Some external analytics adapters were available, while others were missing or disabled.", { adapters });
  }
  return createAvailability("unavailable", "External analytics were enabled, but no adapter produced usable metrics.", { adapters });
}

function normalizeAdapterConfig(value, adapter) {
  if (value && typeof value === "object") {
    return {
      adapter: value.adapter ?? adapter,
      ...value
    };
  }
  return { adapter };
}

function normalizeTopItemLimit(value, fallback) {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

async function readCsvFile(filePath) {
  const contents = await fs.readFile(filePath, "utf8");
  return parseCsv(contents);
}

export function parseCsv(contents) {
  const rows = [];
  const normalized = String(contents ?? "").replace(/^\uFEFF/, "");
  if (!normalized.trim()) {
    return rows;
  }

  const lines = [];
  let currentField = "";
  let currentRow = [];
  let inQuotes = false;

  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index];
    const next = normalized[index + 1];

    if (character === "\"") {
      if (inQuotes && next === "\"") {
        currentField += "\"";
        index += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && next === "\n") {
        index += 1;
      }
      currentRow.push(currentField);
      lines.push(currentRow);
      currentField = "";
      currentRow = [];
      continue;
    }

    currentField += character;
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    lines.push(currentRow);
  }

  if (!lines.length) {
    return rows;
  }

  const [headerRow, ...dataRows] = lines;
  const headers = headerRow.map((value) => normalizeKey(value));
  for (const dataRow of dataRows) {
    if (dataRow.every((value) => !String(value ?? "").trim())) {
      continue;
    }
    const row = {};
    headers.forEach((header, index) => {
      if (header) {
        row[header] = String(dataRow[index] ?? "").trim();
      }
    });
    rows.push(row);
  }

  return rows;
}

function createMetricMap(rows) {
  const metrics = {};
  for (const row of rows) {
    const key = normalizeKey(row.metric ?? row.name ?? row.key ?? "");
    if (!key) {
      continue;
    }
    metrics[key] = row.value ?? row.metric_value ?? row.amount ?? row.total ?? "";
  }
  return metrics;
}

function resolveOptionalPath(repoRoot, value) {
  if (!value) {
    return null;
  }
  return path.isAbsolute(value) ? value : path.join(repoRoot, value);
}

function describeSourceFile(repoRoot, filePath) {
  if (!filePath) {
    return null;
  }
  const relative = path.relative(repoRoot, filePath);
  return relative && !relative.startsWith("..") ? relative.replace(/\\/g, "/") : path.basename(filePath);
}

function normalizeKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const cleaned = String(value).replace(/[%,$\s]/g, "").replace(/,/g, "");
  if (!cleaned) {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function parsePercent(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const stringValue = String(value).trim();
  if (!stringValue) {
    return null;
  }
  if (stringValue.endsWith("%")) {
    const parsed = parseNumber(stringValue.slice(0, -1));
    return parsed === null ? null : Number((parsed / 100).toFixed(4));
  }
  const parsed = parseNumber(stringValue);
  return parsed === null ? null : parsed;
}

function hasAnyMetric(record, keys) {
  return keys.some((key) => record[key] !== null && record[key] !== undefined);
}
