# Cursor Rules

Cursor's official docs describe four persistent instruction layers:

- Project Rules
- Team Rules
- User Rules
- `AGENTS.md`

That means Cursor can be very effective, but it can also become inconsistent quickly if a team does not define which layers are allowed.

## Team Policy First

Decide this before rollout:

1. are repo-shared instructions centered on Project Rules, `AGENTS.md`, or both?
2. are Team Rules allowed for org-wide behavior?
3. are User Rules allowed for anything beyond personal ergonomics?

Without that policy, two engineers can get different agent behavior in the same repository.

## Recommended Split

Use:

- `AGENTS.md` for cross-tool repo guidance
- Project Rules for Cursor-specific repo behavior
- Team Rules for centrally managed organization patterns
- User Rules for personal preferences only

## Good Rule Topics

- framework conventions
- testing expectations
- API design standards
- naming conventions
- review and validation steps
- security constraints

## Keep Rules Actionable

Good:

- "Run the docs build after changing any page under `docs/`."
- "Prefer updating an existing page before creating a new one."

Weak:

- "Write high-quality code."
- "Be smart about architecture."

## Example Project Rule

```md
# Documentation Repo Rule

- Treat `AGENTS.md` as the repo-wide baseline.
- Keep documentation command-first and easy to scan.
- After editing docs, run `npm run docs:build`.
- Prefer updating existing comparison tables instead of creating duplicates.
```

## Practical Warning

Cursor's official docs confirm that Project, Team, User Rules, and `AGENTS.md` can all exist together. The docs do not make that automatically safe. Your team still needs one documented precedence policy, even if the product supports multiple layers.

## Recommended Team Convention

- keep repo-shared rules short
- review shared rules like code
- avoid using User Rules to override team policy
- document when Team Rules are allowed to supersede repo rules

## Sources

- https://cursor.com/docs/rules
