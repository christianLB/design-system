import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select } from '../Select';

describe('Select Component', () => {
  const options = [{ value: "1", label: "Option 1" }];
  
  it('renders correctly', () => {
    render(<Select options={options} data-testid="select" />);
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});