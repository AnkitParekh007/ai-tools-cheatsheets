#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const targetDirs = ["tools"];
const today = new Date().toISOString().slice(0, 10);

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".md")) continue;
    const full = path.join(dir, file);
    const content = fs.readFileSync(full, "utf8");
    const updated = content.replace(
      /\*\*Last verified:\*\* \d{4}-\d{2}-\d{2}/,
      `**Last verified:** ${today}`
    );
    fs.writeFileSync(full, updated, "utf8");
  }
}

console.log(`Updated Last verified dates to ${today}`);
