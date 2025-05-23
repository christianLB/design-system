# TASK-101: Tailwind Preset Optimization

**ID:** TASK-101
**Status:** pending
**Priority:** P0
**Assigned to:** 
**Reported by:** Cascade
**Date Created:** 2025-05-23

## 1. Description
Optimize the Tailwind preset configuration to properly work with the standardized CSS variable names and implement best practices for consuming applications. This task addresses the critical styling issues identified in recent testing and ensures consistent theming across the design system.

## 2. Current Issues/Context
The current Tailwind preset (`tailwind.preset.js`) has several issues that affect styling consistency:

1. **CSS Variable Mismatch**: The preset attempts to use CSS variables that don't match those defined in `globals.css`
   - Example: Preset uses `--background` while CSS uses `--app-bg`

2. **Color Format Incompatibility**: The preset attempts to use HSL format with hex-defined CSS variables
   - Current: `background: 'hsl(var(--background))'` with CSS `--app-bg: #ffffff`
   - This causes style failures in consuming applications

3. **Dark Mode Configuration Conflicts**: Both the design system preset and consuming applications define darkMode strategies
   - This leads to conflicting behavior and style inconsistencies

4. **Missing Component Classes in Consuming Apps**: Tailwind's JIT engine doesn't always detect all necessary utility classes
   - Classes used in pre-compiled components may not be generated

## 3. Implementation Plan

### 3.1. Align Preset with CSS Variables
1. Update `tailwind.preset.js` to use the correct CSS variable names as defined in TASK-100:

```javascript
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  // Continue with all other color definitions
}
```

### 3.2. Remove Dark Mode Configuration from Preset
1. Remove the `darkMode` configuration from `tailwind.preset.js`:

```javascript
// REMOVE this line from tailwind.preset.js
darkMode: ['selector', '[data-theme="dark"]'],
```

2. Document that consuming applications should define their own dark mode strategy:

```javascript
// Recommended in documentation for consuming apps
// tailwind.config.js in consuming application
darkMode: ['selector', '[data-theme="dark"]'],
```

### 3.3. Create Comprehensive Safelist Configuration
1. Create a recommended safelist configuration for consuming applications:

```javascript
// Recommended safelist for consuming applications
safelist: [
  // Core theme colors with various utilities
  ...[
    'bg', 'text', 'border', 'ring',
    'outline', 'divide', 'placeholder',
    'from', 'via', 'to', 'shadow'
  ].flatMap(utility => [
    'background', 'foreground', 'primary', 'secondary',
    'accent', 'muted', 'card', 'popover', 'destructive'
  ].flatMap(color => [
    `${utility}-${color}`,
    `${utility}-${color}-foreground`,
    // Add opacity variants for bg, text, border
    ...(utility === 'bg' || utility === 'text' || utility === 'border' 
      ? ['10', '20', '30', '40', '50', '60', '70', '80', '90'].map(opacity => 
          `${utility}-${color}/${opacity}`
        )
      : []
    )
  ])),
  
  // Add pattern for component-specific classes
  {
    pattern: /^(btn|card|input|badge|table)-/,
  }
]
```

2. Document the safelist strategy in the design system documentation

### 3.4. Create Compatibility Helper for Legacy Variables
1. Implement a legacy compatibility mode in the preset for transition period:

```javascript
// Optional legacy compatibility mode
colors: {
  // New standardized variables
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  
  // Legacy mappings during transition
  'app-bg': 'var(--app-bg)',
  'text-color': 'var(--text-color)',
  // etc.
}
```

2. Document the transition path and timeline for removal of legacy variables

## 4. Testing Instructions
1. Update `tailwind.preset.js` with the changes
2. Build the design system
3. Test in a consuming application with the recommended configuration
4. Verify components render with correct styles in both light and dark modes
5. Check that Tailwind opacity modifiers work correctly (e.g., `bg-primary/50`)
6. Ensure both new and legacy variable usages function correctly during transition

## 5. Related Files
- `tailwind.preset.js` - Main Tailwind preset configuration
- `docs/theming.md` - Documentation for theming
- `docs/theming_strategy.md` - Documentation for theming strategy

## 6. Dependencies
- TASK-100: CSS Variable Standardization - Must be completed first to establish standardized variables

## 7. Notes on Backward Compatibility
This task implements a transition strategy:

1. Tailwind preset will be updated to use the new standardized variables
2. Documentation will be provided for consuming applications to update their configurations
3. A compatibility layer will be temporarily included for legacy variable support
4. Clear deprecation notices will be included for legacy variables

## 8. Completion Criteria
- [ ] Tailwind preset correctly uses standardized CSS variables
- [ ] Dark mode configuration is removed from preset
- [ ] Safelist recommendations are documented
- [ ] Backwards compatibility approach is implemented
- [ ] Documentation is updated with new configuration guidance
- [ ] Components render correctly in consuming applications
- [ ] Design system builds successfully
