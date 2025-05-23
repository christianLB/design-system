# CSS Variables Documentation

## Overview

This document explains the CSS variable naming conventions used in the design system, including both the legacy variables (for backward compatibility) and the new standardized variables introduced in version 2.0.0.

## Variable Naming Conventions

### Standardized Variables (v2.0.0+)

The new standardized variables follow a simple, semantic naming convention that aligns with modern design systems and optimizes for Tailwind CSS integration. These variables use HSL color format to enable Tailwind's opacity modifiers.

#### Core Semantic Colors

| Variable | Purpose | Example Usage |
|----------|---------|---------------|
| `--background` | Main background color | `bg-background` |
| `--foreground` | Main text color | `text-foreground` |
| `--primary` | Primary brand color | `bg-primary` |
| `--primary-foreground` | Text on primary color | `text-primary-foreground` |
| `--secondary` | Secondary brand color | `bg-secondary` |
| `--secondary-foreground` | Text on secondary color | `text-secondary-foreground` |
| `--muted` | Subdued background | `bg-muted` |
| `--muted-foreground` | Subdued text | `text-muted-foreground` |
| `--accent` | Accent/highlight color | `bg-accent` |
| `--accent-foreground` | Text on accent color | `text-accent-foreground` |
| `--destructive` | Error/danger color | `bg-destructive` |
| `--destructive-foreground` | Text on destructive color | `text-destructive-foreground` |

#### UI Element Colors

| Variable | Purpose | Example Usage |
|----------|---------|---------------|
| `--card` | Card background | `bg-card` |
| `--card-foreground` | Text on cards | `text-card-foreground` |
| `--popover` | Popover background | `bg-popover` |
| `--popover-foreground` | Text on popovers | `text-popover-foreground` |
| `--border` | Border color | `border-border` |
| `--input` | Input border color | `border-input` |
| `--ring` | Focus ring color | `ring-ring` |

#### Other Design Tokens

| Variable | Purpose | Example Usage |
|----------|---------|---------------|
| `--radius` | Border radius | `rounded-lg` (uses this variable) |

### Legacy Variables (v1.x)

The following variables are maintained for backward compatibility and will be deprecated in a future version.

#### Colors

| Legacy Variable | Description | New Equivalent |
|----------------|-------------|----------------|
| `--app-bg` | Application background | `--background` |
| `--app-content-bg` | Content area background | `--card` / `--popover` |
| `--text-color` | Primary text color | `--foreground` |
| `--text-inverse-color` | Contrasting text color | `--primary-foreground` |
| `--text-muted-color` | Subdued text color | `--muted-foreground` |
| `--color-primary` | Primary brand color | `--primary` |
| `--color-secondary` | Secondary brand color | `--secondary` |
| `--color-accent` | Accent highlight color | `--accent` |
| `--color-destructive` | Error/danger color | `--destructive` |
| `--app-border-color` | Border color | `--border` |

## Color Format

### HSL Format (New Variables)

New standardized variables use HSL format without the `hsl()` wrapper, which allows Tailwind to apply opacity modifiers:

```css
--primary: 217 91% 60%; /* HSL values for blue */
```

This enables opacity variants in Tailwind:

```html
<div class="bg-primary/50">50% opacity primary background</div>
```

### Hex Format (Legacy Variables)

Legacy variables use hex color format:

```css
--color-primary: #3b82f6; /* Hex value for blue */
```

## Theme Switching

The design system supports light and dark themes via the `data-theme` attribute:

```html
<html data-theme="dark">
```

All CSS variables (both legacy and standardized) are defined for both light and dark themes:

```css
:root {
  /* Light theme variables */
  --background: 0 0% 100%;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --background: 222 47% 11%;
}
```

## Usage in Components

### Preferred Usage (v2.0.0+)

```jsx
// Using Tailwind utility classes with standardized variables
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

### Legacy Usage (To Be Deprecated)

```jsx
// Direct CSS variable usage (legacy approach)
<button style={{ 
  backgroundColor: 'var(--color-primary)', 
  color: 'var(--text-inverse-color)' 
}}>
  Click me
</button>
```

## Transition Guide

During the transition period (v1.x to v2.0.0):

1. Both sets of variables are available
2. New components should use the standardized variables
3. Existing components will continue to work with legacy variables
4. The `tailwind.preset.js` has been updated to use the new standardized variables

## Color Conversion

When adding new colors, convert hex to HSL format using the provided utility:

```bash
node scripts/color-converter.js "#3b82f6"
# Output: 217 91% 60%
```

## Best Practices

1. **Use Tailwind Utilities**: Prefer Tailwind utility classes over direct CSS variable references
2. **Follow Semantic Naming**: Use color variables based on their semantic role, not their visual appearance
3. **Consider Contrast**: Ensure sufficient contrast between background and foreground colors
4. **Test Both Themes**: Verify components in both light and dark modes
5. **Use Opacity Modifiers**: Take advantage of Tailwind's opacity modifiers (e.g., `bg-primary/50`) for UI states

## Future Direction

In a future release:
- Legacy variables will be deprecated and eventually removed
- Further optimization of the HSL color palette
- Addition of more semantic color variables for specific UI patterns
