# AI Architecture Ecosystem Contribution Map

The handbook is the discovery layer for a wider set of open-source AI engineering projects. Use this map to choose the repository where your contribution will have the clearest technical impact.

The ecosystem follows one progression:

**Learn → Pattern → Run → Platform → Govern → Operate**

## Choose by the problem you want to solve

| You want to improve… | Best repository | Typical contribution |
| --- | --- | --- |
| AI coding workflows, prompts, MCP guidance, tool comparisons | [`ai-tools-cheatsheets`](https://github.com/AnkitParekh007/ai-tools-cheatsheets) | source-backed docs, verification, examples, workflow improvements |
| trustworthy AI frontend state and reusable contracts | [`frontend-ai-patterns`](https://github.com/AnkitParekh007/frontend-ai-patterns) | pattern contracts, fixtures, accessibility, recovery states, starter packs |
| polished Angular copilot UX | [`angular-ai-copilot-starter`](https://github.com/AnkitParekh007/angular-ai-copilot-starter) | Angular UI, accessibility, responsive behavior, deterministic scenarios, screenshots |
| full-stack Angular AI SDK/backend integration | [`ngx-copilot-platform`](https://github.com/AnkitParekh007/ngx-copilot-platform) | SDK contracts, streaming, RAG, approvals, adapter failures, backend tests |
| governed agent lifecycle and publication | [`agent-studio`](https://github.com/AnkitParekh007/agent-studio) | lifecycle policy, RBAC, provisioning, runtime adapters, deployment, security tests |
| enterprise agent workspace and operations | [`org-ai-force`](https://github.com/AnkitParekh007/org-ai-force) | orchestration, readiness, RAG/tools, browser workers, operations UX, resilience |

## Contribution paths

### Documentation-first contributor

Start here:

1. improve a source-backed page in `ai-tools-cheatsheets`;
2. add or clarify one architecture pattern in `frontend-ai-patterns`;
3. document the implementation bridge to the runnable Angular starter.

This path is ideal when you want a focused first PR without setting up a full application stack.

### Frontend contributor

Start with:

1. `frontend-ai-patterns` for contracts and state models;
2. `angular-ai-copilot-starter` for visual Angular implementation;
3. `ngx-copilot-platform` when you want the frontend/backend contract boundary.

High-value areas include:

- keyboard and screen-reader behavior
- streaming state transitions
- citation/source UX
- tool timeline clarity
- approval/rejection states
- retry/recovery UX
- responsive layouts
- deterministic fixture/test coverage

### Backend / platform contributor

Start with `ngx-copilot-platform` or `agent-studio`.

Useful contribution themes:

- typed API contracts
- semantic failure responses
- auth/RBAC boundaries
- idempotency
- retry policy
- auditability
- provider/runtime adapters
- secrets and configuration validation
- deployment verification

### Agent / operations contributor

Start with `agent-studio` for governed lifecycle work or `org-ai-force` for enterprise workspace/orchestration work.

Useful themes:

- immutable version policy
- approval/separation of duties
- provisioning callbacks
- publication/revocation
- agent orchestration
- readiness and health surfaces
- browser worker failure modes
- degraded dependency handling

## What makes a strong contribution

Across the ecosystem, prefer contributions that are:

- **small enough to review** — one focused problem per PR;
- **explicit about boundaries** — mock/demo behavior should stay labeled;
- **testable** — add deterministic tests when behavior changes;
- **accessible** — UI work should include keyboard and assistive-technology considerations;
- **security-aware** — frontend visibility never substitutes for backend authorization;
- **evidence-backed** — docs should cite primary/official sources where external facts matter;
- **honest about failure** — unsuccessful operations must not become success states.

## Suggested first contributions

If you are unsure where to start, choose one of these shapes:

- improve one command/source/verification note in the handbook;
- add one deterministic failure scenario to an AI frontend example;
- improve one RAG citation or tool-timeline accessibility behavior;
- add one lifecycle edge-case test to Agent Studio;
- add one enterprise degraded-dependency test to Org AI Force;
- capture or refresh a recruiter-quality screenshot/GIF using the repository's public-proof guide.

## Review before opening a PR

In the target repository:

1. read `CONTRIBUTING.md`;
2. check existing issues for `good first issue` or `help wanted`;
3. run the repository's documented validation commands;
4. keep generated secrets, API keys, and local environment files out of the commit;
5. explain what changed, why, testing, screenshots when visual, and any security/trust impact.

## Architecture learning path

If you want to understand the system before contributing, follow the handbook's [Architecture Path](../architecture-path/README.md):

1. trustworthy AI frontend state;
2. runnable Angular copilot UX;
3. full-stack copilot platform;
4. governed agent lifecycle;
5. enterprise agent workspace.

That path explains the new engineering problem introduced at each layer before linking you into the implementation repository.
