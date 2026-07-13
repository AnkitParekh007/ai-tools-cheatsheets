# Config Overview

This section covers the files and config layers that make AI coding tools behave consistently across a team.

## What This Section Answers

- which files belong in the repository
- which files should stay personal
- how shared instructions differ from tool settings
- where MCP server configuration usually lives
- how to keep AI output aligned with formatting and workflow expectations

## Team Rule Of Thumb

Use this split:

- repository files for shared behavior, commands, architecture notes, and review expectations
- personal config for credentials, local preferences, and experiments
- MCP config only for approved servers with named owners
- `.editorconfig` for formatting signals that both humans and agents can follow

## Recommended Reading Order

1. [AGENTS.md](agents-md.md)
2. [CLAUDE.md](claude-md.md)
3. [Cursor Rules](cursor-rules.md)
4. [GitHub Copilot Instructions](github-copilot-instructions.md)
5. [MCP Configs](mcp-configs.md)
6. [EditorConfig and AI](editorconfig-and-ai.md)

## Shared Pattern

Most teams should standardize one cross-tool repo guidance file first, then add tool-specific layers only where they add real value.

Practical default:

- `AGENTS.md` for repo-wide instructions
- tool-specific instruction files only when the tool has meaningful extra behavior
- repo-committed settings only when they help everyone
- personal settings outside version control

## Verification Status

- Last reviewed: 2026-07-13
- Scope: official docs were reviewed for Codex `AGENTS.md`, Claude config layers, Cursor rules, Copilot custom instructions, and EditorConfig fundamentals
