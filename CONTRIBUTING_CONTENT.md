# Contributing Content

This file defines the documentation quality standard for this repository.

Use it when you add, rewrite, review, or verify any page under [docs](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs).

For the current repository-wide gap analysis, see [docs/content-audit.md](/C:/Users/aparekh/Desktop/Projects/akki/ai-tools-cheatsheets/docs/content-audit.md).

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
**Status:** Confirmed
**Verification scope:** Docs reviewed on macOS and Windows install paths; CLI not locally tested
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
| `Confirmed` | Acceptable when existing tool pages use it, but prefer a more specific label in new material |
| `Not locally tested` | Guidance reviewed but not executed locally |
| `Requires account` | Verification depends on account access |
| `Requires paid plan` | Verification depends on paid access |
| `Platform-specific` | Behavior differs materially by OS, shell, editor, or host |
| `Experimental` | Feature is preview, beta, unstable, or not broadly supported |
| `Deprecated` | Feature or workflow should not be adopted for new use |
| `Unsupported` | Not supported by the official product or maintainer |
| `Unable to verify` | Could not be confirmed with the available evidence or environment |
| `Needs verification` | Current page guidance is incomplete and requires additional validation |

### Status usage rules

- Use the narrowest truthful label.
- Do not claim `Verified` or `Locally tested` unless the command or workflow was actually exercised.
- If only the docs were checked, use `Documentation verified` or `Not locally tested`.
- If plan restrictions or account access block testing, say so explicitly.

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

### Source rules

- Link only to sources that support the actual claims on the page.
- Prefer a small number of high-quality official sources over many weak links.
- Do not interrupt every paragraph with inline links if a final `Sources` section is clearer.
- If a claim is still uncertain after review, label it as uncertain instead of sourcing it weakly.

## Code and Command Requirements

All code and command examples must:

- use placeholders for secrets
- avoid destructive defaults
- state the shell when platform differences matter
- identify the working directory when it matters
- prefer official syntax over approximations
- include validation steps where useful
- show expected output only when it materially helps the reader

### Example rules

- Prefer safe commands before destructive ones.
- If a command can write, delete, deploy, or revoke access, say so explicitly.
- If an example is illustrative and not locally tested, label it.
- Avoid stale syntax copied from old blog posts or screenshots.

## Security Requirements

Security is mandatory, not optional polish.

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

## Demonstration Requirements

Important pages must include at least one realistic demonstration.

A good demonstration includes:

1. Scenario
2. Repository context
3. User request
4. Prompt or command
5. Expected AI behavior
6. Example output structure
7. Human review checkpoint
8. Validation steps
9. Common failure
10. Safer corrected approach

Do not stop at raw prompt text.

## Accessibility Requirements

Every page must:

- use a valid heading hierarchy
- keep tables readable and scoped
- avoid oversized ungrouped matrices when smaller grouped sections would be clearer
- use descriptive link text
- avoid color-only meaning in notes or callouts
- ensure code is not the only way a concept is explained

## Link and Validation Rules

Before merging content:

- build the site
- validate internal links
- validate navigation if page additions or moves occurred
- review changed anchors if headings changed
- check representative rendered pages

When validation tooling exists, run it.

When it does not exist yet, do not claim validation that was not performed.

## Content Quality Checklist

Use this checklist during review.

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

Different page types must follow different structures.

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

### Configuration File Page

Required sections:

1. Purpose
2. Scope
3. Supported tools
4. File discovery and precedence
5. Recommended location
6. Minimal example
7. Production-grade example
8. Explanation of every section
9. Good and bad patterns
10. Tool-specific differences
11. Security boundaries
12. Validation checklist
13. Migration guidance
14. Sources

### Workflow Page

Required sections:

1. Objective
2. When to use
3. When not to use
4. Preconditions
5. Required context
6. Recommended tools
7. Step-by-step workflow
8. Reusable prompt
9. Example input
10. Expected agent output
11. Human review checkpoint
12. Validation commands
13. Failure modes
14. Rollback approach
15. Completion checklist
16. Team standard
17. Sources

### MCP Page

Required sections:

1. Purpose
2. Typical use cases
3. Available implementation options
4. Recommended implementation
5. Host compatibility
6. Prerequisites
7. Installation
8. Configuration example
9. Authentication
10. Permissions requested
11. Read and write capabilities
12. First working demonstration
13. Example tools exposed
14. Approval requirements
15. Threat model
16. Least-privilege setup
17. Revocation
18. Troubleshooting
19. Alternatives
20. Verification status
21. Sources

### Prompt Page

Required sections:

1. Prompt objective
2. When to use
3. Required context
4. Master prompt
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

## Writing Style

Use:

- clear technical English
- short paragraphs
- direct recommendations
- descriptive headings
- explicit limits and trade-offs
- practical examples

Avoid:

- marketing language
- unsupported superlatives
- generic AI introductions
- vague statements such as `powerful` or `game-changing`
- long walls of text without reader payoff

## Review Checklist for Maintainers

Before approving a docs change, check:

- Does the page fit its archetype?
- Is the verification scope honest?
- Are the sources primary and relevant?
- Would a new team member know what to do next?
- Are permissions and security boundaries explicit?
- Does the page show a real workflow, not just a label?
- Are placeholders used instead of secrets?
- Does the page preserve URL and navigation stability?

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

## Recommended Batch Order

When improving this repository, use this order:

1. Standards and automation
2. Start Here pages
3. Tool pages
4. Config files
5. Workflows
6. MCP pages
7. Prompt pages
8. Template pages
9. Governance pages
10. Glossary and cross-links

## Short Maintainer Template

Use this short checklist at the top of a rewrite PR description:

```md
## Content Check

- [ ] Purpose and audience are clear
- [ ] Verification scope is honest
- [ ] Sources are primary
- [ ] Examples are safe and practical
- [ ] Security boundaries are explicit
- [ ] Links and navigation still work
- [ ] `npm run docs:build` passes
```
