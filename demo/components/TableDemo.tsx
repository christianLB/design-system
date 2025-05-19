import React from 'react';
import { Table } from '../../components/Table';
import { ComponentShowcase } from './ComponentShowcase';

type Person = {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  role: string;
  lastLogin: string;
};

export function TableDemo() {
  // Generate mock data
  const generateMockData = (count: number): Person[] => {
    const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
    const roles = ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer'];
    const names = [
      'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown',
      'Eve Davis', 'Frank Wilson', 'Grace Taylor', 'Henry Anderson', 'Ivy Thomas'
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const allData = React.useMemo(() => generateMockData(23), []);
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allData.slice(startIndex, startIndex + itemsPerPage);
  }, [allData, currentPage, itemsPerPage]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }: { row: { original: Person } }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: { original: Person } }) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.original.status === 'Active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    const newTotalPages = Math.ceil(allData.length / newItemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  return (
    <ComponentShowcase 
      title="Table with Pagination" 
      description="A responsive table with client-side pagination."
    >
      <div className="w-full overflow-x-auto">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, allData.length)}
            </span>{' '}
            of <span className="font-medium">{allData.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="text-sm border rounded-md p-1.5"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>
        
        <Table data={paginatedData} columns={columns} />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
