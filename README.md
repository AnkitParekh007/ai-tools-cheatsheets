<p align="center">
  <img src="./docs/assets/images/ai-tools-cheatsheets-logo.svg" alt="AI Tools Cheatsheets" width="900" />
</p>

<h3 align="center">
  One open-source handbook for Claude Code, Codex, Cursor, Copilot, Grok, MCP, prompts, templates, and team AI coding workflows.
</h3>

<p align="center">
  <a href="https://github.com/AnkitParekh007/ai-tools-cheatsheets/stargazers">
    <img src="https://img.shields.io/github/stars/AnkitParekh007/ai-tools-cheatsheets?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/AnkitParekh007/ai-tools-cheatsheets/fork">
    <img src="https://img.shields.io/github/forks/AnkitParekh007/ai-tools-cheatsheets?style=social" alt="GitHub forks" />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" />
  <img src="https://img.shields.io/badge/docs-HonKit-blue" alt="HonKit docs" />
  <img src="https://img.shields.io/github/license/AnkitParekh007/ai-tools-cheatsheets" alt="License" />
</p>

## Why This Repo Exists

AI coding tools are moving fast. Every team is trying Claude Code, Codex, Cursor, Copilot, Grok, MCP servers, AGENTS.md, CLAUDE.md, custom prompts, and AI coding workflows, but the knowledge is scattered.

This repo brings everything into one practical, verified, copy-pasteable handbook.

## What You Get

- CLI install commands for major AI coding tools
- model and version notes with verification status
- official source links and last-verified expectations
- MCP setup patterns and approval guidance
- prompt libraries for review, testing, migrations, and debugging
- governance templates for AGENTS.md, CLAUDE.md, Cursor rules, and security checklists
- workflow recipes for engineering teams
- comparison tables for tool selection
- reusable templates for team AI coding playbooks

## Best Pages

| Page | Why it matters |
| --- | --- |
| [Tool Comparison Matrix](./docs/getting-started/comparison-matrix.md) | compare tools quickly |
| [Choosing the Right Tool](./docs/getting-started/choosing-the-right-tool.md) | pick a tool by task |
| [Claude Code](./docs/tools/claude-code.md) | deep repo and terminal workflows |
| [OpenAI Codex](./docs/tools/openai-codex.md) | OpenAI-first coding workflows |
| [Cursor](./docs/tools/cursor.md) | AI-native IDE usage |
| [MCP Overview](./docs/mcp/overview.md) | understand protocol and risk |
| [Prompt Library](./docs/prompts/README.md) | copy-pasteable prompts |
| [Security and Permissions](./docs/governance/security-and-permissions.md) | keep private code safe |
| [Team Rollout Guide](./docs/governance/team-rollout-guide.md) | adopt tools across a team |
| [Templates](./docs/templates/README.md) | bootstrap internal standards |

## Documentation Website

- GitHub Pages: [https://ankitparekh007.github.io/ai-tools-cheatsheets/](https://ankitparekh007.github.io/ai-tools-cheatsheets/)
- HonKit source: [docs/](./docs/README.md)

## Fork This for Your Team

Engineering teams can fork this repository and turn it into an internal AI coding handbook:

- replace approved tool lists
- add internal prompts and workflows
- add company-specific AGENTS.md and CLAUDE.md examples
- document approved MCP servers and security policy
- publish an internal or private GitHub Pages handbook

Start with [Fork for Your Team](./docs/getting-started/fork-for-your-team.md) and [Customize for Your Team](./docs/governance/customize-for-your-team.md).

## Contribute in 10 Minutes

You can help by:

- verifying one install command from official docs
- adding one missing CLI command
- adding one workflow recipe
- adding one MCP server note
- improving one tool comparison row
- adding Windows/macOS/Linux notes
- fixing broken links
- improving a prompt template

Good first contributions are labeled [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## Verification Standard

- sourced from official docs where possible
- `Last verified` date on major tool pages
- status is explicit: `Confirmed`, `Needs verification`, or `Experimental`
- avoid hallucinated commands, guessed binary names, and unsupported claims

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

## GitHub Pages

The documentation site is published at:

[https://ankitparekh007.github.io/ai-tools-cheatsheets/](https://ankitparekh007.github.io/ai-tools-cheatsheets/)

To enable deployment:

1. Push to `main`
2. Open repository `Settings`
3. Open `Pages`
4. Set `Build and deployment` to `GitHub Actions`
5. Let `.github/workflows/deploy-docs.yml` publish the `_book` output

## Support the Project

If this helps you or your team:

- Star the repo
- Fork it for your company playbook
- Share it with your engineering team
- Contribute one verified command, prompt, template, or workflow

## Recommended GitHub Topics

ai-tools, ai-coding, coding-agents, developer-tools, cheatsheet, claude-code, openai-codex, cursor, github-copilot, grok, gemini-cli, mcp, model-context-protocol, agents-md, claude-md, prompt-engineering, honkit, github-pages, documentation, awesome-list

## Contributors

Thanks to everyone helping keep AI tool docs accurate.

Want your name here? Pick any `good first issue` and verify one command from official docs.

<a href="https://github.com/AnkitParekh007/ai-tools-cheatsheets/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AnkitParekh007/ai-tools-cheatsheets" />
</a>
