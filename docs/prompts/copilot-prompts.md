# Copilot Prompts

Use these starters when Copilot is helping inside GitHub or an IDE and you want clearer review or customization outcomes.

## Prompt Objective

Get stronger repo instructions, review prompts, and implementation summaries from Copilot surfaces.

## When to Use

- customizing repo instructions
- reviewing a PR or selected changes
- drafting explanations for reviewers

## Required Context

- diff or file selection
- repo instruction file if one exists
- validation commands

## Prompt Starters

```text
Review these changes for bugs, regressions, and missing tests. List findings first and keep the summary last.
```

```text
Suggest repository custom instructions for build, test, validation, and risky directories based on the current repo layout.
```

```text
Draft a PR summary from this diff using facts only. Include validation commands run and known limitations.
```

## Variables to Customize

- PR scope
- instructions file path
- validation results

## Example Filled Prompt

```text
Suggest repository custom instructions for this docs repo.
Include build, validation, link-check, and no-local-path rules in concise Markdown.
```

## Example Expected Output

- concise instructions block
- honest validation section

## Weak Prompt Versus Strong Prompt

- Weak: `write copilot instructions`
- Strong: define repo conventions and required sections

## Failure Patterns

- generic instructions with no repo-specific commands
- summaries that omit validation

## Tool-Specific Adjustments

- give Copilot the current diff or the current instruction file explicitly

## Human Review Checklist

- verify any generated instruction file against real repo commands

## Security Considerations

Do not ask for instructions that normalize secret sharing or automatic deploy approval.
