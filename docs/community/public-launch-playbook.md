# Public Launch Playbook

This playbook turns the handbook launch into a sequence of useful developer artifacts instead of a one-day request for stars.

## Launch Goal

The launch should prove three things:

1. developers find the handbook useful enough to bookmark or return to
2. some of that value converts into GitHub stars, forks, and contributor activity
3. one or two content themes emerge as repeatable growth channels

The primary objective is **qualified developer discovery**. Stars and forks are outcome signals, not the content of the campaign.

## Launch Narrative

Use a consistent message across channels:

> Stop searching across dozens of AI coding docs. AI Tools Cheatsheets is an open-source handbook for comparing, configuring, and safely using Claude Code, Codex, Cursor, Copilot, Gemini CLI, MCP integrations, repo instruction files, prompts, and engineering workflows.

Lead with a concrete page whenever possible.

## Day 0 — Release and Comparison Matrix

### Publish

- publish the `2026.08 Launch Edition` GitHub release using [release notes](release-2026-08.md)
- confirm the live docs site is serving the release commit
- publish the comparison-matrix launch post on the maintainer's strongest professional network
- publish a GitHub Discussion announcing the release and inviting corrections

### Primary asset

[AI Coding Tools Comparison Matrix](../getting-started/comparison-matrix.md)

### Message angle

Choosing between Claude Code, Codex, Cursor, Copilot, and Gemini CLI is now a workflow/permission/configuration decision, not just a model preference.

### Measure

- comparison page visits
- repository click-throughs
- stars/forks during the first 24 hours
- substantive comments or corrections

## Day 1 — Terminal Agent Comparison

### Primary assets

- [Claude Code](../tools/claude-code.md)
- [OpenAI Codex](../tools/openai-codex.md)

### Angle

**Claude Code vs Codex for terminal-first development.**

Teach one difference that matters in real repository work, then link to both pages.

Do not claim a universal winner.

## Day 2 — IDE Agent Comparison

### Primary assets

- [Cursor](../tools/cursor.md)
- [GitHub Copilot](../tools/github-copilot.md)

### Angle

**Cursor vs Copilot for IDE-first teams.**

Compare repo context, instruction/config files, agent workflows, review boundaries, and team standardization rather than raw autocomplete quality.

## Day 3 — Repo Instructions

### Primary assets

- [AGENTS.md](../configs/agents-md.md)
- [CLAUDE.md](../configs/claude-md.md)
- [GitHub Copilot Instructions](../configs/github-copilot-instructions.md)
- [Cursor Rules](../configs/cursor-rules.md)

### Angle

**Stop repeating repository context in every AI chat.**

Show developers how persistent repo instructions reduce repeated prompting and make validation expectations explicit.

## Day 4 — MCP Security

### Primary assets

- [MCP Overview](../mcp/README.md)
- [Useful MCP Servers](../mcp/useful-mcp-servers.md)
- [Security and Permissions](../governance/security-and-permissions.md)

### Angle

**MCP is useful because it gives agents capabilities; that is also why permission review matters.**

Lead with read-only trials, least privilege, and clear mutation boundaries.

## Day 5 — Prompt/Workflow Utility

### Primary assets

- [Prompt Library](../prompts/README.md)
- [Workflow Library](../workflows/README.md)

### Angle

Share one prompt/workflow pair that solves a common developer task such as code review, bug fixing, test generation, or migration.

The post should contain enough value to be useful even before the reader clicks.

## Day 7 — Contributor Invitation

### Primary assets

- [Contribute in 10 Minutes](../getting-started/contribute-in-10-minutes.md)
- [Good First Issues](https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

### Angle

Invite developers to improve one thing they actually use.

A contribution can be:

- one corrected command
- one official source
- one framework-specific repo instruction example
- one safer MCP workflow
- one reproducible platform note

Do not frame contribution as unpaid content production. Frame it as correcting and strengthening a handbook developers share.

## Week 2 — Double Down on Signal

Do not mechanically continue the sequence if one topic clearly outperforms the others.

Review:

- which page received the most qualified traffic
- which post produced meaningful discussion
- which page generated GitHub clicks
- which issue received contributor interest
- which search queries are beginning to appear

Then create two follow-up assets around the strongest theme.

Examples:

- if comparison traffic wins: publish deeper terminal-first and IDE-first comparisons
- if `AGENTS.md` wins: publish Angular, Java/Spring, and fullstack starter examples
- if MCP wins: publish read-only integration examples and a permission matrix
- if Claude/Codex wins: publish task-specific terminal workflows

## Weeks 3–4 — Build Repeatability

By the end of 30 days, identify no more than three recurring content loops.

Recommended candidates:

### Tool update loop

When a flagship tool changes materially:

1. verify official docs
2. update the page
3. update `Last verified`
4. publish one concise “what changed for developers” post

### Comparison loop

Use real developer decisions as comparison topics:

- Claude Code vs Codex
- Cursor vs Copilot
- `AGENTS.md` vs `CLAUDE.md`
- terminal agents vs IDE agents
- MCP read-only vs write-capable integrations

### Contributor loop

1. keep 5–8 excellent starter issues open
2. recognize merged contributors
3. share one merged contribution periodically
4. replace completed starter issues with equally specific new ones

## Channel Rules

### LinkedIn

Best for engineering-team and workflow lessons. Use one clear technical insight, a compact table/list if helpful, and one direct deep link.

### X / short-form networks

Use one claim and one direct page link. A small thread can compare two tools, but avoid turning it into a long product catalog.

### Hacker News

Submit only when the project itself is the interesting artifact. A suitable title is descriptive rather than promotional. Stay available for technical discussion and disclose maintainership naturally.

### Reddit

Post only in communities where the artifact directly answers common questions and self-promotion is permitted. Read each community's rules before posting. Prefer a useful write-up with the repo as supporting material.

### Dev.to / Hashnode / engineering blogs

Repurpose the strongest launch theme into a substantive article. The article should teach a decision framework or workflow rather than mirror the README.

### GitHub Discussions

Use for release notes, verification requests, contributor showcases, and roadmap discussion. Do not recreate the old growth-report issue noise.

## UTM Structure

Use:

```text
utm_source=<channel>
utm_medium=<social|community|article|discussion>
utm_campaign=launch-2026-08
utm_content=<asset>
```

Recommended `utm_content` values:

- `comparison-matrix`
- `claude-vs-codex`
- `cursor-vs-copilot`
- `agents-md`
- `mcp-security`
- `prompt-workflow`
- `good-first-issues`

## Stop/Continue Rules

Continue a channel if it produces at least one of:

- qualified page traffic
- repository click-throughs
- substantive developer discussion
- issue/PR participation
- backlinks from relevant developer resources

Reduce effort if a channel repeatedly produces impressions with no meaningful downstream action.

Do not spam communities, mass-DM developers, buy stars, exchange stars, or use misleading engagement tactics.

## Launch Readiness Checklist

Before Day 0:

- [ ] Phase 4 PR merged
- [ ] all CI checks green
- [ ] live GitHub Pages site verified against merged commit
- [ ] GitHub About text and topics configured
- [ ] social preview configured
- [ ] `2026.08 Launch Edition` release published
- [ ] comparison and five flagship pages manually opened from production
- [ ] good-first-issue queue still current
- [ ] launch scorecard baseline captured
- [ ] Wave 1 post copy reviewed for accuracy

## After 30 Days

Write a short launch retrospective with:

- highest-performing page
- highest-performing channel
- star/fork change
- contribution change
- best search/query signal
- one distribution tactic to stop
- two tactics to repeat
- next three content priorities

Use the [Launch Scorecard](launch-scorecard.md) as the source of truth.
