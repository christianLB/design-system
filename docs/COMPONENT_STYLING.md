# Component Styling Guidelines

## Overview

This document defines the standard styling approach for all components in the design system. It ensures consistent, maintainable, and theme-aware styling across the library.

## Styling Principles

1. **Theme-First**: Always use the standardized theme variables rather than hardcoded colors
2. **Utility-Based**: Prefer Tailwind utility classes over custom CSS or inline styles
3. **Variant-Driven**: Use class-variance-authority (cva) for components with multiple variants
4. **Composition**: Use the `cn()` utility for combining class names
5. **Dark Mode**: Ensure all components work correctly in both light and dark modes

## Standard Styling Patterns

### 1. Basic Components

For simple components without variants, use Tailwind utility classes with the `cn()` helper:

```tsx
import { cn } from '../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}
```

### 2. Components with Variants

For components with multiple variants (e.g., different styles, sizes), use class-variance-authority (cva):

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const buttonVariants = cva(
  // Base styles that apply to all variants
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        // Other variants...
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        // Other sizes...
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof buttonVariants> {
  className?: string;
}

export function Button({ 
  className, 
  variant, 
  size, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### 3. Compound Components

For compound components (components made up of multiple parts), use a consistent naming pattern:

```tsx
import { cn } from '../utils';

// Root component
export function Tabs({ className, ...props }: TabsProps) {
  return (
    <div className={cn("w-full", className)} {...props} />
  );
}

// Child components
export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-muted p-1",
        className
      )} 
      {...props} 
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}
```

## CSS Variable Usage

### 1. Preferred Pattern: Tailwind Utility Classes

Use Tailwind utility classes that reference the standardized CSS variables:

```tsx
// GOOD - Using Tailwind utility classes with theme variables
<div className="bg-background text-foreground border-border" />
```

### 2. Acceptable Pattern: Direct CSS References

In rare cases where a utility class is not available, reference CSS variables directly:

```tsx
// ACCEPTABLE - Direct CSS variable reference when needed
<div style={{ 
  boxShadow: `0 0 0 2px var(--primary)` 
}} />
```

### 3. Deprecated Pattern: Legacy Variable References

Avoid using legacy variable names except for backward compatibility:

```tsx
// AVOID - Using legacy variable names
<div style={{ backgroundColor: 'var(--app-bg)' }} />

// BETTER - Using standardized variables
<div className="bg-background" />
```

## Dealing with Specificity

When overriding styles, follow this order of precedence:

1. Use Tailwind's built-in modifier variants (e.g., `hover:`, `focus:`, `dark:`)
2. Use component state attributes (e.g., `data-[state=active]:bg-primary`)
3. Use the `!` important modifier only as a last resort

## Animation and Transitions

For animations and transitions:

1. Define reusable keyframes in `globals.css`
2. Use Tailwind's transition utilities when possible
3. For complex animations, use CSS variables to make them theme-aware

## Component Props Pattern

All styled components should:

1. Accept a `className` prop to allow style overrides
2. Spread additional props to the underlying element
3. Document expected behavior with proper JSDoc comments

## Example Implementation

Here's a complete example of a properly styled component:

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
```

## Testing Your Styles

Always test components in:

1. Light mode and dark mode
2. Different viewport sizes
3. High contrast mode for accessibility
4. With different font sizes (for text scaling)

## Conclusion

By following these guidelines, we ensure all components in the design system have consistent, theme-aware styling that works well in all contexts. This helps maintain a unified design language and makes it easier to update styles system-wide.
