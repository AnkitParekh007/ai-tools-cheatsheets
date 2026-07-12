# Master Prompts

## Understand This Repository

```text
Map this repository for a new engineer.
Focus on entry points, runtime architecture, build/test commands, and the riskiest places to modify.
Do not change files yet.
```

## Create Implementation Plan

```text
Analyze the current implementation and propose a step-by-step plan.
Include risks, edge cases, validation steps, and the smallest safe path.
Do not edit files yet.
```

## Review This PR

```text
Review the current diff like a strict senior engineer.
Find bugs, regressions, security issues, and missing tests.
List findings first.
```

## Fix Failing Tests

```text
Investigate the failing tests.
Explain root cause first, then implement the smallest safe fix and rerun the narrowest relevant tests.
```

## Add Unit Tests

```text
Follow the local test conventions.
Add focused unit tests for the affected behavior without changing unrelated code.
```

## Add E2E Tests

```text
Add end-to-end tests for this workflow using the repo's existing test framework.
Keep setup minimal and avoid brittle selectors.
```

## Refactor Safely

```text
Refactor this module for readability and maintainability without changing behavior or public interfaces.
```

## Upgrade Angular

```text
Plan this Angular upgrade in phases.
Call out breaking changes, migration steps, compatibility risks, and rollback options before editing.
```

## Debug Java Backend Issue

```text
Investigate this Java backend issue.
Map the controller, service, repository, configuration, and test layers before proposing a fix.
```

## Create Migration Plan

```text
Plan this migration by phase.
Include prerequisites, rollout strategy, validation, and rollback steps.
```

## Generate Release Notes

```text
Summarize user-facing changes from the selected commits.
Separate features, fixes, breaking changes, and follow-up items.
```

## Create Jira Implementation Plan

```text
Turn this Jira ticket into an engineering implementation plan.
List assumptions, impacted services, tests, rollout risks, and open questions.
```

## Compare Two Branches

```text
Compare these two branches by behavior, risk, and likely merge pain.
Call out hidden differences, not just file counts.
```

## Security Review

```text
Review this change for auth, secrets, validation, access control, injection, and unsafe automation issues.
List findings first.
```

## Performance Review

```text
Review this code path for likely performance issues.
Focus on database calls, N+1 risks, memory use, expensive loops, and serialization overhead.
```

## Documentation Update

```text
Read the implementation first, identify stale docs, then patch only what is inaccurate.
Keep commands copy-pasteable.
```
