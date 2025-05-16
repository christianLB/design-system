# Design Tokens

This document defines the design tokens used across the design system, including colors, typography, spacing, and other design elements. These tokens ensure consistency and maintainability across all components.

## Color Palette

### Primary Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `primary` | `#007bff` | `#4dabf7` | Primary brand color, main actions, links |
| `primary-foreground` | `#ffffff` | `#ffffff` | Text on primary color |
| `primary-hover` | `#0069d9` | `#3d9ef7` | Hover state of primary elements |
| `primary-active` | `#0056b3` | `#2d8ef7` | Active/pressed state |

### Secondary Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `secondary` | `#6c757d` | `#adb5bd` | Secondary brand color |
| `secondary-foreground` | `#ffffff` | `#1a1a1a` | Text on secondary color |
| `secondary-hover` | `#5a6268` | `#9fa6ad` | Hover state |

### Background Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `background` | `#ffffff` | `#121212` | Main background |
| `foreground` | `#1a1a1a` | `#f5f5f5` | Main text color |
| `card` | `#ffffff` | `#1e1e1e` | Card backgrounds |
| `card-foreground` | `#1a1a1a` | `#f5f5f5` | Text on cards |
| `popover` | `#ffffff` | `#1e1e1e` | Popover backgrounds |
| `popover-foreground` | `#1a1a1a` | `#f5f5f5` | Text in popovers |

### Accent Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `accent` | `#f5f5f5` | `#2d2d2d` | Subtle backgrounds |
| `accent-foreground` | `#1a1a1a` | `#f5f5f5` | Text on accent |
| `muted` | `#f8f9fa` | `#2d2d2d` | Muted backgrounds |
| `muted-foreground` | `#6c757d` | `#adb5bd` | Muted text |

### Destructive Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `destructive` | `#dc3545` | `#ff6b6b` | Error, danger actions |
| `destructive-foreground` | `#ffffff` | `#1a1a1a` | Text on destructive |
| `destructive-hover` | `#c82333` | `#ff5252` | Hover state |

### Success Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `success` | `#28a745` | `#51cf66` | Success states |
| `success-foreground` | `#ffffff` | `#1a1a1a` | Text on success |

### Warning Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `warning` | `#ffc107` | `#ffd43b` | Warning states |
| `warning-foreground` | `#1a1a1a` | `#1a1a1a` | Text on warning |

### Border Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `border` | `#dee2e6` | `#404040` | Default border |
| `input` | `#ced4da` | `#4d4d4d` | Input borders |
| `ring` | `#007bff` | `#4dabf7` | Focus ring |

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `font-sans` | `system-ui, -apple-system, sans-serif` | Main font family |
| `font-mono` | `ui-monospace, SFMono-Regular, monospace` | Code and monospace text |

### Font Sizes
| Token | Size (rem) | Line Height | Usage |
|-------|------------|-------------|-------|
| `text-xs` | 0.75rem | 1rem | Extra small text |
| `text-sm` | 0.875rem | 1.25rem | Small text, captions |
| `text-base` | 1rem | 1.5rem | Body text |
| `text-lg` | 1.125rem | 1.75rem | Large body text |
| `text-xl` | 1.25rem | 1.75rem | Headings, large text |
| `text-2xl` | 1.5rem | 2rem | Large headings |
| `text-3xl` | 1.875rem | 2.25rem | Extra large headings |
| `text-4xl` | 2.25rem | 2.5rem | Display text |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `font-normal` | 400 | Regular text |
| `font-medium` | 500 | Medium emphasis |
| `font-semibold` | 600 | Semibold headings |
| `font-bold` | 700 | Bold text |

## Spacing

### Base Unit
4px (0.25rem)

### Scale
| Token | Value (rem) | Pixels | Usage |
|-------|-------------|--------|-------|
| `space-0` | 0 | 0px | Reset |
| `space-1` | 0.25rem | 4px | Tiny spacing |
| `space-2` | 0.5rem | 8px | Small spacing |
| `space-3` | 0.75rem | 12px | Medium-small spacing |
| `space-4` | 1rem | 16px | Base spacing unit |
| `space-5` | 1.25rem | 20px | Medium spacing |
| `space-6` | 1.5rem | 24px | Large spacing |
| `space-8` | 2rem | 32px | Extra large spacing |
| `space-10` | 2.5rem | 40px | Huge spacing |
| `space-12` | 3rem | 48px | Extra huge spacing |

## Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 0.125rem | Small radius |
| `rounded` | 0.25rem | Default radius |
| `rounded-md` | 0.375rem | Medium radius |
| `rounded-lg` | 0.5rem | Large radius |
| `rounded-xl` | 0.75rem | Extra large radius |
| `rounded-full` | 9999px | Fully rounded |

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle shadow |
| `shadow` | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)` | Default shadow |
| `shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | Medium shadow |
| `shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` | Large shadow |
| `shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` | Extra large shadow |
| `shadow-inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)` | Inner shadow |

## Z-Index
| Token | Value | Usage |
|-------|-------|-------|
| `z-0` | 0 | Base |
| `z-10` | 10 | Dropdowns |
| `z-20` | 20 | Sticky headers |
| `z-30` | 30 | Overlays |
| `z-40` | 40 | Modals |
| `z-50` | 50 | Popovers, tooltips |

## Breakpoints
| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 640px | Small screens |
| `md` | 768px | Medium screens |
| `lg` | 1024px | Large screens |
| `xl` | 1280px | Extra large screens |
| `2xl` | 1536px | 2X large screens |

## Animation
| Token | Value | Usage |
|-------|-------|-------|
| `transition` | `all 150ms cubic-bezier(0.4, 0, 0.2, 1)` | Default transition |
| `duration-75` | `75ms` | Very fast animation |
| `duration-100` | `100ms` | Fast animation |
| `duration-150` | `150ms` | Default animation speed |
| `duration-200` | `200ms` | Slightly slower animation |
| `duration-300` | `300ms` | Slow animation |

## Opacity
| Token | Value | Usage |
|-------|-------|-------|
| `opacity-0` | 0 | Completely transparent |
| `opacity-25` | 0.25 | 25% opacity |
| `opacity-50` | 0.5 | 50% opacity |
| `opacity-75` | 0.75 | 75% opacity |
| `opacity-100` | 1 | Completely opaque |

## Usage in Components

When creating or updating components, use these design tokens to ensure consistency. For example:

```tsx
// Good: Using design tokens
const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

// Bad: Using hardcoded values
const BadButton = styled.button`
  background-color: #007bff; // Don't do this
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
`;
```

## Theme Toggle Implementation

To implement theme toggling, use the following approach:

1. Add a theme provider at the root of your application
2. Toggle between `light` and `dark` classes on the `html` element
3. Use CSS variables that change based on the theme

Example implementation:

```tsx
// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    // Update the HTML class and save preference
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

## CSS Variables Setup

In your global CSS file, define your theme variables:

```css
:root {
  /* Light theme (default) */
  --color-primary: #007bff;
  --color-primary-foreground: #ffffff;
  --color-primary-hover: #0069d9;
  --color-primary-active: #0056b3;
  
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  
  /* Other colors... */
  
  /* Dark theme overrides */
  .dark {
    --color-primary: #4dabf7;
    --color-primary-foreground: #1a1a1a;
    --color-primary-hover: #3d9ef7;
    --color-primary-active: #2d8ef7;
    
    --color-background: #121212;
    --color-foreground: #f5f5f5;
    
    /* Other dark theme colors... */
  }
}
```

## Best Practices

1. **Always use design tokens** - Never hardcode values in components
2. **Respect user preferences** - Support both light and dark modes
3. **Test contrast** - Ensure text has sufficient contrast in both themes
4. **Document customizations** - If a component needs to deviate from the design system, document why
5. **Keep it consistent** - Use the same tokens for the same purposes across components

## Adding New Tokens

1. Add the new token to the appropriate section in this document
2. Update the CSS variables in your theme files
3. If adding a new category, create a new section in this document
4. Document the token's purpose and usage

## Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial design tokens |

---

*This document is a living document and should be updated as the design system evolves.*
