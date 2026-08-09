# Launch Wave 1 Campaign Copy

These are copy-ready starting points for the first public launch wave. Adjust the wording to match the actual channel and current handbook state before publishing.

Do not publish all variants verbatim on the same day. Each post should teach something useful and link to the most relevant deep page.

## LinkedIn — Primary Launch Post

```text
AI coding tools have moved well beyond autocomplete.

Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and MCP-enabled agents can now inspect repositories, edit multiple files, run commands and automate multi-step engineering work.

The hard part is no longer finding an AI coding tool.

It is understanding:
• which workflow each tool is best suited for
• how repo instructions differ
• where MCP/plugins/extensions fit
• what permissions the agent receives
• when automation is safe
• how to standardize this across a team

I built AI Tools Cheatsheets as an open-source handbook for exactly that.

A good place to start is the AI coding tools comparison:
https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html?utm_source=linkedin&utm_medium=social&utm_campaign=launch-2026-08&utm_content=comparison-matrix

The handbook also includes 60-second cheat sheets for Claude Code, Codex, Cursor, Copilot and Gemini CLI, plus AGENTS.md / CLAUDE.md guidance, MCP, prompts, workflows and team security.

GitHub:
https://github.com/AnkitParekh007/ai-tools-cheatsheets

If something is stale or missing, source-backed corrections are welcome. If it saves you time, a star helps more developers discover it.
```

## LinkedIn — Claude Code vs Codex Follow-Up

```text
Claude Code vs OpenAI Codex is more useful as a workflow comparison than a model-vs-model debate.

For terminal-first development, I would compare them on:

1. how they inspect and modify a repository
2. repo instruction files and persistent context
3. shell execution and approval boundaries
4. planning before editing
5. automation/non-interactive usage
6. MCP/tool integration
7. team standardization

I condensed both into 60-second, source-backed cheat sheets:

Claude Code:
https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/claude-code.html?utm_source=linkedin&utm_medium=social&utm_campaign=launch-2026-08&utm_content=claude-vs-codex

Codex:
https://ankitparekh007.github.io/ai-tools-cheatsheets/tools/openai-codex.html?utm_source=linkedin&utm_medium=social&utm_campaign=launch-2026-08&utm_content=claude-vs-codex

There is also a broader comparison across Cursor, Copilot and Gemini CLI in the same open-source handbook.
```

## LinkedIn — AGENTS.md Angle

```text
One of the easiest ways to get more consistent results from coding agents is to stop re-explaining your repository in every chat.

A good repo instruction file can tell an agent:
• how the project is structured
• which commands to run
• what conventions matter
• what not to touch
• what tests must pass
• when to ask before making a broad change

I put together practical guides for AGENTS.md, CLAUDE.md, Cursor Rules and GitHub Copilot instructions here:

https://ankitparekh007.github.io/ai-tools-cheatsheets/configs/agents-md.html?utm_source=linkedin&utm_medium=social&utm_campaign=launch-2026-08&utm_content=agents-md

The goal is not to create a giant policy file. It is to give the agent the smallest amount of durable context needed to work safely in the repo.
```

## X / Short-Form — Primary Post

```text
Stop comparing AI coding tools only by model quality.

Claude Code vs Codex vs Cursor vs Copilot vs Gemini CLI also differs on:
- repo instructions
- shell/tool execution
- MCP/plugins
- plan-first workflows
- automation risk
- team standardization

Comparison:
https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html?utm_source=x&utm_medium=social&utm_campaign=launch-2026-08&utm_content=comparison-matrix

Open source: github.com/AnkitParekh007/ai-tools-cheatsheets
```

## X / Short-Form — Mini Thread

```text
1/ I turned my notes on modern AI coding tools into an open-source handbook.

Not just commands — the comparison focuses on how developers actually use the tools in repositories.

2/ The flagship pages cover Claude Code, Codex, Cursor, Copilot and Gemini CLI with compact 60-second sections.

3/ I also documented the pieces teams keep rediscovering:
AGENTS.md / CLAUDE.md
MCP
prompts
engineering workflows
permission boundaries

4/ Start with the comparison:
https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html?utm_source=x&utm_medium=social&utm_campaign=launch-2026-08&utm_content=comparison-thread

GitHub:
https://github.com/AnkitParekh007/ai-tools-cheatsheets
```

## Hacker News — Suggested Submission

### Title

```text
Show HN: An open-source handbook for Claude Code, Codex, Cursor, Copilot, Gemini CLI and MCP
```

### First Comment

```text
Hi HN — I maintain this project.

I started it because practical information about AI coding tools was spread across vendor docs, configuration references and one-off posts, while the products were changing quickly.

The handbook tries to be explicit about verification rather than pretending every workflow has been locally tested. The most developed entry points are the comparison matrix and the 60-second cheat sheets for Claude Code, Codex, Cursor, Copilot and Gemini CLI.

I am especially interested in corrections where the official docs have changed, better cross-platform notes, and examples of repo instruction files that are small enough to be useful in real projects.

Comparison:
https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html

Repo:
https://github.com/AnkitParekh007/ai-tools-cheatsheets
```

## Reddit / Developer Community Framing

Do not paste a generic promo into multiple communities. Read the community rules and adapt the post to a real discussion topic.

### Example: tool-comparison discussion

```text
I have been trying to compare AI coding tools based on repository workflow rather than just model benchmarks — things like persistent instructions, shell permissions, MCP/plugins, plan mode and non-interactive automation.

I consolidated the notes into this comparison:
[direct comparison link with the channel UTM]

I maintain the repo, so feedback/corrections are welcome. I am especially interested in where the documented permission or repo-instruction behavior differs from what people are seeing in current versions.
```

### Example: repo-instructions discussion

```text
For teams using multiple coding agents, how are you avoiding duplicated repo instructions across AGENTS.md, CLAUDE.md, Cursor Rules and Copilot instructions?

I wrote up the current file patterns and a few practical boundaries here:
[direct AGENTS.md/config link]

I maintain the handbook. Curious whether teams are keeping one canonical set of instructions and generating tool-specific files, or maintaining them independently.
```

## GitHub Discussion — Release Announcement

### Title

```text
2026.08 Launch Edition: flagship cheat sheets, comparison matrix and contributor-ready backlog
```

### Body

```text
AI Tools Cheatsheets is ready for its first deliberate public launch.

The 2026.08 Launch Edition packages the handbook around the developer paths that are most useful today:

- Claude Code 60-second cheat sheet
- OpenAI Codex 60-second cheat sheet
- Cursor 60-second cheat sheet
- GitHub Copilot 60-second cheat sheet
- Gemini CLI 60-second cheat sheet
- AI coding tools comparison matrix
- AGENTS.md / CLAUDE.md / editor instruction guidance
- MCP evaluation and permission guidance
- prompts and engineering workflows
- team rollout and security guidance

The public issue tracker has also been reduced to a small set of scoped contributor tasks instead of a large placeholder backlog.

Start here:
https://ankitparekh007.github.io/ai-tools-cheatsheets/getting-started/comparison-matrix.html

If you find something stale, please open an issue or PR with the relevant official source. If you use one of these tools heavily, I would especially value real cross-platform verification and safer workflow examples.
```

## Dev.to / Hashnode Article Outline

### Working title

```text
How to Compare AI Coding Agents Beyond Model Benchmarks
```

### Structure

1. Why model quality is not the only decision
2. Terminal-first vs IDE-first workflow
3. Persistent repo instructions
4. Shell/tool execution and approval boundaries
5. MCP/plugins/extensions
6. Plan-first workflows
7. Automation/non-interactive execution
8. Team standardization
9. A five-tool comparison
10. Practical evaluation checklist

Link the article to the Comparison Matrix rather than copying the whole matrix into the article.

## Contributor Invitation Post

```text
Want a small open-source contribution around AI developer tooling?

AI Tools Cheatsheets now keeps a deliberately small `good first issue` queue. Each starter task includes the exact file, source expectations, acceptance criteria and validation command.

A useful PR can be as small as:
- verifying a Cursor shortcut
- adding an Angular or Java/Spring AGENTS.md example
- improving Windows setup notes
- adding one source-backed migration prompt

Starter issues:
https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
```

## Final Publishing Check

Before using any copy above:

- confirm the linked page is live
- confirm the statement is still accurate
- use the channel's actual name in `utm_source`
- avoid asking for a star before delivering value
- disclose maintainership in communities where self-promotion context matters
- do not mass-post identical text across communities
