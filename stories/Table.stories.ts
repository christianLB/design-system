import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Table Story
export const Primary: Story = {
  args: {
    // Define basic table props here
    // This is a placeholder. Replace with actual data and column definitions
    data: [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Sam Brown', age: 35 },
      ],
      columns: [
        { 
            accessorKey: 'id', 
            header: 'ID',
        },
        { 
            accessorKey: 'name', 
            header: 'Name' 
        },
        { 
            accessorKey: 'age', 
            header: 'Age' 
        },
      ],
  },
};
