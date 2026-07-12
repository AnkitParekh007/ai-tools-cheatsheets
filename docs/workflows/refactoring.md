# Refactoring

## Goal

Improve structure without changing behavior.

## Best Tools

- Claude Code
- Codex
- Aider

## Recommended Prompt

```text
Refactor for readability and maintainability without changing behavior.
Preserve public interfaces.
```

## Step-by-Step

1. identify safe scope
2. refactor in small steps
3. run tests

## CLI Examples

```bash
aider
claude
```

## IDE Examples

- use Cursor for local refactor loops with diff review

## Review Checklist

- behavior preserved
- public API unchanged

## Common Mistakes

- mixing refactor and feature change

## Team Standard

Separate behavior changes from refactors when possible.
