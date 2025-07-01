import { Spacing } from '../Box/Box';

// Base types for navigation components
export type SpacingToken = Spacing;

export type NavigationVariant = 'default' | 'minimal' | 'corporate' | 'dashboard' | 'marketing';

export type LayoutVariant = 'default' | 'dashboard' | 'sidebar-fixed' | 'no-scroll';

export type HeaderBehavior = 'static' | 'sticky' | 'floating' | 'hidden';

export type SidebarBehavior = 'overlay' | 'push' | 'fixed' | 'collapsible';

export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

// Layout configuration for responsive behavior
export interface LayoutConfig {
  headerBehavior?: HeaderBehavior;
  sidebarBehavior?: SidebarBehavior;
  contentPadding?: SpacingToken | 'none';
  enableVerticalScroll?: boolean;
  enableHorizontalScroll?: boolean;
}

// Responsive breakpoint configuration
export interface ResponsiveConfig {
  mobile?: LayoutConfig;
  tablet?: LayoutConfig;
  desktop?: LayoutConfig;
}

// Navigation item structure
export interface BaseNavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

export interface NavigationItem extends BaseNavigationItem {
  items?: NavigationItem[];
}

// Sidebar specific types
export interface SidebarItem extends BaseNavigationItem {
  items?: SidebarItem[];
  badge?: string | number;
  divider?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

// Tab types
export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

// Mega menu types
export interface MegaMenuSection {
  title?: string;
  items: NavigationItem[];
  featured?: boolean;
}

// Common props for all navigation components
export interface BaseNavigationProps {
  variant?: NavigationVariant;
  className?: string;
  children?: React.ReactNode;
}

// Theme integration
export interface NavigationThemeConfig {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'none' | 'bottom' | 'top' | 'all';
  backdrop?: 'none' | 'blur' | 'solid';
  shadow?: boolean;
}