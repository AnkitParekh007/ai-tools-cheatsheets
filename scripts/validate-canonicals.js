#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const metadataPath = path.join("docs", "seo", "page-metadata.json");

if (!fs.existsSync(metadataPath)) {
  console.error("Missing docs/seo/page-metadata.json. Run npm run seo:prepare first.");
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const findings = [];

for (const row of rows) {
  if (!fs.existsSync(row.builtPath)) {
    findings.push(`${row.sourcePath}: built file missing at ${row.builtPath}`);
    continue;
  }

  const html = fs.readFileSync(row.builtPath, "utf8");
  const matches = [...html.matchAll(/<link rel="canonical" href="([^"]+)">/g)];

  if (matches.length !== 1) {
    findings.push(`${row.sourcePath}: expected 1 canonical, found ${matches.length}`);
    continue;
  }

  if (matches[0][1] !== row.canonical) {
    findings.push(`${row.sourcePath}: canonical mismatch ${matches[0][1]} != ${row.canonical}`);
  }
}

if (findings.length) {
  console.error("Canonical validation failed:\n");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log(`Canonical validation passed for ${rows.length} built pages.`);
