# Browser / Playwright MCP

**Purpose:** evaluate browser-automation MCP servers for UI validation, screenshots, and scripted interaction  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs reviewed; no generic browser server should be treated as safe without host and session review

## Mode

Evaluation checklist.

## Typical Capabilities

- open pages
- click, type, and submit forms
- capture screenshots
- inspect DOM or console state

## Main Risks

- active sessions and cookies may expose private accounts
- destructive UI actions can happen with normal user permissions
- screenshots can capture sensitive data

## Approval Questions

- can the server be restricted to localhost or test domains
- can it avoid shared browser profiles
- are screenshots and logs stored anywhere
- can it perform file uploads or downloads

## Suggested Read-Only Trial

Start with localhost or a test environment and use screenshot-only or inspection-first flows before allowing form submission.

## Least-Privilege Setup

- separate browser profile
- test account
- non-production environment
- no saved payment methods or sensitive sessions

## Revocation Plan

- close the browser profile
- revoke app sessions if a real account was used
- remove the server from the host

## Verification Status

High value for UI validation, but high risk if used against real logged-in environments without tight controls.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/specification/2025-06-18/server/tools
