# OpenCode

> Open-source coding agent across terminal, desktop, IDE, HTTP server, agents, tools, and MCP workflows.

**Type:** CLI / desktop app / IDE extension / server  
**Best for:** Open-source agent experimentation with configurable providers, agents, tools, and MCP  
**Official docs:** https://opencode.ai/docs/  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official OpenCode intro, CLI, config, rules, agents, tools, MCP, server, and troubleshooting docs were reviewed. Commands were not executed locally in this repository.

## Overview

OpenCode is an open-source AI coding agent available in a terminal interface, desktop app, and IDE extension. Its docs put unusual emphasis on configurable agents, custom tools, MCP servers, provider abstraction through Models.dev, and even a headless HTTP server surface.

## Best Suited For

- teams that want an open-source agent platform rather than a single narrow CLI
- advanced users who want custom agents, tools, plugins, or headless server workflows
- mixed terminal and IDE usage
- organizations that want to experiment with provider-flexible agent architecture

## Less Suited For

- teams that want the simplest possible onboarding
- organizations that have not defined policy around custom tools or agent composition
- users who only want a basic prompt-to-edit coding helper

## Confirmed Capabilities

- terminal, desktop, and IDE usage
- install script and package-manager installation paths
- provider login through `opencode auth login`
- configurable `AGENTS.md` guidance with `/init`
- configurable agents, tools, plugins, and MCP servers
- custom tools that can execute arbitrary code
- headless HTTP server mode through `opencode serve`

## Limitations

- the feature surface is broad, which makes governance important
- custom tools can execute arbitrary code, so they require explicit review
- provider and agent design choices can make team behavior inconsistent without standards
- this page is documentation-verified only; no install or login was executed locally

## Supported Environments

- macOS
- Linux
- Windows via package-manager install paths
- WSL
- terminal CLI
- desktop app
- IDE extension
- headless HTTP server

The docs also recommend WSL for some Windows workflows.

## Installation

### Install script

```bash
curl -fsSL https://opencode.ai/install | bash
```

### npm install

```bash
npm install -g opencode-ai
```

### First run

```bash
opencode
```

The intro docs also show Bun, pnpm, and Yarn install paths.

## Authentication

The CLI docs explicitly document provider authentication through:

```bash
opencode auth login
```

The docs say credentials are stored in `~/.local/share/opencode/auth.json`, and environment variables or a project `.env` file can also provide provider keys.

## First Working Example

```bash
opencode
```

From the repository root, start with a low-risk repo question:

```text
Explain the structure of this repository and recommend one safe docs or test improvement before editing anything.
```

Expected behavior:

- OpenCode inspects the repo
- can switch agents or tools based on configuration
- can initialize shared rules if you ask it to

## Common Commands

### CLI entry points

```bash
opencode
opencode run "your prompt"
opencode auth login
opencode serve
```

### TUI and slash-command workflow

```text
/connect
/init
/models
/help
!ls -la
```

The docs also confirm `opencode mcp [command]` and `opencode mcp add` for MCP management.

## Repository Instructions

OpenCode documents `AGENTS.md` as a first-class repository instruction mechanism. The rules docs explicitly say you can create it with `/init`, and the docs recommend committing it to git.

This is a strong fit for team rollout because it gives the repo a visible source of truth for:

- build and test commands
- repository conventions
- review expectations
- warnings about risky areas or restricted commands

## Configuration

OpenCode documents multiple configuration surfaces, including:

- `opencode.json`
- `opencode.jsonc`
- `.opencode/`
- `OPENCODE_CONFIG_DIR`

The config docs say a custom config directory can override the global and project `.opencode` directories.

## Permission Model

OpenCode's official docs put less emphasis on named approval profiles than tools like Codex or Claude Code, but the security boundary is still significant because it supports:

- custom tools that execute arbitrary code
- MCP servers
- provider credentials from local auth or environment
- server mode for remote interaction

This means your team needs policy even if the product does not present it as one unified "permissions" screen.

## MCP / Integration Support

Official docs confirm MCP support for both local and remote servers. The docs also note that OpenCode can automatically handle OAuth for remote MCP servers and store the resulting tokens securely for future requests.

That makes MCP powerful here, but also operationally significant. Review every server and auth flow before approving it for team-wide use.

## Real Workflow Demonstration

### Scenario

You want an open-source agent that can start simple but grow into agents, tools, and automation later.

### Repository context

A local repository where the team may eventually want shared agent instructions and optional MCP integrations.

### Prompt

```text
Review this repository, identify the build and test commands, and propose one safe documentation improvement before touching any files.
```

### Expected AI behavior

- reads the repo
- can use configured agents and tools
- can create or refine `AGENTS.md` through `/init`
- can grow into MCP or server-based workflows if you choose to enable them

### Human review checkpoint

- confirm which provider and model are active
- review any custom tool or MCP usage carefully
- inspect `AGENTS.md` output before treating it as team policy

### Validation step

Run the docs build or test command after the change.

## Team Adoption Guidance

- start with terminal usage and `AGENTS.md` before approving custom tools
- define which providers are supported and how credentials are stored
- review every MCP server and custom tool in code review
- treat server mode as a separate rollout phase from local interactive use

## Security Considerations

- custom tools can execute arbitrary code and should be reviewed like scripts
- MCP plus OAuth introduces external-system access and token handling concerns
- `.env`-based provider credentials should never be committed
- broader agent composition increases flexibility but also review burden

## Troubleshooting

- If provider auth fails, inspect `auth.json`, environment variables, and local `.env` files together.
- If MCP behavior is inconsistent, check whether the server is local or remote and whether OAuth was required.
- If the tool behaves unexpectedly, inspect logs and local stored data as described in the troubleshooting docs.

## Alternatives

- [Continue](continue.md) or [Cline](cline.md) for more structured CLI-plus-editor ecosystems
- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for more opinionated local coding-agent workflows

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, auth, config, `AGENTS.md`, agents, tools, MCP, and server mode
- Not locally tested: installer execution, provider login, desktop app, and headless HTTP workflows

## Sources

- https://opencode.ai/docs/
- https://opencode.ai/docs/cli/
- https://opencode.ai/docs/config/
- https://opencode.ai/docs/rules/
- https://opencode.ai/docs/agents/
- https://opencode.ai/docs/tools/
- https://opencode.ai/docs/mcp-servers/
- https://opencode.ai/docs/server/
- https://opencode.ai/docs/skills/
- https://opencode.ai/docs/troubleshooting/
