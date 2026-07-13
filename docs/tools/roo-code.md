# Roo Code

> Open-source VS Code coding agent with strong modes, provider flexibility, MCP support, and project-level instruction files.

**Type:** IDE extension  
**Best for:** VS Code-compatible teams that want specialized modes, broad provider choice, and MCP-friendly customization  
**Official docs:** https://docs.roocode.com/  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Roo Code docs for installation, provider setup, modes, custom instructions, `.roorules`, MCP, marketplace, and configuration features were reviewed. No local extension install or provider login was executed in this repository.

## Overview

Roo Code is an open-source AI coding agent for VS Code and compatible editors. The official docs emphasize provider flexibility, built-in task modes, project-specific custom instructions, MCP integration, and a marketplace for modes and MCP servers.

## Best Suited For

- VS Code or Open VSX-compatible editor teams
- developers who want specialized modes such as Code, Ask, Architect, Debug, and Orchestrator
- teams that want broad provider choice instead of a locked vendor stack
- MCP-heavy workflows inside the editor

## Less Suited For

- terminal-first teams looking for a native CLI-first standard
- organizations that do not want to manage provider keys
- teams that want the smallest possible feature surface

## Confirmed Capabilities

- VS Code and compatible-editor installation
- broad provider support
- built-in modes including Code, Ask, Architect, Debug, and Orchestrator
- project-level and global custom instructions
- `.roorules` and `.roo/rules/` instruction support
- MCP support for local and remote servers
- marketplace distribution for MCPs and custom modes

## Limitations

- primary experience is extension-first, not CLI-first
- provider and mode flexibility can create drift without team standards
- this page is documentation-verified only; no live install or model setup was exercised locally
- advanced customization is powerful enough that teams should expect governance work

## Supported Environments

- VS Code
- VSCodium
- Windsurf and other compatible editors through Open VSX according to the install docs
- editor-first workflows

The official docs center Roo Code on the extension experience rather than a standalone terminal CLI.

## Installation

### VS Code Marketplace path

The official install docs describe:

1. open VS Code
2. open Extensions
3. search for `Roo Code`
4. install the `Roo Code` extension by RooVeterinaryInc
5. reload the editor if prompted

### Open VSX-compatible editors

The same install page explicitly documents Open VSX installation paths for editors without Marketplace access, including VSCodium and Windsurf.

## Authentication

Roo Code requires an inference provider. The provider-setup docs say you choose a provider in the Roo Code panel, paste the API key, and select a model.

The official "Connecting Your First LLM Provider" page recommends `claude-sonnet-4-5` as the default starting model for many users.

## First Working Example

Open the Roo Code panel and start with a read-only repository question in `Ask` mode:

```text
Explain this repository, identify the build command, and suggest one low-risk documentation improvement before editing anything.
```

Expected behavior:

- Roo Code uses the active provider and selected model
- the chosen mode shapes how it responds
- project rules can influence output if configured

## Common Commands

Roo Code is primarily extension-driven, so the main control surface is modes and settings rather than shell commands.

The official docs confirm built-in modes:

- Code
- Ask
- Architect
- Debug
- Orchestrator

The Orchestrator mode is explicitly described as a workflow manager that delegates subtasks to specialized modes.

## Repository Instructions

Roo Code has one of the richer repository-instruction stories in this repo.

Official docs confirm support for:

- `.roorules`
- mode-specific `.roorules-*`
- `.roo/rules/`
- mode-specific `.roo/rules-{modeSlug}/`

The docs also describe global rules directories and project-specific overrides. That means teams can keep Roo guidance in version control instead of burying it in personal settings.

## Configuration

The official docs describe several configuration layers:

- provider settings
- API configuration profiles
- custom modes
- custom instructions
- workspace rules

Custom modes can be global or project-specific, and the marketplace can distribute modes and MCP servers to the team.

## Permission Model

Roo Code's docs focus more on modes, providers, and tool groups than on a single named approval matrix. Security still depends on:

- which provider is active
- what tool permissions are granted to each mode
- whether MCP servers are configured
- whether project instructions are carefully reviewed

The FAQ also notes settings such as auto-approval and diff editing.

## MCP / Integration Support

Official Roo docs confirm strong MCP support, including:

- local and remote servers
- STDIO, Streamable HTTP, and SSE transports
- recommended server guides
- marketplace discovery

The transport docs explicitly note that STDIO is lower-latency and inherently more secure because it does not expose a network surface.

## Real Workflow Demonstration

### Scenario

Your team wants a highly customizable editor agent with task-specific modes.

### Repository context

A local application repository opened in VS Code with approved provider credentials already configured.

### Request

```text
In Ask mode, explain the current module structure and recommend one documentation or test improvement before making any changes.
```

### Expected AI behavior

- reads the repository through the active editor context
- responds according to the current mode
- follows any `.roorules` or `.roo/rules/` guidance in scope
- can later switch into Code or Architect workflows when needed

### Human review checkpoint

- verify the selected mode is appropriate
- confirm which provider/model profile is active
- review project rules before trusting their effect on output

### Validation step

Run the repo build or tests after accepting any edit.

## Team Adoption Guidance

- standardize one or two provider profiles before letting every engineer improvise
- keep `.roorules` or `.roo/rules/` files short and reviewable
- decide which custom modes are approved
- treat marketplace modes and MCP servers as separate security reviews

## Security Considerations

- provider keys live outside the repo and need normal secret-management discipline
- custom modes can widen tool access and should be reviewed like code
- MCP servers expand the execution and data boundary
- workspace instruction files should stay concise so they remain auditable

## Troubleshooting

- If Roo behaves oddly, verify the selected provider, model, and mode first.
- If rules are not applied as expected, inspect `.roorules`, `.roo/rules/`, and any global rules together.
- If MCP integration is unstable, verify the chosen transport type and whether the server is local or remote.

## Alternatives

- [Cursor](cursor.md) or [GitHub Copilot](github-copilot.md) for more productized editor-first workflows
- [Cline](cline.md) or [Continue](continue.md) for more explicit CLI-plus-editor ecosystems

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, providers, modes, rules, MCP, and marketplace features
- Not locally tested: extension installation, API-key onboarding, and live MCP setup

## Sources

- https://docs.roocode.com/
- https://docs.roocode.com/getting-started/installing
- https://docs.roocode.com/getting-started/connecting-api-provider
- https://docs.roocode.com/providers/
- https://docs.roocode.com/basic-usage/using-modes
- https://docs.roocode.com/features/custom-instructions
- https://docs.roocode.com/features/custom-modes
- https://docs.roocode.com/features/mcp/overview
- https://docs.roocode.com/features/mcp/using-mcp-in-roo
- https://docs.roocode.com/features/mcp/server-transports
- https://docs.roocode.com/features/mcp/recommended-mcp-servers
- https://docs.roocode.com/features/marketplace
- https://docs.roocode.com/faq
