import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { AppLayout } from './AppLayout';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('AppLayout', () => {
  const navItems = [{ label: 'Home', href: '#' }];
  const sidebarItems = [{ label: 'Dashboard', href: '#' }];

  it('renders without accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <AppLayout
          navbar={<Navbar items={navItems} aria-label="main navigation" />}
          sidebar={<Sidebar items={sidebarItems} aria-label="sidebar" />}
        >
          <div>Content</div>
        </AppLayout>
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('applies sticky styles to the header when stickyHeader is true', () => {
    render(
      <ThemeProvider>
        <AppLayout
          navbar={<Navbar items={navItems} data-testid="navbar" />}
          stickyHeader
        >
          <div>Content</div>
        </AppLayout>
      </ThemeProvider>,
    );
    const navbarContainer = screen.getByTestId('navbar').parentElement;
    expect(navbarContainer).toHaveStyle('position: sticky');
  });

  it('toggles the sidebar when the toggle button is clicked', () => {
    render(
      <ThemeProvider>
        <AppLayout sidebar={<Sidebar items={sidebarItems} />}>
          <div>Content</div>
        </AppLayout>
      </ThemeProvider>,
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveAttribute('data-collapsed', 'false');

    const toggleButton = screen.getByLabelText('Toggle');
    fireEvent.click(toggleButton);

    expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  it('initializes the sidebar as collapsed', () => {
    render(
      <ThemeProvider>
        <AppLayout
          sidebar={<Sidebar items={sidebarItems} />}
          sidebarInitiallyCollapsed
        >
          <div>Content</div>
        </AppLayout>
      </ThemeProvider>,
    );
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });
});
