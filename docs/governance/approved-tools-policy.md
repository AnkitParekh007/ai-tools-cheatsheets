# Approved Tools Policy

This page is a policy starter for classifying AI coding tools by approval state.

## Policy Objective

Give contributors a clear answer on which tools are approved, conditional, pilot-only, prohibited, or deprecated.

## Scope

- coding assistants
- repo instruction files
- prompt libraries
- MCP integrations

## Audience

- contributors
- reviewers
- team leads

## Definitions

- `Approved`: allowed within documented boundaries
- `Conditional`: allowed with constraints
- `Pilot`: time-boxed limited evaluation
- `Prohibited`: not allowed
- `Deprecated`: avoid for new work and phase out

## Mandatory Requirements

- every listed tool must have an owner
- conditional approvals must name constraints
- prohibited tools must include the reason

## Recommended Controls

- publish one internal matrix with status, owner, and review date
- separate tool approval from MCP-server approval

## Approval Process

- evaluate
- pilot
- assign status
- review quarterly

## Exception Process

Teams requesting exceptions must document business need, duration, and compensating controls.

## Audit Evidence

- approval matrix
- pilot notes
- security review links

## Enforcement

Unlisted or prohibited tools should not be used on sensitive repos without an explicit exception.

## Copy-Ready Policy Template

```md
## Approved AI Coding Tools

- Approved:
- Conditional:
- Pilot:
- Prohibited:
- Deprecated:

Each entry must name an owner, review date, and constraints where applicable.
```

## Adoption Checklist

- tool matrix published
- owners named
- review dates set

## Verification Note

Policy starter only. Every organization must fill in the actual tool list and approval status.

## Sources

- [Team Rollout Guide](./team-rollout-guide.md)
- [Security and Permissions](./security-and-permissions.md)
