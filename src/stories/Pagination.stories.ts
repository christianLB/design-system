import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '../../components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 30,
    itemsPerPage: 5,
    currentPage: 1,
    onPageChange: (page) => console.log(`Page changed to ${page}`),
  },
};