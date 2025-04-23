# Table Component Requirements

This document outlines the requirements for a new Table component built using TanStack React Table. The component will provide a robust and flexible solution for displaying tabular data within our application.

## 1. Basic Requirements

### 1.1 Data Rendering

*   **Data Source:** The table should accept an array of data objects (`data`) as a prop.
*   **Column Definition:** The table should accept a column definition array (`columns`) to specify how to display each data field.
*   **Cell Rendering:** The table should be able to render data in each cell based on the column definition, supporting various data types (text, numbers, dates, etc.).
*   **No Custom Cell Rendering:** The table will not support custom cell rendering functions in the initial implementation. Instead, it will provide rendering for the most used basic types, like text, dates, and numbers. If more complex cases are needed, we will expand the functionality later.

### 1.2 Styling

*   **Base Styles:** The table should have a default, visually appealing style.
*   **Customizable Styles:** The table's appearance (colors, fonts, spacing) should be customizable via props (e.g., `className`, style objects).
*   **Responsive Design:** The table should adapt to different screen sizes gracefully.
* **Theming**: The table should respect the current application theme.

### 1.3 Header Configuration

*   **Column Headers:** The table should display headers for each column, defined in the `columns` array.
*   **Custom Header Labels:** Users should be able to customize the display label for each column header.
* **Header components**: Users should be able to provide a custom component to render the table header.
* **No custom header rendering**: We should not expose custom header render function in the initial implementation, instead, we will provide header rendering for the most used basic types, like text, dates, and numbers. We will expand if needed. This is to improve consistency, maintainability and testing.

### 1.4 Empty State

* **Empty message**: The table should display a custom message when there is no data to display.
## 2. Advanced Requirements

### 2.1 Sorting

*   **Sortable Columns:** The table should allow sorting of columns by clicking on the header.
*   **Multi-Column Sorting:** The table should support sorting by multiple columns (e.g., sort by name then by date).
*   **Sort Order:** The table should indicate the current sort order (ascending/descending) visually.
* **Default Sort**: The table should support a default sort order.
* **No custom sort**: We should not expose custom sort function in the initial implementation, instead we will provide sorting of basic types like text, dates, numbers. We will expand if needed. This is to improve consistency, maintainability and testing.

### 2.2 Filtering

*   **Column Filtering:** The table should allow filtering of data within each column.
*   **Global Filtering:** The table should allow filtering across all columns with a single input.
* **No custom filter**: We should not expose custom filter function in the initial implementation, instead we will provide text filtering. We will expand if needed. This is to improve consistency, maintainability and testing.

### 2.3 Pagination

*   **Pagination Controls:** The table should use the existing `Pagination` component for navigating between pages.
*   **Page Size Selection:** Users should be able to select the number of items displayed per page.
*   **Total Page Count:** The table should display the total number of pages.
*   **Current Page Indication:** The table should clearly indicate the currently displayed page.
*   **Server-Side Pagination:** The table should support pagination handled by a backend API.
* **Use of existing components**: We should use our existing components instead of raw html elements. For example pagination controls should be the existing Pagination component.

### 2.4 Selection

*   **Row Selection:** Users should be able to select one or multiple rows.
*   **Select All:** The table should include a "select all" option.
*   **Selection Indication:** Selected rows should be visually highlighted.
* **Selection Callback**: A callback should be provided to notify on the selection change.
* **Selection**: selection should be supported using a Checkbox for each row.
* **Accessibility**: Ensure that row selection is accessible using keyboard navigation.

### 2.5 Virtualization

* **Virtualized rows**: The table should be able to render a large amount of data using virtualization, rendering only the rows that are visible on screen.
* **Virtualization**: we should implement virtualization in the initial release to support large datasets.
    
## 3. Component API

*   `data: object[]` (required): An array of data objects to display in the table.
*   `columns: ColumnDef[]` (required): An array of column definitions.
*   `className?: string`: Optional class name for custom styling.
* `emptyMessage?: string`: Message to display when there is no data
*   `defaultSortBy?: SortingState`: Default sorting order.
* `onSelectionChange?: (selection: any[]) => void`: Callback to notify on selection change.
* **Accessibility**: The table should be accessible by using keyboard navigation.
* **Testability**: It should be easy to test using testing libraries like react testing library.
* **Consistency**: It should be consistent with the rest of the components.
* **Maintainability**: The code should be well documented, easy to understand and change.
* **Scalability**: The table should scale well with a large amount of data and features.
*   ... and other props to configure sorting, filtering, pagination, etc.

## 4. Technology

* **Tanstack React Table**: Use Tanstack React Table to handle the core table logic.
* **React**: The table should be implemented as a React component.

## 5. Future Considerations

*   **Column Reordering:** Allow users to reorder columns by dragging and dropping.
*   **Column Resizing:** Allow users to resize columns.
*   **Row Grouping:** Allow grouping of rows based on a specific field.
*   **Expandable Rows:** Allow rows to be expanded to show additional details.
* **Accessibility**: Make sure the table is fully accessible for assistive technologies.
