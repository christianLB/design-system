# Design System

A comprehensive design system built with React, TypeScript, and Tailwind CSS. This system provides a consistent set of UI components and design tokens to help you build beautiful, accessible, and maintainable user interfaces.

## Features

- 🎨 **Design Tokens** - Consistent theming with a comprehensive token system
- 🖥️ **Responsive** - Mobile-first components that work on all screen sizes
- 🎭 **Dark Mode** - Built-in support for light and dark themes
- 🧩 **Composable** - Flexible components that can be easily customized
- 📱 **Accessible** - Built with accessibility in mind

## Design Tokens

Our design system uses a comprehensive set of design tokens to ensure consistency across all components. These tokens include colors, spacing, typography, shadows, and more.

### Token Categories

- **Colors**: Semantic color tokens for backgrounds, text, borders, and interactive states
- **Spacing**: Consistent spacing scale for margins and padding
- **Typography**: Font families, sizes, and weights
- **Shadows**: Elevation and depth with consistent shadow styles
- **Border Radius**: Consistent corner rounding
- **Transitions**: Standardized animation timings and easings

For detailed information on using design tokens, see the [Design Token Guide](./DESIGN_TOKEN_GUIDE.md).

## Components

This design system includes the following components:

-   **Button:** A versatile button component for various actions.
-   **Checkbox:** A checkbox component for boolean selections.
-   **ConfirmDialog:** A dialog to allow the user to confirm an action.
-   **Dialog:** A generic dialog component for modal interactions.
-   **Input:** A text input component for user data entry.
-   **Loader:** An animated loader to indicate loading states.
-   **Multi-select:** a select that allows for multiple choices.
-   **Popover:** A popover for displaying additional content.
-   **Select:** A dropdown select component.
-   **Switch:** A toggle switch for on/off states.
-   **Table:** A component for displaying tabular data.
-   **Tabs:** A tabbed interface for organizing content.
-   **Textarea:** A multi-line text input component.
-   **ThemeToggle**: a toggle to change between a light and dark theme

## Theming

Our design system supports theming out of the box using a comprehensive design tokens system. This allows for consistent theming across your application.

### Using Design Tokens

Design tokens are the smallest, most basic design elements that define the visual style of your application. They include:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

```tsx
import { tokens } from './lib/tokens';

// Using tokens in your components
function MyComponent() {
  return (
    <div className={tokens.colors.background}>
      <h1 className={tokens.typography.heading1}>Hello World</h1>
      <p className={tokens.typography.body}>
        This is some text with consistent styling.
      </p>
    </div>
  );
}
```

### Customizing the Theme

To customize the theme, you can override the default tokens in your Tailwind configuration:

```js
// tailwind.config.js
const { tokens } = require('./lib/tokens');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      // ... other theme extensions
    },
  },
};
```

### Migration Guide

If you're upgrading from a previous version, please see our [Migration Guide](./MIGRATION_GUIDE.md) for instructions on updating your components to use the new design tokens system.

## Getting Started

### Installation

To use this design system in your project, install it via npm or yarn.
```
bash
npm install my-design-system
```
or
```
bash
yarn add my-design-system
```
### Usage

Import the components you need from the package:
```
typescript
import { Button, Input } from 'my-design-system';

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Input />
    </div>
  );
}

```
## Contributing

Contributions are welcome! Please read our contributing guidelines for more information.

## License

This project is licensed under the MIT License.