import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box/Box';
import { Navbar } from '../Navbar/Navbar';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { navItems, logoElement, withTheme, withLightBackground } from './stories.utils';

/**
 * Navigation components collection
 *
 * This is a showcase of all navigation components that are part of the design system.
 * It doesn't represent a component itself but demonstrates how to use the navigation-related
 * components together.
 */
const meta: Meta = {
  title: 'Core Components/Navigation/Navigation System',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withTheme, withLightBackground],
};

export default meta;
type Story = StoryObj;

/**
 * Standard navigation layout with header and sidebar
 */
export const StandardNavigation: Story = {
  render: () => (
    <div className="min-h-[300px]">
      <Header>
        <Navbar logo={logoElement} items={navItems} layout="row" />
      </Header>
      <div className="flex">
        <Sidebar
          className="w-64"
          items={navItems.map((item) => ({
            ...item,
            content: item.label,
          }))}
        ></Sidebar>
        <Box className="p-4 flex-grow">
          <h2 className="text-xl font-bold mb-4">Main Content Area</h2>
          <p>This is a demonstration of the Navigation components working together.</p>
        </Box>
      </div>
    </div>
  ),
};

/**
 * Mobile navigation layout
 */
export const MobileNavigation: Story = {
  render: () => (
    <div className="min-h-[300px]">
      <Header>
        <Navbar logo={logoElement} items={navItems} layout="stack" />
      </Header>
      <Box className="p-4">
        <h2 className="text-xl font-bold mb-4">Mobile Content Area</h2>
        <p>This demonstrates a stacked mobile navigation layout.</p>
      </Box>
    </div>
  ),
};
