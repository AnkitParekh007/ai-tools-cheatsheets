#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { findPreviousSnapshot, getOutputPaths, loadConfig, parseArgs, readJson, validateConfig, validateSnapshot } from "./lib/core.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..", "..");
const args = parseArgs(process.argv.slice(2));
const config = await loadConfig({ repoRoot });
const configValidation = validateConfig(config);

if (!configValidation.valid) {
  console.error("Config validation failed:");
  for (const error of configValidation.errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const reportDate = args.date ?? new Date().toISOString().slice(0, 10);
const defaultSnapshotPath = getOutputPaths(repoRoot, reportDate).snapshotPath;
const snapshotPath =
  args.snapshot ??
  (await findPreviousSnapshot({
    snapshotRoot: path.join(repoRoot, "growth-review", "snapshots"),
    currentSnapshotPath: defaultSnapshotPath
  })) ??
  defaultSnapshotPath;

const snapshot = await readJson(snapshotPath);
const validation = validateSnapshot(snapshot);

if (!validation.valid) {
  console.error(`Snapshot validation failed for ${snapshotPath}:`);
  for (const error of validation.errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated snapshot: ${snapshotPath}`);
for (const warning of [...configValidation.warnings, ...validation.warnings]) {
  console.warn(`warning: ${warning}`);
}
