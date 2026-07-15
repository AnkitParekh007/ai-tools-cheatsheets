# CI/CD Automation

Use this workflow when a CI or deployment job fails and you want the agent to help analyze logs without blindly rerunning pipelines.

## Objective

Move from failed job context to root cause, minimal patch, and a safe rerun plan.

## Audience

- platform engineers
- maintainers of GitHub Actions or other CI systems
- contributors debugging red checks before merge

## When to Use

- a job has already failed and logs are available
- the failure is narrow enough to isolate
- reruns or redeploys have a real cost

## When Not to Use

- when no logs or job artifacts are available
- when the failure requires production secrets you cannot access
- when the change should be rolled back immediately instead of debugged in place

## Preconditions

- failed job name and log excerpt
- current workflow file
- a plan for the narrowest safe rerun

## Required Context

- workflow YAML
- failing step output
- any recent changes to dependencies, caches, or scripts
- repository build commands

## Recommended Tools

- Claude Code or Codex for cross-file workflow debugging
- GitHub-aware tools when the job metadata and annotations are available

## Step-by-Step Workflow

1. Capture the exact failed job, step, and exit code.
2. Ask the agent to classify the failure: syntax, environment, dependency, cache, permissions, or flaky test.
3. Inspect the smallest workflow and script surface that explains the error.
4. Patch only the root cause, not unrelated warnings.
5. Re-run the narrowest job or validation command locally if possible.
6. Rerun CI only after the local explanation is coherent.

## Reusable Prompt

```text
Debug this failed CI job.
Start with the exact failing step, likely root cause, and the smallest safe patch.
Do not suggest rerunning the whole pipeline until you explain why the current failure happened.
Include the narrowest validation command and safe rerun guidance.
```

## Example Input

- job: `validate-docs`
- failing step: `npm run docs:links`
- error: internal anchor no longer exists after a heading rename

## Expected Agent Output

- one-line failure classification
- exact file and line causing the break
- minimal patch
- safe rerun guidance such as “rerun the docs validation job only”

## Human Review Checkpoint

- confirm the logs actually support the claimed root cause
- review permission changes separately from syntax or content fixes
- ensure retries are not masking a deterministic bug

## Validation Commands

```bash
npm run docs:validate
npm run docs:build
```

## Failure Modes

- treating a flaky network warning as the root cause
- rerunning the entire workflow before understanding the failure
- broad workflow rewrites when one step or script broke

## Rollback or Recovery

- revert the workflow patch
- disable the newly added step temporarily with documented follow-up
- restore the last green workflow definition if the failure blocks release

## Completion Checklist

- root cause explained
- minimal patch applied
- local or pre-merge validation passed
- rerun scope kept narrow

## Team Standard

Do not use AI to justify blind reruns. Use it to compress log analysis and reduce the patch scope.

## Verification Note

This workflow is a general CI debugging pattern. Account-backed CI metadata and rerun permissions vary by host.

## Sources

- [OpenAI Codex](../tools/openai-codex.md)
- [Claude Code](../tools/claude-code.md)
- [GitHub Copilot](../tools/github-copilot.md)
