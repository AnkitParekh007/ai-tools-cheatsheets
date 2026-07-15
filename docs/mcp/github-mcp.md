# GitHub MCP

**Purpose:** evaluate GitHub-connected MCP servers for repositories, pull requests, issues, and code review workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** official MCP docs plus GitHub app security and permission docs reviewed; no specific server implementation approved from this repo

## Mode

This page is an MCP evaluation checklist, not a verified installation guide.

## Typical Capabilities

- read repository metadata
- read or comment on pull requests and issues
- inspect checks, annotations, and commit history
- optionally write comments, labels, branches, or pull requests

## Approval Questions

- does the server authenticate as a GitHub App, OAuth app, PAT-backed proxy, or something else
- can it operate in read-only mode
- which repository and organization permissions are required
- can it create branches, push commits, or open PRs
- how are tokens stored and rotated

## Suggested Read-Only Trial

Start with a server that can only:

- read repository contents
- read pull requests
- read issues
- read checks

Do not approve write permissions until review comments, branch creation, and rollback expectations are documented.

## Least-Privilege Checklist

- prefer GitHub App permissions over broad personal tokens
- scope access to specific repos where possible
- require separate approval for issue/PR write access
- log what tool calls can mutate repo state

## Revocation Plan

- uninstall or suspend the GitHub App
- revoke tokens
- remove the server from host configuration
- recheck repo webhooks or org approvals if applicable

## Verification Status

Useful category, but implementation quality varies. Treat write access as a separate approval tier from read-only review access.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app
- https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app
- https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps
