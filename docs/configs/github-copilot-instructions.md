# GitHub Copilot Instructions

GitHub's official docs confirm several instruction mechanisms for Copilot. The most important repository-level one is:

```text
.github/copilot-instructions.md
```

The docs also confirm path-specific instructions:

```text
.github/instructions/**/*.instructions.md
```

And some Copilot surfaces also support agent-instruction files such as:

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`

## What To Put In `.github/copilot-instructions.md`

Use it for repository-wide Copilot guidance such as:

- how to understand the project
- build and test commands
- validation expectations
- review preferences
- coding conventions

GitHub's docs explicitly describe it as a way to give Copilot extra context on how to understand the project and how to build, test, and validate its changes.

## Path-Specific Instructions

Use `.github/instructions/**/*.instructions.md` when different folders need different behavior.

Example:

- backend instructions for API folders
- frontend instructions for UI folders
- docs instructions for documentation folders

## Important Copilot CLI Behavior

GitHub's Copilot CLI docs say:

- root `AGENTS.md` is treated as primary instructions
- root `.github/copilot-instructions.md` is also used
- additional `AGENTS.md` files are treated as additional instructions

That means Copilot can combine instruction systems. Your team should decide whether that is desirable or whether one file should stay canonical.

## Recommended Team Pattern

Use:

- `AGENTS.md` for cross-tool baseline
- `.github/copilot-instructions.md` for GitHub-specific guidance
- path-specific instruction files only when the repo genuinely has different domains

## Example

```md
# .github/copilot-instructions.md

- This repository is a HonKit documentation site.
- Prefer editing existing pages over creating new duplicates.
- Keep guidance concise, practical, and command-first.
- After docs changes, run `npm run docs:build`.
- Do not introduce tool claims unless they were verified from official docs.
```

## Personal vs Repo Guidance

GitHub's broader docs also support personal custom instructions in some IDE surfaces. Keep personal tone and preference settings there. Keep repo files focused on facts, commands, constraints, and validation.

## Sources

- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://docs.github.com/en/copilot/reference/custom-instructions-support
