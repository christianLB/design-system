# TASK-004: Optimize Build System

## Description
Completely revamp the build system to be more efficient, produce cleaner output, and better support tree-shaking in consuming applications.

## Current Issues
1. Build generates hundreds of unnecessary files
2. Inefficient module splitting
3. Poor tree-shaking support
4. Overly complex configuration
5. Large bundle sizes

## Implementation Plan

1. **Simplify Vite Configuration**
   - Remove unnecessary plugins and configurations
   - Optimize for library mode
   - Configure proper external dependencies

2. **Output Structure**
   - Single ESM and CJS bundle for the full package
   - Individual component builds for better tree-shaking
   - Clean dist directory structure

3. **TypeScript Configuration**
   - Generate clean type definitions
   - Ensure proper type exports
   - Generate declaration maps for better IDE support

4. **Package.json Exports**
   - Clean up exports field
   - Support both ESM and CJS
   - Add proper sideEffects flag

5. **Testing**
   - Add build verification tests
   - Test tree-shaking in a sample app
   - Verify bundle sizes

## Expected Output
- Clean `dist` directory with minimal files
- Proper tree-shaking support
- Smaller bundle sizes
- Better developer experience

## Related Files
- `vite.config.ts`
- `tsconfig.json`
- `package.json`
- `dist/` directory

## Dependencies
- vite
- typescript
- rollup (via Vite)
