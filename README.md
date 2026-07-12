# AI Coding Tools Cheat Sheet

Practical GitHub repository and HonKit documentation site for AI coding tools, coding agents, IDE assistants, model choices, MCP workflows, prompts, templates, and team governance.

Documentation site:

- local HonKit source: [`docs/`](docs/README.md)
- GitHub Pages target: `https://<your-org-or-user>.github.io/ai-coding-tools-cheat-sheet/`

## What This Repo Is

This repository is a team handbook for modern AI coding tools, including:

- Claude Code
- OpenAI Codex
- Cursor
- Grok / xAI coding models and integrations
- GitHub Copilot
- Gemini CLI
- Windsurf / Devin Desktop
- Cline
- Roo Code
- Aider
- Continue
- OpenCode
- MCP servers and approval guidance
- repo instruction files such as `AGENTS.md` and `CLAUDE.md`
- workflow recipes, prompts, troubleshooting, and governance

## Documentation Website

The HonKit site lives under [`docs/`](docs/README.md) and is configured by:

- [`book.json`](book.json)
- [`docs/SUMMARY.md`](docs/SUMMARY.md)
- [`docs/assets/css/custom.css`](docs/assets/css/custom.css)
- [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml)

## Local Setup

```bash
npm install
npm run docs:serve
npm run docs:build
```

## HonKit Commands

```bash
npm run docs:serve
npm run docs:build
npm run docs:debug
npm run links:check
npm run index:generate
```

## Repository Structure

```text
README.md
package.json
book.json
docs/
scripts/
.github/workflows/
```

The full content map is in [`docs/SUMMARY.md`](docs/SUMMARY.md).

## Contribution Instructions

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before editing commands, install steps, or tool capabilities.

## GitHub Pages Setup

1. Push the repository to GitHub.
2. Open `Settings` for the repository.
3. Open `Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. Push to `main`.
6. Wait for the `Deploy HonKit Docs to GitHub Pages` workflow to finish.
7. Open the published Pages URL from the workflow or repository Pages settings.

## Security Warning

AI coding tools can read repositories, edit files, run commands, and access external systems through MCP or plugins. Do not standardize a tool for private code until you review:

- secrets handling
- filesystem and shell permissions
- MCP scopes
- plugin and extension trust
- logging and retention behavior

Start with [`docs/governance/security-and-permissions.md`](docs/governance/security-and-permissions.md).
