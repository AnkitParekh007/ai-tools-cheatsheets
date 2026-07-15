# Useful MCP Servers

**Purpose:** identify the MCP server categories most useful to engineering teams  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** category-level overview only  
**License:** Varies by implementation  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs reviewed; category list is an editorial evaluation aid, not an approved implementation catalog

## Recommended Categories

| Category | Typical value | Main risk |
| --- | --- | --- |
| GitHub | PRs, issues, repo metadata, code review context | repo write access and private code exposure |
| Browser / Playwright | UI validation, screenshots, form flows | account/session access and destructive clicks |
| Filesystem | repo-local read/write workflows | broad file access and shell-adjacent actions |
| Database / Postgres | schema inspection and query help | data leakage and destructive SQL |
| Jira / Bitbucket | work tracking and SCM metadata | token scope sprawl and ticket-data exposure |
| Slack / Teams | alerting and collaboration context | message history exposure and impersonation risk |
| Figma | design context and handoff | broad file and team access |

## Team Recommendation

Evaluate categories in this order:

1. GitHub
2. Filesystem
3. Browser / Playwright
4. Database or Postgres
5. Ticketing and chat integrations

The first four categories usually provide the highest engineering value with the clearest approval questions.

## What To Avoid Early

- org-wide chat access
- write-enabled production databases
- MCP servers that proxy arbitrary shell execution
- integrations with unclear maintainers or no revocation story

## Verification Note

Use this page to prioritize evaluation, not to approve a server without implementation-level review.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/docs/learn/architecture
