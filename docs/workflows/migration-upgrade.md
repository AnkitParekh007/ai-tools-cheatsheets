# Migration and Upgrade

## Goal

Plan and execute a safe migration.

## Best Tools

- Claude Code
- Codex
- OpenCode

## Recommended Prompt

```text
Plan the migration in phases.
Include prerequisites, rollout risks, backout steps, and validation before editing.
```

## Step-by-Step

1. map dependencies
2. phase the work
3. implement incrementally

## CLI Examples

```bash
codex
opencode
```

## IDE Examples

- use Cursor or Copilot to inspect impacted files after the plan is approved

## Review Checklist

- rollout plan exists
- backout plan exists

## Common Mistakes

- upgrading too many layers at once

## Team Standard

Use plan-first mode for migrations.
