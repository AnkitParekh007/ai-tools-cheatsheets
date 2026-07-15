# Bug Fixing

Use this workflow to move from symptoms to the smallest safe fix with explicit validation and rollback.

## Objective

Reproduce a bug, identify the root cause, apply the smallest safe change, and prove the fix with focused tests.

## Audience

- engineers debugging local or CI failures
- on-call or maintenance contributors
- teams trying to reduce over-broad AI patches

## When to Use

- a failing test or broken behavior already exists
- the change should stay scoped
- you need a reproducible audit trail from symptom to fix

## When Not to Use

- when the failure is not reproducible
- when the request is actually a feature disguised as a bug
- when production-only evidence is required and not available locally

## Preconditions

- a clear symptom statement
- a reproduction path or failing test
- a rollback path such as git revert or feature flag disablement

## Required Context

- error message, stack trace, or failing assertion
- recently changed files or suspect modules
- current validation commands

## Recommended Tools

- Claude Code or Codex for repo-level investigation
- IDE assistants for file-local debugging after the root cause is narrowed

## Step-by-Step Workflow

1. Write the symptom in one sentence.
2. Reproduce the bug or capture the failing test.
3. Ask the agent to map probable root causes before editing.
4. Choose the smallest change that explains the failure.
5. Add or tighten a test that fails before the fix.
6. Apply the patch and rerun the narrowest validation set.
7. Document rollback if the fix reaches production.

## Reusable Prompt

```text
Investigate this bug without editing yet.
Start with reproduction, likely root causes, and the smallest safe change.
Then add the narrowest useful test and implement only the minimum fix.
List validation commands and rollback steps.
```

## Example Input

- symptom: API returns `500` when the user has no saved preferences
- reproduction: failing integration test on `GET /api/profile`
- likely area: null handling in the profile assembler

## Expected Agent Output

- root cause hypothesis tied to the exact file and branch condition
- one failing test that proves the bug
- one small production change
- validation commands for the touched test suite only

## Human Review Checkpoint

- confirm the bug is real and reproduced
- reject broad cleanup disguised as a fix
- ensure the added test would fail on the old behavior

## Validation Commands

```bash
npm test -- path/to/profile.test.ts
npm run lint
```

## Failure Modes

- changing multiple layers before reproducing
- replacing the symptom with a new behavior change
- skipping the regression test
- widening the patch because the agent “noticed” unrelated cleanup

## Rollback or Recovery

- revert the single fix commit
- disable the feature flag if one exists
- restore the pre-fix behavior while keeping the new failing test for follow-up

## Completion Checklist

- bug reproduced or confidently traced
- regression test added or tightened
- smallest safe fix merged
- rollback path documented if operationally relevant

## Team Standard

Prefer one bug, one test, one fix. Separate cleanup into a later change.

## Verification Note

This page defines the preferred debugging pattern. Repository-specific commands and paths must be adapted to the local stack.

## Sources

- [OpenAI Codex](../tools/openai-codex.md)
- [Claude Code](../tools/claude-code.md)
- [Test Generation](./test-generation.md)
