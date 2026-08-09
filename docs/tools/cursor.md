# Cursor

> AI-first editor plus terminal agent with rules, MCP, permissions, headless automation, and multi-model workflows.

**Type:** IDE / CLI / agent  
**Best for:** Daily editor-first coding with a capable terminal and automation path  
**Official docs:** https://cursor.com/docs  
**Last verified:** 2026-08-09  
**Status:** Documentation verified  
**Verification scope:** Official Cursor CLI installation, usage, headless mode, parameters, permissions, rules/MCP guidance, and the January 2026 CLI changelog were reviewed. No local Cursor install or login flow was executed in this repository.

## 60-Second Cheat Sheet

| Need | Command or file | Notes |
| --- | --- | --- |
| Install Cursor CLI | `curl https://cursor.com/install -fsS \| bash` | Official CLI installer |
| Start the terminal agent | `agent` | Current primary entrypoint |
| Backward-compatible entrypoint | `cursor-agent` | Still supported as an alias |
| Ask without coding | `agent "explain this repo; do not write code"` | Good low-risk first task |
| Run non-interactively | `agent -p "review these changes"` | Print/headless mode |
| Apply writes in scripts | `agent -p --force "update the docs"` | High-impact; review permissions first |
| List models | `agent models` | Current CLI model discovery |
| Resume latest chat | `agent resume` | Continue prior context |
| List chats | `agent ls` | Find previous sessions |
| Manage MCP | `agent mcp` or `/mcp` | CLI and in-session management |
| Manage rules | `/rules` | Create or edit rules from the CLI |
| Project rules | `.cursor/rules/` | Same rules system as the IDE |
| Agent instructions | `AGENTS.md` / `CLAUDE.md` | CLI reads these at project root |
| User CLI permissions | `~/.cursor/cli-config.json` | Global CLI configuration |
| Project CLI permissions | `.cursor/cli.json` | Repository-specific CLI configuration |

> **Safe default:** use interactive mode for implementation, explicitly say “do not write code” while planning, and treat `--force` as an automation permission decision rather than a convenience flag.

## Five Prompts Worth Bookmarking

### Understand a feature in the editor

```text
Trace this feature from UI entry point to data/API layer. Name the key files, explain the data flow, and identify the safest place to change behavior. Do not edit yet.
```

### Plan before editing

```text
Read the relevant files and rules, then propose a focused implementation plan with files, tests, risks, and validation commands. Do not write code until I approve the plan.
```

### Review a change

```text
Review the current changes for correctness, regressions, security issues, and missing tests. Prioritize concrete findings and cite the exact files involved.
```

### Fix a bug

```text
Reproduce the bug from the existing code and tests, identify the root cause, implement the smallest fix, and run the narrowest relevant validation before broader checks.
```

### Refactor with constraints

```text
Refactor this module without changing public behavior. Follow the repository rules, preserve APIs, keep the diff focused, and show test/build results before suggesting extra cleanup.
```

## What Cursor Is Best At

- editor-first coding where context, diffs, terminal, and AI live in one workflow
- teams that want both IDE agent behavior and terminal automation
- project rules shared through `.cursor/rules/`
- mixed instruction ecosystems using `AGENTS.md` or `CLAUDE.md`
- multi-model workflows and model switching
- MCP-backed integrations across editor and CLI

## Installation

The current CLI installer is:

```bash
curl https://cursor.com/install -fsS | bash
```

Verify the compatible CLI binary:

```bash
cursor-agent --version
```

Cursor announced `agent` as the primary CLI entrypoint in January 2026. `cursor-agent` remains backward compatible, so older docs and scripts may still use it.

The CLI installation docs explicitly cover macOS, Linux, and Windows through WSL. Native Windows users can still use the Cursor editor; validate your preferred terminal setup before standardizing CLI usage.

## First Session

```bash
cd /path/to/your/repository
agent
```

Start with a read-only request:

```text
Explain the repository structure, build command, test command, and one low-risk improvement. Do not write any code.
```

Cursor CLI asks for approval before terminal commands in interactive mode.

## Daily CLI Commands

```bash
agent
agent "review the auth module"
agent -p "summarize the current diff"
agent models
agent ls
agent resume
agent mcp
```

The older `cursor-agent` spelling remains useful when following existing CLI reference pages:

```bash
cursor-agent -p "review these changes" --output-format text
cursor-agent mcp list
cursor-agent update
```

Useful in-session commands include:

```text
/models
/rules
/mcp
/compress
```

Use the current CLI help for the exact command list installed on your machine.

## Rules and Repository Instructions

Cursor CLI supports the same rules system as the IDE through:

```text
.cursor/rules/
```

The CLI also reads project-root:

```text
AGENTS.md
CLAUDE.md
```

For teams, pick a deliberate convention instead of maintaining the same instruction in three places.

A practical pattern is:

- use `.cursor/rules/` for Cursor-specific scoped rules
- use `AGENTS.md` for cross-agent repository instructions
- keep `CLAUDE.md` only when Claude-specific guidance is genuinely different

## Permission Model

Cursor CLI documents permission tokens for:

- `Shell(commandBase)`
- `Read(pathOrGlob)`
- `Write(pathOrGlob)`

Permissions can be configured globally in:

```text
~/.cursor/cli-config.json
```

or per project in:

```text
.cursor/cli.json
```

Deny rules take precedence over allow rules.

A useful baseline is to deny destructive shell commands, environment files, and private-key patterns even when normal source reads/writes are allowed.

## Headless and Automation Mode

Use print mode for scripts and CI:

```bash
agent -p "review this repository"
```

Historically documented examples use `cursor-agent -p`; the current primary entrypoint is `agent`.

Writing from print/headless automation can require `--force`:

```bash
agent -p --force "update generated documentation and run validation"
```

Treat `--force` as a separate approval tier. Automation should pair it with explicit CLI deny rules and a tightly scoped repository/task.

## MCP and External Tools

Cursor CLI can detect and use the MCP configuration shared with the editor. The current CLI also provides MCP management commands, including listing servers and tools.

Review every server for:

- read versus write capabilities
- authentication and token storage
- network access
- destructive operations
- whether the same MCP should be enabled in both IDE and automated CLI contexts

## Team Adoption Checklist

- [ ] choose one primary repository instruction pattern
- [ ] define global and project CLI permission defaults
- [ ] deny secrets and destructive commands explicitly
- [ ] pilot interactive editor/CLI usage before `--force` automation
- [ ] approve MCP servers separately from Cursor itself
- [ ] document whether WSL is the supported Windows CLI path

## Security Notes

- editor assistance becomes an execution surface when terminal tools or CLI automation are enabled
- `--force` can remove meaningful confirmation steps
- rule layering can create hidden or conflicting guidance
- MCP expands the data/tool boundary
- API keys for automation should never be committed to the repository

## Alternatives

- [GitHub Copilot](github-copilot.md) for GitHub-native editor, CLI, review, and repository workflows
- [Claude Code](claude-code.md) for terminal-first work with a strong permissions and project-memory model
- [OpenAI Codex](openai-codex.md) for terminal-first OpenAI workflows and dedicated local review
- [Gemini CLI](gemini-cli.md) for a Google-backed terminal workflow with sandbox and context controls

See the [Comparison Matrix](../getting-started/comparison-matrix.md) for a side-by-side shortlist.

## Verification Status

- Status: Documentation verified
- Last verified: 2026-08-09
- Scope: CLI installation, current entrypoint, interactive/headless usage, rules, permissions, sessions, models, and MCP reviewed against official Cursor sources
- Not locally tested: installer execution, sign-in flow, IDE behavior, model availability, and team-admin settings

## Sources

- https://cursor.com/docs
- https://cursor.com/docs/cli/overview
- https://cursor.com/docs/cli/installation
- https://cursor.com/docs/cli/using
- https://cursor.com/docs/cli/headless
- https://cursor.com/docs/cli/reference/parameters
- https://cursor.com/docs/cli/reference/permissions
- https://cursor.com/changelog/cli-jan-08-2026
- https://cursor.com/cli
