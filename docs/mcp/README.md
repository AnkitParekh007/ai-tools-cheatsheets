# MCP Overview

This section treats MCP servers as privileged integrations, not lightweight plugins.

## Who This Section Is For

- engineers evaluating MCP-enabled workflows
- platform and security reviewers approving new integrations
- teams deciding whether a server should stay read-only, pilot-only, or prohibited

## How To Read This Section

Most pages in this section are evaluation checklists, not verified installation guides. That is intentional.

Use a page as a verified implementation guide only when the repository can responsibly identify one implementation, its maintainer, host support, permissions, and revocation path.

## Best First Pages

| Page | Purpose | Maturity |
| --- | --- | --- |
| [What is MCP?](./overview.md) | understand the protocol and trust boundary | Most mature |
| [Useful MCP Servers](./useful-mcp-servers.md) | choose categories worth evaluating | Strong |
| [GitHub MCP](./github-mcp.md) | repo and PR access evaluation | Strong |
| [Filesystem MCP](./filesystem-mcp.md) | local file and shell risk framing | Strong |
| [Supabase / Postgres MCP](./supabase-postgres-mcp.md) | database access evaluation | Strong |

## Recommended Reading Order

1. Read [What is MCP?](./overview.md).
2. Read [Security and Permissions](../governance/security-and-permissions.md).
3. Read [MCP Approval Policy](../governance/mcp-approval-policy.md).
4. Only then evaluate a category-specific page.

## Current Limitations

- host behavior differs across clients
- many servers are community maintained
- account, plan, or network constraints often block local verification
- protocol support can be newer than an organization's approval process

## Verification Note

Unless a page explicitly says otherwise, MCP pages here are `Documentation verified` or `Needs verification`. Treat them as approval aids, not deployment approvals.

## Sources

- [What is MCP?](./overview.md)
- [MCP Approval Policy](../governance/mcp-approval-policy.md)
