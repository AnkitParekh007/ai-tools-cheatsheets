# Cursor Prompts

Use these starters for IDE-local code or doc work where file selection and diff review matter.

## Prompt Objective

Keep prompts grounded in the current editor selection and nearby repository context.

## When to Use

- editing a known file
- reviewing a selected diff
- tightening tests or comments near the cursor

## Required Context

- selected file
- selected diff or lines
- expected behavior

## Prompt Starters

```text
Review the selected diff for correctness, regressions, and missing tests. List findings first.
```

```text
Refactor the selected code for readability without changing behavior. State the invariants first.
```

```text
Update this page so it matches the implementation and nearby docs. Do not change URLs or headings unless necessary.
```

## Variables to Customize

- selected files
- local conventions
- test command

## Example Filled Prompt

```text
Review the selected comparison-matrix markup for readability and accessibility regressions.
Call out table-overflow, heading, and keyboard-navigation issues first.
```

## Example Expected Output

- findings tied to the selected file
- small patch suggestions

## Weak Prompt Versus Strong Prompt

- Weak: `improve this`
- Strong: specify the selected scope and the exact quality criteria

## Failure Patterns

- assuming global repo context from one open file
- not naming the desired behavior

## Tool-Specific Adjustments

- pair the prompt with the current selection or open tabs
- ask for file-local edits before repo-wide changes

## Human Review Checklist

- confirm the agent stayed inside the intended file set

## Security Considerations

Do not expose secrets or unrelated open files in the prompt context.
