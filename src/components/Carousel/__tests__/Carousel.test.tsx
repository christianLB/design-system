import React from 'react';
import { render, screen } from '@testing-library/react';
import { Carousel } from '../Carousel';

describe('Carousel Component', () => {
  const items = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];
  
  it('renders correctly', () => {
    render(<Carousel items={items} itemsToShow={1} data-testid="carousel" />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});