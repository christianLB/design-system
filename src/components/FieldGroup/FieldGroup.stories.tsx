import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FieldGroup } from './FieldGroup';
import { InputField } from '../InputField/InputField';

const meta: Meta<typeof FieldGroup> = {
  title: 'Core Components/Forms/Field Group',
  component: FieldGroup,
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
  },
};
export default meta;

type Story = StoryObj<typeof FieldGroup>;

export const Default: Story = {
  render: (args) => (
    <FieldGroup {...args} legend="Info">
      <InputField id="first" label="First" value="" onChange={() => {}} />
      <InputField id="last" label="Last" value="" onChange={() => {}} />
    </FieldGroup>
  ),
  args: { direction: 'column' },
};

export const Row: Story = {
  render: (args) => (
    <FieldGroup {...args} legend="Row Group" direction="row">
      <InputField id="a" label="A" value="" onChange={() => {}} />
      <InputField id="b" label="B" value="" onChange={() => {}} />
    </FieldGroup>
  ),
};
