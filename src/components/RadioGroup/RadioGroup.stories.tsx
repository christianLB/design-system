import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Core Components/Forms/Radio Group',
  component: RadioGroup,
  argTypes: {
    error: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const OPTIONS = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
];

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState('1');
    return (
      <RadioGroup
        {...args}
        options={OPTIONS}
        name="example"
        legend="Choose"
        value={val}
        onChange={setVal}
      />
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    const [val, setVal] = useState('1');
    return (
      <RadioGroup
        {...args}
        options={OPTIONS}
        name="err"
        legend="Pick one"
        value={val}
        onChange={setVal}
        error="Required"
      />
    );
  },
};
