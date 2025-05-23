# Tailwind CSS Integration Guide

## Overview

This guide explains how to properly integrate the design system with Tailwind CSS in your application. It covers configuration, theme setup, and safelist recommendations to ensure all design system components render correctly.

## Basic Setup

### 1. Install Dependencies

```bash
npm install @k2600x/design-system tailwindcss
```

### 2. Configure Tailwind

Create or update your `tailwind.config.js` file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use the design system's preset
  presets: [
    require('@k2600x/design-system/tailwind.preset.js')
  ],
  
  // Configure dark mode - IMPORTANT: define this in your app, not in the preset
  darkMode: ['selector', '[data-theme="dark"]'],
  
  // Content paths - make sure to include both your app files and the design system
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@k2600x/design-system/dist/**/*.{js,jsx,ts,tsx}"
  ],
  
  // Safelist - see recommendations below
  safelist: [
    // Recommended safelist items
  ],
  
  // Your app's theme extensions (if any)
  theme: {
    extend: {
      // App-specific extensions
    }
  },
  
  // Your app's plugins (if any)
  plugins: [
    // App-specific plugins
  ]
}
```

### 3. Import CSS

Import the design system CSS in your main entry file:

```javascript
// For Next.js, in _app.js or similar
import '@k2600x/design-system/dist/design-system.css';
```

## Dark Mode Configuration

The design system supports dark mode through the `data-theme` attribute. Configure your dark mode toggle to set this attribute on the HTML element:

```javascript
function toggleDarkMode() {
  document.documentElement.setAttribute(
    'data-theme',
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
}
```

## Recommended Safelist Configuration

Tailwind's JIT (Just-In-Time) compiler may not detect all utility classes used in the design system components, especially those that are dynamically generated or used in pre-compiled components. 

To ensure all necessary styles are generated, we recommend adding the following safelist configuration to your `tailwind.config.js`:

```javascript
safelist: [
  // Core theme colors with various utilities
  ...[
    'bg', 'text', 'border', 'ring',
    'outline', 'divide', 'placeholder'
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
  
  // Border radius
  'rounded-lg', 'rounded-md', 'rounded-sm',
  
  // Common interactive states
  'hover:bg-primary/90', 'hover:bg-secondary/90',
  'hover:bg-destructive/90', 'hover:bg-accent/90',
  'hover:opacity-90', 'hover:opacity-80',
  'focus:ring-2', 'focus:ring-offset-2',
  'active:scale-95', 'disabled:opacity-50',
  
  // Common layout utilities
  'flex', 'items-center', 'justify-center', 'justify-between',
  'gap-1', 'gap-2', 'gap-3', 'gap-4',
  'p-1', 'p-2', 'p-3', 'p-4', 'px-4', 'py-2',
  'w-full', 'h-full', 'min-w-0', 'min-h-0',
  
  // Common typography
  'font-medium', 'font-semibold', 'font-bold',
  'text-sm', 'text-base', 'text-lg', 'text-xl',
  
  // Component-specific patterns
  {
    pattern: /^(btn|card|input|badge|table|dialog)-/,
  }
]
```

## Troubleshooting Common Issues

### Missing Styles

If some components appear unstyled or partially styled:

1. **Check CSS Import**: Ensure `@k2600x/design-system/dist/design-system.css` is imported
2. **Verify Content Paths**: Make sure your content paths include the design system files
3. **Add to Safelist**: Add the missing class patterns to your safelist
4. **Restart Development Server**: Some changes require a full restart of your development server

### Dark Mode Not Working

If dark mode isn't working correctly:

1. **Check Theme Attribute**: Ensure `data-theme="dark"` is applied to the HTML element
2. **Verify darkMode Config**: Make sure `darkMode: ['selector', '[data-theme="dark"]']` is in your config
3. **CSS Import Order**: Ensure design system CSS is imported before any app-specific CSS

## Advanced Configuration

### Custom Theme Colors

If you want to extend or override the design system's theme colors:

1. **CSS Variables**: Define your own CSS variables in your global CSS
2. **Tailwind Config**: Add your custom colors to your Tailwind config

```css
/* Your global CSS */
:root {
  /* Override design system variables */
  --primary: 240 100% 50%; /* Custom blue */
}
```

```javascript
// Your tailwind.config.js
module.exports = {
  presets: [require('@k2600x/design-system/tailwind.preset.js')],
  theme: {
    extend: {
      colors: {
        custom: {
          DEFAULT: 'hsl(var(--custom))',
          foreground: 'hsl(var(--custom-foreground))'
        }
      }
    }
  }
}
```

### Legacy Support

If you're migrating from an older version of the design system:

```javascript
// Your tailwind.config.js
module.exports = {
  presets: [require('@k2600x/design-system/tailwind.preset.js')],
  theme: {
    extend: {
      colors: {
        // Legacy color mappings (v1.x compatibility)
        'app-bg': 'var(--app-bg)',
        'text-color': 'var(--text-color)',
        // etc.
      }
    }
  }
}
```

## Best Practices

1. **Use Theme Colors**: Prefer semantic color names (e.g., `bg-primary`) over explicit colors
2. **Leverage HSL Format**: Use opacity modifiers (e.g., `bg-primary/50`) for UI states
3. **Test Both Themes**: Always test your app in both light and dark modes
4. **Upgrade Strategy**: When upgrading the design system, check for breaking changes in the Tailwind preset
5. **Component-First**: Use design system components whenever possible rather than rebuilding with utility classes
