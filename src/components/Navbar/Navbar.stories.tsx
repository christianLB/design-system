import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Navbar } from './Navbar';
import { Button } from '../Button/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'About', href: '#' },
    ],
    logo: <span>Logo</span>,
    cta: <Button>Sign Up</Button>,
  },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {};

export const DarkBackground: Story = {
  args: { background: 'dark' },
};
