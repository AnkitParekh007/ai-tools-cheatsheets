# Test Generation

Use this workflow when you want an AI assistant to add focused tests without changing unrelated production behavior.

## Objective

Generate or tighten tests that prove behavior, catch regressions, and stay aligned with existing test conventions.

## Audience

- engineers adding regression coverage
- reviewers asking for missing tests

## When to Use

- behavior is already understood
- the repository has established test patterns
- a bug fix or feature patch needs coverage

## When Not to Use

- when the product behavior is unclear
- when the agent cannot inspect adjacent tests
- when broad test rewrites would hide the real change

## Preconditions

- target behavior is explicit
- test framework is known
- adjacent tests exist or conventions are documented

## Required Context

- production files being covered
- related tests
- failure or acceptance criteria

## Recommended Tools

- repo-aware CLI agents for finding the right test location
- IDE assistants for assertion-level refinements

## Step-by-Step Workflow

1. Ask the agent to inspect adjacent tests first.
2. Require the narrowest useful test.
3. Prefer failing test before production fix when debugging.
4. Keep fixtures and mocks minimal.

## Reusable Prompt

```text
Add focused tests for the affected behavior only.
Follow local test conventions, reuse nearby fixtures, and avoid changing unrelated production code.
Explain why each new assertion matters.
```

## Example Input

- add a regression test for an unauthorized export request

## Expected Agent Output

- target test file
- one or two focused test cases
- explanation of the assertions

## Human Review Checkpoint

- ensure the new test would fail on the broken behavior
- reject over-mocked tests with no behavioral signal

## Validation Commands

```bash
npm test -- path/to/focused.test.ts
```

## Failure Modes

- snapshot bloat
- unrelated fixture churn
- testing implementation details instead of behavior

## Rollback or Recovery

- remove the generated tests and restate the behavior more clearly

## Completion Checklist

- test location matches repo conventions
- assertions map to real behavior
- targeted test run passes

## Team Standard

Prefer focused behavioral tests over broad AI-generated coverage sprawl.

## Verification Note

Test framework specifics vary by repository; adapt commands and file paths locally.

## Sources

- [Bug Fixing](./bug-fixing.md)
- [Code Review](./code-review.md)
