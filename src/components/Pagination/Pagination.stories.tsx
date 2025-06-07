import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {}
};

