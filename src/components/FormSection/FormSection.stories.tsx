import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './FormSection';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';

const meta: Meta<typeof FormSection> = {
  title: 'Components/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Personal Information',
    children: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter your first name" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter your last name" />
        </div>
      </div>
    ),
  },
};