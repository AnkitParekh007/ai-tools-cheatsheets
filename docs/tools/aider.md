# Aider

> Git-centric terminal pair-programming tool with explicit file scoping and strong in-chat command workflows.

**Type:** CLI  
**Best for:** Terminal users who want explicit control over file context, model selection, and git-aware edits  
**Official docs:** https://aider.chat/docs/  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official aider install, usage, command, config, options, and chat-mode docs were reviewed. Commands were not executed locally in this repository.

## Overview

Aider is a terminal coding assistant built around a local git repository. The official docs focus heavily on adding only the files you want to edit, switching models when needed, and using in-chat commands to control scope and editing behavior.

## Best Suited For

- git-centric terminal workflows
- developers who want explicit file-level context control
- teams that prefer bring-your-own-model flexibility
- iterative pair-programming where the human keeps tight control

## Less Suited For

- editor-first teams that expect a polished IDE-native agent experience
- organizations that want centralized admin controls before adoption
- teams that do not want to manage provider keys directly

## Confirmed Capabilities

- works in a local git repository
- edits files that you add to the chat
- supports in-chat commands such as `/add`, `/model`, `/ask`, and `/architect`
- supports multiple chat modes including code, ask, and architect/editor workflows
- can git commit its changes for easier review and rollback
- supports YAML-based configuration and command-line options

## Limitations

- context quality depends on how carefully you scope files into the session
- provider setup is your responsibility
- package-manager installs are explicitly discouraged in some cases because of dependency drift
- this is a terminal tool, not a full multi-surface platform

## Supported Environments

- macOS
- Linux
- Windows
- WSL
- terminal CLI

The official install docs cover Windows, macOS, Linux, WSL, Docker, Codespaces, and Replit variants.

## Installation

### Recommended quick install

```bash
python -m pip install aider-install
aider-install
```

### macOS and Linux one-liner

```bash
curl -LsSf https://aider.chat/install.sh | sh
```

### Windows PowerShell one-liner

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://aider.chat/install.ps1 | iex"
```

### Alternative install methods

The official docs also describe `uv`, `pipx`, `pip`, Docker, and hosted-dev-environment paths. The docs explicitly warn that system package managers often install aider with incorrect dependencies.

## Authentication

Aider uses provider API keys rather than a single built-in account system. The official install examples show passing provider-specific keys or configuring them through supported environment variables and config.

## First Working Example

```bash
aider
```

From the repository root, begin with a scoped file set or a read-only discussion:

```text
/ask Explain this repository and tell me which two files should be added first for a documentation improvement.
```

Expected behavior:

- aider stays focused on the files you add
- proposes changes in a git-aware workflow
- can switch between question-answering and editing modes explicitly

## Common Commands

### CLI entry points

```bash
aider
aider --version
aider --help
```

### In-chat commands confirmed by the docs

```text
/add
/model
/ask
/architect
/code
/clear
```

The command docs also describe chat-mode switching and additional workflow commands. Use `/help` in your installed version for the full current list.

## Repository Instructions

Aider does not center its docs on a single instruction-file standard the way some newer agents do. For teams, that means you should define your own repository convention rather than assuming aider will discover and honor one shared file format automatically.

Practical team options:

- keep coding standards in repo documentation
- provide scripted prompts or task templates
- standardize `.aider.conf.yml` for shared defaults when appropriate

## Configuration

The official config docs confirm that most options can be set in `.aider.conf.yml`.

The file can be loaded from:

- your home directory
- the root of your git repo
- the current directory

The docs also confirm a `--config <filename>` option for loading a single explicit config file.

## Permission Model

Aider is less centered on a named approval matrix than tools like Codex or Claude Code. The main practical control surface is file scoping plus whatever shell, git, and provider access you give it.

Security posture still depends on:

- which files you add to the chat
- which model/provider you select
- how API keys are stored
- whether you accept aider-generated edits and commits without review

## MCP / Integration Support

MCP is not a primary official-docs focus for aider. Teams should treat aider primarily as a model-flexible terminal coding tool rather than an MCP-first integration hub.

## Real Workflow Demonstration

### Scenario

You want a lightweight terminal assistant for a repo that already has clean git hygiene.

### Repository context

A normal git repository where you want to improve one document or one module at a time.

### Prompt

```text
/ask Identify the smallest documentation improvement in this repo, then tell me exactly which files to add before editing anything.
```

### Expected AI behavior

- inspects the repo in a git-aware workflow
- recommends a narrow file set
- keeps work scoped to the files you add
- proposes diffs that are easy to review

### Human review checkpoint

- verify that only relevant files are in scope
- inspect the diff before accepting it
- confirm the model/provider choice is appropriate for the task

### Validation step

Run your tests or docs build after accepting the changes.

## Team Adoption Guidance

- standardize one installation path such as `aider-install`, `uv`, or `pipx`
- define shared guidance on how many files should be added to a task by default
- require humans to review aider commits before merge
- treat provider key management as part of rollout, not an afterthought

## Security Considerations

- keep provider keys out of the repository
- do not add unnecessary files to chat context
- remember that broader context usually means more token use and noisier reasoning
- review aider-generated commits the same way you would review a teammate's patch

## Troubleshooting

- If `aider` is not found, the official docs suggest trying `python -m aider`.
- If installation is unstable, prefer the recommended installer paths over OS package managers.
- If the model gets stuck, the official tips recommend `/clear`, dropping extra files, using `/ask`, or switching models.

## Alternatives

- [Claude Code](claude-code.md) or [OpenAI Codex](openai-codex.md) for broader permission, MCP, and multi-surface workflows
- [Continue](continue.md) or [Cline](cline.md) for more structured CLI-plus-editor ecosystems

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for installation, usage, commands, config, options, and chat modes
- Not locally tested: installer execution, provider authentication, and real repository edits

## Sources

- https://aider.chat/docs/
- https://aider.chat/docs/install.html
- https://aider.chat/docs/usage.html
- https://aider.chat/docs/usage/commands.html
- https://aider.chat/docs/usage/modes.html
- https://aider.chat/docs/usage/tips.html
- https://aider.chat/docs/config.html
- https://aider.chat/docs/config/aider_conf.html
- https://aider.chat/docs/config/options.html
