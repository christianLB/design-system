import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb Component', () => {
  const mockItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Details', href: '/products/details' },
  ];

  it('renders correctly with items', () => {
    render(<Breadcrumb items={mockItems} />);
    
    // Check if all items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    
    // Check if separator is rendered between items
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(mockItems.length - 1);
  });

  it('renders with correct href attributes', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const detailsLink = screen.getByText('Details').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(detailsLink).toHaveAttribute('href', '/products/details');
  });

  it('applies custom className', () => {
    const customClass = 'custom-breadcrumb';
    render(<Breadcrumb items={mockItems} className={customClass} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(customClass);
  });

  it('forwards additional props to the root element', () => {
    const dataTestId = 'test-breadcrumb';
    render(<Breadcrumb items={mockItems} data-testid={dataTestId} />);
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(<Breadcrumb items={[]} />);
    const nav = screen.getByRole('navigation');
    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol?.children.length).toBe(0);
  });

  it('passes through ref to nav element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb items={mockItems} ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('has correct aria-label for accessibility', () => {
    render(<Breadcrumb items={mockItems} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});
