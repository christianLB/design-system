import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Grid, { GridProps } from './Grid';
import { Box } from '../Box';
import { ResponsiveProvider } from '../../hooks/responsive';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  args: { columns: 3, gap: 'sm' },
};
export default meta;

type Story = StoryObj<typeof Grid>;

const Template = (args: GridProps) => (
  <ResponsiveProvider>
    <Grid {...args}>
      <Box bg="secondary">1</Box>
      <Box bg="secondary">2</Box>
      <Box bg="secondary">3</Box>
    </Grid>
  </ResponsiveProvider>
);

export const Default: Story = { render: Template };

export const Responsive: Story = {
  render: Template,
  args: { responsive: [2, 1] },
};
