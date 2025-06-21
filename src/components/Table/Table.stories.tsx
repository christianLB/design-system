import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Table } from './Table';

interface Row {
  id: number;
  name: string;
  age: number;
}

const columns: { accessorKey: keyof Row; header: string }[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

const meta: Meta<typeof Table<Row>> = {
  title: 'Components/Table',
  component: Table,
  args: { columns, data },
};
export default meta;

type Story = StoryObj<typeof Table<Row>>;

export const Primary: Story = {};

export const WithClass: Story = { args: { className: 'w-full' } };
