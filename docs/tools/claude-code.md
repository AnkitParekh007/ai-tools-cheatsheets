# Claude Code

> Terminal-first coding agent with strong repo reasoning, permissions, and MCP workflows.

**Type:** CLI / IDE / web / desktop  
**Best for:** Deep repo tasks, refactors, review, automation  
**Official docs:** https://code.claude.com/docs/en/quickstart  
**Last verified:** 2026-07-12  
**Status:** Confirmed

## Quick Start

```bash
claude
```

## Installation

### macOS

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Linux

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### WSL

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

## Authentication

Run `claude` and complete login. Use `/login` to re-authenticate.

## Basic Commands

```bash
claude
claude --version
claude -p "explain this repository"
```

## Intermediate Commands

```text
/help
/clear
/login
/resume
```

## Advanced Commands

- permission modes
- MCP-backed documentation lookups
- scripted workflows

## Project Configuration

- repo-level `CLAUDE.md`
- shared `AGENTS.md`

## Instruction Files

- `CLAUDE.md`
- `AGENTS.md`

## Models and Versions

- verify current model choices in the tool

## Permissions and Security

- review shell and filesystem permissions
- do not paste secrets into prompts

## MCP / Integrations

Official docs confirm MCP support.

## Common Workflows

- repo mapping
- strict review
- small safe fixes

## Team Best Practices

- plan first on risky tasks

## Troubleshooting

- shell mismatch on Windows is common

## When to Use

- terminal-first deep code tasks

## When Not to Use

- when the team has not defined safety and review rules

## Sources

- https://code.claude.com/docs/en/quickstart
- https://code.claude.com/docs/en
