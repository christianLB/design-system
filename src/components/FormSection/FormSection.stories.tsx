import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './FormSection';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';

const meta: Meta<typeof FormSection> = {
  title: 'Components/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
  },
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

export const WithDescription: Story = {
  args: {
    title: 'Security Settings',
    description: 'Configure your account security and privacy options',
    children: (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="twoFactor" />
          <Label htmlFor="twoFactor">Enable two-factor authentication</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="emailNotifs" />
          <Label htmlFor="emailNotifs">Email notifications</Label>
        </div>
      </div>
    ),
  },
};

export const OutlinedVariant: Story = {
  args: {
    title: 'Billing Information',
    description: 'Manage your billing details and payment methods',
    variant: 'outlined',
    children: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="123" />
          </div>
        </div>
      </div>
    ),
  },
};