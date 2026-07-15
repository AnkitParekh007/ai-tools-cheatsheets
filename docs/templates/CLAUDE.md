# CLAUDE.md Template

## Template Purpose

Use `CLAUDE.md` when your team wants Claude-specific working guidance in addition to a general `AGENTS.md`.

## Recommended File Path

`/CLAUDE.md`

## Minimal Version

```md
# CLAUDE.md

## Working Style
- plan before patching on risky changes
- list findings first in reviews

## Validation
- run focused tests before broad suites
```

## Full Version

```md
# CLAUDE.md

## Working Style
- gather repo context before editing
- use the smallest safe patch
- keep summaries concise and factual

## Review Rules
- findings first
- include severity and file paths

## Validation
- preferred commands
- when to run full validation

## Safety Rules
- no secrets in prompts
- no destructive actions without confirmation
```

## Example Completed Version

```md
# CLAUDE.md

## Working Style
- Inspect changed docs before editing.
- Preserve URLs and navigation.

## Review Rules
- List broken links, stale claims, and missing validation first.

## Validation
- Run `npm run docs:validate` after doc changes.
- Run `npm run docs:build` before release.
```

## Field-by-Field Explanation

- `Working Style`: how the assistant should approach tasks
- `Review Rules`: review-specific expectations
- `Validation`: what “done” means
- `Safety Rules`: boundaries for risky actions

## Customization Guidance

- keep it tool-specific
- avoid duplicating everything from `AGENTS.md`

## Common Mistakes

- conflicting instructions across files
- vague validation requirements

## Validation Checklist

- file path is correct
- rules do not conflict with `AGENTS.md`
- commands are current
