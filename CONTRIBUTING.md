# Contributing

This repository is intentionally strict about verification. Additions should improve practical accuracy, not just breadth.

## How To Add A New Tool Page

1. Create a file under `tools/`.
2. Follow the standard tool page structure used in this repo.
3. Add:
   - official docs link
   - last verified date
   - status: `Confirmed`, `Needs verification`, or `Experimental`
4. Add the tool to:
   - `README.md`
   - `docs/comparison-matrix.md` if relevant
   - any config, workflow, or MCP pages that reference it

## How To Update Commands

Before changing an install or usage command:

1. Check official docs first.
2. Confirm platform support.
3. Confirm the actual command name.
4. Confirm whether the command is stable, preview, deprecated, or community-only.
5. If you cannot confirm it, do not invent it. Mark the section `Needs verification`.

## Verification Status Rules

- `Confirmed`: supported by official docs and verified on the current date noted in the file.
- `Needs verification`: official docs are unclear, inaccessible, or changing too quickly to standardize yet.
- `Experimental`: the vendor documents it as beta, preview, nightly, prerelease, or otherwise unstable.

## Source Rules

- Prefer official documentation.
- Use community links only when clearly labeled and only when official docs are insufficient.
- Put source links in the `Sources` section of each tool page.

## Avoiding Hallucinated Commands

- Never guess binary names.
- Never infer install commands from screenshots alone.
- Never copy a community blog command into a confirmed section unless the vendor also documents it.
- If exact syntax is not confirmed, say so plainly.

## Pull Request Checklist

- [ ] Updated the correct file path and navigation links
- [ ] Added or refreshed `Last verified`
- [ ] Included official sources
- [ ] Marked uncertain items as `Needs verification`
- [ ] Avoided unsupported claims
- [ ] Kept commands copy-pasteable
- [ ] Added Windows, macOS, Linux, or WSL notes where relevant
