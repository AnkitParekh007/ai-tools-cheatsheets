# Security MCP

**Purpose:** evaluate security-oriented MCP servers for scanning, policy review, or secret-detection workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Needs verification  
**Verification scope:** category guidance only; implementation behavior can vary widely

## Mode

Evaluation checklist.

## Typical Capabilities

- code scanning
- secret detection
- dependency or policy checks
- incident or finding triage

## Main Risks

- false confidence from incomplete findings
- export of private source code or security data
- write actions such as issue creation or ticket updates without review

## Approval Questions

- does the server only analyze or can it also mutate systems
- where are findings stored
- does it transmit full source code externally
- what credentials or scopes are required

## Suggested Read-Only Trial

Use scan-only mode against a non-sensitive repo or a sanitized code sample first. Keep remediation and ticket-writing actions out of the pilot.

## Revocation Plan

- revoke API access
- remove the host config
- delete uploaded or cached findings where supported

## Verification Status

Security-themed integrations are not automatically safer than other MCP servers. Treat them as privileged data processors until proven otherwise.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/specification/2025-06-18/server/tools
