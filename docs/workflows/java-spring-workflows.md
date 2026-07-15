# Java Spring Workflows

Use this page to adapt the core workflows to Java and Spring repositories where dependency injection, transactional boundaries, and integration tests matter.

## Objective

Apply AI assistants safely to controller, service, repository, security-config, and test layers without losing architectural context.

## Audience

- Java backend engineers
- maintainers of Spring Boot services

## When to Use

- controller or service debugging
- repository query review
- Spring Security or configuration changes
- release and migration planning

## When Not to Use

- when the agent cannot inspect config, tests, and application wiring together

## Preconditions

- module boundaries are known
- local build and test commands exist

## Required Context

- controller, service, repository, and config files
- test layout
- runtime profile assumptions

## Recommended Tools

- repo-aware CLI agents for cross-layer tracing

## Step-by-Step Workflow

1. Map the controller, service, repository, and config layers before editing.
2. Require the agent to explain transaction, auth, and serialization impact.
3. Validate with focused unit or integration tests.

## Reusable Prompt

```text
Map the controller, service, repository, security configuration, and test layers related to this issue before proposing a fix.
Call out transaction, authorization, and serialization risks explicitly.
```

## Example Input

- Spring controller returns the wrong status code after a service exception

## Expected Agent Output

- layer map
- root cause candidate
- smallest safe fix

## Human Review Checkpoint

- verify framework assumptions against the actual codebase

## Validation Commands

```bash
./mvnw test
```

## Failure Modes

- file-local fixes that ignore configuration or transaction boundaries

## Rollback or Recovery

- revert the focused patch and keep the reproduction notes

## Completion Checklist

- affected layers mapped
- focused tests passed

## Team Standard

Never accept a Spring fix that ignores configuration and security wiring.

## Verification Note

This is a stack-specific operating pattern, not a claim that the repository itself is a Java/Spring project.

## Sources

- [Bug Fixing](./bug-fixing.md)
- [Security Review](./security-review.md)
