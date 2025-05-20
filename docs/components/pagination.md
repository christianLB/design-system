# Pagination Component

## Overview

The `Pagination` component enables navigation through paged content, such as lists, tables, or search results. It provides previous/next, first/last, and direct page selection. Fully accessible, customizable, and responsive.

## Features
- **Page Navigation**: Previous, next, first, last, direct page selection
- **Customizable Range**: Show range, ellipsis, or all pages
- **Disabled State**: Disable navigation at ends
- **Responsive**: Adapts to screen size
- **Accessible**: Keyboard navigation, ARIA roles, screen reader support

## Usage

### Basic Usage
```jsx
<Pagination currentPage={2} totalPages={10} onPageChange={setPage} />
```

### With First/Last Buttons
```jsx
<Pagination currentPage={1} totalPages={5} onPageChange={setPage} showFirstLast />
```

### Hide Ellipsis
```jsx
<Pagination currentPage={7} totalPages={20} onPageChange={setPage} showEllipsis={false} />
```

## Prop Table
| Prop           | Type       | Default | Description                                  |
|----------------|------------|---------|----------------------------------------------|
| `currentPage`  | `number`   | —       | Currently active page                        |
| `totalPages`   | `number`   | —       | Total number of pages                        |
| `onPageChange` | `(page: number) => void` | — | Callback when page changes                   |
| `showFirstLast`| `boolean`  | false   | Show first/last navigation buttons           |
| `showEllipsis` | `boolean`  | true    | Show ellipsis for skipped page ranges        |
| `className`    | `string`   | —       | Custom class for styling                     |
| `aria-label`   | `string`   | —       | Accessible label for screen readers          |

## Accessibility
- Uses `nav` with `aria-label="Pagination"`
- Each button is keyboard accessible
- Current page has `aria-current="page"`
- First/last/ellipsis are hidden from screen readers

**Example Accessible Pagination:**
```jsx
<nav aria-label="Pagination">
  <Pagination currentPage={3} totalPages={10} onPageChange={setPage} />
</nav>
```

## Best Practices
- Use for content broken into multiple pages
- Show enough page numbers for easy navigation
- Always indicate current page
- Disable navigation at ends
- Provide accessible labels and focus states

## Troubleshooting
- If buttons don't work, check `currentPage`, `totalPages`, and `onPageChange`
- For accessibility, ensure correct ARIA roles and labels
- If layout breaks, check parent container and custom classes

## Related Components
- [Table](./table.md) — For paged tabular data
- [Button](./button.md) — For navigation controls
- [Card](./card.md) — For paged card layouts
- [Input](./input.md) — For direct page entry

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