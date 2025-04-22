# Badge Component

## Overview

The Badge component is used to display status information, categories, or tags. It's a small, visually distinct element that can be used to highlight important information or categorize content.

## Features

-   **Variants:** The Badge component supports several variants to convey different meanings or states:
    -   `primary`: Used for general-purpose badges.
    -   `secondary`: Used for less important information or alternative categorizations.
    -   `success`: Used to indicate a positive outcome or successful state.
    -   `error`: Used to indicate an error or negative outcome.
    -   `warning`: Used to indicate a warning or potential issue.
    -   `info`: Used to convey neutral information.
-   **Customizable Text:** The text inside the badge can be customized to represent any category, status, or tag.
-   **Size:** Support for different sizes such as:
    - small
    - medium
    - large
-   **Styling:** The Badge component should be customizable in terms of color, background, and typography to fit the design system's overall aesthetic.
-   **Rounded corners**: The component should be displayed with rounded corners by default.
-   **Accessibility:** The component should be accessible and provide meaningfull information for screen readers

## Dependencies

-   **Tailwind CSS:** For styling and theming, Tailwind CSS should be used.
-   **React:** This component is intended for use in React-based projects.

## Usage

The Badge component can be used in various contexts, including:

-   **Status Indicators:** Displaying the status of a task, user, or item (e.g., "Active," "Pending," "Completed").
-   **Categories:** Categorizing content or items (e.g., "New," "Featured," "Trending").
-   **Tags:** Tagging content with keywords (e.g., "React," "JavaScript," "Design").
-   **Notifications**: Displaying the number of unread notifications.

## API

- **variant**: (string):  one of: primary, secondary, success, error, warning, info.
- **size**: (string): one of: small, medium, large.
- **children**: string. The text that will be displayed inside the component.