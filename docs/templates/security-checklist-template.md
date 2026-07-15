# Security Checklist Template

## Template Purpose

Use this checklist before approving a tool, prompt, or MCP integration.

## Recommended File Path

Store in your governance or approval docs.

## Minimal Version

```md
- owner named
- permissions reviewed
- revocation path documented
```

## Full Version

```md
- owner named
- data classification identified
- read/write/execute scope reviewed
- credential storage reviewed
- network destinations understood
- human review checkpoint defined
- rollback or revocation path documented
- validation or pilot evidence attached
```

## Example Completed Version

```md
- owner named: Platform Engineering
- data classification identified: private source code
- scope reviewed: repo read-only
- revocation path documented: remove app grant and host config
```

## Field-by-Field Explanation

- owner
- scope
- credentials
- revocation
- evidence

## Customization Guidance

- add compliance or incident-response fields if your company requires them

## Common Mistakes

- approving tools with no revocation story
- skipping data-classification review

## Validation Checklist

- checklist completed
- owner signed off
- evidence attached
