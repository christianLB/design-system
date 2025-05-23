# TASK-100: CSS Variable Standardization

**ID:** TASK-100
**Status:** pending
**Priority:** P0
**Assigned to:** 
**Reported by:** Cascade
**Date Created:** 2025-05-23

## 1. Description
Standardize CSS variable naming conventions and implement HSL color format to align with modern design system best practices. This task serves as the foundation for improved theming capabilities, consistent styling, and better Tailwind integration.

## 2. Current Issues/Context
The current design system has several CSS variable naming inconsistencies:

1. Non-standard variable naming patterns:
   - `--app-bg` instead of `--background`
   - `--text-color` instead of `--foreground`
   - Mixed naming conventions (`--color-primary` vs `--app-border-color`)

2. Color format limitations:
   - Direct hex color values (e.g., `#ffffff`) limit Tailwind's ability to apply opacity modifiers
   - HSL format is needed for proper Tailwind color opacity features

3. Mismatch between variable names and Tailwind preset mappings:
   - The `tailwind.preset.js` tries to use variables that don't match what's defined in `globals.css`
   - This causes styling inconsistencies in components and consuming applications

4. The current dark mode implementation requires proper CSS variable scoping.

## 3. Implementation Plan

### 3.1 Audit Current Variables
1. Identify all CSS variables defined in `src/styles/globals.css`
2. Document current variable usage across components
3. Create a mapping between current and standardized variable names

### 3.2 Create Standardized Variables
1. Modify `src/styles/globals.css` to include both legacy and standardized variables:

```css
:root {
  /* Legacy variables - keep during transition */
  --app-bg: #ffffff;
  --text-color: #1e293b;
  --color-primary: #3b82f6;
  /* etc. */
  
  /* Standardized variables - new approach */
  --background: 0 0% 100%; /* HSL values without 'hsl()' */
  --foreground: 222 47% 18%;
  --primary: 217 91% 60%;
  /* etc. */
}

[data-theme="dark"] {
  /* Legacy dark theme variables */
  --app-bg: #0f172a;
  --text-color: #f8fafc;
  --color-primary: #60a5fa;
  /* etc. */
  
  /* Standardized dark theme variables */
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 67%;
  /* etc. */
}
```

### 3.3 Update Tailwind Preset
1. Modify `tailwind.preset.js` to use the standardized variable names with HSL format:

```js
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  /* etc. */
}
```

### 3.4 Create Color Conversion Utility
1. Implement a color conversion utility to help translate hex colors to HSL format
2. Document the conversion process for future reference

### 3.5 Document Variable Standards
1. Create or update documentation on CSS variable naming conventions
2. Document the transition approach for existing projects

## 4. Testing Instructions
1. Build the design system with the updated variables
2. Verify all components render correctly with the new variables
3. Test in both light and dark modes
4. Confirm Tailwind color opacity modifiers work (e.g., `bg-primary/50`)
5. Test in a consuming application to ensure proper style application
6. Verify backwards compatibility with legacy variable names

## 5. Related Files
- `src/styles/globals.css` - Main CSS variables definition
- `tailwind.preset.js` - Tailwind configuration preset
- `src/styles/themes.ts` - Theme object definitions
- `src/index.ts` - CSS import

## 6. Dependencies
- None - This is a foundation task for the 2.0.0 upgrade path

## 7. Notes on Backward Compatibility
This task implements a dual-variable approach to maintain backward compatibility:

1. Keep existing variable names with their current values
2. Add new standardized variables with HSL format
3. Update Tailwind preset to use the new variables
4. Document the transition plan for consumers

This ensures that:
- Existing components continue to work during the transition
- New components can use the improved variable format
- Consuming applications have time to adapt to the new standards

## 8. Completion Criteria
- [ ] All CSS variables have standardized alternatives
- [ ] Variables use HSL format for colors
- [ ] Tailwind preset is updated to use new variables
- [ ] Documentation is updated with new standards
- [ ] All components render correctly with new variables
- [ ] Backward compatibility is maintained
- [ ] Design system builds successfully
