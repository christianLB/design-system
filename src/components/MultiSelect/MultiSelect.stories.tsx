import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MultiSelect } from './MultiSelect';

const options = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  args: { options },
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Primary: Story = {
  render: (args) => {
    const [ids, setIds] = useState<Array<number | string>>([]);
    return (
      <MultiSelect {...args} selectedIds={ids} onChange={setIds} />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [ids, setIds] = useState<Array<number | string>>([]);
    return (
      <MultiSelect {...args} selectedIds={ids} onChange={setIds} disabled />
    );
  },
};
