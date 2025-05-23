import * as React from 'react';
import { cn } from '../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Current active page */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Show page numbers (true) or just prev/next buttons (false) */
  showPageNumbers?: boolean;
  /** Maximum number of page buttons to show at once */
  maxPageButtons?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A pagination component that allows navigation between pages of content.
 * @component
 * @example
 * <Pagination 
 *   totalItems={100}
 *   itemsPerPage={10}
 *   currentPage={1}
 *   onPageChange={(page) => console.log(page)}
 * />
 */
const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>((
  {
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    showPageNumbers = true,
    maxPageButtons = 5,
    className,
    ...props
  }, 
  ref
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    if (!showPageNumbers) return [];
    
    // Logic to only show a window of page numbers when there are many pages
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div 
      ref={ref}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-md flex items-center justify-center",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "border border-border text-muted-foreground",
          "transition-colors",
          currentPage === 1 
            ? "bg-muted opacity-50 cursor-not-allowed" 
            : "bg-card hover:bg-muted"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.length > 0 && (
        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              className={cn(
                "px-3 py-1 rounded-md min-w-[2rem] text-sm font-medium",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "transition-colors",
                currentPage === page 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-card-foreground border border-border hover:bg-muted"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-md flex items-center justify-center",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "border border-border text-muted-foreground",
          "transition-colors",
          currentPage === totalPages 
            ? "bg-muted opacity-50 cursor-not-allowed" 
            : "bg-card hover:bg-muted"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export { Pagination };