# AI Task Brief Template

## Template Purpose

Use this template to turn a vague request into a high-signal implementation brief for a coding assistant.

## Recommended File Path

Store in your internal docs, ticket template library, or issue forms.

## Minimal Version

```md
## Goal
## Context
## Constraints
## Validation
```

## Full Version

```md
## Goal

## Why This Matters

## Context
- repo or service
- affected files
- current behavior

## Constraints
- do not change
- security boundaries
- rollout limits

## Acceptance Criteria

## Validation
- commands to run
- human review checkpoint

## Output Format
- plan
- patch
- risks
```

## Example Completed Version

```md
## Goal
Make the docs validation pipeline launch-ready.

## Context
- HonKit docs repo
- validation scripts under `scripts/`
- workflows under `.github/workflows/`

## Constraints
- preserve public URLs
- keep validation stack lightweight

## Validation
- `npm run docs:validate`
- `npm run docs:build`
```

## Field-by-Field Explanation

- `Goal`: one clear outcome
- `Context`: what the agent must inspect
- `Constraints`: what must stay true
- `Validation`: how success is proven

## Customization Guidance

- keep the goal singular
- list real commands, not generic “test it”

## Common Mistakes

- missing constraints
- no acceptance criteria or validation commands

## Validation Checklist

- objective is specific
- files or systems in scope are named
- success is measurable
