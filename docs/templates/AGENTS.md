# AGENTS.md Template

## Template Purpose

Use `AGENTS.md` as the shared repo instruction file for coding agents that should understand your project before they edit it.

## Recommended File Path

`/AGENTS.md`

## Minimal Version

```md
# AGENTS.md

## Project Overview
- Brief description of the repo.

## Key Commands
- Install:
- Test:
- Build:

## Constraints
- Do not edit generated files.
- Do not commit secrets.
```

## Full Version

```md
# AGENTS.md

## Project Overview
- What the repository does.
- Main runtime or framework.

## Key Commands
- Install:
- Build:
- Test:
- Lint:
- Dev server:

## Repo Map
- `src/`
- `tests/`
- `docs/`

## Coding Standards
- formatting
- naming
- testing expectations

## Review Rules
- findings first for review tasks
- smallest safe patch for fixes

## Constraints
- do not edit generated files
- do not commit secrets
- preserve public URLs where relevant
```

## Example Completed Version

```md
# AGENTS.md

## Project Overview
- HonKit documentation site for AI coding tools.

## Key Commands
- Install: `npm ci`
- Validate docs: `npm run docs:validate`
- Build docs: `npm run docs:build`

## Repo Map
- `docs/` is the source of truth.
- `_book/` is generated output.
- `scripts/` contains validation helpers.

## Constraints
- Do not edit `_book/`.
- Keep public routes stable.
- Remove accidental local filesystem paths from public docs.
```

## Field-by-Field Explanation

- `Project Overview`: what the agent is working on
- `Key Commands`: the fastest way to validate work
- `Repo Map`: where to look first
- `Constraints`: what must not happen

## Customization Guidance

- keep it short
- include only rules that should apply every time
- add subdirectory `AGENTS.md` files only when scope really changes

## Common Mistakes

- dumping onboarding prose into the file
- listing outdated commands
- mixing company secrets into instructions

## Validation Checklist

- file is in repo root
- commands are current
- risky directories are named
- secrets are not present
