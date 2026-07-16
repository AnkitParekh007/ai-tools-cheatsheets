#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectGitHubSnapshot, createGitHubClient } from "./lib/github.mjs";
import {
  ensureParentDirectory,
  getOutputPaths,
  loadConfig,
  parseArgs,
  resolveReportContext,
  validateSnapshot,
  writeJson
} from "./lib/core.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..", "..");
const args = parseArgs(process.argv.slice(2));
const config = await loadConfig({
  repoRoot,
  cli: {
    repository: args.repository,
    timezone: args.timezone,
    reportingDays: args["reporting-days"],
    enableTraffic: args["enable-traffic"],
    enableDiscussions: args["enable-discussions"],
    maxHighlightedItems: args["max-highlighted-items"]
  }
});

const context = resolveReportContext({
  reportDateInput: args.date,
  collectedAt: args["collected-at"] ? new Date(args["collected-at"]) : new Date(),
  timezone: config.timezone,
  reportingPeriodDays: config.reportingPeriodDays
});

const outputPaths = getOutputPaths(repoRoot, context.reportDate);
const outputPath = args.output ? path.resolve(args.output) : outputPaths.snapshotPath;
await ensureParentDirectory(outputPath);

const client = await createGitHubClient({
  repository: config.repository,
  timeoutMs: Number(args["timeout-ms"] ?? 20000)
});

const snapshot = await collectGitHubSnapshot({
  client,
  config,
  context
});

const validation = validateSnapshot(snapshot);
if (!validation.valid) {
  console.error("Snapshot validation failed:");
  for (const error of validation.errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

await writeJson(outputPath, snapshot);

console.log(`Collected snapshot for ${config.repository}`);
console.log(`Report date: ${context.reportDate}`);
console.log(`Snapshot path: ${outputPath}`);
if (args["print-json"]) {
  console.log(JSON.stringify(snapshot, null, 2));
}
