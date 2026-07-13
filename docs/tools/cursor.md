# Cursor

> AI-first editor and CLI workflow with rules, MCP, and agent-style automation.

**Type:** IDE / CLI / agent  
**Best for:** Daily coding inside the editor with optional terminal workflows  
**Official docs:** https://cursor.com/docs  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Cursor docs for CLI, installation, rules, MCP, headless mode, authentication, configuration, permissions, and terminal tools were reviewed. No local Cursor install or login flow was executed in this repository.

## Overview

Cursor is positioned by its official docs as an AI development environment that spans the editor, agent workflows, rules, MCP, skills, and CLI usage. Its strongest fit in this repository is still IDE-first daily coding, but the docs now also show a substantial terminal and headless CLI surface.

## Best Suited For

- IDE-first engineering teams
- developers who want rules and context to follow them inside the editor
- mixed editor and terminal workflows
- teams that want MCP and agent workflows without giving up editor ergonomics

## Less Suited For

- organizations that want a strictly terminal-only standard
- teams that will not maintain rules, permissions, or configuration conventions
- environments where headless or API-key-backed automation is prohibited

## Confirmed Capabilities

- editor-based agent workflows
- CLI usage from the terminal
- headless CLI mode for automation
- rules at project, team, and user scope
- MCP support
- command execution through terminal integration
- permissions and configuration controls documented for the CLI

## Limitations

- the broad feature surface means policy and configuration can drift quickly without a team standard
- the docs confirm multiple rule scopes, which is powerful but makes precedence and review important
- CLI automation paths deserve extra security review before rollout
- this page is documentation-verified only; install and auth were not exercised locally

## Supported Environments

- macOS
- Linux
- Windows
- CLI
- headless CLI
- editor workflows

The CLI installation docs explicitly describe a single-command install path for macOS, Linux, and Windows, while WSL still needs team-specific validation based on how you want the editor and terminal to interact.

## Installation

Use the official CLI installation guide for the current single-command installer and PATH setup instructions. The docs explicitly describe:

- macOS installation
- Linux installation
- Windows installation
- post-install verification and PATH guidance

Because the rendered docs are highly dynamic and this repository has not locally tested the installer, link contributors to the official page instead of copying a guessed command.

## Authentication

Cursor documents a dedicated CLI authentication flow and separate API-key-backed behavior for some automation scenarios. Use the normal interactive sign-in path for personal or team evaluation first, and keep headless or API-key-backed usage behind policy review.

## First Working Example

Open a repository in Cursor and ask the agent to explain the project before editing anything. If you are evaluating the terminal surface, start with the documented Cursor CLI overview path and submit a read-only repository question first.

Example task:

```text
Explain the main packages in this repository, identify the build command, and point out one low-risk cleanup opportunity without changing files.
```

## Common Commands

The official Cursor CLI docs confirm:

- a CLI overview surface
- agent usage from the command line
- headless mode
- shell-mode support
- slash commands and configuration references

Use the docs as the source of truth for the exact syntax on your installed version.

## Repository Instructions

Cursor documents multiple instruction systems:

- Project Rules
- Team Rules
- User Rules
- `AGENTS.md`

The Rules docs explicitly describe project, team, and user rules plus `AGENTS.md`. That makes rule sprawl a real team concern, so define which layers your team is actually allowed to use.

## Configuration

Cursor documents dedicated CLI configuration and authentication references. Use them to define:

- CLI behavior
- auth and API-key usage
- permission controls
- MCP server usage
- shell and terminal integration

For team rollout, standardize which configuration belongs in the repository versus personal settings.

## Permission Model

Cursor documents CLI permissions and a terminal tool surface. That means the tool can cross from chat assistance into command execution quickly.

Treat these questions as mandatory before rollout:

- Which commands can the agent run?
- What approval model is required?
- Is shell access on by default for all users?
- Are MCP servers allowed for everyone or only specific roles?
- Is headless automation allowed at all?

## MCP / Integration Support

Cursor docs confirm MCP support in both the main docs and CLI documentation. This is useful for external context, but it should not be approved casually. Every server expands the data and execution boundary.

## Real Workflow Demonstration

### Scenario

A product engineer wants AI help inside the editor, but the team wants to keep the first evaluation low risk.

### Repository context

A normal local application repository opened in Cursor.

### Request

```text
Review the current feature module, explain how data flows through it, and suggest one refactor or test improvement before making any edits.
```

### Expected AI behavior

- reads the relevant files
- explains the code in editor context
- proposes a small improvement
- waits for confirmation before applying changes if permissions require it

### Human review checkpoint

- compare the explanation with the actual code
- review any generated diff before accepting
- verify that rules or team instructions are not over-constraining the response

### Validation step

Run the relevant tests or build after the change.

## Team Adoption Guidance

- define whether your team uses Project Rules only or also Team/User Rules
- keep repository rules short, specific, and reviewable
- pilot editor workflows before approving headless automation
- document the approved MCP server set separately from general tool approval

## Security Considerations

- terminal integration and CLI automation expand the tool from editor assistant to execution surface
- rule layering can hide conflicting instructions if you do not document precedence
- headless mode and API-key-backed workflows deserve a separate approval path from normal interactive editor use
- review MCP servers and CLI permissions independently; both can widen exposure

## Troubleshooting

- If installation or PATH behavior differs, follow the current official CLI installation page.
- If agent behavior is inconsistent, inspect project rules, team rules, user rules, and `AGENTS.md` together.
- If automation is needed, review headless mode requirements before copying interactive guidance into CI.

## Alternatives

- [GitHub Copilot](github-copilot.md) for GitHub-centered editor and CLI usage
- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for stronger terminal-first defaults
- [Cline](cline.md) or [Continue](continue.md) for more explicitly provider-flexible workflows

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for CLI, rules, MCP, headless mode, and permissions
- Not locally tested: installer command, sign-in flow, editor behavior, and team-admin settings

## Sources

- https://cursor.com/docs
- https://cursor.com/docs/cli/overview
- https://cursor.com/docs/cli/installation
- https://cursor.com/docs/cli/using
- https://cursor.com/docs/cli/headless
- https://cursor.com/docs/rules
- https://cursor.com/docs/mcp
- https://cursor.com/docs/cli/mcp
- https://cursor.com/docs/cli/reference/authentication
- https://cursor.com/docs/cli/reference/configuration
- https://cursor.com/docs/cli/reference/permissions
- https://cursor.com/docs/agent/tools/terminal
