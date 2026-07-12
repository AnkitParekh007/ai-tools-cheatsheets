#!/usr/bin/env bash
set -euo pipefail

DRY_RUN="${1:-}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is not installed."
  echo "Install gh first: https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated."
  echo "Run: gh auth login"
  exit 1
fi

if [[ "$DRY_RUN" == "--dry-run" ]]; then
  echo "Dry run mode enabled. No labels or issues will be created."
fi

labels=(
  "good first issue"
  "help wanted"
  "documentation"
  "verification"
  "tool-page"
  "prompt"
  "template"
  "workflow"
  "mcp"
  "security"
  "comparison"
  "windows"
  "macos"
  "linux"
  "beginner-friendly"
  "needs-official-source"
  "broken-link"
  "governance"
  "honkit"
  "github-pages"
)

issues=(
  "Verify Claude Code install commands for Windows|documentation,verification,good first issue,windows"
  "Verify Claude Code install commands for macOS|documentation,verification,good first issue,macos"
  "Verify Claude Code install commands for Linux|documentation,verification,good first issue,linux"
  "Verify OpenAI Codex CLI quick start from official docs|documentation,verification,tool-page"
  "Add Cursor keyboard shortcuts cheat sheet|documentation,tool-page,help wanted"
  "Add Cursor rules examples for Angular projects|documentation,tool-page,workflow"
  "Add GitHub Copilot Chat workflow examples|documentation,workflow"
  "Add Grok/xAI coding usage clarification|documentation,tool-page,verification"
  "Add Gemini CLI install notes|documentation,verification,tool-page"
  "Add Windsurf workflow examples|documentation,workflow"
  "Add Cline vs Roo Code comparison|documentation,comparison"
  "Add Aider install notes for Windows|documentation,verification,windows"
  "Add Continue configuration examples|documentation,tool-page"
  "Add OpenCode tool page verification|documentation,verification,tool-page"
  "Add MCP server comparison table|documentation,mcp,comparison"
  "Add GitHub MCP security notes|documentation,mcp,security"
  "Add Jira MCP security notes|documentation,mcp,security"
  "Add Bitbucket MCP page examples|documentation,mcp"
  "Add Playwright MCP example workflow|documentation,mcp,workflow"
  "Add Figma MCP workflow example|documentation,mcp,workflow"
  "Add Supabase/Postgres MCP example|documentation,mcp"
  "Add Slack/Teams MCP approval checklist|documentation,mcp,governance"
  "Add AGENTS.md example for Angular projects|documentation,template,workflow"
  "Add AGENTS.md example for Java/Spring projects|documentation,template,workflow"
  "Add CLAUDE.md example for frontend repos|documentation,template"
  "Add CLAUDE.md example for fullstack repos|documentation,template"
  "Add Cursor rules example for Angular|documentation,template,workflow"
  "Add AI coding security one-page checklist|documentation,security"
  "Add team rollout checklist|documentation,governance"
  "Add cost comparison table|documentation,comparison"
  "Add prompt for PR review|documentation,prompt,good first issue"
  "Add prompt for failing tests|documentation,prompt,good first issue"
  "Add prompt for Angular migration|documentation,prompt,workflow"
  "Add prompt for Java/Spring debugging|documentation,prompt,workflow"
  "Add prompt for release notes|documentation,prompt"
  "Add prompt for documentation generation|documentation,prompt"
  "Add workflow for code review improvements|documentation,workflow"
  "Add workflow for bug fixing improvements|documentation,workflow"
  "Add workflow for feature development improvements|documentation,workflow"
  "Add workflow for test generation improvements|documentation,workflow"
  "Add workflow for refactoring improvements|documentation,workflow"
  "Add workflow for CI/CD debugging|documentation,workflow"
  "Add workflow for security review improvements|documentation,workflow,security"
  "Add comparison matrix missing fields|documentation,comparison"
  "Add official source links to all core tool pages|documentation,verification"
  "Add Last verified date to missing pages|documentation,verification,good first issue"
  "Fix broken internal links in HonKit docs|documentation,broken-link,good first issue"
  "Improve docs homepage cards|documentation,honkit,github-pages"
  "Add GitHub Pages publishing screenshots|documentation,github-pages"
  "Add social preview image generation instructions|documentation,github-pages"
  "Add contributor recognition section examples|documentation,help wanted"
  "Add weekly changelog template|documentation,template"
)

for label in "${labels[@]}"; do
  if [[ "$DRY_RUN" == "--dry-run" ]]; then
    echo "[dry-run] gh label create \"$label\" --force"
  else
    gh label create "$label" --force >/dev/null 2>&1 || true
  fi
done

for issue in "${issues[@]}"; do
  title="${issue%%|*}"
  label_list="${issue##*|}"

  if gh issue list --search "$title in:title" --limit 1 | grep -Fq "$title"; then
    echo "Skipping existing issue: $title"
    continue
  fi

  body=$'Starter community issue for ai-tools-cheatsheets.\n\nExpected outcome:\n- verify or improve the relevant docs page\n- use official sources where possible\n- mark uncertain items as `Needs verification`\n'

  if [[ "$DRY_RUN" == "--dry-run" ]]; then
    echo "[dry-run] gh issue create --title \"$title\" --body ... --label \"$label_list\""
  else
    gh issue create --title "$title" --body "$body" --label "$label_list" >/dev/null
    echo "Created issue: $title"
  fi
done
