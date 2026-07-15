# Tool Evaluation Template

## Template Purpose

Use this template to compare AI coding tools or pilot candidates consistently.

## Recommended File Path

Store in `docs/` for a public handbook or in an internal approval folder for a team fork.

## Minimal Version

```md
## Tool
## Best for
## Risks
## Status
```

## Full Version

```md
## Tool
- Name:
- Category:
- Official docs:

## Fit
- Best for:
- Less suited for:

## Security
- Data access:
- Shell or write access:
- Credential model:

## Team Impact
- Setup effort:
- Learning curve:
- Cost model:

## Validation
- Pilot workflow:
- Commands tested:
- Status:
```

## Example Completed Version

```md
## Tool
- Name: OpenAI Codex
- Category: coding agent

## Fit
- Best for: repo-aware CLI or app workflows
- Less suited for: teams that only want lightweight inline completion

## Security
- Data access: repo contents in scope
- Shell or write access: depends on host settings
```

## Field-by-Field Explanation

- `Fit`: practical value, not marketing
- `Security`: permission and data model
- `Validation`: what the team actually tested

## Customization Guidance

- add company-specific criteria such as compliance or IDE support

## Common Mistakes

- evaluating tools without naming the workflow being compared

## Validation Checklist

- official docs linked
- workflow fit stated
- risks named
- status honest
