# Gemini CLI

> Terminal coding agent from Google with stable, preview, and nightly channels plus skills, sandboxing, and trust controls.

**Type:** CLI  
**Best for:** Google-account-backed terminal workflows, secondary-vendor coverage, and teams that want trust and sandbox controls  
**Official docs:** https://geminicli.com/docs/get-started/installation/  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official Gemini CLI installation, authentication, configuration, commands, sandbox, trusted-folders, MCP, and skills docs were reviewed. Commands were not executed locally in this repository.

## Overview

Gemini CLI is Google's terminal coding agent. The official docs emphasize installation choices, account-based authentication, trusted folders, sandboxing, hierarchical context files, MCP support, and an emerging skills ecosystem.

## Best Suited For

- teams that want a second major vendor option alongside Anthropic or OpenAI tools
- developers already using Google accounts or Gemini-related subscriptions
- terminal workflows that benefit from trust gates and sandbox controls
- teams interested in reusable skills

## Less Suited For

- organizations that want one single cross-vendor instruction-file standard
- teams that do not want to manage workspace trust and sandbox policy
- editor-first teams that expect the primary experience to live in the IDE

## Confirmed Capabilities

- interactive terminal usage
- multiple release channels including stable, preview, and nightly
- Google-based authentication flows
- persistent JSON settings plus environment-variable configuration
- trusted-folder security controls
- sandboxing support
- MCP server support
- skill discovery and installation

## Limitations

- the CLI is evolving quickly, so commands and settings need regular re-verification
- folder trust and sandbox policy add operational choices teams need to document
- this page is documentation-verified only; no login or local install was executed here
- the instruction-file story is broader and more flexible than tools centered on one repo file

## Supported Environments

- macOS
- Linux
- Windows
- WSL
- terminal CLI

The official install docs cover npm and other supported install paths plus release channels.

## Installation

### Node-based install

```bash
npm install -g @google/gemini-cli
```

### No-install execution

```bash
npx @google/gemini-cli
```

### Homebrew option

```bash
brew install gemini-cli
```

Use the official install guide for current system requirements and release-channel guidance.

## Authentication

The official authentication guide says most users should start Gemini CLI and log in with a personal Google account.

```bash
gemini
```

If your org uses a different account or quota path, verify it from the current authentication docs before rollout.

## First Working Example

```bash
gemini
```

Inside the repository, begin with a safe read-only prompt:

```text
Explain this repository and point out one low-risk docs improvement before changing anything.
```

Expected behavior:

- Gemini CLI inspects the repo
- prompts for trust or permissions when needed
- can operate under sandbox restrictions if configured

## Common Commands

### CLI entry points

```bash
gemini
gemini --version
gemini -p "your prompt here"
```

### Documented commands and utilities

```text
/settings
/permissions trust
/trust
gemini skills list --all
```

The official docs also describe sandbox-related flags and skill-installation commands. Use the current command reference for exact syntax on your installed version.

## Repository Instructions

Gemini CLI documents hierarchical context files rather than a single mandatory repository file. The configuration docs explicitly reference context files such as `GEMINI.md`.

For teams, that means:

- decide whether `GEMINI.md` is your shared repo convention
- document how it interacts with other tool-specific instruction files
- do not assume workspace files load unless the folder is trusted

## Configuration

The official configuration docs describe multiple layers:

- hardcoded defaults
- system defaults
- user settings
- project settings
- system settings
- environment variables

The docs also say Gemini CLI uses JSON settings files and automatically loads environment variables from `.env` files.

## Permission Model

Gemini CLI documents several related controls:

- user confirmation for mutating tools
- trusted folders
- sandboxing
- permissions commands

The tools reference explicitly says file-modifying and shell-executing tools require manual approval, while trusted folders control whether the CLI can load project-specific configuration and use full capabilities.

## MCP / Integration Support

Official docs confirm MCP support and provide a dedicated MCP setup guide. As with every other agent tool, each MCP server should be reviewed as an expansion of the tool and data boundary.

## Real Workflow Demonstration

### Scenario

Your team wants a Google-backed terminal agent as a secondary approved option.

### Repository context

A normal software repository where local trust, config, and sandbox policy matter.

### Prompt

```text
Review this repository, summarize the architecture, and recommend one small improvement before making any edits.
```

### Expected AI behavior

- inspects the repository
- may request trust or permissions depending on current settings
- can be constrained by sandbox policy
- can load repo-specific context files if the folder is trusted

### Human review checkpoint

- confirm whether the folder is trusted
- review any mutating action before approval
- inspect settings and sandbox configuration if behavior seems too broad

### Validation step

Run the repo build or tests after accepting a change.

## Team Adoption Guidance

- keep one documented release channel as the default
- decide whether trusted folders are mandatory for team repos
- standardize `GEMINI.md` usage if you adopt Gemini CLI broadly
- approve skills and MCP servers separately from base CLI approval

## Security Considerations

- trust settings control whether workspace-specific config is loaded
- sandboxing is valuable when repository command risk matters
- review third-party skills before installation
- keep Google or API credentials out of the repository

## Troubleshooting

- If the CLI does not behave as expected, inspect settings, environment variables, and trusted-folder state together.
- If sandboxed actions fail, review the sandbox docs and any custom sandbox image configuration.
- If workspace skills are missing, verify the folder is trusted and restart the session if needed.

## Alternatives

- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for more established terminal-agent adoption patterns
- [Cline](cline.md) or [Continue](continue.md) for more configurable open ecosystems

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for install, authentication, configuration, permissions, sandboxing, trust, skills, and MCP
- Not locally tested: npm install, Google sign-in flow, sandbox execution, and skills installation

## Sources

- https://geminicli.com/docs/get-started/installation/
- https://geminicli.com/docs/get-started/authentication/
- https://geminicli.com/docs/reference/configuration/
- https://geminicli.com/docs/reference/commands/
- https://geminicli.com/docs/reference/tools/
- https://geminicli.com/docs/cli/settings/
- https://geminicli.com/docs/cli/trusted-folders/
- https://geminicli.com/docs/cli/sandbox/
- https://geminicli.com/docs/tools/mcp-server/
- https://geminicli.com/docs/cli/skills/
- https://geminicli.com/docs/cli/using-agent-skills/
