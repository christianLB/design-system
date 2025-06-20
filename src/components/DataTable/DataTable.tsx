import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { EmptyState } from '../EmptyState';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';

export interface DataTableProps<T extends { id: React.Key }> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading?: boolean;
  emptyLabel?: string;
  onRowClick?: (row: T) => void;
  onRowSelect?: (rows: T[]) => void;
  rowActions?: (row: T) => React.ReactNode;
  pagination?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  striped?: boolean;
  hover?: boolean;
  className?: string;
}

export function DataTable<T extends { id: React.Key }>({
  columns,
  data,
  isLoading,
  emptyLabel = 'No data',
  onRowClick,
  onRowSelect,
  rowActions,
  pagination,
  sortable,
  selectable,
  striped,
  hover,
  className,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableSorting: sortable,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  React.useEffect(() => {
    if (onRowSelect) {
      const rows = table
        .getSelectedRowModel()
        .flatRows.map(r => r.original);
      onRowSelect(rows);
    }
  }, [rowSelection]);

  const renderBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={columns.length + (selectable ? 1 : 0)}>
            <Loader />
          </td>
        </tr>
      );
    }

    if (!data.length) {
      return (
        <tr>
          <td colSpan={columns.length + (selectable ? 1 : 0)}>
            <EmptyState title={emptyLabel} />
          </td>
        </tr>
      );
    }

    return table.getRowModel().rows.map(row => (
      <tr
        key={row.id}
        onClick={() => onRowClick?.(row.original)}
        className={
          `${hover ? 'table-row-hover' : ''} ` +
          `${striped ? (row.index % 2 === 0 ? 'table-row-striped' : '') : ''}`
        }
      >
        {selectable && (
          <td>
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </td>
        )}
        {row.getVisibleCells().map(cell => (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
        ))}
        {rowActions && <td>{rowActions(row.original)}</td>}
      </tr>
    ));
  };

  return (
    <div className={`data-table ${className || ''}`}>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {selectable && <th></th>}
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortable && header.column.getIsSorted() === 'asc' && ' ▲'}
                  {sortable && header.column.getIsSorted() === 'desc' && ' ▼'}
                </th>
              ))}
              {rowActions && <th></th>}
            </tr>
          ))}
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
      {pagination && (
        <Pagination
          totalItems={data.length}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      )}
    </div>
  );
}

export type { ColumnDef } from '@tanstack/react-table';
