#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const SITE_URL = "https://ankitparekh007.github.io/ai-tools-cheatsheets";
const SITE_NAME = "AI Tools Cheatsheets";
const SITE_DESCRIPTION =
  "Vendor-neutral handbook for AI coding tools, coding agents, MCP workflows, prompts, templates, security, and team adoption.";
const REPO_URL = "https://github.com/AnkitParekh007/ai-tools-cheatsheets";
const AUTHOR_NAME = "Ankit Parekh";
const AUTHOR_URL = "https://github.com/AnkitParekh007";
const PUBLISHER_LOGO = `${SITE_URL}/assets/images/ai-tools-cheatsheets-logo.svg`;

const DEFAULT_IMAGE_BY_KEY = {
  home: "assets/images/social/social-home.png",
  comparison: "assets/images/social/social-comparison.png",
  agents: "assets/images/social/social-agents.png",
  mcp: "assets/images/social/social-mcp.png",
  workflows: "assets/images/social/social-workflows.png",
  governance: "assets/images/social/social-governance.png"
};

const NON_INDEXED_PATHS = new Set([
  "content-audit.md",
  "launch-readiness-audit.md",
  "seo/seo-audit.md",
  "seo/audience-and-search-intent.md",
  "seo/topic-map.md",
  "seo/search-console-setup.md",
  "seo/analytics-plan.md",
  "seo/seo-scorecard.md",
  "seo/distribution-and-backlink-plan.md",
  "seo/90-day-roadmap.md",
  "seo/implementation-report.md"
]);

const METADATA_OVERRIDES = {
  "README.md": {
    primaryIntent: "AI coding tools handbook",
    title: "AI Coding Tools Handbook for Developers and Teams",
    description:
      "Compare AI coding tools, prompts, MCP workflows, repository instructions, security guidance, and team adoption patterns in one open-source handbook.",
    schemaType: "Article",
    priority: "High",
    imageKey: "home"
  },
  "getting-started/choosing-the-right-tool.md": {
    primaryIntent: "AI coding tool comparison",
    title: "How to Choose the Right AI Coding Tool for Your Workflow",
    description:
      "Choose between terminal agents, IDE assistants, and MCP-enabled workflows with practical guidance for developers, teams, and security-conscious adoption.",
    schemaType: "Article",
    priority: "High",
    imageKey: "comparison"
  },
  "getting-started/comparison-matrix.md": {
    primaryIntent: "AI coding tools comparison",
    title: "AI Coding Tools Comparison for Developers and Teams",
    description:
      "Compare Claude Code, OpenAI Codex, Cursor, GitHub Copilot, Gemini CLI, and related AI coding tools by workflow fit, configuration, security, and team controls.",
    schemaType: "Article",
    priority: "High",
    imageKey: "comparison"
  },
  "configs/agents-md.md": {
    primaryIntent: "AGENTS.md guide",
    title: "AGENTS.md Guide: Examples, Templates and Best Practices for Coding Agents",
    description:
      "Learn what AGENTS.md is, where to place it, how coding agents use it, and how to write repository instructions with examples and safe defaults.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "agents"
  },
  "configs/claude-md.md": {
    primaryIntent: "CLAUDE.md guide",
    title: "CLAUDE.md Guide: Examples and Repository Instructions for Claude Code",
    description:
      "Use CLAUDE.md to guide Claude Code with repository-specific commands, review rules, validation expectations, and safety constraints.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "agents"
  },
  "mcp/overview.md": {
    primaryIntent: "Model Context Protocol explanation",
    title: "What Is MCP? Model Context Protocol for Developers and Teams",
    description:
      "Understand the Model Context Protocol, why MCP servers are powerful, and how to evaluate risk, permissions, and least-privilege setup before adoption.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "mcp"
  },
  "mcp/useful-mcp-servers.md": {
    primaryIntent: "best MCP servers",
    title: "Best MCP Server Categories for Software Development",
    description:
      "Prioritize GitHub, filesystem, browser, database, and collaboration MCP categories with a practical view of value, risk, and team approval needs.",
    schemaType: "Article",
    priority: "High",
    imageKey: "mcp"
  },
  "mcp/github-mcp.md": {
    primaryIntent: "GitHub MCP server",
    title: "GitHub MCP Guide: Permissions, Risks and Evaluation Checklist",
    description:
      "Evaluate GitHub MCP servers for pull requests, issues, repositories, and review workflows with read-only trials, approval questions, and revocation guidance.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "mcp"
  },
  "workflows/code-review.md": {
    primaryIntent: "AI code review workflow",
    title: "AI Code Review Workflow: Findings-First Review for Coding Agents",
    description:
      "Use AI coding tools for safer pull-request reviews with severity-based findings, validation commands, human review checkpoints, and smaller fixes.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "workflows"
  },
  "workflows/test-generation.md": {
    primaryIntent: "AI test generation",
    title: "AI Test Generation Workflow for Safer Regression Coverage",
    description:
      "Generate focused tests with AI coding tools by following local conventions, minimizing mock sprawl, and validating only the behavior that matters.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "workflows"
  },
  "workflows/bug-fixing.md": {
    primaryIntent: "AI bug fixing workflow",
    title: "AI Bug Fixing Workflow: Reproduce, Patch and Validate Safely",
    description:
      "Move from bug symptom to root cause, smallest safe fix, regression test, and rollback plan with AI coding tools and human review checkpoints.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "workflows"
  },
  "workflows/angular-workflows.md": {
    primaryIntent: "AI Angular workflow",
    title: "AI Angular Upgrade Workflow for Existing Repositories",
    description:
      "Plan Angular upgrades with phased dependency review, validation gates, rollback points, and AI-assisted implementation that stays reviewable.",
    schemaType: "TechArticle",
    priority: "High",
    imageKey: "workflows"
  },
  "governance/security-and-permissions.md": {
    primaryIntent: "AI coding security",
    title: "AI Coding Security and Permissions Guide for Engineering Teams",
    description:
      "Define least-privilege access, human approval gates, secret-handling rules, and safe defaults for AI coding tools and privileged MCP workflows.",
    schemaType: "Article",
    priority: "High",
    imageKey: "governance"
  },
  "governance/team-rollout-guide.md": {
    primaryIntent: "AI coding tool rollout plan",
    title: "AI Coding Tool Rollout Plan for Engineering Teams",
    description:
      "Roll out AI coding tools in phases with pilot scope, approval checkpoints, team standards, metrics, and rollback plans for internal adoption.",
    schemaType: "Article",
    priority: "High",
    imageKey: "governance"
  },
  "governance/mcp-approval-policy.md": {
    primaryIntent: "MCP approval policy",
    title: "MCP Security and Approval Checklist for Engineering Teams",
    description:
      "Use a practical MCP approval policy with risk tiers, ownership, credential review, least-privilege pilots, expiry dates, and emergency revocation steps.",
    schemaType: "Article",
    priority: "High",
    imageKey: "governance"
  },
  "templates/tool-evaluation-template.md": {
    primaryIntent: "AI tool evaluation template",
    title: "AI Tool Evaluation Template for Teams and Engineering Leaders",
    description:
      "Compare AI coding tools with a copy-ready evaluation template covering workflow fit, security, setup effort, cost model, and validation status.",
    schemaType: "Article",
    priority: "High",
    imageKey: "governance"
  }
};

function readSummary() {
  const summaryPath = path.join("docs", "SUMMARY.md");
  const lines = fs.readFileSync(summaryPath, "utf8").split(/\r?\n/);
  const pages = [];
  let section = "Start Here";

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch && sectionMatch[1] !== "Summary") {
      section = sectionMatch[1].trim();
      continue;
    }
    const itemMatch = line.match(/^\* \[(.+?)\]\((.+?)\)$/);
    if (!itemMatch) continue;
    pages.push({
      label: itemMatch[1].trim(),
      target: itemMatch[2].trim(),
      section
    });
  }

  return pages;
}

function sourcePathFromTarget(target) {
  return path.join("docs", target.replace(/\//g, path.sep));
}

function relativeDocPath(sourcePath) {
  return path.relative("docs", sourcePath).replace(/\\/g, "/");
}

function routeFromSourcePath(sourcePath) {
  const rel = relativeDocPath(sourcePath);
  if (rel === "README.md") return "/";
  if (rel.endsWith("/README.md")) {
    return `/${rel.slice(0, -"/README.md".length)}/`;
  }
  return `/${rel.replace(/\.md$/i, ".html")}`;
}

function canonicalFromRoute(route) {
  if (route === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${route}`;
}

function builtPathFromSourcePath(sourcePath) {
  const rel = relativeDocPath(sourcePath);
  if (rel === "README.md") return path.join("_book", "index.html");
  if (rel.endsWith("/README.md")) {
    return path.join("_book", rel.slice(0, -"/README.md".length), "index.html");
  }
  return path.join("_book", rel.replace(/\.md$/i, ".html"));
}

function sanitizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMarkdown(value) {
  return sanitizeText(
    value
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/^>\s?/gm, "")
      .replace(/^#+\s+/gm, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\|/g, " ")
      .replace(/[*_~]/g, "")
  );
}

function firstMeaningfulParagraph(markdown) {
  const cleaned = markdown
    .replace(/\r/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/);

  for (const block of cleaned) {
    const text = stripMarkdown(block).trim();
    if (!text) continue;
    if (text.startsWith("Last updated:")) continue;
    if (/^(Type|Best for|Official docs|Last verified|Status|Verification scope|Purpose|Maintainer|License):/i.test(text)) {
      continue;
    }
    if (text.length < 30) continue;
    return text;
  }

  return "";
}

function truncateDescription(text) {
  const normalized = sanitizeText(text);
  if (normalized.length <= 165) return normalized;
  const shortened = normalized.slice(0, 162);
  return `${shortened.replace(/[,\s]+$/, "")}...`;
}

function sectionKey(section) {
  return section.toLowerCase();
}

function inferPrimaryIntent(page) {
  const rel = page.relativePath;
  if (rel.startsWith("tools/")) return `${page.label} guide`;
  if (rel.startsWith("configs/")) return `${page.label} instructions`;
  if (rel.startsWith("workflows/")) return `${page.label} workflow`;
  if (rel.startsWith("mcp/")) return `${page.label} MCP guidance`;
  if (rel.startsWith("prompts/")) return `${page.label} prompt`;
  if (rel.startsWith("templates/")) return `${page.label} template`;
  if (rel.startsWith("governance/")) return `${page.label} policy`;
  if (rel.startsWith("for-")) return `${page.label} landing page`;
  return `${page.label} guide`;
}

function inferSchemaType(page) {
  const rel = page.relativePath;
  if (rel === "README.md") return "Article";
  if (rel.startsWith("for-")) return "Article";
  if (rel.startsWith("workflows/")) return "TechArticle";
  if (rel.startsWith("tools/")) return "TechArticle";
  if (rel.startsWith("configs/")) return "TechArticle";
  if (rel.startsWith("mcp/")) return "TechArticle";
  if (rel.startsWith("prompts/")) return "TechArticle";
  return "Article";
}

function inferPriority(page) {
  const rel = page.relativePath;
  if (
    rel === "README.md" ||
    rel === "getting-started/comparison-matrix.md" ||
    rel === "getting-started/choosing-the-right-tool.md" ||
    rel === "configs/agents-md.md" ||
    rel === "configs/claude-md.md" ||
    rel === "mcp/overview.md" ||
    rel === "mcp/github-mcp.md" ||
    rel === "workflows/code-review.md" ||
    rel === "workflows/test-generation.md" ||
    rel === "workflows/bug-fixing.md" ||
    rel === "workflows/angular-workflows.md" ||
    rel === "governance/security-and-permissions.md" ||
    rel === "governance/team-rollout-guide.md" ||
    rel === "governance/mcp-approval-policy.md" ||
    rel === "templates/tool-evaluation-template.md"
  ) {
    return "High";
  }
  if (page.section === "Tools" || page.section === "Config Files" || rel.startsWith("for-")) {
    return "Medium";
  }
  if (NON_INDEXED_PATHS.has(rel)) {
    return "Low";
  }
  return "Medium";
}

function inferImageKey(page) {
  const rel = page.relativePath;
  if (rel === "README.md" || rel.startsWith("for-")) return "home";
  if (rel.includes("comparison") || rel.startsWith("tools/")) return "comparison";
  if (rel.startsWith("configs/") || rel.startsWith("templates/AGENTS") || rel.startsWith("templates/CLAUDE")) {
    return "agents";
  }
  if (rel.startsWith("mcp/")) return "mcp";
  if (rel.startsWith("workflows/") || rel.startsWith("prompts/")) return "workflows";
  if (rel.startsWith("governance/") || rel.startsWith("templates/")) return "governance";
  return "home";
}

function inferIndexStatus(page) {
  if (NON_INDEXED_PATHS.has(page.relativePath)) return "noindex";
  return "index";
}

function defaultTitle(page) {
  const rel = page.relativePath;
  if (rel.startsWith("tools/README")) return "AI Coding Tool Guides and Setup Reference";
  if (rel.startsWith("tools/")) return `${page.label} Guide: Setup, Commands, Security and Workflows`;
  if (rel.startsWith("configs/README")) return "AI Repository Instruction Files and Configuration Guides";
  if (rel.startsWith("configs/")) return `${page.label} Guide and Best Practices for AI Coding Tools`;
  if (rel.startsWith("workflows/README")) return "AI Coding Workflows for Review, Testing and Debugging";
  if (rel.startsWith("workflows/")) return `${page.label} Workflow for AI Coding Tools`;
  if (rel.startsWith("mcp/README")) return "MCP Guides for Developers, Teams and Security Reviewers";
  if (rel.startsWith("mcp/")) return `${page.label}: MCP Guide, Security and Evaluation`;
  if (rel.startsWith("prompts/README")) return "AI Coding Prompt Library for Developers and Teams";
  if (rel.startsWith("prompts/")) return `${page.label}: AI Coding Prompt Starters and Examples`;
  if (rel.startsWith("templates/README")) return "AI Coding Templates for Developers and Teams";
  if (rel.startsWith("templates/")) return `${page.label}: Copy-Ready Template for AI Coding Workflows`;
  if (rel.startsWith("governance/README")) return "AI Coding Governance Guides for Engineering Teams";
  if (rel.startsWith("governance/")) return `${page.label}: AI Coding Policy Starter for Engineering Teams`;
  if (rel.startsWith("for-developers/")) return "AI Coding Tools for Developers: Setup, Workflows and MCP Safety";
  if (rel.startsWith("for-teams/")) return "AI Coding Tools for Teams: Standards, Security and Rollout";
  if (rel.startsWith("for-engineering-leaders/")) {
    return "AI Coding Governance and Adoption Guide for Engineering Leaders";
  }
  if (rel.startsWith("for-platform-and-security/")) {
    return "AI Coding Security and MCP Controls for Platform and Security Teams";
  }
  if (rel.startsWith("getting-started/")) return `${page.label} for AI Coding Tools and Coding Agents`;
  return `${page.label} - ${SITE_NAME}`;
}

function defaultDescription(page, excerpt) {
  const rel = page.relativePath;
  if (excerpt) {
    if (rel.startsWith("tools/")) {
      return truncateDescription(`${excerpt} Learn setup, commands, limitations, security notes, and related workflows.`);
    }
    if (rel.startsWith("configs/")) {
      return truncateDescription(`${excerpt} Use copy-ready repository instructions and safer defaults for coding agents.`);
    }
    if (rel.startsWith("workflows/")) {
      return truncateDescription(`${excerpt} Follow validation steps, review checkpoints, and practical prompts for safer AI-assisted delivery.`);
    }
    if (rel.startsWith("mcp/")) {
      return truncateDescription(`${excerpt} Review permissions, least-privilege setup, and team approval guidance before adoption.`);
    }
    if (rel.startsWith("prompts/")) {
      return truncateDescription(`${excerpt} Use prompt starters, examples, and human review guidance for daily AI coding work.`);
    }
    if (rel.startsWith("templates/")) {
      return truncateDescription(`${excerpt} Reuse templates for AI coding workflows, prompts, evaluation, and team policy.`);
    }
    if (rel.startsWith("governance/")) {
      return truncateDescription(`${excerpt} Use this policy starter to standardize secure AI coding tool adoption.`);
    }
    return truncateDescription(excerpt);
  }

  if (rel.startsWith("for-developers/")) {
    return "Start here if you want practical AI coding tool setup, workflow guides, prompts, MCP safety basics, and next steps for daily development work.";
  }
  if (rel.startsWith("for-teams/")) {
    return "Curated AI coding guidance for teams standardizing tools, prompts, repository instructions, MCP controls, and rollout practices.";
  }
  if (rel.startsWith("for-engineering-leaders/")) {
    return "Use this guide to evaluate AI coding tool adoption, governance, rollout phases, risk, and developer productivity strategy.";
  }
  if (rel.startsWith("for-platform-and-security/")) {
    return "Review permissions, least privilege, MCP approval, credential handling, and revocation steps for secure AI coding tool adoption.";
  }

  return `${page.label} in the ${SITE_NAME} handbook for developers, engineering teams, and security-conscious AI coding adoption.`;
}

function getGitDate(filePath) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", filePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch (error) {
    return new Date().toISOString().slice(0, 10);
  }
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, "\"\"")}"`;
  }
  return stringValue;
}

function metadataRows() {
  const pages = readSummary();

  return pages.map((page) => {
    const sourcePath = sourcePathFromTarget(page.target);
    const relativePath = relativeDocPath(sourcePath);
    const markdown = fs.readFileSync(sourcePath, "utf8");
    const excerpt = firstMeaningfulParagraph(markdown);
    const override = METADATA_OVERRIDES[relativePath] || {};
    const route = routeFromSourcePath(sourcePath);
    const imageKey = override.imageKey || inferImageKey({ ...page, relativePath });

    return {
      label: page.label,
      section: page.section,
      target: page.target,
      sourcePath: sourcePath.replace(/\\/g, "/"),
      relativePath,
      route,
      publicUrl: canonicalFromRoute(route),
      builtPath: builtPathFromSourcePath(sourcePath).replace(/\\/g, "/"),
      primaryIntent: override.primaryIntent || inferPrimaryIntent({ ...page, relativePath }),
      title: override.title || defaultTitle({ ...page, relativePath }),
      metaDescription: override.description || defaultDescription({ ...page, relativePath }, excerpt),
      canonical: canonicalFromRoute(route),
      indexStatus: override.indexStatus || inferIndexStatus({ ...page, relativePath }),
      schemaType: override.schemaType || inferSchemaType({ ...page, relativePath }),
      priority: override.priority || inferPriority({ ...page, relativePath }),
      imageKey,
      imagePath: DEFAULT_IMAGE_BY_KEY[imageKey],
      imageUrl: `${SITE_URL}/${DEFAULT_IMAGE_BY_KEY[imageKey]}`,
      lastModified: getGitDate(sourcePath)
    };
  });
}

function metadataCsv(rows) {
  const header = [
    "Source path",
    "Public URL",
    "Primary intent",
    "Title",
    "Meta description",
    "Canonical",
    "Index status",
    "Schema type",
    "Priority"
  ];

  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.sourcePath,
        row.publicUrl,
        row.primaryIntent,
        row.title,
        row.metaDescription,
        row.canonical,
        row.indexStatus,
        row.schemaType,
        row.priority
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  return `${lines.join("\n")}\n`;
}

module.exports = {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  REPO_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
  PUBLISHER_LOGO,
  DEFAULT_IMAGE_BY_KEY,
  NON_INDEXED_PATHS,
  readSummary,
  sourcePathFromTarget,
  relativeDocPath,
  routeFromSourcePath,
  canonicalFromRoute,
  builtPathFromSourcePath,
  firstMeaningfulParagraph,
  metadataRows,
  metadataCsv,
  getGitDate
};
