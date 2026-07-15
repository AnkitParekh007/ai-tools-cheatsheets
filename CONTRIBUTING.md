# Contributing

This repository is a practical handbook for AI coding tools. Contributions are welcome, but the bar is accuracy, reproducibility, and honest verification.

For the full page archetypes and maintainer standard, see [CONTRIBUTING_CONTENT.md](./CONTRIBUTING_CONTENT.md).

## Before You Open a PR

1. Read the page you plan to change and adjacent pages in the same section.
2. Prefer official documentation, official repositories, official release notes, and official security documentation.
3. Keep existing public URLs stable unless a move is necessary and fully updated.
4. Mark uncertainty explicitly instead of guessing.

## What This Repo Accepts

- tool-page verification and refreshes
- new tool coverage backed by primary sources
- workflow improvements with realistic validation steps
- prompt and template improvements tied to real engineering use cases
- MCP evaluation guidance with clear permission and risk analysis
- governance and security policy starters
- HonKit UI, accessibility, and build-validation fixes

## What This Repo Rejects

- invented CLI commands
- unsupported pricing or plan claims
- screenshots used as the only evidence source
- destructive commands presented as safe defaults
- private company instructions, secrets, or customer data
- vendor marketing copy with no engineering value

## Verification Philosophy

Use the narrowest truthful label:

- `Verified`
- `Locally tested`
- `Partially verified`
- `Documentation verified`
- `Not locally tested`
- `Requires account`
- `Requires paid plan`
- `Platform-specific`
- `Experimental`
- `Deprecated`
- `Unsupported`
- `Unable to verify`
- `Needs verification`

If you did not run the command or workflow, do not imply that you did.

## Local Setup

```bash
npm ci
npm run docs:validate
npm run docs:build
```

For local preview:

```bash
npm run docs:serve
```

## Validation Commands

- `npm run docs:paths`
  Blocks accidental local filesystem paths in public files.
- `npm run docs:navigation`
  Confirms every `docs/SUMMARY.md` target exists and has a top-level heading.
- `npm run docs:metadata`
  Validates required metadata on tool pages and common doc conventions.
- `npm run docs:lint`
  Runs Markdown linting across root docs, `.github`, and `docs/`.
- `npm run docs:links`
  Validates internal links, anchors, generated HonKit routes, and reports external-link warnings separately.
- `npm run docs:validate`
  Runs the full documentation validation pipeline, then builds the site.

## Adding or Updating a Tool Page

1. Add or update the page under `docs/tools/`.
2. Keep the existing metadata block near the top of the page.
3. Include:
   - official docs
   - `Last verified` in `YYYY-MM-DD`
   - an approved `Status`
   - an honest `Verification scope`
   - a `Sources` section
4. Update `docs/SUMMARY.md` if the page is new.

## Adding Workflow, Prompt, Template, or Governance Content

1. Follow the archetypes in [CONTRIBUTING_CONTENT.md](./CONTRIBUTING_CONTENT.md).
2. Add a verification note.
3. Include realistic examples, failure modes, and human review steps where the page type requires them.
4. Prefer smaller truthful examples over broad unsupported claims.

## MCP Content Rules

MCP pages must clearly choose one of these modes:

- verified implementation guide
- evaluation checklist

If the repository does not responsibly verify one implementation, keep the page in evaluation-checklist mode and say so plainly.

## Pull Request Expectations

Your PR should state:

- what changed
- which pages were affected
- which primary sources you used
- which commands you ran locally
- whether URLs or headings changed
- any remaining limitations or unverified areas

Use the repository PR template. For visual site changes, include screenshots.

## Definition of Done

- claims are sourced or clearly marked as unverified
- verification status is honest
- links and anchors work
- `docs/SUMMARY.md` stays accurate
- no local absolute paths remain in public files
- `npm run docs:validate` passes
- `npm run docs:build` passes
