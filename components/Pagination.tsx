import * as React from 'react';

interface PaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Current active page */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A pagination component that allows navigation between pages of content.
 * @component
 * @example
 * <Pination 
 *   totalItems={100}
 *   itemsPerPage={10}
 *   currentPage={1}
 *   onPageChange={(page) => console.log(page)}
 * />
 */
function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = '',
}: PaginationProps) {
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
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
export type { PaginationProps };