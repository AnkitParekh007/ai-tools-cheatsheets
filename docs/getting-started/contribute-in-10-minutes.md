# Contribute in 10 Minutes

Small, source-backed improvements are one of the best ways to make this handbook better. You do not need to add a brand-new AI tool or understand the entire repository before contributing.

## Fastest Ways to Help

Choose one focused improvement:

- correct a stale command using an official source
- improve a tool page's verification notes or sources
- add a realistic validation step to a workflow
- strengthen a prompt with required context, failure modes, or review checks
- improve a template, accessibility detail, navigation label, or docs UX
- reproduce and fix a broken link or confusing example

Browse the repository's `good first issue` and `help wanted` labels if you want a pre-scoped task.

## The Fast Path

1. Fork `AnkitParekh007/ai-tools-cheatsheets` on GitHub.
2. Create a small branch for one change.
3. Edit the relevant Markdown or site asset.
4. Prefer official vendor documentation, official repositories, release notes, or protocol documentation as evidence.
5. Keep claims narrow. If you did not run something, do not imply that you did.
6. Run the repository validation commands.
7. Open a pull request using the repository template and describe the source and validation you used.

## Validate Before Opening a PR

```bash
npm ci
npm run docs:validate
```

For a local browser preview:

```bash
npm run docs:serve
```

## A Good First Pull Request Is Small

A strong first contribution usually changes one page or one clearly related group of files. You do not need to redesign an entire section.

Good examples:

- refresh one install command and its `Last verified` date
- add one missing official source
- turn one generic prompt into a reproducible prompt with explicit inputs and review criteria
- add one Windows, macOS, Linux, or WSL caveat confirmed by primary documentation
- improve one workflow with a concrete validation or rollback step
- make one docs interaction more accessible or easier to understand

## What Maintainers Look For

A contribution is ready when:

- the change solves a concrete reader problem
- factual claims are backed by primary sources or clearly marked as unverified
- commands are copy-pasteable and non-destructive by default
- uncertainty is explicit
- links and navigation still work
- `npm run docs:validate` passes

## You Do Not Need Deep AI Expertise

Documentation corrections, reproducible examples, testing notes, accessibility improvements, and source verification are all useful contributions. Practical engineering evidence matters more here than hype or broad claims.

## Next Steps

- Read the full [Contributing Guide](https://github.com/AnkitParekh007/ai-tools-cheatsheets/blob/main/CONTRIBUTING.md).
- Read the [Content Contribution Standard](https://github.com/AnkitParekh007/ai-tools-cheatsheets/blob/main/CONTRIBUTING_CONTENT.md) for page archetypes and verification rules.
- Browse [open good first issues](https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
- Browse [help wanted issues](https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

> Keep the first PR focused. A small, verifiable improvement is easier to review and more useful than a large speculative rewrite.
