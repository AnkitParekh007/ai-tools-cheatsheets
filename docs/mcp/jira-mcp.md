# Jira MCP

**Purpose:** evaluate Jira-connected MCP servers for issue search, planning, and workflow updates  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** official MCP docs plus Atlassian auth and security docs reviewed; no specific Jira MCP server approved from this repo

## Mode

Evaluation checklist.

## Typical Capabilities

- search issues
- read fields, comments, and statuses
- create or update work items
- transition workflows or add comments

## Main Risks

- issue data can include confidential customer or roadmap details
- write scopes can change workflow state or leak information through comments
- org-wide Atlassian tokens can exceed the intended project boundary

## Approval Questions

- is the server restricted to one Jira site or multiple sites
- does it use scoped OAuth or a broad API token
- can it create, edit, transition, or delete issues
- does it expose comments and attachments

## Suggested Read-Only Trial

Allow search and issue-read operations against a non-sensitive project first. Delay create or transition permissions until the workflow and audit trail are understood.

## Revocation Plan

- revoke the Atlassian token or OAuth grant
- remove the server from the host
- confirm cached credentials are cleared

## Verification Status

Treat Jira MCP as useful for planning and triage, but high-context issue content often makes least-privilege scoping difficult.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://developer.atlassian.com/cloud/jira/software/oauth-2-3lo-apps/
- https://developer.atlassian.com/cloud/jira/platform/security-overview/
- https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/
