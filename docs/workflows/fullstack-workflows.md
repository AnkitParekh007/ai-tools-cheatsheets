# Fullstack Workflows

## Goal

Coordinate frontend, backend, schema, tests, and docs without losing scope control.

## Best Tools

- Codex
- Claude Code
- OpenCode

## Recommended Prompt

```text
Plan the fullstack change by layer.
List frontend, backend, schema, tests, and docs work separately before editing.
```

## Step-by-Step

1. phase by layer
2. confirm API contract
3. implement incrementally

## CLI Examples

```bash
opencode
codex
```

## IDE Examples

- use editor views to keep API contract files and UI callers open together

## Review Checklist

- API contract matches both ends
- migrations are explicit

## Common Mistakes

- editing frontend and backend with no shared contract review

## Team Standard

Use plan-first prompts and require API validation.
