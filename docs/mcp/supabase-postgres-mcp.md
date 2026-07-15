# Supabase / Postgres MCP

**Purpose:** evaluate Supabase or Postgres-connected MCP servers for schema, query, and troubleshooting workflows  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** varies by implementation  
**License:** Requires verification  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** protocol docs, Supabase security docs, and PostgreSQL role docs reviewed; no specific server implementation approved from this repo

## Mode

Evaluation checklist.

## Typical Capabilities

- inspect schemas and migrations
- run read queries
- review policies or indexes
- sometimes write rows or execute DDL

## Main Risks

- service-role or secret-key misuse
- bypassing RLS
- broad database-role privileges
- accidental production data exposure

## Approval Questions

- does the server use a publishable or secret credential path
- can it connect only to development or staging
- does it respect RLS expectations
- can it create or alter schema objects

## Suggested Read-Only Trial

Read metadata and run low-risk select queries against development data first. Delay write access and schema mutations until role boundaries are understood.

## Least-Privilege Setup

- prefer development projects first
- never expose service-role or secret keys to frontend contexts
- use dedicated low-privilege database roles where possible
- cap query limits and timeouts

## Revocation Plan

- revoke or rotate API keys
- rotate database credentials
- remove the host config and invalidate cached sessions

## Verification Status

High-value category for engineering teams, but it should stay under tight least-privilege control because the wrong credential can bypass intended access boundaries.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/database/secure-data
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://www.postgresql.org/docs/current/user-manag.html
- https://www.postgresql.org/docs/current/ddl-priv.html
