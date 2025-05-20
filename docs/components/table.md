# Table Component

## Overview

The `Table` component is a powerful data grid built on top of TanStack Table (React Table v8). It provides a flexible and performant way to display and interact with tabular data, including sorting, filtering, pagination, and row selection.

## Features

- **Sorting**: Single and multi-column sorting
- **Filtering**: Built-in column filtering
- **Pagination**: Client-side and server-side pagination
- **Row Selection**: Single and multi-row selection
- **Customizable**: Extensible with custom cell renderers and components
- **TypeScript Support**: Full TypeScript support with generics
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Follows WAI-ARIA design patterns

## Installation

```bash
# Required dependencies
npm install @tanstack/react-table
```

## Usage

### Basic Table

```tsx
import { Table } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";

interface Person {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

const data: Person[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: new Date('2023-06-15')
  },
  // More data...
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'success' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => row.original.lastLogin.toLocaleDateString(),
  },
];

function PeopleTable() {
  return (
    <Table
      data={data}
      columns={columns}
      emptyMessage="No people found."
    />
  );
}
```

### With Sorting

```tsx
function SortableTable() {
  const defaultSorting = [
    { id: 'name', desc: false } // Sort by name ascending by default
  ];

  return (
    <Table
      data={data}
      columns={columns}
      defaultSortBy={defaultSorting}
    />
  );
}
```

### With Row Selection

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = React.useState<Person[]>([]);

  return (
    <div className="space-y-4">
      <Table
        data={data}
        columns={[
          // Add a selection column
          {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={`Select ${row.original.name}`}
              />
            ),
            enableSorting: false,
          },
          ...columns,
        ]}
        onSelectionChange={setSelectedRows}
      />
      
      <div>
        <h3>Selected Rows: {selectedRows.length}</h3>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### With Server-Side Pagination

```tsx
function ServerSideTable() {
  const [data, setData] = React.useState<Person[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Fetch data when pagination or sorting changes
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Replace with your API call
      const response = await fetch(
        `/api/people?page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&sortBy=${sorting[0]?.id || ''}&sortOrder=${sorting[0]?.desc ? 'desc' : 'asc'}`
      );
      const result = await response.json();
      
      setData(result.data);
      setPageCount(result.totalPages);
      setLoading(false);
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  return (
    <Table
      data={data}
      columns={columns}
      loading={loading}
      pageCount={pageCount}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      manualPagination
      manualSorting
      rowCount={pageCount * pagination.pageSize}
      state={{
        pagination,
        sorting,
      }}
    />
  );
}
```

## Props

### Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | `[]` | The data to display in the table |
| `columns` | `ColumnDef<TData, any>[]` | `[]` | Column definitions |
| `emptyMessage` | `ReactNode` | `'No data found.'` | Message to display when there's no data |
| `defaultSortBy` | `SortingState` | `[]` | Default sorting state |
| `onSelectionChange` | `(selection: TData[]) => void` | - | Callback when row selection changes |
| `className` | `string` | - | Additional CSS class names |
| `loading` | `boolean` | `false` | Show loading state |
| `rowCount` | `number` | - | Total number of rows (for server-side pagination) |
| `pageCount` | `number` | - | Total number of pages (for server-side pagination) |
| `manualPagination` | `boolean` | `false` | Enable manual pagination |
| `manualSorting` | `boolean` | `false` | Enable manual sorting |
| `onPaginationChange` | `(pagination: PaginationState) => void` | - | Callback when pagination changes |
| `onSortingChange` | `(sorting: SortingState) => void` | - | Callback when sorting changes |
| `meta` | `TMeta` | - | Additional metadata passed to cell renderers |

### Column Definitions

Columns are defined using the `ColumnDef` type from `@tanstack/react-table`. Here are the most common properties:

| Property | Type | Description |
|----------|------|-------------|
| `accessorKey` | `string` | The key to access the data in the row |
| `header` | `string \| ((props: HeaderContext<TData, TValue>) => ReactNode)` | The header content |
| `cell` | `(props: CellContext<TData, TValue>) => ReactNode` | Custom cell renderer |
| `footer` | `string \| ((props: HeaderContext<TData, TValue>) => ReactNode)` | The footer content |
| `sortingFn` | `SortingFn<TData>` | Custom sorting function |
| `filterFn` | `FilterFn<TData>` | Custom filter function |
| `enableSorting` | `boolean` | Whether the column is sortable |
| `enableColumnFilter` | `boolean` | Whether the column is filterable |
| `size` | `number` | Column width in pixels |
| `minSize` | `number` | Minimum column width in pixels |
| `maxSize` | `number` | Maximum column width in pixels |

## Styling

The Table component uses Tailwind CSS for styling. You can customize the appearance by overriding the following CSS variables:

```css
:root {
  --table-border: theme('colors.gray.200');
  --table-bg: theme('colors.white');
  --table-header-bg: theme('colors.gray.50');
  --table-row-hover: theme('colors.gray.50');
  --table-row-selected: theme('colors.blue.50');
  --table-text: theme('colors.gray.900');
  --table-text-muted: theme('colors.gray.500');
  --table-padding: theme('spacing.4');
  --table-border-radius: theme('borderRadius.lg');
}

/* Dark mode overrides */
.dark {
  --table-border: theme('colors.gray.700');
  --table-bg: theme('colors.gray.900');
  --table-header-bg: theme('colors.gray.800');
  --table-row-hover: theme('colors.gray.800');
  --table-row-selected: theme('colors.blue.900');
  --table-text: theme('colors.gray.100');
  --table-text-muted: theme('colors.gray.400');
}
```

## Best Practices

### Performance Optimization

1. **Memoize columns and data**: Use `React.useMemo` for columns and `React.useMemo` or `React.useCallback` for data transformations to prevent unnecessary re-renders.

2. **Virtualization**: For large datasets, consider using a virtualized table implementation like `@tanstack/react-virtual`.

3. **Pagination**: Always implement pagination for large datasets to improve performance.

### Accessibility

1. **Keyboard Navigation**: Ensure the table is keyboard navigable with proper focus management.
2. **ARIA Attributes**: Use appropriate ARIA attributes for sortable columns and interactive elements.
3. **Screen Reader Support**: Provide proper labels and descriptions for screen readers.
4. **High Contrast**: Ensure sufficient color contrast for text and interactive elements.

### Error Handling

1. **Loading States**: Show loading indicators when data is being fetched.
2. **Empty States**: Provide helpful messages when no data is available.
3. **Error Boundaries**: Wrap the table in an error boundary to handle rendering errors gracefully.

## Examples

### Editable Cells

```tsx
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row, getValue, table }) => {
      const [value, setValue] = React.useState(getValue());
      
      const onBlur = () => {
        // Save the updated value
        console.log(`Updated name to: ${value}`);
        // Update the data
        // updatePerson(row.original.id, { name: value });
      };
      
      return (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded"
        />
      );
    },
  },
  // ... other columns
];
```

### Expandable Rows

```tsx
const columns: ColumnDef<Person>[] = [
  {
    id: 'expander',
    header: '',
    cell: ({ row }) => (
      <button
        {...{
          onClick: row.getToggleExpandedHandler(),
          style: { cursor: 'pointer' },
        }}
      >
        {row.getIsExpanded() ? '👇' : '👉'}
      </button>
    ),
  },
  // ... other columns
];

function ExpandableTable() {
  const renderSubComponent = React.useCallback(
    ({ row }) => (
      <div className="p-4 bg-gray-50 dark:bg-gray-800">
        <h3 className="font-semibold">Details</h3>
        <pre className="text-sm">
          {JSON.stringify(row.original, null, 2)}
        </pre>
      </div>
    ),
    []
  );

  return (
    <Table
      data={data}
      columns={columns}
      getRowCanExpand={() => true}
      renderSubComponent={renderSubComponent}
    />
  );
}
```

## Related Components

- [Pagination](./pagination.md) - For controlling table pagination
- [Input](./input.md) - For table filtering
- [Checkbox](./checkbox.md) - For row selection
- [Badge](./badge.md) - For status indicators in table cells
- [Button](./button.md) - For action buttons in table cells
