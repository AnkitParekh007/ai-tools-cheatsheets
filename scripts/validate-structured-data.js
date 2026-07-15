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
    findings.push(`${row.sourcePath}: built file missing`);
    continue;
  }

  const html = fs.readFileSync(row.builtPath, "utf8");
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!matches.length) {
    findings.push(`${row.sourcePath}: missing JSON-LD`);
    continue;
  }

  const types = [];
  for (const match of matches) {
    try {
      const parsed = JSON.parse(match[1]);
      types.push(parsed["@type"]);
      if (!parsed["@context"]) findings.push(`${row.sourcePath}: schema missing @context`);
      if (parsed["@type"] === row.schemaType || parsed["@type"] === "WebSite") {
        if (!parsed.url && !parsed.mainEntityOfPage) {
          findings.push(`${row.sourcePath}: primary schema missing url`);
        }
        if (!parsed.description && row.relativePath !== "README.md") {
          findings.push(`${row.sourcePath}: primary schema missing description`);
        }
      }
    } catch (error) {
      findings.push(`${row.sourcePath}: invalid JSON-LD (${error.message})`);
    }
  }

  if (row.relativePath === "README.md") {
    if (!types.includes("WebSite")) findings.push(`${row.sourcePath}: missing WebSite schema`);
  } else {
    if (!types.includes(row.schemaType)) findings.push(`${row.sourcePath}: missing ${row.schemaType} schema`);
    if (!types.includes("BreadcrumbList")) findings.push(`${row.sourcePath}: missing BreadcrumbList schema`);
  }
}

if (findings.length) {
  console.error("Structured data validation failed:\n");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log(`Structured data validation passed for ${rows.length} built pages.`);
