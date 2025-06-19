import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextAreaField } from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'inline'] },
    error: { control: 'text' },
    autoGrow: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof TextAreaField>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <TextAreaField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
  args: { id: 'bio', label: 'Bio', placeholder: 'Tell us about you' },
};

export const AutoGrow: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <TextAreaField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        autoGrow
      />
    );
  },
  args: { id: 'notes', label: 'Notes' },
};
