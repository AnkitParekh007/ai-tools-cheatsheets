# Community

AI Tools Cheatsheets grows through small, verifiable improvements from developers who actually use these tools.

You do not need to add a new product or rewrite a whole section to contribute. A corrected command, stronger source, clearer workflow, safer permission note, or better example can be a valuable pull request.

## Public Launch

The handbook now has a repeatable public-launch system instead of relying on one-off promotion.

- [2026.08 Launch Edition](release-2026-08.md)
- [Public Launch Playbook](public-launch-playbook.md)
- [30-Day Launch Scorecard](launch-scorecard.md)
- [Wave 1 Campaign Copy](launch-wave-1-copy.md)
- [Launch and Sharing Kit](launch-kit.md)

The launch principle is simple: share one useful developer artifact first, link directly to the page that solves the problem, and let the repository earn the star.

## Start Contributing

- [Contribute in 10 Minutes](../getting-started/contribute-in-10-minutes.md)
- [Contributor Recognition](contributors.md)
- [Good First Issues](https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [Help Wanted](https://github.com/AnkitParekh007/ai-tools-cheatsheets/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
- [Discussions](https://github.com/AnkitParekh007/ai-tools-cheatsheets/discussions)

## What Makes a Good Contribution

A strong contribution is narrow enough to verify and useful enough that another developer benefits immediately.

Good examples:

- verify one install or CLI command against official docs
- add one realistic framework-specific example
- improve a prompt with concrete inputs, constraints, and validation steps
- add a least-privilege note to an MCP workflow
- reproduce a Windows, macOS, Linux, or WSL edge case
- improve navigation, accessibility, or searchability
- refresh a stale source or `Last verified` date

## Community Issue Standard

Issues intended for outside contributors should include:

1. the exact page or file to change
2. why the change matters to readers
3. concrete acceptance criteria
4. the preferred primary sources
5. the validation command to run
6. a clear scope boundary so the task does not expand unexpectedly

`good first issue` should mean a focused task that a new contributor can complete without needing maintainer-only context.

`help wanted` should mean the task is intentionally open for community ownership and may require deeper product or ecosystem knowledge.

## Review Standard

Maintainers should prefer small, reviewable pull requests and respond with actionable feedback. Contributions should not be rejected merely because they are small.

Before merge, the repository expects:

```bash
npm ci
npm run docs:validate
```

For visual or site UX changes, include a screenshot or a short before/after description when practical.

## Recognition

Contributors should receive visible credit for accepted work. See [Contributor Recognition](contributors.md) for the recognition policy and links to GitHub's contributor history.

## Share the Handbook

If a page saves you time, share that specific page rather than only the repository homepage. Developers are more likely to discover the project through a useful comparison, cheat sheet, prompt, or workflow.

Use the [Launch and Sharing Kit](launch-kit.md) for canonical links and evergreen share angles, then use the [Public Launch Playbook](public-launch-playbook.md) and [Wave 1 Campaign Copy](launch-wave-1-copy.md) for the active launch campaign.
