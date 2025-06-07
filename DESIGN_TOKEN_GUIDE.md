# Design Tokens Guide

This guide explains how to use the design tokens in your components to maintain consistency across the design system.

## Table of Contents

1. [Introduction](#introduction)
2. [Available Tokens](#available-tokens)
3. [Using Tokens in Components](#using-tokens-in-components)
4. [Adding New Tokens](#adding-new-tokens)
5. [Best Practices](#best-practices)
6. [Migration Guide](#migration-guide)

## Introduction

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hardcoded values to maintain a scalable and consistent visual system.

## Available Tokens

All tokens are defined as CSS variables in `src/styles/globals.css`. Here's an overview of the available categories:

### Colors

```css
/* Usage */
color: hsl(var(--primary));
background-color: hsl(var(--background));
/* etc. */
```

### Spacing

```typescript
import { spacing } from '../tokens';

// Usage
spacing(4);                    // 'p-4'
spacing(2, 'x');               // 'px-2'
spacing(3, 'y');               // 'py-3'
spacing(1.5, 't');             // 'pt-1.5'
```

### Border Radius

```html
<!-- Usage -->
<div class="rounded-lg"></div>
```

### Shadows

```html
<div class="shadow-md"></div>
```

### Transitions

```html
<button class="transition-colors"></button>
```

## Using Tokens in Components

### Basic Usage

```tsx
function MyComponent() {
  return (
    <button className="bg-background text-foreground px-4 py-2 rounded transition-colors hover:bg-primary hover:text-white">
      Click me
    </button>
  );
}
```

### With Class Variance Authority (CVA)

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva('flex items-center', {
  variants: {
    variant: {
      primary: cn('bg-primary', 'hover:bg-primary/90', 'text-white'),
      outline: cn(
        'border border-border hover:bg-muted text-foreground'
      ),
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

## Adding New Tokens

1. **Add the token** as a CSS variable in `src/styles/globals.css`
2. **Document** the new variable in this guide
3. **Update** any relevant components to use the new token
4. **Run tests** to ensure everything works as expected

## Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Keep token categories** organized and consistent
3. **Use semantic names** that describe the purpose, not the value
4. **Document** new tokens and their intended use cases
5. **Test** components in both light and dark modes

## Migration Guide

To migrate existing components to use the new token system:

1. Run the migration script:
   ```bash
   npm run migrate-tokens
   ```

2. Manually review and fix any remaining hardcoded values

3. Test components thoroughly to ensure visual consistency

4. Run the linter to catch any remaining issues:
   ```bash
   npx eslint . --fix
   ```

## Troubleshooting

### Token not working?
- Ensure the CSS variable is declared in `src/styles/globals.css`
- Check for typos in the variable name

### Styling looks off?
- Check for CSS specificity issues
- Ensure you're using the correct token category
- Verify the component's dark mode styles

---

For more information, refer to the [Design Tokens documentation](DESIGN_TOKENS.md).
