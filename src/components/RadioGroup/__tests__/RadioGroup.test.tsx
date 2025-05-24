import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

describe('RadioGroup Component', () => {
  const items = [{ label: "Option 1", value: "1" }];
  
  it('renders correctly', () => {
    render(<RadioGroup items={items} name="test" data-testid="radiogroup" />);
    expect(screen.getByTestId('radiogroup')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});