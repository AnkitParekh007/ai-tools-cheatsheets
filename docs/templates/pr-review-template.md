# PR Review Template

## Template Purpose

Use this template for internal review comments or findings summaries.

## Recommended File Path

Store it in your docs or engineering handbook, or adapt it into your PR workflow tooling.

## Minimal Version

```md
## Findings
- Severity:
- File:
- Why it matters:
- Validation:
```

## Full Version

```md
## Findings
- Severity:
- File:
- Problem:
- Why it matters:
- Suggested fix:
- Validation:

## Missing Tests

## Open Questions

## Summary
```

## Example Completed Version

```md
## Findings
- Severity: High
- File: `api/admin/routes.ts`
- Problem: Missing admin authorization check.
- Why it matters: Non-admin users can access export data.
- Validation: Run the focused auth test for the export route.

## Missing Tests
- unauthorized export request
```

## Field-by-Field Explanation

- `Severity`: review priority
- `File`: exact location
- `Validation`: how to prove the issue

## Customization Guidance

- keep findings first
- do not bury the issue behind summary prose

## Common Mistakes

- review comments with no validation hint
- style nitpicks before correctness bugs

## Validation Checklist

- finding format is consistent
- severity is defined
- validation step is included
