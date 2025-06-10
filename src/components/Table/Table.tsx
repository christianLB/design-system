import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  RowModel,
  Table as TableType,
} from '@tanstack/react-table';

import { cn } from '../../utils';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination';
import { Badge } from '../Badge';

interface TableProps<TData, TMeta = unknown> {
  /**
   * Array of data to be displayed in the table
   */
  data: TData[];
  /**
   * Column definitions for the table
   */
  columns: ColumnDef<TData, any>[];
  /**
   * Message to display when no data is available
   * @default "No data found."
   */
  emptyMessage?: React.ReactNode;
  /**
   * Initial sorting state
   * @default []
   */
  defaultSortBy?: SortingState;
  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selection: TData[]) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional metadata to pass to the table
   */
  meta?: TMeta;
}

/**
 * A customizable table component with sorting, filtering, and pagination.
 * @component
 * @example
 * const columns = [
 *   {
 *     accessorKey: 'name',
 *     header: 'Name',
 *   },
 *   // ... more column definitions
 * ];
 * 
 * const data = [
 *   { id: 1, name: 'John Doe' },
 *   // ... more data
 * ];
 * 
 * <Table 
 *   columns={columns} 
 *   data={data} 
 *   emptyMessage="No records found"
 * />
 */
const Table = React.forwardRef<HTMLDivElement, TableProps<any, any>>(
  <TData, TMeta = unknown>({
    data,
    columns,
    emptyMessage = 'No data found.',
    defaultSortBy = [],
    onSelectionChange,
    className,
    meta,
    ...props
  }: TableProps<TData, TMeta>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSortBy);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize] = React.useState(10);

  // Create the table instance
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      pagination: { pageIndex: currentPage, pageSize },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    debugTable: false,
    meta: meta as any,
  });

  // Handle selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedData);
    }
  }, [rowSelection, table, onSelectionChange]);

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page - 1);
  }, []);

  const pageCount = React.useMemo(
    () => Math.ceil(table.getCoreRowModel().rows.length / pageSize),
    [table, pageSize]
  );


  return (
    <div ref={ref} className={cn('space-y-4', className)} {...props}>
      <div className="rounded-md border border-border bg-background">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm caption-bottom text-foreground">
            <thead className="[&_tr]:border-b [&_tr]:border-border bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}> 
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'h-10 px-4 py-3 align-middle font-medium text-left text-muted-foreground whitespace-nowrap',
                        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                        header.column.getCanSort() && 'cursor-pointer hover:text-foreground',
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-muted-foreground ml-1">
                              {{
                                asc: '↑',
                                desc: '↓',
                              }[header.column.getIsSorted() as string] ?? '↕'}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getPaginationRowModel().rows.length === 0 ? (
                <tr>
                  <td 
                    className="p-4 text-center text-muted-foreground" 
                    colSpan={table.getAllColumns().length}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getPaginationRowModel().rows.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td 
                        key={cell.id} 
                        className="p-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {pageCount > 1 && (
          <div className="flex items-center justify-end px-4 py-3 border-t border-border bg-muted/30">
            <Pagination 
              totalItems={table.getFilteredRowModel().rows.length}
              currentPage={currentPage + 1}
              itemsPerPage={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
});

Table.displayName = 'Table';

export type { TableProps };
export { Table };
