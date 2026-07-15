# Review Prompts

Use these starters when the main goal is findings-first code or docs review.

## Prompt Objective

Get actionable findings before summaries, with severity and validation hints.

## When to Use

- PR review
- docs review
- security-sensitive diff review

## Required Context

- diff or changed files
- review focus
- validation command

## Prompt Starters

```text
Review the current diff like a strict senior engineer. Focus on correctness, regressions, and missing tests. List findings first.
```

```text
Review this documentation change for broken links, stale claims, and unsafe guidance. List findings first with file references.
```

```text
Review this change for auth, secret-handling, and permission risks. Use severity labels and include a human review checkpoint.
```

## Variables to Customize

- review focus
- severity labels
- validation scope

## Example Filled Prompt

```text
Review the current docs diff for broken links, anchor regressions, and incorrect validation claims.
Use High, Medium, Low severity labels and cite the affected file for each finding.
```

## Example Expected Output

- ordered findings
- severity
- file path
- suggested validation

## Weak Prompt Versus Strong Prompt

- Weak: `review this`
- Strong: define the risk areas and findings format

## Failure Patterns

- asking for a summary first
- accepting uncited findings

## Tool-Specific Adjustments

- pair with the repository's review workflow page

## Human Review Checklist

- confirm every finding before changing code

## Security Considerations

Treat permission and secret-related findings as human-approval items.
