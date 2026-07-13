# Content Audit

Last updated: 2026-07-13

## Scope

This audit covers the current HonKit source under [docs](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs), the navigation in [SUMMARY.md](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/SUMMARY.md), the build and helper scripts in [package.json](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/package.json) and [scripts](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/scripts), and the customized website shell in [docs/_layouts/website](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/_layouts/website).

This document records concise findings, classification decisions, and actionable gaps. It does not record private reasoning.

## Technical Audit

### Framework and publishing

- Documentation framework: HonKit, rooted at `./docs`, configured by [book.json](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/book.json).
- Site structure: navigation is controlled entirely through [docs/SUMMARY.md](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/SUMMARY.md).
- Theming: custom website templates and styles live in [docs/_layouts/website](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/_layouts/website) and [docs/assets/css/custom.css](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/assets/css/custom.css).
- Client behavior: custom page behavior, theme controls, and route-specific styling live in [docs/assets/js/custom.js](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/assets/js/custom.js).
- Published URL model: stable HonKit HTML output with section index pages and page `.html` URLs.

### Build and validation surface

- Available scripts today:
  - `npm run docs:init`
  - `npm run docs:serve`
  - `npm run docs:build`
  - `npm run docs:debug`
  - `npm run links:check`
  - `npm run index:generate`
- Existing validation is weak:
  - [scripts/verify-links.js](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/scripts/verify-links.js) only prints discovered URLs. It does not verify status codes, anchors, or internal links.
  - [scripts/update-last-verified.js](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/scripts/update-last-verified.js) targets `tools` at repo root, not `docs/tools`, so it does not update the current source tree.
- Missing quality gates:
  - no markdown lint
  - no internal-anchor validation
  - no external-link validation
  - no navigation consistency check
  - no spell check
  - no duplicate-heading detection
  - no content metadata validation
  - no CI-specific docs pipeline visible in the current repository root

### Reusable source patterns

- Reusable layout shell:
  - [layout.html](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/_layouts/website/layout.html)
  - [page.html](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/_layouts/website/page.html)
  - [header.html](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/_layouts/website/header.html)
- Reusable content patterns today:
  - tool pages share a repeated heading structure and metadata block
  - workflow pages are highly templated and near-duplicate in shape
  - MCP pages are short metadata stubs
  - prompt pages are mostly placeholders with tiny code blocks
- Missing content standards:
  - no maintainer-facing content contribution standard
  - no canonical verification taxonomy beyond ad hoc `Status` labels
  - no consistent `Sources` section outside tool pages
  - no explicit archetype rules per page type

## Site Inventory Summary

| Section | Pages | Overall state | Main problem |
| --- | ---: | --- | --- |
| Start Here | 9 | Mixed | good positioning, uneven depth, limited evidence |
| Tools | 13 | Moderate | structured but shallow, light demonstrations |
| Config Files | 7 | Thin | mostly placeholders |
| Workflows | 15 | Thin | repetitive templates, little evidence or validation |
| MCP | 14 | Thin | security intent present, implementation detail absent |
| Prompts | 12 | Placeholder | many pages contain only a label and one code block |
| Templates | 8 | Thin | useful skeletons, weak explanation and examples |
| Governance | 9 | Thin | not policy-grade yet |
| Reference | 1 | Thin | glossary coverage is minimal |

## Cross-Cutting Findings

### Strong patterns worth preserving

- Clear information architecture and section-based navigation.
- Vendor-neutral positioning is already visible in Start Here and comparison content.
- Tool pages already include:
  - `Last verified`
  - `Status`
  - official documentation link
  - `Sources` section
- Security-first stance is present, especially in tool metadata and governance intent.
- The site already supports a polished documentation UI and should be evolved, not rebuilt.

### Systemic content gaps

- Most pages do not include explicit citations.
- Verification metadata is inconsistent outside `docs/tools`.
- Many pages have headings without substantive body content.
- Demonstration-driven examples are scarce across workflows, MCP, prompts, templates, and governance.
- Many pages state recommendations but do not distinguish:
  - confirmed capability
  - team recommendation
  - limitation
  - unverified assumption
- Security coverage is uneven outside tools and a few governance pages.
- Multiple sections lack production-grade examples, validation steps, and failure modes.

### Duplicated or highly repetitive areas

- Workflow pages are structurally repetitive and likely authored from the same minimal template.
- MCP pages are repeated metadata stubs with only the service name swapped.
- Prompt pages are repeated placeholder prompt shells with almost no explanatory material.
- Template pages are useful as seeds but not yet full documentation pages.

### Highest-priority gaps

- Config Files section is not yet practically usable.
- MCP section needs major technical verification and source-backed implementation guidance.
- Prompts section needs filled examples, expected outputs, and failure analysis.
- Governance section needs conversion from lightweight notes into copy-ready policy material.
- Workflow section needs realistic end-to-end demonstrations and validation commands.

## Classification Rules Used In This Audit

- `Strong`: already useful, sourceable, and structurally mature; needs mostly enrichment.
- `Moderate`: usable, but shallow or inconsistent.
- `Thin`: has real direction but lacks implementation depth.
- `Placeholder`: mostly headings, bullets, or skeletal examples.
- `Stale`: likely needs factual re-verification because claims are weakly sourced or dated.
- `Duplicate`: materially overlaps another page structure or content pattern.
- `Needs technical verification`: page makes or implies product-specific claims that need primary-source checking.
- `Needs editorial improvement`: page needs better headings, scope, reader outcome, or prose discipline.
- `Needs demonstration`: page lacks realistic examples or validation.
- `Needs policy expansion`: page is intended as governance but not yet usable as policy.

## Page Inventory

### Start Here

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `docs/README.md` | `/` | Landing page and section launcher | Moderate | None | examples: some, citations: none, commands: none, security: light | Moderate, Needs editorial improvement, Needs evidence | High |
| Why This Repo Exists | `docs/getting-started/why-this-repo.md` | `/getting-started/why-this-repo.html` | Positioning and philosophy | Moderate | Verification note only | examples: none, citations: none, commands: none, security: none | Moderate, Needs evidence | Medium |
| Quick Start | `docs/getting-started/quick-start.md` | `/getting-started/quick-start.html` | First-use path | Thin | None | examples: limited, citations: none, commands: none, security: light | Thin, Needs demonstration | High |
| How to Use This Site | `docs/getting-started/how-to-use-this-site.md` | `/getting-started/how-to-use-this-site.html` | Reader navigation guidance | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder, Needs editorial improvement | Medium |
| Choosing the Right Tool | `docs/getting-started/choosing-the-right-tool.md` | `/getting-started/choosing-the-right-tool.html` | Scenario-based tool guidance | Moderate | Verification note only | examples: none, citations: none, commands: none, security: none | Moderate, Needs evidence, Needs demonstration | High |
| Comparison Matrix | `docs/getting-started/comparison-matrix.md` | `/getting-started/comparison-matrix.html` | Cross-tool comparison | Moderate | Verification note | examples: practical recommendations, citations: none, commands: none, security: light | Moderate, Needs evidence | High |
| Terminology | `docs/getting-started/terminology.md` | `/getting-started/terminology.html` | Basic glossary seed | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | Medium |
| Fork for Your Team | `docs/getting-started/fork-for-your-team.md` | `/getting-started/fork-for-your-team.html` | Customization guidance | Thin | None | examples: light, citations: none, commands: none, security: light | Thin, Needs demonstration | Medium |
| Social Preview and Promotion | `docs/getting-started/social-preview-and-promotion.md` | `/getting-started/social-preview-and-promotion.html` | Project promotion and metadata | Moderate | None | examples: one code block, citations: light, commands: none, security: none | Moderate, Needs editorial improvement | Low |

### Tools

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tools Overview | `docs/tools/README.md` | `/tools/` | Section overview | Thin | Verification note | examples: none, citations: none, commands: none, security: none | Thin | Medium |
| Claude Code | `docs/tools/claude-code.md` | `/tools/claude-code.html` | Tool reference | Moderate | `Last verified` + `Status` | examples: light, commands: yes, citations: official docs, security: yes | Moderate, Needs demonstration | High |
| OpenAI Codex | `docs/tools/openai-codex.md` | `/tools/openai-codex.html` | Tool reference | Moderate | `Last verified` + `Status` | examples: light, commands: yes, citations: official docs, security: yes | Moderate, Needs demonstration | High |
| Cursor | `docs/tools/cursor.md` | `/tools/cursor.html` | Tool reference | Moderate | `Needs verification` | examples: light, commands: no tested install sample, citations: yes, security: yes | Moderate, Needs technical verification | High |
| Grok / xAI | `docs/tools/grok-xai.md` | `/tools/grok-xai.html` | Provider-path overview | Moderate | `Confirmed` but thin | examples: light, commands: none, citations: yes, security: yes | Moderate, Needs technical verification | High |
| GitHub Copilot | `docs/tools/github-copilot.md` | `/tools/github-copilot.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: yes, citations: yes, security: yes | Moderate, Needs demonstration | High |
| Gemini CLI | `docs/tools/gemini-cli.md` | `/tools/gemini-cli.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: yes, citations: yes, security: yes | Moderate, Needs demonstration | High |
| Windsurf | `docs/tools/windsurf.md` | `/tools/windsurf.html` | Tool reference | Moderate | `Needs verification` | examples: light, commands: none, citations: yes, security: yes | Moderate, Needs technical verification | High |
| Cline | `docs/tools/cline.md` | `/tools/cline.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: limited, citations: yes, security: yes | Moderate, Needs demonstration | High |
| Roo Code | `docs/tools/roo-code.md` | `/tools/roo-code.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: none, citations: yes, security: yes | Moderate, Needs demonstration | High |
| Aider | `docs/tools/aider.md` | `/tools/aider.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: yes, citations: yes, security: yes | Moderate, Needs demonstration | High |
| Continue | `docs/tools/continue.md` | `/tools/continue.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: yes, citations: yes, security: yes | Moderate, Needs demonstration | High |
| OpenCode | `docs/tools/opencode.md` | `/tools/opencode.html` | Tool reference | Moderate | `Confirmed` | examples: light, commands: yes, citations: yes, security: yes | Moderate, Needs demonstration | High |

### Config Files

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Config Overview | `docs/configs/README.md` | `/configs/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | High |
| AGENTS.md | `docs/configs/agents-md.md` | `/configs/agents-md.html` | Instruction-file explainer | Placeholder | None | examples: none, citations: none, commands: none, security: light | Placeholder, Needs demonstration | Critical |
| CLAUDE.md | `docs/configs/claude-md.md` | `/configs/claude-md.html` | Instruction-file explainer | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | Critical |
| Cursor Rules | `docs/configs/cursor-rules.md` | `/configs/cursor-rules.html` | Rules-file explainer | Placeholder | None | examples: none, citations: none, commands: none, security: light | Placeholder | Critical |
| GitHub Copilot Instructions | `docs/configs/github-copilot-instructions.md` | `/configs/github-copilot-instructions.html` | Copilot instructions file | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | Critical |
| MCP Configs | `docs/configs/mcp-configs.md` | `/configs/mcp-configs.html` | MCP config guidance | Placeholder | None | examples: none, citations: none, commands: none, security: light | Placeholder | Critical |
| EditorConfig and AI | `docs/configs/editorconfig-and-ai.md` | `/configs/editorconfig-and-ai.html` | Editor config interaction | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | High |

### Workflows

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Workflow Overview | `docs/workflows/README.md` | `/workflows/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | High |
| Code Review | `docs/workflows/code-review.md` | `/workflows/code-review.html` | Review workflow | Thin | None | examples: basic, commands: light, citations: none, security: light | Thin, Duplicate, Needs demonstration | Critical |
| Bug Fixing | `docs/workflows/bug-fixing.md` | `/workflows/bug-fixing.html` | Bug-fix workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | Critical |
| Feature Development | `docs/workflows/feature-development.md` | `/workflows/feature-development.html` | Feature workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | Critical |
| Test Generation | `docs/workflows/test-generation.md` | `/workflows/test-generation.html` | Testing workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | Critical |
| Refactoring | `docs/workflows/refactoring.md` | `/workflows/refactoring.html` | Refactor workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | High |
| Documentation Generation | `docs/workflows/documentation-generation.md` | `/workflows/documentation-generation.html` | Docs workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | High |
| Migration and Upgrade | `docs/workflows/migration-upgrade.md` | `/workflows/migration-upgrade.html` | Upgrade workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | Critical |
| CI/CD Automation | `docs/workflows/ci-cd-automation.md` | `/workflows/ci-cd-automation.html` | CI workflow | Thin | None | examples: basic, commands: light, citations: none, security: light | Thin, Duplicate, Needs demonstration | High |
| PR Creation | `docs/workflows/pr-creation.md` | `/workflows/pr-creation.html` | PR workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | High |
| Release Notes | `docs/workflows/release-notes.md` | `/workflows/release-notes.html` | Release note workflow | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Duplicate, Needs demonstration | High |
| Security Review | `docs/workflows/security-review.md` | `/workflows/security-review.html` | Security review workflow | Thin | None | examples: basic, commands: light, citations: none, security: light | Thin, Duplicate, Needs demonstration | Critical |
| Angular Workflows | `docs/workflows/angular-workflows.md` | `/workflows/angular-workflows.html` | Angular-specific workflow set | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Needs technical verification | High |
| Java Spring Workflows | `docs/workflows/java-spring-workflows.md` | `/workflows/java-spring-workflows.html` | Java-specific workflow set | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin, Needs technical verification | High |
| Fullstack Workflows | `docs/workflows/fullstack-workflows.md` | `/workflows/fullstack-workflows.html` | Fullstack workflow set | Thin | None | examples: basic, commands: light, citations: none, security: none | Thin | Medium |

### MCP

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MCP Overview | `docs/mcp/README.md` | `/mcp/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | High |
| What is MCP? | `docs/mcp/overview.md` | `/mcp/overview.html` | Concept explainer | Thin | None | examples: none, citations: none, commands: none, security: light | Thin, Needs evidence | High |
| Useful MCP Servers | `docs/mcp/useful-mcp-servers.md` | `/mcp/useful-mcp-servers.html` | Discovery list | Thin | None | examples: none, citations: none, commands: none, security: light | Thin, Needs technical verification | High |
| GitHub MCP | `docs/mcp/github-mcp.md` | `/mcp/github-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Jira MCP | `docs/mcp/jira-mcp.md` | `/mcp/jira-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Bitbucket MCP | `docs/mcp/bitbucket-mcp.md` | `/mcp/bitbucket-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | High |
| Browser / Playwright MCP | `docs/mcp/browser-playwright-mcp.md` | `/mcp/browser-playwright-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Figma MCP | `docs/mcp/figma-mcp.md` | `/mcp/figma-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | High |
| Filesystem MCP | `docs/mcp/filesystem-mcp.md` | `/mcp/filesystem-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Database MCP | `docs/mcp/database-mcp.md` | `/mcp/database-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Supabase / Postgres MCP | `docs/mcp/supabase-postgres-mcp.md` | `/mcp/supabase-postgres-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | Critical |
| Slack / Teams MCP | `docs/mcp/slack-teams-mcp.md` | `/mcp/slack-teams-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | High |
| Security MCP | `docs/mcp/security-mcp.md` | `/mcp/security-mcp.html` | Integration stub | Placeholder | `Needs verification` | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | High |
| Custom MCP Template | `docs/mcp/custom-mcp-template.md` | `/mcp/custom-mcp-template.html` | Custom server seed | Placeholder | Mixed status line | examples: none, citations: none, commands: none, security: light | Placeholder, Needs technical verification | High |

### Prompts

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Prompt Library | `docs/prompts/README.md` | `/prompts/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | High |
| Master Prompts | `docs/prompts/master-prompts.md` | `/prompts/master-prompts.html` | Shared prompt collection | Thin | None | examples: many raw blocks, citations: none, expected outputs: absent, security: light | Thin, Needs demonstration | Critical |
| Claude Code Prompts | `docs/prompts/claude-code-prompts.md` | `/prompts/claude-code-prompts.html` | Tool-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | Critical |
| Codex Prompts | `docs/prompts/codex-prompts.md` | `/prompts/codex-prompts.html` | Tool-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | Critical |
| Cursor Prompts | `docs/prompts/cursor-prompts.md` | `/prompts/cursor-prompts.html` | Tool-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | Critical |
| Copilot Prompts | `docs/prompts/copilot-prompts.md` | `/prompts/copilot-prompts.html` | Tool-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | Critical |
| Grok Prompts | `docs/prompts/grok-prompts.md` | `/prompts/grok-prompts.html` | Tool-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | High |
| Review Prompts | `docs/prompts/review-prompts.md` | `/prompts/review-prompts.html` | Task-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: light | Placeholder | Critical |
| Testing Prompts | `docs/prompts/testing-prompts.md` | `/prompts/testing-prompts.html` | Task-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | Critical |
| Refactoring Prompts | `docs/prompts/refactoring-prompts.md` | `/prompts/refactoring-prompts.html` | Task-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | High |
| Migration Prompts | `docs/prompts/migration-prompts.md` | `/prompts/migration-prompts.html` | Task-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | High |
| Documentation Prompts | `docs/prompts/documentation-prompts.md` | `/prompts/documentation-prompts.html` | Task-specific prompts | Placeholder | None | examples: raw prompt only, citations: none, commands: none, security: none | Placeholder | High |

### Templates

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Templates Overview | `docs/templates/README.md` | `/templates/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | Medium |
| AGENTS.md Template | `docs/templates/AGENTS.md` | `/templates/AGENTS.html` | Copy-ready template seed | Thin | None | examples: template only, explanation: absent, security: light | Thin, Needs explanation | High |
| CLAUDE.md Template | `docs/templates/CLAUDE.md` | `/templates/CLAUDE.html` | Copy-ready template seed | Thin | None | examples: template only, explanation: absent, security: none | Thin, Needs explanation | High |
| Cursor Rules Template | `docs/templates/cursor-rules-template.md` | `/templates/cursor-rules-template.html` | Copy-ready template seed | Thin | None | examples: template only, explanation: absent, security: light | Thin, Needs explanation | High |
| PR Review Template | `docs/templates/pr-review-template.md` | `/templates/pr-review-template.html` | Review template | Placeholder | None | examples: template only, explanation: absent, security: none | Placeholder | High |
| AI Task Brief Template | `docs/templates/ai-task-brief-template.md` | `/templates/ai-task-brief-template.html` | Task briefing template | Placeholder | None | examples: template only, explanation: absent, security: none | Placeholder | High |
| Tool Evaluation Template | `docs/templates/tool-evaluation-template.md` | `/templates/tool-evaluation-template.html` | Evaluation template | Thin | None | examples: template only, explanation: absent, security: light | Thin, Needs explanation | High |
| Security Checklist Template | `docs/templates/security-checklist-template.md` | `/templates/security-checklist-template.html` | Security checklist | Thin | None | examples: checklist only, explanation: absent, security: yes | Thin | Medium |

### Governance

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Governance Overview | `docs/governance/README.md` | `/governance/` | Section overview | Placeholder | None | examples: none, citations: none, commands: none, security: light | Placeholder | High |
| Team Rollout Guide | `docs/governance/team-rollout-guide.md` | `/governance/team-rollout-guide.html` | Adoption guidance | Placeholder | None | examples: none, citations: none, commands: none, security: light | Placeholder, Needs policy expansion | Critical |
| Security and Permissions | `docs/governance/security-and-permissions.md` | `/governance/security-and-permissions.html` | Safety baseline | Thin | None | examples: none, citations: none, commands: none, security: yes | Thin, Needs policy expansion | Critical |
| Cost and Usage Management | `docs/governance/cost-and-usage-management.md` | `/governance/cost-and-usage-management.html` | Cost controls | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder, Needs policy expansion | High |
| Approved Tools Policy | `docs/governance/approved-tools-policy.md` | `/governance/approved-tools-policy.html` | Tool allowlist guidance | Thin | None | examples: none, citations: none, commands: none, security: light | Thin, Needs policy expansion | Critical |
| Prompt Review Policy | `docs/governance/prompt-review-policy.md` | `/governance/prompt-review-policy.html` | Prompt review policy seed | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder, Needs policy expansion | High |
| MCP Approval Policy | `docs/governance/mcp-approval-policy.md` | `/governance/mcp-approval-policy.html` | MCP approval seed | Thin | None | examples: none, citations: none, commands: none, security: none | Thin, Needs policy expansion | Critical |
| Customize for Your Team | `docs/governance/customize-for-your-team.md` | `/governance/customize-for-your-team.html` | Fork customization guidance | Thin | None | examples: light, citations: none, commands: none, security: none | Thin | Medium |
| Troubleshooting | `docs/governance/troubleshooting.md` | `/governance/troubleshooting.html` | Governance troubleshooting | Placeholder | None | examples: none, citations: none, commands: none, security: none | Placeholder | Medium |

### Reference

| Page title | Source path | Public URL | Current purpose | Depth | Verification | Citations / examples / commands / security | Classification | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Glossary | `docs/GLOSSARY.md` | `/GLOSSARY.html` | Shared terminology | Thin | None | examples: none, citations: none, commands: none, security: none | Thin | Medium |

## Representative Stronger Pages

- [docs/README.md](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/README.md): visually stronger and useful as an entry point, but needs sources and user-journey signposting.
- [docs/getting-started/comparison-matrix.md](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/getting-started/comparison-matrix.md): strongest comparison page so far, but still lacks source-backed criteria.
- Tool pages under [docs/tools](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/tools): best current metadata discipline and most reusable shape.

## Representative Thin or Placeholder Areas

- Entire [docs/configs](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/configs) section.
- Most pages under [docs/mcp](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/mcp).
- Most pages under [docs/prompts](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/prompts).
- Most pages under [docs/templates](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/templates).
- Nearly all workflow pages under [docs/workflows](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/workflows).

## Recommended Improvement Order

1. Foundation
   - add content contribution standard
   - define verification taxonomy
   - define reusable page archetypes
   - repair validation scripts
2. High-value user journey pages
   - Start Here
   - comparison and tool-selection pages
3. Tool pages
   - preserve structure, deepen examples, sources, permissions, limits
4. Config files
   - replace placeholders with copy-ready guidance
5. Workflows
   - add real demonstrations, validation steps, and failure modes
6. MCP
   - add implementation options, permissions, threat model, and official sources
7. Prompts and templates
   - add filled examples, expected outputs, explanation, and review checklists
8. Governance
   - expand into policy-grade copy-ready material
9. Glossary and cross-links
   - expand definitions and link destinations
10. Automation
   - add lint, link, metadata, and nav validation

## Immediate Action Items

- Create `CONTRIBUTING_CONTENT.md` with archetypes and definition of done.
- Replace placeholder page patterns in `configs`, `mcp`, `prompts`, and `templates`.
- Introduce a repository-wide `Verification status` convention used outside `tools`.
- Fix [scripts/update-last-verified.js](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/scripts/update-last-verified.js) to target `docs/tools`.
- Replace [scripts/verify-links.js](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/scripts/verify-links.js) with actual internal-link and anchor validation.
- Add maintainer automation for `docs:lint`, `docs:links`, and `docs:validate`.

## Known Constraints

- Current repository content does not include account-backed verification evidence for vendor plans, enterprise controls, or hosted MCP services.
- Tool pages currently use dated status markers, but many non-tool pages have no verification metadata at all.
- Some content improvements will require web verification against official product documentation before being marked `Verified` or `Confirmed`.
