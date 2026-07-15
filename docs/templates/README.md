# Templates Overview

This section turns recurring AI-tooling artifacts into copy-ready team templates.

## Who This Section Is For

- maintainers of team standards
- engineers forking this repo internally
- reviewers who want consistent briefs and review artifacts

## What You Can Accomplish

- add repo-wide instruction files
- standardize task briefs and PR review format
- create tool-evaluation and security-review checklists

## Best First Pages

| Page | Best for | Maturity |
| --- | --- | --- |
| [AGENTS.md Template](./AGENTS.md) | repo-wide agent instructions | Most mature |
| [AI Task Brief Template](./ai-task-brief-template.md) | scoped implementation requests | Strong |
| [Tool Evaluation Template](./tool-evaluation-template.md) | compare vendors or pilots | Strong |
| [Security Checklist Template](./security-checklist-template.md) | approval or review prep | Strong |

## Recommended Reading Order

1. Add `AGENTS.md`.
2. Add the task brief and PR review templates.
3. Add tool evaluation and security checklists for broader rollout work.

## Current Limitations

- these templates are intentionally generic
- each team should add stack-specific commands and owners
- some hosts prefer additional tool-specific files alongside these templates

## Verification Note

Templates are `Documentation verified` and intended for customization before production use.

## Sources

- [AGENTS.md](../configs/agents-md.md)
- [CLAUDE.md](../configs/claude-md.md)
