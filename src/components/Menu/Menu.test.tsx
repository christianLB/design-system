import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Menu trigger={<span>Open</span>} items={[{ label: 'A', value: 'a' }]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
