import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppLayout } from './AppLayout';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Box } from '../Box';

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dashboard', 'sidebar-fixed', 'no-scroll'],
      description: 'Layout variant for different app types',
    },
    headerBehavior: {
      control: 'select',
      options: ['static', 'sticky', 'floating', 'hidden'],
      description: 'Header positioning behavior',
    },
    sidebarBehavior: {
      control: 'select',
      options: ['overlay', 'push', 'fixed', 'collapsible'],
      description: 'Sidebar behavior',
    },
    enableVerticalScroll: {
      control: 'boolean',
      description: 'Enable vertical scrolling in main content',
    },
    contentPadding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding for main content area',
    },
  },
};
export default meta;

type Story = StoryObj<typeof AppLayout>;

// Sample components for stories
const SampleHeader = () => (
  <Header variant="default">
    <Navbar 
      variant="corporate"
      items={[
        { label: 'Dashboard', href: '#dashboard' },
        { label: 'Analytics', href: '#analytics' },
        { label: 'Reports', href: '#reports' },
        { label: 'Settings', href: '#settings' },
      ]}
      logo={<div style={{ fontWeight: 'bold' }}>MyApp</div>}
      cta={<button>Sign Out</button>}
    />
  </Header>
);

const SampleSidebar = () => (
  <Sidebar 
    variant="navigation"
    items={[
      { label: 'Dashboard', href: '#dashboard', icon: '📊' },
      { label: 'Users', href: '#users', icon: '👥' },
      { label: 'Products', href: '#products', icon: '📦' },
      { label: 'Orders', href: '#orders', icon: '🛒', badge: '12' },
      { label: 'Settings', href: '#settings', icon: '⚙️' },
    ]}
  />
);

const SampleContent = ({ height = 'auto' }: { height?: string }) => (
  <Box style={{ height, padding: '2rem' }}>
    <h1>Main Content Area</h1>
    <p>This is the main content area of the application layout.</p>
    <div style={{ marginTop: '2rem' }}>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} style={{ marginBottom: '1rem' }}>
          Content paragraph {i + 1}. This demonstrates scrolling behavior in different layout variants.
        </p>
      ))}
    </div>
  </Box>
);

// Stories
export const Default: Story = {
  args: {
    variant: 'default',
    headerBehavior: 'static',
    sidebarBehavior: 'fixed',
    enableVerticalScroll: true,
    contentPadding: 'md',
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
};

export const Dashboard: Story = {
  args: {
    variant: 'dashboard',
    headerBehavior: 'sticky',
    sidebarBehavior: 'fixed',
    enableVerticalScroll: false,
    contentPadding: 'lg',
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    children: <SampleContent height="100%" />,
  },
};

export const SidebarFixed: Story = {
  args: {
    variant: 'sidebar-fixed',
    headerBehavior: 'sticky',
    sidebarBehavior: 'fixed',
    enableVerticalScroll: true,
    contentPadding: 'xl',
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
};

export const NoScroll: Story = {
  args: {
    variant: 'no-scroll',
    headerBehavior: 'floating',
    enableVerticalScroll: false,
    enableHorizontalScroll: false,
    contentPadding: 'none',
    header: <SampleHeader />,
    children: (
      <Box style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1>Landing Page Layout</h1>
          <p>Perfect for marketing pages and landing pages</p>
        </div>
      </Box>
    ),
  },
};

export const MinimalHeader: Story = {
  args: {
    variant: 'default',
    headerBehavior: 'static',
    contentPadding: 'lg',
    header: (
      <Header variant="compact">
        <Navbar 
          variant="minimal"
          items={[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
          ]}
          logo={<div>Logo</div>}
        />
      </Header>
    ),
    children: <SampleContent />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    variant: 'default',
    headerBehavior: 'sticky',
    contentPadding: 'xl',
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

export const LegacyProps: Story = {
  name: 'Legacy Props (Deprecated)',
  args: {
    stickyHeader: true,
    sidebarInitiallyCollapsed: true,
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    children: (
      <Box p="md">
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fef3c7', 
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          ⚠️ This story demonstrates legacy props. Use the new variant-based approach instead.
        </div>
        <SampleContent />
      </Box>
    ),
  },
};