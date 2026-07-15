# Changelog

All notable changes to this repository are documented here.

## [1.0.0] - 2026-07-14

### Added

- launch-readiness audit and refreshed content audit
- dedicated `docs:validate` pipeline with path, navigation, metadata, lint, build, and link checks
- `SECURITY.md`, expanded Code of Conduct, issue forms, and stronger PR template
- reproducible Node and npm version declarations via `.nvmrc`, `packageManager`, and pinned HonKit
- richer workflow, MCP, prompt, template, and governance guidance for public launch

### Changed

- replaced placeholder link discovery with real link validation
- updated GitHub Actions to use `npm ci` and documentation validation
- removed accidental maintainer-local path references from public documentation
- refreshed README and contribution guidance for public GitHub consumption

### Known Limitations

- some tool, MCP, and enterprise-plan behaviors remain `Documentation verified`, `Requires account`, or `Needs verification`
- governance pages are policy starters and require company-specific customization before internal adoption
- external-link checks may surface warnings from rate-limited or account-gated sources even when internal links pass
