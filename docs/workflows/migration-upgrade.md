# Migration and Upgrade

Use this workflow for dependency, platform, or service migrations that need phased change control.

## Objective

Break a migration into inventory, compatibility review, phased execution, validation gates, and rollback checkpoints.

## Audience

- maintainers planning upgrades
- platform teams coordinating cross-repo changes

## When to Use

- framework upgrades
- runtime changes
- large dependency or host migrations

## When Not to Use

- for a one-file bug fix
- when the target system is still undecided

## Preconditions

- current state inventoried
- target state chosen
- validation gates identified

## Required Context

- version matrix
- lockfile
- deployment constraints
- rollback requirements

## Recommended Tools

- repo-aware CLI agents for planning
- IDE assistants for targeted remediation after the plan is approved

## Step-by-Step Workflow

1. Inventory current versions and integrations.
2. Ask for a phased plan before edits.
3. Isolate infrastructure changes from code changes.
4. Validate after every phase.
5. Keep rollback points explicit.

## Reusable Prompt

```text
Plan this migration by phase.
Include prerequisites, compatibility risks, validation gates, rollback points, and the smallest safe order of changes.
```

## Example Input

- move from one lint runner or test environment version to another across a monorepo

## Expected Agent Output

- phased plan
- risks
- validation gates

## Human Review Checkpoint

- verify the target state and compatibility assumptions

## Validation Commands

```bash
npm test
npm run build
```

## Failure Modes

- one giant migration patch
- no rollback points

## Rollback or Recovery

- revert the last phase only

## Completion Checklist

- inventory complete
- phases approved
- rollback preserved

## Team Standard

Phase large migrations; do not batch planning, execution, and cleanup into one commit.

## Verification Note

This page is a generic migration pattern. See stack-specific pages for tighter examples.

## Sources

- [Angular Workflows](./angular-workflows.md)
