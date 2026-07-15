# Prompt Review Policy

This page is a policy starter for reviewing shared prompts before team-wide use.

## Policy Objective

Prevent unsafe or low-signal shared prompts from spreading across teams.

## Scope

- shared prompt libraries
- repo instruction prompts
- automation prompts
- prompts that can run commands, modify code, or access MCP servers

## Audience

- maintainers of prompt libraries
- reviewers
- team leads

## Mandatory Requirements

- shared prompts must name their objective and expected output
- prompts that can edit code, run commands, deploy, or use MCP must include human review checkpoints
- prompts must not encourage secret sharing or unsafe destructive actions

## Recommended Controls

- keep prompts versioned in-repo
- label prompts by risk level
- pair prompts with example outputs and validation commands

## Approval Process

Review prompts before publishing them for broad team use when they:

- edit code
- run commands
- access external systems
- touch production or deployment workflows

## Audit Evidence

- prompt source file
- reviewer sign-off
- example output

## Enforcement

Unsafe shared prompts should be removed or downgraded to private experimentation.

## Copy-Ready Policy Template

```md
Shared prompts that edit code, run commands, deploy, or access MCP servers must include:
- objective
- required context
- validation steps
- human review checkpoint
- security note
```

## Adoption Checklist

- prompts versioned in repo
- risk-labeled
- reviewer assigned

## Verification Note

Template only. Teams should align prompt review depth with their change risk.

## Sources

- [Prompt Library](../prompts/README.md)
