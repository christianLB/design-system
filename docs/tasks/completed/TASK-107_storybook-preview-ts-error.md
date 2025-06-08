# TASK-107: Resolve Storybook preview.ts dynamic import error

## Status
completed

## Context
Users report that Storybook fails to load `.storybook/preview.ts` with the error:
```
Failed to fetch dynamically imported module: http://localhost:6006/.storybook/preview.ts
```
Analysis indicates Storybook is attempting to serve TypeScript directly due to missing TS configuration.

## Plan
1. Add a dedicated `.storybook/tsconfig.json` extending the project `tsconfig.json` so Storybook can transpile preview files.
2. Fix incorrect CSS path in `preview.ts` so global styles load correctly.
3. Verify Storybook starts without preview loading errors by running `npm run build-storybook`.

## Outcome
Storybook should load preview successfully and render stories.

## Implementation Notes
- Added `.storybook/tsconfig.json` extending the main tsconfig so Storybook can compile preview files.
- Updated `.storybook/preview.ts` to import `../index.css` instead of the non-existent `../src/index.css`.
- After these changes Storybook builds successfully and renders stories without dynamic import errors.
