# Fork for Your Team

Forking this repo is the fastest way for an engineering team to create its own AI coding handbook.

## When Forking Is The Right Move

- You want to keep the public structure and visual identity, but replace the policy and approval layer.
- You want internal prompts, templates, MCP allowlists, and rollout guidance in one place.
- You want to preserve upstream improvements while keeping internal standards private.
- You need a handbook that engineering, DX, and security can all edit without rebuilding the docs site from scratch.

## When Forking Is Not Enough

Forking alone is not enough if:

- your team has not defined who approves tools, MCP servers, or external-system access
- you plan to store secrets or internal infrastructure details in the same public fork
- you want one repo to serve both public community docs and private internal policy without a clear separation plan

## First 24 Hours After Forking

1. Replace the default approved-tool language with your actual current stance.
2. Review every governance page before copying it into internal policy.
3. Decide whether the fork stays public, becomes private, or is mirrored into an internal documentation environment.
4. Replace example support contacts, escalation paths, and policy owners.
5. Review the publishing setup before enabling GitHub Pages or any internal hosting.

## What To Customize First

- approved tools
- model defaults
- MCP policies
- prompt library
- internal support contacts
- private repo security rules

## What To Defer Until After The First Review

- deep tool rewrites
- broad prompt expansion
- large MCP allowlists
- company-specific screenshots
- workflow automation that has not been reviewed by security or platform owners

## Minimum Security And Governance Changes

Before treating a fork as an internal standard, update:

- [../governance/security-and-permissions.md](../governance/security-and-permissions.md)
- [../governance/approved-tools-policy.md](../governance/approved-tools-policy.md)
- [../governance/mcp-approval-policy.md](../governance/mcp-approval-policy.md)
- [../templates/AGENTS.md](../templates/AGENTS.md)
- [../templates/CLAUDE.md](../templates/CLAUDE.md)

## Team Customization Checklist

- [ ] replace approved tool list
- [ ] add internal prompt examples
- [ ] add AGENTS.md and CLAUDE.md variants
- [ ] define MCP allowlist
- [ ] update governance pages
- [ ] update GitHub Pages or private hosting path

## Keep The Fork Maintainable

- Keep the information architecture and URL structure unless there is a clear internal reason to change them.
- Track upstream documentation improvements so your internal fork does not drift into a stale branch.
- Separate organization-specific policy from general tool guidance where possible.
- Avoid copying vendor claims into internal policy without source review and a verification date.

> Team tip: Start by forking the repo, then customize governance and templates before changing every tool page.

## Verification

- Status: Documentation verified
- Last reviewed: 2026-07-13
- Scope: repository forking and Pages guidance reviewed against current GitHub Docs; internal customization guidance is a repository recommendation

## Sources

- [Fork a repository](https://docs.github.com/articles/fork-a-repo)
- [About permissions and visibility of forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-permissions-and-visibility-of-forks)
- [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
