import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../Accordion';

describe('Accordion Component', () => {
  const items = [
    { title: 'Section 1', content: <p>Content for section 1</p> },
    { title: 'Section 2', content: <p>Content for section 2</p> },
    { title: 'Section 3', content: <p>Content for section 3</p>, disabled: true },
  ];

  it('renders accordion with all items', () => {
    render(<Accordion items={items} />);
    
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
    
    // Initially, no content should be visible
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('expands and collapses items on click', () => {
    render(<Accordion items={items} />);
    
    // Click to expand section 1
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    
    // Click to collapse section 1
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    
    // Click to expand section 2
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
  });

  it('respects disabled items', () => {
    render(<Accordion items={items} />);
    
    // Try to click disabled section 3
    fireEvent.click(screen.getByText('Section 3'));
    expect(screen.queryByText('Content for section 3')).not.toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    const { container } = render(<Accordion items={items} className="custom-class" />);
    
    // The root element of the Accordion component has the custom class
    const accordion = container.firstChild;
    expect(accordion).toHaveClass('custom-class');
  });
});
