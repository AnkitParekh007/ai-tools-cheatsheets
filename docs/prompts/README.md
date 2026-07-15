# Prompt Library

This section separates short prompt starters from longer master prompts that teams can standardize.

## Who This Section Is For

- developers using AI coding tools daily
- teams standardizing high-signal prompts
- reviewers trying to reduce vague or risky agent requests

## Prompt Types

### Prompt Starters

Short prompts for:

- tool-specific usage patterns
- review, testing, refactoring, migration, and docs tasks
- fast local iteration inside a repo

### Master Prompts

Longer prompts with:

- objective
- required context
- variables
- execution phases
- output format
- validation rules
- security constraints
- human review checkpoints

Start with [Master Prompts](./master-prompts.md) when the task is high impact or spans multiple files. Use the other prompt pages when the task is smaller or you already know the right workflow.

## Best First Pages

| Page | Best for | Maturity |
| --- | --- | --- |
| [Master Prompts](./master-prompts.md) | repeatable high-signal engineering tasks | Most mature |
| [Review Prompts](./review-prompts.md) | findings-first review passes | Strong |
| [Testing Prompts](./testing-prompts.md) | focused regression coverage | Strong |
| [Migration Prompts](./migration-prompts.md) | phased upgrade planning | Strong |

## Recommended Reading Order

1. Read [Master Prompts](./master-prompts.md) for the full reusable patterns.
2. Read one task page such as [Review Prompts](./review-prompts.md) or [Testing Prompts](./testing-prompts.md).
3. Read the tool-specific page that matches your host surface.

## Current Limitations

- prompts are reusable patterns, not proof that every named tool executed them identically
- account-gated, paid-plan, or enterprise-only workflows may need local adaptation
- prompts still depend on repository context quality and human review

## Verification Note

Prompt pages are `Documentation verified` unless they explicitly state a prompt was exercised locally in this repository.

## Sources

- [Workflow Overview](../workflows/README.md)
- [AGENTS.md](../configs/agents-md.md)
- [CLAUDE.md](../configs/claude-md.md)
