# OpenCode

> Open-source coding agent available in terminal, desktop, and IDE surfaces.

**Type:** CLI / desktop app / IDE extension  
**Best for:** Open-source hybrid agent workflows  
**Official docs:** https://opencode.ai/docs/  
**Last verified:** 2026-07-12  
**Status:** Confirmed

## Quick Start

```bash
opencode
```

## Installation

### macOS

```bash
curl -fsSL https://opencode.ai/install | bash
```

### Windows

```powershell
npm install -g opencode-ai
```

### Linux

```bash
curl -fsSL https://opencode.ai/install | bash
```

### WSL

```bash
curl -fsSL https://opencode.ai/install | bash
```

## Authentication

Use `/connect` inside the TUI and choose a provider.

## Basic Commands

```bash
opencode
opencode run "your prompt"
```

## Intermediate Commands

```text
/connect
/init
/models
/undo
```

## Advanced Commands

- agents
- plugins
- policies
- MCP servers

## Project Configuration

- `opencode.json`
- `opencode.jsonc`
- `.opencode/`

## Instruction Files

- `AGENTS.md`

## Models and Versions

- configure models and providers in OpenCode config

## Permissions and Security

- review provider auth and plugin settings

## MCP / Integrations

Official docs confirm MCP support.

## Common Workflows

- plan then build
- terminal coding

## Team Best Practices

- WSL is recommended on Windows

## Troubleshooting

- check config locations by platform

## When to Use

- open-source hybrid agent workflows

## When Not to Use

- when the team wants a locked-down single-vendor stack

## Sources

- https://opencode.ai/docs/
- https://opencode.ai/docs/cli/
- https://opencode.ai/docs/config/
