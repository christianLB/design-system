import '../index.css'; // Import the main CSS file for Vite to process

// Core exports
export * from './components';
export * from './hooks';
export * from './utils';

// Theme and styles
export * from './styles/themes';

// Types
export * from './types';

// Re-export types from components
export type { ButtonProps } from './components/Button/Button';
export type { CardProps } from './components/Card/Card';
export type { InputProps } from './components/Input/Input';
export type { TableProps } from './components/Table/Table';
export type { PaginationProps } from './components/Pagination/Pagination';
export type { BadgeProps } from './components/Badge/Badge';
export type { MultiSelectProps } from './components/MultiSelect';
export type { DatePickerProps } from './components/DatePicker';

// Theme Provider
export { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Design System Provider
export { DesignSystemProvider } from './components/DesignSystemProvider';
