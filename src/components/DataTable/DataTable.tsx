import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
} from '@tanstack/react-table';
import { EmptyState } from '../EmptyState';
import { Pagination } from '../Pagination';
import { SkeletonRow } from './SkeletonRow';

export interface DataTablePagination {
  pageCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface DataTableProps<TData extends { id: React.Key }> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  isLoading?: boolean;
  emptyLabel?: string;
  onRowClick?: (row: TData) => void;
  onRowSelect?: (rows: TData[]) => void;
  rowActions?: (row: TData) => React.ReactNode;
  pagination?: DataTablePagination;
  sortable?: boolean;
  selectable?: boolean;
  striped?: boolean;
  hover?: boolean;
  className?: string;
}

export function DataTable<TData extends { id: React.Key }>({
  columns,
  data,
  isLoading,
  emptyLabel = 'No data',
  onRowClick,
  onRowSelect,
  rowActions,
  pagination,
  sortable = true,
  selectable = false,
  striped = false,
  hover = false,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const tableColumns = React.useMemo<ColumnDef<TData, unknown>[]>(() => {
    let cols = [...columns];
    if (selectable) {
      cols = [
        {
          id: '__select',
          header: ({ table }) => (
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all rows"
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select row"
            />
          ),
        },
        ...cols,
      ];
    }
    if (rowActions) {
      cols = [
        ...cols,
        {
          id: '__actions',
          header: '',
          cell: ({ row }) => rowActions(row.original),
        },
      ];
    }
    return cols;
  }, [columns, rowActions, selectable]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    enableSorting: sortable,
  });

  React.useEffect(() => {
    if (onRowSelect) {
      const selected = table.getSelectedRowModel().rows.map((r) => r.original);
      onRowSelect(selected);
    }
  }, [onRowSelect, rowSelection, table]);

  const headers = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const colLength = table.getVisibleLeafColumns().length;
  const rowMicro = useMicroInteraction('table-row');

  return (
    <motion.div
      className={clsx('overflow-x-auto', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
            <table className={clsx('data-table', 'w-full', 'border-collapse', 'mb-4')}>
        <thead>
          {headers.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      isSorted
                        ? isSorted === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                    className={clsx(
                      'border border-[var(--border)] bg-[var(--secondary)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-left',
                      sortable && header.column.getCanSort() && 'cursor-pointer select-none'
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <SkeletonRow key={i} columns={colLength} />
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={colLength}>
                <EmptyState title={emptyLabel} />
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              return (
                <motion.tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={clsx(
                    onRowClick && 'cursor-pointer',
                    striped && 'even:bg-[var(--muted)]'
                  )}
                  aria-rowindex={row.index + 1}
                  aria-selected={row.getIsSelected() || undefined}
                  whileHover={hover ? rowMicro.whileHover : undefined}
                  whileTap={rowMicro.whileTap}
                  initial={rowMicro.initial}
                  animate={rowMicro.animate}
                  transition={rowMicro.transition}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-[var(--border)] px-[var(--spacing-md)] py-[var(--spacing-sm)]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              );
            })
          )}
        </tbody>
      </table>
      {pagination && (
        <div className="mt-2">
          <Pagination
            totalItems={pagination.pageCount * pagination.itemsPerPage}
            itemsPerPage={pagination.itemsPerPage}
            currentPage={pagination.currentPage}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </motion.div>
  );
}

DataTable.displayName = 'DataTable';
