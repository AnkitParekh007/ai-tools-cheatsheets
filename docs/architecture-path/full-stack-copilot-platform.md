# Full-Stack Copilot Platform

A polished frontend becomes a platform architecture problem when it needs real model credentials, retrieval, ingestion, approvals, API keys, and tool execution.

## New architecture concern

The critical question becomes **“Which responsibilities must stay off the browser?”**

A production-shaped copilot backend should own:

- model/provider credentials
- retrieval authorization
- ingestion and indexing
- API-key/session validation
- structured streaming contracts
- tool authorization and execution
- approval enforcement
- idempotency and audit logging
- normalized errors and retry semantics

The Angular UI should render these contracts, not become the source of truth for them.

## Trust boundary to review

```text
Angular application
        ↓ typed events / requests
Copilot backend
  ├── auth
  ├── retrieval
  ├── approvals
  ├── tools
  ├── provider adapters
  └── audit / observability
        ↓
Models · data · enterprise systems
```

Failure behavior matters as much as success: a disconnected stream must not look complete, retrieval failure must not fabricate citations, rejected approval must remain non-executed, and a disabled tool must stay visible as disabled.

## Reference implementation

Continue with **ngx-copilot-platform**:

https://github.com/AnkitParekh007/ngx-copilot-platform

It combines a publishable Angular SDK with a backend boundary for auth, retrieval, streaming, API-key lifecycle, approvals, and adapter-driven integration.

## Next layer

When agents become durable governed objects with versions and publication lifecycles, continue to [Governed agent lifecycle](governed-agent-lifecycle.md).
