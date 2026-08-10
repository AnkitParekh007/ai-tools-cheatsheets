# 2026.08 Ecosystem Release Manifest

This manifest is the final publishing checklist for the six-project public architecture launch.

## Release order

Publish in architecture order so every release can point forward to the next layer:

1. AI Tools Cheatsheets — **Learn**
2. Frontend AI Patterns — **Pattern**
3. Angular AI Copilot Starter — **Run**
4. ngx-copilot-platform — **Platform**
5. Agent Studio — **Govern**
6. Org AI Force — **Operate**

## Release matrix

| Project | Suggested release title | Release notes | Public proof |
| --- | --- | --- | --- |
| AI Tools Cheatsheets | `2026.08 Launch Edition — AI Coding Cheat Sheets, MCP, Prompts and Workflows` | `docs/community/release-2026-08.md` | https://ankitparekh007.github.io/ai-tools-cheatsheets/ |
| Frontend AI Patterns | `2026.08 Public Proof Edition — Trustworthy AI Frontend Patterns` | `docs/releases/2026-08-public-proof.md` | https://ankitparekh007.github.io/frontend-ai-patterns/playground/ |
| Angular AI Copilot Starter | `2026.08 Public Proof Edition — Resilient Angular AI Copilot UX` | `docs/releases/2026-08-public-proof.md` | https://ankitparekh007.github.io/angular-ai-copilot-starter/ |
| ngx-copilot-platform | `2026.08 Public Proof Edition — Angular Copilot SDK + Failure Lab` | `docs/releases/2026-08-public-proof.md` | https://ankitparekh007.github.io/ngx-copilot-platform/failure-lab |
| Agent Studio | `2026.08 Public Proof Edition — Governed Agent Lifecycle & Control Plane` | `docs/releases/2026-08-public-proof.md` | https://ankitparekh007.github.io/agent-studio/ |
| Org AI Force | `2026.08 Public Proof Edition — Enterprise Agent Operations & Resilience` | `docs/releases/2026-08-public-proof.md` | repository `docs/public-proof.md` — no public hosted app claimed |

## GitHub Release publishing steps

For each repository after the launch PR is merged and CI/default-branch deployment is green:

1. Open **Releases → Draft a new release**.
2. Create a tag at the current default-branch HEAD. A consistent recommendation is `2026.08-public-proof` for the five architecture repos and `2026.08-launch` for AI Tools Cheatsheets.
3. Use the exact suggested release title above.
4. Copy the concise **Suggested release summary** from that repository's release-notes file into the GitHub Release description.
5. Link the live public-proof URL near the top of the release description.
6. Keep deterministic/mock/hosting boundaries visible; do not remove them for marketing brevity.
7. Publish only after the current CI and Pages checks are green.

## Profile amplification checklist

After release publication:

- verify the profile README ecosystem image renders;
- verify all five public hosted links return the intended surface;
- verify Org AI Force still clearly says no public app is claimed;
- pin the repositories in this exact order:
  1. `ngx-copilot-platform`
  2. `org-ai-force`
  3. `frontend-ai-patterns`
  4. `agent-studio`
  5. `angular-ai-copilot-starter`
  6. `ai-tools-cheatsheets`
- use the ecosystem launch post before individual project posts.

## Social preview / repository settings checklist

GitHub social-preview images and repository metadata are repository settings rather than source files. For each flagship repo:

- set the homepage URL to the strongest public surface when one exists;
- keep the repository description specific to its architecture role;
- add focused topics such as `angular`, `typescript`, `ai`, `rag`, `mcp`, `agentic-ai`, `llm`, `copilot`, `ai-agents` only where truthful;
- upload the strongest checked-in public-proof visual as the repository social preview where GitHub accepts the crop;
- do not assign a public demo homepage to Org AI Force until a mock-safe hosted surface exists.

## Distribution sequence

1. Ecosystem architecture post.
2. Failure-aware AI frontend deep dive.
3. Backend-authority / approval-boundary deep dive.
4. Governed agent lifecycle deep dive.
5. Enterprise resilience/operations deep dive.
6. Contributor invitation linked to scoped issues.

Use `ecosystem-launch-2026-08.md` for copy-ready drafts and truth boundaries.

## Success signals

Track by repository and by ecosystem:

- profile → repo click-through;
- live demo/public-proof visits;
- stars and forks;
- issue/PR activity from outside contributors;
- README visual engagement via downstream discussion/share references;
- npm package discovery for `ngx-copilot-platform`;
- repeated visits to the architecture path rather than only one-off launch spikes.

## Date

2026-08-10
