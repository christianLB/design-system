import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    title: 'Delete item',
    description: 'Are you sure?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
};
export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

export const Primary: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <ConfirmDialog
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
        }}
      />
    );
  },
};

export const WithChildren: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <ConfirmDialog
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        <p>Extra content</p>
      </ConfirmDialog>
    );
  },
};
