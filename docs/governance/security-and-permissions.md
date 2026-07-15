# Security and Permissions

This page is the baseline policy starter for AI coding tool access.

## Policy Objective

Reduce the risk of source-code leakage, destructive automation, and unsafe privilege sprawl when using coding agents or MCP integrations.

## Scope

- local repository access
- shell execution
- network access
- MCP integrations
- prompts that can modify systems

## Audience

- all contributors
- reviewers
- security approvers

## Definitions

- `Least privilege`: minimum access required for the task
- `Sensitive repo`: repo containing private code, secrets, regulated data, or production infrastructure
- `Destructive action`: delete, deploy, revoke, merge, publish, or data-changing operation

## Mandatory Requirements

- tools must start with the least access needed
- destructive actions require human review
- production credentials must not be pasted into prompts
- write-enabled MCP servers require explicit approval

## Recommended Controls

- use separate test accounts
- prefer read-only pilots
- keep repo instructions small and current
- log what validation commands were run

## Roles and Ownership

- tool user: chooses the narrowest safe scope
- reviewer: confirms human-checkpoint requirements were followed
- security owner: approves higher-risk integrations

## Approval Process

- read-only local repo access may be approved first
- shell, network, and write-enabled integrations require a higher review tier
- production-adjacent access requires a documented business reason

## Exception Process

Every exception should record owner, duration, repository scope, credentials involved, and rollback plan.

## Audit Evidence

- approved-tool matrix
- MCP evaluation record
- repo instruction files
- validation logs or PR evidence

## Enforcement

Unsafe prompts, over-broad credentials, or unapproved integrations should be removed or disabled immediately.

## Review Cadence

- review on every major tool or policy update
- at least quarterly for approved high-risk tools

## Incident Response

- stop the tool or integration
- rotate exposed credentials
- inspect logs, prompts, and changed artifacts
- document the corrective action

## Revocation Process

- remove access from the host
- revoke tokens or app grants
- remove unsafe shared prompts or config files

## Copy-Ready Policy Template

```md
All AI coding tools must use the least privilege required for the task.

Human review is mandatory before merge, deploy, destructive shell commands, permission changes, or write-enabled MCP actions.

Production credentials, customer data, and private secrets must not be supplied to prompts except through an approved secured workflow.
```

## Adoption Checklist

- least-privilege default documented
- destructive actions gated
- credential rules published
- revocation path tested

## Verification Note

Policy starter only. This page is not legal, compliance, or incident-response advice for every environment.

## Sources

- [SECURITY.md](../../SECURITY.md)
- [MCP Overview](../mcp/README.md)
