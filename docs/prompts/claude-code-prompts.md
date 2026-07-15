# Claude Code Prompts

Use these prompt starters when working in a repo-aware terminal agent surface.

## Prompt Objective

Get high-context repository reasoning, safer patch planning, and focused validation steps.

## When to Use

- mapping a repo before edits
- reviewing diffs
- planning or applying cross-file fixes

## Required Context

- target files or directories
- expected validation commands
- any do-not-touch areas

## Prompt Starters

```text
Map this repository for a new engineer. Focus on entry points, build/test commands, and risky directories. Do not edit yet.
```

```text
Review the current diff like a strict senior engineer. List findings first with severity, file path, and missing tests.
```

```text
Implement the smallest safe fix for this bug. Add one focused regression test and list rollback steps.
```

## Variables to Customize

- task objective
- validation commands
- risk areas

## Example Filled Prompt

```text
Review the current docs diff like a strict senior engineer.
Focus on broken links, anchor regressions, and missing validation updates.
List findings first and cite the affected file for each finding.
```

## Example Expected Output

- ordered findings
- file paths
- one narrow validation step per finding

## Weak Prompt Versus Strong Prompt

- Weak: `check this repo`
- Strong: define scope, risks, output format, and validation expectations

## Failure Patterns

- asking for edits before context gathering
- not naming the validation command

## Tool-Specific Adjustments

- give file paths or directories explicitly when the repo is large
- ask for a plan before patching on risky changes

## Human Review Checklist

- confirm the agent inspected the right files
- validate high-risk claims manually

## Security Considerations

State if shell execution, writes, or network access should be avoided for the task.
