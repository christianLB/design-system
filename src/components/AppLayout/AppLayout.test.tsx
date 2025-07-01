import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { AppLayout } from './AppLayout';
import { Header } from '../Header';
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
          header={
            <Header>
              <Navbar items={navItems} aria-label="main navigation" />
            </Header>
          }
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
          header={
            <Header data-testid="header">
              <Navbar items={navItems} />
            </Header>
          }
          stickyHeader
        >
          <div>Content</div>
        </AppLayout>
      </ThemeProvider>,
    );
    const headerContainer = screen.getByTestId('header').parentElement;
    expect(headerContainer).toHaveStyle('position: sticky');
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

    const toggleButton = screen.getByRole('button');
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
