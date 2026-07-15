# Refactoring

Use this workflow for non-behavioral code cleanup where the main risk is accidental regression.

## Objective

Improve structure, naming, duplication, or maintainability without changing external behavior.

## Audience

- maintainers cleaning up legacy code
- engineers preparing a codebase for future feature work

## When to Use

- behavior is already covered by tests
- the current code is hard to work with
- the refactor can be reviewed independently from feature work

## When Not to Use

- when behavior changes are mixed into the same patch
- when there is no practical validation path

## Preconditions

- clear non-goal: no behavior change
- existing tests or smoke checks available

## Required Context

- module boundaries
- public interfaces
- current tests

## Recommended Tools

- repo-aware CLI agents for structure changes
- IDE tools for rename and extraction assistance

## Step-by-Step Workflow

1. State the invariant behavior.
2. Ask for a refactor plan before edits.
3. Keep interfaces stable.
4. Run tests after each structural change.

## Reusable Prompt

```text
Refactor this module for readability and maintainability without changing behavior or public interfaces.
State the invariants first, then propose the smallest safe sequence of edits and tests.
```

## Example Input

- split a long utility module into smaller pure functions

## Expected Agent Output

- invariants
- patch sequence
- unchanged interface list

## Human Review Checkpoint

- confirm no behavior change slipped in
- inspect renamed exports and moved files carefully

## Validation Commands

```bash
npm test
```

## Failure Modes

- hidden behavior changes
- excessive file churn

## Rollback or Recovery

- revert the refactor commit and keep the plan for later

## Completion Checklist

- behavior preserved
- tests green
- diff readable

## Team Standard

Refactors should be boring to review.

## Verification Note

This is a generic non-behavioral workflow pattern.

## Sources

- [Code Review](./code-review.md)
- [Test Generation](./test-generation.md)
