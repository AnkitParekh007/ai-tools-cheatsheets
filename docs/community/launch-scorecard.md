# 30-Day Launch Scorecard

Use this scorecard to measure whether public launch activity creates real developer value and repository growth.

Do not optimize for impressions alone. The primary signals are qualified handbook traffic, GitHub actions, and contributor participation.

## Baseline

Capture the baseline immediately before the public launch post goes live.

| Metric | Baseline | Day 7 | Day 14 | Day 30 |
| --- | ---: | ---: | ---: | ---: |
| GitHub stars | capture at launch |  |  |  |
| GitHub forks | capture at launch |  |  |  |
| Open issues | 13 curated issues on 2026-08-09 |  |  |  |
| Open `good first issue` items | capture at launch |  |  |  |
| Open `help wanted` items | capture at launch |  |  |  |
| Contributors | capture at launch |  |  |  |
| First-time contributor PRs | 0 for launch window |  |  |  |
| Merged community PRs | 0 for launch window |  |  |  |
| GitHub Pages visits | capture from analytics |  |  |  |
| Repository click-throughs | capture from analytics/UTMs |  |  |  |
| Search clicks | capture from Search Console |  |  |  |
| Search impressions | capture from Search Console |  |  |  |
| Referring domains/backlinks | capture if available |  |  |  |

## Flagship Page Scorecard

Record traffic and downstream repository actions by page where analytics support it.

| Page | Visits | GitHub clicks | Shares/backlinks | Notes |
| --- | ---: | ---: | ---: | --- |
| Comparison Matrix |  |  |  |  |
| Claude Code |  |  |  |  |
| OpenAI Codex |  |  |  |  |
| Cursor |  |  |  |  |
| GitHub Copilot |  |  |  |  |
| Gemini CLI |  |  |  |  |
| AGENTS.md |  |  |  |  |
| MCP Overview |  |  |  |  |
| Prompt Library |  |  |  |  |

## Channel Scorecard

| Channel | Asset/angle | Visits | GitHub clicks | Stars/forks attributable | Contributions | Keep / change / stop |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| LinkedIn |  |  |  |  |  |  |
| X / short-form |  |  |  |  |  |  |
| Hacker News |  |  |  |  |  |  |
| Reddit |  |  |  |  |  |  |
| Dev.to / Hashnode |  |  |  |  |  |  |
| GitHub Discussions |  |  |  |  |  |  |
| Organic search |  |  |  |  |  |  |
| Referrals/backlinks |  |  |  |  |  |  |

## Recommended 30-Day Targets

Treat these as experiment targets, not promises.

### Minimum successful launch

- at least 3 distribution channels produce qualified traffic
- at least 2 flagship pages show repeatable interest
- at least 1 first-time external contribution or substantive issue interaction
- the issue backlog remains curated rather than growing through placeholders
- at least 1 meaningful backlink, community mention, or search-query signal emerges

### Strong launch

A strong outcome would additionally show:

- clear week-over-week star/fork growth
- one flagship page becoming the dominant discovery asset
- multiple first-time contributor interactions
- organic search impressions increasing on tool/comparison queries
- a repeatable distribution channel that can be used without spam

Do not set an arbitrary star count as the sole definition of success.

## Conversion Ratios

Where the data is available, calculate:

### Page to repository

```text
repository click-through rate = GitHub clicks / flagship page visits
```

### Repository to star

```text
star conversion = new stars / repository visitors
```

If repository visitor counts are unavailable, use UTM click counts as a directional denominator and label the limitation.

### Contributor conversion

```text
contributor conversion = first-time contributor PRs / good-first-issue visitors
```

Only use this if issue-link analytics are available. Otherwise track first-time PRs as a raw count.

## Weekly Review Questions

Every seven days answer:

1. Which page generated the strongest qualified traffic?
2. Which channel generated the strongest GitHub click-through?
3. Which content angle produced useful technical discussion?
4. Did any starter issue attract an external contributor?
5. Are new visitors landing on deep pages or only the homepage?
6. Which search queries are appearing or growing?
7. Which activity created impressions but no downstream action?
8. What should be doubled down on next week?

## Attribution Rules

- Use UTMs for external campaign links where possible.
- Do not add UTMs to canonical internal handbook links.
- Do not claim a star/fork was caused by a channel when attribution is unclear.
- Separate organic search from social/community referrals.
- Keep screenshots or exported summaries when platform analytics are ephemeral.

## Data Sources

Preferred sources:

- GitHub repository Insights
- GitHub issue/PR/contributor history
- GitHub Pages analytics if configured
- Google Search Console
- platform-native social analytics
- sanitized growth-review inputs already supported by the repository

## Day 30 Retrospective Template

```text
Launch window: 2026-08-09 to 2026-09-08

Biggest win:

Strongest page:

Strongest channel:

Stars/forks change:

Contributor change:

Search/backlink signal:

What we should stop:

What we should repeat:

Next three content priorities:
1.
2.
3.
```
