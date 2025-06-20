import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(
      <FormField id="name" label="Name">
        <input defaultValue="" onChange={() => {}} />
      </FormField>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
