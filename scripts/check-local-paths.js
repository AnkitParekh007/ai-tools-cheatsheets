#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const roots = [
  "README.md",
  "CONTRIBUTING.md",
  "CONTRIBUTING_CONTENT.md",
  "CODE_OF_CONDUCT.md",
  "CHANGELOG.md",
  "SECURITY.md",
  ".github",
  "docs"
];

const allowedMissingRoots = new Set(["SECURITY.md"]);
const fileExtensions = new Set([".md", ".yml", ".yaml", ".json", ".txt"]);
const forbiddenPatterns = [
  {
    label: "Windows user profile path",
    regex: /[A-Za-z]:[\\/]+Users[\\/]+[^\\/\s)>\]"']+/g
  },
  {
    label: "macOS user home path",
    regex: /\/Users\/[^/\s)>\]"']+/g
  },
  {
    label: "Linux home path",
    regex: /\/home\/[^/\s)>\]"']+/g
  }
];

function walk(target, files = []) {
  if (!fs.existsSync(target)) return files;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (fileExtensions.has(path.extname(target).toLowerCase())) {
      files.push(target);
    }
    return files;
  }
  for (const entry of fs.readdirSync(target)) {
    if (entry === "node_modules" || entry === "_book" || entry === ".git") continue;
    walk(path.join(target, entry), files);
  }
  return files;
}

const findings = [];

for (const root of roots) {
  if (!fs.existsSync(root)) {
    if (!allowedMissingRoots.has(root)) {
      findings.push({
        file: root,
        line: 1,
        reason: "Expected public root is missing",
        value: root
      });
    }
    continue;
  }

  for (const file of walk(root)) {
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      forbiddenPatterns.forEach(({ label, regex }) => {
        const matches = line.match(regex) || [];
        matches.forEach((match) => {
          findings.push({
            file,
            line: index + 1,
            reason: label,
            value: match
          });
        });
      });
    });
  }
}

if (!findings.length) {
  console.log("No forbidden local filesystem references found in public repository files.");
  process.exit(0);
}

console.error("Forbidden local filesystem references detected:\n");
for (const finding of findings) {
  console.error(`${finding.file}:${finding.line}  ${finding.reason}  ${finding.value}`);
}
process.exit(1);
