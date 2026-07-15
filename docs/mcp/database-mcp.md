# Database MCP

**Purpose:** evaluate generic database-connected MCP servers for schema inspection and query workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs reviewed; this page is category-level guidance only

## Mode

Evaluation checklist.

## Typical Capabilities

- inspect schemas and tables
- run read queries
- sometimes run write or administrative statements

## Main Risks

- exposure of production or customer data
- destructive SQL
- schema changes through a conversational interface

## Approval Questions

- read-only or write-enabled
- environment separation between dev, staging, and prod
- query timeouts and row limits
- audit logging and revocation

## Suggested Read-Only Trial

Connect only to a development or sanitized dataset first. Deny DDL and destructive statements until the review model is mature.

## Revocation Plan

- revoke database credentials
- rotate secrets if necessary
- remove the connection from the host config

## Verification Status

Treat generic database MCP as high-risk by default because the gap between read help and destructive power is often small.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://www.postgresql.org/docs/current/ddl-priv.html
