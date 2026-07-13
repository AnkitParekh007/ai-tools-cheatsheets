# Claude Code

> Terminal-first coding agent with strong repo reasoning, permissions, and MCP workflows.

**Type:** CLI / IDE / web / desktop  
**Best for:** Deep repo tasks, refactors, review, automation  
**Official docs:** https://code.claude.com/docs/en/quickstart  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official quickstart, overview, authentication, permissions, memory, MCP, CLI reference, and best-practices docs were reviewed. Commands were not executed locally in this repository.

## Overview

Claude Code is an agentic coding tool that can read your repository, edit files, run commands, and work across terminal and IDE surfaces. The official docs position it as available in the terminal CLI, desktop app, web, VS Code, JetBrains, Slack, and CI integrations.

## Best Suited For

- terminal-first engineering work
- repository onboarding and architecture explanation
- multi-file refactors with human review
- review-heavy workflows where permissions matter
- teams that want both project memory and permission controls

## Less Suited For

- organizations that have not defined approval or secrets-handling rules
- teams that want a purely editor-first workflow with minimal terminal usage
- environments where shell access is prohibited outright

## Confirmed Capabilities

- reads and reasons over repository files
- edits files across a project
- runs terminal commands with approval controls
- supports multiple surfaces beyond the terminal
- supports `CLAUDE.md` project memory and user-level configuration
- connects to external systems through MCP

## Limitations

- usefulness depends heavily on how clearly the repository conventions are expressed
- terminal and filesystem access require careful permission choices
- project memory improves consistency but does not replace enforcement; the docs explicitly distinguish memory from blocking controls
- hosted or managed rollout details vary by team, enterprise, or cloud-provider setup

## Supported Environments

- macOS
- Linux
- Windows PowerShell
- Windows CMD
- WSL
- terminal CLI
- desktop app
- web
- VS Code and JetBrains according to the official quickstart and interface docs

## Installation

### Native install

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Use this on macOS, Linux, and WSL.

### Windows PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Windows CMD

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### Additional documented install paths

The official quickstart also documents Homebrew and WinGet as supported install methods. Prefer the official quickstart page over copying mirrors or third-party install instructions.

## Authentication

Claude Code supports multiple authentication methods. The official authentication docs describe:

- individual sign-in with a Claude account
- team or enterprise login paths
- cloud-provider-backed options for some organizational setups

For a personal pilot, the normal path is to start `claude` and complete the login flow when prompted.

## First Working Example

```bash
claude
```

From your repository root, ask one low-risk question first:

```text
Explain the structure of this repository and identify the safest first page to improve.
```

Expected behavior:

- Claude maps the repo structure
- references files it inspected
- avoids editing until you ask for a change
- stays inside the current project boundary unless you broaden access

## Common Commands

### Terminal entry points

```bash
claude
claude --version
claude --permission-mode plan
```

### In-session commands

```text
/help
/login
/resume
/permissions
/sandbox
/context
```

Use `/help` for the current command set on your installed version. The CLI reference confirms that permission-mode values can be set at launch and that command names are available inside a session.

## Repository Instructions

Claude Code uses project memory and shared configuration to keep sessions consistent.

Use:

- `CLAUDE.md` for repository-specific instructions
- repo-committed settings when you want a team baseline
- personal configuration under `~/.claude` when the setting should not be shared

## Configuration

Official docs describe a split between:

- project files checked into the repo
- personal configuration under `~/.claude`

The `.claude` directory docs specifically call out that most users edit:

- `CLAUDE.md`
- `settings.json`

On Windows, `~/.claude` resolves under `%USERPROFILE%\\.claude`.

## Permission Model

Claude Code documents both permission modes and lower-level controls.

Important points from the official docs:

- read-only actions have a narrower default trust profile
- editing files, running modifying commands, and network access can require approval
- permission modes control how often approval is requested
- sandbox settings can enforce OS-level file and command boundaries
- managed MCP policies can restrict which MCP servers are available to users

For most teams, start with a review-heavy mode and broaden only after you understand the repo and workflow.

## MCP / Integration Support

Official docs confirm MCP support and provide both a conceptual guide and a quickstart for connecting servers. Claude Code can use MCP servers to access issue trackers, databases, browsers, and other tools without relying on pasted context alone.

That is useful, but it also expands the security boundary. Treat each MCP server as a separate approval decision.

## Real Workflow Demonstration

### Scenario

You are evaluating whether Claude Code is suitable for repository onboarding and low-risk review work in an unfamiliar codebase.

### Repository context

A medium-sized documentation or application repository with build scripts already installed.

### Request

```text
Map this repository, list the main sections, identify the build command, and tell me which page or module looks thinnest before making any edits.
```

### Expected AI behavior

- reads files in the current repository
- identifies structure from the source tree
- points to likely weak spots with file references
- does not change files unless asked

### Human review checkpoint

- check whether the files cited were actually inspected
- verify that the suggested weak spots match your own reading
- confirm no broader permissions were granted than needed

### Validation step

Run the build or test command yourself before trusting any proposed edit plan.

## Team Adoption Guidance

- standardize where `CLAUDE.md` should live and what belongs in it
- define a default permission mode for pilots
- document which MCP servers are approved and which are prohibited
- require human review for edits, commands, and commits until the pilot is stable

## Security Considerations

- Claude Code can read repository files and run commands, so repo secrets and local environment exposure matter immediately
- memory files are context, not enforcement; use permissions, sandboxing, and hooks when you need hard boundaries
- MCP can expose external systems directly to the tool, so read-only adoption first is the safer default
- use the narrowest permission scope that lets the task continue

## Troubleshooting

- If installation guidance differs across blogs and screenshots, trust the official quickstart page only.
- If behavior seems inconsistent, review `CLAUDE.md`, project settings, and personal `~/.claude` settings together.
- If Claude keeps asking for approval too often, adjust the permission mode rather than granting broad unrestricted access by default.

## Alternatives

- [OpenAI Codex](openai-codex.md) for OpenAI-centered terminal workflows
- [Cursor](cursor.md) for IDE-centered teams
- [Aider](aider.md) for a more explicitly git-centric CLI loop

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, auth, memory, permissions, CLI commands, MCP, and surfaces
- Not locally tested: binary installation, account login, desktop/web surfaces, and enterprise policy rollout

## Sources

- https://code.claude.com/docs/en/quickstart
- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/authentication
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/en/permission-modes
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/mcp-quickstart
- https://code.claude.com/docs/en/cli-reference
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/security
