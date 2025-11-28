/**
 * Class name merging utility
 *
 * Combines clsx for conditional classes with tailwind-merge
 * for intelligent Tailwind class deduplication.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
