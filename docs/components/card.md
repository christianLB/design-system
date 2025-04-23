# Card Component

## Overview

The `Card` component is a versatile container used to display related information and group elements together. It provides a structured layout for presenting content in a clear and organized manner. This component is essential for creating user-friendly interfaces by visually separating content into manageable sections.

## Features

-   **Title:** The card can display a title to clearly indicate the topic of the content within.
-   **Content:** The main body of the card where the primary information is displayed. This can be text, images, lists, or other nested components.
-   **Header (Optional):** An optional header section that can house the title and potentially other interactive elements or metadata.
-   **Footer (Optional):** An optional footer section that can contain additional information, such as timestamps or secondary actions.
-   **Action Buttons (Optional):** The ability to include one or more action buttons within the card, typically located in the footer or header.
- **Customizable styling**: The card component can be styled based on the needs of the project.

## Variants

The `Card` component supports several variants to change its appearance:

-   **`default`**: The standard card style with a white background and a subtle shadow.
-   **`muted`**: A card with a muted background color, suitable for less emphasized content sections.
-   **`destructive`**: A card style with a red background and white text. Ideal to highlight dangerous information or actions.
-   **`outline`**: A card with a primary color border.

### Using Variants

To use a variant, you need to pass the `variant` prop to the component:



## Dependencies

-   **None:** The `Card` component is designed to be self-contained with no external dependencies, relying on standard HTML and CSS for its structure and styling. If you are using a design system, you can use the colors and typography of it.

## Usage

The `Card` component can be used in a variety of contexts, including:

-   Displaying user profiles.
-   Presenting product listings.
-   Showcasing blog posts or articles.
-   Creating interactive dashboards.
- Grouping filters or settings.

## Structure

A typical `Card` component will have the following basic structure: