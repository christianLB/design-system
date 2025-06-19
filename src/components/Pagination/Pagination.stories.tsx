import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    totalItems: 100,
    itemsPerPage: 10,
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <Pagination {...args} currentPage={page} onPageChange={setPage} />
    );
  },
};

export const WithoutPageNumbers: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <Pagination {...args} currentPage={page} onPageChange={setPage} showPageNumbers={false} />
    );
  },
};
