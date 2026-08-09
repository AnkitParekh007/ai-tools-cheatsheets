# From AI Coding Tools to AI Application Architecture

This handbook helps you use AI engineering tools well. The next architecture problem begins when AI stops being a developer assistant and becomes part of the product itself.

Use this path to move from **tool adoption** to **trustworthy frontend state**, **runnable AI UX**, **full-stack copilot boundaries**, **governed agent lifecycle**, and finally **enterprise agent operations**.

```text
AI coding tools and workflows
        ↓
Trustworthy AI frontend state
        ↓
Runnable Angular copilot UX
        ↓
Full-stack copilot platform
        ↓
Governed agent lifecycle
        ↓
Enterprise agent workspace
```

| Stage | New architecture problem | Continue with |
| --- | --- | --- |
| Tool adoption | How do engineers use agents safely and repeatably? | This handbook |
| Frontend state | How does the UI represent streaming, evidence, tools, approvals, and recovery? | [Trustworthy AI frontend state](trustworthy-ai-frontend-state.md) |
| Runnable UX | How do those patterns behave together in a working application? | [Runnable Angular copilot](runnable-angular-copilot.md) |
| Full-stack boundary | Which responsibilities belong in the browser vs backend? | [Full-stack copilot platform](full-stack-copilot-platform.md) |
| Agent governance | How are versions, approvals, publications, runtimes, and revocation controlled? | [Governed agent lifecycle](governed-agent-lifecycle.md) |
| Enterprise operations | How do RBAC, RAG, tools, workers, readiness, and observability work together? | [Enterprise agent workspace](enterprise-agent-workspace.md) |

## What changes at each layer

### Tools → product state

`AGENTS.md`, prompts, MCP, coding agents, and workflows improve engineering work. Product AI adds persistent user-visible state: partial streams, citations, proposed actions, approval boundaries, failures, retries, and auditability.

### Product state → executable UX

Individual patterns are easier to reason about than complete flows. A runnable reference shows whether state transitions remain understandable when retrieval fails, approval is rejected, or a tool errors.

### Executable UX → backend boundary

Once tools or sensitive data are involved, browser-only trust is insufficient. Credentials, retrieval authorization, tool policy, approval enforcement, idempotency, and audit logging move behind a server boundary.

### Backend boundary → governed agents

Long-lived agents introduce immutable versions, review/approval, publication channels, runtime adapters, revocation, provisioning retries, and separation of duties.

### Governed agents → enterprise operations

Organization-wide use adds role-aware workspaces, connector governance, browser workers, readiness, observability, pilot rollout, and degraded-dependency behavior.

## Why these pages link out

The handbook intentionally does not duplicate application source code. Each bridge page explains the architecture problem and then links to a focused public implementation repository where that layer can be inspected and run.
