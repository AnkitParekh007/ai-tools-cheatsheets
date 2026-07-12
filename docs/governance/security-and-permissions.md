# Security and Permissions

> Safety note: Never paste secrets, `.env` values, or production tokens into AI prompts or shared screenshots.

- Do not paste secrets into prompts.
- Do not expose `.env` files.
- Do not grant broad filesystem access without review.
- Treat MCP servers as privileged.
- Review diffs before committing.
- Avoid auto-running destructive shell commands.
- Use least privilege.
- Prefer read-only access first.
- Document approved tools.
- Avoid unapproved third-party extensions for private code.

> Team tip: Use this repo as the public baseline, then move company-specific tool approvals and MCP allowlists into a team fork.
