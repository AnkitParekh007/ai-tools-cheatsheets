# Tools Overview

This section contains tool-specific reference pages for the tools most teams evaluate first.

Each page is expected to answer:

- what the tool is genuinely good at
- what it is less suited for
- which platforms and surfaces are actually documented
- how installation and authentication work
- what configuration or instruction files matter
- what permissions and external access the tool may request
- what a safe first workflow looks like
- what remains verified versus unverified

## How To Use The Tool Pages

1. Start with the tool page for the product you are considering.
2. Check the `Status`, `Last verified`, and `Verification scope` block before you copy commands.
3. Read the `Permission model` and `Security considerations` sections before broad rollout.
4. Use the `First working example` and `Real workflow demonstration` sections before adopting the tool for a team.
5. Treat `Documentation verified` pages as evidence-backed, but not as a substitute for local testing in your own environment.

## Status Expectations

- `Documentation verified` means the page was reviewed against official documentation, but the workflow was not fully exercised locally in this repository.
- `Partially verified` means some parts were tested or validated more directly than others.
- `Needs verification` means the page is kept because it is directionally useful, but should not be treated as approval-ready without re-checking official docs.
- `Experimental` or `Platform-specific` means the tool or workflow needs narrower rollout assumptions.

## Recommended Reading Order

- Terminal-first teams:
  [Claude Code](claude-code.md) -> [OpenAI Codex](openai-codex.md) -> [Aider](aider.md)
- IDE-first teams:
  [Cursor](cursor.md) -> [GitHub Copilot](github-copilot.md) -> [Windsurf](windsurf.md)
- Provider-flexible teams:
  [Cline](cline.md) -> [Continue](continue.md) -> [OpenCode](opencode.md) -> [Roo Code](roo-code.md)

> Verification note: Major tool pages should carry official source links, a `Last verified` date, a specific status label, and a clear `Verification scope` note.
