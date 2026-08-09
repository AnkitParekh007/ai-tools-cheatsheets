# AI Coding Tool Cheat Sheets

Start here for fast, source-backed guides to the AI coding tools developers evaluate most often. The five flagship pages now open with a **60-second cheat sheet** before the deeper setup, permissions, security, and team-adoption guidance.

## Flagship Cheat Sheets

| Tool | Best starting point when... | Cheat sheet |
| --- | --- | --- |
| Claude Code | you want terminal-first deep repo work and granular permissions | [Claude Code](claude-code.md) |
| OpenAI Codex | you want terminal work, local review, scripting, and `AGENTS.md` | [OpenAI Codex](openai-codex.md) |
| Cursor | you want an AI-native editor plus terminal agent | [Cursor](cursor.md) |
| GitHub Copilot | your team is GitHub-centric across IDE, CLI, review, and agents | [GitHub Copilot](github-copilot.md) |
| Gemini CLI | you want a Google-backed terminal agent with sandbox and context controls | [Gemini CLI](gemini-cli.md) |

Not sure which one fits? Start with the [AI Coding Tools Comparison](../getting-started/comparison-matrix.md).

## What Every Flagship Page Gives You

- a 60-second command and configuration reference
- five copy-ready prompts for common developer work
- current installation and session commands
- repository instruction-file guidance
- permissions and safer defaults
- MCP / external-tool guidance
- a team adoption checklist
- verification status and official sources

## All Tool Guides

### Terminal and CLI First

- [Claude Code](claude-code.md)
- [OpenAI Codex](openai-codex.md)
- [Gemini CLI](gemini-cli.md)
- [Aider](aider.md)
- [OpenCode](opencode.md)

### Editor and IDE First

- [Cursor](cursor.md)
- [GitHub Copilot](github-copilot.md)
- [Windsurf](windsurf.md)
- [Cline](cline.md)
- [Roo Code](roo-code.md)
- [Continue](continue.md)

### Model / Integration Coverage

- [Grok / xAI](grok-xai.md)

## How To Use a Tool Page

1. Read the 60-second cheat sheet if the page has one.
2. Check `Status`, `Last verified`, and `Verification scope` before copying commands.
3. Compare the repository instruction and permission model with your current engineering standards.
4. Start with a read-only explanation or review task.
5. Test interactive editing before headless or broad automation.
6. Add MCP, plugins, skills, or external systems only after the base workflow is trusted.

## Verification Labels

- `Documentation verified` means the page was reviewed against official documentation, but the workflow was not fully exercised locally in this repository.
- `Partially verified` means some parts were tested or validated more directly than others.
- `Needs verification` means the page is directionally useful but should not be treated as approval-ready without re-checking current official docs.
- `Experimental` or `Platform-specific` means rollout assumptions should stay narrow.

## A Fair Tool Evaluation

Use the same pilot for each candidate:

1. explain an unfamiliar repository without edits
2. review a real diff
3. plan a small bug fix
4. implement the fix interactively
5. run project validation
6. only then evaluate MCP or non-interactive automation

Record the result with the [Tool Evaluation Template](../templates/tool-evaluation-template.md).

> Verification note: the flagship Claude Code, Codex, Cursor, GitHub Copilot, and Gemini CLI guides were re-checked against official sources on 2026-08-09. Other tool pages retain their own verification dates and should be checked individually.
