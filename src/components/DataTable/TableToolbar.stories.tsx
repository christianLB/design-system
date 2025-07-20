import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TableToolbar } from './TableToolbar';
import { Button } from '../Button/Button';

const meta: Meta<typeof TableToolbar> = {
  title: 'Core Components/Data Display/Table Toolbar',
  component: TableToolbar,
  args: {
    count: 3,
    actions: <Button>New</Button>,
  },
};
export default meta;

type Story = StoryObj<typeof TableToolbar>;

export const Default: Story = {};

export const WithSearch: Story = {
  args: { onSearch: () => console.log('search') },
};
