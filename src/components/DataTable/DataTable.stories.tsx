import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DataTable } from './DataTable';
import type { DataTablePagination } from './DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { TableToolbar } from './TableToolbar';
import { Button } from '../Button/Button';

interface Row {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 28 },
];

const meta: Meta<typeof DataTable<Row>> = {
  title: 'Core Components/Data Display/Data Table',
  component: DataTable,
  args: {
    columns,
    data,
    onRowClick: () => console.log('row clicked'),
    onRowSelect: () => console.log('row selected'),
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<Row>>;

export const WithData: Story = {};

export const Empty: Story = {
  args: { data: [] },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const WithPaginationAndSelection: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const pagination: DataTablePagination = {
      pageCount: 3,
      currentPage: page,
      itemsPerPage: 3,
      onPageChange: setPage,
    };
    return (
      <div>
        <TableToolbar actions={<Button>New</Button>} count={data.length} />
        <DataTable
          {...args}
          selectable
          rowActions={(row) => <Button size="sm">Edit {row.name}</Button>}
          pagination={pagination}
        />
      </div>
    );
  },
};

export const Sortable: Story = {
  args: { sortable: true },
};

export const WithRowActions: Story = {
  args: {
    rowActions: (row: Row) => <Button size="sm">Edit {row.name}</Button>,
  },
};

export const RowHover: Story = {
  args: { hover: true },
};
