import * as React from 'react';

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
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
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
      className={`pagination-container ${className || ''}`}
      {...props}
    >
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-button ${currentPage === 1 ? 'pagination-button--disabled' : ''}`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pageNumbers.length > 0 && (
        <div className="pagination-pages">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              className={`pagination-button pagination-button--page ${currentPage === page ? 'pagination-button--active' : ''}`}
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
        className={`pagination-button ${currentPage === totalPages ? 'pagination-button--disabled' : ''}`}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export { Pagination };
