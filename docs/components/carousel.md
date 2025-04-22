# Carousel Component

## Description

The Carousel component is designed to display a collection of items in a rotating or sliding manner. It is versatile and can showcase various types of content, such as images, cards, or custom elements. The Carousel provides navigation controls, allowing users to interact with the content easily.

## Features

*   **Item Display:**
    *   Displays an array of elements.
    *   Supports various content types (images, text, custom elements).
*   **Multiple Item Display:**
    *   Configurable to show multiple items simultaneously.
    *   Responsive design to adjust the number of items shown based on screen size.
*   **Navigation Controls:**
    *   Includes "previous" and "next" buttons for manual navigation.
    *   Provides navigation dots to jump to specific items.
*   **Automatic Rotation (Optional):**
    *   Optionally rotates items automatically.
    *   Configurable rotation speed.
    *   Pause on hover functionality.
*   **Responsiveness:**
    *   Adapts to different screen sizes and resolutions.
* **Customization:**
    *   Custom styles can be applied.

## Dependencies

*   **React:** The component is built using React and relies on its core functionalities.
*   **CSS/Tailwind:** Styling will be managed through CSS classes, preferably using Tailwind for utility-first styling.
*   **State Management:** Internal state management to handle active item and navigation.

## Props

*   **`items` (Array):**
    *   An array of elements to be displayed in the carousel.
    *   Each element can be a React node.
*   **`itemsToShow` (Number):**
    *   The number of items to display at the same time.
    *   Default value can be 1.
*   **`autoPlay` (Boolean, Optional):**
    *   Enables or disables automatic rotation.
    *   Default value: `false`.
*   **`interval` (Number, Optional):**
    *   The time interval (in milliseconds) between automatic rotations.
    *   Default value can be `3000` (3 seconds).
* **`showDots` (Boolean, Optional):**
    * Enables or disables the display of the dots.
    * Default value: true
* **`showButtons` (Boolean, Optional):**
    * Enables or disables the display of the navigation buttons.
    * Default value: true

## Usage