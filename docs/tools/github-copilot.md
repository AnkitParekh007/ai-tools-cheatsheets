# GitHub Copilot

> GitHub-native assistant spanning IDE, CLI, and review workflows.

**Type:** IDE assistant / CLI / PR tooling  
**Best for:** GitHub-heavy organizations  
**Official docs:** https://docs.github.com/en/copilot  
**Last verified:** 2026-07-12  
**Status:** Confirmed

## Quick Start

```bash
copilot --version
```

## Installation

### macOS

```bash
brew install --cask copilot-cli
```

### Windows

```powershell
winget install GitHub.Copilot
```

### Linux

```bash
npm install -g @github/copilot
```

### WSL

```bash
npm install -g @github/copilot
```

## Authentication

Follow the Copilot CLI login flow after install.

## Basic Commands

```bash
copilot --version
```

## Intermediate Commands

- use repo custom instructions and PR tooling

## Advanced Commands

- org-admin-controlled rollout and policy

## Project Configuration

- `copilot-instructions.md`

## Instruction Files

- `copilot-instructions.md`

## Models and Versions

- verify current model availability by plan

## Permissions and Security

- org policy can disable CLI access

## MCP / Integrations

Varies by product surface.

## Common Workflows

- editor assistance
- PR review

## Team Best Practices

- align instructions with `AGENTS.md`

## Troubleshooting

- Node.js 22 or later is required for the npm install path

## When to Use

- GitHub-first organizations

## When Not to Use

- when provider flexibility matters more than GitHub integration

## Sources

- https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
- https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli
- https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
