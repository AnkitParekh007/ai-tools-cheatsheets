# Scripts

## Community issue creation

Use `create-community-issues.sh` to create labels and starter issues for public contribution.

### Prerequisites

- GitHub CLI installed
- authenticated with `gh auth login`
- run from the repo root

### Dry run

```bash
bash scripts/create-community-issues.sh --dry-run
```

### Real run

```bash
bash scripts/create-community-issues.sh
```

### Safety notes

- review the issue titles before running
- dry-run first
- the script skips issue titles that already exist where possible
- labels are created with `--force` so reruns are safe
