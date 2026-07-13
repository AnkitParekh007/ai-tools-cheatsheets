# Continue

> Open-source coding agent across IDE extensions and the `cn` terminal CLI with shared model, rules, and tools configuration.

**Type:** CLI / IDE extension / JetBrains plugin  
**Best for:** Open workflows with shared YAML config, configurable rules, and strong CLI permissions control  
**Official docs:** https://docs.continue.dev/cli/quickstart  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Continue CLI quickstart, CLI guide, configuration, and tool-permissions docs were reviewed. Commands were not executed locally in this repository.

## Overview

Continue CLI (`cn`) is documented as a terminal-based coding agent that can edit files, run commands, and work through multi-step tasks. The docs also describe it as using the same agent core as the Continue IDE extensions, with configuration built around models, rules, and tools.

## Best Suited For

- teams that want an open toolchain with shared config as code
- mixed IDE and terminal workflows
- developers who want explicit control over models, rules, and tool permissions
- organizations that want headless or automated agent workflows but still need policy controls

## Less Suited For

- teams that want a fully managed vendor experience
- groups that do not want to maintain YAML configuration
- organizations that have not defined approval policy for command execution

## Confirmed Capabilities

- terminal CLI and IDE-extension workflows
- editing files and running commands
- shared config based on models, rules, and tools
- configurable tool permissions with flags and persistent policy
- read-only and auto modes
- MCP integration through configuration

## Limitations

- rollout quality depends on config hygiene
- model and tool behavior will vary based on what you wire in
- permissions are powerful but can become inconsistent if users mix flags and personal config casually
- this page is documentation-verified only; no live install or login was performed here

## Supported Environments

- macOS
- Linux
- Windows
- terminal CLI
- IDE extensions
- headless usage according to the docs

The quickstart documents install tabs for macOS/Linux and Windows using different installation paths.

## Installation

### macOS and Linux installer path

```bash
curl -fsSL https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.sh | bash
```

### Windows npm path

```powershell
npm install -g @continuedev/cli
```

### First run

```bash
cn
```

## Authentication

The CLI docs document a login command:

```bash
cn login
```

Use the normal interactive login flow before trying automation or headless setups.

## First Working Example

```bash
cn -p "explain this repository and suggest one low-risk improvement"
```

For a normal interactive session:

```bash
cn
```

Expected behavior:

- Continue inspects the repository
- can edit files and run commands when the tool policy allows it
- uses the same configuration model as the IDE extensions

## Common Commands

### CLI entry points

```bash
cn
cn --version
cn -p "explain this repository"
```

### Useful modes and flags documented by Continue

```bash
cn --readonly
cn --auto
cn --rule ./rules/style.md
cn --mcp my-server
cn --model my-model
```

The docs also describe `/config` and additional TUI/headless usage patterns.

## Repository Instructions

Continue is centered on shared configuration rather than one single instruction-file convention. The docs describe configuration in terms of:

- models
- rules
- tools

For team use, this makes rules the main shared instruction surface. Keep them short, reviewable, and task-specific.

## Configuration

The official CLI configuration docs say:

- `cn` looks for `~/.continue/config.yaml`
- the file uses the same format as the IDE extensions

This is one of the strongest reasons to use Continue in a team: you can treat model, rules, and tool defaults as code.

## Permission Model

Continue has one of the clearest documented CLI permission systems in this repo.

The docs explicitly describe:

- `--allow`
- `--ask`
- `--exclude`
- `permissions.yaml`
- mode overrides such as `--auto` and `--readonly`

The precedence docs also say that plan and auto-style mode policies can override lower-priority permission settings. That means your team should define a default, not let each engineer improvise.

## MCP / Integration Support

Official docs confirm MCP support and show how MCP can be configured through the Continue configuration system. This is useful for external context and automation, but it should still follow an approved-server policy.

## Real Workflow Demonstration

### Scenario

You want an open-source CLI agent that can be standardized through config-as-code.

### Repository context

A shared engineering repository with a documented set of approved models and tools.

### Prompt

```text
Explain the architecture of this repository, identify one low-risk docs or test improvement, and wait for confirmation before making any edits.
```

### Expected AI behavior

- inspects the repository
- follows the configured model, rules, and tool defaults
- pauses or proceeds according to the permission model in effect
- can be switched into read-only or more automated modes deliberately

### Human review checkpoint

- confirm which model is active
- inspect whether the right rules loaded
- verify the current permission mode before accepting file writes or shell execution

### Validation step

Run the repository build or test command after the change.

## Team Adoption Guidance

- store shared rules in version control
- document which flags are allowed locally versus in CI
- standardize a baseline `config.yaml` pattern before broad rollout
- keep MCP opt-in until the team trusts the default agent loop

## Security Considerations

- permissions should be treated as policy, not convenience
- headless and auto modes deserve separate governance from interactive use
- YAML config drift can create inconsistent behavior across the team
- do not mix unreviewed MCP servers into the default config

## Troubleshooting

- If behavior differs between IDE and CLI, inspect the shared config first.
- If the agent runs too broadly, switch back to `--readonly` and narrow the tool policy.
- If permissions seem inconsistent, review flags, `permissions.yaml`, and mode overrides together.

## Alternatives

- [Cline](cline.md) for a similarly open but more approval-centric ecosystem
- [Cursor](cursor.md) for a more integrated IDE-first product
- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for more opinionated terminal agents

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for CLI usage, installation, configuration, and permissions
- Not locally tested: installer execution, login flow, headless automation, and IDE-extension behavior

## Sources

- https://docs.continue.dev/cli/quickstart
- https://docs.continue.dev/guides/cli
- https://docs.continue.dev/cli/configuration
- https://docs.continue.dev/guides/configuring-models-rules-tools
- https://docs.continue.dev/cli/tool-permissions
- https://docs.continue.dev/customize/deep-dives/mcp
