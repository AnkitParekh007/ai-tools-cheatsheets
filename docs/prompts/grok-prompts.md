# Grok Prompts

Use these starters when the tool is acting more like a research or comparison assistant than a full repo executor.

## Prompt Objective

Pull out trade-offs, comparison language, and decision criteria that can later be verified in the repo workflow.

## When to Use

- high-level tool comparison
- question framing before local implementation work

## Required Context

- exact decision you need to make
- evaluation criteria

## Prompt Starters

```text
Compare these coding tools for repository review, terminal execution, IDE assistance, and governance risk. Separate confirmed differences from assumptions.
```

```text
Turn this rough migration idea into explicit evaluation questions, risks, and follow-up validation steps.
```

## Variables to Customize

- tools being compared
- decision criteria

## Example Filled Prompt

```text
Compare Claude Code, Codex, and Cursor for a team that values repo-wide reasoning, shell execution, and least-privilege adoption.
Separate likely strengths from areas that still need direct tool verification.
```

## Example Expected Output

- comparison criteria
- explicit unknowns
- follow-up validation tasks

## Weak Prompt Versus Strong Prompt

- Weak: `which tool is best`
- Strong: define the team context and decision criteria

## Failure Patterns

- asking for a universal winner

## Tool-Specific Adjustments

- use output as a draft, then verify with official docs and local trials

## Human Review Checklist

- confirm unsupported claims are not copied into docs as facts

## Security Considerations

Keep this surface in evaluation mode unless you have stronger repository control and validation.
