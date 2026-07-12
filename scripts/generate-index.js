#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const sections = [
  "docs/getting-started",
  "docs/tools",
  "docs/configs",
  "docs/workflows",
  "docs/mcp",
  "docs/prompts",
  "docs/templates",
  "docs/governance"
];
const root = process.cwd();

function toTitle(name) {
  return name
    .replace(/\.md$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function listMarkdown(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => `- [${toTitle(file)}](${dir}/${file})`);
}

let output = "# Generated Index\n\n";

for (const section of sections) {
  output += `## ${toTitle(section)}\n\n`;
  const items = listMarkdown(section);
  output += (items.length ? items.join("\n") : "- No files found") + "\n\n";
}

process.stdout.write(output);
