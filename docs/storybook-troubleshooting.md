# Storybook Troubleshooting

This guide explains common reasons why components may not render correctly in Storybook and how to resolve them.

## Symptoms
- Components appear without styling or only minimal HTML is rendered.
- Build commands fail with missing modules such as `react`, `clsx` or `tailwind-merge`.

## Root Causes
1. **Dependencies not installed**: Running `npm run build` or Storybook before installing dependencies leads to TypeScript errors.
2. **Missing global styles**: The design system relies on `src/styles/index.css` which imports design tokens and Tailwind directives.
3. **Provider not applied**: Components expect the `DesignSystemProvider` wrapper to set up the theme context and CSS variables.

## Fixes Implemented
- Updated `.storybook/preview.ts` to import the global stylesheet and wrap every story with `DesignSystemProvider` using a decorator.
- Documented the installation steps and added this troubleshooting guide in the README.

## Using Providers
- `ThemeProvider` (see `src/contexts/ThemeContext.tsx`) manages the light/dark theme and attaches the theme class to `<html>`.
- `DesignSystemProvider` (see `src/components/DesignSystemProvider/index.tsx`) wraps `ThemeProvider` and should be placed near the root of your app or in Storybook decorators.

Example usage:
```tsx
import { DesignSystemProvider } from '@k2600x/design-system';

function App() {
  return (
    <DesignSystemProvider theme="light">
      <YourApp />
    </DesignSystemProvider>
  );
}
```

## Running Storybook
1. Install dependencies: `npm install`.
2. Start Storybook: `pnpm run storybook`.
3. All components should render with proper styles.
