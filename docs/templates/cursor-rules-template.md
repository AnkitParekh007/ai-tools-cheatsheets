# Cursor Rules Template

## Template Purpose

Use this template for repository or workspace rules that shape Cursor behavior.

## Recommended File Path

Use the path required by your Cursor setup and document it in the repo README or onboarding guide.

## Minimal Version

```md
- follow local build and test commands
- do not edit generated files
- keep patches scoped
```

## Full Version

```md
- inspect adjacent files before editing
- preserve public routes and filenames unless instructed otherwise
- prefer focused tests
- list findings first for reviews
- do not use secrets from prompt text
```

## Example Completed Version

```md
- Docs source lives in `docs/`.
- `_book/` is generated.
- Run `npm run docs:validate` after doc edits.
- Keep examples copy-pasteable.
```

## Field-by-Field Explanation

- repo structure
- validation commands
- review style
- safety rules

## Customization Guidance

- keep the rules short enough to stay active in normal use

## Common Mistakes

- overloading the rules file with architecture prose

## Validation Checklist

- path documented
- commands still accurate
- generated directories excluded
