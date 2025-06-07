# Design Tokens Migration Guide

This guide will help you migrate your components to use the new design tokens system.

## Overview

The design tokens system provides a consistent way to manage design properties like colors, spacing, typography, and more across your application. This migration will help ensure consistency and make it easier to maintain and update your design system.

## Migration Steps

### 1. Install Dependencies

Make sure you have all the required dependencies installed:

```bash
npm install
```

### 2. Run the Token Migration Script

The token migration script will update your components to use the new design tokens:

```bash
npm run migrate-tokens
```

This script will:
- Replace hardcoded values with token references
- Update component styles to use the new token system
- Add necessary imports

### 3. Update Tailwind Configuration

Update your Tailwind configuration to use the new design tokens:

```bash
npm run migrate-tailwind-config
```

This will update your `tailwind.config.js` to use the design tokens for colors, spacing, and other theme values.

### 4. Update Imports

Run the import update script to ensure all components are importing tokens correctly:

```bash
npm run update-imports
```

### 5. Validate Tokens

After migration, validate that all tokens are being used correctly:

```bash
npm run validate-tokens
```

This will check for any remaining hardcoded values that should be using tokens.

### 6. Generate Token Documentation

Generate documentation for all available design tokens:

```bash
npm run generate-token-docs
```

This will create a `DOCS/TOKENS.md` file with information about all available tokens.

## Manual Migration Steps

For cases where the automated scripts can't make all the necessary changes, follow these manual steps:

### 1. Update Component Styles

Replace hardcoded values with token references. For example:

```tsx
// Before
const Button = styled.button`
  background-color: #4f46e5;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
`;

// After
import { tokens } from '../tokens';

const Button = styled.button`
  background-color: var(--primary);
  padding: ${tokens.spacing(2)} ${tokens.spacing(4)};
  border-radius: ${tokens.radius.DEFAULT};
`;
```

### 2. Update Tailwind Classes

When using Tailwind classes, prefer using the token-based classes:

```tsx
// Before
<button className="bg-indigo-600 px-4 py-2 rounded-md">
  Click me
</button>

// After
<button className={`${tokens.colors.primary} ${tokens.spacing(4, 'x')} ${tokens.spacing(2, 'y')} ${tokens.radius.DEFAULT}`}>
  Click me
</button>
```

## Common Issues and Solutions

### 1. Missing Tokens

If you encounter a style that doesn't have a corresponding token:

1. Check if there's a similar token that could be used
2. If not, add a new CSS variable in `src/styles/globals.css`
3. Document the new variable in `DESIGN_TOKENS.md`

### 2. Styling Overrides

If you need to override a token in a specific component:

```tsx
// Using CSS variables for overrides
const CustomButton = styled(Button)`
  --primary: #7c3aed; // Override the primary color
`;
```

### 3. Dark Mode

For dark mode support, use the theme-aware tokens:

```tsx
// The token will automatically adjust for light/dark mode
<div className={tokens.colors.background}>
  <p className={tokens.colors.text}>This text will adjust for dark mode</p>
</div>
```

## Post-Migration

After completing the migration:

1. Test all components in both light and dark modes
2. Check for any visual regressions
3. Update any component documentation to reference the new tokens
4. Run the linter to catch any remaining issues:
   ```bash
   npm run lint:fix
   ```

## Help and Support

If you encounter any issues during the migration:

1. Check the [Design Tokens Guide](./DESIGN_TOKEN_GUIDE.md) for usage examples
2. Look for similar issues in the project's issue tracker
3. If you can't find a solution, open a new issue with details about the problem

## Rollback Plan

If you need to rollback the changes:

1. Revert the Git commit that introduced the tokens
2. Restore any modified files from a backup
3. Reinstall dependencies if needed:
   ```bash
   npm install
   ```
