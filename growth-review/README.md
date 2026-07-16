# Weekly Growth Review

## Purpose

This subsystem creates a weekly growth review for the public `AnkitParekh007/ai-tools-cheatsheets` repository. It collects GitHub metrics, calculates deterministic week-over-week deltas, optionally asks an AI model to interpret the prepared data, writes a report, updates a weekly GitHub Issue, and stores snapshots plus markdown history on a dedicated automation branch.

## Architecture

The implementation is split into three layers:

1. Data collection
   `scripts/growth/collect-github-metrics.mjs`
2. Deterministic calculations and validation
   `scripts/growth/validate-growth-data.mjs`
   `scripts/growth/calculate-growth-deltas.mjs`
3. Report generation and delivery
   `scripts/growth/generate-ai-report.mjs`
   `scripts/growth/generate-fallback-report.mjs`
   `scripts/growth/create-growth-issue.mjs`

## Metrics Collected

### GitHub repository metrics

- stars
- forks
- subscribers
- watchers
- open issue count
- open pull-request count
- repository size
- default branch
- last push timestamp
- latest release
- total releases
- contributor count

### Issue metrics

- issues created in the period
- issues closed in the period
- open issues at collection time
- open `good first issue` count
- open `help wanted` count
- issue comments in the period
- most active issues

### Pull-request metrics

- new pull requests
- merged pull requests
- closed without merge
- open pull requests
- first-time contributors by PR history
- repeat contributors by PR history
- average time to merge
- open pull requests awaiting first review
- most active pull requests

### Contributor metrics

- current contributor count
- commits in the reporting period
- new contributors from accepted activity
- repeat contributors from accepted activity
- accepted-contributor highlights

### Release metrics

- releases published in the period
- latest release
- total releases
- days since last release

### Discussion metrics

- new discussions
- new discussion comments
- answered discussions
- unanswered answerable discussions
- most active discussions

### Traffic metrics

- views
- approximate unique visitors from daily unique sums
- clones
- approximate unique cloners from daily unique sums
- top referrers
- top content paths

## Metrics Not Collected Yet

- Google Analytics
- Google Search Console
- LinkedIn campaign CSVs
- exact maintainer-response SLA for issues
- exact seven-day distinct GitHub traffic uniques
- tag creation timestamps

## Data Sources

- GitHub REST API
- GitHub GraphQL API
- GitHub traffic endpoints where the token can access them

## Schedule

- Workflow cron: `30 2 * * 1`
- UTC: Monday 02:30
- Asia/Kolkata: Monday 08:00

India does not observe daylight saving time, so the mapping stays fixed.

## Workflow Triggers

- scheduled weekly run
- `workflow_dispatch` for manual reruns

## Write Strategy

The workflow uses a dedicated history branch:

- branch: `automation/weekly-growth-reports`
- reports path: `growth-review/reports/YYYY/YYYY-MM-DD.md`
- snapshots path: `growth-review/snapshots/YYYY/YYYY-MM-DD.json`

This keeps weekly generated files off `main` while preserving versioned history for the next run.

## Required Secrets

Core GitHub collection works with the workflow `GITHUB_TOKEN`.

Optional AI secrets:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

Optional model overrides:

- `OPENAI_MODEL`
- `ANTHROPIC_MODEL`

## Optional Configuration

The workflow and local scripts can override non-secret settings through:

- workflow inputs
- repository variables
- environment variables prefixed with `GROWTH_`

Primary defaults live in [config.json](./config.json).

## Permissions

The workflow requests:

- `contents: write`
- `issues: write`
- `pull-requests: read`

No `pull_request_target` flow is used.

## Local Dry Run

```bash
npm run growth:collect -- --dry-run
npm run growth:validate
npm run growth:delta
npm run growth:fallback
```

Local dry runs write local snapshot and report files, but they do not create GitHub Issues unless `create-growth-issue.mjs` is called explicitly without `--dry-run`.

## Manual Workflow Run

Use `workflow_dispatch` and optionally pass:

- `report_date`
- `create_issue`
- `commit_history`
- `ai_provider`

## Snapshot Format

Snapshots follow [growth-snapshot.schema.json](./schemas/growth-snapshot.schema.json). Validation is implemented in `validate-growth-data.mjs` using a deterministic shape check plus the versioned schema file as the public contract.

## Issue Delivery

The issue script:

- creates one issue per report date
- uses the hidden marker `<!-- weekly-growth-review:YYYY-MM-DD -->`
- updates the existing issue on manual reruns for the same date
- applies only labels that already exist, unless label creation is explicitly enabled

## AI Provider Configuration

The report generator supports:

- `auto`
- `openai`
- `anthropic`
- `none`

Provider selection order in `auto` mode:

1. `OPENAI_API_KEY`
2. `ANTHROPIC_API_KEY`
3. fallback report

The AI model receives already-calculated metrics and deltas. It is not asked to compute basic arithmetic.

## Fallback Behavior

If no AI provider is configured, or if AI generation fails, the workflow still produces a deterministic markdown report with:

- executive summary
- scorecard
- change bullets
- data limitations
- next-week priorities

## Privacy and Security

- credentials stay in GitHub Secrets
- the scripts never print raw tokens
- the public issue omits private external analytics because those adapters are disabled in the first version
- GitHub traffic referrer/path details are collected for history, but public-issue exposure is configurable and conservative by default
- rate-limit retries are bounded
- request timeouts are enforced
- this workflow does not execute code from untrusted pull requests with secrets

## Cost Controls

- one AI request per workflow run
- bounded `maxHighlightedItems`
- bounded `maxAiInputChars`
- bounded `maxOutputTokens`
- timeout-based AI failure cutoff
- deterministic fallback on any AI failure

Costs are driven mainly by the selected model, the amount of context sent to it, and weekly run frequency.

## Troubleshooting

- If traffic metrics are unavailable, confirm the token has enough repository access.
- If discussion metrics fail, confirm Discussions are enabled and GraphQL access is allowed.
- If the issue is duplicated, check the hidden marker and the manual `report_date` input.
- If history is missing, confirm the automation branch exists and the workflow had `contents: write`.

## Known Limitations

- GitHub traffic retention is limited.
- Weekly unique traffic is approximate because GitHub exposes daily uniques, not exact distinct weekly users.
- External analytics adapters are placeholders in the first version.
- Exact maintainer-response attribution for issue comments is not implemented yet.

## Disable the Workflow

To disable scheduled runs:

1. disable the workflow in GitHub Actions, or
2. remove the `schedule` trigger from `.github/workflows/weekly-growth-review.yml`
