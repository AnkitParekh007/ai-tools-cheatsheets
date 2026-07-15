# Code Review

Use this workflow to get findings-first review help from an AI coding assistant without outsourcing approval.

## Objective

Find correctness bugs, authorization mistakes, missing regression tests, and risky behavior changes before human approval.

## Audience

- reviewers
- authors doing a self-review
- team leads standardizing AI review prompts

## When to Use

- pull requests with non-trivial logic changes
- changes touching auth, permissions, billing, migrations, or caching
- review passes where human reviewers want a faster first sweep

## When Not to Use

- as a merge gate by itself
- on a diff the agent cannot access
- when the repository lacks runnable validation commands and the change is high risk

## Preconditions

- the diff is cleanly scoped
- the reviewer knows the expected behavior
- at least one focused validation command exists

## Required Context

- the current diff or PR branch
- relevant tests or failing cases
- architecture notes for the touched area
- known risk areas such as auth, data writes, or migrations

## Recommended Tools

- Claude Code or Codex for repo-wide reasoning
- Cursor or Copilot Chat for IDE-local review passes

## Step-by-Step Workflow

1. Ask for findings first, not a summary.
2. Require severity labels and file references.
3. Ask the agent to separate confirmed concerns from weaker suspicions.
4. Validate the top findings manually against the diff.
5. Run the narrowest relevant tests.
6. Fix confirmed problems before broader style cleanup.

## Weak Prompt

```text
Review this PR and tell me what you think.
```

## Strong Prompt

```text
Review the current diff like a strict senior engineer.
Focus on correctness, authorization, data handling, regressions, and missing tests.
List findings first.
Use severity labels: High, Medium, Low.
For each finding include file path, why it matters, and the smallest useful validation step.
Call out false positives or uncertainty explicitly.
Do not summarize until findings are complete.
```

## Example Input

- a PR that adds a new admin-only endpoint
- a missing authorization check in one handler
- one changed query that can regress pagination
- no added regression test for the permission path

## Expected Agent Output

```text
High - api/admin/routes.ts
Missing role check on the export endpoint. A non-admin authenticated user can trigger the handler.
Validation: hit the route with a non-admin fixture or inspect shared middleware coverage.

Medium - services/export-service.ts
Pagination defaults changed from server-bounded to client-controlled, which can create large exports.
Validation: run the existing export tests with a large page size.

Medium - tests/admin/export.test.ts
No regression test covers the unauthorized caller path.
Validation: add one failing test before changing production code.
```

## Human Review Checkpoint

- confirm the cited files and code paths are real
- reject findings that depend on invented assumptions
- decide whether the change needs a security reviewer

## Validation Commands

```bash
git diff --stat
git diff -- path/to/file
npm test -- --runInBand path/to/focused.test.ts
```

## Failure Modes

- the prompt asks for a summary before findings
- the agent reviews generated files instead of source of truth
- the agent invents framework rules that the repo does not use
- reviewers accept speculative findings without checking the code

## Rollback or Recovery

- discard speculative review comments
- rerun the review with tighter scope and explicit files
- fall back to manual review for security-critical changes

## Completion Checklist

- confirmed findings fixed or intentionally deferred
- focused tests added where regressions were missing
- human reviewer approved the final diff

## Team Standard

AI review is advisory. Human reviewers own correctness, security, and merge approval.

## Verification Note

This page documents a review pattern. The example scenario is representative, not a claim that a real PR in this repository was reviewed end to end by every listed tool.

## Sources

- [Claude Code](../tools/claude-code.md)
- [OpenAI Codex](../tools/openai-codex.md)
- [GitHub Copilot](../tools/github-copilot.md)
- [Cursor](../tools/cursor.md)
