# Slack / Teams MCP

**Purpose:** evaluate chat and collaboration MCP servers for messaging, alerts, and conversation context  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs plus Slack and Microsoft permission docs reviewed; no specific chat MCP server approved from this repo

## Mode

Evaluation checklist.

## Typical Capabilities

- read channels or threads
- post messages or replies
- search discussion context
- optionally access files, mentions, or user metadata

## Main Risks

- private chat history exposure
- accidental message posting or data leakage
- org-wide scopes larger than the intended team boundary

## Approval Questions

- which channels or teams are in scope
- are permissions delegated or app-wide
- can the server post messages or only read
- can it access files and attachments

## Suggested Read-Only Trial

Pilot with a non-sensitive channel or test team. Approve read access before post or reply capabilities.

## Revocation Plan

- revoke the Slack or Microsoft app consent
- rotate tokens if used
- remove the server from the host config

## Verification Status

Useful for triage and collaboration context, but often too broad for an initial AI rollout unless carefully scoped.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://api.slack.com/scopes
- https://api.slack.com/authentication/oauth-v2
- https://learn.microsoft.com/en-us/graph/permissions-overview
- https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/app-permissions/teams-app-permissions
