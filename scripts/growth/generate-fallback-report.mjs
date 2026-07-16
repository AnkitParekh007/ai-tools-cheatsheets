#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildFallbackReport,
  calculateGrowthDeltas,
  findPreviousSnapshot,
  getOutputPaths,
  loadConfig,
  parseArgs,
  readJson,
  writeText
} from "./lib/core.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..", "..");
const args = parseArgs(process.argv.slice(2));
const config = await loadConfig({ repoRoot });
const reportDate = args.date ?? new Date().toISOString().slice(0, 10);
const outputPaths = getOutputPaths(repoRoot, reportDate);
const currentPath = path.resolve(args.current ?? outputPaths.snapshotPath);
const previousPath =
  args.previous ??
  (await findPreviousSnapshot({
    snapshotRoot: path.join(repoRoot, "growth-review", "snapshots"),
    currentSnapshotPath: currentPath
  }));

const currentSnapshot = await readJson(currentPath);
const previousSnapshot = previousPath ? await readJson(previousPath) : null;
const delta = args.delta ? await readJson(path.resolve(args.delta)) : calculateGrowthDeltas(currentSnapshot, previousSnapshot);
const report = buildFallbackReport({
  config,
  currentSnapshot,
  previousSnapshot,
  delta,
  runUrl: args["run-url"] ?? null,
  aiStatus: args["ai-status"] ?? "skipped",
  aiStatusNote: args["ai-note"] ?? "AI interpretation was skipped for this run."
});

const outputPath = path.resolve(args.output ?? outputPaths.reportPath);
await writeText(outputPath, report);
console.log(`Fallback report written to ${outputPath}`);
