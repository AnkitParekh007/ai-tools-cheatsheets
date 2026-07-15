#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  REPO_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
  PUBLISHER_LOGO
} = require("./seo-lib");

const metadataPath = path.join("docs", "seo", "page-metadata.json");

if (!fs.existsSync(metadataPath)) {
  console.error("Missing docs/seo/page-metadata.json. Run npm run seo:prepare first.");
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const rowByRelativePath = new Map(rows.map((row) => [row.relativePath, row]));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function breadcrumbSchema(row) {
  const items = [{ name: "Home", url: `${SITE_URL}/` }];
  const parts = row.relativePath.split("/");

  if (parts.length > 1) {
    const sectionOverview = rowByRelativePath.get(`${parts[0]}/README.md`);
    if (sectionOverview) {
      items.push({ name: sectionOverview.label, url: sectionOverview.publicUrl });
    }
  }

  if (row.relativePath !== "README.md" && (!items.length || items[items.length - 1].url !== row.publicUrl)) {
    items.push({ name: row.label, url: row.publicUrl });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function primarySchema(row) {
  if (row.relativePath === "README.md") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: AUTHOR_URL
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR_NAME,
        url: AUTHOR_URL
      }
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": row.schemaType,
      headline: row.title,
      description: row.metaDescription,
      url: row.publicUrl,
      dateModified: row.lastModified,
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: AUTHOR_URL
      },
      publisher: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
        logo: {
          "@type": "ImageObject",
          url: PUBLISHER_LOGO
        }
      },
      image: row.imageUrl,
      mainEntityOfPage: row.publicUrl
    },
    breadcrumbSchema(row)
  ];
}

function seoMetaBlock(row) {
  const robotsContent = row.indexStatus === "index" ? "index,follow,max-image-preview:large" : "noindex,follow";
  const ogType = row.relativePath === "README.md" ? "website" : "article";
  return [
    "<!-- SEO_META_START -->",
    `<meta name="description" content="${escapeHtml(row.metaDescription)}">`,
    `<meta name="robots" content="${robotsContent}">`,
    `<link rel="canonical" href="${row.canonical}">`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:title" content="${escapeHtml(row.title)}">`,
    `<meta property="og:description" content="${escapeHtml(row.metaDescription)}">`,
    `<meta property="og:url" content="${row.publicUrl}">`,
    `<meta property="og:image" content="${row.imageUrl}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeHtml(row.title)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(row.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(row.metaDescription)}">`,
    `<meta name="twitter:image" content="${row.imageUrl}">`,
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}">`,
    "<!-- SEO_META_END -->"
  ].join("\n    ");
}

function schemaBlock(row) {
  const blocks = primarySchema(row)
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n    ");

  return `<!-- SEO_SCHEMA_START -->\n    ${blocks}\n    <!-- SEO_SCHEMA_END -->`;
}

function stripPreviousSeo(html) {
  return html
    .replace(/<!-- SEO_META_START -->[\s\S]*?<!-- SEO_META_END -->\s*/g, "")
    .replace(/<!-- SEO_SCHEMA_START -->[\s\S]*?<!-- SEO_SCHEMA_END -->\s*/g, "")
    .replace(/\s*<meta name="description" content="[^"]*">\s*/g, "\n")
    .replace(/\s*<meta name="robots" content="[^"]*">\s*/g, "\n")
    .replace(/\s*<meta property="og:[^"]+" content="[^"]*">\s*/g, "\n")
    .replace(/\s*<meta name="twitter:[^"]+" content="[^"]*">\s*/g, "\n")
    .replace(/\s*<meta name="author" content="[^"]*">\s*/g, "\n")
    .replace(/\s*<link rel="canonical" href="[^"]*">\s*/g, "\n")
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, (match) =>
      match.includes('"@context":"https://schema.org"') ? "\n" : match
    );
}

for (const row of rows) {
  const builtPath = row.builtPath;
  if (!fs.existsSync(builtPath)) continue;

  let html = fs.readFileSync(builtPath, "utf8");
  html = stripPreviousSeo(html);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(row.title)}</title>`);

  const injection = `    ${seoMetaBlock(row)}\n    ${schemaBlock(row)}\n`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${injection}</head>`);
  } else {
    console.error(`Missing </head> in ${builtPath}`);
    process.exit(1);
  }

  fs.writeFileSync(builtPath, html, "utf8");
}

console.log(`Applied SEO metadata and structured data to ${rows.length} built pages.`);
