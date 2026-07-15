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

const textExtensions = new Set([".md", ".yml", ".yaml"]);
const externalWarnings = [];
const internalFailures = [];

function walk(target, files = []) {
  if (!fs.existsSync(target)) return files;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (textExtensions.has(path.extname(target).toLowerCase())) {
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

function slugifyHeading(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const headingCache = new Map();

function getAnchorsForFile(filePath) {
  if (headingCache.has(filePath)) return headingCache.get(filePath);
  const text = fs.readFileSync(filePath, "utf8");
  const anchors = new Set();
  const headingMatches = text.matchAll(/^#{1,6}\s+(.+)$/gm);
  const counts = new Map();
  for (const match of headingMatches) {
    const base = slugifyHeading(match[1]);
    const nextCount = counts.get(base) || 0;
    counts.set(base, nextCount + 1);
    anchors.add(nextCount === 0 ? base : `${base}-${nextCount}`);
  }
  headingCache.set(filePath, anchors);
  return anchors;
}

function parseLinks(file, content) {
  const lines = content.split(/\r?\n/);
  const results = [];
  const mdLinkPattern = /!?\[[^\]]*?\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g;
  const htmlLinkPattern = /\b(?:href|src)=["']([^"']+)["']/g;

  lines.forEach((line, index) => {
    for (const pattern of [mdLinkPattern, htmlLinkPattern]) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const raw = match[1].trim().replace(/^<|>$/g, "");
        const target = raw.split(/\s+"/)[0];
        results.push({ file, line: index + 1, target });
      }
    }
  });

  return results;
}

function markdownToBuiltPath(sourcePath) {
  const rel = path.relative("docs", sourcePath).replace(/\\/g, "/");
  if (rel === "README.md") return path.join("_book", "index.html");
  if (rel.endsWith("/README.md")) {
    return path.join("_book", rel.slice(0, -"/README.md".length), "index.html");
  }
  return path.join("_book", rel.replace(/\.md$/i, ".html"));
}

function recordInternalFailure(file, line, target, reason) {
  internalFailures.push({ file, line, target, reason });
}

function recordExternalWarning(file, line, target, reason) {
  externalWarnings.push({ file, line, target, reason });
}

async function validateExternalLinks(links) {
  const unique = new Map();
  links.forEach((link) => {
    if (!unique.has(link.target)) unique.set(link.target, []);
    unique.get(link.target).push(link);
  });

  await Promise.all(
    [...unique.entries()].map(async ([target, locations]) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        let response = await fetch(target, {
          method: "HEAD",
          redirect: "follow",
          signal: controller.signal
        });
        if (response.status === 405 || response.status === 403) {
          response = await fetch(target, {
            method: "GET",
            redirect: "follow",
            signal: controller.signal
          });
        }
        clearTimeout(timeout);
        if (response.status >= 400) {
          locations.forEach((location) =>
            recordExternalWarning(location.file, location.line, target, `HTTP ${response.status}`)
          );
        }
      } catch (error) {
        locations.forEach((location) =>
          recordExternalWarning(location.file, location.line, target, error.name || "External link check failed")
        );
      }
    })
  );
}

function resolveLink(file, target) {
  const [rawPath, rawAnchor] = target.split("#");
  const anchor = rawAnchor ? rawAnchor.trim() : "";

  if (target.startsWith("mailto:")) return { type: "skip" };
  if (target.startsWith("http://") || target.startsWith("https://")) return { type: "external" };
  if (target.startsWith("javascript:")) return { type: "invalid", reason: "javascript: links are not allowed" };
  if (target.startsWith("/")) return { type: "invalid", reason: "root-relative links are not allowed in source docs" };

  const baseDir = path.dirname(file);
  const resolvedPath = rawPath ? path.resolve(baseDir, rawPath) : path.resolve(file);
  return { type: "internal", resolvedPath, anchor };
}

async function main() {
  const files = roots.flatMap((root) => walk(root));
  const externalLinks = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const links = parseLinks(file, content);

    for (const link of links) {
      const resolution = resolveLink(file, link.target);

      if (resolution.type === "skip") continue;
      if (resolution.type === "external") {
        externalLinks.push(link);
        continue;
      }
      if (resolution.type === "invalid") {
        recordInternalFailure(link.file, link.line, link.target, resolution.reason);
        continue;
      }

      const targetPath = resolution.resolvedPath;
      if (!fs.existsSync(targetPath)) {
        recordInternalFailure(link.file, link.line, link.target, "target file does not exist");
        continue;
      }

      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        recordInternalFailure(link.file, link.line, link.target, "links must target files, not directories");
        continue;
      }

      if (resolution.anchor) {
        const anchors = getAnchorsForFile(targetPath);
        if (!anchors.has(resolution.anchor)) {
          recordInternalFailure(link.file, link.line, link.target, `anchor not found: #${resolution.anchor}`);
        }
      }

      if (targetPath.startsWith(path.resolve("docs")) && targetPath.endsWith(".md")) {
        const builtPath = markdownToBuiltPath(targetPath);
        if (fs.existsSync("_book") && !fs.existsSync(builtPath)) {
          recordInternalFailure(link.file, link.line, link.target, `generated route missing: ${builtPath}`);
        }
      }
    }
  }

  await validateExternalLinks(externalLinks);

  if (internalFailures.length) {
    console.error("Internal link validation failed:\n");
    internalFailures.forEach((failure) =>
      console.error(`- ${failure.file}:${failure.line}  ${failure.target}  ${failure.reason}`)
    );
  }

  if (externalWarnings.length) {
    console.warn("\nExternal link warnings:\n");
    externalWarnings.forEach((warning) =>
      console.warn(`- ${warning.file}:${warning.line}  ${warning.target}  ${warning.reason}`)
    );
  }

  if (internalFailures.length) {
    process.exit(1);
  }

  console.log(
    `Validated ${files.length} source files. Internal links passed. External warnings: ${externalWarnings.length}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
