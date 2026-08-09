# Launch and Sharing Kit

Use this page to promote the handbook without turning every post into a generic repository announcement. The strongest distribution strategy is to share one concrete developer outcome at a time and link directly to the page that delivers it.

## Canonical Links

- Handbook: https://ankitparekh007.github.io/ai-tools-cheatsheets/
- GitHub repository: https://github.com/AnkitParekh007/ai-tools-cheatsheets
- AI coding tools comparison: https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html
- Claude Code cheat sheet: https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/claude-code.html
- OpenAI Codex cheat sheet: https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/openai-codex.html
- Cursor cheat sheet: https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/cursor.html
- GitHub Copilot cheat sheet: https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/github-copilot.html
- Gemini CLI cheat sheet: https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/gemini-cli.html
- MCP guides: https://ankitparekh007.github.io/ai-tools-cheatsheets/mcp/
- Prompt library: https://ankitparekh007.github.io/ai-tools-cheatsheets/prompts/

## Best Share Angles

### 1. Stop comparing tools from memory

Lead with the comparison page. The hook is the decision, not the repository.

Suggested structure:

> Choosing between Claude Code, Codex, Cursor, Copilot, and Gemini CLI gets messy fast. I put the current CLI surface, repo instruction files, MCP support, plan-first workflows, and automation paths into one source-backed comparison.
>
> If you are standardizing AI coding tools for yourself or a team, start here: [comparison link]
>
> The full handbook is open source. If it saves you time, a GitHub star helps other developers find it.

### 2. One tool, one 60-second cheat sheet

Rotate through a single flagship page rather than publishing all five at once.

Suggested structure:

> I condensed the current [TOOL] workflow into a 60-second cheat sheet: install/start commands, repo instructions, permissions, MCP/extensions, five practical prompts, and safer automation defaults.
>
> [direct cheat-sheet link]
>
> Corrections and source-backed improvements are welcome.

### 3. Team adoption and security

Use this angle for engineering leaders, platform teams, and security-minded developers.

Suggested structure:

> AI coding tools are not just autocomplete anymore. They can read repos, run commands, call MCP servers, and automate multi-step work.
>
> This open-source handbook compares the permission model, instruction files, and safer rollout patterns across the major coding agents.
>
> [comparison or security page link]

### 4. Contributor invitation

Use this only after the issue backlog has a small set of genuinely scoped starter tasks.

Suggested structure:

> Looking for a small open-source contribution? AI Tools Cheatsheets has focused documentation tasks where a useful PR can be one verified command, one framework example, one workflow improvement, or one security note.
>
> Start here: https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22

## Channel Guidance

### GitHub Discussions

Publish durable project updates:

- new flagship cheat-sheet refreshes
- release notes
- requests for verification on fast-moving tools
- contributor showcases

Avoid opening Issues for announcements or growth reports.

### LinkedIn

Prefer one technical lesson per post. A carousel or short post should teach something before asking for a star.

Good topics:

- `CLAUDE.md` vs `AGENTS.md` vs `.github/copilot-instructions.md`
- plan mode across Claude Code, Copilot, and Gemini CLI
- MCP permission review checklist
- Claude Code vs Codex for terminal-first work
- Cursor vs Copilot for IDE-first teams

### X / short-form social

Use a single claim plus a direct page link. Keep the repository CTA secondary.

### Reddit, Hacker News, and developer communities

Share only when the post solves a real community question. Lead with the useful artifact and disclose that you maintain the repository. Avoid repetitive cross-posting or asking for stars as the primary purpose.

## Weekly Distribution Cadence

A sustainable cadence is more useful than a one-day launch burst:

| Day | Asset | Goal |
| --- | --- | --- |
| Monday | one flagship cheat sheet | bookmarks and direct page traffic |
| Wednesday | comparison or workflow insight | discussion and shares |
| Friday | contributor task or merged contribution | community participation |

Rotate topics instead of reposting the same homepage link.

## UTM Convention

When a platform supports normal links, use a consistent convention so analytics can distinguish distribution sources:

```text
utm_source=<channel>
utm_medium=social
utm_campaign=ai-tools-cheatsheets-launch
utm_content=<page-or-angle>
```

Example content values:

- `comparison-matrix`
- `claude-code-cheatsheet`
- `codex-cheatsheet`
- `mcp-security`
- `good-first-issue`

Do not add tracking parameters to canonical links inside the handbook itself.

## What to Measure

Track outcomes that indicate real developer value:

- direct visits to flagship pages
- GitHub repository click-throughs
- stars and forks
- good-first-issue views and assignments
- first-time contributors
- merged community pull requests
- repeat contributors
- search queries that land directly on cheat sheets

Avoid optimizing only for social impressions.

## Launch Checklist

Before a major promotion push:

- confirm the live site is serving the latest `main` commit
- confirm the comparison and flagship pages pass docs validation
- keep the open issue backlog focused and current
- verify `good first issue` tasks are truly unblocked
- make sure the repository README has a clear star/fork/contribute path
- use the GitHub social preview image configured for the repository
- publish one concrete technical asset first, then link to the broader handbook

> Distribution principle: teach something useful in the post, link directly to the useful page, and let the repository earn the star.
