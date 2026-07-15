# Bitbucket MCP

**Purpose:** evaluate Bitbucket-connected MCP servers for repository and pull-request workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Needs verification  
**Verification scope:** protocol docs reviewed; implementation and Bitbucket-specific approval patterns require deeper verification

## Mode

Evaluation checklist.

## Typical Capabilities

- read repositories and pull requests
- inspect branches, commits, and comments
- optionally write comments or create pull requests

## Main Risks

- source-code exposure
- broad SCM write permissions
- unclear separation between workspace-wide and repo-specific access

## Approval Questions

- what auth model is used
- can the server stay read-only
- what workspace or repo scope is granted
- can it write PR comments, branches, or merges

## Suggested Read-Only Trial

Read one non-sensitive repo and one pull request. Avoid write access until reviewers understand the server's action model.

## Revocation Plan

- revoke app or token access
- remove workspace authorization
- remove local host configuration

## Verification Status

Useful category, but this page remains a cautious checklist until a specific implementation is reviewed.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://developer.atlassian.com/
