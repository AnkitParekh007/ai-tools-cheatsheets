# Security Policy

This repository documents developer tools, coding agents, prompts, MCP servers, and automation workflows. Security issues include unsafe guidance, unsafe defaults, or repository automation weaknesses, not only code vulnerabilities.

## Supported Scope

Security review applies to the current `main` branch content, GitHub Actions workflows, validation scripts, and published documentation guidance.

Older content may be corrected on a best-effort basis, but the maintained source of truth is the latest content on `main`.

## What Counts as a Security Issue

Please report issues such as:

- instructions that expose secrets, tokens, or private code
- guidance that treats destructive commands as safe defaults
- unsafe MCP permission advice or missing least-privilege warnings
- repository workflows that could leak data or publish untrusted content
- examples that encourage unsafe credential handling
- broken or misleading security guidance that could cause real harm in team adoption

## What Does Not Need Private Reporting

Open a normal documentation issue for:

- typos
- broken links
- missing tool coverage
- layout or styling issues
- non-sensitive factual corrections

## How to Report

Do not post secrets, proof-of-concept credentials, private repositories, or customer data publicly.

Preferred path:

1. Use GitHub Private Vulnerability Reporting if it is enabled for this repository.

Fallback path when private reporting is unavailable:

1. Open a minimal public issue that states a security-sensitive documentation concern exists.
2. Do not include exploit steps, payloads, credentials, or customer details.
3. Ask maintainers to provide a private follow-up channel through GitHub.

## What to Include

Include:

- affected file or public URL
- why the guidance is unsafe
- likely impact
- safer alternative guidance
- proof-of-concept only if it can be shared safely without real secrets or private data

## Maintainer Response Expectations

Maintainers should aim to:

- acknowledge a report promptly
- assess whether the issue is content-only or workflow-impacting
- remove or correct unsafe public guidance quickly
- document the fix in repository history when appropriate

No formal SLA is promised.

## Responsible Disclosure Expectations

- Keep exploit details private until maintainers confirm a safe publication path.
- Do not post real credentials, customer data, or private repository content.
- Use sanitized examples only.
- Do not test against systems you do not own or have permission to assess.

## Proof-of-Concept Handling

Proof-of-concept material should be the minimum needed to explain the issue. Redact tokens, URLs, account names, and private repository identifiers.

## Security Hygiene for Contributors

- Never commit real secrets.
- Never add local filesystem paths tied to a maintainer machine.
- Prefer read-only MCP trials before write access.
- Require human review for merge, deploy, revoke, or production-affecting actions.
