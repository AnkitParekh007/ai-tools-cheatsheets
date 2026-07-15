# Master Prompts

Use these when the task is important enough that the prompt should define objective, constraints, output format, and validation expectations.

## Repository Mapping

**Objective:** map an unfamiliar repository before editing.  
**Required context:** repo root, build/test commands if known.  
**Variables:** `<goal>`, `<risk_areas>`, `<unknowns>`.

```text
Objective: map this repository for <goal>.

Required context:
- identify entry points
- identify build, test, lint, and deploy commands
- identify the riskiest areas to modify
- identify generated files or directories that should not be edited directly

Constraints:
- do not edit files yet
- do not assume architecture without evidence
- call out missing information explicitly

Output format:
1. repository summary
2. runtime and build surface
3. important directories and files
4. risk areas
5. validation commands
6. safe next step
```

**Expected output:** a concrete repo map with file references and validation commands.  
**Human review checklist:** confirm the repo map matches reality before asking for edits.

## Pull Request Review

**Objective:** produce findings-first review output.  
**Required context:** current diff, risk focus, available tests.  
**Variables:** `<focus_areas>`, `<severity_labels>`, `<validation_commands>`.

```text
Review the current diff like a strict senior engineer.

Focus on:
- correctness
- <focus_areas>
- regressions
- missing tests

Rules:
- list findings first
- use severity labels: <severity_labels>
- include file path and why it matters
- suggest the smallest validation command for each significant finding
- separate confirmed concerns from weaker suspicions
- do not summarize until findings are complete
```

**Expected output:** ordered findings with severity, file paths, reasoning, and validation steps.  
**Human review checklist:** confirm each finding against the diff before acting on it.

## Bug Fixing

**Objective:** reproduce, explain, and fix one bug with the smallest safe patch.  
**Required context:** symptom, failing test or repro, suspect files.  
**Variables:** `<symptom>`, `<repro>`, `<validation_scope>`.

```text
Investigate this bug.

Symptom:
<symptom>

Reproduction:
<repro>

Execution phases:
1. explain likely root causes before editing
2. identify the smallest safe fix
3. add the narrowest regression test
4. implement the fix
5. run <validation_scope>

Rules:
- do not widen the patch into unrelated cleanup
- state uncertainty explicitly
- include rollback steps
```

**Expected output:** root cause, narrow fix, regression test, validation, rollback.  
**Human review checklist:** verify the reproduction and ensure the test would fail before the fix.

## Test Generation

**Objective:** add focused coverage without behavior drift.  
**Required context:** production files, adjacent tests, target behavior.  
**Variables:** `<behavior>`, `<test_framework>`, `<target_files>`.

```text
Add focused tests for <behavior>.

Context:
- test framework: <test_framework>
- candidate files: <target_files>

Rules:
- inspect adjacent tests first
- follow local conventions
- avoid unrelated production changes
- explain why each assertion matters
- prefer one or two high-signal tests over broad low-signal coverage
```

**Expected output:** test location, focused cases, rationale, validation commands.  
**Human review checklist:** reject tests that only restate implementation details.

## Angular Upgrade

**Objective:** plan a phased Angular upgrade.  
**Required context:** current versions, target versions, validation gates.  
**Variables:** `<current_versions>`, `<target_versions>`, `<repo_constraints>`.

```text
Plan this Angular upgrade in phases.

Current versions:
<current_versions>

Target versions:
<target_versions>

Constraints:
<repo_constraints>

Output format:
1. dependency audit
2. breaking-change risks
3. migration phases
4. validation gates per phase
5. rollback points
6. open questions before editing

Do not edit until the phase plan is approved.
```

**Expected output:** dependency and breaking-change plan with phased execution.  
**Human review checklist:** verify the version matrix against official Angular upgrade guidance.

## Java Spring Debugging

**Objective:** debug a Spring issue without losing cross-layer context.  
**Required context:** controller/service/repository/config/test files.  
**Variables:** `<entry_point>`, `<failing_behavior>`, `<validation_command>`.

```text
Investigate this Java/Spring issue.

Entry point:
<entry_point>

Failing behavior:
<failing_behavior>

Rules:
- map controller, service, repository, configuration, and test layers first
- call out transaction, authorization, and serialization risks
- propose the smallest safe fix
- include <validation_command>
```

**Expected output:** layer map, root cause, focused patch, validation.  
**Human review checklist:** confirm Spring assumptions against actual configuration and tests.

## CI Failure Investigation

**Objective:** explain a failed job before rerunning it.  
**Required context:** job logs, failing step, workflow file.  
**Variables:** `<job_name>`, `<failed_step>`, `<rerun_scope>`.

```text
Debug this CI failure.

Job:
<job_name>

Failed step:
<failed_step>

Rules:
- classify the failure
- explain likely root cause before proposing a rerun
- suggest the smallest safe patch
- define the narrowest rerun scope: <rerun_scope>
- call out permission or secret risks explicitly
```

**Expected output:** failure classification, root cause, minimal patch, rerun guidance.  
**Human review checklist:** verify the logs support the conclusion.

## Security Review

**Objective:** review code or workflow changes for security-sensitive regressions.  
**Required context:** diff, touched permissions, relevant configs.  
**Variables:** `<risk_areas>`, `<approval_requirements>`.

```text
Review this change for security issues.

Focus on:
- auth and authorization
- secrets
- input validation
- unsafe shell or deployment actions
- external access and data exfiltration
- <risk_areas>

Rules:
- list findings first
- include severity and affected file
- state uncertainty
- include required human approvals: <approval_requirements>
```

**Expected output:** findings, severity, file paths, mitigations, review checkpoints.  
**Human review checklist:** escalate permission-widening or credential-handling changes.

## Documentation Generation

**Objective:** update docs from implementation reality.  
**Required context:** changed code, current docs page, build commands.  
**Variables:** `<source_files>`, `<target_docs>`, `<validation_commands>`.

```text
Update documentation from implementation reality.

Source files:
<source_files>

Target docs:
<target_docs>

Rules:
- read implementation first
- identify stale statements explicitly
- preserve existing URLs
- keep commands copy-pasteable
- run or list validation commands: <validation_commands>
```

**Expected output:** stale-doc list, targeted edits, validation steps.  
**Human review checklist:** verify docs do not claim more than the code supports.

## MCP Evaluation

**Objective:** evaluate an MCP server or category before approval.  
**Required context:** server repo or category, host surface, data sensitivity.  
**Variables:** `<integration>`, `<host>`, `<data_classification>`.

```text
Evaluate this MCP integration before approval.

Integration:
<integration>

Host:
<host>

Data classification:
<data_classification>

Output format:
1. purpose and capabilities
2. read/write/execute risk
3. credentials and network destinations
4. least-privilege trial plan
5. approval requirements
6. revocation plan
7. open verification gaps
```

**Expected output:** approval-grade evaluation checklist.  
**Human review checklist:** do not approve write access until risk and revocation are clear.

## Jira Ticket to Implementation Plan

**Objective:** convert a ticket into a reviewable engineering plan.  
**Required context:** ticket text, impacted systems, acceptance criteria.  
**Variables:** `<ticket>`, `<systems>`, `<delivery_constraints>`.

```text
Turn this Jira ticket into an implementation plan.

Ticket:
<ticket>

Impacted systems:
<systems>

Constraints:
<delivery_constraints>

Output format:
1. clarified objective
2. assumptions and open questions
3. impacted files or services
4. patch sequence
5. tests and validation
6. rollout and rollback
```

**Expected output:** concrete implementation plan with risks and validation.  
**Human review checklist:** confirm the ticket is precise enough before coding begins.

## Verification Note

These prompts are reusable standards, not evidence that every prompt was executed in every supported tool.

## Sources

- [Workflow Overview](../workflows/README.md)
- [Code Review](../workflows/code-review.md)
- [Bug Fixing](../workflows/bug-fixing.md)
- [CI/CD Automation](../workflows/ci-cd-automation.md)
- [Angular Workflows](../workflows/angular-workflows.md)
