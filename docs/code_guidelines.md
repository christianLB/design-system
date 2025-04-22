# Coding Guidelines and Best Practices for the Design System

This document outlines the coding guidelines and best practices to be followed when developing and maintaining this design system. Adhering to these guidelines will ensure consistency, maintainability, and scalability of the system.

## Token Centralization

All design tokens (colors, spacing, typography, etc.) should be centralized in JavaScript objects outside component bodies. This promotes a single source of truth, making it easy to update and manage the design language.

**Example:**
```
javascript
// tokens.js
export const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  error: "#dc3545",
  background: "#ffffff",
  text: "#333333",
};

export const spacing = {
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};

export const typography = {
    fontFamily: "Arial, sans-serif",
    fontSizeBase: "16px",
    lineHeightBase: "1.5",
    h1: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        lineHeight: "1.2",
    },
    h2: {
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: "1.2",
    }
};
```
## Semantic Tokens

Semantic tokens provide context-aware styling by mapping to core design tokens. They represent the *purpose* of a style, rather than a specific value. This enhances adaptability and theming.

**Example:**
```
javascript
// semanticTokens.js
import { colors, spacing, typography } from './tokens';

export const semanticColors = {
  buttonPrimaryBackground: colors.primary, // Maps to a core token
  buttonPrimaryText: colors.background,
  buttonSecondaryBackground: colors.secondary,
  buttonSecondaryText: colors.background,
  successBackground: colors.success,
  errorBackground: colors.error,
  pageBackground: colors.background, // The general background of pages.
  textColor: colors.text, // General text color.
};
```
## Composability

Composability is a cornerstone of this design system. Tokens should be designed to be used together in various combinations to create flexible and reusable styles. Components should also be designed to be composable, accepting other components as children and props.

**Examples:**

*   **Using spacing tokens with layout components:**
```
javascript
    // Instead of hardcoding margins and paddings
    <div style={{ padding: spacing.md }}>
        {/* Content */}
    </div>
    
```
* **Using color tokens:**
```
javascript
    <Button variant="primary">Click me!</Button>

    // Button component
    import { semanticColors } from './semanticTokens';
    
    const Button = ({variant = 'primary', children}) => {
        const backgroundColor = variant === 'primary' ? semanticColors.buttonPrimaryBackground : semanticColors.buttonSecondaryBackground;
        const textColor = variant === 'primary' ? semanticColors.buttonPrimaryText : semanticColors.buttonSecondaryText;

        return (
            <button style={{backgroundColor, color: textColor}}>
                {children}
            </button>
        );
    };

    export default Button;
    
```
## Naming Conventions

Consistent naming conventions are essential for clarity.

*   **Tokens:** Use camelCase (e.g., `primaryColor`, `fontSizeLarge`).
*   **Components:** Use PascalCase (e.g., `Button`, `Card`).
*   **Files:** Use PascalCase for component files (e.g., `Button.tsx`) and camelCase or kebab-case for utility and token files (e.g., `tokens.js`, `utils.js`).
*   **Props:** Use camelCase (e.g., `onClick`, `isDisabled`).
* **Semantic tokens:** use camelCase, starting with the component name (e.g., `buttonPrimaryBackground`)

## Component Structure

Components should adhere to a consistent structure:

*   **Props:** Clearly define all props with appropriate types.
*   **Internal State:** Manage internal state using `useState` or `useReducer`.
*   **Rendering Logic:** Separate complex logic into helper functions.
*   **Styling:** Use semantic tokens to apply styles.
* **Component patterns:** use compound components when it is necesary, to avoid props explosion. Use render props when the component structure is dynamic.

**Example:**
```
typescript
import React, { useState } from 'react';
import { semanticColors } from './semanticTokens';

interface ButtonProps {
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, variant = "primary", children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor = variant === "primary" ? semanticColors.buttonPrimaryBackground : semanticColors.buttonSecondaryBackground;
  const textColor = variant === "primary" ? semanticColors.buttonPrimaryText : semanticColors.buttonSecondaryText;

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
```
## Prop Types

All components should use prop types (or TypeScript interfaces) to define the expected shape of props. This improves type safety and serves as documentation.

**Example (TypeScript):**
```
typescript
interface ButtonProps {
  onClick?: () => void;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}
```
## Documentation

Comprehensive documentation is crucial. Use tools like Storybook or JSDoc to document components, props, and usage examples.

*   **Storybook:** Provides a visual catalog of components.
*   **JSDoc:** Use JSDoc comments to describe components, props, and functions within the code.

## Testing

Refer to the `testing_strategy.md` document for details on the testing approach. Write tests alongside components to ensure correctness and prevent regressions.

## Code Formatting

Use a code formatter (Prettier) and a linter (ESLint) to enforce consistent code style.

*   **Prettier:** Automatically formats code.
*   **ESLint:** Catches potential errors and enforces coding standards.

## Accessibility

Follow accessibility best practices to ensure the design system is usable by everyone.

*   **ARIA Attributes:** Use ARIA attributes to enhance the accessibility of components, like defining `aria-label`, `aria-expanded`, or `aria-hidden`.
*   **Keyboard Navigation:** Ensure all interactive components are navigable and operable using a keyboard.
*   **Color Contrast:** Ensure sufficient color contrast between text and background.
* **Semantic HTML:** Use the correct html tags for each component to improve the accessibility.

## Code comments

Use code comments to explain complex logic, non-obvious code, or the reasoning behind specific decisions. Avoid stating the obvious.

**Good Comments**
```
javascript
// Calculates the total price by applying a discount based on the user's role
const calculateTotalPrice = (items, userRole) => { ... };
```
**Bad Comments**
```
javascript
// Assigns the value to the variable.
const myValue = 10;
```
By adhering to these guidelines, we can ensure that our design system is consistent, maintainable, and scalable.