# Angular Workflows

This page is the Angular-specific upgrade and change-planning workflow for teams using AI assistants on framework-heavy repositories.

## Objective

Plan and execute Angular upgrades in phases, with dependency audit, breaking-change review, validation gates, and rollback defined up front.

## Audience

- frontend engineers
- maintainers of Angular monorepos
- team leads planning major version upgrades

## When to Use

- Angular version upgrades
- CLI or workspace config migrations
- template, lint, or TypeScript compatibility sweeps

## When Not to Use

- for one-file bug fixes
- when the team has not yet picked the target version
- when no validation gates exist for the application

## Preconditions

- current Angular, Node, and TypeScript versions are known
- target version is chosen
- the repo has tests, build commands, and smoke-test paths

## Required Context

- `package.json` and lockfile
- Angular workspace config
- CI build commands
- known incompatible dependencies

## Recommended Tools

- Claude Code or Codex for dependency and repo-wide change planning
- IDE agents for localized template or typing fixes after the plan is agreed

## Step-by-Step Workflow

1. Inventory the current Angular, CLI, TypeScript, RxJS, and Node versions.
2. Read the official upgrade path before editing.
3. Ask the agent for an incremental plan, not a single giant patch.
4. Separate dependency changes, code migrations, and cleanup.
5. Run validation gates after each phase.
6. Record rollback points between phases.

## Reusable Prompt

```text
Plan this Angular upgrade in phases.
List current and target versions, dependency risks, likely breaking changes, validation gates, and rollback points before editing.
Then implement only phase 1.
```

## Example Input

- current: Angular 16 workspace
- target: Angular 18
- constraints: Nx monorepo, strict TypeScript, CI must stay green after each phase

## Expected Agent Output

- dependency audit
- phase-by-phase plan
- likely breaking areas such as builders, RxJS, linting, or test setup
- exact validation gates for each phase

## Human Review Checkpoint

- confirm the target matrix with official Angular guidance
- approve each phase separately
- review generated migration commands before running them

## Validation Commands

```bash
npm install
npm run build
npm test
```

## Failure Modes

- skipping the dependency matrix review
- running every migration at once
- hiding template or TypeScript regressions inside a large formatting patch

## Rollback or Recovery

- revert to the previous lockfile and workspace config
- roll back one phase at a time
- pause after dependency alignment if application changes are not yet safe

## Completion Checklist

- current and target versions documented
- phase plan approved
- each phase validated independently
- rollback point preserved after each phase

## Team Standard

Large framework upgrades must be phased, reviewable, and reversible.

## Verification Note

This page is a planning and execution pattern. Exact Angular commands and compatibility matrices must be validated against the current official upgrade guidance for the target versions.

## Sources

- [Migration and Upgrade](./migration-upgrade.md)
- [Bug Fixing](./bug-fixing.md)
