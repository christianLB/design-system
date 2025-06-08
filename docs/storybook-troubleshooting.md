# Why Storybook doesn't run

## Summary
The repository no longer contains a Storybook setup. The README still references `pnpm storybook`, but the current `package.json` has no `storybook` script or dependencies. The `.storybook` directory is missing as well.

## Evidence
- Searching the repo shows no Storybook config:
  ```bash
  find . -name .storybook -print
  ```
  Result: none.

- `package.json` lacks Storybook dependencies and scripts.
- The build fails due to missing React and other packages, indicating dependencies were removed during a refactor.
- Git history (`git log --diff-filter=D --name-only -- .storybook`) shows commit `81dd4a4` removed the old Storybook files when migrating to design tokens.

## Conclusion
Storybook cannot run because its configuration and dependencies were removed. Either reintroduce the Storybook setup or update the README to remove the `pnpm storybook` instructions.
