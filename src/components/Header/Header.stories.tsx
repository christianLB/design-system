import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
// Updated: CSS variable changes reviewed - stories remain valid
import { Navbar } from '../Navbar';
import { 
  navItems,
  logoElement,
  ctaElement,
  withTheme,
  withLightBackground
} from '../Navigation/stories.utils';

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding for the inner Box container',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Using shared nav items from utils

export const Default: Story = {
  args: {
    padding: 'md',
  },
  render: (args) => (
    <Header {...args}>
      <Navbar items={navItems} logo={logoElement} />
    </Header>
  ),
  decorators: [withLightBackground],
};

export const WithNoPadding: Story = {
  args: {
    padding: 'none',
  },
  render: (args) => (
    <Header {...args}>
      <Navbar items={navItems} logo={logoElement} />
    </Header>
  ),
  decorators: [withLightBackground],
};

export const WithLargePadding: Story = {
  args: {
    padding: 'lg',
  },
  render: (args) => (
    <Header {...args}>
      <Navbar 
        items={navItems} 
        logo={logoElement}
        cta={ctaElement}
      />
    </Header>
  ),
  decorators: [withLightBackground],
};
