# Continue

> Open-source coding agent available as IDE extensions and the `cn` terminal CLI.

**Type:** CLI / IDE extension / JetBrains plugin  
**Best for:** Open workflows with shared YAML config  
**Official docs:** https://docs.continue.dev/  
**Last verified:** 2026-07-12  
**Status:** Confirmed

## Quick Start

```bash
cn
```

## Installation

### macOS

```bash
curl -fsSL https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.sh | bash
```

### Windows

```powershell
npm install -g @continuedev/cli
```

### Linux

```bash
curl -fsSL https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.sh | bash
```

### WSL

```bash
curl -fsSL https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.sh | bash
```

## Authentication

```bash
cn login
```

## Basic Commands

```bash
cn --version
cn
cn -p "explain this repository"
```

## Intermediate Commands

```text
/config
```

## Advanced Commands

```bash
cn --readonly
cn --auto
cn --rule ./rules/style.md
cn --mcp my-server
cn --model my-model
```

## Project Configuration

- `~/.continue/config.yaml`
- `.continue/rules/*`

## Instruction Files

- `.continue/rules/*.md`

## Models and Versions

- model selection is configured in YAML

## Permissions and Security

- use env vars for secrets

## MCP / Integrations

Official docs confirm MCP support.

## Common Workflows

- editor plus CLI coding
- headless automation

## Team Best Practices

- treat YAML config as code

## Troubleshooting

- docs are active; the main repo is read-only

## When to Use

- open-source IDE plus CLI workflows

## When Not to Use

- when the team wants a fully vendor-managed experience

## Sources

- https://docs.continue.dev/
- https://docs.continue.dev/cli/quickstart
- https://docs.continue.dev/cli/configuration
