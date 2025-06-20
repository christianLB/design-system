import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextAreaField } from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
  argTypes: { error: { control: 'text' }, autoGrow: { control: 'boolean' } },
};
export default meta;

type Story = StoryObj<typeof TextAreaField>;

export const Default: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: { id: 'bio', label: 'Bio', placeholder: 'Tell us about you' },
};

export const WithReactHookForm: Story = {
  render: (args) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ bio: string }>();
    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-2">
        <TextAreaField
          {...args}
          {...register('bio', { required: 'Required' })}
          error={errors.bio?.message}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    );
  },
  args: { id: 'bio', label: 'Bio' },
};
