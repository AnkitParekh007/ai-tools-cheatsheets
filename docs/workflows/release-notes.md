# Release Notes

## Goal

Turn merged changes into usable release notes.

## Best Tools

- Codex
- Continue
- GitHub Copilot

## Recommended Prompt

```text
Summarize user-facing changes from these commits.
Separate fixes, features, and breaking changes.
```

## Step-by-Step

1. gather commit range
2. classify changes
3. write customer-safe summary

## CLI Examples

```bash
cn -p "draft release notes from the last 10 commits"
```

## IDE Examples

- use GitHub-centric tools against the release branch

## Review Checklist

- user-facing wording
- breaking changes called out

## Common Mistakes

- leaking internal-only implementation details

## Team Standard

Human owner approves final notes.
