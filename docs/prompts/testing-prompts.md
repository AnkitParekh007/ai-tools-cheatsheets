# Testing Prompts

Use these starters to add focused tests or tighten validation without widening the production patch.

## Prompt Objective

Generate high-signal tests that prove behavior and align with local conventions.

## When to Use

- regression coverage after a bug fix
- missing test coverage discovered in review

## Required Context

- behavior under test
- adjacent tests
- validation command

## Prompt Starters

```text
Add focused tests for the affected behavior only. Reuse local test conventions and avoid unrelated production changes.
```

```text
Inspect nearby tests first, then propose the narrowest regression test that would fail on the old behavior.
```

## Variables to Customize

- behavior
- framework
- target files

## Example Filled Prompt

```text
Add a focused regression test for unauthorized export requests.
Inspect adjacent admin tests first, then add the narrowest case that would fail before the auth fix.
```

## Example Expected Output

- target test file
- one or two focused cases
- rationale

## Weak Prompt Versus Strong Prompt

- Weak: `write tests`
- Strong: define the behavior and local conventions

## Failure Patterns

- snapshot sprawl
- test code that duplicates implementation details

## Tool-Specific Adjustments

- name the exact test runner command when possible

## Human Review Checklist

- ensure the test proves the behavior rather than the implementation shape

## Security Considerations

Avoid fixtures containing real secrets, customer identifiers, or production tokens.
