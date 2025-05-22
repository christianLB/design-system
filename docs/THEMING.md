# Theming Guide

This guide explains how to use the theming system in the design system, including how to set up the theme provider, use the theme context, and customize themes.

## Table of Contents

- [ThemeProvider](#themeprovider)
- [useTheme Hook](#usetheme-hook)
- [Theme Toggle](#theme-toggle)
- [Custom Themes](#custom-themes)
- [Usage with CSS](#usage-with-css)
- [TypeScript Support](#typescript-support)

## ThemeProvider

The `ThemeProvider` is a context provider that manages the current theme and provides it to all child components. It should be added at the root of your application.

### Installation

```bash
npm install @k2600x/design-system
# or
yarn add @k2600x/design-system
```

### Basic Usage

```tsx
import { ThemeProvider } from '@k2600x/design-system';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultTheme | 'light' \| 'dark' | 'light' | The default theme to use when no theme is stored in localStorage |
| children | ReactNode | - | The child components that will have access to the theme context |

## useTheme Hook

The `useTheme` hook provides access to the current theme and theme manipulation functions.

### Usage

```tsx
import { useTheme } from '@k2600x/design-system';

function ThemeAwareComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Return Value

The `useTheme` hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| theme | 'light' \| 'dark' | The current theme |
| setTheme | (theme: 'light' \| 'dark') => void | Function to set the theme |
| toggleTheme | () => void | Function to toggle between light and dark theme |

## Theme Toggle

The design system includes a `ThemeToggle` component that can be used to switch between light and dark themes.

### Usage

```tsx
import { ThemeToggle } from '@k2600x/design-system';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

## Custom Themes

You can extend the default themes or create your own by adding custom CSS variables in your global styles.

### Extending Default Themes

```css
:root {
  /* Light theme overrides */
  --color-primary: #4f46e5;
  --color-background: #ffffff;
  --color-foreground: #111827;
}

[data-theme="dark"] {
  /* Dark theme overrides */
  --color-primary: #818cf8;
  --color-background: #111827;
  --color-foreground: #f9fafb;
}
```

## Usage with CSS

The current theme is applied as a class and data attribute to the `html` element, allowing you to use it in your CSS:

```css
/* Target light theme */
:root, .light, [data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #111827;
}

/* Target dark theme */
.dark, [data-theme="dark"] {
  --color-bg: #111827;
  --color-text: #f9fafb;
}
```

## TypeScript Support

The theming system includes TypeScript types for better development experience:

```typescript
import type { Theme } from '@k2600x/design-system';

// Theme type is 'light' | 'dark'
const currentTheme: Theme = 'light';
```

## Best Practices

1. **Consistent Theming**: Always use the theme context for theming instead of direct color values
2. **Progressive Enhancement**: Ensure your app is usable even if JavaScript is disabled
3. **Performance**: Avoid excessive theme toggles as it may cause layout shifts
4. **Testing**: Test your application in both light and dark modes
5. **Accessibility**: Ensure sufficient color contrast in both themes
