# Pagination

## Description

The Pagination component is used to divide large amounts of content into discrete pages, making it easier for users to navigate through extensive datasets or lists. It provides a clear and intuitive way to move between pages, view the current page, and understand the total number of pages available.

## Features

-   **Display Page Numbers:** Shows a list of available page numbers for direct navigation.
-   **Previous/Next Links:** Includes "Previous" and "Next" buttons to move between sequential pages.
-   **Direct Page Navigation:** Allows users to directly jump to a specific page by clicking on its page number.
-   **Current Page Indication:** Clearly highlights the currently active page number.
-   **Total Items:** Accepts a total count of items being paginated to calculate total pages.
-   **Items Per Page:** Determines how many items are shown on each page.
-   **Current Page:** Tracks and displays the currently active page.

## Dependencies

-   **React:** The component is built using React and depends on its core library.
-   **UI Library:** Should be compatible with any UI library, but it could use tailwind classes for the style.
- **onClick Handler:** It needs an onClick handler that will manage the page change.

## Props

-   **totalItems** (number): The total number of items that are being paginated.
-   **itemsPerPage** (number): The number of items to display on each page.
-   **currentPage** (number): The currently active page number.
- **onPageChange** (function): A callback function that will be called when the page is changed. It will receive the page number as a parameter.

## Usage

The Pagination component can be used in any part of the application where a large set of data needs to be divided into pages.