# Analytics Plan

This repository currently does not ship site analytics. That is appropriate for a public open-source handbook until a privacy-conscious measurement layer is chosen intentionally.

## Recommended Approach

Prefer a privacy-first analytics tool such as:

1. Plausible
2. Umami
3. Cloudflare Web Analytics
4. GA4 only if the maintainer explicitly wants broader ecosystem reporting

## Principles

- do not collect prompt text
- do not log user-entered search queries in full if they may contain sensitive text
- do not add trackers before documenting the purpose and retention model

## Events Worth Measuring

- click on the GitHub repository link
- click on the comparison matrix
- click on AGENTS.md or CLAUDE.md
- click on team or leader landing pages
- click on MCP approval policy
- click on tool evaluation template
- search open and search result click
- copy-button usage if copy tracking is later added

## Suggested Event Names

- `github_repo_click`
- `comparison_matrix_click`
- `agents_md_click`
- `team_path_click`
- `leader_path_click`
- `mcp_policy_click`
- `template_click`
- `search_open`
- `search_result_click`

## Reporting Uses

- which pages drive GitHub traffic
- which pages are used by organizations vs individual developers
- which templates and governance pages earn repeat visits

## Manual Setup Requirement

This repository does not add an analytics script automatically in this phase. Create the property first, then decide whether to instrument the shared layout.
