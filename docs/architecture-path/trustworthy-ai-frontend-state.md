# Trustworthy AI Frontend State

AI coding tools help engineers produce code. AI product interfaces introduce a different problem: **the user must understand what the AI is doing while the answer is still incomplete**.

## New architecture concerns

A trustworthy AI frontend needs explicit state for:

- streaming and interruption
- retrieval and citation provenance
- tool planning and execution visibility
- human approval before sensitive actions
- context serialization
- retry/recovery
- accessibility and assistive announcements
- backend enforcement boundaries

A chat transcript alone cannot represent those concerns reliably.

## Questions to answer before implementation

1. Can a partial stream be distinguished from a completed answer?
2. Can the UI suppress citations when retrieval did not succeed?
3. Is a planned tool different from an executed tool?
4. Can rejection remain terminal instead of accidentally showing success?
5. Can users understand what context will be retried?
6. Are state changes communicated without relying only on color?
7. Which policies are rendered in the browser, and which are enforced on the server?

## Reference implementation

Continue with **Frontend AI Patterns**:

https://github.com/AnkitParekh007/frontend-ai-patterns

It separates reusable TypeScript contracts, fixtures, Angular composition examples, approval/recovery patterns, and a deterministic pattern playground from backend policy enforcement.

## Next layer

Once the state model is clear, see [Runnable Angular copilot](runnable-angular-copilot.md) to inspect how those concerns behave together in one application.
