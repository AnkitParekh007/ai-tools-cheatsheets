# Contributing Content

This file defines the documentation quality standard for this repository.

Use it when you add, rewrite, review, or verify any page under [docs](./docs/README.md).

For the current repository-wide gap analysis, see [docs/content-audit.md](./docs/content-audit.md).

## Purpose

This repository is not a marketing site and not a generic prompt collection.

Every documentation page must help a reader do one or more of these well:

- understand a tool, file, workflow, policy, or protocol
- make a practical engineering decision
- complete a real task safely
- validate what is confirmed versus unverified
- adopt AI tooling with least privilege and human review

## Audience

The default audience is one of these:

- developer
- frontend engineer
- backend engineer
- platform engineer
- QA engineer
- engineering manager
- security reviewer
- tool evaluator
- open-source maintainer
- team adopting AI tools for the first time

Every page must make its intended audience obvious in the first section.

## Repository Conventions

- Documentation framework: HonKit
- Docs root: `docs/`
- Navigation source of truth: `docs/SUMMARY.md`
- Website shell: `docs/_layouts/website/`
- Shared styles: `docs/assets/css/custom.css`
- Shared client behavior: `docs/assets/js/custom.js`
- Public URLs should remain stable unless there is a documented reason to change them

Do not rebuild the documentation framework or change the information architecture without a documented repository decision.

## Core Rules

### Inspect before editing

Before changing a page:

- read the current source file
- read adjacent pages in the same section
- check whether the page is linked from `docs/SUMMARY.md`
- check for repeated content in nearby pages
- check whether the page already has verification metadata
- check whether the page already has official sources

### Preserve useful content

- Keep useful existing guidance.
- Remove unsupported claims, duplication, and filler.
- Prefer incremental improvement over wholesale rewrites when a page already has the right intent.

### Separate fact from recommendation

Pages must distinguish:

- confirmed capability
- team recommendation
- known limitation
- unverified assumption
- vendor-specific behavior
- general engineering advice

Do not present recommendations as vendor-backed facts.

### Prefer primary sources

Use these in order:

1. Official product documentation
2. Official repositories
3. Official release notes or changelogs
4. Official security or privacy documentation
5. Official pricing pages
6. Standards or specifications
7. Maintainer-authored technical material

Do not use SEO blogs as the primary source for factual claims.

## Required Metadata

Every page must include enough metadata to answer:

- what this page is for
- what was verified
- when it was verified
- what remains uncertain
- where the supporting evidence came from

### Required metadata by page type

#### Tool pages

Tool pages must include this top block near the title:

```md
**Type:** CLI / IDE / API / MCP / policy / template
**Best for:** short practical description
**Official docs:** https://example.com/docs
**Last verified:** YYYY-MM-DD
**Status:** Documentation verified
**Verification scope:** Docs reviewed on Windows and macOS install paths; CLI not locally tested
```

#### MCP pages

MCP pages must include:

```md
**Purpose:** short description
**Official/source link:** https://example.com
**Maintainer:** organization or repository owner
**License:** SPDX identifier or `Requires verification`
**Last verified:** YYYY-MM-DD
**Status:** Needs verification
**Verification scope:** repository and docs reviewed; not connected to a live host
```

#### Workflow, config, prompt, template, and governance pages

These pages do not need the exact tool-page block, but they must include:

- a short opening statement of purpose
- a `Verification` or `Verification note` section
- a `Sources` section when factual claims depend on tool or vendor behavior

## Verification Date Format

Use ISO date format only:

- `YYYY-MM-DD`

Examples:

- `2026-07-13`
- `2026-08-01`

Do not use relative dates such as `today`, `last week`, or `recently`.

## Status Labels

Use only the approved status vocabulary below.

| Label | Meaning |
| --- | --- |
| `Verified` | Confirmed through direct testing in the available environment |
| `Locally tested` | Tested directly on the local machine or local repo context |
| `Partially verified` | Some claims tested, some confirmed only from docs |
| `Documentation verified` | Confirmed from primary documentation only |
| `Confirmed` | Legacy label allowed on existing pages, but prefer a more specific label in new material |
| `Not locally tested` | Guidance reviewed but not executed locally |
| `Requires account` | Verification depends on account access |
| `Requires paid plan` | Verification depends on paid access |
| `Platform-specific` | Behavior differs materially by OS, shell, editor, or host |
| `Experimental` | Feature is preview, beta, unstable, or not broadly supported |
| `Deprecated` | Feature or workflow should not be adopted for new use |
| `Unsupported` | Not supported by the official product or maintainer |
| `Unable to verify` | Could not be confirmed with the available evidence or environment |
| `Needs verification` | Current page guidance is incomplete and requires additional validation |

## Source Requirements

Each factual page must end with a `## Sources` section when it contains:

- installation steps
- plan or product limitations
- security claims
- integration claims
- IDE or OS support claims
- MCP or permission behavior
- pricing model statements
- deprecation or roadmap notes

## Code and Command Requirements

All code and command examples must:

- use placeholders for secrets
- avoid destructive defaults
- state the shell when platform differences matter
- identify the working directory when it matters
- prefer official syntax over approximations
- include validation steps where useful
- show expected output only when it materially helps the reader

## Security Requirements

Any page involving tools, workflows, prompts, policies, MCP servers, configs, or automation must answer the relevant parts of this list:

- what access does this tool or workflow receive
- what files can it read
- what files can it write
- can it run shell commands
- can it access external systems
- what credentials are required
- what data may leave the machine
- what destructive actions are possible
- what least-privilege starting point is recommended
- what human review checkpoint is required
- how access is revoked or rolled back

Never include:

- real tokens
- real `.env` values
- customer identifiers
- internal repository URLs unless the page is explicitly for private forks

## Content Quality Checklist

- The page has a clear purpose and audience.
- The page helps the reader make a decision or complete a task.
- Claims are sourced or clearly labelled as unverified.
- Verification status is present and specific.
- Commands and code examples are safe and syntactically valid.
- Platform differences are identified where relevant.
- Security and permission boundaries are documented where relevant.
- Limitations and failure modes are explicit.
- The page includes a realistic example or demonstration when the topic needs one.
- Internal links point to the right destinations.
- The page does not duplicate nearby content unnecessarily.
- The page avoids generic filler and marketing language.

## Page Archetypes

### Tool Page

Required sections:

1. Overview
2. Best suited for
3. Less suited for
4. Confirmed capabilities
5. Limitations
6. Supported environments
7. Installation
8. Authentication
9. First working example
10. Common commands
11. Repository instructions
12. Configuration
13. Permission model
14. MCP or integration support
15. Real workflow demonstration
16. Team adoption guidance
17. Security considerations
18. Troubleshooting
19. Alternatives
20. Verification status
21. Sources

### Workflow Page

Required sections:

1. Objective
2. Audience
3. When to use
4. When not to use
5. Preconditions
6. Required context
7. Recommended tools
8. Step-by-step workflow
9. Reusable prompt
10. Example input
11. Expected agent output
12. Human review checkpoint
13. Validation commands
14. Failure modes
15. Rollback or recovery
16. Completion checklist
17. Team standard
18. Verification note
19. Sources

### MCP Page

Required sections:

1. Purpose
2. Typical use cases
3. Available implementation options
4. Recommended implementation or evaluation mode
5. Host compatibility
6. Prerequisites
7. Installation or evaluation path
8. Configuration example
9. Authentication
10. Permissions requested
11. Read and write capabilities
12. Approval requirements
13. Threat model
14. Least-privilege setup
15. Revocation
16. Troubleshooting
17. Alternatives
18. Verification status
19. Sources

### Prompt Page

Required sections:

1. Prompt objective
2. When to use
3. Required context
4. Prompt or starter set
5. Variables to customize
6. Example filled prompt
7. Example expected output
8. Weak prompt versus strong prompt
9. Failure patterns
10. Tool-specific adjustments
11. Human review checklist
12. Security considerations

### Template Page

Required sections:

1. Template purpose
2. Recommended file path
3. Copy-ready template
4. Field-by-field explanation
5. Minimal version
6. Full version
7. Example completed version
8. Customization guidance
9. Common mistakes
10. Validation checklist

### Governance Page

Required sections:

1. Policy objective
2. Scope
3. Audience
4. Definitions
5. Mandatory requirements
6. Recommended controls
7. Roles and ownership
8. Approval process
9. Exception process
10. Audit evidence
11. Enforcement
12. Review cadence
13. Incident response
14. Revocation process
15. Copy-ready policy template
16. Adoption checklist

Use normative policy language:

- `Must`
- `Must not`
- `Should`
- `May`

## Definition of Done

A page or content batch is done only when:

- the page has been reviewed against the right archetype
- weak or unsupported claims are removed or clearly labelled
- verification status is explicit
- source links are added where needed
- examples are practical and safe
- security guidance is present where relevant
- links and headings render correctly
- the docs site builds successfully
- the page gives the reader a clear next step
