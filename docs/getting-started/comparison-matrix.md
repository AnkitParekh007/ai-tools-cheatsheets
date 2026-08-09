# AI Coding Tools Comparison: Claude Code vs Codex vs Cursor vs Copilot vs Gemini CLI

Use this page to shortlist an AI coding tool in minutes. The first table focuses on the five flagship tools most developers ask about; the broader ecosystem tables below cover additional terminal and editor options.

> **Last flagship verification:** 2026-08-09. Tool capabilities change quickly, so open the dedicated cheat sheet before standardizing installation, permissions, or automation.

## 60-Second Decision Matrix

| Tool | Start here when you want... | Primary surface | Shared repo instructions | Plan-first workflow | MCP | Automation path |
| --- | --- | --- | --- | --- | --- | --- |
| [Claude Code](../tools/claude-code.md) | terminal-first repo work with granular permissions | CLI + IDE/web/desktop | `CLAUDE.md` | `--permission-mode plan` | Yes | `claude -p`, plugins, skills, hooks |
| [OpenAI Codex](../tools/openai-codex.md) | terminal work, local review, and OpenAI-centered automation | CLI + IDE/app/web/cloud | `AGENTS.md` | permissions/read-only workflow + planning prompts | Yes | `codex exec`, skills, plugins, cloud |
| [Cursor](../tools/cursor.md) | editor-first development with a capable terminal agent | IDE + CLI | `.cursor/rules/`, `AGENTS.md`, `CLAUDE.md` | prompt-level planning / rules | Yes | `agent -p`, headless mode, GitHub Actions |
| [GitHub Copilot](../tools/github-copilot.md) | GitHub-native editor, CLI, review, and repo workflows | IDE + CLI + GitHub.com | `.github/copilot-instructions.md` plus agent files | `/plan` | Yes | `copilot -p`, plugins, skills, hooks |
| [Gemini CLI](../tools/gemini-cli.md) | Google-backed terminal work with sandbox/context controls | CLI | `GEMINI.md` | `--approval-mode=plan` | Yes | `gemini -p`, skills, extensions |

## Pick by Developer Workflow

| If this sounds like you... | Start with | Why |
| --- | --- | --- |
| "I live in the terminal and want explicit permission controls" | Claude Code or Codex | Both center the local repository/terminal loop and expose detailed local access controls |
| "I want AI to live in my editor first" | Cursor or GitHub Copilot | Both support deep editor workflows while also offering terminal agents |
| "My organization already runs on GitHub" | GitHub Copilot | GitHub policy, repo instructions, review, CLI, and GitHub.com workflows share one ecosystem |
| "I want a dedicated local review workflow before shipping" | Codex | Current Codex CLI includes a dedicated review flow that can inspect changes without editing the working tree |
| "I want strong project memory/instructions around a terminal agent" | Claude Code | `CLAUDE.md`, memory commands, rules, permissions, skills, plugins, and MCP form a mature local customization stack |
| "I want multi-model editor workflows" | Cursor | Cursor centers an AI-native editor and exposes multiple model choices through the editor and CLI |
| "I want Google-backed terminal tooling and sandboxing" | Gemini CLI | Gemini CLI documents sandbox mode, approval modes, hierarchical context, skills, and MCP |
| "I need a second approved vendor" | Gemini CLI, Copilot, Cursor, Claude Code, or Codex | Choose based on your existing identity, editor, hosting, and security controls rather than model preference alone |

## Flagship Tool Cards

<div class="ai-comparison-grid">
  <div class="ai-pick-card">
    <h2>Claude Code</h2>
    <p><strong>Start here for:</strong> terminal-first deep repo work, reusable project instructions, and granular permissions.</p>
    <p><a href="../tools/claude-code.md">Open the 60-second Claude Code cheat sheet</a></p>
  </div>
  <div class="ai-pick-card">
    <h2>OpenAI Codex</h2>
    <p><strong>Start here for:</strong> OpenAI-centered terminal work, local code review, scripting, and hierarchical AGENTS.md guidance.</p>
    <p><a href="../tools/openai-codex.md">Open the 60-second Codex cheat sheet</a></p>
  </div>
  <div class="ai-pick-card">
    <h2>Cursor</h2>
    <p><strong>Start here for:</strong> an AI-native editor with rules, multi-model workflows, MCP, and a terminal agent.</p>
    <p><a href="../tools/cursor.md">Open the 60-second Cursor cheat sheet</a></p>
  </div>
  <div class="ai-pick-card">
    <h2>GitHub Copilot</h2>
    <p><strong>Start here for:</strong> GitHub-heavy teams that want IDE, CLI, repository instructions, review, MCP, plugins, and skills in one platform.</p>
    <p><a href="../tools/github-copilot.md">Open the 60-second Copilot cheat sheet</a></p>
  </div>
  <div class="ai-pick-card">
    <h2>Gemini CLI</h2>
    <p><strong>Start here for:</strong> Google-backed terminal workflows with sandboxing, approval modes, hierarchical context, and Agent Skills.</p>
    <p><a href="../tools/gemini-cli.md">Open the 60-second Gemini CLI cheat sheet</a></p>
  </div>
</div>

## Security and Control Snapshot

| Tool | Safer exploration pattern | Local write/command controls | Instruction anchor | External-tool expansion |
| --- | --- | --- | --- | --- |
| Claude Code | `claude --permission-mode plan` | allow/ask/deny rules + permission modes + Bash sandbox | `CLAUDE.md` | MCP, plugins, skills, hooks |
| OpenAI Codex | `:read-only` permission profile | permission profiles + filesystem/network policies | `AGENTS.md` hierarchy | MCP, plugins, skills, cloud |
| Cursor | interactive mode + "do not write code" | CLI allow/deny permission tokens; `--force` is higher risk | `.cursor/rules/` + agent files | MCP + automation/headless workflows |
| GitHub Copilot | `/plan` + narrow tool approvals | interactive approvals + allow/deny CLI flags | `.github/copilot-instructions.md` + merged agent files | MCP, plugins, skills, hooks |
| Gemini CLI | `--approval-mode=plan` and/or `-s` | approval modes + sandboxing + optional folder trust | `GEMINI.md` hierarchy | MCP, skills, extensions |

## Repository Instruction Files

| File / directory | Best known fit | Use it for |
| --- | --- | --- |
| `CLAUDE.md` | Claude Code; also read by some other agents | shared repository conventions and Claude-oriented project context |
| `AGENTS.md` | Codex; also supported by several cross-agent tools | tool-neutral build/test/convention guidance |
| `.cursor/rules/` | Cursor | Cursor-specific scoped project rules |
| `.github/copilot-instructions.md` | GitHub Copilot | GitHub/Copilot repository-wide guidance |
| `.github/instructions/**/*.instructions.md` | GitHub Copilot | path-specific Copilot instructions |
| `GEMINI.md` | Gemini CLI | hierarchical Gemini project context |

If your team uses several agents, prefer one cross-agent source of truth for shared facts and keep tool-specific files small. Duplicated instructions drift quickly.

## Automation Risk Ladder

Use this progression instead of enabling full autonomy on day one:

1. **Read-only repository explanation** — no edits or shell mutations.
2. **Plan/review workflow** — agent proposes changes or reviews an existing diff.
3. **Interactive editing** — edits and commands require approval.
4. **Scoped automation** — non-interactive mode with explicit allowed/denied tools and narrow repo access.
5. **Broad automation** — only after sandbox, network, secret, MCP, rollback, and audit controls are documented.

The safest tool is the one whose permissions your team actually configures and reviews.

## Broader AI Coding Tool Ecosystem

### Terminal Agents and CLIs

| Tool | Primary fit | Repository/config anchor | Team note | Verification |
| --- | --- | --- | --- | --- |
| Claude Code | deep repo and terminal work | `CLAUDE.md` | strong permissions/customization surface | Documentation verified 2026-08-09 |
| OpenAI Codex | terminal work, review, scripting | `AGENTS.md`, `.codex/config.toml` | strong local permission profiles and review path | Documentation verified 2026-08-09 |
| Gemini CLI | Google-backed terminal workflows | `GEMINI.md`, `.gemini/settings.json` | sandbox, approval modes, skills | Documentation verified 2026-08-09 |
| Aider | git-centric pair programming | `.aider.conf.yml` | simple terminal/git loop | Re-check dedicated page |
| OpenCode | open-source hybrid workflows | `opencode.json` | validate current platform setup | Re-check dedicated page |

### IDE and Editor-Led Tools

| Tool | Primary fit | Repository/config anchor | Team note | Verification |
| --- | --- | --- | --- | --- |
| Cursor | AI-native editor + terminal agent | `.cursor/rules/`, `.cursor/cli.json` | multi-model, MCP, headless automation | Documentation verified 2026-08-09 |
| GitHub Copilot | GitHub-native editor/CLI/review | `.github/copilot-instructions.md` | GitHub policy and customization stack | Documentation verified 2026-08-09 |
| Windsurf | IDE/agent platform | product settings | validate current admin and rollout model | Needs verification |
| Cline | provider-flexible editor/CLI | MCP/config files | review provider and MCP permissions | Re-check dedicated page |
| Roo Code | mode-driven VS Code workflows | `.roorules` | configuration can sprawl without standards | Re-check dedicated page |
| Continue | configurable open workflows | `config.yaml` | good fit when provider/config control matters | Re-check dedicated page |

## Questions to Answer Before Standardizing

### Workflow

- Is your team terminal-first, editor-first, or mixed?
- Do you want the agent mainly for explanation/review or for implementation?
- Do you need non-interactive CI/automation?

### Security

- Can the tool execute shell commands?
- Which files must always remain unreadable or unwritable?
- Is network access disabled, allowlisted, or open?
- Which MCP servers, plugins, skills, or hooks are approved?

### Instructions

- What is the canonical repository instruction file?
- Which instructions are shared across tools versus tool-specific?
- Who reviews instruction changes?

### Operations

- Which account/plan provides access?
- How are updates rolled out?
- What is the rollback path when an agent changes too much?
- Which tests, lint checks, and CI gates remain mandatory?

## Recommended Pilot

For any tool, start with the same evaluation so the comparison is fair:

1. Ask it to explain an unfamiliar repository without edits.
2. Ask it to review a real diff.
3. Ask it to plan a small bug fix.
4. Let it implement the fix interactively.
5. Compare correctness, diff quality, required steering, command behavior, permission friction, and validation results.
6. Only then test MCP or non-interactive automation.

Record results with the [Tool Evaluation Template](../templates/tool-evaluation-template.md).

## Next Steps

- [Claude Code Cheat Sheet](../tools/claude-code.md)
- [OpenAI Codex Cheat Sheet](../tools/openai-codex.md)
- [Cursor Cheat Sheet](../tools/cursor.md)
- [GitHub Copilot Cheat Sheet](../tools/github-copilot.md)
- [Gemini CLI Cheat Sheet](../tools/gemini-cli.md)
- [Choosing the Right Tool](choosing-the-right-tool.md)
- [Security and Permissions](../governance/security-and-permissions.md)
- [Prompt Library](../prompts/README.md)

> Verification note: flagship rows were re-checked against official vendor documentation on 2026-08-09. Re-check plan entitlements, model availability, installers, and enterprise policy before rollout.
