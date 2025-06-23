import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@/components/Box';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Link } from '@/components/Link';
import { navItems, logoElement, withTheme, withLightBackground } from './stories.utils';

/**
 * Navigation components collection
 * 
 * This is a showcase of all navigation components that are part of the design system.
 * It doesn't represent a component itself but demonstrates how to use the navigation-related
 * components together.
 */
const meta: Meta = {
  title: 'Navigation/Overview',
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
        <Navbar 
          logo={logoElement}
          navItems={navItems.map(item => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
          layout="row"
        />
      </Header>
      <div className="flex">
        <Sidebar className="w-64">
          <Box className="p-4">
            {navItems.map(item => (
              <Link key={item.label} href={item.href} className="block py-2">
                {item.label}
              </Link>
            ))}
          </Box>
        </Sidebar>
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
        <Navbar 
          logo={logoElement}
          navItems={navItems.map(item => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
          layout="stack"
        />
      </Header>
      <Box className="p-4">
        <h2 className="text-xl font-bold mb-4">Mobile Content Area</h2>
        <p>This demonstrates a stacked mobile navigation layout.</p>
      </Box>
    </div>
  ),
};
