# CLAUDE.md

Use `CLAUDE.md` when your team wants Claude Code to have repository-specific instructions in addition to any cross-tool guidance.

## Official Claude Config Layers

Anthropic's docs confirm these relevant locations:

- personal instructions: `~/.claude/CLAUDE.md`
- project instructions: `CLAUDE.md` or `.claude/CLAUDE.md`
- local personal override: `CLAUDE.local.md`
- shared project settings: `.claude/settings.json`
- local personal project settings: `.claude/settings.local.json`

The docs also say most users only edit `CLAUDE.md` and `settings.json`.

## When To Use It

Use `CLAUDE.md` for Claude-specific guidance such as:

- preferred repo workflow
- how Claude should validate changes
- MCP usage constraints for Claude sessions
- repo-specific review expectations
- command safety boundaries

## When Not To Use It

Do not duplicate everything from `AGENTS.md` unless Claude genuinely needs extra behavior. If the rule applies across tools, keep it in `AGENTS.md` first.

## Shared vs Personal

Good candidates for repo-committed `CLAUDE.md`:

- build and test commands
- Claude-specific workflow notes
- shared safety instructions

Good candidates for personal `~/.claude/CLAUDE.md` or local settings:

- your preferred verbosity
- personal aliases and habits
- experimental allowances you do not want to share

## Suggested Structure

```md
# CLAUDE.md

## Workflow
- Plan before editing on multi-file tasks.
- Prefer repo docs before external assumptions.

## Validation
- Run `npm run docs:build` after documentation changes.

## Safety
- Do not widen MCP or local permission scope unless required.

## Review
- Prefer minimal diffs and keep wording command-first.
```

## Settings Guidance

Anthropic's settings docs explicitly describe hierarchical settings:

- `~/.claude/settings.json` for all projects
- `.claude/settings.json` for shared team settings
- `.claude/settings.local.json` for local-only preferences

That split is important. Team defaults should live in project config, while personal shortcuts and experiments should stay local.

## Team Recommendation

Use this pattern:

- `AGENTS.md` for cross-tool behavior
- `CLAUDE.md` for Claude-specific behavior
- `.claude/settings.json` only for shared, version-worthy Claude settings
- `.claude/settings.local.json` for personal exceptions

## Sources

- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/claude-directory
- https://code.claude.com/docs/en/memory
