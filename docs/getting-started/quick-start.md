# Quick Start

This page is the safest short path for a developer or team that wants to start using this repository without approving every tool or every automation pattern on day one.

## Who Should Use This Page

- A developer evaluating one primary tool for a real repository
- A team lead deciding what to pilot first
- A platform or DX team creating an initial approved-tool baseline
- A security reviewer checking whether the rollout path starts with least privilege

## Recommended 30-Minute Path

1. Read [Choosing the Right Tool](choosing-the-right-tool.md) to decide whether you are optimizing for terminal work, IDE work, or team policy.
2. Choose one primary terminal tool and, if needed, one primary IDE tool. Do not approve every option at once.
3. Open the relevant tool page and validate the current installation and authentication guidance before you install anything.
4. Copy one repo instruction file template:
   [../templates/AGENTS.md](../templates/AGENTS.md) for multi-tool guidance or [../templates/CLAUDE.md](../templates/CLAUDE.md) if your workflow specifically centers on Claude Code.
5. Review [../governance/security-and-permissions.md](../governance/security-and-permissions.md) before granting shell execution, broad repo write access, or external-system access.
6. Start with a low-risk workflow such as planning, explanation, or review before asking the tool to edit multiple files.

## Pick Your Starting Mode

| If you need... | Start here | Why |
| --- | --- | --- |
| Deep repo work from the terminal | Claude Code or OpenAI Codex | Best current fit in this repo for multi-file repo reasoning and agent-style terminal workflows |
| AI assistance inside the editor | Cursor or GitHub Copilot | Better first step if your team mostly works inside VS Code or JetBrains |
| Open-source or provider-flexible evaluation | Aider, Continue, or OpenCode | Useful when you want more control over provider choice or toolchain shape |
| Provider diversification | Gemini CLI or xAI-backed host workflows | Better as a secondary path than as the only approved workflow for most teams |

## First Safe Trial

Use your first trial to answer one of these questions:

- Can the tool map the repository accurately?
- Can it explain one subsystem without editing code?
- Can it review one small diff and point out risks?
- Can it propose a plan for a bug fix before touching files?

Good first tasks are intentionally low-risk. They tell you whether the tool is useful before you expose it to shell commands, production infrastructure, or large refactors.

> Safety note: Start in read-only or approval-heavy workflows before enabling shell execution or broad MCP access.

## Team Default Recommendation

These are repository recommendations, not vendor-backed claims:

- terminal-first: Claude Code or OpenAI Codex
- IDE-first: Cursor or GitHub Copilot
- open-source path: Aider, Continue, or OpenCode
- provider diversity: Gemini CLI or xAI integrations

## What Not To Do First

- Do not standardize five tools at once.
- Do not enable write access, shell execution, and external-system access in the first pilot.
- Do not copy prompts or templates into production repos without adapting them to the repository.
- Do not treat `Needs verification` pages as approval-ready.
- Do not skip human review just because a tool looked good on one demo.

> Team tip: If you plan to fork this repository for internal use, read [Fork for Your Team](fork-for-your-team.md) immediately after this page.

## Verification

- Status: Documentation verified
- Last reviewed: 2026-07-13
- Scope: navigation, linked repository pages, and current internal recommendations were reviewed
- Not covered: vendor-specific installation validity belongs to the linked tool pages
