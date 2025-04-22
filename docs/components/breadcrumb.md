# Breadcrumb Component

## Description

The Breadcrumb component is used to display the hierarchical path of the current page within the application. It provides users with a clear navigation trail, helping them understand their location within the site's structure and easily navigate back to higher-level pages.

## Features

-   **Hierarchical Display:** Shows the user's current location and the path they have traversed to reach it.
-   **Dynamic Path Generation:** Automatically generates breadcrumb items based on an array of objects provided to it.
-   **Navigable Links:** Each item in the breadcrumb is a clickable link that navigates to the corresponding page.
-   **Customizable Separator:** Allows for different separator characters or icons between breadcrumb items.
- **Responsive:** Adjusts well to different screen sizes.
- **Accessible:** Follows ARIA guidelines to provide semantic information to screen readers.

## Props

-   **items:** An array of objects, each representing a breadcrumb item. Each object should have the following properties:
    -   `name`: (string) The display text for the breadcrumb item.
    -   `href`: (string) The URL that the breadcrumb item links to.
-   **separator:** (string, optional) The character or icon used to separate breadcrumb items. Defaults to ">".

## Dependencies

-   **React:** This component is built using React.
-   **Tailwind CSS:** This component will use tailwind CSS classes to handle styles.

## Usage Example