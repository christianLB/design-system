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

All tokens are defined in `lib/tokens.ts`. Here's an overview of the available token categories:

### Colors

```typescript
import { tokens } from '../lib/tokens';

// Usage
tokens.colors.primary;          // 'bg-primary'
tokens.colors.text;            // 'text-foreground'
tokens.colors.border;          // 'border-border'
tokens.colors.hover.primary;    // 'hover:bg-primary/90'
tokens.colors.focus.ring;       // 'focus-visible:ring-ring/50'
```

### Spacing

```typescript
import { spacing } from '../lib/tokens';

// Usage
spacing(4);                    // 'p-4'
spacing(2, 'x');               // 'px-2'
spacing(3, 'y');               // 'py-3'
spacing(1.5, 't');             // 'pt-1.5'
```

### Border Radius

```typescript
import { tokens } from '../lib/tokens';

// Usage
tokens.radius.none;             // 'rounded-none'
tokens.radius.sm;              // 'rounded-sm'
tokens.radius.DEFAULT;         // 'rounded'
tokens.radius.lg;              // 'rounded-lg'
tokens.radius.xl;              // 'rounded-xl'
```

### Shadows

```typescript
import { tokens } from '../lib/tokens';

tokens.shadow.none;            // 'shadow-none'
tokens.shadow.sm;             // 'shadow-sm'
tokens.shadow.DEFAULT;        // 'shadow'
tokens.shadow.md;             // 'shadow-md'
tokens.shadow.lg;             // 'shadow-lg'
```

### Transitions

```typescript
import { tokens } from '../lib/tokens';

tokens.transition.DEFAULT;     // 'transition-[color,box-shadow]'
tokens.transition.all;         // 'transition-all'
tokens.transition.colors;      // 'transition-colors'
```

## Using Tokens in Components

### Basic Usage

```tsx
import { tokens } from '../lib/tokens';

function MyComponent() {
  return (
    <button
      className={cn(
        tokens.colors.background,
        tokens.colors.text,
        'px-4 py-2',
        tokens.radius.DEFAULT,
        tokens.transition.DEFAULT,
        tokens.colors.hover.primary,
        'hover:text-white'
      )}
    >
      Click me
    </button>
  );
}
```

### With Class Variance Authority (CVA)

```tsx
import { cva } from 'class-variance-authority';
import { tokens } from '../lib/tokens';

const buttonVariants = cva('flex items-center', {
  variants: {
    variant: {
      primary: cn(
        tokens.colors.primary,
        tokens.colors.hover.primary,
        'text-white'
      ),
      outline: cn(
        'border',
        tokens.colors.border,
        tokens.colors.hover.muted,
        tokens.colors.text
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

1. **Add the token** to the appropriate category in `lib/tokens.ts`
2. **Document** the new token in this guide
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
- Ensure you've imported the tokens: `import { tokens } from '../lib/tokens'`
- Check for typos in the token path
- Verify the token exists in `lib/tokens.ts`

### Styling looks off?
- Check for CSS specificity issues
- Ensure you're using the correct token category
- Verify the component's dark mode styles

---

For more information, refer to the [Design Tokens documentation](DESIGN_TOKENS.md).
