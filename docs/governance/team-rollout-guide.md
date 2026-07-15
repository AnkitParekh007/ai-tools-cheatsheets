# Team Rollout Guide

This page is a copy-ready rollout framework for adopting AI coding tools in phases.

## Policy Objective

Introduce AI coding tools in a controlled sequence that balances speed, safety, and measurable engineering value.

## Scope

- CLI coding tools
- IDE assistants
- prompt libraries
- MCP integrations
- repo-level instruction files

## Audience

- engineering managers
- platform owners
- security reviewers

## Definitions

- `Pilot`: limited team or repo trial
- `Conditional`: approved with constraints
- `Approved`: generally allowed within documented boundaries

## Mandatory Requirements

- every phase must have an owner
- every approved tool must have a documented validation and rollback path
- human review remains mandatory for merge, deploy, or destructive actions

## Recommended Controls

- use one sandbox repo first
- separate read-only pilots from write-enabled pilots
- publish a short approved-tool matrix internally

## Roles and Ownership

- Engineering manager: adoption decision and budget owner
- Platform or DX owner: tool configuration and support
- Security reviewer: permission and data-flow review
- Team lead: local conventions and success criteria

## Approval Process

1. Evaluate one tool for one workflow.
2. Run a time-boxed pilot.
3. Review evidence and incidents.
4. Expand only if the pilot is useful and safe.

## Exception Process

Exceptions should document:

- tool name
- requested capability
- duration
- owner
- compensating controls

## Audit Evidence

- approved tool list
- instruction files in use
- pilot notes
- validation commands
- incident or rollback records

## Enforcement

Unapproved tools or MCP servers should not be used on sensitive repos or production-adjacent systems.

## Review Cadence

- quarterly for approved tools
- before major vendor or policy changes

## Incident Response

- suspend the tool or integration
- revoke credentials
- review what data or repositories were exposed
- update internal guidance before re-enabling

## Revocation Process

- remove tool access
- rotate or revoke tokens
- remove repo instructions if they are unsafe or stale

## Copy-Ready Policy Template

```md
## Team AI Tool Rollout Policy

We adopt AI coding tools in four phases: evaluation, pilot, conditional approval, and broad approval.

Every phase must name an owner, target workflow, validation command set, rollback path, and permission boundary.

No tool may receive production credentials, org-wide chat access, or write-enabled MCP access without explicit security review.
```

## Adoption Checklist

- owner assigned
- pilot scope defined
- validation commands recorded
- rollback path documented
- approval status published

## Verification Note

Policy starter only. Each organization must add named owners and enforcement mechanics.

## Sources

- [Approved Tools Policy](./approved-tools-policy.md)
- [MCP Approval Policy](./mcp-approval-policy.md)
