// Export individual components for better tree-shaking
import { Button, buttonVariants, type ButtonProps, type ButtonVariant, type ButtonSize } from '../components/Button';
import { Card, type CardProps, type CardVariant, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { Input, type InputProps } from '../components/Input';
import { Table, type TableProps } from '../components/Table';
import { Pagination, type PaginationProps } from '../components/Pagination';
import { Badge, badgeVariants, type BadgeProps } from '../components/Badge';
import { MultiSelect, type MultiSelectProps } from '../components/MultiSelect';
import { ConfirmDialog } from '../components/ConfirmDialog';

// Export all components and their variants
export {
  // Button
  Button,
  buttonVariants,
  // Card
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Input
  Input,
  // Table
  Table,
  // Pagination
  Pagination,
  // Badge
  Badge,
  badgeVariants,
  // MultiSelect
  MultiSelect,
  // ConfirmDialog
  ConfirmDialog,
};

// Re-export types
export type {
  // Button types
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  // Card types
  CardProps,
  CardVariant,
  // Input types
  InputProps,
  // Table types
  TableProps,
  // Pagination types
  PaginationProps,
  // Badge types
  BadgeProps,
  // MultiSelect types
  MultiSelectProps,
};

export default {
  // Button
  Button,
  buttonVariants,
  // Card
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Input
  Input,
  // Table
  Table,
  // Pagination
  Pagination,
  // Badge
  Badge,
  badgeVariants,
};
