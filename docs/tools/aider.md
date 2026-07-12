# Aider

> Git-centric terminal pair-programming tool with strong slash-command workflows.

**Type:** CLI  
**Best for:** Terminal users who want explicit file scoping and git-aware coding  
**Official docs:** https://aider.chat/docs/  
**Last verified:** 2026-07-12  
**Status:** Confirmed

## Quick Start

```bash
aider
```

## Installation

### macOS

```bash
python -m pip install pipx
pipx install aider-chat
```

### Windows

```powershell
python -m pip install pipx
pipx install aider-chat
```

### Linux

```bash
python -m pip install pipx
pipx install aider-chat
```

### WSL

```bash
python -m pip install pipx
pipx install aider-chat
```

## Authentication

Configure provider API keys via environment variables or supported config.

## Basic Commands

```bash
aider --version
aider
```

## Intermediate Commands

```text
/add
/model
/ask
/architect
```

## Advanced Commands

- custom model metadata
- architect and editor split workflows

## Project Configuration

- `.aider.conf.yml`

## Instruction Files

- shared repo instructions are recommended

## Models and Versions

- provider-dependent; aider supports model metadata overrides

## Permissions and Security

- keep API keys out of the repo

## MCP / Integrations

Indirect rather than a primary docs focus.

## Common Workflows

- git-aware terminal coding

## Team Best Practices

- prefer `pipx`, `uv`, or `aider-install`

## Troubleshooting

- package-manager installs can cause dependency issues

## When to Use

- git-centric terminal work

## When Not to Use

- when the team wants polished enterprise admin workflows

## Sources

- https://aider.chat/docs/install.html
- https://aider.chat/docs/usage/commands.html
- https://aider.chat/docs/config/aider_conf.html
