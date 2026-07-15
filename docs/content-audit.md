# Content Audit

Audit date: `2026-07-14`  
Audit baseline commit: `3d4ecf695d2b891085a57848fc16072383ebda87`

## Scope

This audit covers:

- the HonKit source under [docs](./README.md)
- navigation in `docs/SUMMARY.md`
- public repository docs at the repo root
- validation scripts under `scripts/`
- GitHub Actions workflows under `.github/workflows/`

## Current State Summary

| Section | State | Notes |
| --- | --- | --- |
| Start Here | Moderate | strong entry points, still room for deeper sourcing on comparison content |
| Tools | Moderate to strong | best metadata discipline in the repo |
| Config Files | Strong | practical structure and source-backed guidance |
| Workflows | Moderate | now operational and consistent, but examples remain generalized patterns |
| MCP | Moderate | reworked into clearer evaluation guides with least-privilege framing |
| Prompts | Moderate | prompt starters and master prompts are now separated and more reusable |
| Templates | Moderate | copy-ready and more explicit about purpose and file placement |
| Governance | Moderate | now usable as policy starters, but still requires company customization |
| Reference | Thin | glossary remains the lightest section |

## Resolved Findings

- accidental maintainer-local filesystem links removed from public docs
- pinned Node/npm/HonKit toolchain documented
- docs validation expanded beyond simple link discovery
- dedicated docs-validation workflow added for pull requests
- `SECURITY.md`, stronger conduct policy, issue forms, and PR template added
- workflow, MCP, prompt, template, and governance landing pages are no longer placeholders

## Remaining Gaps

- some tool pages still use older `Confirmed` wording instead of a narrower status label
- some comparison and selection pages would benefit from more explicit source-by-criterion references
- glossary depth is still light
- many vendor- or account-specific paths remain `Documentation verified`, `Requires account`, or `Needs verification`

## Pages Still Requiring Caution

Treat these content types as adoption aids rather than proof of local execution:

- account-gated tool workflows
- paid-plan or enterprise-only guidance
- MCP category pages that do not name a verified implementation
- policy starter pages that require company-specific owners and controls

## Validation Coverage

The repository now has checks for:

- forbidden local paths
- navigation targets
- tool-page metadata
- Markdown linting
- docs build output
- internal links and anchors
- generated-route validation after HonKit build

External links are reported as warnings where network uncertainty or rate limits apply.

## Community Readiness Status

- README: launch-ready
- CONTRIBUTING: launch-ready
- CONTRIBUTING_CONTENT: maintainer-ready
- SECURITY.md: present
- Code of Conduct: present and expanded
- Issue forms: present
- PR template: present

## Recommended Next Milestones

1. tighten source coverage on comparison and selection pages
2. convert the highest-traffic tool pages from `Confirmed` to narrower status labels
3. deepen glossary and reference cross-linking
4. add company-fork examples for Angular, Java/Spring, and full-stack repos
