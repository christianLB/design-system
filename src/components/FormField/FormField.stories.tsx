import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Core Components/Forms/Form Field',
  component: FormField,
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <input />
    </FormField>
  ),
  args: { id: 'name', label: 'Name', description: 'Your full name' },
};
