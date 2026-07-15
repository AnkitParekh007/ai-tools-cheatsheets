#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { metadataRows, metadataCsv } = require("./seo-lib");

const rows = metadataRows();
const seoDir = path.join("docs", "seo");

fs.mkdirSync(seoDir, { recursive: true });
fs.writeFileSync(path.join(seoDir, "page-metadata.csv"), metadataCsv(rows), "utf8");
fs.writeFileSync(path.join(seoDir, "page-metadata.json"), `${JSON.stringify(rows, null, 2)}\n`, "utf8");

console.log(`Generated SEO metadata for ${rows.length} documentation pages.`);
