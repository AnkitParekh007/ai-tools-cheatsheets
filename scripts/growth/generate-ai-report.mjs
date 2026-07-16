#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateAiReport } from "./lib/ai.mjs";
import {
  buildAiPromptInput,
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
const config = await loadConfig({
  repoRoot,
  cli: {
    aiProvider: args.provider,
    openaiModel: args["openai-model"],
    anthropicModel: args["anthropic-model"],
    maxOutputTokens: args["max-output-tokens"],
    aiTimeoutMs: args["timeout-ms"]
  }
});
const reportDate = args.date ?? new Date().toISOString().slice(0, 10);
const outputPaths = getOutputPaths(repoRoot, reportDate);
const currentPath = path.resolve(args.current ?? outputPaths.snapshotPath);
const previousPath =
  args.previous ??
  (await findPreviousSnapshot({
    snapshotRoot: path.join(repoRoot, "growth-review", "snapshots"),
    currentSnapshotPath: currentPath
  }));
const promptPath = path.resolve(args.prompt ?? path.join(repoRoot, "growth-review", "prompt.md"));
const outputPath = path.resolve(args.output ?? outputPaths.reportPath);

const [currentSnapshot, previousSnapshot, promptTemplate] = await Promise.all([
  readJson(currentPath),
  previousPath ? readJson(previousPath) : Promise.resolve(null),
  fs.readFile(promptPath, "utf8")
]);

const delta = args.delta
  ? await readJson(path.resolve(args.delta))
  : calculateGrowthDeltas(currentSnapshot, previousSnapshot);

const aiPrompt = buildAiPromptInput({
  promptTemplate,
  currentSnapshot,
  previousSnapshot,
  delta,
  config
});

try {
  const result = await generateAiReport({ config, prompt: aiPrompt });
  if (!result.usedAi || !result.report?.trim()) {
    const fallback = buildFallbackReport({
      config,
      currentSnapshot,
      previousSnapshot,
      delta,
      runUrl: args["run-url"] ?? null,
      aiStatus: "skipped",
      aiStatusNote: result.reason ?? "No AI provider was configured."
    });
    await writeText(outputPath, fallback);
    console.log(`AI skipped; fallback report written to ${outputPath}`);
    process.exit(0);
  }

  await writeText(outputPath, result.report.trimEnd() + "\n");
  console.log(`AI report written to ${outputPath} using ${result.provider}`);
} catch (error) {
  const fallback = buildFallbackReport({
    config,
    currentSnapshot,
    previousSnapshot,
    delta,
    runUrl: args["run-url"] ?? null,
    aiStatus: "failed",
    aiStatusNote: `AI generation failed and fallback reporting was used: ${error.message}`
  });
  await writeText(outputPath, fallback);
  console.log(`AI generation failed; fallback report written to ${outputPath}`);
}
