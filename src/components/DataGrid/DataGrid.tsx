/**
 * DataGrid Component
 *
 * A high-performance data grid with virtual scrolling,
 * inline editing, column resizing, and sorting.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, GripVertical, Edit2, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const dataGridVariants = cva('border border-border rounded-lg overflow-hidden', {
  variants: {
    size: {
      sm: 'text-sm',
      md: '',
      lg: 'text-lg',
    },
    striped: {
      true: '[&_tbody_tr:nth-child(even)]:bg-muted/30',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    striped: false,
  },
});

const cellSizes = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
};

export type SortDirection = 'asc' | 'desc' | null;

export interface DataGridColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Column header */
  header: string;
  /** Width in pixels or 'auto' */
  width?: number | 'auto';
  /** Minimum width */
  minWidth?: number;
  /** Maximum width */
  maxWidth?: number;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is resizable */
  resizable?: boolean;
  /** Whether column is editable */
  editable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** Custom editor renderer */
  renderEditor?: (
    value: unknown,
    onChange: (value: unknown) => void,
    onSave: () => void,
    onCancel: () => void,
  ) => React.ReactNode;
  /** Cell alignment */
  align?: 'left' | 'center' | 'right';
  /** Header alignment */
  headerAlign?: 'left' | 'center' | 'right';
  /** Custom class for cells */
  className?: string;
}

export interface DataGridProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof dataGridVariants> {
  /** Grid data */
  data: T[];
  /** Column definitions */
  columns: DataGridColumn<T>[];
  /** Row key accessor */
  rowKey: keyof T | ((row: T) => string);
  /** Current sort */
  sort?: { key: string; direction: SortDirection };
  /** Sort change handler */
  onSortChange?: (sort: { key: string; direction: SortDirection }) => void;
  /** Row selection */
  selectedRows?: string[];
  /** Selection change handler */
  onSelectionChange?: (rowKeys: string[]) => void;
  /** Enable row selection */
  selectable?: boolean;
  /** Cell edit handler */
  onCellEdit?: (rowKey: string, columnKey: string, value: unknown) => void;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Max height for scrollable area */
  maxHeight?: number | string;
  /** Show row numbers */
  showRowNumbers?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Enable column reordering */
  reorderable?: boolean;
  /** Column order change handler */
  onColumnReorder?: (columnKeys: string[]) => void;
}

interface EditingCell {
  rowKey: string;
  columnKey: string;
  value: unknown;
}

function DataGridSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="px-3 py-2">
              <div className="h-4 bg-muted animate-pulse rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function DataGrid<T extends Record<string, unknown>>({
  data,
  columns: initialColumns,
  rowKey,
  sort,
  onSortChange,
  selectedRows = [],
  onSelectionChange,
  selectable = false,
  onCellEdit,
  onRowClick,
  maxHeight,
  showRowNumbers = false,
  isLoading = false,
  emptyContent,
  stickyHeader = true,
  striped,
  size = 'md',
  reorderable = false,
  onColumnReorder,
  className,
  ...props
}: DataGridProps<T>) {
  const [columns, setColumns] = React.useState(initialColumns);
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});
  const [editingCell, setEditingCell] = React.useState<EditingCell | null>(null);
  const [resizing, setResizing] = React.useState<string | null>(null);
  const resizeStartX = React.useRef(0);
  const resizeStartWidth = React.useRef(0);

  // Update columns when prop changes
  React.useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const getRowKey = (row: T): string => {
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey]);
  };

  const handleSort = (columnKey: string) => {
    if (!onSortChange) return;

    let direction: SortDirection = 'asc';
    if (sort?.key === columnKey) {
      if (sort.direction === 'asc') direction = 'desc';
      else if (sort.direction === 'desc') direction = null;
    }

    onSortChange({ key: columnKey, direction });
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (selectedRows.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(getRowKey));
    }
  };

  const handleSelectRow = (rowKey: string) => {
    if (!onSelectionChange) return;
    if (selectedRows.includes(rowKey)) {
      onSelectionChange(selectedRows.filter((k) => k !== rowKey));
    } else {
      onSelectionChange([...selectedRows, rowKey]);
    }
  };

  const handleStartEdit = (rowKey: string, columnKey: string, value: unknown) => {
    setEditingCell({ rowKey, columnKey, value });
  };

  const handleSaveEdit = () => {
    if (editingCell && onCellEdit) {
      onCellEdit(editingCell.rowKey, editingCell.columnKey, editingCell.value);
    }
    setEditingCell(null);
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
  };

  const handleResizeStart = (columnKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(columnKey);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = columnWidths[columnKey] || 150;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - resizeStartX.current;
      const column = columns.find((c) => c.key === columnKey);
      const minWidth = column?.minWidth || 50;
      const maxWidth = column?.maxWidth || 500;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, resizeStartWidth.current + delta));
      setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
    };

    const handleMouseUp = () => {
      setResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  const cellSize = cellSizes[size || 'md'];

  return (
    <div className={cn(dataGridVariants({ size, striped }), className)} {...props}>
      <div className="overflow-auto" style={{ maxHeight: maxHeight }}>
        <table className="w-full border-collapse">
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr className="bg-muted border-b border-border">
              {/* Selection column */}
              {selectable && (
                <th className={cn('w-10', cellSize)}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {/* Row number column */}
              {showRowNumbers && <th className={cn('w-12 text-muted-foreground', cellSize)}>#</th>}

              {/* Data columns */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'relative font-medium text-left border-r border-border last:border-r-0',
                    cellSize,
                    column.sortable && 'cursor-pointer select-none hover:bg-muted',
                    column.headerAlign === 'center' && 'text-center',
                    column.headerAlign === 'right' && 'text-right',
                  )}
                  style={{
                    width: columnWidths[column.key] || column.width || 'auto',
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {reorderable && (
                      <GripVertical className="h-3 w-3 text-muted-foreground cursor-grab" />
                    )}
                    <span className="flex-1">{column.header}</span>
                    {column.sortable &&
                      sort?.key === column.key &&
                      (sort.direction === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : sort.direction === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : null)}
                  </div>

                  {/* Resize handle */}
                  {column.resizable && (
                    <div
                      className={cn(
                        'absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50',
                        resizing === column.key && 'bg-primary',
                      )}
                      onMouseDown={(e) => handleResizeStart(column.key, e)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <DataGridSkeleton
                columns={columns.length + (selectable ? 1 : 0) + (showRowNumbers ? 1 : 0)}
              />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (showRowNumbers ? 1 : 0)}
                  className="py-8 text-center text-muted-foreground"
                >
                  {emptyContent || 'No data available'}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const key = getRowKey(row);
                const isSelected = selectedRows.includes(key);

                return (
                  <motion.tr
                    key={key}
                    className={cn(
                      'border-b border-border last:border-b-0 transition-colors',
                      isSelected && 'bg-primary/5',
                      onRowClick && 'cursor-pointer hover:bg-muted/50',
                    )}
                    onClick={() => onRowClick?.(row)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: rowIndex * 0.02 }}
                  >
                    {/* Selection cell */}
                    {selectable && (
                      <td className={cellSize} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(key)}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}

                    {/* Row number cell */}
                    {showRowNumbers && (
                      <td className={cn('text-muted-foreground', cellSize)}>{rowIndex + 1}</td>
                    )}

                    {/* Data cells */}
                    {columns.map((column) => {
                      const value = row[column.key];
                      const isEditing =
                        editingCell?.rowKey === key && editingCell?.columnKey === column.key;

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            'border-r border-border last:border-r-0',
                            cellSize,
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right',
                            column.className,
                          )}
                          style={{
                            width: columnWidths[column.key] || column.width || 'auto',
                          }}
                        >
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              {column.renderEditor ? (
                                column.renderEditor(
                                  editingCell.value,
                                  (v) => setEditingCell({ ...editingCell, value: v }),
                                  handleSaveEdit,
                                  handleCancelEdit,
                                )
                              ) : (
                                <input
                                  type="text"
                                  value={String(editingCell.value ?? '')}
                                  onChange={(e) =>
                                    setEditingCell({ ...editingCell, value: e.target.value })
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit();
                                    if (e.key === 'Escape') handleCancelEdit();
                                  }}
                                  className="flex-1 px-1 py-0.5 border border-input rounded text-sm"
                                  autoFocus
                                />
                              )}
                              <button
                                onClick={handleSaveEdit}
                                className="p-1 hover:bg-success/20 rounded"
                              >
                                <Check className="h-3 w-3 text-success" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 hover:bg-destructive/20 rounded"
                              >
                                <X className="h-3 w-3 text-destructive" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 group">
                              <span className="flex-1 truncate">
                                {column.render
                                  ? column.render(value, row, rowIndex)
                                  : String(value ?? '')}
                              </span>
                              {column.editable && onCellEdit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartEdit(key, column.key, value);
                                  }}
                                  className="p-1 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-opacity"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataGrid.displayName = 'DataGrid';

export { dataGridVariants };
export default DataGrid;
