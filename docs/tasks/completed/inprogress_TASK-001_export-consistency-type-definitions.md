# TASK-001: Export Consistency and Type Definitions

## Description
Standardize component exports and type definitions across the design system to ensure consistent imports and proper TypeScript support in consuming applications.

## Current Issues
1. Inconsistent export patterns across components (some use default exports, others use named exports)
2. Type definitions not properly exposed in the package
3. Missing or incorrect type re-exports in index.ts
4. Potential issues with module resolution in consuming applications

## Affected Components
- Button (named export)
- Card (default export)
- Input (named export)
- Table (named export)

## Implementation Plan

### 1. Standardize Component Exports

#### 1.1 Update Button Component
- Ensure proper type exports
- Keep as named export (current pattern)

#### 1.2 Update Card Component
- Convert from default export to named export
- Add proper TypeScript interface

#### 1.3 Update Input Component
- Ensure proper type exports
- Keep as named export (current pattern)

#### 1.4 Update Table Component
- Ensure proper type exports
- Keep as named export (current pattern)

### 2. Update Main Index File
- Create a consistent export pattern in `src/index.ts`
- Ensure all components and their types are properly re-exported
- Maintain backward compatibility

### 3. Update Type Definitions
- Update `fix-types.js` to handle the new export patterns
- Ensure type definitions are properly generated and included in the build

### 4. Update Build Process
- Ensure TypeScript compilation includes all necessary type definitions
- Verify build output in `dist` directory

## Testing Instructions
1. Build the package with `npm run build`
2. Verify no TypeScript errors in the build output
3. Create a test application that imports all components and verifies:
   - Components can be imported individually
   - TypeScript types are correctly inferred
   - No runtime errors when using components

## Related Files
- `src/index.ts`
- `components/*.tsx`
- `scripts/fix-types.js`
- `tsconfig.json`
- `package.json`

## Dependencies
- TypeScript
- React TypeScript types
- Current build tooling (Vite, etc.)
