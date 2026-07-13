# Cline

> Model-agnostic coding agent across editor and terminal workflows with explicit approval and MCP control.

**Type:** IDE extension / CLI / SDK  
**Best for:** Teams that want provider flexibility, explicit approvals, and configurable agent infrastructure  
**Official docs:** https://docs.cline.bot/cline-overview  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Cline overview, install, config, CLI, MCP, tools, auto-approve, and troubleshooting docs were reviewed. Commands were not executed locally in this repository.

## Overview

Cline is an AI coding agent that lives in the editor and terminal. The official docs describe it as able to read and write files, run terminal commands, use a browser, and operate through explicit approval. It also supports different provider paths, local models, and richer agent infrastructure such as plugins, hooks, and workflows.

## Best Suited For

- teams that want provider choice instead of a single vendor lock-in
- developers who want explicit approval before every risky action
- editor users who also want a real CLI and headless automation path
- advanced teams that may want plugins, hooks, local models, or SDK-based extensions

## Less Suited For

- teams that want the simplest possible setup
- organizations that do not want to manage provider configuration
- environments where plugin, MCP, or auto-approve policy has not been defined

## Confirmed Capabilities

- editor and terminal workflows
- provider authentication with the built-in service or bring-your-own-key flows
- CLI usage with interactive and structured-output modes
- MCP support through `.cline/mcp.json`
- configurable rules, skills, hooks, plugins, agents, and workflows
- explicit approval controls, including auto-approve and YOLO mode

## Limitations

- the feature surface is broad, which increases policy drift risk
- provider flexibility means rollout quality depends on team conventions
- auto-approve and YOLO mode need careful governance
- this page is documentation-verified only, not locally exercised

## Supported Environments

- VS Code
- Cursor
- JetBrains
- Windsurf
- VSCodium
- terminal CLI
- SDK and Kanban according to official install docs

The official docs also document local-model usage through runtimes such as Ollama, LM Studio, and Atomic Chat.

## Installation

### CLI install

```bash
npm install -g cline
```

### First interactive run

```bash
cline
```

### Other documented install paths

The install docs also describe IDE extensions, SDK usage, and Kanban workflows. Use the official install guide when choosing between those surfaces.

## Authentication

The CLI overview lists `cline auth` as the provider authentication entry point.

```bash
cline auth
```

The official docs describe both Cline-managed access paths and bring-your-own-provider credentials.

## First Working Example

```bash
cline "explain this repository and identify one low-risk improvement"
```

For an interactive session:

```bash
cline
```

Expected behavior:

- Cline starts in terminal chat or TUI mode
- prompts before risky actions
- keeps approval with the human unless you widen policy settings

## Common Commands

The official CLI overview and reference confirm these high-value commands:

```bash
cline --help
cline auth
cline config
cline mcp
cline doctor
cline history
```

The TUI docs also confirm:

```bash
cline -i
cline --json "list TODO comments"
```

## Repository Instructions

Cline supports multiple repository-level control surfaces. The official CLI reference shows project files such as:

- `.cline/rules/`
- `.cline/skills/`
- `.cline/hooks/`
- `.cline/plugins/`
- `.cline/mcp.json`
- `.cline/agents.yaml`

For teams, this is powerful but easy to overdo. Start with a small rules and MCP baseline before rolling out hooks or plugins broadly.

## Configuration

The official config docs describe two scopes:

- global configuration in `~/.cline/`
- project configuration in `.cline/`

The docs also note that global provider settings, global settings, and MCP settings are stored under `~/.cline/data/settings/`.

## Permission Model

The official overview explicitly says every action requires explicit approval by default. The docs also describe:

- Auto Approve for routine operations
- YOLO Mode for no-confirmation execution
- command and tool controls in CLI and UI flows

This makes Cline safer by default than some agent tools, but only if you do not casually enable broad auto-approval.

## MCP / Integration Support

Official docs confirm MCP support in both the general overview and the dedicated MCP docs. The docs show CLI MCP config at:

- `~/.cline/mcp.json`

MCP tools are loaded alongside built-in tools, which means each configured server directly expands what the agent can do.

## Real Workflow Demonstration

### Scenario

Your team wants a model-flexible coding agent but still wants human approval on risky steps.

### Repository context

A local application repository opened in an editor or terminal.

### Request

```text
Explain this module, trace the main data flow, and propose one safe refactor before modifying anything.
```

### Expected AI behavior

- reads the code
- proposes a plan
- asks for approval before file writes or command execution
- can pull in MCP tools if explicitly configured

### Human review checkpoint

- confirm the provider and model are the intended ones
- review the proposed plan before any writes
- verify that auto-approve is not hiding risky actions

### Validation step

Run the local build or tests after the edit.

## Team Adoption Guidance

- standardize which provider path is approved
- define whether auto-approve is allowed and for which command classes
- keep `.cline/` configuration reviewable in code review
- allow MCP only from an approved server list

## Security Considerations

- approval is a control boundary; do not weaken it casually
- plugins, hooks, and MCP servers all expand the execution surface
- local-model support is useful, but teams still need policy around what data can leave the workstation
- proxy and firewall configuration may be required in enterprise environments

## Troubleshooting

- If provider setup fails, run `cline auth` and `cline doctor`.
- If enterprise networking blocks access, use the official proxy guidance.
- If behavior differs across editor and CLI surfaces, inspect global and project config together.

## Alternatives

- [Continue](continue.md) for another open and configurable CLI-plus-editor stack
- [Cursor](cursor.md) for a more productized IDE-first experience
- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for more opinionated terminal-first agents

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, config, CLI commands, approvals, MCP, and supported surfaces
- Not locally tested: npm install, provider auth, editor extension behavior, and local-model setup

## Sources

- https://docs.cline.bot/cline-overview
- https://docs.cline.bot/getting-started/installing-cline
- https://docs.cline.bot/getting-started/config
- https://docs.cline.bot/usage/cli-overview
- https://docs.cline.bot/usage/tui
- https://docs.cline.bot/cli/cli-reference
- https://docs.cline.bot/mcp/mcp-overview
- https://docs.cline.bot/tools-reference/all-cline-tools
- https://docs.cline.bot/features/auto-approve
- https://docs.cline.bot/running-models-locally/overview
- https://docs.cline.bot/troubleshooting/networking-and-proxies
