import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <Breadcrumb items={[{ name: 'Home', href: '#' }]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
