# Windsurf

> AI IDE and agent platform whose current official docs now describe the local product as Devin Desktop while still using Windsurf in plugin and legacy paths.

**Type:** IDE / agent platform / plugin ecosystem  
**Best for:** Agent-centric IDE pilots, team-admin rollouts, and organizations that want rules, MCP, permissions, and cloud-plus-local agent workflows  
**Official docs:** https://docs.windsurf.com/  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Windsurf/Devin Desktop docs for getting started, Cascade, rules, `AGENTS.md`, MCP, Devin Local permissions, admin guidance, terminal behavior, and troubleshooting were reviewed. No local desktop install or sign-in flow was executed in this repository.

## Overview

As of July 13, 2026, the public docs are in a naming transition: the local IDE is documented as **Devin Desktop**, while several plugin and legacy sections still use **Windsurf**. For this repository, treat Windsurf as the ecosystem name and Devin Desktop as the current local IDE surface described by the official docs.

The docs position the platform as an AI IDE with Cascade, Devin Local, cloud Devin integration, memories and rules, MCP servers, skills, workflows, and enterprise controls.

## Best Suited For

- teams evaluating an agent-centric IDE instead of a plain completion tool
- organizations that need admin controls, RBAC, SSO, SCIM, analytics, and rollout guidance
- teams that want both local and cloud agent workflows
- users who want rules, `AGENTS.md`, MCP, and workflow automation inside the IDE

## Less Suited For

- strict terminal-only teams
- organizations that want the smallest possible security surface
- teams that have not yet defined policy around MCP, local execution, and agent permissions

## Confirmed Capabilities

- desktop IDE for macOS, Windows, and Linux
- Cascade agent with Code/Chat modes, tool calling, checkpoints, voice input, and linter integration
- Devin Local agent with a fine-grained permissions model
- workspace and global rules
- directory-scoped `AGENTS.md`
- MCP support with admin controls
- workflows, skills, and cloud-agent integration

## Limitations

- product naming is currently mixed across the docs, which can confuse team rollout
- the capability surface is broad enough that governance is mandatory
- local and cloud agents have different behavior and approval implications
- this page is documentation-verified only; no live install or login was performed

## Supported Environments

- macOS
- Windows
- Linux
- desktop IDE
- plugin/editor integrations in separate docs
- local and cloud agent workflows

The getting-started docs explicitly describe installing Devin Desktop on macOS, Windows, or Linux and importing settings from VS Code or Cursor.

## Installation

Use the official desktop download and onboarding flow described in the getting-started docs. The docs explicitly say Devin Desktop can import VS Code or Cursor settings during setup.

For plugin-style editor integrations, the official docs also maintain separate Windsurf Plugins documentation.

## Authentication

Follow the official onboarding flow inside Devin Desktop. For team or enterprise rollout, use the admin docs to define account provisioning, SSO, SCIM, and RBAC before broad adoption.

## First Working Example

Open a repository in Devin Desktop and start with Cascade in a read-heavy request:

```text
Explain the structure of this repository, identify the build command, and recommend one low-risk improvement before editing any files.
```

Expected behavior:

- Cascade pulls in editor and terminal context
- rules and `AGENTS.md` can shape the response
- command execution behavior depends on the configured approval model

## Common Commands

Windsurf is primarily IDE-driven, but the docs explicitly confirm:

- `Cmd/Ctrl+L` opens Cascade
- terminal auto-execution levels can be configured
- MCP servers can be added from the Cascade MCP UI or settings

The current docs are stronger on feature surfaces and settings than on a public standalone CLI command reference.

## Repository Instructions

Official docs confirm support for `AGENTS.md` and rules.

Important documented locations:

- `AGENTS.md` files apply instructions based on directory location
- rules can live in `.devin/rules` or legacy `.windsurf/rules`
- `.devin/` is preferred and takes precedence over `.windsurf/`

This is a useful team feature, but you should pick one canonical convention rather than mixing every option.

## Configuration

The docs describe several persistent customization systems:

- Memories
- Rules
- `AGENTS.md`
- Skills
- Workflows
- `.codeiumignore`

The indexing docs also say repo-level `.codeiumignore` controls which files Devin Desktop should ignore, and `~/.codeium/.codeiumignore` can provide a global baseline.

## Permission Model

The official Devin Local docs now describe a fine-grained permissions model:

- deny rules block actions
- ask rules require approval
- allow rules auto-approve actions

The docs explicitly say permissions can be scoped to:

- file reads
- file writes
- command execution
- HTTP fetches
- MCP tools

The terminal docs also describe auto-execution levels such as Disabled, Allowlist Only, and Auto.

## MCP / Integration Support

Official docs confirm MCP support with both product and admin documentation. The docs describe:

- MCP marketplace discovery
- raw `mcp_config.json` editing
- official MCPs with a blue checkmark
- admin whitelisting and default-allow behavior for trusted integrations

This is powerful, but the admin docs explicitly warn that MCP can create infrastructure resources outside Devin Desktop's security monitoring.

## Real Workflow Demonstration

### Scenario

An enterprise team wants to pilot an AI IDE with explicit governance.

### Repository context

A shared repository opened in Devin Desktop with admin-approved rules and MCP settings.

### Request

```text
Review this repository, map the architecture, and suggest one safe documentation or test improvement before making any changes.
```

### Expected AI behavior

- Cascade uses editor and terminal context
- workspace rules and `AGENTS.md` can refine the response
- command or MCP actions may require approval depending on policy
- local and cloud agent surfaces can be used for different task types

### Human review checkpoint

- verify whether Cascade or Devin Local is handling the task
- inspect active rules and `AGENTS.md` coverage
- confirm terminal and MCP permission settings before approving actions

### Validation step

Run the local build or tests after accepting any change.

## Team Adoption Guidance

- explain the naming transition internally so engineers know that current docs say Devin Desktop
- standardize on `.devin/rules` rather than legacy `.windsurf/rules`
- treat MCP approval as a separate governance step from base IDE approval
- define whether cloud Devin usage is allowed by default or only for specific task classes

## Security Considerations

- local file, command, HTTP, and MCP permissions should be reviewed explicitly
- admin whitelists and RBAC matter for enterprise rollout
- rules, hooks, skills, and workflows are code-like configuration and should be reviewed as such
- `.codeiumignore` is useful for keeping sensitive or irrelevant paths out of indexing

## Troubleshooting

- If the docs or product names seem inconsistent, remember that the July 13, 2026 docs mix Devin Desktop and Windsurf terminology.
- If command execution behaves unexpectedly, inspect both terminal auto-execution settings and Devin Local permission rules.
- If MCP usage is unstable, verify whether the server came from the marketplace or raw config and whether admin policy is restricting it.

## Alternatives

- [Cursor](cursor.md) for a more familiar IDE-first agent workflow
- [GitHub Copilot](github-copilot.md) for GitHub-centered adoption
- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for stronger terminal-first standards

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, naming, rules, `AGENTS.md`, permissions, MCP, and admin rollout
- Not locally tested: desktop install, sign-in, SSO/RBAC rollout, and real agent execution

## Sources

- https://docs.windsurf.com/
- https://docs.windsurf.com/windsurf/getting-started
- https://docs.windsurf.com/windsurf/cascade/cascade
- https://docs.windsurf.com/windsurf/cascade/memories
- https://docs.windsurf.com/windsurf/cascade/agents-md
- https://docs.windsurf.com/windsurf/cascade/mcp
- https://docs.windsurf.com/windsurf/cascade/skills
- https://docs.windsurf.com/windsurf/devin-local
- https://docs.windsurf.com/windsurf/devin
- https://docs.windsurf.com/windsurf/terminal
- https://docs.windsurf.com/windsurf/guide-for-admins
- https://docs.windsurf.com/troubleshooting/windsurf-common-issues
- https://docs.windsurf.com/context-awareness/windsurf-ignore
