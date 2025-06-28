# Futuristic Theme Documentation - v3.3.0

This document outlines the enhanced implementation of the futuristic theme in the design system, including new professional variants, performance optimizations, and comprehensive component coverage.

## Overview

The futuristic theme provides a dark, high-contrast, and vibrant look and feel, characterized by glowing effects and sharp edges. It's designed to give applications a modern, sci-fi-inspired aesthetic. The theme is activated by applying the `data-theme="futuristic"` attribute to a container element.

## Implementation Details

The core of the futuristic theme is defined in two key places:

-   **`src/theme/theme.futuristic.ts`**: This file contains the theme tokens, including colors, typography, and spacing, which are applied as CSS variables.
-   **`index.css`**: This stylesheet contains the global styles and custom futuristic theme overrides under the `[data-theme='futuristic']` selector. It also includes futuristic animations and background effects.

## Component Compatibility

This section details the compatibility of each component with the futuristic theme.

### Fully Compatible

These components have been fully tested and styled for the futuristic theme.

*   **Alert**: Includes custom styles for `success`, `warning`, and `info` variants with futuristic colors and borders.
*   **Button**: Features a glowing effect on primary and secondary variants.
*   **DataTable**: Features glowing headers, striped and hover effects, and a futuristic aesthetic.
*   **Card**: Lifts and glows on hover for a more interactive feel.
*   **DarkThemeToggle**: The primary component for switching between themes, including the futuristic theme.
*   **Input**: Glows on focus to indicate the active field.

### Partially Compatible

These components are functional and inherit the base styles from the theme's CSS variables but lack specific futuristic styles like glowing effects or animations.

*   **Checkbox**
*   **Dialog**
*   **Select**
*   **Tabs**
*   **Tooltip**

### Incompatible Components

At present, no components are completely incompatible, but many would benefit from theme-specific enhancements.

## Extending the Theme

To make a component fully compatible with the futuristic theme, you can add custom styles to `index.css` under the `[data-theme='futuristic']` selector. For example, to add a glowing effect to buttons, you could add:

```css
[data-theme='futuristic'] .button--primary {
  box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary);
  animation: futuristic-glow 1.5s infinite alternate;
}

@keyframes futuristic-glow {
  from {
    box-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary);
  }
  to {
    box-shadow: 0 0 20px var(--primary), 0 0 30px var(--primary);
  }
}
```

By following this pattern, you can enhance any component to fully embrace the futuristic theme.
