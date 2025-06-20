import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { DataTable, ColumnDef } from './DataTable';
import { TableToolbar } from '../TableToolbar';
import { Button } from '../Button/Button';

interface Row {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

const meta: Meta<typeof DataTable<Row>> = {
  title: 'Components/DataTable',
  component: DataTable,
  args: { columns, data },
};
export default meta;

type Story = StoryObj<typeof DataTable<Row>>;

export const Basic: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const WithToolbar: Story = {
  render: args => (
    <div>
      <TableToolbar actions={<Button>New</Button>} onSearch={() => {}} count={2} />
      <DataTable {...args} />
    </div>
  ),
};
