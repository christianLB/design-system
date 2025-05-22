# TASK-007: Fix Build Exports and Packaging

## Description
This task addresses issues with the build output and npm package contents. The goal is to ensure that the published package:
1. Correctly exports TypeScript type definitions (`.d.ts` files).
2. Only includes necessary files for consumers (primarily the `dist` directory).
3. Excludes development-specific directories like `src` and `node_modules` from the final package.

## Current Issues/Context
- Type definitions (`.d.ts` files) are reportedly not being exported or included correctly in the published package.
- The published package might be incorrectly including the entire `src` directory.
- The published package might be incorrectly including its own `node_modules` directory.

These issues lead to larger package sizes than necessary and prevent TypeScript users from benefiting from type checking and autocompletion when using the design system.

## Implementation Plan

1.  **Verify `package.json` `files` Array**:
    *   Ensure the `files` array in `package.json` correctly lists only the directories and files intended for publishing (e.g., `dist`, `README.md`, `LICENSE`, `CHANGELOG.md`, necessary CSS files like `dist/design-system.css`).
    *   Explicitly remove `src` and any other development-specific paths if present.
    *   Confirm that `node_modules` is not listed (npm excludes it by default if `files` is used as a whitelist).

2.  **Verify TypeScript Configuration (e.g., `tsconfig.build.json`)**:
    *   Ensure `compilerOptions.declaration` is set to `true` to generate `.d.ts` files.
    *   Ensure `compilerOptions.declarationDir` is set to an appropriate path within the `dist` folder (e.g., `./dist/types`) or that `outDir` is configured such that declarations are co-located with JS files in `dist`.
    *   Confirm that the `include` and `exclude` patterns correctly cover all source files that need type definitions.

3.  **Verify `package.json` Type Export Fields**:
    *   Ensure the `types` (or `typings`) field in `package.json` points to the main entry point for type definitions (e.g., `dist/types/index.d.ts`).
    *   Review the `exports` field in `package.json`. For each export condition (e.g., `.` or `./subpath`), ensure there's a corresponding `types` condition pointing to the correct `.d.ts` file (e.g., `"./dist/index.js"` should have a sibling `"types": "./dist/types/index.d.ts"`).

4.  **Inspect Build Output**:
    *   Run the build script (`npm run build`).
    *   Manually inspect the `dist` directory to confirm that `.d.ts` files are generated alongside JavaScript files and are in the expected locations.

5.  **Test Packaging Locally**:
    *   Use `npm pack --dry-run` to get a detailed list of files that would be included in the npm package without actually publishing. This is crucial for verifying that `src`, `node_modules`, and other unwanted files are excluded, and that `dist` and type definitions are included.

6.  **Update Build Scripts (if necessary)**:
    *   If type definitions are generated in a separate step or require specific handling, update the `build` script in `package.json` accordingly.

## Testing Instructions

1.  After implementing the fixes, run `npm run build`.
2.  Inspect the `dist` folder for the presence and correctness of `.d.ts` files.
3.  Run `npm pack --dry-run` and verify its output:
    *   `src` directory should NOT be listed.
    *   `node_modules` directory should NOT be listed.
    *   `dist` directory and its contents (JS files, CSS files, `.d.ts` files) SHOULD be listed.
    *   Other allowed files (`package.json`, `README.md`, etc.) SHOULD be listed.
4.  (Optional but recommended) Link the package locally (`npm link`) to a test TypeScript project and attempt to import components and types from `@k2600x/design-system` to ensure types resolve correctly and provide autocompletion.

## Related Files
- `package.json`
- `tsconfig.json` (and/or `tsconfig.build.json`, `tsconfig.json` used by `vite build`)
- `vite.config.ts`
- Potentially `.npmignore` (though `files` in `package.json` is generally preferred as a whitelist).

## Dependencies
- TypeScript
- Vite
- npm
