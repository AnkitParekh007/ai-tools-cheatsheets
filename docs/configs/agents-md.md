# AGENTS.md

Use `AGENTS.md` as the main shared repository instruction file when your team wants one durable source of truth across coding agents.

## Why It Matters

OpenAI's official docs say Codex reads `AGENTS.md` files before doing any work. GitHub's Copilot CLI docs also say root `AGENTS.md` is treated as primary instructions, and Cursor's rules docs explicitly mention `AGENTS.md` alongside its own rule system.

That makes `AGENTS.md` the strongest cross-tool repository guidance file in this ecosystem.

## Best Use Cases

- build and test commands
- review expectations
- architecture notes the agent repeatedly gets wrong
- file and directory routing guidance
- do-not-touch areas
- deployment and security constraints

## Keep It Small

OpenAI's customization docs explicitly recommend keeping `AGENTS.md` small. Put only the rules that should apply every time the agent works in the repo.

Do not turn it into:

- a full architecture book
- onboarding prose for humans
- a dumping ground for one-off incidents

## Good Structure

Recommended sections:

- project overview
- key commands
- repo map
- coding standards
- test and validation expectations
- security constraints
- risky files or directories
- review checklist

## Example

```md
# AGENTS.md

## Project Overview
- HonKit documentation site for AI coding tools.

## Key Commands
- Install: `npm install`
- Build docs: `npm run docs:build`

## Repo Map
- `docs/` contains the documentation source.
- `docs/assets/` contains custom CSS and JS for the HonKit site.

## Standards
- Prefer concise, command-first documentation.
- Keep examples copyable and platform-aware.

## Validation
- Run `npm run docs:build` after doc edits.

## Constraints
- Do not commit secrets.
- Keep GitHub Pages output compatible with the configured HonKit build.
```

## Placement Strategy

Use the root `AGENTS.md` for repo-wide behavior. Add deeper `AGENTS.md` files only when a subdirectory truly needs different rules.

OpenAI's docs explicitly recommend placing guidance in the closest directory where it applies.

## Maintenance Rules

Update `AGENTS.md` when:

- the agent repeats the same mistake
- reviewers leave the same comment more than once
- the agent reads the wrong parts of the repo first
- commands or validation steps change

## What Not To Put Here

- API keys
- personal IDE preferences
- unstable experiment notes
- rules that apply only to one vendor unless absolutely necessary

## Team Recommendation

If your team has no shared AI config yet, start here before adding tool-specific layers. It is the cleanest way to avoid duplicating the same guidance into Codex, Cursor, Copilot, and other tools.

## Sources

- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://learn.chatgpt.com/docs/customization/overview
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://cursor.com/docs/rules
