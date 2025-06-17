import * as React from 'react';

export interface TableProps<TData> {
  columns: { accessorKey: keyof TData; header: string }[];
  data: TData[];
  className?: string;
}

const Table = <TData extends { id: React.Key }>({
  columns,
  data,
  className,
}: TableProps<TData>) => {
  return (
    <table className={`table ${className || ''}`}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={String(column.accessorKey)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td key={String(column.accessorKey)}>{String(row[column.accessorKey])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
