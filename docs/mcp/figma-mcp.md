# Figma MCP

**Purpose:** evaluate Figma-connected MCP servers for design context, file inspection, and handoff workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs plus Figma auth and scope docs reviewed; no specific server implementation approved from this repo

## Mode

Evaluation checklist.

## Typical Capabilities

- inspect files, nodes, and comments
- extract design metadata
- support implementation handoff

## Main Risks

- broad access to product design files
- exposure of unreleased designs or stakeholder comments
- org-level tokens or plan tokens can exceed the intended scope

## Approval Questions

- is auth based on personal access, OAuth, or plan access tokens
- which scopes are requested
- can the server read only the files needed for the task
- does it access org or enterprise-level data

## Suggested Read-Only Trial

Approve read access to a test design file or one low-risk project before exposing broad workspace content.

## Revocation Plan

- revoke the OAuth app or token
- rotate any organization-level token if used
- remove the host config entry

## Verification Status

Good fit for engineering handoff, but keep access narrow because design files often include unreleased product context.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://developers.figma.com/docs/rest-api/oauth-apps/
- https://developers.figma.com/docs/rest-api/scopes/
- https://developers.figma.com/docs/rest-api/plan-access-tokens/
