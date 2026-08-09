# Maintainer Decisions — AI Tools Cheatsheets

## Decision 001 — Prefer verified depth over catalog size

The repository may cover many tools, but a smaller source-backed page is more valuable than an exhaustive unverified command dump. New content should preserve verification labels and primary-source links.

## Decision 002 — Keep vendor guidance separate from local validation

Official documentation can establish supported behavior; it does not prove the maintainer locally exercised every workflow. Pages should state the evidence level honestly.

## Decision 003 — Keep the handbook as the learning layer

Implementation-heavy AI frontend patterns belong in `frontend-ai-patterns`; runnable Angular UX belongs in `angular-ai-copilot-starter`; platform architecture belongs in `ngx-copilot-platform` and `agent-studio`.

This separation avoids duplicating content and gives every repository a clear job.

## Decision 004 — Optimize contributions for small, verifiable improvements

Contributor tasks should name the file, expected source/verification level, acceptance criteria and validation command. The goal is maintainer trust and useful documentation, not contribution volume.

## Decision 005 — Security/governance is a first-class learning path

AI coding agents and MCP servers can read data and execute commands. Permission scope, human review, secret handling, revocation and team governance should stay part of the core handbook rather than an appendix.
