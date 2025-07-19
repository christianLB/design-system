# Theme Builder System Examples

The Theme Builder system provides a powerful, type-safe API for creating and composing themes with support for variants, validation, and CSS variable generation.

## Basic Usage

### Creating a Simple Theme

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

// Create a basic theme
const theme = createThemeBuilder()
  .extends('light')
  .withColors({
    primary: '#2563eb',
    secondary: '#64748b'
  })
  .build();
```

### Using Quick Themes

```typescript
import { quickTheme } from '@k2600x/design-system';

const lightTheme = quickTheme('light');
const darkTheme = quickTheme('dark');
const futuristicTheme = quickTheme('futuristic');
const accessibleTheme = quickTheme('high-contrast');
```

## Advanced Composition

### Theme Inheritance and Composition

```typescript
import { createThemeBuilder, composeThemes } from '@k2600x/design-system';

// Create a base corporate theme
const corporateBase = createThemeBuilder()
  .extends('light')
  .withColors({
    primary: '#1e40af',
    secondary: '#475569'
  })
  .withTypography({
    fontFamily: "'Inter', system-ui, sans-serif"
  })
  .build();

// Create a variant for marketing
const marketingTheme = createThemeBuilder()
  .extends(corporateBase)
  .withColors({
    primary: '#9333ea', // More vibrant purple
    accent: {
      background: '#fbbf24',
      foreground: '#000000'
    }
  })
  .withVariant('comfortable')
  .build();

// Merge themes with conflict resolution
const hybridTheme = composeThemes(
  corporateBase,
  marketingTheme,
  'merge',
  { colorConflicts: 'blend', preserveAccessibility: true }
);
```

### Complex Customizations

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

const complexTheme = createThemeBuilder()
  .extends('dark')
  .withColors({
    primary: '#3b82f6',
    secondary: '#10b981',
    surface: {
      background: '#0f172a',
      card: '#1e293b',
      popover: '#334155'
    },
    border: {
      default: '#475569',
      input: '#64748b'
    }
  })
  .withTypography({
    fontFamily: "'SF Pro Display', system-ui, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  })
  .withSpacing({
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  })
  .withMotion({
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms'
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  })
  .withRadius({
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  })
  .withShadows({
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  })
  .withVariant('comfortable')
  .build();
```

## Theme Variants

### Using Built-in Variants

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

// Compact variant - denser UI
const compactTheme = createThemeBuilder()
  .extends('light')
  .withVariant('compact')
  .build();

// Comfortable variant - more spacious
const comfortableTheme = createThemeBuilder()
  .extends('light')
  .withVariant('comfortable')
  .build();

// High contrast variant - accessibility focused
const accessibleTheme = createThemeBuilder()
  .extends('light')
  .withVariant('high-contrast')
  .build();
```

### Custom Variant Configuration

```typescript
import { createThemeBuilder, applyVariant } from '@k2600x/design-system';

const baseTheme = createThemeBuilder()
  .extends('light')
  .build();

// Apply custom variant configuration
const customVariant = applyVariant(baseTheme, 'compact', {
  spacing: {
    multiplier: 0.6, // Even more compact
    baseUnit: 'rem'
  },
  typography: {
    sizeMultiplier: 0.9,
    lineHeightMultiplier: 0.95
  }
});
```

## React Integration

### Using Theme Builder Hook

```typescript
import React from 'react';
import { useThemeBuilder } from '@k2600x/design-system';

function ThemeCustomizer() {
  const {
    withColors,
    withVariant,
    build,
    apply,
    validation,
    isValid,
    hasChanges
  } = useThemeBuilder('light', {
    autoApply: true,
    validateOnBuild: true
  });

  const handleColorChange = (primary: string) => {
    withColors({ primary });
    build();
  };

  return (
    <div>
      <button onClick={() => handleColorChange('#9333ea')}>
        Purple Theme
      </button>
      <button onClick={() => withVariant('compact')}>
        Compact Variant
      </button>
      {!isValid && (
        <div>
          Validation Issues: {validation?.errors.length}
        </div>
      )}
    </div>
  );
}
```

### Theme Provider Integration

```typescript
import React from 'react';
import { ThemeProvider, createThemeBuilder } from '@k2600x/design-system';

const customTheme = createThemeBuilder()
  .extends('dark')
  .withColors({ primary: '#10b981' })
  .build();

function App() {
  return (
    <ThemeProvider>
      {/* Theme is automatically applied via CSS variables */}
      <MyApplication />
    </ThemeProvider>
  );
}
```

## Validation and Accessibility

### Theme Validation

```typescript
import { createThemeBuilder, validateTheme } from '@k2600x/design-system';

const theme = createThemeBuilder()
  .extends('light')
  .withColors({ primary: '#ffff00' }) // Poor contrast
  .build();

const validation = validateTheme(theme, {
  enableAccessibilityValidation: true,
  wcagLevel: 'AA'
});

if (!validation.valid) {
  console.log('Validation errors:', validation.errors);
  console.log('Warnings:', validation.warnings);
}
```

### Custom Validation Rules

```typescript
import { validateTheme } from '@k2600x/design-system';

const customRules = [
  {
    name: 'brand-colors',
    description: 'Ensure brand colors are used',
    type: 'warning' as const,
    validator: (theme) => {
      const brandColors = ['#2563eb', '#9333ea', '#059669'];
      return brandColors.includes(theme.colors.primary.DEFAULT);
    },
    message: 'Consider using official brand colors',
    suggestions: ['Use #2563eb for primary brand color']
  }
];

const validation = validateTheme(theme, {
  customRules,
  strictMode: false
});
```

## Serialization and Persistence

### Saving and Loading Themes

```typescript
import { createThemeBuilder, ThemeBuilder } from '@k2600x/design-system';

// Create and serialize a theme
const theme = createThemeBuilder()
  .extends('light')
  .withColors({ primary: '#9333ea' })
  .build();

const serialized = createThemeBuilder().serialize(theme);
localStorage.setItem('custom-theme', serialized);

// Load theme later
const savedData = localStorage.getItem('custom-theme');
if (savedData) {
  const restoredBuilder = ThemeBuilder.deserialize(JSON.parse(savedData));
  const restoredTheme = restoredBuilder.build();
}
```

### CSS Variable Generation

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

const theme = createThemeBuilder()
  .extends('dark')
  .withColors({ primary: '#3b82f6' })
  .build();

// Generate CSS variables
const cssVars = createThemeBuilder().generateCSSVariables(theme);

// Apply to document
Object.entries(cssVars).forEach(([variable, value]) => {
  document.documentElement.style.setProperty(variable, value);
});
```

## Performance Considerations

### Lazy Theme Building

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

// Build theme lazily
const themeBuilder = createThemeBuilder()
  .extends('light')
  .withColors({ primary: '#2563eb' });

// Only build when needed
const theme = themeBuilder.preview(); // Non-cached preview
const finalTheme = themeBuilder.build(); // Cached result
```

### Optimized CSS Generation

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

const builder = createThemeBuilder({
  enableValidation: false, // Skip validation for production
  generateCSSVariables: true,
  performanceOptimizations: true
});

const theme = builder
  .extends('light')
  .withColors({ primary: '#2563eb' })
  .build();
```

## Advanced Use Cases

### Multi-Brand Theme System

```typescript
import { createThemeBuilder } from '@k2600x/design-system';

const brands = {
  corporate: {
    primary: '#1e40af',
    secondary: '#475569',
    font: "'Inter', sans-serif"
  },
  creative: {
    primary: '#9333ea',
    secondary: '#059669',
    font: "'Poppins', sans-serif"
  },
  healthcare: {
    primary: '#0891b2',
    secondary: '#059669',
    font: "'Source Sans Pro', sans-serif"
  }
};

const createBrandTheme = (brandKey: keyof typeof brands) => {
  const brand = brands[brandKey];
  
  return createThemeBuilder()
    .extends('light')
    .withColors({
      primary: brand.primary,
      secondary: brand.secondary
    })
    .withTypography({
      fontFamily: brand.font
    })
    .withMeta({
      name: `${brandKey} Theme`,
      description: `Theme for ${brandKey} brand`
    })
    .build();
};
```

### Dynamic Theme Switching

```typescript
import React, { useState } from 'react';
import { useTheme, createThemeBuilder } from '@k2600x/design-system';

function DynamicThemeSwitcher() {
  const { applyThemeBuilder } = useTheme();
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');

  const switchTheme = (mode: 'light' | 'dark') => {
    const theme = createThemeBuilder()
      .extends(mode)
      .withColors({
        primary: mode === 'dark' ? '#3b82f6' : '#2563eb'
      })
      .build();
    
    applyThemeBuilder(createThemeBuilder().extends(theme));
    setCurrentMode(mode);
  };

  return (
    <button onClick={() => switchTheme(currentMode === 'light' ? 'dark' : 'light')}>
      Switch to {currentMode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
```

This comprehensive theme builder system provides a powerful foundation for creating consistent, accessible, and maintainable design systems with full TypeScript support and real-time validation.