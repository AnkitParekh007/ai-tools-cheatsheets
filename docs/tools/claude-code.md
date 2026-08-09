# Claude Code

> Terminal-first coding agent with strong repo reasoning, permission controls, project instructions, skills, plugins, and MCP workflows.

**Type:** CLI / IDE / web / desktop  
**Best for:** Deep repository work, refactors, review, automation, and terminal-first engineering  
**Official docs:** https://code.claude.com/docs/en/quickstart  
**Last verified:** 2026-08-09  
**Status:** Documentation verified  
**Verification scope:** Official Claude Code quickstart, CLI reference, commands, permissions, tools, and MCP docs were reviewed. Commands were not executed locally in this repository.

## 60-Second Cheat Sheet

| Need | Command or file | Notes |
| --- | --- | --- |
| Install on macOS/Linux/WSL | `curl -fsSL https://claude.ai/install.sh \| bash` | Native installer; auto-updates |
| Install on Windows PowerShell | `irm https://claude.ai/install.ps1 \| iex` | Native Windows path |
| Start an interactive session | `claude` | Run from the repository root |
| Start with a task | `claude "explain this project"` | Opens an interactive session with the prompt |
| One-shot output | `claude -p "explain this function"` | Prints a response and exits |
| Start in plan mode | `claude --permission-mode plan` | Analyze and plan before implementation |
| Continue latest conversation | `claude -c` | Continues the latest conversation in the current directory |
| Resume a named/session thread | `claude -r "<session>"` | Resume by ID or name |
| Create repo instructions | `/init` | Generates a starter `CLAUDE.md` |
| Inspect/edit project memory | `/memory` | Manage `CLAUDE.md` and memory |
| Manage permissions | `/permissions` | Review allow, ask, and deny rules |
| Manage MCP connections | `/mcp` or `claude mcp` | External tools and context |
| Shared repo instructions | `CLAUDE.md` | Keep build, test, conventions, and safety guidance here |
| Shared MCP config | `.mcp.json` | Project-scoped MCP servers can be committed |

> **Safe default:** begin unfamiliar or high-impact work in plan mode, review proposed commands and edits, and widen permissions only for the specific task that needs them.

## Five Prompts Worth Bookmarking

### Understand a repository

```text
Map this repository. Identify the main packages, entry points, build and test commands, and the safest first area to change. Do not edit files yet.
```

### Plan a feature

```text
Read the relevant implementation and tests, then propose a step-by-step implementation plan with files to change, validation commands, risks, and rollback points. Wait for approval before editing.
```

### Review a diff

```text
Review the current changes for correctness, regressions, security issues, and missing tests. List findings by severity and cite the affected files. Do not rewrite code unless I ask.
```

### Fix a failing test

```text
Reproduce the failing test, identify the smallest root-cause fix, explain why it failed, implement only that fix, and rerun the narrowest relevant validation first.
```

### Refactor safely

```text
Refactor this area without changing externally observable behavior. Preserve public APIs, add or update tests first where useful, and show the validation results before proposing follow-up cleanup.
```

## What Claude Code Is Best At

- terminal-first repository exploration and implementation
- multi-file tasks that benefit from planning and iteration
- repository onboarding and architecture explanation
- review-heavy workflows with explicit permission controls
- reusable project instructions through `CLAUDE.md`
- extending local workflows with skills, plugins, hooks, subagents, and MCP

## Installation

### macOS, Linux, and WSL

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Windows CMD

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

The official quickstart also documents Homebrew, WinGet, and Linux package-manager paths. Native installations automatically update; package-manager installs should be updated through their package manager.

## First Session

```bash
cd /path/to/your/repository
claude
```

A good first request is read-only:

```text
What does this project do, where are the main entry points, and which commands build and test it? Do not edit anything.
```

Claude Code reads project files as needed, so you normally do not need to manually attach the repository.

## Daily CLI Commands

```bash
claude
claude "fix the build error"
claude -p "explain this function"
claude -c
claude -r "auth-refactor" "finish the review"
claude --permission-mode plan
```

Useful in-session commands include:

```text
/help
/init
/memory
/model
/permissions
/mcp
/agents
/clear
/resume
```

Use `/help` or `/` on your installed version for the authoritative current command list.

## Repository Instructions

Use `CLAUDE.md` for durable repository guidance such as:

- build, test, lint, and format commands
- repository architecture and important directories
- coding and review conventions
- files or directories that should not be edited casually
- validation expectations before a task is considered complete

Run `/init` for a starter file and `/memory` to inspect or refine memory and instruction files.

Keep `CLAUDE.md` concise enough that developers can review it like code. Context is guidance, not a security boundary.

## Permission Model

Claude Code separates model guidance from enforcement.

Current official docs describe:

- allow, ask, and deny permission rules
- permission modes including `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, and `bypassPermissions`
- OS-level sandboxing for Bash filesystem and network access
- project-distributed permission settings

A practical team starting point is:

1. use `plan` for unfamiliar, broad, or risky work
2. keep sensitive files and dangerous commands denied
3. allow only repeatable low-risk commands that your workflow genuinely needs
4. use sandboxing as defense in depth rather than relying on prompt instructions alone

Avoid `--dangerously-skip-permissions` / `bypassPermissions` as a normal developer default.

## MCP and External Tools

Claude Code supports project and user-scoped MCP servers.

A project-scoped server can be configured with `claude mcp` and stored in `.mcp.json` so the team shares the same server definition. Claude Code prompts before using project-scoped servers from a repository.

Treat every MCP server as a separate security decision because it can expand access beyond the local repository.

Review:

- authentication method
- data exposed to the server
- available tools and write operations
- network boundary
- revocation path

## Team Adoption Checklist

- [ ] standardize where `CLAUDE.md` lives and who reviews it
- [ ] document the default permission mode for normal work
- [ ] define deny rules for secrets and destructive commands
- [ ] approve MCP servers separately from Claude Code itself
- [ ] require project tests or build validation before merge
- [ ] keep bypass-permission workflows restricted to explicitly controlled automation

## Security Notes

- shell and filesystem access are the primary local risk boundary
- permission rules and sandboxing are complementary controls
- project instructions can improve behavior but do not enforce policy
- MCP servers expand the tool and data boundary
- keep credentials out of repository instructions and prompts

## Alternatives

- [OpenAI Codex](openai-codex.md) for OpenAI-centered terminal and multi-surface workflows
- [Cursor](cursor.md) for IDE-first teams with a growing terminal agent surface
- [GitHub Copilot](github-copilot.md) for GitHub-native editor, CLI, review, and repository workflows
- [Gemini CLI](gemini-cli.md) for a Google-backed terminal alternative with sandbox and workspace-context controls

See the [Comparison Matrix](../getting-started/comparison-matrix.md) for a side-by-side shortlist.

## Verification Status

- Status: Documentation verified
- Last verified: 2026-08-09
- Scope: install, CLI commands, project instructions, permissions, tools, and MCP reviewed against current official docs
- Not locally tested: installer execution, account login, IDE/web/desktop behavior, and enterprise policy rollout

## Sources

- https://code.claude.com/docs/en/quickstart
- https://code.claude.com/docs/en/cli-usage
- https://code.claude.com/docs/en/commands
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/en/tools-reference
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/best-practices
