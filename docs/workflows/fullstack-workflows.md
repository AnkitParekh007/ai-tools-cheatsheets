# Fullstack Workflows

Use this page when a change spans frontend, backend, API contracts, data, and deployment concerns.

## Objective

Keep cross-layer AI assistance coordinated so one patch does not fix the UI while breaking contracts or backend validation.

## Audience

- full-stack engineers
- maintainers of product repositories with shared frontend and backend ownership

## When to Use

- API contract changes
- feature work crossing UI and server layers
- auth or permission flows visible in multiple surfaces

## When Not to Use

- when one layer can be changed independently and reviewed separately

## Preconditions

- acceptance criteria defined
- frontend and backend validation commands known

## Required Context

- UI files
- server files
- API schema or contract docs
- relevant tests

## Recommended Tools

- repo-aware CLI agents for whole-repo mapping

## Step-by-Step Workflow

1. Ask for a cross-layer impact map first.
2. Separate contract changes from implementation changes.
3. Validate frontend and backend independently, then together.

## Reusable Prompt

```text
Map the frontend, backend, data, and contract impact of this change before editing.
List assumptions, integration risks, and the smallest safe patch order.
```

## Example Input

- add a new field to a settings form and persist it server-side

## Expected Agent Output

- contract impact map
- patch order
- validation plan

## Human Review Checkpoint

- confirm contract compatibility and rollout order

## Validation Commands

```bash
npm test
npm run build
```

## Failure Modes

- frontend-only patch that assumes backend support
- backend-only change that silently breaks the UI

## Rollback or Recovery

- revert the cross-layer change or hide it behind a feature flag

## Completion Checklist

- contract impact reviewed
- both layers validated

## Team Standard

Cross-layer work must name contract assumptions explicitly.

## Verification Note

This page is a reusable workflow pattern for private forks and application repos.

## Sources

- [Feature Development](./feature-development.md)
- [Code Review](./code-review.md)
