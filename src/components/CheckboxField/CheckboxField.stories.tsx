import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CheckboxField } from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  argTypes: { error: { control: 'text' }, helperText: { control: 'text' } },
};
export default meta;

type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  render: (args) => <CheckboxField {...args} />,
  args: { id: 'agree', label: 'I agree', helperText: 'Required to continue', checked: false, onChange: () => {} },
};

export const WithReactHookForm: Story = {
  render: (args) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ agree: boolean }>();
    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-2">
        <CheckboxField
          {...args}
          {...register('agree', { required: 'Required' })}
          error={errors.agree?.message}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    );
  },
  args: { id: 'agree', label: 'I agree', checked: false, onChange: () => {} },
};
