# Codex Prompts

Use these prompt starters for plan-first repo work in Codex or a similar coding-agent surface.

## Prompt Objective

Drive clear repository analysis, targeted edits, and explicit validation.

## When to Use

- implementation planning
- findings-first review
- repo-wide documentation or workflow updates

## Required Context

- objective
- constraints
- files or areas in scope
- validation bar

## Prompt Starters

```text
Analyze the current implementation and propose the smallest safe plan. Include risks, edge cases, validation steps, and rollback notes before editing.
```

```text
Update only the stale documentation for this implementation. Preserve public URLs and keep commands copy-pasteable.
```

```text
Debug this failed validation command. Explain the root cause first, then apply the smallest patch and rerun the narrowest relevant check.
```

## Variables to Customize

- scope
- validation commands
- rollback requirements

## Example Filled Prompt

```text
Analyze the docs validation pipeline and propose the smallest safe plan to make it launch-ready.
Include broken-link handling, local-path detection, Markdown linting, and CI workflow impact before editing.
```

## Example Expected Output

- plan
- risk list
- affected files
- exact commands to run

## Weak Prompt Versus Strong Prompt

- Weak: `fix the docs`
- Strong: define the exact quality gates and ask for a plan first

## Failure Patterns

- broad fixes with no scoped plan
- invented verification claims

## Tool-Specific Adjustments

- ask for intermediate status on larger refactors
- request a commit-ready summary only after validation passes

## Human Review Checklist

- confirm the plan matches the repo state
- review any destructive or wide-scope edits carefully

## Security Considerations

Require explicit permission boundaries when the task could touch secrets, deploy scripts, or external systems.
