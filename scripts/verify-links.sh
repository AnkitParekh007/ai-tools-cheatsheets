#!/usr/bin/env bash
set -euo pipefail

echo "Basic placeholder link verification"
echo "Scans Markdown files for inline http/https links and reminds maintainers to verify broken or stale references manually."

if ! command -v rg >/dev/null 2>&1; then
  echo "ripgrep (rg) is not installed; skipping."
  exit 0
fi

rg -n "https?://" README.md docs tools configs workflows mcp prompts templates .github || true

echo
echo "This script is intentionally conservative."
echo "For stricter checks, extend it with an allowlist, dead-link checker, or CI job."
