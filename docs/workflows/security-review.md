# Security Review

Use this workflow when a change touches permissions, secrets, auth, data movement, MCP access, or destructive commands.

## Objective

Find security-relevant risks early and require human verification before merge or rollout.

## Audience

- reviewers
- security-conscious maintainers
- teams approving new MCP or automation patterns

## When to Use

- auth or authorization changes
- workflow or CI permission changes
- prompt or MCP flows that can exfiltrate data
- docs that teach sensitive commands

## When Not to Use

- as a substitute for a real security review on high-risk systems
- when the agent cannot inspect the relevant code or workflow

## Preconditions

- change scope identified
- threat surface understood

## Required Context

- changed code or docs
- permissions granted
- credentials involved
- rollback path

## Recommended Tools

- repo-aware CLI agents for findings-first review

## Step-by-Step Workflow

1. Ask for findings first.
2. Focus on auth, secrets, injection, data movement, and destructive actions.
3. Require the agent to state uncertainty.
4. Escalate high-risk findings to a human reviewer.

## Reusable Prompt

```text
Review this change for auth, secrets, validation, access control, injection, unsafe automation, and data-exfiltration risk.
List findings first with severity, affected file, and validation step.
```

## Example Input

- new MCP config with write access to a private repo

## Expected Agent Output

- permission and trust risks
- least-privilege recommendations
- human approval checkpoints

## Human Review Checkpoint

- confirm the change does not widen permissions silently
- review credential handling manually

## Validation Commands

```bash
npm run docs:validate
```

## Failure Modes

- treating policy text as proof of actual security
- accepting speculative vulnerability claims without code evidence

## Rollback or Recovery

- revert the permission-widening change
- remove the unsafe docs guidance

## Completion Checklist

- risks reviewed
- approvals recorded
- rollback path known

## Team Standard

Any change that widens access or destructive power requires human approval.

## Verification Note

This workflow is a review pattern and does not replace a formal application security assessment.

## Sources

- [Security and Permissions](../governance/security-and-permissions.md)
- [MCP Approval Policy](../governance/mcp-approval-policy.md)
