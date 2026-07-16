#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGitHubClient } from "./lib/github.mjs";
import {
  buildIssueTitle,
  filterAvailableLabels,
  findIssueByMarker,
  getOutputPaths,
  loadConfig,
  parseArgs,
  sanitizeMarkdown
} from "./lib/core.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..", "..");
const args = parseArgs(process.argv.slice(2));
const config = await loadConfig({
  repoRoot,
  cli: {
    repository: args.repository,
    createLabels: args["create-labels"]
  }
});

const client = await createGitHubClient({ repository: config.repository });
const reportDate = args.date ?? new Date().toISOString().slice(0, 10);
const outputPaths = getOutputPaths(repoRoot, reportDate);
const reportPath = path.resolve(args.report ?? outputPaths.reportPath);
const rawReport = await fs.readFile(reportPath, "utf8");
const report = sanitizeMarkdown(rawReport);
const runUrl = args["run-url"] ?? process.env.GROWTH_RUN_URL ?? null;
const reportUrl = args["report-url"] ?? process.env.GROWTH_REPORT_URL ?? null;
let labelNames = (await client.listLabels()).map((item) => item.name);

if (config.createMissingLabels) {
  await createLabelsIfNeeded(client, config.reportIssueLabels, labelNames);
  labelNames = (await client.listLabels()).map((item) => item.name);
}
const desiredLabels = filterAvailableLabels(labelNames, config.reportIssueLabels);
const missingLabels = config.reportIssueLabels.filter((label) => !desiredLabels.includes(label));

const title = buildIssueTitle(config.reportTitlePrefix, reportDate);
const footerLines = [];
if (reportUrl && !report.includes(reportUrl)) {
  footerLines.push(`Report history: ${reportUrl}`);
}
if (runUrl && !report.includes(runUrl)) {
  footerLines.push(`Workflow run: ${runUrl}`);
}
const issueBody = `${report}${footerLines.length ? `\n\n---\n${footerLines.join("\n")}\n` : "\n"}`;
const issues = await client.listIssues({ state: "all" });
const existingIssue = findIssueByMarker(issues, reportDate);

if (args["dry-run"]) {
  console.log(`Dry run: ${existingIssue ? "would update" : "would create"} issue "${title}"`);
  console.log(`Labels: ${desiredLabels.join(", ") || "(none)"}`);
  if (missingLabels.length) {
    console.log(`Missing labels: ${missingLabels.join(", ")}`);
  }
  process.exit(0);
}

if (missingLabels.length) {
  console.log(`Missing labels were skipped: ${missingLabels.join(", ")}`);
}

if (existingIssue) {
  const updated = await client.updateIssue(existingIssue.number, {
    title,
    body: issueBody,
    labels: desiredLabels
  });
  console.log(`Updated issue #${updated.number}: ${updated.html_url}`);
} else {
  const created = await client.createIssue({
    title,
    body: issueBody,
    labels: desiredLabels
  });
  console.log(`Created issue #${created.number}: ${created.html_url}`);
}

async function createLabelsIfNeeded(clientInstance, desired, existing) {
  const normalized = new Set(existing.map((item) => item.toLowerCase()));
  for (const label of desired) {
    if (normalized.has(label.toLowerCase())) {
      continue;
    }
    await clientInstance.createLabel({
      name: label,
      color: label === "growth-report" ? "1D76DB" : label === "analytics" ? "5319E7" : "FBCA04",
      description: "Created by the weekly growth review automation."
    });
  }
}
