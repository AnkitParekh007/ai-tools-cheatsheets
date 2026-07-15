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
const titleMap = new Map();
const descriptionMap = new Map();

for (const row of rows) {
  if (!row.title) findings.push(`${row.sourcePath}: missing title`);
  if (!row.metaDescription) findings.push(`${row.sourcePath}: missing meta description`);
  if (!row.canonical || !row.canonical.startsWith("https://ankitparekh007.github.io/ai-tools-cheatsheets")) {
    findings.push(`${row.sourcePath}: invalid canonical ${row.canonical}`);
  }
  if (!row.schemaType) findings.push(`${row.sourcePath}: missing schema type`);
  if (!row.imagePath) findings.push(`${row.sourcePath}: missing social image mapping`);
  if (row.imagePath && !fs.existsSync(path.join("docs", row.imagePath.replace(/^assets\//, "assets/")))) {
    findings.push(`${row.sourcePath}: missing social image file ${row.imagePath}`);
  }

  if (row.indexStatus === "index") {
    if (titleMap.has(row.title)) {
      findings.push(`${row.sourcePath}: duplicate title with ${titleMap.get(row.title)}`);
    } else {
      titleMap.set(row.title, row.sourcePath);
    }

    if (descriptionMap.has(row.metaDescription)) {
      findings.push(`${row.sourcePath}: duplicate meta description with ${descriptionMap.get(row.metaDescription)}`);
    } else {
      descriptionMap.set(row.metaDescription, row.sourcePath);
    }
  }
}

if (findings.length) {
  console.error("SEO metadata validation failed:\n");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log(`SEO metadata validation passed for ${rows.length} documentation pages.`);
