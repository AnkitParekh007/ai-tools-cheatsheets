# Angular Workflows

## Goal

Use coding agents effectively on Angular repositories without framework drift.

## Best Tools

- Cursor
- Codex
- Claude Code

## Recommended Prompt

```text
Follow existing Angular patterns in this repo.
Do not introduce new state or data-fetching patterns unless asked.
```

## Step-by-Step

1. inspect Angular patterns
2. inspect test setup
3. implement using local conventions

## CLI Examples

```bash
codex
```

## IDE Examples

- use Cursor with rule files encoding Angular conventions

## Review Checklist

- routing and DI patterns preserved
- tests align with repo standards

## Common Mistakes

- mixing old and new Angular patterns casually

## Team Standard

Encode Angular conventions in rules or `AGENTS.md`.
