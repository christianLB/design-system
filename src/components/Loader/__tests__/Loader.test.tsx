import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader Component', () => {
  it('renders correctly', () => {
    render(<Loader />);
    // Add appropriate assertions based on component functionality
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});