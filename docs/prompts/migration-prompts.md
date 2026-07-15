# Migration Prompts

Use these starters for upgrades, framework changes, and phased technical migrations.

## Prompt Objective

Force the agent to plan in phases before touching code or dependencies.

## When to Use

- framework upgrades
- runtime migrations
- dependency or platform changes

## Required Context

- current and target states
- constraints
- validation gates

## Prompt Starters

```text
Plan this migration by phase. Include prerequisites, compatibility risks, validation gates, and rollback points before editing.
```

```text
Audit the current dependency graph and identify blockers for this target upgrade. Separate hard blockers from optional cleanup.
```

## Variables to Customize

- current state
- target state
- rollback requirements

## Example Filled Prompt

```text
Plan this Angular upgrade from version 16 to 18 in phases.
Include dependency blockers, TypeScript risks, CI validation gates, and rollback points after each phase.
Do not edit until the plan is approved.
```

## Example Expected Output

- phase plan
- risks
- validation gates

## Weak Prompt Versus Strong Prompt

- Weak: `upgrade this`
- Strong: define versions, constraints, and rollback

## Failure Patterns

- one giant patch
- no rollback strategy

## Tool-Specific Adjustments

- require plan-only mode first on large migrations

## Human Review Checklist

- confirm the target matrix with official docs before executing

## Security Considerations

Review generated migration commands before running them, especially if they install, rewrite, or deploy.
