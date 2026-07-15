#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { SITE_URL } = require("./seo-lib");

const metadataPath = path.join("docs", "seo", "page-metadata.json");

if (!fs.existsSync(metadataPath)) {
  console.error("Missing docs/seo/page-metadata.json. Run npm run seo:prepare first.");
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const indexableRows = rows.filter((row) => row.indexStatus === "index");

const sitemapLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (const row of indexableRows) {
  sitemapLines.push("  <url>");
  sitemapLines.push(`    <loc>${row.publicUrl}</loc>`);
  if (row.lastModified) {
    sitemapLines.push(`    <lastmod>${row.lastModified}</lastmod>`);
  }
  sitemapLines.push("  </url>");
}

sitemapLines.push("</urlset>");
fs.writeFileSync(path.join("_book", "sitemap.xml"), `${sitemapLines.join("\n")}\n`, "utf8");

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join("_book", "robots.txt"), robots, "utf8");

const llms = [
  `# ${SITE_URL}/llms.txt`,
  `site: ${SITE_URL}/`,
  "project: AI Tools Cheatsheets",
  "purpose: Vendor-neutral handbook for AI coding tools, coding agents, MCP workflows, prompts, templates, and team governance.",
  "sections:",
  `- ${SITE_URL}/getting-started/comparison-matrix.html`,
  `- ${SITE_URL}/configs/agents-md.html`,
  `- ${SITE_URL}/mcp/overview.html`,
  `- ${SITE_URL}/workflows/code-review.html`,
  `- ${SITE_URL}/governance/team-rollout-guide.html`,
  "verification-policy: Pages explicitly label what is documentation verified, locally tested, or still needs verification.",
  "repository: https://github.com/AnkitParekh007/ai-tools-cheatsheets",
  "license: MIT"
].join("\n");
fs.writeFileSync(path.join("_book", "llms.txt"), `${llms}\n`, "utf8");

console.log(`Generated sitemap.xml, robots.txt, and llms.txt for ${indexableRows.length} indexable pages.`);
