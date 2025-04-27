import * as React from "react"
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
} from "@tanstack/react-table"

import { cn } from "../lib/utils"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import Pagination  from "./Pagination"
import Badge  from "./Badge"

export type TableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  emptyMessage?: React.ReactNode
  defaultSortBy?: SortingState
  onSelectionChange?: (selection: TData[]) => void
  className?: string
  meta?: Record<string, any>
}

function Table<TData>({
  data,
  columns,
  emptyMessage = "No data found.",
  defaultSortBy = [],
  onSelectionChange,
  className,
  meta,
}: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSortBy)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [currentPage, setCurrentPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)

  const table = useReactTable({
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
    meta,
  })

  React.useEffect(() => {
    const selectedData = table
      .getSelectedRowModel()
      .rows.map((row) => row.original)
    onSelectionChange?.(selectedData)
  }, [rowSelection])

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  }

  const pageCount = Math.ceil(table.getCoreRowModel().rows.length / pageSize);


  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-md border">
        <div className="flex items-center py-4 px-2">
          <Input
            placeholder="Filter all columns..."
            value={(table.getColumn("global")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("global")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>     
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm caption-bottom">
            <thead className="[&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "text-muted-foreground h-10 px-2  align-middle font-semibold text-left whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                          header.column.getCanSort() && "cursor-pointer"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " ▲",
                              desc: " ▼",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>            
              {table.getPaginationRowModel().rows.length === 0 ? (
                <tr><td className="p-4 text-center" colSpan={table.getAllColumns().length}>{emptyMessage}</td></tr>                
              ) : (table.getPaginationRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50  border-b transition-colors p-4">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>                    
                  ))}
                </tr>
              )))}
               {table.getPaginationRowModel().rows.length === 0 && table.getCoreRowModel().rows.length > 0 && (
                  <tr >
                  {table.getCoreRowModel().rows[0].getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                    
                    </td>
                  ))}
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-2 py-4">
          <Pagination totalItems={table.getCoreRowModel().rows.length} currentPage={currentPage + 1} itemsPerPage={pageSize} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  )
}

export { Table }
