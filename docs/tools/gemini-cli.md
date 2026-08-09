# Gemini CLI

> Google-backed terminal coding agent with sandboxing, approval modes, hierarchical `GEMINI.md` context, MCP, skills, and workspace trust controls.

**Type:** CLI  
**Best for:** Google-backed terminal workflows, vendor diversification, sandboxed execution, and teams that want reusable context and skills  
**Official docs:** https://geminicli.com/docs/  
**Last verified:** 2026-08-09  
**Status:** Documentation verified  
**Verification scope:** Official Gemini CLI installation, CLI cheatsheet, `GEMINI.md`, configuration, sandboxing, trusted folders, skills, and MCP documentation were reviewed. Commands were not executed locally in this repository.

## 60-Second Cheat Sheet

| Need | Command or file | Notes |
| --- | --- | --- |
| Install with npm | `npm install -g @google/gemini-cli` | Stable release by default |
| Run without installing | `npx @google/gemini-cli` | Useful for quick evaluation |
| Install with Homebrew | `brew install gemini-cli` | macOS/Linux |
| Start interactive CLI | `gemini` | Main terminal entrypoint |
| Run one prompt | `gemini -p "summarize README.md"` | Non-interactive output |
| Prompt and stay interactive | `gemini -i "explain this project"` | Runs prompt, then continues session |
| Resume latest session | `gemini -r "latest"` | Continue previous work |
| Start sandboxed | `gemini -s` | Isolates shell/file operations |
| Start in plan mode | `gemini --approval-mode=plan` | Analyze before acting |
| Inspect context | `/memory show` | Shows concatenated active context |
| Reload context | `/memory reload` | Reloads `GEMINI.md` files |
| List skills | `/skills list` | Shows discovered Agent Skills |
| Shared repo context | `GEMINI.md` | Hierarchical project instructions |
| Workspace skills | `.gemini/skills/` or `.agents/skills/` | Shareable specialized workflows |
| User settings | `~/.gemini/settings.json` | User configuration |
| Project settings | `.gemini/settings.json` | Repository-specific configuration |

> **Safe default:** use plan mode for broad changes and `-s` when command/file isolation matters. Workspace trust is a separate optional security control and is disabled by default unless you enable it in settings.

## Five Prompts Worth Bookmarking

### Understand a repository

```text
Explain this repository's architecture, entry points, build/test commands, and highest-risk areas. Do not modify files.
```

### Plan a change

```text
Read the relevant files and active GEMINI.md context, then propose a step-by-step implementation plan with tests, risks, and validation. Do not edit until approved.
```

### Review code

```text
Review the current changes for correctness, regressions, security issues, and missing tests. List actionable findings by severity and cite the relevant files.
```

### Debug safely

```text
Reproduce the failing command or test, identify the first root-cause failure, explain it, and propose the smallest fix before changing files.
```

### Create reusable project context

```text
Review this repository and draft a concise GEMINI.md containing architecture, build/test commands, coding conventions, risky paths, and completion criteria. Include only facts confirmed from the repo.
```

## What Gemini CLI Is Best At

- terminal-first workflows backed by Google/Gemini accounts and models
- teams that want a secondary major-vendor coding agent
- sandboxed local execution
- explicit approval modes including plan-first workflows
- hierarchical project context with `GEMINI.md`
- reusable Agent Skills with progressive activation
- MCP integrations and extension-based customization

## Installation

### npm

```bash
npm install -g @google/gemini-cli
```

### No-install evaluation

```bash
npx @google/gemini-cli
```

### Homebrew

```bash
brew install gemini-cli
```

The current installation docs also list MacPorts, Anaconda, containerized execution, and source-based paths.

Gemini CLI publishes stable, preview, and nightly channels. Use stable for team defaults unless you have a deliberate testing reason to choose another channel.

## First Session

```bash
cd /path/to/your/repository
gemini
```

A good first request is:

```text
Explain this project, identify the build and test commands, and recommend one low-risk improvement. Do not modify files.
```

For higher-risk or unfamiliar work, start with:

```bash
gemini --approval-mode=plan
```

or use sandboxing:

```bash
gemini -s
```

## Daily CLI Commands

```bash
gemini
gemini -p "summarize README.md"
gemini -i "explain this project"
gemini -r "latest"
gemini -s
gemini --approval-mode=plan
gemini update
```

Useful in-session commands include:

```text
/memory show
/memory reload
/skills list
/settings
/trust
```

Use the current CLI cheatsheet and `/help` for the exact command surface on your installed version.

## Approval Modes

Current Gemini CLI docs list these approval modes:

- `default` — standard confirmation behavior
- `auto_edit` — automatically approves edit operations while retaining broader controls
- `yolo` — automatically approves actions; broad and high risk
- `plan` — plans and analyzes before implementation

Use `plan` for unfamiliar or cross-cutting work. Avoid `yolo` as a normal team default.

## Sandboxing

Start sandboxed execution with:

```bash
gemini -s
```

Sandboxing is designed to isolate shell commands and file modifications from the host system and can help limit file access to the project boundary.

Use sandboxing together with approval policy rather than treating one as a replacement for the other.

## Repository Instructions with GEMINI.md

Gemini CLI uses hierarchical context files whose default name is:

```text
GEMINI.md
```

Current official context discovery includes:

1. global context at `~/.gemini/GEMINI.md`
2. project/workspace context from configured workspace directories and parents
3. just-in-time context discovered near files the agent accesses

Inspect the exact active context with:

```text
/memory show
```

After changing context files during a session, reload them with:

```text
/memory reload
```

You can configure alternate context filenames in `settings.json`, including cross-agent names such as `AGENTS.md`.

## Trusted Folders

Trusted Folders is an optional security feature that controls whether project-specific configuration is loaded with full capabilities.

Important correction for team rollout: folder trust is **disabled by default**. Enable it deliberately in user settings if you want trust prompts and trust-root behavior to be part of your security model.

Do not use `--skip-trust` as a routine shortcut if your team relies on folder trust as a boundary.

## Agent Skills

Gemini CLI supports Agent Skills as on-demand specialized workflows.

Discovery tiers include:

- built-in skills
- extension skills
- user skills at `~/.gemini/skills/` or `~/.agents/skills/`
- workspace skills at `.gemini/skills/` or `.agents/skills/`

Useful commands:

```text
/skills list
/skills reload
```

and from the terminal:

```bash
gemini skills list --all
```

Workspace skills can be committed with the repository, but review bundled scripts and assets before approving them.

## MCP and External Tools

Gemini CLI supports MCP servers and can restrict the allowed server set through CLI/configuration options.

Treat each server as a separate approval for:

- authentication
- data exposure
- tool permissions
- write/destructive capability
- network access

## Team Adoption Checklist

- [ ] standardize stable versus preview/nightly release channels
- [ ] define whether `GEMINI.md` is the canonical project context file
- [ ] decide whether folder trust will be enabled across the team
- [ ] use plan mode for broad or unfamiliar work
- [ ] use sandboxing for higher-risk local execution
- [ ] approve skills and MCP servers separately from base CLI access
- [ ] keep `yolo` mode out of normal developer defaults

## Security Notes

- approval mode and sandboxing are separate controls
- trusted folders do nothing unless the feature is enabled
- workspace `GEMINI.md` files shape behavior but do not enforce policy
- Agent Skills can include scripts and bundled assets; review before sharing
- MCP servers expand the tool and data boundary
- keep Google/API credentials outside repository files

## Alternatives

- [Claude Code](claude-code.md) for terminal-first work with mature project-memory, permission, and MCP patterns
- [OpenAI Codex](openai-codex.md) for OpenAI-centered terminal, review, and automation workflows
- [GitHub Copilot](github-copilot.md) for GitHub-native editor, CLI, review, and repository workflows
- [Cursor](cursor.md) for a strongly editor-first environment with a terminal agent

See the [Comparison Matrix](../getting-started/comparison-matrix.md) for a side-by-side shortlist.

## Verification Status

- Status: Documentation verified
- Last verified: 2026-08-09
- Scope: installation, release channels, CLI commands, approval modes, sandboxing, `GEMINI.md`, folder trust, skills, and MCP reviewed against current official Gemini CLI docs
- Not locally tested: npm/Homebrew installation, Google sign-in, sandbox execution, skills installation, and enterprise account behavior

## Sources

- https://geminicli.com/docs/
- https://geminicli.com/docs/get-started/installation/
- https://geminicli.com/docs/cli/cli-reference/
- https://geminicli.com/docs/cli/gemini-md/
- https://geminicli.com/docs/reference/configuration/
- https://geminicli.com/docs/cli/sandbox/
- https://geminicli.com/docs/cli/trusted-folders/
- https://geminicli.com/docs/cli/skills/
- https://geminicli.com/docs/tools/mcp-server/
