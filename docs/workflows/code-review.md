# Code Review

## Goal

Find correctness issues, regressions, security risks, and missing tests.

## Best Tools

- Claude Code
- OpenAI Codex
- GitHub Copilot
- Cursor

## Recommended Prompt

```text
Review the current diff like a strict senior engineer.
Find bugs, regressions, security issues, and missing tests.
List findings first.
```

## Step-by-Step

1. load the diff
2. ask for findings first
3. validate the highest-risk findings
4. patch issues

## CLI Examples

```bash
claude "review my current changes and list findings first"
cn -p "review the current diff and list findings first"
```

## IDE Examples

- run the same review prompt in Cursor or Copilot chat on the current branch

## Review Checklist

- correctness
- security
- missing tests

## Common Mistakes

- asking for a summary before findings

## Team Standard

AI review is advisory until a human approves the change.
