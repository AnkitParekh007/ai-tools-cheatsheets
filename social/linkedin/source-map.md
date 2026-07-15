# LinkedIn Carousel Source Map

Communication job:

> By the end, developers, engineering leaders, and security-minded teams should want to explore and share the handbook because it turns scattered AI tooling guidance into one open-source, security-conscious reference.

## Slide Map

| Slide | Source page | Main claim | Supporting URL | Verification limitation |
| --- | --- | --- | --- | --- |
| 1. Hook | `docs/README.md`, `README.md` | The project is an open-source handbook for AI coding tools, prompts, templates, MCP, and team workflows. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/` | Do not imply full local verification of every tool or workflow. |
| 2. Tool comparison | `docs/getting-started/comparison-matrix.md` | Claude Code and OpenAI Codex are strong for terminal-first repo work; Cursor and Copilot fit IDE-first teams; open workflows emphasize provider flexibility. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html` | Tools marked `Needs verification` must not be presented as fully standardized defaults. |
| 3. AGENTS.md | `docs/configs/agents-md.md` | `AGENTS.md` is the strongest cross-tool repository guidance file in this ecosystem and should stay small, durable, and shared. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/configs/agents-md.html` | This is a guidance page, not proof that every host uses the file identically. |
| 4. Engineering workflow | `docs/workflows/code-review.md` | AI code review should be findings-first, severity-based, validated, and kept advisory under human approval. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/workflows/code-review.html` | The example is a representative review pattern, not a claim of universal live-tool behavior. |
| 5. MCP security | `docs/mcp/overview.md`, `docs/mcp/github-mcp.md`, `docs/governance/security-and-permissions.md` | MCP servers change the trust model because they can expose private data and privileged actions; approval should start with read-only, least-privilege access. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/mcp/overview.html` | Category guidance only; no specific GitHub MCP implementation is approved by the repo. |
| 6. Team adoption | `docs/governance/team-rollout-guide.md`, `docs/governance/security-and-permissions.md` | Teams should adopt AI tools in controlled phases with owners, pilots, rollback paths, and mandatory human approval for risky actions. | `https://ankitparekh007.github.io/ai-tools-cheatsheets/governance/team-rollout-guide.html` | Policy starter only; organizations still need named owners and local enforcement details. |
| 7. CTA | `docs/README.md`, `README.md` | The handbook covers comparisons, workflows, prompts, templates, MCP security, governance, and team paths, and invites readers to read, star, fork, and contribute. | `https://github.com/AnkitParekh007/ai-tools-cheatsheets` | Do not imply popularity, rankings, or enterprise adoption without evidence. |

## Approved Messaging Boundaries

- Say `open-source handbook`, `vendor-neutral`, `security-conscious`, and `command-first`.
- Say the project covers comparisons, workflows, prompts, templates, MCP, and governance.
- Say human review remains mandatory for merge, deploy, destructive actions, and write-enabled MCP actions.
- Do not say the project is the top, leading, or most-used handbook.
- Do not say every page is locally tested.
- Do not say any MCP implementation is approved by default.
