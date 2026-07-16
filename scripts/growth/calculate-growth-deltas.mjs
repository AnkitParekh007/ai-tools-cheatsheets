#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  calculateGrowthDeltas,
  findPreviousSnapshot,
  getOutputPaths,
  parseArgs,
  readJson,
  writeJson
} from "./lib/core.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..", "..");
const args = parseArgs(process.argv.slice(2));
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
const delta = calculateGrowthDeltas(currentSnapshot, previousSnapshot);

if (args.output) {
  await writeJson(path.resolve(args.output), delta);
  console.log(`Delta file written to ${path.resolve(args.output)}`);
} else {
  console.log(JSON.stringify(delta, null, 2));
}
