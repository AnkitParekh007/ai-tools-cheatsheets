# Documentation Generation

## Goal

Produce docs that match the implementation.

## Best Tools

- Codex
- Claude Code
- Continue

## Recommended Prompt

```text
Read the implementation first, identify stale docs, then patch only what is inaccurate.
```

## Step-by-Step

1. inspect code
2. compare current docs
3. patch stale sections

## CLI Examples

```bash
cn -p "update docs for the changed feature based on the implementation"
```

## IDE Examples

- use editor chat after opening both the implementation and docs

## Review Checklist

- commands are runnable
- docs match behavior

## Common Mistakes

- writing docs from memory

## Team Standard

Verify commands before merge.
