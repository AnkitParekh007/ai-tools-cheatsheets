# PR Creation

## Goal

Generate a high-signal pull request summary.

## Best Tools

- GitHub Copilot
- Codex
- Claude Code

## Recommended Prompt

```text
Summarize the current branch for a PR.
Include problem, approach, tests, risks, and follow-up work.
```

## Step-by-Step

1. inspect diff
2. group changes
3. write concise summary

## CLI Examples

```bash
claude "write a PR summary for the current diff"
```

## IDE Examples

- use Copilot or Cursor on the open branch and compare output against the diff

## Review Checklist

- summary matches actual diff
- risks are explicit

## Common Mistakes

- generic PR descriptions

## Team Standard

Use a PR template and require test notes.
