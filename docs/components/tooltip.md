# Tooltip Component

## Description

The Tooltip component is used to provide additional information about an element when the user hovers over or focuses on it. It enhances user experience by offering context and clarification without cluttering the interface.

## Features

-   **Hover/Focus Trigger:** The tooltip appears when the user hovers the mouse over or focuses on the associated element.
-   **Text Display:** Displays a text string provided to the component.
-   **Content Wrapping:** Wraps the content that triggers the tooltip, allowing any type of element to have a tooltip.
-   **Automatic Positioning:** The tooltip should be positioned automatically to avoid overlapping with the viewport edges.
-   **Accessibility:** The component will be accessible.
- **Customizable**: should be possible to change the style.

## Dependencies

-   **React:** This component is designed for React-based applications.
- **Positioning Library:** A library or utility function to calculate the best position of the tooltip to prevent it from being cut off by the window edges.
- **CSS**: for styling purposes.
## Props

-   **text:** (string, required) The text content to be displayed inside the tooltip.
- **children**: (node, required) the content that will trigger the tooltip.
- **className**: (string, optional) to customize the tooltip style.

## Usage