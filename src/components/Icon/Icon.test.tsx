import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the specified icon', async () => {
    const { container } = render(<Icon name="Star" aria-hidden />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
