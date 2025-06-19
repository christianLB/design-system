import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { FieldGroup } from './FieldGroup';
import { InputField } from '../InputField/InputField';

describe('FieldGroup', () => {
  it('renders without violations', async () => {
    const { container } = render(
      <FieldGroup legend="Test">
        <InputField id="one" label="One" value="" onChange={() => {}} />
      </FieldGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
