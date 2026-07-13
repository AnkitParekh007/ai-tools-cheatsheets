# Grok / xAI

> Coding model and API provider layer for host tools, not a documented first-party standalone coding CLI in the official developer docs reviewed here.

**Type:** model / API / integration provider  
**Best for:** Vendor diversity, model benchmarking, and host-tool integrations that support xAI models  
**Official docs:** https://docs.x.ai/developers/models  
**Last verified:** 2026-07-13  
**Status:** Documentation verified  
**Verification scope:** Official xAI developer docs for models, quickstart, tools, pricing, and release notes were reviewed. No xAI-hosted coding CLI was verified from the developer docs, and no API calls were executed locally in this repository.

## Overview

xAI should currently be treated in this repository as a **model and API provider layer**, not as a fully documented first-party coding-assistant product surface like Claude Code or Codex. The official developer docs focus on model access, API usage, tools, pricing, and release notes.

For coding use, the current docs explicitly recommend `grok-4.5`.

## Best Suited For

- host tools that let you choose xAI as a provider
- teams benchmarking multiple frontier coding models
- organizations that want vendor diversity at the model layer
- API-driven coding workflows built on top of xAI endpoints

## Less Suited For

- teams expecting a turnkey first-party coding CLI from the developer docs alone
- organizations that want one built-in permission or instruction-file model
- users who do not want to manage API keys and host-tool integration details

## Confirmed Capabilities

- API access through xAI developer docs
- coding model recommendation through `grok-4.5`
- Responses API and Chat Completions support for `grok-4.5`
- tool support including function calling, web search, X search, and code execution
- configurable reasoning effort for supported models

## Limitations

- the coding workflow surface depends on your host tool or your own API client
- permissions, instructions, and repo conventions come from the host environment, not xAI alone
- pricing and model availability can change quickly and should be rechecked before rollout
- this page is documentation-verified only; no API key or live request was tested here

## Supported Environments

xAI's developer docs describe API and model usage rather than a single official editor or CLI surface.

Practical environments therefore depend on the host:

- custom API clients
- provider-flexible IDE tools
- provider-flexible CLIs
- internal agent frameworks

## Installation

There is no first-party coding CLI install path confirmed from the official developer docs reviewed here.

Instead, the quickstart documents the API flow:

1. create an xAI account
2. generate an API key
3. install an SDK or use a compatible client
4. send your first request

## Authentication

The quickstart says to create an xAI account, generate an API key, and export it or place it in a local `.env` file.

Example from the docs:

```bash
export XAI_API_KEY="your_api_key"
```

## First Working Example

Use xAI through a host tool or a direct API call rather than assuming a first-party coding CLI.

Example task for a provider-flexible host tool:

```text
Use Grok 4.5 to review this repository and suggest one low-risk documentation improvement before making any edits.
```

Expected behavior depends on the host tool, not on xAI alone.

## Common Commands

No first-party coding-agent command set is documented in the official xAI developer docs reviewed here.

The practical commands you use will come from:

- your API client
- your IDE extension
- your CLI host tool
- your internal automation framework

## Repository Instructions

xAI does not define a repository-instruction-file standard in the developer docs reviewed here. Shared guidance therefore belongs in the host tool you pair with xAI, such as:

- `AGENTS.md`
- tool-specific rule files
- repo onboarding docs

## Configuration

Configuration is host-tool-dependent, but the xAI docs explicitly document:

- API-key setup
- model choice
- reasoning level for supported models
- tool usage

For a team rollout, keep xAI provider settings separate from repository policy so you can swap models without rewriting repo instructions.

## Permission Model

xAI's developer docs describe model tools, not a full local-agent permission system.

That means the real permission boundary comes from:

- your host tool
- your API gateway
- your internal execution harness
- any enabled server-side tools

Do not confuse "the model can use tools" with "the product has a mature local approval workflow."

## MCP / Integration Support

The xAI docs reviewed here describe tool calling and code execution at the API level, but not a first-party MCP client workflow comparable to Codex, Claude Code, Cursor, or Roo Code. Treat xAI primarily as a provider for tools that already have their own MCP story.

## Real Workflow Demonstration

### Scenario

Your team already uses a provider-flexible coding tool and wants to benchmark xAI as another model option.

### Repository context

A host tool that supports xAI models plus a shared repository instruction system outside xAI itself.

### Request

```text
Use Grok 4.5 to summarize this repository, identify one low-risk improvement, and compare the result with our current default model.
```

### Expected AI behavior

- model quality comes from xAI
- permissions and repo guidance come from the host tool
- cost and tool behavior depend on the chosen API path and enabled server-side tools

### Human review checkpoint

- confirm the host tool is actually using the intended xAI model
- compare output quality and cost against the incumbent model
- inspect whether any server-side tools were invoked

### Validation step

Run your normal build, docs, or test checks after accepting any change from the host tool.

## Team Adoption Guidance

- document xAI as a provider layer, not a standalone repo standard
- benchmark quality, latency, and cost inside your real host tools
- keep repo instructions tool-agnostic so provider swaps stay cheap
- re-check live pricing before team-wide approval

## Security Considerations

- protect `XAI_API_KEY` like any other provider secret
- server-side tool usage can increase both capability and cost
- data handling depends on the host tool and API path you choose
- do not expose the model to broad repository automation without a host-side approval model

## Troubleshooting

- If xAI behavior seems wrong, verify the host tool is actually targeting the intended model.
- If costs are higher than expected, check pricing and whether server-side tools were used.
- If your team expects local approvals or repo instruction inheritance, remember those come from the host tool, not from xAI alone.

## Alternatives

- [Claude Code](claude-code.md), [OpenAI Codex](openai-codex.md), or [Gemini CLI](gemini-cli.md) for first-party coding-agent product surfaces
- [Cursor](cursor.md), [Cline](cline.md), [Continue](continue.md), or [Roo Code](roo-code.md) for provider-flexible host environments

## Verification Status

- Status: Documentation verified
- Last verified: 2026-07-13
- Scope: official xAI docs reviewed for model choice, quickstart, tools, pricing, and release notes
- Not locally tested: xAI account setup, API key provisioning, live requests, or host-tool integrations

## Sources

- https://docs.x.ai/developers/models
- https://docs.x.ai/developers/grok-4-5
- https://docs.x.ai/developers/quickstart
- https://docs.x.ai/developers/tools/overview
- https://docs.x.ai/developers/tools/function-calling
- https://docs.x.ai/developers/pricing
- https://docs.x.ai/developers/release-notes
