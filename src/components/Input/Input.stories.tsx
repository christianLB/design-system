import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Input padding and radius come from spacing and radius tokens.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: { label: 'Name', id: 'name' },
};

export const WithError: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        error="Required"
      />
    );
  },
  args: { label: 'Email', id: 'email' },
};
