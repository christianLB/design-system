import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  it('renders with page numbers correctly', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={vi.fn()} 
      />
    );
    
    // With 30 items and 10 per page, we should have 3 pages
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  
  it('highlights current page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={vi.fn()} 
      />
    );
    
    const currentPageButton = screen.getByText('2');
    // Current page should have primary background
    expect(currentPageButton).toHaveClass('bg-primary');
    expect(currentPageButton).toHaveClass('text-primary-foreground');
    
    // First page should not have primary background
    const otherPageButton = screen.getByText('1');
    expect(otherPageButton).not.toHaveClass('bg-primary');
  });
  
  it('calls onPageChange when page is clicked', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Click on page 2
    await user.click(screen.getByText('2'));
    
    // Handler should be called with page number 2
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
  
  it('disables previous button on first page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={vi.fn()} 
      />
    );
    
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('opacity-50');
  });
  
  it('disables next button on last page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={3} 
        onPageChange={vi.fn()} 
      />
    );
    
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('opacity-50');
  });
  
  it('enables both previous and next buttons on middle page', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={vi.fn()} 
      />
    );
    
    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
  
  it('navigates to previous page when prev button is clicked', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={handlePageChange} 
      />
    );
    
    await user.click(screen.getByLabelText('Previous page'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
  
  it('navigates to next page when next button is clicked', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={handlePageChange} 
      />
    );
    
    await user.click(screen.getByLabelText('Next page'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
  
  it('hides page numbers when showPageNumbers is false', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={2} 
        onPageChange={vi.fn()}
        showPageNumbers={false}
      />
    );
    
    // Page numbers should not be visible
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    
    // But prev/next buttons should still be there
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });
  
  it('limits visible page buttons based on maxPageButtons', () => {
    render(
      <Pagination 
        totalItems={100} 
        itemsPerPage={10} 
        currentPage={5} 
        onPageChange={vi.fn()}
        maxPageButtons={3}
      />
    );
    
    // With currentPage=5 and maxPageButtons=3, we should see pages 4,5,6
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    
    // Pages 1-3 and 7-10 should not be visible
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });
  
  it('returns null when there is only one page', () => {
    const { container } = render(
      <Pagination 
        totalItems={10} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={vi.fn()}
      />
    );
    
    // With totalItems=10 and itemsPerPage=10, there's only one page
    // The component should return null
    expect(container.firstChild).toBeNull();
  });
  
  it('applies custom className', () => {
    render(
      <Pagination 
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={vi.fn()}
        className="test-class"
      />
    );
    
    const paginationContainer = screen.getByRole('button', { name: 'Previous page' }).parentElement;
    expect(paginationContainer).toHaveClass('test-class');
  });
  
  it('forwards ref to the outer div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Pagination 
        ref={ref}
        totalItems={30} 
        itemsPerPage={10} 
        currentPage={1} 
        onPageChange={vi.fn()}
      />
    );
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
