import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Sidebar } from './Sidebar';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('Sidebar', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Sidebar items={[{ label: 'Home', href: '#' }]} />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
