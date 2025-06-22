import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Navbar } from '../Navbar';
import { ThemeProvider } from '../../theme/ThemeContext';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

export const Default: Story = {
  render: (args) => (
    <Header {...args}>
      <Navbar items={navItems} logo={<span>MyApp</span>} />
    </Header>
  ),
};
