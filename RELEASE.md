# Release Process

This package uses **semantic-release** for automated versioning and releasing.

## How It Works

- Versions are automatically determined based on commit messages
- CHANGELOG is auto-generated
- GitHub releases are created
- Git tags are pushed

## Commit Message Format

Use conventional commits:

- `feat: add new feature` → minor version bump
- `fix: bug fix` → patch version bump
- `docs: update readme` → no version bump
- `chore: maintenance` → no version bump

## Release Process

1. Merge to `main` branch
2. GitHub Actions automatically runs releases
3. Version bump, CHANGELOG update, and tag creation happen automatically

## Manual Release (if needed)

If you need to force a release:

```bash
# Install dependencies
npm install

# Bump version and create release manually
npx semantic-release
```

## Required Secrets

For GitHub Actions to work, add these repository secrets:

- `GITHUB_TOKEN` (automatically provided by GitHub)
- `NPM_TOKEN` (if publishing to npm, optional for Atom packages)
