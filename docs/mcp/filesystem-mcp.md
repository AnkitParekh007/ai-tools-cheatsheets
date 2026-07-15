# Filesystem MCP

**Purpose:** evaluate filesystem-connected MCP servers for repository and local file access  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs reviewed; no specific filesystem server implementation approved from this repo

## Mode

Evaluation checklist.

## Typical Capabilities

- read files and directories
- search repository contents
- sometimes write, rename, move, or delete files

## Main Risks

- broad access to developer machines
- accidental reads outside the intended workspace
- destructive edits or file deletion

## Approval Questions

- can access be restricted to one directory
- can write or delete capabilities be disabled
- are symlinks or path traversal guarded
- does the host also allow shell execution through the same workflow

## Suggested Read-Only Trial

Restrict the server to one repository root and disable writes until the team has a clear review workflow.

## Least-Privilege Setup

- repo-scoped path allowlist
- read-only mode first
- no home-directory access
- separate approval for delete or move operations

## Revocation Plan

- remove the server config
- revoke any host-level permissions
- verify no broader directory mount remains

## Verification Status

Often the most immediately useful MCP category for coding work, but it can also be the easiest way to overshare a developer workstation.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/specification/2025-06-18/server/tools
