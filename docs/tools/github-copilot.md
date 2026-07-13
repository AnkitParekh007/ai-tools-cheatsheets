# GitHub Copilot

> GitHub-native assistant spanning IDE, CLI, code review, and cloud-agent workflows.

**Type:** IDE assistant / CLI / PR tooling / cloud agent  
**Best for:** GitHub-heavy organizations that want one platform across editor, repo, review, and task flows  
**Official docs:** https://docs.github.com/en/copilot  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official GitHub Docs for Copilot CLI, installation, getting started, configuration, tool approvals, custom instructions, and supported customization types were reviewed. Commands were not executed locally in this repository.

## Overview

GitHub Copilot now spans more than inline completion. The official docs document IDE chat, repository custom instructions, Copilot CLI, tool approvals, code review customization, and cloud-agent workflows on GitHub.com.

## Best Suited For

- GitHub-first organizations
- teams already using VS Code, JetBrains, or GitHub.com review flows
- organizations that want a single GitHub-centered path for editor, CLI, and review usage
- teams that want repository custom instructions under `.github/`

## Less Suited For

- teams that prioritize provider flexibility over GitHub integration
- organizations that do not want GitHub to be the control plane for AI usage
- environments where organization policy has not yet approved Copilot CLI access

## Confirmed Capabilities

- IDE and chat usage across supported environments
- Copilot CLI interactive and programmatic usage
- repository-wide custom instructions via `.github/copilot-instructions.md`
- path-specific custom instructions via `.github/instructions/**/*.instructions.md`
- tool approval flags for CLI sessions
- GitHub-integrated workflows such as code review and repository-centric tasks

## Limitations

- some features depend on plan, editor, or organization policy
- if Copilot is provisioned through an organization, CLI usage can be blocked by org policy
- customization support differs by product surface
- tool approval shortcuts are powerful and should not be used casually

## Supported Environments

GitHub docs explicitly describe Copilot CLI support for:

- Linux
- macOS
- Windows from PowerShell
- WSL

The broader Copilot platform also documents supported IDE and editor integrations.

## Installation

### Cross-platform npm install

```bash
npm install -g @github/copilot
```

Prerequisite from the GitHub docs: Node.js 22 or later.

### Windows (WinGet)

```powershell
winget install GitHub.Copilot
```

### macOS and Linux (Homebrew)

```bash
brew install --cask copilot-cli
```

The installation docs also describe an install script path for macOS and Linux.

## Authentication

The GitHub CLI quickstart instructs you to:

1. move into the project directory
2. run `copilot`
3. use `/login`
4. complete GitHub authentication
5. confirm that you trust the files in the current directory for AI use

That final trust prompt is a meaningful review checkpoint and should not be skipped casually.

## First Working Example

```bash
copilot
```

Then start with a read-only task such as:

```text
Summarize this repository, identify the build command, and review the current changes without editing files.
```

Expected behavior:

- Copilot analyzes the repository context
- keeps the first turn low risk
- asks for approval if the session would require tools outside the current policy

## Common Commands

### CLI entry points

```bash
copilot
copilot --version
copilot -p "Suggest improvements to the test setup"
```

### Approval-related examples

GitHub docs explicitly describe command-line options such as:

- `--allow-all-tools`
- `--excluded-tools=...`

Use these only when you understand exactly which tools are being widened and why.

## Repository Instructions

GitHub's official customization docs confirm repository-wide instructions at:

```text
.github/copilot-instructions.md
```

The docs also confirm support for:

- path-specific instructions under `.github/instructions/**/*.instructions.md`
- `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` for some cloud-agent scenarios

That means teams should define which instruction systems they support, instead of allowing all of them to appear organically.

## Configuration

GitHub docs provide dedicated setup and configuration sections for Copilot CLI, including:

- installation method
- authentication
- trusted directories
- tool approval behavior
- LSP server integration

Use those docs as the source of truth rather than older `gh copilot` extension articles; GitHub explicitly documents that the old GitHub CLI Copilot extension is retired and replaced by Copilot CLI.

## Permission Model

Copilot CLI can operate in interactive and programmatic modes. Official docs also describe command-line options that allow tools to be used without manual approval.

Important implications:

- org policy can control whether users can use Copilot CLI at all
- trusted-directory prompts matter because repository content becomes AI context
- `--allow-all-tools` is a broad permission decision, not a convenience flag
- excluded-tool patterns can be safer when you want to deny web or shell behavior explicitly

## MCP / Integration Support

MCP support is not a single universal Copilot capability. The right phrasing for this page is that integration and instruction support vary by Copilot surface. Treat MCP or external-tool expectations as product-surface-specific until the relevant GitHub docs confirm them directly.

## Real Workflow Demonstration

### Scenario

A GitHub-heavy team wants a first AI workflow for repository review without approving broad automation.

### Repository context

A code repository already hosted on GitHub with existing review conventions.

### Request

```text
Review the current repository and suggest the top three code-review risks before proposing any edits.
```

### Expected AI behavior

- explains repository-level risks
- stays within the current trusted directory
- avoids silent file changes unless the session policy allows them
- provides a review-oriented output rather than a speculative rewrite

### Human review checkpoint

- compare the suggestions with the actual diff
- verify whether any repository custom instructions influenced the output
- confirm that no broad tool-approval flags were used unnecessarily

### Validation step

Run tests, lint, or the relevant CI checks after any accepted change.

## Team Adoption Guidance

- define a standard for `.github/copilot-instructions.md`
- decide whether path-specific instructions are allowed
- enable Copilot CLI only after reviewing organization policy implications
- document whether `AGENTS.md` or other agent-instruction files are part of your GitHub workflow

## Security Considerations

- repository trust prompts matter because they determine when local files are treated as AI context
- org policy can and should be used to gate CLI usage
- broad tool-approval flags can remove meaningful review checkpoints
- repository-wide instructions are powerful; keep them short, specific, and reviewable

## Troubleshooting

- If install guidance conflicts, use the current GitHub Docs install page only.
- If the CLI is unavailable, check whether organization policy is blocking it.
- If responses feel inconsistent, inspect repository-wide and path-specific instruction files together.
- If you find references to the old GitHub CLI Copilot extension, replace them with the current Copilot CLI docs.

## Alternatives

- [Cursor](cursor.md) for IDE-first teams that want more toolchain flexibility
- [OpenAI Codex](openai-codex.md) or [Claude Code](claude-code.md) for stronger terminal-first defaults
- [Continue](continue.md) or [Cline](cline.md) for more provider-flexible setups

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official docs reviewed for CLI install, auth, approvals, custom instructions, and supported surfaces
- Not locally tested: CLI installation, login, org policy toggles, and editor-specific behavior

## Sources

- https://docs.github.com/en/copilot
- https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
- https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
- https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools
- https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview
- https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- https://docs.github.com/en/copilot/reference/custom-instructions-support
- https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices
- https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli
