# Contributing Guide

Codex debe seguir el [Manifiesto Codex](./docs/MANIFIESTO_Codex.md) como referencia obligatoria para cualquier contribución.

## Project structure

```
src/
├─ components/           # React components
├─ theme/                # design tokens and theming utilities
├─ hooks/                # reusable hooks
├─ utils/                # helper functions
├─ stories/              # additional stories and docs
└─ index.ts              # barrel exports
```

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/) where possible:
`feat:`, `fix:`, `docs:`, `test:`, `chore:`.

## Pull Request process

1. Run `pnpm lint` and `pnpm test` before opening the PR.
2. Provide Storybook documentation for new components.
3. Ensure accessibility with `jest-axe`.
4. Verify no type or lint errors.
5. Update Storybook preview when applicable.

## Local development

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

### Tests and linters

```bash
pnpm lint   # run ESLint
pnpm test   # run unit tests
```
