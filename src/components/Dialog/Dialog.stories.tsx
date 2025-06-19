import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './Dialog';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Dialog {...args} isOpen={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description text</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    );
  },
};

export const CustomClass: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Dialog {...args} isOpen={open} onClose={() => setOpen(false)} className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Custom</DialogTitle>
        </DialogHeader>
      </Dialog>
    );
  },
};
