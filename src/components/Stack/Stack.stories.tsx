import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stack, { StackProps } from './Stack';
import { Box } from '../Box';
import { ResponsiveProvider } from '../../hooks/responsive';

const meta: Meta<typeof Stack> = {
  title: 'Core Components/Layout/Stack',
  component: Stack,
  args: { direction: 'row', gap: 'sm' },
};
export default meta;

type Story = StoryObj<typeof Stack>;

const Template = (args: StackProps) => (
  <ResponsiveProvider>
    <Stack {...args}>
      <Box bg="secondary">1</Box>
      <Box bg="secondary">2</Box>
    </Stack>
  </ResponsiveProvider>
);

export const Default: Story = { render: Template };

export const Responsive: Story = {
  render: Template,
  args: { responsive: ['column'] },
};
