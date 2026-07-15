<p align="center">
  <img src="./assets/images/ai-tools-cheatsheets-logo.svg" alt="AI Tools Cheatsheets" width="860" />
</p>

# AI Tools Cheatsheets

<div class="ai-home-hero">
  <p class="ai-home-lead">
    One open-source handbook for Claude Code, OpenAI Codex, Cursor, GitHub Copilot, Grok, MCP, prompts, templates, and team AI coding workflows.
  </p>
  <div class="ai-home-actions">
    <a class="ai-home-action is-primary" href="getting-started/quick-start.md">Open Quick Start <span aria-hidden="true">-&gt;</span></a>
    <a class="ai-home-action" href="getting-started/comparison-matrix.md">Compare Tools <span aria-hidden="true">-&gt;</span></a>
    <a class="ai-home-action is-warm" href="getting-started/fork-for-your-team.md">Fork for Your Team <span aria-hidden="true">-&gt;</span></a>
  </div>
</div>

> Last updated: 2026-07-15

<div class="ai-home-grid">
  <div class="ai-panel">
    <h2>Start Here</h2>
    <div class="ai-link-list">
      <div class="ai-link-item">
        <span class="ai-link-icon">01</span>
        <div class="ai-link-copy">
          <a href="getting-started/why-this-repo.md">Why This Repo Exists</a>
          <div>Understand the mission, audience, and verification bar.</div>
        </div>
      </div>
      <div class="ai-link-item">
        <span class="ai-link-icon">02</span>
        <div class="ai-link-copy">
          <a href="getting-started/quick-start.md">Quick Start</a>
          <div>Choose a safe starting workflow and get productive fast.</div>
        </div>
      </div>
      <div class="ai-link-item">
        <span class="ai-link-icon">03</span>
        <div class="ai-link-copy">
          <a href="getting-started/choosing-the-right-tool.md">Choosing the Right Tool</a>
          <div>Pick the right terminal, IDE, or MCP workflow by task.</div>
        </div>
      </div>
      <div class="ai-link-item">
        <span class="ai-link-icon">04</span>
        <div class="ai-link-copy">
          <a href="getting-started/comparison-matrix.md">Comparison Matrix</a>
          <div>Compare coverage, security posture, and configuration patterns.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="ai-panel ai-command-panel">
    <h2>Local Setup</h2>
    <code class="ai-command-code">npm install
npm run docs:serve
npm run docs:build
npm run links:check</code>
    <a class="ai-panel-link" href="https://github.com/AnkitParekh007/ai-tools-cheatsheets">Open repository README</a>
  </div>
</div>

<div class="ai-panel">
  <h2>Tool Snapshot</h2>
  <table class="ai-overview-table">
    <thead>
      <tr>
        <th>Tool</th>
        <th>Best for</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Claude Code</strong></td>
        <td>Deep repo and terminal workflows</td>
        <td>Confirmed</td>
      </tr>
      <tr>
        <td><strong>OpenAI Codex</strong></td>
        <td>OpenAI-first coding workflows</td>
        <td>Confirmed</td>
      </tr>
      <tr>
        <td><strong>Cursor</strong></td>
        <td>AI-native IDE workflows</td>
        <td>Needs verification</td>
      </tr>
      <tr>
        <td><strong>GitHub Copilot</strong></td>
        <td>GitHub-heavy teams</td>
        <td>Confirmed</td>
      </tr>
      <tr>
        <td><strong>Grok / xAI</strong></td>
        <td>Model and integration option</td>
        <td>Confirmed</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="ai-three-up">
  <div class="ai-mini-card">
    <div class="ai-mini-icon">M</div>
    <h3>MCP and Automation</h3>
    <p>Review <a href="mcp/overview.md">MCP Overview</a>, <a href="mcp/useful-mcp-servers.md">Useful MCP Servers</a>, and approval guidance before connecting external systems.</p>
  </div>
  <div class="ai-mini-card">
    <div class="ai-mini-icon">P</div>
    <h3>Prompts and Templates</h3>
    <p>Use the <a href="prompts/README.md">Prompt Library</a> and <a href="templates/README.md">Templates</a> to standardize review, testing, migration, and rollout workflows.</p>
  </div>
  <div class="ai-mini-card">
    <div class="ai-mini-icon">T</div>
    <h3>Team Rollout</h3>
    <p>Start with <a href="getting-started/fork-for-your-team.md">Fork for Your Team</a>, <a href="governance/customize-for-your-team.md">Customize for Your Team</a>, and <a href="governance/team-rollout-guide.md">Team Rollout Guide</a>.</p>
  </div>
</div>

> Safety note: Treat coding agents, MCP servers, and repo write access as privileged. Start with [Security and Permissions](governance/security-and-permissions.md).

## Recommended Reader Paths

- Evaluating tools for yourself:
  Read [Why This Repo Exists](getting-started/why-this-repo.md), [Choosing the Right Tool](getting-started/choosing-the-right-tool.md), [Comparison Matrix](getting-started/comparison-matrix.md), then one terminal-tool page and one IDE-tool page.
- Setting a team default:
  Read [Quick Start](getting-started/quick-start.md), [Fork for Your Team](getting-started/fork-for-your-team.md), [Security and Permissions](governance/security-and-permissions.md), and [MCP Approval Policy](governance/mcp-approval-policy.md) before approving broad access.
- Looking for reusable task guidance:
  Start with [Workflow Overview](workflows/README.md), then go to [Code Review](workflows/code-review.md), [Bug Fixing](workflows/bug-fixing.md), [Test Generation](workflows/test-generation.md), or [Migration and Upgrade](workflows/migration-upgrade.md).
- Standardizing prompts or repo instructions:
  Start with [Prompt Library](prompts/README.md), [AGENTS.md](configs/agents-md.md), [CLAUDE.md](configs/claude-md.md), and [Templates](templates/README.md).

## How To Read Verification Status

- `Confirmed` means the current page or linked tool page has been reviewed against primary documentation, but not every workflow claim is necessarily locally tested.
- `Needs verification` means the repo keeps the page because it is directionally useful, but you should not standardize on it without checking the latest official docs first.
- `Experimental`, `Requires account`, `Requires paid plan`, and similar labels should be read as adoption constraints, not footnotes.
- `Last verified` dates matter most on tool pages because product names, install flows, permissions, IDE support, and pricing models change quickly.
- When a page includes a `Sources` section, use those links as the evidence boundary for the claims on that page.

## Contribute and Fork

- GitHub repo: [AnkitParekh007/ai-tools-cheatsheets](https://github.com/AnkitParekh007/ai-tools-cheatsheets)
- Contribution guide: [CONTRIBUTING.md](https://github.com/AnkitParekh007/ai-tools-cheatsheets/blob/main/CONTRIBUTING.md)
- Forking guide: [Fork for Your Team](getting-started/fork-for-your-team.md)
- Promotion guide: [Social Preview and Promotion](getting-started/social-preview-and-promotion.md)
