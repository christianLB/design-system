import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
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

export default Pagination;