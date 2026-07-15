#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { readSummary } = require("./seo-lib");

const allowlistPrefixes = ["docs/seo/"];
const allowlistFiles = new Set(["docs/SUMMARY.md"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["_book", "assets", "_layouts"].includes(entry.name)) continue;
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full.replace(/\\/g, "/"));
    }
  }
  return files;
}

const linked = new Set(
  readSummary().map((page) => path.join("docs", page.target).replace(/\\/g, "/"))
);

const docsFiles = walk("docs");
const orphans = docsFiles.filter((file) => {
  if (linked.has(file)) return false;
  if (allowlistFiles.has(file)) return false;
  return !allowlistPrefixes.some((prefix) => file.startsWith(prefix));
});

if (orphans.length) {
  console.error("Orphan page validation failed:\n");
  orphans.forEach((orphan) => console.error(`- ${orphan}`));
  process.exit(1);
}

console.log(`Orphan page validation passed. ${docsFiles.length} Markdown files inspected.`);
