#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const summaryPath = path.join("docs", "SUMMARY.md");
const summary = fs.readFileSync(summaryPath, "utf8");
const lines = summary.split(/\r?\n/);
const findings = [];
const seenTargets = new Map();
let pageCount = 0;

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  const match = line.match(/\* \[(.+?)\]\((.+?)\)/);
  if (!match) continue;

  pageCount += 1;
  const [, label, target] = match;

  if (path.isAbsolute(target) || /^[A-Za-z]:[\\/]/.test(target)) {
    findings.push(`${summaryPath}:${i + 1} navigation target must be repository-relative: ${target}`);
    continue;
  }

  const resolved = path.join("docs", target.replace(/\//g, path.sep));
  if (!fs.existsSync(resolved)) {
    findings.push(`${summaryPath}:${i + 1} navigation target missing: ${target}`);
  }

  if (seenTargets.has(target)) {
    findings.push(
      `${summaryPath}:${i + 1} duplicate navigation target: ${target} (first seen on line ${seenTargets.get(target)})`
    );
  } else {
    seenTargets.set(target, i + 1);
  }

  if (fs.existsSync(resolved)) {
    const content = fs.readFileSync(resolved, "utf8");
    const heading = content.match(/^#\s+(.+)$/m);
    if (!heading) {
      findings.push(`${resolved}: missing top-level H1 heading for nav item "${label}"`);
    }
  }
}

if (!findings.length) {
  console.log(`Navigation validated successfully. ${pageCount} linked pages found in docs/SUMMARY.md.`);
  process.exit(0);
}

console.error("Navigation validation failed:\n");
findings.forEach((finding) => console.error(`- ${finding}`));
process.exit(1);
