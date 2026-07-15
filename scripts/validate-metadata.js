#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const approvedStatusLabels = new Set([
  "Verified",
  "Locally tested",
  "Partially verified",
  "Documentation verified",
  "Confirmed",
  "Not locally tested",
  "Requires account",
  "Requires paid plan",
  "Platform-specific",
  "Experimental",
  "Deprecated",
  "Unsupported",
  "Unable to verify",
  "Needs verification"
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_book") continue;
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

const files = walk("docs");
const findings = [];

for (const file of files) {
  if (file.endsWith("SUMMARY.md")) continue;

  const content = fs.readFileSync(file, "utf8");

  if (!/^#\s+.+$/m.test(content)) {
    findings.push(`${file}: missing top-level H1 heading`);
  }

  const dateMatches = [...content.matchAll(/\*\*Last verified:\*\*\s+([0-9]{4}-[0-9]{2}-[0-9]{2}|.+)$/gm)];
  dateMatches.forEach((match) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(match[1].trim())) {
      findings.push(`${file}: invalid Last verified date format "${match[1].trim()}"`);
    }
  });

  const statusMatches = [...content.matchAll(/\*\*Status:\*\*\s+(.+)$/gm)];
  statusMatches.forEach((match) => {
    const value = match[1].trim();
    if (!approvedStatusLabels.has(value)) {
      findings.push(`${file}: unapproved status label "${value}"`);
    }
  });

  if (file.startsWith(path.join("docs", "tools") + path.sep) && path.basename(file) !== "README.md") {
    [
      "**Type:**",
      "**Best for:**",
      "**Official docs:**",
      "**Last verified:**",
      "**Status:**",
      "**Verification scope:**",
      "## Verification Status",
      "## Sources"
    ].forEach((required) => {
      if (!content.includes(required)) {
        findings.push(`${file}: missing required tool-page metadata or section "${required}"`);
      }
    });
  }
}

if (!findings.length) {
  console.log(`Metadata validation passed for ${files.length} docs pages.`);
  process.exit(0);
}

console.error("Metadata validation failed:\n");
findings.forEach((finding) => console.error(`- ${finding}`));
process.exit(1);
