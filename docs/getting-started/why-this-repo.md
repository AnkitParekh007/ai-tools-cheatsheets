# Why This Repo Exists

AI coding guidance is scattered across vendor docs, release notes, screenshots, forum posts, prompt snippets, and team folklore. That makes even basic questions harder than they should be:

- Which tool should we approve first?
- Which install command is still current?
- What permissions does this agent actually need?
- Which configuration file belongs in the repo?
- Which MCP integration is safe enough to pilot?
- What should a reviewer validate before trusting AI-generated changes?

This repository exists to turn those questions into repeatable engineering guidance instead of guesswork.

## What This Repository Tries To Solve

- Keep AI coding tool guidance in one place.
- Make verified or clearly qualified commands easier to copy.
- Help teams compare tools before standardizing on them.
- Provide reusable prompts, templates, workflows, and governance baselines.
- Make security and approval trade-offs visible before adoption, not after an incident.

## Who This Repository Is For

- Individual developers evaluating coding tools for real repo work.
- Engineering leads choosing a primary terminal tool and a primary IDE tool.
- Platform and developer-experience teams defining safe defaults.
- Security reviewers checking permissions, MCP exposure, and approval models.
- Contributors who want to improve shared open-source documentation instead of writing private one-off notes.

## What You Can Expect From A Good Page Here

A strong page in this repository should help you do at least one of these well:

- make a practical tool decision
- complete a real task
- copy a configuration safely
- understand what is verified versus assumed
- identify security boundaries and review checkpoints
- move from evaluation to a team standard without inventing your own template first

If a page does not do one of those clearly, it should be improved.

## What This Repository Does Not Try To Be

- It is not a vendor marketing mirror.
- It is not a promise that every command has been tested on every platform.
- It is not an exhaustive product catalog.
- It is not a substitute for your own internal policy, secrets handling, or production change controls.
- It is not a reason to skip human review on code, security, or infrastructure changes.

## Why Verification Matters

AI coding tools change quickly enough that stale guidance becomes risky, not just annoying. Product names, installation methods, plan limits, permissions, instruction-file behavior, IDE support, and MCP surfaces can change between releases.

That is why this repository prefers:

- primary documentation over blogs
- explicit status labels over implied certainty
- dated verification over undated claims
- clear limitations over optimistic guesswork
- safe recommendations over broad automation by default

> Verification note: AI coding tools change quickly. This repo prefers official docs, clear status markers, and dated verification over guesswork.

## How To Use This Repository Well

1. Start with [Quick Start](quick-start.md) if you want a safe adoption path.
2. Use [Choosing the Right Tool](choosing-the-right-tool.md) and [Comparison Matrix](comparison-matrix.md) before you standardize on a product.
3. Read the tool page before copying installation or auth guidance.
4. Read governance pages before enabling shell execution, MCP write access, or broad automation.
5. Fork the repo only after you know which parts should stay public and which parts should become private internal standards.

## Suggested Next Pages

- [Quick Start](quick-start.md)
- [Choosing the Right Tool](choosing-the-right-tool.md)
- [Comparison Matrix](comparison-matrix.md)
- [Fork for Your Team](fork-for-your-team.md)
