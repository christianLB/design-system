import React from 'react';
import { Skeleton } from '../Skeleton';

export interface SkeletonRowProps {
  columns: number;
}

export const SkeletonRow = ({ columns }: SkeletonRowProps) => (
  <tr>
    {Array.from({ length: columns }).map((_, i) => (
      <td
        key={i}
        className="border border-[var(--border)] px-[var(--spacing-md)] py-[var(--spacing-sm)]"
      >
        <Skeleton height="1rem" className="w-full" />
      </td>
    ))}
  </tr>
);
