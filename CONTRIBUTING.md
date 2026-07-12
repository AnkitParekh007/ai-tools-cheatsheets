# Contributing

This repository is intentionally strict about verification because AI coding tool docs age quickly.

## Contribute in 10 Minutes

Fast ways to help:

- verify one install command from official docs
- add one platform note for Windows, macOS, Linux, or WSL
- improve one comparison matrix row
- add one workflow prompt
- add one MCP server note
- fix one broken internal link

## Contribution Types

- tool-page verification
- new tool pages
- prompt submissions
- workflow improvements
- MCP server pages
- template improvements
- governance and security docs
- HonKit/docs-site polish

## How to Verify Commands

1. Check official docs first.
2. Confirm platform support.
3. Confirm the exact binary or install command.
4. Confirm whether the command is stable, preview, deprecated, or community-only.
5. If you cannot confirm it, mark it `Needs verification`.

## How to Submit a New Tool Page

1. Add a page under `docs/tools/`.
2. Use the standard tool structure already used in this repo.
3. Include:
   - official docs
   - last verified date
   - status
   - platform notes where relevant
4. Add the page to `docs/SUMMARY.md`.

## How to Submit a Prompt

1. Add or update a file under `docs/prompts/`.
2. Keep prompts copy-pasteable.
3. Prefer real engineering use cases over generic writing prompts.

## How to Submit an MCP Server

1. Add or update a page under `docs/mcp/`.
2. Include purpose, best use, permissions required, and security notes.
3. If the server is not fully verified, mark it `Needs verification`.

## How to Improve a Workflow

1. Update the relevant page under `docs/workflows/`.
2. Keep the workflow concrete and task-oriented.
3. Include CLI examples, review checklist, and team standard guidance.

## What Not to Contribute

- invented CLI commands
- unsupported model claims
- screenshots used as the only source of truth
- vendor pricing copied without a verification date
- secrets, API keys, or private company data

## Style Guide

- prefer concise, command-first writing
- use official docs where possible
- keep examples copy-pasteable
- include `> Safety note:`, `> Verification note:`, or `> Team tip:` where helpful
- avoid marketing language and unsupported superlatives

## Definition of Done

- sources added or refreshed
- `Last verified` updated where relevant
- uncertain content marked `Needs verification`
- links tested
- `docs/SUMMARY.md` updated if new pages were added
- no unsupported claims or hallucinated commands

## Good First Contributions

- verify one tool install section against official docs
- add one Windows, macOS, Linux, or WSL note
- improve one prompt example with a stronger engineering use case
- add one comparison-matrix row detail with a source
- fix one broken internal or external link

## Pull Request Checklist

- [ ] commands verified from official docs
- [ ] uncertain items marked `Needs verification`
- [ ] links updated
- [ ] README navigation updated if needed
- [ ] `docs/SUMMARY.md` updated if new docs pages were added
- [ ] `Last verified` added or refreshed
- [ ] no unsupported claims added
