# CI/CD Automation

## Goal

Use coding agents safely in automation and debugging workflows.

## Best Tools

- Codex
- Continue
- OpenCode

## Recommended Prompt

```text
Perform this task non-interactively with the allowed files and commands only.
Return a concise summary and unresolved risks.
```

## Step-by-Step

1. pin config
2. constrain permissions
3. run headless
4. collect logs

## CLI Examples

```bash
cn -p "summarize release-note-worthy changes from the last commit range"
opencode run "generate release notes draft from the current diff"
```

## IDE Examples

- review CI logs in the IDE and ask for the narrowest likely fix

## Review Checklist

- deterministic config
- clear logs

## Common Mistakes

- using interactive defaults in CI

## Team Standard

Pin models and config where possible.
