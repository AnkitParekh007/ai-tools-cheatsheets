# Java Spring Workflows

## Goal

Use coding agents safely in Spring applications with clear controller, service, and persistence boundaries.

## Best Tools

- Claude Code
- Codex
- Continue

## Recommended Prompt

```text
Follow the current Spring layering in this repo.
Preserve transaction and validation boundaries unless the task requires changing them.
```

## Step-by-Step

1. inspect layers
2. inspect tests and config
3. make focused changes

## CLI Examples

```bash
cn -p "map the Spring layers involved in this bug before proposing code changes"
```

## IDE Examples

- use editor navigation plus chat to inspect controller-service-repository flow

## Review Checklist

- validation location is correct
- transaction boundaries remain sane

## Common Mistakes

- moving business logic into controllers

## Team Standard

Store architecture notes in `AGENTS.md`.
