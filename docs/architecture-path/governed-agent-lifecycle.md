# Governed Agent Lifecycle

A copilot session is temporary. A managed agent becomes a durable governed object that may be reviewed, approved, published, revoked, and executed through more than one runtime provider.

## New architecture concerns

Agent platforms need explicit lifecycle policy for:

- immutable versions
- review and separation of duties
- approval / rejection / superseding
- current-approved-version selection
- runtime provider abstraction
- asynchronous provisioning
- retry and idempotency
- signed/replay-safe callbacks
- publication channels
- revocation and terminated-agent behavior
- audit trails and secrets

A stale client must not be able to execute an old version merely because that version was approved in the past.

## Useful invariant

> A runtime session or publication grant is usable only when it references the current approved immutable version and has not been revoked or superseded.

Similarly, a failed provisioning operation should be retried as a new attempt while retaining a stable idempotency identity for the same agent/version/channel intent.

## Reference implementation

Continue with **Agent Studio**:

https://github.com/AnkitParekh007/agent-studio

The repository models a provider-neutral agent domain, control plane, hosted applications, desktop shell, worker queue, runtime adapters, RBAC, review flows, and publication lifecycle.

## Next layer

When many governed agents must coexist with organizational roles, tools, RAG, browser workers, readiness, and operational diagnostics, continue to [Enterprise agent workspace](enterprise-agent-workspace.md).
