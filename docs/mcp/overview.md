# What is MCP?

**Purpose:** explain the Model Context Protocol and why it changes the trust model for coding assistants  
**Official/source link:** https://modelcontextprotocol.io/docs/getting-started/intro  
**Maintainer:** Model Context Protocol project  
**License:** Requires verification at implementation level  
**Last verified:** 2026-07-14  
**Status:** Documentation verified  
**Verification scope:** official MCP docs and specification reviewed; no live server connected from this repository

## Purpose

MCP is an open protocol for connecting AI applications to external systems such as files, APIs, databases, browsers, or custom tools.

## Why It Matters

An ordinary prompt can only use the context you paste into the model. An MCP-enabled agent can ask external systems for more context or trigger actions through exposed tools. That makes the protocol powerful and risky at the same time.

## Typical Use Cases

- repository and issue access
- browser automation
- database queries
- ticketing workflows
- internal search and retrieval

## Core Risk

Once a host connects to an MCP server, the agent may be able to:

- read private data
- write to external systems
- execute privileged operations indirectly
- exfiltrate data through tool calls or logs

## Evaluation Questions

- who maintains the server
- what credentials it requires
- what tools it exposes
- whether it can write, delete, or execute
- where data travels
- how access is revoked

## Least-Privilege Starting Point

Start with:

- a read-only server if possible
- the narrowest credentials available
- a sandbox or test workspace
- explicit human approval for destructive actions

## Verification Status

MCP itself is well documented, but individual server implementations vary widely in quality and risk. This repository only treats category pages as evaluation guides unless a specific implementation is responsibly verified.

## Sources

- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/docs/learn/architecture
- https://modelcontextprotocol.io/specification/2025-06-18/server/tools
- https://modelcontextprotocol.io/specification/draft/basic/authorization
