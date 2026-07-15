# Refactoring Prompts

Use these starters for structural cleanup where behavior must remain unchanged.

## Prompt Objective

Improve readability and maintainability while protecting interfaces and tests.

## When to Use

- safe refactors
- code organization cleanup

## Required Context

- invariants
- public interfaces
- test coverage

## Prompt Starters

```text
Refactor this module for readability and maintainability without changing behavior or public interfaces. State the invariants first.
```

```text
Propose the smallest safe refactor sequence for this file set. Keep each step independently reviewable and testable.
```

## Variables to Customize

- invariants
- test command
- files in scope

## Example Filled Prompt

```text
Refactor this utilities module for readability without changing exports or behavior.
State the invariants, propose a two-step patch sequence, and list the narrowest tests to run after each step.
```

## Example Expected Output

- invariants
- patch sequence
- tests

## Weak Prompt Versus Strong Prompt

- Weak: `clean this up`
- Strong: specify invariants and review boundaries

## Failure Patterns

- mixed behavior changes
- broad file churn

## Tool-Specific Adjustments

- run this after a manual behavior check, not before

## Human Review Checklist

- verify exports, side effects, and tests remain stable

## Security Considerations

Be careful around auth, encryption, or policy code even during “pure” refactors.
