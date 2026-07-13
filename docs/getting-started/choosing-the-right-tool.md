# Choosing the Right Tool

This page is for choosing a practical starting point, not for declaring a universal winner.

The best choice depends on:

- where your engineers already work
- whether you want terminal-first or IDE-first behavior
- how much provider flexibility you need
- how strict your security and approval model is
- whether the team wants one standard tool or a broader evaluation lane

## Decide In This Order

1. Choose the primary surface:
   terminal, IDE, or mixed.
2. Choose the approval model:
   review-heavy, read-only first, or broader agentic execution.
3. Decide whether provider flexibility is a requirement or only a nice-to-have.
4. Decide whether you are piloting for one engineer or standardizing for a team.

## Recommended Starting Points By Scenario

| Scenario | Start with | Why | Watch-out |
| --- | --- | --- | --- |
| Terminal-first engineering team | Claude Code or OpenAI Codex | Best current fit in this repo for deep repo reasoning, multi-file edits, and command-first workflows | Do not approve broad shell and MCP access before reviewing security controls |
| IDE-first product team | Cursor or GitHub Copilot | Lower adoption friction when most work already happens inside the editor | Editor convenience can hide weak review habits if team standards are unclear |
| Open-source or provider-flexible evaluation | Aider, Continue, OpenCode, Cline, or Roo Code | Good when the team wants more control over providers, prompts, or local workflow shape | Flexibility increases configuration and policy overhead |
| Governance-first pilot | GitHub Copilot or one terminal tool with strict approvals | Easier to roll out with fewer moving parts and clearer boundaries | Avoid approving every available agent at once |
| Backup vendor path | Gemini CLI or xAI-backed host workflows | Useful for diversification and comparative evaluation | Keep expectations narrow until current limitations are verified in the relevant tool pages |

## Use Claude Code

Use it when you want:

- deep multi-file coding tasks
- terminal-first repo analysis
- refactoring and architecture assistance
- strong review and planning workflows

## Use OpenAI Codex

Use it when you want:

- terminal-first OpenAI workflows
- `AGENTS.md`-style repository guidance
- CLI and cloud-surface continuity
- a primary tool for OpenAI-centered teams

## Use Cursor

Use it when developers want AI deeply integrated into the IDE and the team is comfortable standardizing editor behavior alongside prompting and rules.

## Use GitHub Copilot

Use it when the team already works heavily inside GitHub, VS Code, or JetBrains and wants a lower-friction rollout path.

## Use Grok / xAI

Use it as a model or integration path, not as a default team standard, unless the official first-party workflow you plan to use is verified and documented clearly.

## Use Cline, Roo Code, Continue, Aider, Or OpenCode

Use them when you want open-source or provider-flexible alternatives and are willing to own more configuration, evaluation, and policy detail.

## When Not To Standardize A Tool Yet

- The page is marked `Needs verification`.
- Your team cannot explain the tool's permission model.
- The install path or authentication flow is not confirmed for your OS and editor mix.
- The team wants one primary tool, but the candidate only solves a narrow niche.
- The tool requires account, plan, or host constraints that your team has not validated.

## Practical Default For Most Teams

Most teams should approve:

- one primary terminal tool
- one primary IDE tool
- one explicit fallback path

That is usually enough to get the benefits of standardization without turning the tool register into a free-for-all.

> Verification note: Treat xAI as a model/integration path unless official first-party CLI guidance is confirmed in xAI docs.

> Team tip: Most teams should standardize one primary terminal tool and one primary IDE tool rather than approving every option.

## Verification

- Status: Documentation verified
- Last reviewed: 2026-07-13
- Scope: recommendations were aligned with the current repository tool pages and comparison guidance
- Not covered: this page does not replace product-specific verification on the linked tool pages

## Next Pages

- [Comparison Matrix](comparison-matrix.md)
- [Claude Code](../tools/claude-code.md)
- [OpenAI Codex](../tools/openai-codex.md)
- [Cursor](../tools/cursor.md)
- [GitHub Copilot](../tools/github-copilot.md)
