# Workflow Overview

Workflow pages turn common engineering tasks into repeatable AI-assisted operating patterns.

## Who This Section Is For

- engineers using CLI or IDE coding agents
- reviewers who want predictable human-checkpoint rules
- teams standardizing prompt and validation habits

## What You Can Accomplish

- run tighter code reviews with findings-first prompts
- debug bugs and CI failures with smaller safer changes
- plan upgrades and migrations with explicit rollback steps
- generate tests, docs, PRs, and release notes without losing human control

## Best First Pages

| Page | Best for | Current maturity |
| --- | --- | --- |
| [Code Review](./code-review.md) | findings-first review workflows | Most mature |
| [Bug Fixing](./bug-fixing.md) | reproduction to validation | Most mature |
| [CI/CD Automation](./ci-cd-automation.md) | failed-job debugging | Most mature |
| [Angular Workflows](./angular-workflows.md) | framework upgrades and large repo change planning | Most mature |

## Recommended Reading Order

1. Read [Code Review](./code-review.md) to set the findings-first review style.
2. Read [Bug Fixing](./bug-fixing.md) for the smallest-safe-change pattern.
3. Read [CI/CD Automation](./ci-cd-automation.md) before letting agents interpret logs or rerun pipelines.
4. Read stack-specific pages such as [Angular Workflows](./angular-workflows.md) or [Java Spring Workflows](./java-spring-workflows.md) only after the base workflow rules are clear.

## Current Limitations

- Many workflows depend on the local repository's own test, lint, and deploy commands.
- Host-specific integrations, enterprise permissions, and paid-plan features are not universally testable here.
- These pages are operating patterns, not evidence that a named vendor completed the workflow end to end in this environment.

## Contribution Opportunities

- add tighter validation commands for specific stacks
- replace placeholder examples with real sanitized scenarios
- contribute rollback patterns for monorepos, CI systems, and deployment platforms

## Verification Note

These pages are workflow standards and prompt patterns. They are `Documentation verified` unless a page explicitly says a scenario was locally exercised.

## Sources

- [Claude Code](../tools/claude-code.md)
- [OpenAI Codex](../tools/openai-codex.md)
- [Cursor](../tools/cursor.md)
- [GitHub Copilot](../tools/github-copilot.md)
