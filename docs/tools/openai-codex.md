# OpenAI Codex

> OpenAI coding agent for terminal, IDE, desktop, web, cloud, review, automation, skills, plugins, and MCP workflows.

**Type:** CLI / IDE / desktop / web / cloud agent  
**Best for:** Terminal coding, local review, repeatable automation, shared `AGENTS.md` guidance, and OpenAI-centered workflows  
**Official docs:** https://developers.openai.com/codex/cli/  
**Last verified:** 2026-08-09  
**Status:** Documentation verified  
**Verification scope:** Official Codex CLI, AGENTS.md, permissions, MCP, review, and automation docs plus the official OpenAI Codex repository were reviewed. Commands were not executed locally in this repository.

## 60-Second Cheat Sheet

| Need | Command or file | Notes |
| --- | --- | --- |
| Install on macOS/Linux | `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` | Standalone installer |
| Install with npm | `npm install -g @openai/codex` | Cross-platform package path |
| Install with Homebrew | `brew install --cask codex` | macOS/Linux Homebrew path |
| Start interactive Codex | `codex` | Run from a project directory |
| Run non-interactively | `codex exec "run tests and summarize failures"` | Useful for scripts and CI |
| Resume prior work | `codex resume` | Return to a saved local chat |
| Create repo instructions | `/init` | Creates a starter `AGENTS.md` |
| Inspect session state | `/status` | Shows current configuration |
| Review permissions | `/permissions` | Choose active local boundaries |
| Review changes | `/review` | Dedicated review without editing the working tree |
| Connect MCP tools | `codex mcp` | Add/list/login to MCP servers |
| Shared repo instructions | `AGENTS.md` | Root and nested instructions are layered |
| User configuration | `~/.codex/config.toml` | User defaults and permission profiles |
| Project configuration | `.codex/config.toml` | Repository-specific configuration |

> **Safe default:** use `:read-only` for repository exploration and review, `:workspace` for normal edits, and reserve `:danger-full-access` for cases where broad local access is genuinely intentional.

## Five Prompts Worth Bookmarking

### Understand a repository

```text
Inspect this repository and explain the architecture, entry points, build/test commands, and risky areas. Do not modify files.
```

### Plan an implementation

```text
Read the relevant code and tests, propose the smallest implementation plan, list files to change and validation commands, and wait for approval before editing.
```

### Review current changes

```text
Review the current changes for bugs, regressions, security issues, and missing tests. List findings by severity and cite the affected files. Do not modify the working tree.
```

### Fix a failure

```text
Reproduce the failing test or build step, identify the root cause, implement the smallest correct fix, and rerun the narrowest validation before broader checks.
```

### Prepare a PR

```text
Review the final diff, confirm the relevant tests and lint checks, identify any remaining risks, and draft a factual PR summary with validation results and known limitations.
```

## What Codex Is Best At

- terminal-first repository exploration, editing, and local command execution
- local code review before commit or pull request creation
- repeatable non-interactive tasks through `codex exec`
- shared repository guidance through hierarchical `AGENTS.md`
- focused permission profiles for read-only and workspace-editing workflows
- extending workflows with skills, plugins, subagents, web search, cloud tasks, and MCP

## Installation

### macOS and Linux standalone installer

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### npm

```bash
npm install -g @openai/codex
```

### Homebrew

```bash
brew install --cask codex
```

### Windows

The official OpenAI Codex repository documents a PowerShell installer for native Windows and the Codex docs include dedicated Windows sandbox and WSL guidance. Use the current official install page for the exact Windows path on your environment.

## First Session

```bash
cd /path/to/your/repository
codex
```

On first run, select an available sign-in method. A safe first prompt is:

```text
Tell me what this project does, identify its build and test commands, and point out the most important files. Do not make changes.
```

Create Git checkpoints before and after non-trivial tasks so changes are easy to inspect or revert.

## Daily CLI Commands

```bash
codex
codex exec "run the test suite and summarize failures"
codex resume
codex --search
codex mcp list
```

Useful in-session commands include:

```text
/init
/status
/permissions
/model
/review
```

The current CLI also supports cloud handoff, image inputs, subagents, shell completion, skills, and plugins. Use the official CLI reference for the exact current command surface.

## Repository Instructions with AGENTS.md

Codex layers instructions from global and project scopes.

Current official behavior:

1. Global scope checks `~/.codex/AGENTS.override.md`, then `~/.codex/AGENTS.md`.
2. Project scope walks from the project root toward the current working directory.
3. At each directory, `AGENTS.override.md` takes precedence over `AGENTS.md`.
4. Files closer to the working directory appear later and can override broader guidance.

Use root `AGENTS.md` for:

- build, test, lint, and format commands
- architecture and repository conventions
- review expectations
- security or deployment constraints

Use nested files only when a subdirectory genuinely needs different instructions.

## Permission Model

Current Codex docs define three built-in local permission profiles:

- `:read-only` — local command execution remains read-only
- `:workspace` — allows writes inside active workspace roots and system temp directories
- `:danger-full-access` — removes local sandbox restrictions

Custom profiles can extend `:read-only`, `:workspace`, or another named profile and can independently control filesystem and network access.

A practical team baseline:

- use read-only for exploration and review
- use workspace editing for normal implementation
- deny sensitive files such as `.env` even when the workspace is writable
- keep network access disabled or domain-scoped unless required
- avoid unrestricted access as a convenience default

## MCP and External Tools

Codex supports local and remote MCP servers.

Useful commands include:

```bash
codex mcp list
codex mcp --help
codex mcp login <server-name>
```

MCP configuration can define enabled/disabled tools, startup and tool timeouts, authentication, and server-specific settings.

Treat each MCP server as a separate approval because it can add both data access and mutation tools.

## Local Review Workflow

Codex includes a dedicated review flow for:

- uncommitted changes
- a commit
- a base branch / PR-style comparison
- custom review instructions

This is a strong low-risk entry point for teams because review can report prioritized findings without modifying the working tree.

## Team Adoption Checklist

- [ ] add and review a concise root `AGENTS.md`
- [ ] select a default permission profile for normal development
- [ ] deny secrets and environment files explicitly
- [ ] document whether network access is disabled, allowlisted, or open
- [ ] approve MCP servers and plugins separately from base Codex access
- [ ] validate `codex exec` automation with least privilege before using it in CI

## Security Notes

- permissions and sandboxing determine the real local execution boundary
- `AGENTS.md` improves consistency but is not an enforcement mechanism
- broad network access should be a deliberate choice
- MCP servers and plugins expand the tool/data boundary
- keep secrets out of prompts, instructions, and repository configuration

## Alternatives

- [Claude Code](claude-code.md) for another terminal-first agent with strong permission and project-memory patterns
- [Cursor](cursor.md) for an IDE-first experience with a capable terminal agent
- [GitHub Copilot](github-copilot.md) for GitHub-native CLI, review, and repository workflows
- [Gemini CLI](gemini-cli.md) for a Google-backed terminal option with sandbox and context controls

See the [Comparison Matrix](../getting-started/comparison-matrix.md) for a side-by-side shortlist.

## Verification Status

- Status: Documentation verified
- Last verified: 2026-08-09
- Scope: install, CLI workflow, `AGENTS.md`, permission profiles, review, automation, and MCP reviewed against current official sources
- Not locally tested: installer execution, sign-in, native Windows behavior, IDE/app/cloud behavior, plugins, and enterprise rollout

## Sources

- https://developers.openai.com/codex/cli/
- https://developers.openai.com/codex/guides/agents-md/
- https://learn.chatgpt.com/docs/permissions
- https://learn.chatgpt.com/docs/extend/mcp?surface=cli
- https://github.com/openai/codex
