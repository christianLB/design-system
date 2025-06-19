import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'inline'] },
    error: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
  args: { id: 'name', label: 'Name', placeholder: 'Jane' },
};

export const WithError: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        error="Required"
      />
    );
  },
  args: { id: 'email', label: 'Email' },
};
