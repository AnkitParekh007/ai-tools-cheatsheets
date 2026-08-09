# GitHub Copilot

> GitHub-native AI coding platform spanning IDE, CLI, repository instructions, MCP, plugins, skills, code review, and cloud-agent workflows.

**Type:** IDE assistant / CLI / PR tooling / cloud agent  
**Best for:** GitHub-heavy teams that want one platform across editor, terminal, repository, review, and agent workflows  
**Official docs:** https://docs.github.com/en/copilot  
**Last verified:** 2026-08-09  
**Status:** Documentation verified  
**Verification scope:** Official GitHub Docs for Copilot CLI installation, command reference, plan mode, tool approvals, MCP, plugins, skills, custom instructions, and repository initialization were reviewed. Commands were not executed locally in this repository.

## 60-Second Cheat Sheet

| Need | Command or file | Notes |
| --- | --- | --- |
| Install with npm | `npm install -g @github/copilot` | Requires Node.js 22+ |
| Install on Windows | `winget install GitHub.Copilot` | Official WinGet path |
| Install with Homebrew | `brew install --cask copilot-cli` | macOS/Linux |
| Start Copilot CLI | `copilot` | Interactive terminal agent |
| Authenticate | `copilot login` or `/login` | GitHub OAuth/device flow |
| Initialize repo guidance | `copilot init` or `/init` | Generates/improves `.github/copilot-instructions.md` |
| Plan before coding | `/plan <prompt>` | Structured implementation planning |
| Resume latest session | `copilot --continue` | Reopens the most recent local session |
| Run one prompt | `copilot -p "review these changes"` | Programmatic/non-interactive mode |
| Inspect permissions | `/permissions` | View/reset session approvals |
| Select model | `/model` | Choose model or Auto |
| Manage MCP | `copilot mcp` | First-class MCP configuration |
| Manage plugins/skills | `/plugins` | Plugin, MCP, and skill dashboard |
| Repo-wide instructions | `.github/copilot-instructions.md` | Standard GitHub repository guidance |
| Path-specific instructions | `.github/instructions/**/*.instructions.md` | Scoped guidance |
| Cross-agent instructions | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | CLI can merge these too |

> **Safe default:** use plan mode for broad work, approve mutation tools narrowly, and prefer `--allow-tool` / `--deny-tool` over `--allow-all-tools` when automation needs extra permissions.

## Five Prompts Worth Bookmarking

### Understand a repository

```text
Give me an overview of this repository: architecture, entry points, build/test commands, important GitHub workflows, and one safe first improvement. Do not edit files.
```

### Plan a feature

```text
Analyze the relevant code and tests, then create an implementation plan with files to change, validation commands, risks, and rollback points. Do not write code until the plan is approved.
```

### Review a pull request

```text
Review the current diff for correctness, regressions, security issues, and missing tests. List actionable findings by severity and cite the affected files.
```

### Prepare repository instructions

```text
Review this repository and propose concise Copilot instructions covering architecture, build/test/lint commands, coding conventions, risky directories, and validation expectations. Keep repository-specific facts only.
```

### Debug CI

```text
Inspect the failing workflow/check logs, identify the first root-cause failure rather than downstream noise, propose the smallest fix, and list the exact validation needed before changing anything.
```

## What GitHub Copilot Is Best At

- organizations already centered on GitHub repositories and pull requests
- one workflow spanning editor, CLI, code review, and GitHub.com agent surfaces
- repository initialization through generated custom instructions
- plan-first terminal workflows
- MCP, plugins, skills, custom agents, hooks, and GitHub integrations
- teams that want organization policy to gate AI capabilities centrally

## Installation

### npm

```bash
npm install -g @github/copilot
```

GitHub currently documents Node.js 22 or later as the prerequisite for npm installation.

### Windows

```powershell
winget install GitHub.Copilot
```

### macOS and Linux

```bash
brew install --cask copilot-cli
```

GitHub also documents additional install paths. Use the current GitHub Docs installation page as the source of truth for platform-specific updates.

## First Session

```bash
cd /path/to/your/repository
copilot
```

Then authenticate if needed:

```text
/login
```

Copilot asks you to confirm that you trust the current directory for AI use. During a session it may read, modify, and execute files in and below that directory, subject to approvals and configuration.

Start safely:

```text
Give me an overview of this project and its build/test commands. Do not modify files.
```

## Daily CLI Commands

```bash
copilot
copilot -p "summarize the current diff"
copilot --continue
copilot init
copilot mcp
copilot help permissions
```

Useful in-session commands include:

```text
/plan
/model
/permissions
/init
/instructions
/plugins
/ide
/help
```

GitHub's current CLI also includes parallel subagent execution with `/fleet`, plugins, skills, custom agents, hooks, and remote/session capabilities. Use the CLI reference for the exact version installed in your environment.

## Plan Mode

Copilot CLI has a dedicated plan mode for analyzing a task and building a structured implementation plan before writing code.

Use:

```text
/plan Implement the new authentication flow with tests and migration notes
```

This is a useful default for:

- cross-cutting changes
- unfamiliar repositories
- migrations
- production-impacting changes
- work that needs agreement on scope before implementation

## Repository Instructions

The CLI can initialize repository instructions with:

```bash
copilot init
```

or inside a session:

```text
/init
```

The standard repository-wide file is:

```text
.github/copilot-instructions.md
```

Path-specific instructions can live under:

```text
.github/instructions/**/*.instructions.md
```

Current Copilot CLI also loads and merges several instruction formats, including `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` in supported locations.

For teams, decide which formats are canonical so the same rule is not duplicated across files.

## Permission Model

Copilot asks before using tools that can modify or execute files unless permissions have already been granted for the session or configured through CLI flags/settings.

Important automation flags include:

- `--allow-tool` — pre-approve a specific tool or command pattern
- `--deny-tool` — block a tool; deny takes precedence
- `--allow-all-tools` — broadly removes per-tool approval prompts

Prefer narrow patterns such as a specific `git` or test command over broad shell access.

Do not use `--allow-all-tools` as a normal developer default: GitHub explicitly warns that this can give Copilot the same local file and shell access as the user account running it.

## MCP, Plugins, and Skills

Copilot CLI now has first-class support for:

- MCP servers
- plugins and plugin marketplaces
- agent skills
- custom agents
- hooks

Persistent MCP configuration can be managed through the CLI, while `/plugins` provides a dashboard for plugins, MCP servers, and skills.

Treat every extension mechanism as a separate trust decision. A base Copilot approval does not automatically mean every MCP server, skill, plugin, or hook should be approved.

## Team Adoption Checklist

- [ ] enable Copilot CLI through organization policy only after review
- [ ] standardize `.github/copilot-instructions.md`
- [ ] decide whether `AGENTS.md`/`CLAUDE.md`/`GEMINI.md` are also supported
- [ ] default complex work to plan mode
- [ ] define allowed/denied tools for automated usage
- [ ] review MCP servers, plugins, skills, and hooks separately
- [ ] keep CI and PR validation as the final enforcement layer

## Security Notes

- trusting a directory makes its content available to the CLI workflow
- session approvals can widen command access significantly
- `--allow-all-tools` removes important checkpoints
- multiple instruction files are merged, so conflicting guidance can be difficult to notice
- MCP/plugins/skills/hooks expand the execution and data boundary
- organization policy should gate features that are not ready for broad use

## Alternatives

- [Cursor](cursor.md) for a more editor-first multi-model environment
- [OpenAI Codex](openai-codex.md) for OpenAI-centered terminal, local review, and automation workflows
- [Claude Code](claude-code.md) for terminal-first work with strong permission and project-memory patterns
- [Gemini CLI](gemini-cli.md) for a Google-backed terminal workflow with sandbox and context controls

See the [Comparison Matrix](../getting-started/comparison-matrix.md) for a side-by-side shortlist.

## Verification Status

- Status: Documentation verified
- Last verified: 2026-08-09
- Scope: CLI install, authentication, plan mode, custom instructions, approvals, MCP, plugins, skills, and command reference reviewed against current GitHub Docs
- Not locally tested: CLI installation, login, organization policy changes, editor behavior, plugin installation, and cloud-agent workflows

## Sources

- https://docs.github.com/en/copilot
- https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started
- https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
- https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
