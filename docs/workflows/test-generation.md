# Test Generation

## Goal

Add useful tests without encoding bad assumptions.

## Best Tools

- Codex
- Claude Code
- Continue

## Recommended Prompt

```text
Follow existing test conventions.
Add focused tests for the affected behavior only.
```

## Step-by-Step

1. inspect nearby tests
2. add focused cases
3. run the narrowest test command

## CLI Examples

```bash
cn -p "add unit tests for the affected path using local conventions"
```

## IDE Examples

- use editor chat to inspect local test patterns before generating code

## Review Checklist

- assertions are meaningful
- edge cases covered

## Common Mistakes

- low-signal snapshots

## Team Standard

Prefer explicit assertions over broad snapshots.
