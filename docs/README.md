# Design System Documentation

## 1. Introduction

This document provides an overview of the design system, its core concepts, and how to use the available components and the demo page.
The primary goal of this design system is to provide a consistent, lightweight, and easy-to-use set of UI components for our projects, free of heavy external dependencies.

## 2. Core Concepts

### Styling

- **CSS-Based**: Components are styled using plain CSS classes defined in `index.css`.
- **CSS Variables**: We leverage CSS variables for theming aspects like colors, spacing, typography, border-radius, and shadows. This allows for easy customization and consistency.
- **No Heavy Dependencies**: Components do not rely on external UI libraries like Radix UI or utility-class libraries like Tailwind CSS *directly within their implementation*. Styling is self-contained.
- **Tailwind CSS (Global)**: Tailwind CSS v4 is used globally for the overall application layout and potentially for utility classes outside of the core component styling. However, components themselves are styled with dedicated CSS classes to keep them isolated and maintainable.

### Component Structure

- **Organization**: Components are located in `src/components/[ComponentName]`. Each component typically has its own directory containing the component file (e.g., `Button.tsx`) and an `index.ts` for exports.
- **Props**: Components accept props for customization. Refer to individual component definitions or the demo page for specific props.
- **Common Patterns**: Most components are functional React components. Complex components might use React Context for state management (e.g., `Accordion`, `Select`, `Tabs`).

### Dependency-Free

All components are designed to be self-contained and rely only on React. This minimizes bundle size and reduces potential conflicts with other libraries.

## 3. Getting Started

### Installation

This design system is currently used as an internal library. To use it in a project within this monorepo (or if it's published as a package):

```bash
# If published (example)
# npm install @your-org/design-system
# yarn add @your-org/design-system
# pnpm add @your-org/design-system
```

Ensure you also import the main CSS file into your application:

```javascript
// In your main application file (e.g., main.tsx or App.tsx)
import '@your-org/design-system/dist/index.css'; // Adjust path based on build output
// or directly if source is used:
import './path/to/design-system/index.css';
```

### Importing Components

Components can be imported directly from the design system package or source:

```javascript
import { Button, Card, Input } from '@your-org/design-system'; // Or appropriate path
```

## 4. Using the Demo Page (`ComponentTests.tsx`)

The demo page (`src/components/ComponentTests.tsx`) serves as a visual test suite and a showcase for all available components.

### Purpose

- **Visual Verification**: Allows developers to see all components rendered with various props and states.
- **Development Sandbox**: Useful for testing new components or changes to existing ones in isolation.

### How to Run It

1. Navigate to the design system's root directory.
2. Run the development server:
   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```
3. Open the provided URL (usually `http://localhost:5173` or similar) in your browser.

### Adding New Components or Examples

1. Open `src/components/ComponentTests.tsx`.
2. Import the new component.
3. Add a new section within the main `div` to render the component with different examples (variants, states, props).

## 5. Available Components

This design system includes the following components. Refer to `ComponentTests.tsx` for live examples of their usage and appearance.

- Accordion
- Alert
- Avatar
- Badge
- Divider
- Breadcrumb
- Button
- Card
- Carousel
- Checkbox
- ConfirmDialog
- DatePicker
- Dialog
- FileUpload
- Input
- Label
- Loader (and PageLoader)
- MultiSelect
- Pagination
- Popover
- ProgressBar
- RadioGroup
- Select
- Switch
- Table
- Tabs
- Textarea
- Tooltip

## 6. Contributing

### Guidelines

- **Simplicity**: Keep components simple and focused on their primary function.
- **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation where applicable).
- **CSS Styling**: Use plain CSS classes and leverage existing CSS variables. Avoid inline styles unless absolutely necessary.
- **No New Dependencies**: Do not introduce new external dependencies for components without discussion.

### Styling Conventions

- Use BEM-like naming conventions for CSS classes (e.g., `component-name__element--modifier`).
- Define styles in `index.css` under the respective component's section.

### Testing

- **Visual Testing**: Add examples to `ComponentTests.tsx` for all new components and significant changes.
- **Automated Tests**: (Future) Write unit/integration tests using React Testing Library to ensure components mount and function correctly.

## Epics

Longer initiatives are documented under `docs/epics/`.

- [Épica 10: Purga de CSS y unificación visual](./epics/epic-10-purge-css-tokens.md)
