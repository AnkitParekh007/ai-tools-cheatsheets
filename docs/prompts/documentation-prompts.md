# Documentation Prompts

Use these starters when the goal is to patch docs from code or workflow reality.

## Prompt Objective

Keep doc edits factual, scoped, and aligned with current implementation.

## When to Use

- stale docs
- new commands or scripts
- README or handbook refreshes

## Required Context

- source code or scripts
- target doc pages
- validation commands

## Prompt Starters

```text
Read the implementation first, identify stale docs, then patch only what is inaccurate. Preserve public URLs and keep commands copy-pasteable.
```

```text
Audit this docs section for thin pages, unclear maturity labels, and missing validation notes. Suggest the smallest useful rewrite order.
```

## Variables to Customize

- source files
- target pages
- validation bar

## Example Filled Prompt

```text
Read package.json, the docs workflows, and the validation scripts first.
Then update the README and contributing docs so they describe the real validation pipeline and reproducible setup.
```

## Example Expected Output

- stale doc list
- exact pages to patch
- validation commands

## Weak Prompt Versus Strong Prompt

- Weak: `improve the docs`
- Strong: define the code sources and the specific docs to align

## Failure Patterns

- generic prose not backed by implementation
- changing URLs unnecessarily

## Tool-Specific Adjustments

- pair with repo-map prompts on unfamiliar codebases

## Human Review Checklist

- confirm every changed statement is supported by the implementation or cited source

## Security Considerations

Never normalize unsafe commands or publish internal-only instructions in public docs.
