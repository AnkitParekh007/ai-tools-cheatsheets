# Documentation Generation

Use this workflow when the agent should update docs from code reality instead of drafting generic prose.

## Objective

Read the implementation first, find stale or missing docs, and patch only what the repository can support honestly.

## Audience

- maintainers updating READMEs or developer docs
- contributors documenting recently shipped behavior

## When to Use

- code changed and docs are stale
- a public workflow, command, or config needs explanation

## When Not to Use

- the implementation is not yet settled
- the agent cannot inspect the code it is documenting

## Preconditions

- code source of truth exists
- target audience is known

## Required Context

- changed files
- existing docs page
- validation commands

## Recommended Tools

- repo-aware CLI agents for code-to-doc mapping

## Step-by-Step Workflow

1. Read the implementation first.
2. Identify stale claims.
3. Rewrite only the inaccurate or missing sections.
4. Keep commands copy-pasteable.
5. Run docs validation.

## Reusable Prompt

```text
Read the implementation first, identify stale docs, then patch only what is inaccurate.
Keep commands copy-pasteable, mark uncertainty explicitly, and preserve public URLs.
```

## Example Input

- update README after a new validation script was added

## Expected Agent Output

- stale doc list
- targeted doc patch
- validation commands

## Human Review Checkpoint

- verify docs describe the real implementation

## Validation Commands

```bash
npm run docs:validate
```

## Failure Modes

- generic docs not grounded in code
- URLs changed unnecessarily

## Rollback or Recovery

- restore the previous doc and restate the code evidence

## Completion Checklist

- docs reflect implementation
- links pass
- commands remain copyable

## Team Standard

Implementation first, prose second.

## Verification Note

This workflow assumes the repo itself is the source of truth for the behavior being documented.

## Sources

- [CONTRIBUTING_CONTENT.md](../../CONTRIBUTING_CONTENT.md)
