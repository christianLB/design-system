import React from 'react';
import { render, screen } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';

describe('MultiSelect Component', () => {
  // Using the correct type for options that includes id
  const options = [{ id: '1', label: "Option 1", value: "1" }];
  
  it('renders correctly', () => {
    render(<MultiSelect options={options} onChange={() => {}} data-testid="multiselect" />);
    expect(screen.getByTestId('multiselect')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});