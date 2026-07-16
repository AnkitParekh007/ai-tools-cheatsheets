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
- open issues without maintainer response, attributed from GitHub `author_association`
- average hours to first maintainer response for issues created in the period
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
- open pull requests without maintainer response, attributed from GitHub `author_association`
- average hours to first maintainer response for pull requests created in the period
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

### External analytics metrics

- Search Console summary clicks, impressions, CTR, average position, top queries, and top pages
- sanitized LinkedIn summary impressions, clicks, engagement rate, and top-post rollups

## Metrics Not Collected Yet

- Google Analytics
- tag creation timestamps
- exact seven-day distinct GitHub traffic uniques

## Data Sources

- GitHub REST API
- GitHub GraphQL API
- GitHub traffic endpoints where the token can access them
- sanitized CSV summaries committed to the repository or provided through `workflow_dispatch` paths

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

Optional elevated GitHub token:

- `GROWTH_GITHUB_TOKEN`
  Use this only if you want traffic endpoints that need broader repository permissions than the default `GITHUB_TOKEN` provides in Actions.

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

Example local collection with sanitized external CSVs:

```bash
npm run growth:collect -- \
  --date 2026-07-16 \
  --enable-external-analytics true \
  --search-console-summary-path growth-review/examples/search-console-summary.csv \
  --search-console-queries-path growth-review/examples/search-console-top-queries.csv \
  --search-console-pages-path growth-review/examples/search-console-top-pages.csv \
  --linkedin-summary-path growth-review/examples/linkedin-summary.csv \
  --linkedin-posts-path growth-review/examples/linkedin-top-posts.csv
```

## Manual Workflow Run

Use `workflow_dispatch` and optionally pass:

- `report_date`
- `create_issue`
- `commit_history`
- `ai_provider`
- `enable_external_analytics`
- `enable_github_traffic`
- `search_console_summary_path`
- `search_console_queries_path`
- `search_console_pages_path`
- `linkedin_summary_path`
- `linkedin_posts_path`

Recommended first end-to-end dispatch after changes:

- `report_date`: `2026-07-16`
- `create_issue`: `true`
- `commit_history`: `true`
- `ai_provider`: `none`
- `enable_external_analytics`: `true`
- `enable_github_traffic`: `false`
- `search_console_summary_path`: `growth-review/examples/search-console-summary.csv`
- `search_console_queries_path`: `growth-review/examples/search-console-top-queries.csv`
- `search_console_pages_path`: `growth-review/examples/search-console-top-pages.csv`
- `linkedin_summary_path`: `growth-review/examples/linkedin-summary.csv`
- `linkedin_posts_path`: `growth-review/examples/linkedin-top-posts.csv`

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

## External Adapter Contracts

The external adapter layer intentionally accepts sanitized, summary-friendly CSVs instead of raw exports.

### Search Console summary CSV

Expected columns:

- `metric`
- `value`

Recommended metric keys:

- `start_date`
- `end_date`
- `clicks`
- `impressions`
- `ctr`
- `average_position`
- `queries`
- `pages`

Optional top-query CSV columns:

- `query`
- `clicks`
- `impressions`
- `ctr`
- `position`

Optional top-page CSV columns:

- `page`
- `clicks`
- `impressions`
- `ctr`
- `position`

### LinkedIn summary CSV

Expected columns:

- `metric`
- `value`

Recommended metric keys:

- `start_date`
- `end_date`
- `posts_published`
- `impressions`
- `clicks`
- `reactions`
- `comments`
- `reposts`
- `engagement_rate`
- `followers_gained`

Optional top-post CSV columns:

- `published_at`
- `title`
- `url`
- `impressions`
- `clicks`
- `reactions`
- `comments`
- `reposts`
- `engagement_rate`

See the example files in [`growth-review/examples`](./examples) for working shapes.

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
- commit only sanitized external summaries, never raw analytics exports containing private audience data
- the public issue can include imported summary metrics, so keep those CSVs aggregate and sanitized
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

- If traffic metrics are unavailable in GitHub Actions, the default `GITHUB_TOKEN` likely lacks the necessary repository permissions for traffic endpoints. Keep traffic disabled, or provide `GROWTH_GITHUB_TOKEN` with the required access and set `enable_github_traffic=true`.
- If discussion metrics fail, confirm Discussions are enabled and GraphQL access is allowed.
- If the issue is duplicated, check the hidden marker and the manual `report_date` input.
- If history is missing, confirm the automation branch exists and the workflow had `contents: write`.
- If Search Console or LinkedIn metrics are unavailable, confirm the configured CSV paths exist in the checked-out repository and match the expected summary format.

## Known Limitations

- GitHub traffic retention is limited.
- Weekly unique traffic is approximate because GitHub exposes daily uniques, not exact distinct weekly users.
- Maintainer-response attribution relies on GitHub `author_association`, so custom org roles still collapse into GitHub's standard association values.
- Website analytics adapters beyond Search Console and sanitized LinkedIn summaries are not implemented yet.

## Disable the Workflow

To disable scheduled runs:

1. disable the workflow in GitHub Actions, or
2. remove the `schedule` trigger from `.github/workflows/weekly-growth-review.yml`
