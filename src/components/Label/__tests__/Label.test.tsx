import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label Component', () => {
  it('renders correctly', () => {
    render(<Label data-testid="label">Test Label</Label>);
    expect(screen.getByTestId('label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});