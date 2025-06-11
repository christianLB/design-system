import React from 'react';
import { render } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  // Basic rendering
  it('renders a basic card correctly', () => {
    const { container } = render(<Card>Card content</Card>);
    const card = container.querySelector('div');
    
    // Verify it renders
    expect(card).not.toBeNull();
    // Check for basic card class
    expect(card?.className).toContain('rounded-lg');
    // Check content is rendered
    expect(card?.textContent).toBe('Card content');
  });

  // Title rendering
  it('renders with a title', () => {
    const { container } = render(<Card title="Test Title">Card content</Card>);
    
    // Find the title element
    const title = container.querySelector('h3');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Test Title');
  });

  // Variant tests
  it('applies the default variant correctly', () => {
    const { container } = render(<Card variant="default">Card content</Card>);
    const card = container.querySelector('div');
    
    // Default variant has border and shadow
    expect(card?.className).toContain('border');
    expect(card?.className).toContain('shadow-md');
  });

  it('applies the muted variant correctly', () => {
    const { container } = render(<Card variant="muted">Card content</Card>);
    const card = container.querySelector('div');
    
    expect(card?.className).toContain('bg-muted/50');
  });

  it('applies the destructive variant correctly', () => {
    const { container } = render(<Card variant="destructive">Card content</Card>);
    const card = container.querySelector('div');
    
    expect(card?.className).toContain('bg-destructive/5');
    expect(card?.className).toContain('text-destructive');
  });

  it('applies the outline variant correctly', () => {
    const { container } = render(<Card variant="outline">Card content</Card>);
    const card = container.querySelector('div');
    
    expect(card?.className).toContain('bg-transparent');
    expect(card?.className).toContain('shadow-none');
  });

  // Testing with header and footer
  it('renders with header content', () => {
    const headerContent = <div data-testid="custom-header">Custom Header</div>;
    const { getByTestId } = render(
      <Card header={headerContent}>Card content</Card>
    );
    
    const header = getByTestId('custom-header');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Custom Header');
  });

  it('renders with footer content', () => {
    const footerContent = <div data-testid="custom-footer">Custom Footer</div>;
    const { getByTestId } = render(
      <Card footer={footerContent}>Card content</Card>
    );
    
    const footer = getByTestId('custom-footer');
    expect(footer).toBeInTheDocument();
    expect(footer.textContent).toBe('Custom Footer');
  });

  // Testing with custom classNames
  it('applies custom className correctly', () => {
    const { container } = render(
      <Card className="test-custom-class">Card content</Card>
    );
    
    const card = container.querySelector('div');
    expect(card?.className).toContain('test-custom-class');
  });
});

describe('Card subcomponents', () => {
  it('renders CardHeader correctly', () => {
    const { container } = render(
      <CardHeader>Header content</CardHeader>
    );
    
    const header = container.querySelector('div');
    expect(header).not.toBeNull();
    expect(header?.className).toContain('flex flex-col');
    expect(header?.textContent).toBe('Header content');
  });

  it('renders CardTitle correctly', () => {
    const { container } = render(
      <CardTitle>Card Title</CardTitle>
    );
    
    const title = container.querySelector('h3');
    expect(title).not.toBeNull();
    expect(title?.className).toContain('text-2xl font-semibold');
    expect(title?.textContent).toBe('Card Title');
  });

  it('renders CardDescription correctly', () => {
    const { container } = render(
      <CardDescription>Card description text</CardDescription>
    );
    
    const description = container.querySelector('p');
    expect(description).not.toBeNull();
    expect(description?.className).toContain('text-sm');
    expect(description?.textContent).toBe('Card description text');
  });

  it('renders CardContent correctly', () => {
    const { container } = render(
      <CardContent>Content area</CardContent>
    );
    
    const content = container.querySelector('div');
    expect(content).not.toBeNull();
    expect(content?.className).toContain('p-6');
    expect(content?.textContent).toBe('Content area');
  });

  it('renders CardFooter correctly', () => {
    const { container } = render(
      <CardFooter>Footer content</CardFooter>
    );
    
    const footer = container.querySelector('div');
    expect(footer).not.toBeNull();
    expect(footer?.className).toContain('flex items-center');
    expect(footer?.textContent).toBe('Footer content');
  });

  it('renders a composed Card with all subcomponents', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card with all subcomponents</CardDescription>
        </CardHeader>
        <CardContent>
          Main content area
        </CardContent>
        <CardFooter>
          Footer area
        </CardFooter>
      </Card>
    );
    
    const card = container.querySelector('.rounded-lg');
    expect(card).not.toBeNull();
    
    // Verify all parts are rendered
    expect(container.querySelector('h3')?.textContent).toBe('Complete Card');
    expect(container.querySelector('p')?.textContent).toBe('This is a complete card with all subcomponents');
    expect(container.textContent).toContain('Main content area');
    expect(container.textContent).toContain('Footer area');
  });
});
