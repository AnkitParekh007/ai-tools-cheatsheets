# Security Review

## Goal

Identify security regressions and risky assumptions.

## Best Tools

- Claude Code
- Codex
- GitHub Copilot

## Recommended Prompt

```text
Review this change for security issues.
Focus on auth, secrets, validation, access control, injection, and unsafe automation.
List findings first.
```

## Step-by-Step

1. inspect sensitive files
2. review auth and external calls
3. review config and secrets

## CLI Examples

```bash
claude "review the current diff for security issues and list findings first"
```

## IDE Examples

- review the changed files in editor chat with security-specific instructions

## Review Checklist

- secret handling
- auth and RBAC
- unsafe commands

## Common Mistakes

- treating generated code as safe by default

## Team Standard

Human review is required for security-sensitive changes.
