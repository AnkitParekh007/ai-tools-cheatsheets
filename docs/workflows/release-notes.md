# Release Notes

Use this workflow to turn commits into accurate release notes without overstating maturity.

## Objective

Summarize user-visible changes, validation, known limitations, and follow-up items for a release.

## Audience

- maintainers shipping public releases
- engineers preparing internal adoption updates

## When to Use

- a release candidate exists
- commit scope is understood

## When Not to Use

- before validation is complete
- when the branch is still changing rapidly

## Preconditions

- target commits or tag are selected
- validation status is known

## Required Context

- commit range
- release goal
- known limitations

## Recommended Tools

- coding assistant with git history access

## Step-by-Step Workflow

1. Separate features, fixes, validation, and known limitations.
2. Keep unverified areas explicit.
3. Avoid calling starter content “complete”.

## Reusable Prompt

```text
Summarize user-facing changes from the selected commits.
Separate features, fixes, validation improvements, known limitations, and follow-up items.
Do not describe unfinished sections as complete.
```

## Example Input

- first public handbook launch

## Expected Agent Output

- highlights
- included sections
- known limitations

## Human Review Checkpoint

- verify every claim against the actual diff

## Validation Commands

```bash
git log --oneline <base>..HEAD
```

## Failure Modes

- release notes that describe aspirations instead of shipped work

## Rollback or Recovery

- regenerate notes from the exact commit range

## Completion Checklist

- release notes match shipped artifacts
- limitations are explicit

## Team Standard

Release notes must be honest enough for someone to decide whether to upgrade.

## Verification Note

This is a repository release-writing pattern, not a claim about any platform release automation.

## Sources

- [../launch-readiness-audit.md](../launch-readiness-audit.md)
