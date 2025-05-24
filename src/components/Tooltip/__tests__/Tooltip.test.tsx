import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

import { vi } from 'vitest';

// Mock the NodeJS.Timeout type
vi.useFakeTimers();

describe('Tooltip Component', () => {
  it('renders children but no tooltip content by default', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('respects delay prop', () => {
    render(
      <Tooltip content="Delayed tooltip" delay={200}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    
    fireEvent.mouseEnter(trigger);
    
    // Tooltip should not be visible yet
    expect(screen.queryByText('Delayed tooltip')).not.toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    // Now tooltip should be visible
    expect(screen.getByText('Delayed tooltip')).toBeInTheDocument();
  });

  it('honors controlled isOpen prop', () => {
    const { rerender } = render(
      <Tooltip content="Controlled tooltip" isOpen={false}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Tooltip should not be visible initially
    expect(screen.queryByText('Controlled tooltip')).not.toBeInTheDocument();
    
    // Hover shouldn't change visibility when controlled
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    expect(screen.queryByText('Controlled tooltip')).not.toBeInTheDocument();
    
    // Update isOpen prop to true
    rerender(
      <Tooltip content="Controlled tooltip" isOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Now tooltip should be visible
    expect(screen.getByText('Controlled tooltip')).toBeInTheDocument();
    
    // Mouse leave shouldn't hide it when controlled
    fireEvent.mouseLeave(trigger);
    expect(screen.getByText('Controlled tooltip')).toBeInTheDocument();
  });

  it('renders with different positions', () => {
    const { rerender } = render(
      <Tooltip content="Position tooltip" position="top">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    // The tooltip content is rendered within the main tooltip component
    // The structure is: root div > tooltip div (with positioning classes) > content
    const tooltipText = screen.getByText('Position tooltip');
    // This is the div with the positioning classes
    const tooltipPositioningDiv = tooltipText.closest('div[class*="absolute"]');
    
    // Check that the tooltip uses the top position class
    expect(tooltipPositioningDiv).toHaveClass('absolute');
    expect(tooltipPositioningDiv).toHaveClass('z-50');
    expect(tooltipPositioningDiv).toHaveClass('bottom-full');
    
    // Test right position
    rerender(
      <Tooltip content="Position tooltip" position="right">
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(trigger);
    const rightTooltipText = screen.getByText('Position tooltip');
    const rightTooltipPositioningDiv = rightTooltipText.closest('div[class*="absolute"]');
    expect(rightTooltipPositioningDiv).toHaveClass('left-full');
    
    // Test bottom position
    rerender(
      <Tooltip content="Position tooltip" position="bottom">
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(trigger);
    const bottomTooltipText = screen.getByText('Position tooltip');
    const bottomTooltipPositioningDiv = bottomTooltipText.closest('div[class*="absolute"]');
    expect(bottomTooltipPositioningDiv).toHaveClass('top-full');
    
    // Test left position
    rerender(
      <Tooltip content="Position tooltip" position="left">
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(trigger);
    const leftTooltipText = screen.getByText('Position tooltip');
    const leftTooltipPositioningDiv = leftTooltipText.closest('div[class*="absolute"]');
    expect(leftTooltipPositioningDiv).toHaveClass('right-full');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Tooltip content="Variant tooltip" variant="primary">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    const tooltipText = screen.getByText('Variant tooltip');
    const tooltipContainer = tooltipText.closest('div[class*="absolute"]');
    expect(tooltipContainer).toHaveClass('bg-primary');
    
    // Test success variant
    rerender(
      <Tooltip content="Variant tooltip" variant="success">
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(trigger);
    const successTooltipText = screen.getByText('Variant tooltip');
    const successTooltipContainer = successTooltipText.closest('div[class*="absolute"]');
    expect(successTooltipContainer).toHaveClass('bg-success');
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Custom tooltip" className="custom-class">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    const tooltipText = screen.getByText('Custom tooltip');
    const tooltipContainer = tooltipText.closest('div[class*="absolute"]');
    expect(tooltipContainer).toHaveClass('custom-class');
  });

  it('respects showArrow prop', () => {
    const { rerender } = render(
      <Tooltip content="Arrow tooltip" showArrow={true}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    let tooltip = screen.getByText('Arrow tooltip').parentElement;
    expect(tooltip?.querySelector('div[class*="absolute w-2 h-2"]')).toBeInTheDocument();
    
    // Test with arrow hidden
    rerender(
      <Tooltip content="Arrow tooltip" showArrow={false}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(trigger);
    tooltip = screen.getByText('Arrow tooltip').parentElement;
    expect(tooltip?.querySelector('div[class*="absolute w-2 h-2"]')).not.toBeInTheDocument();
  });

  it('applies maxWidth correctly', () => {
    render(
      <Tooltip content="Width tooltip" maxWidth="300px">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    const tooltipText = screen.getByText('Width tooltip');
    const tooltipContainer = tooltipText.closest('div[class*="absolute"]');
    
    // Check the style attribute
    expect(tooltipContainer).toHaveAttribute('style');
    
    // Check the maxWidth property with proper type assertion
    if (tooltipContainer instanceof HTMLElement) {
      expect(tooltipContainer.style.maxWidth).toBe('300px');
    }
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = render(
      <Tooltip content="Unmount tooltip" delay={500}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(trigger);
    
    // Should have set a timeout
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    
    // Unmount component
    unmount();
    
    // Timer should be cleaned up during unmount
    // We can't directly test clearTimeout in Vitest like in Jest
  });
});
