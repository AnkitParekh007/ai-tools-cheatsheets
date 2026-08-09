# Enterprise Agent Workspace

An agent platform becomes an enterprise operating problem when many roles, connectors, tools, browser workers, and pilot teams share the same system.

## New architecture concerns

The architecture now needs to coordinate:

- role and permission boundaries
- multiple agent personas
- RAG and context services
- MCP/tool registries
- human approval flows
- browser/Playwright workers
- connector health
- pilot rollout and feedback
- readiness aggregation
- observability and diagnostics
- degraded dependency behavior

Enterprise resilience should be visible. If retrieval, a provider, a browser worker, or a readiness dependency fails, the workspace should surface a failed/degraded state rather than silently converting it into success.

## Governance rule

Frontend visibility does not create permission. A UI may render a proposed tool, but the backend remains authoritative for role checks, tool allowlists, approvals, provider access, browser dispatch, and audit logging.

## Reference implementation

Continue with **Org AI Force**:

https://github.com/AnkitParekh007/org-ai-force

It is an architecture/prototype workspace combining Angular, NestJS, role-aware surfaces, RAG-ready services, MCP-style tools, browser workers, admin governance, pilot operations, readiness, and diagnostics.

## Return to the handbook

Use the implementation repos to study application architecture, then return to this handbook for the engineering-tool layer:

- [MCP guidance](../mcp/README.md)
- [Security and permissions](../governance/security-and-permissions.md)
- [Team rollout guide](../governance/team-rollout-guide.md)
- [Engineering workflows](../workflows/README.md)
- [Repository instruction files](../configs/README.md)
