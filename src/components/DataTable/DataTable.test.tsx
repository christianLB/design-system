import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';
import type { ColumnDef } from '@tanstack/react-table';

interface Row {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Name' }];

const data: Row[] = [{ id: 1, name: 'Alice' }];

describe('DataTable', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(<DataTable columns={columns} data={data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders rows based on provided data', () => {
    const { getByText } = render(<DataTable columns={columns} data={data} />);
    expect(getByText('Alice')).toBeInTheDocument();
  });
});
