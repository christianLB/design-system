# TASK-108: Fix Storybook ReactDOM unmount error

## Status
completed

## Context
After upgrading dependencies for Task 107, Storybook started crashing during render with the following runtime error:

```
import_react_dom.default.unmountComponentAtNode is not a function
```

This occurs because React 19 removes `ReactDOM.unmountComponentAtNode`, which Storybook 7 still expects.

## Analysis
- `package.json` listed `react` and `react-dom` versions `^19.1.0`.
- The packages failed to install (no such version), leaving Storybook to use a partial build.
- Even with a valid React 19 install, Storybook requires the legacy unmount API which was removed.

## Plan
1. Downgrade development dependencies `react` and `react-dom` to `^18.2.0`.
2. Reinstall packages and verify Storybook can build.
3. Run `npm run build` and `npm run test` to ensure the library compiles and tests pass.

## Outcome
Storybook now finds `ReactDOM.unmountComponentAtNode` and renders stories without crashing.
Both `npm run build` and `npm run test` succeed after applying this fix.
