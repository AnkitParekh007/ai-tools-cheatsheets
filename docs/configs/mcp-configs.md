# MCP Configs

Use MCP config to expose approved external tools and context to coding agents. Treat every MCP server as a capability expansion, not just a convenience toggle.

## Core Team Policy

- approve read-only servers first
- store secrets outside repository config when possible
- document a human owner for each server
- define whether OAuth-based servers are allowed
- review rate limits, side effects, and data access before rollout

## Officially Documented Config Locations

### OpenAI Codex

Official docs say Codex stores MCP configuration in:

- `~/.codex/config.toml`
- `.codex/config.toml`

The docs also confirm CLI management commands such as:

- `codex mcp add`
- `codex mcp list`
- `codex mcp login`

### Claude Code

Anthropic's settings docs list MCP server configuration at:

- `~/.claude.json`
- `.mcp.json`

Project settings and personal settings are separate, and Windows `~/.claude` paths resolve under `%USERPROFILE%\\.claude`.

### Cline

Official Cline docs confirm MCP config at:

- `~/.cline/mcp.json`

Project-level `.cline/mcp.json` is also documented in the CLI reference.

## Example Approval Checklist

Before approving a server, answer:

1. what data can this server read?
2. what actions can it take?
3. does it mutate production or external systems?
4. where are credentials stored?
5. who owns break/fix support?
6. is the server safe enough for default enablement?

## Practical Server Categories

Safer early candidates:

- docs lookup
- issue tracker read access
- read-only filesystem helpers

Higher-risk candidates:

- database write access
- deployment systems
- ticket automation
- cloud resource creation

## Cross-Tool Recommendation

Do not try to keep every tool's MCP config identical if the products use different formats. Instead standardize:

- approved server list
- approved auth method
- approved scopes
- naming convention
- owner and rotation policy

Then translate that policy into each tool's config format.

## Sources

- https://learn.chatgpt.com/docs/extend/mcp
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/mcp
- https://docs.cline.bot/mcp/mcp-overview
- https://cursor.com/docs/mcp
