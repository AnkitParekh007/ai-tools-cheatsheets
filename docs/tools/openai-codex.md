# OpenAI Codex

> OpenAI coding agent across CLI, IDE, desktop, web, and cloud workflows.

**Type:** CLI / IDE / desktop / web / cloud agent  
**Best for:** Terminal coding, local review, shared `AGENTS.md` guidance, and OpenAI-centered workflows  
**Official docs:** https://learn.chatgpt.com/docs/codex/cli  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official OpenAI Codex CLI, configuration, `AGENTS.md`, MCP, approvals, permissions, and sandboxing docs were reviewed. Commands were not executed locally in this repository.

## Overview

Codex CLI is OpenAI's local coding agent for terminal workflows. Official docs describe it as a tool that can inspect files, make edits, run commands, and automate repeatable work from within a project directory. The broader Codex documentation also documents IDE, desktop, web, and cloud surfaces.

## Best Suited For

- terminal-first OpenAI workflows
- repository exploration and explanation
- local code review before commit or PR creation
- repeatable command-line or CI-style tasks
- teams that want shared `AGENTS.md` instructions across Codex surfaces

## Less Suited For

- purely editor-first teams that do not want a terminal loop
- organizations that need zero command execution risk
- teams that have not decided how sandboxing and approvals should work

## Confirmed Capabilities

- reads and edits files in the current repository
- runs commands inside the selected directory
- supports interactive and programmatic usage
- supports `AGENTS.md` for project instructions
- supports configuration files at user and project scope
- supports MCP for access to external tools and context
- supports permission and sandbox controls

## Limitations

- useful operation depends on correct sandbox and approval choices
- not every surface has the same features or setup path
- local command execution is powerful but expands risk immediately
- advanced configuration such as rules is still marked experimental in the OpenAI docs

## Supported Environments

- macOS
- Linux
- Windows
- WSL
- terminal CLI
- IDE extension
- ChatGPT desktop app
- ChatGPT web
- Codex cloud

The CLI quickstart specifically documents macOS/Linux standalone installer, Windows, npm, and Homebrew tabs.

## Installation

### macOS and Linux standalone installer

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### Update Codex

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### Other documented install tabs

The official quickstart also includes Windows, npm, and Homebrew installation paths. Use the official page for the currently supported syntax rather than copying old screenshots.

## Authentication

Run `codex` from a project directory and follow the sign-in flow. The official quickstart says the first run offers `Sign in with ChatGPT` and may present other available methods depending on the surface and account.

## First Working Example

```bash
codex
```

From the repository root, start with a scoped prompt such as:

```text
Tell me about this project and identify the safest first improvement before editing anything.
```

Expected behavior:

- Codex inspects the local repo
- explains structure before changing files
- keeps the work inside the current directory
- lets you review commands and diffs as they appear

## Common Commands

### CLI entry points

```bash
codex
codex --version
codex exec "run the test suite and summarize failures"
```

### In-session commands documented by OpenAI

```text
/init
/status
/permissions
/model
/review
```

The OpenAI CLI docs explicitly list these commands in the interactive surface.

## Repository Instructions

OpenAI documents `AGENTS.md` as the project guidance file for Codex. The official `AGENTS.md` page states that Codex reads these files before doing any work and layers global and project-specific guidance together.

Use `AGENTS.md` for:

- build and test commands
- repo structure notes
- coding conventions
- review expectations
- safety constraints that should be visible on every task

## Configuration

OpenAI documents both user-level and project-level configuration:

- user config: `~/.codex/config.toml`
- project config: `.codex/config.toml`

The configuration docs say the CLI and IDE extension share these configuration layers, and command-line `-c key=value` overrides take precedence for a single invocation.

## Permission Model

OpenAI documents approvals, sandboxing, and permission profiles separately.

Important points:

- approvals determine when Codex pauses before a local action
- sandboxing determines which files and network destinations commands can access
- named permission profiles are available, including documented built-ins such as `:read-only`, `:workspace`, and `:danger-full-access`
- the docs recommend using the project boundary as the default and widening access only when necessary

This should be treated as a team policy surface, not just a convenience feature.

## MCP / Integration Support

OpenAI documents MCP as a way to give Codex access to third-party documentation, browser tools, Figma, and other systems. The docs also note that local Codex clients can connect directly to MCP servers and share configuration with other local Codex surfaces.

Use MCP only when pasted context is clearly insufficient and after you review the server's permission surface.

## Real Workflow Demonstration

### Scenario

You want a terminal-native assistant to explore a repository, propose a plan, then make one safe focused change.

### Repository context

A local git repository with build tools already installed.

### Prompt

```text
Review this repository, summarize the architecture, propose one low-risk documentation or test improvement, and wait for approval before editing files.
```

### Expected AI behavior

- reads files in the current repo
- summarizes project structure
- proposes a scoped task
- pauses for approval before editing if your permissions require it
- lets you inspect diffs before continuing

### Human review checkpoint

- confirm the suggested task is actually low risk
- inspect the diff before accepting it
- verify that the current sandbox and approval settings match the task

### Validation step

Run the build, test, or docs command yourself after the change.

## Team Adoption Guidance

- standardize a minimal `AGENTS.md` template before broad rollout
- define default sandbox and approval expectations for local work
- keep MCP optional until the local CLI loop is trusted
- use local review and planning tasks before allowing broader automation

## Security Considerations

- Codex can inspect, edit, and run code locally, so the risk boundary is the current repository plus whatever the sandbox allows
- approvals and sandboxing are separate controls; widening one should not imply widening the other
- every MCP server adds more context and more surface area; OpenAI's pricing docs also note that extra MCP context increases usage
- experimental rules should not be treated as a mature enforcement mechanism yet

## Troubleshooting

- If behavior differs from examples, re-check the current CLI reference because command and flag coverage evolves quickly.
- If repository behavior is inconsistent, inspect `AGENTS.md`, user config, project config, and command-line overrides together.
- If a task needs broader access than expected, review `/permissions` and sandbox settings before retrying.

## Alternatives

- [Claude Code](claude-code.md) for another terminal-first agent with a different memory and permission model
- [GitHub Copilot](github-copilot.md) for GitHub-centric CLI and editor usage
- [Cursor](cursor.md) for stronger IDE-first usage

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official OpenAI docs reviewed for CLI install, permissions, config, `AGENTS.md`, MCP, and supported surfaces
- Not locally tested: installer execution, sign-in flow, IDE extension behavior, and cloud-task behavior

## Sources

- https://learn.chatgpt.com/docs/codex/cli
- https://learn.chatgpt.com/docs/developer-commands?surface=cli
- https://learn.chatgpt.com/docs/config-file/config-basic
- https://learn.chatgpt.com/docs/config-file/config-reference
- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://learn.chatgpt.com/docs/agent-approvals-security
- https://learn.chatgpt.com/docs/permissions
- https://learn.chatgpt.com/docs/sandboxing
- https://learn.chatgpt.com/docs/extend/mcp
- https://learn.chatgpt.com/docs/customization/overview
