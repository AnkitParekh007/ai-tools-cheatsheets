# Feature Development

Use this workflow when an AI assistant helps with a scoped feature that still needs human-owned requirements and acceptance criteria.

## Objective

Move from ticket or product request to a small implementation plan, safe patch sequence, and validation checklist.

## Audience

- feature engineers
- tech leads decomposing work for coding assistants

## When to Use

- the feature is well scoped
- acceptance criteria are written down
- the repository has runnable tests or smoke checks

## When Not to Use

- requirements are still ambiguous
- the feature spans multiple teams with unresolved contracts
- the agent would need production-only context to design safely

## Preconditions

- objective and non-goals are written
- validation commands are known
- rollout constraints are defined

## Required Context

- ticket or brief
- relevant modules
- edge cases
- tests or examples of adjacent behavior

## Recommended Tools

- repo-aware CLI agents for planning and cross-file edits
- IDE assistants for file-local iteration after the plan is approved

## Step-by-Step Workflow

1. Ask for an implementation plan before edits.
2. Require assumptions and open questions up front.
3. Split the work into reviewable patches.
4. Add or update tests with each behavior change.
5. Validate after each patch.

## Reusable Prompt

```text
Turn this feature request into a small implementation plan.
List assumptions, files likely affected, tests to add, rollout risks, and the smallest reviewable patch order.
Do not edit until the plan is agreed.
```

## Example Input

- add repository-level search shortcut help text to the docs header

## Expected Agent Output

- patch sequence
- impacted files
- acceptance-test ideas

## Human Review Checkpoint

- confirm requirements and non-goals
- approve the patch order

## Validation Commands

```bash
npm run docs:validate
```

## Failure Modes

- coding before clarifying acceptance criteria
- mixing feature work with unrelated refactors

## Rollback or Recovery

- revert the feature patch sequence one commit at a time

## Completion Checklist

- plan approved
- tests or checks updated
- rollout notes captured if needed

## Team Standard

Plan first, then patch in small increments.

## Verification Note

Repository-specific validation commands and rollout rules vary by project.

## Sources

- [Code Review](./code-review.md)
- [PR Creation](./pr-creation.md)
