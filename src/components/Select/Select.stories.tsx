import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="btn">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">One</SelectItem>
        <SelectItem value="2">Two</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefault: Story = {
  render: (args) => (
    <Select {...args} defaultValue="2">
      <SelectTrigger className="btn">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">One</SelectItem>
        <SelectItem value="2">Two</SelectItem>
      </SelectContent>
    </Select>
  ),
};
