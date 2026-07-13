# Terminology

Use these definitions as repository terminology, not as universal vendor language.

| Term | Meaning in this repository | Why it matters |
| --- | --- | --- |
| `CLI agent` | A coding tool used primarily from the terminal | Usually the best fit for deep repo work, scripted workflows, and explicit review of commands |
| `IDE agent` | A coding tool embedded inside an editor | Better fit for in-flow editing, autocomplete, and developer adoption inside existing editor habits |
| `Agentic execution` | A workflow where the tool plans, calls tools, edits files, or runs commands across multiple steps | This is where approval controls and rollback guidance become important |
| `Model provider` | The vendor supplying the underlying LLM | Provider choice affects privacy posture, pricing, feature set, and integration strategy |
| `Instruction file` | A repo or tool-specific file that gives persistent working guidance | Examples include `AGENTS.md`, `CLAUDE.md`, tool rules files, and shared prompt baselines |
| `Repository context` | The codebase, files, history, and local structure available to the tool | Good repository context improves usefulness, but also increases data exposure risk |
| `Approval mode` | The level of confirmation required before the tool edits files, runs commands, or uses external systems | This is one of the most important team policy choices |
| `MCP` | Model Context Protocol, used to connect models or agents to external tools and systems | MCP can make tools more useful, but it also expands the permission surface |
| `Least privilege` | Giving the tool only the access it needs for the current task | This is the default security stance recommended throughout the repo |
| `Verification status` | The label that tells you how much of a page or claim was confirmed | Readers should use this before treating any page as approval-ready guidance |

## Verification

- Status: Documentation verified
- Last reviewed: 2026-07-13
- Scope: definitions were aligned to repository usage and governance language
