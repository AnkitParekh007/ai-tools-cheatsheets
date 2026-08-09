# Runnable Angular Copilot UX

Typed patterns become more useful when you can watch their state transitions in one product surface.

## New architecture concern

The question changes from **“What states should exist?”** to **“Do those states compose correctly when a real workflow moves through them?”**

A runnable reference should demonstrate at least:

- Ask / Plan / Execute / Debug style modes
- streaming messages
- grounded source cards
- visible tool timeline
- approval before risky execution
- explicit failed tool state
- retrieval failure with zero fabricated citations
- rejected approval with no execution-success state
- retry that keeps prior context understandable

## Why deterministic mock mode matters

A portfolio or reference demo should not require provider keys just to prove frontend architecture. Deterministic fixtures make the same success and failure states reproducible for tests, screenshots, accessibility review, and recruiter walkthroughs.

That does **not** make browser mocks production policy. It makes frontend behavior reviewable before a backend is connected.

## Reference implementation

Continue with **Angular AI Copilot Starter**:

https://github.com/AnkitParekh007/angular-ai-copilot-starter

The project is deliberately frontend-focused and explicit about what is mocked versus what is real Angular/TypeScript architecture.

## Next layer

When the runnable UX needs live retrieval, credentials, API keys, server approvals, and adapter contracts, move to [Full-stack copilot platform](full-stack-copilot-platform.md).
