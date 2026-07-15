# PR Creation

Use this workflow when an AI assistant helps turn validated local changes into a reviewable pull request.

## Objective

Create a PR description that is scoped, evidence-backed, and easy for human reviewers to validate.

## Audience

- contributors opening reviewable changes
- maintainers standardizing PR hygiene

## When to Use

- local validation is already complete
- the branch contains one coherent change set

## When Not to Use

- tests are still red
- the branch mixes unrelated work

## Preconditions

- change scope is stable
- commands run are recorded

## Required Context

- summary of changes
- affected pages or modules
- validation commands and results

## Recommended Tools

- any coding assistant that can read git diff and repo templates

## Step-by-Step Workflow

1. Summarize the change in plain English.
2. Ask the agent to separate user-facing changes from internal cleanup.
3. Include sources and validation commands.
4. Keep risks and follow-ups explicit.

## Reusable Prompt

```text
Draft a PR description for the current diff.
Keep it specific: summary, affected files, primary sources, validation commands, risks, and follow-up items.
Do not invent tests or verification.
```

## Example Input

- docs validation pipeline added
- issue forms refreshed

## Expected Agent Output

- concise summary
- files or sections affected
- validation list

## Human Review Checkpoint

- verify the PR text matches the real diff

## Validation Commands

```bash
git diff --stat
npm run docs:validate
```

## Failure Modes

- inflated marketing summary
- invented verification claims

## Rollback or Recovery

- rewrite the PR body manually from the diff

## Completion Checklist

- PR body matches the actual branch
- validation list is honest

## Team Standard

PRs should be review aids, not marketing copy.

## Verification Note

This page documents PR-writing standards, not host-specific merge settings.

## Sources

- [Code Review](./code-review.md)
