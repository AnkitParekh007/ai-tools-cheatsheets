# How to Use This Site

This site works best when you enter from the task you are trying to complete, not from the vendor you already know.

## Start With The Question You Need Answered

| If you need to... | Go to... | What you should expect |
| --- | --- | --- |
| Compare tools before standardizing | [Choosing the Right Tool](choosing-the-right-tool.md) and [Comparison Matrix](comparison-matrix.md) | scenario-based recommendations, trade-offs, and current verification status |
| Install or evaluate one product | [Tools](../tools/README.md) | product-specific setup, commands, limitations, and source links |
| Add repo instruction files | [Configs](../configs/README.md) | file purpose, location, examples, and tool-specific differences |
| Repeat a task consistently | [Workflows](../workflows/README.md) | step-by-step engineering patterns, prompts, review checkpoints, and validation |
| Connect external tools through MCP | [MCP](../mcp/README.md) | compatibility, permissions, risk, approval guidance, and safer defaults |
| Reuse prompts or templates | [Prompts](../prompts/README.md) and [Templates](../templates/README.md) | copy-ready material that should still be adapted to your repository |
| Define team policy | [Governance](../governance/README.md) | rollout, approvals, security controls, and policy baselines |

## Recommended Paths By Role

- Individual developer:
  [Quick Start](quick-start.md) -> [Choosing the Right Tool](choosing-the-right-tool.md) -> one tool page -> one workflow page
- Engineering lead or DX owner:
  [Comparison Matrix](comparison-matrix.md) -> [Fork for Your Team](fork-for-your-team.md) -> [Security and Permissions](../governance/security-and-permissions.md) -> [Approved Tools Policy](../governance/approved-tools-policy.md)
- Security reviewer:
  [Security and Permissions](../governance/security-and-permissions.md) -> [MCP Overview](../mcp/overview.md) -> [MCP Approval Policy](../governance/mcp-approval-policy.md) -> relevant MCP pages
- Contributor:
  [Why This Repo Exists](why-this-repo.md) -> [Prompt Library](../prompts/README.md) or [Tools](../tools/README.md) -> [Contribution Guide](https://github.com/AnkitParekh007/ai-tools-cheatsheets/blob/main/CONTRIBUTING.md)

## How To Judge Whether A Page Is Ready To Trust

- Prefer pages that include `Last verified`, `Status`, and a `Sources` section.
- Treat `Needs verification` as a useful starting point, not as approval-ready policy.
- Read security notes before enabling shell execution, repo write access, or MCP connections.
- If a page gives a recommendation without any limits, examples, or review checkpoints, treat it as incomplete.

## How To Move Through The Site Efficiently

1. Start broad in `Start Here`.
2. Move to the specific tool, config, workflow, or MCP page you need.
3. Check verification status and sources before copying commands or adopting policy.
4. Return to governance pages before rolling any guidance out to a team.

## Verification

- Status: Documentation verified
- Last reviewed: 2026-07-13
- Scope: current repository navigation and section responsibilities were reviewed
