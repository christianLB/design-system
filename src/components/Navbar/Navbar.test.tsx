import React from 'react';
import { render } from '../../test-utils';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Navbar items={[{ label: 'Home', href: '#' }]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
