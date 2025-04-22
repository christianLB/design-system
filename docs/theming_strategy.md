# Theming Strategy for the Design System

This document outlines the theming strategy for our design system, detailing how to define, implement, and manage different themes to alter the look and feel of our components. The theming system is designed to be flexible, allowing for both light and dark themes, as well as custom themes for different branding needs.

## Managing Themes

Themes are collections of styles that define the visual appearance of the design system components. Themes can affect various visual aspects, including colors, typography, shadows, and spacing.

We will use different approaches to manage them:

### Core Tokens

These are the fundamental, indivisible design decisions. They are the raw values for color, spacing, typography, etc. Core tokens are defined in the `tailwind.config.js` file, extending the default tailwind theme.

### Semantic Tokens

Semantic tokens map core tokens to their intended use within a design system. Semantic tokens provide context-aware styling. For example, instead of using `--color-blue-500`, you would use `--color-primary-button-background`. Semantic tokens are defined in separate files, like `core.js` and `semantic.js`.

### Components

Components are the building blocks of the design system. Components will import the semantic tokens and apply the styles based on them.

## Steps to manage the tokens

1.  **Define core tokens:** Inside the `tailwind.config.js` file, extend the default tailwind theme to add your own colors, spacing, typography...
2.  **Define semantic tokens:** Create the `core.js` file and add the core tokens. Then, create the `semantic.js` file, mapping semantic tokens to core tokens.
3.  **Apply styles in the components:** Import the tokens inside the components and use them to apply the styles.

## Examples

### tailwind.config.js


### Ways to Define Themes

1.  **CSS Variables (Custom Properties):** The core of our theming strategy will be based on CSS variables. These variables are defined at the `:root` level (or within a specific theme class) and can be used throughout our CSS to style components.

2.  **Theme Classes:** We will define different theme classes (e.g., `.theme-light`, `.theme-dark`, `.theme-brand`) that wrap the entire application or specific sections. Inside these classes, we will redefine the CSS variables to reflect the theme's values.

3. **JavaScript context:** We can create a JavaScript context to control the selected theme. This context will change the class of the body, and then, the css variables will change depending on the class.

## Theme Variables

The following categories of variables will be used to define themes:

### Colors

Colors will be managed through a set of semantic color variables. These variables do not represent fixed colors but describe the role of the color within the UI.

*   **Primary Colors:**
    *   `--color-primary`: Main brand color.
    *   `--color-primary-hover`: Hover state for primary color.
    *   `--color-primary-active`: Active state for primary color.
*   **Secondary Colors:**
    *   `--color-secondary`: Secondary brand color.
    *   `--color-secondary-hover`: Hover state for secondary color.
    *   `--color-secondary-active`: Active state for secondary color.
*   **Text Colors:**
    *   `--color-text-primary`: Main text color.
    *   `--color-text-secondary`: Secondary text color.
    *   `--color-text-on-primary`: Text color on primary backgrounds.
*   **Background Colors:**
    *   `--color-background-primary`: Main background color.
    *   `--color-background-secondary`: Secondary background color.
*   **Status Colors:**
    *   `--color-success`: Success status color.
    *   `--color-warning`: Warning status color.
    *   `--color-error`: Error status color.
    *   `--color-info`: Info status color.
*   **Border Colors:**
    *   `--color-border`: Default border color.

### Typography

Typography will be controlled through the following variables:

*   `--font-family-base`: Base font family.
*   `--font-size-base`: Base font size.
*   `--font-weight-regular`: Regular font weight.
*   `--font-weight-bold`: Bold font weight.
*   `--line-height-base`: Base line height.

### Shadows

Shadows will be managed through variables:

*   `--shadow-small`: Small shadow.
*   `--shadow-medium`: Medium shadow.
*   `--shadow-large`: Large shadow.

### Spacing

Spacing will be managed through variables:

*   `--space-unit`: Base unit for spacing (e.g., `4px`).
*   `--space-xs`: Extra small spacing (e.g., `calc(var(--space-unit) / 2)`).
*   `--space-sm`: Small spacing (e.g., `var(--space-unit)`).
*   `--space-md`: Medium spacing (e.g., `calc(var(--space-unit) * 2)`).
*   `--space-lg`: Large spacing (e.g., `calc(var(--space-unit) * 4)`).
*   `--space-xl`: Extra large spacing (e.g., `calc(var(--space-unit) * 8)`).

## Using Colors in Component Variants

Component variants will make use of the semantic color variables. For example:

*   **Button Variants:**
    *   Primary button: uses `--color-primary` for the background, `--color-text-on-primary` for text, `--color-primary-hover` for the hover state.
    *   Secondary button: uses `--color-secondary` for the background, `--color-text-on-secondary` for text, and `--color-secondary-hover` for the hover state.
    *   Success button: uses `--color-success` for the background.
    * Error button: uses `--color-error` for the background.
* **Badge Variants:**
    *   Primary badge: uses `--color-primary` for the background, `--color-text-on-primary` for text.
    * Success badge: uses `--color-success` for the background, `--color-text-on-success` for text.
    * Error badge: uses `--color-error` for the background, `--color-text-on-error` for text.

## Adding and Managing New Themes

1.  **Define New Theme Class:** Create a new CSS class for your theme (e.g., `.theme-new`).
2.  **Override CSS Variables:** Within the new theme class, redefine the CSS variables with the appropriate values for that theme.
```
css
    .theme-new {
        --color-primary: #008080; /* Teal */
        --color-primary-hover: #006666;
        --color-primary-active: #004d4d;
        --color-secondary: #FFD700; /* Gold */
        --color-secondary-hover: #CCB000;
        --color-secondary-active: #998000;
        --color-text-primary: #333333;
        --color-text-secondary: #666666;
        --color-text-on-primary: #FFFFFF;
        --color-background-primary: #F0F0F0;
        --color-background-secondary: #E0E0E0;
        --color-success: #28a745;
        --color-warning: #ffc107;
        --color-error: #dc3545;
        --color-info: #17a2b8;
        --color-border: #CCCCCC;
    }
    
```
3.  **Apply Theme Class:** Apply the new theme class to the application root or a specific section to activate the theme. This can be done programmatically using JavaScript, and changing the class of the body element.
4. **Update the components:** All the components should use this css variables to be updated when the theme changes.

By following this strategy, we can ensure our design system is flexible, adaptable, and easy to maintain as our design needs evolve.