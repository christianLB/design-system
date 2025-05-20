# TASK-003: Comprehensive Export Testing

## Description
Implement a comprehensive test suite that verifies all components in the design system are properly exported and can be imported both in TypeScript and JavaScript contexts. This will prevent regression of export-related issues in future updates.

## Current Issues
- Some components (MultiSelect, ConfirmDialog) are not properly exported, causing runtime errors in consuming applications
- No automated verification of exports across the entire codebase
- Inconsistent export patterns between components
- No validation of runtime vs. type exports

## Implementation Plan

1. **Create Export Test Utility**
   - Create a test utility that can programmatically scan the `components` directory
   - For each component file, verify:
     - The component is properly exported from the main package entry
     - Type definitions are correctly exported and match the component props
     - The component can be imported using both ESM and CommonJS syntax
     - All sub-components and related types are also exported

2. **Test All Export Paths**
   - Test direct imports (e.g., `import { Button } from '@k2600x/design-system'`)
   - Test deep imports (e.g., `import { Button } from '@k2600x/design-system/components/Button'`)
   - Test type imports (e.g., `import type { ButtonProps } from '@k2600x/design-system'`)

3. **Add Integration Tests**
   - Create a minimal Next.js test app that imports and renders each component
   - Verify components render without errors in a real application context
   - Test server-side and client-side rendering

4. **CI/CD Integration**
   - Add the export tests to the CI pipeline
   - Run tests on all PRs and main branch commits
   - Add a pre-publish verification step

5. **Documentation**
   - Document the export patterns and conventions
   - Add a CONTRIBUTING.md section about export requirements
   - Create a checklist for adding new components

## Testing Instructions
1. Run the export test suite: `npm test:exports`
2. Verify all components are properly exported
3. Check the test coverage report to ensure all components are included
4. Verify the tests fail if an export is missing or incorrect

## Related Files
- `src/index.ts`
- `package.json` (exports field)
- `test/exports.test.ts` (new)
- `test-utils/export-tester.ts` (new)
- `.github/workflows/ci.yml`

## Dependencies
- jest
- ts-jest
- @testing-library/react
- next (for integration tests)

## Acceptance Criteria
- [ ] All components can be imported using both ESM and CommonJS
- [ ] All type definitions are correctly exported and match components
- [ ] Tests fail if any component is missing from exports
- [ ] CI pipeline includes export verification
- [ ] Documentation is updated with export patterns
- [ ] No regressions in existing functionality
