import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { AppLayout } from './AppLayout';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

describe('AppLayout', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <AppLayout
        navbar={
          <Navbar
            items={[{ label: 'Home', href: '#' }]}
            aria-label="main navigation"
          />
        }
        sidebar={
          <Sidebar
            items={[{ label: 'Dashboard', href: '#' }]}
            aria-label="sidebar"
          />
        }
      >
        <div>Content</div>
      </AppLayout>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
