#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const roots = ["README.md", "docs", ".github"];
const linkPattern = /https?:\/\/[^\s)>\]]+/g;

function walk(target, files = []) {
  if (!fs.existsSync(target)) return files;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (target.endsWith(".md") || target.endsWith(".yml") || target.endsWith(".yaml")) {
      files.push(target);
    }
    return files;
  }
  for (const entry of fs.readdirSync(target)) {
    walk(path.join(target, entry), files);
  }
  return files;
}

console.log("Basic placeholder link verification");
console.log("Scans Markdown and workflow files for inline http/https links.");
console.log("Review any changed or stale URLs manually before merge.\n");

for (const root of roots) {
  for (const file of walk(root)) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(linkPattern) || [];
    for (const match of matches) {
      console.log(`${file}: ${match}`);
    }
  }
}
