import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `This is item number ${i + 1} in the list`,
  }));
};

export function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = 25;
  
  const items = generateItems(totalItems);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch the data for the new page here
  };

  return (
    <ComponentShowcase 
      title="Pagination" 
      description="A component for navigating between pages of content."
    >
      <ComponentVariant title="Basic Pagination">
        <div className="space-y-4">
          <div className="border rounded-md p-4 space-y-2">
            {currentItems.map((item) => (
              <div key={item.id} className="p-3 border-b last:border-b-0">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Custom Items Per Page">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Items per page:</label>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={itemsPerPage}
              disabled
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="border rounded-md p-4 space-y-2">
            {currentItems.map((item) => (
              <div key={item.id} className="p-2 border-b last:border-b-0 text-sm">
                {item.name}
              </div>
            ))}
          </div>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
