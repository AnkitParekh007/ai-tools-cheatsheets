# MCP Approval Policy

This page is a copy-ready policy starter for approving MCP servers.

## Policy Objective

Control privileged integrations that can read, write, or execute beyond the model's built-in context.

## Scope

- third-party MCP servers
- internally built MCP servers
- remote and local hosts

## Audience

- platform owners
- security reviewers
- engineering managers

## Definitions

- `Tier 1`: read-only, repo-local, low-sensitivity
- `Tier 2`: write-capable or broader read scope
- `Tier 3`: production-adjacent, credentialed, or destructive capability

## Mandatory Requirements

- every MCP server must have a named owner
- every approval must document read, write, execute, and network capability
- Tier 2 and Tier 3 servers require explicit approval and expiry

## Recommended Controls

- prefer read-only pilots
- review maintainer identity and license
- document credentials, network destinations, and revocation steps
- require separate approval for destructive tool calls

## Approval Authority

- Tier 1: team lead or platform owner
- Tier 2: platform owner plus security review
- Tier 3: security approval plus manager or platform sign-off

## Evidence Required

- server repository and maintainer
- license
- tool list
- read/write/execute matrix
- credential path
- pilot scope
- rollback and revocation plan

## Exception Process

Exceptions must document:

- business need
- duration
- data classification
- compensating controls

## Review Cadence

- Tier 1: quarterly
- Tier 2: quarterly or after scope change
- Tier 3: before each renewal window and after any permission change

## Incident Response

- revoke the server immediately
- rotate credentials
- review logs and exposed systems
- update the approval record with lessons learned

## Revocation

- remove host configuration
- revoke grants or tokens
- suspend the upstream app if used

## Copy-Ready Policy Template

```md
No MCP server may be used against private or production-adjacent systems without a documented approval record.

Every server must record:
- maintainer
- license
- host
- credentials
- read/write/execute capabilities
- data classification
- pilot scope
- approval expiry
- revocation path
```

## Adoption Checklist

- risk tier assigned
- owner named
- approval record completed
- expiry date set
- revocation tested

## Verification Note

Policy starter only. Organizations should add compliance, legal, and incident-response requirements as needed.

## Sources

- [MCP Overview](../mcp/README.md)
- [Custom MCP Template](../mcp/custom-mcp-template.md)
