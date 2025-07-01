import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import { 
  SidebarItem as BaseSidebarItem,
  SidebarSection,
  SidebarBehavior,
  ResponsiveBreakpoint 
} from '../Navigation/types';

// Enhanced sidebar item with more options
export interface SidebarItem extends BaseSidebarItem {
  items?: SidebarItem[];
  badge?: string | number;
  tooltip?: string;
  divider?: boolean;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  // Core configuration
  variant?: 'navigation' | 'filter' | 'utility' | 'mini';
  position?: 'left' | 'right';
  behavior?: SidebarBehavior;
  
  // Content structure
  items?: SidebarItem[];
  sections?: SidebarSection[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  
  // Size and layout
  width?: number | string;
  collapsedWidth?: number | string;
  
  // State management
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  persistState?: boolean;
  onToggle?: (collapsed: boolean) => void;
  
  // Responsive
  hideOnMobile?: boolean;
  mobileBreakpoint?: ResponsiveBreakpoint;
  
  // Styling
  showToggleButton?: boolean;
  toggleButtonPosition?: 'top' | 'bottom';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  
  // Enhanced functionality
  searchable?: boolean;
  onSearch?: (query: string) => void;
  resizable?: boolean;
  
  // Legacy support
  /** @deprecated Use behavior prop instead */
  overlay?: boolean;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      // Core configuration
      variant = 'navigation',
      position = 'left',
      behavior = 'fixed',
      
      // Content
      items = [],
      sections = [],
      header,
      footer,
      
      // Size and layout
      width = '16rem',
      collapsedWidth = '3.5rem',
      
      // State
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      persistState = false,
      onToggle,
      
      // Responsive
      hideOnMobile = false,
      mobileBreakpoint = 'md',
      
      // Styling
      showToggleButton = true,
      toggleButtonPosition = 'top',
      elevation = 'sm',
      
      // Enhanced functionality
      searchable = false,
      onSearch,
      
      className,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const isFuturistic = theme === 'futuristic';
    
    // Internal collapsed state
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
    const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
    
    // Search state
    const [searchQuery, setSearchQuery] = React.useState('');
    
    // Handle toggle
    const handleToggle = React.useCallback(() => {
      const newCollapsed = !collapsed;
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newCollapsed);
      }
      onToggle?.(newCollapsed);
      
      // Persist state if needed
      if (persistState) {
        localStorage.setItem('sidebar-collapsed', String(newCollapsed));
      }
    }, [collapsed, controlledCollapsed, onToggle, persistState]);
    
    // Load persisted state
    React.useEffect(() => {
      if (persistState && controlledCollapsed === undefined) {
        const stored = localStorage.getItem('sidebar-collapsed');
        if (stored !== null) {
          setInternalCollapsed(stored === 'true');
        }
      }
    }, [persistState, controlledCollapsed]);
    
    // Handle search
    const handleSearch = React.useCallback((query: string) => {
      setSearchQuery(query);
      onSearch?.(query);
    }, [onSearch]);
    
    // Filter items based on search
    const filteredItems = React.useMemo(() => {
      if (!searchQuery) return items;
      
      return items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.items?.some(subItem => 
          subItem.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [items, searchQuery]);
    
    // Combine items and sections
    const allSections = React.useMemo(() => {
      const itemsSection = filteredItems.length > 0 ? [{ items: filteredItems }] : [];
      return [...itemsSection, ...sections];
    }, [filteredItems, sections]);
    
    // Variant-specific styles
    const getVariantStyles = () => {
      const base = {
        backgroundColor: isFuturistic ? 'transparent' : 'var(--background)',
        borderRight: position === 'left' ? '1px solid var(--border, #e4e4e7)' : 'none',
        borderLeft: position === 'right' ? '1px solid var(--border, #e4e4e7)' : 'none',
      };
      
      switch (variant) {
        case 'mini':
          return {
            ...base,
            padding: 'var(--spacing-xs)',
          };
        case 'filter':
          return {
            ...base,
            backgroundColor: 'var(--background-subtle)',
            padding: 'var(--spacing-sm)',
          };
        case 'utility':
          return {
            ...base,
            backgroundColor: 'var(--background-emphasis)',
            padding: 'var(--spacing-md)',
          };
        default:
          return {
            ...base,
            padding: 'var(--spacing-sm)',
          };
      }
    };
    
    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      height: behavior === 'fixed' ? '100vh' : 'auto',
      width: collapsed ? collapsedWidth : width,
      minWidth: collapsed ? collapsedWidth : width,
      maxWidth: collapsed ? collapsedWidth : width,
      overflowY: 'auto',
      transition: 'all 200ms ease-in-out',
      position: behavior === 'overlay' ? 'fixed' : 'relative',
      zIndex: behavior === 'overlay' ? 'var(--z-index-modal, 1300)' : 'auto',
      ...getVariantStyles(),
      ...(elevation !== 'none' && {
        boxShadow: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        }[elevation],
      }),
    };
    
    // Render a sidebar item
    const renderItem = (item: SidebarItem, isSubItem = false) => {
      const itemContent = (
        <Stack direction="row" align="center" gap="sm" style={{ width: '100%' }}>
          {item.icon && !isSubItem && (
            <Box style={{ 
              minWidth: '1.25rem',
              display: 'flex',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}>
              {item.icon}
            </Box>
          )}
          {(!collapsed || isSubItem) && (
            <>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <Box
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    lineHeight: 1,
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </>
          )}
        </Stack>
      );
      
      const linkProps = {
        href: item.href,
        className: clsx(
          'sidebar-item',
          isSubItem && 'sidebar-item--sub',
          item.active && 'sidebar-item--active',
          item.disabled && 'sidebar-item--disabled'
        ),
        style: {
          display: 'flex',
          alignItems: 'center',
          padding: isSubItem 
            ? 'var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) var(--spacing-xl)'
            : 'var(--spacing-sm)',
          borderRadius: 'var(--radius)',
          transition: 'all 150ms ease-in-out',
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
          ...(item.disabled && {
            opacity: 0.6,
            pointerEvents: 'none' as const,
          }),
        },
        title: collapsed && !isSubItem ? item.label : item.tooltip,
      };
      
      return (
        <Link key={item.href} {...linkProps} variant={isSubItem ? 'subtle' : 'nav'}>
          {itemContent}
        </Link>
      );
    };
    
    // Render a section
    const renderSection = (section: SidebarSection, index: number) => {
      const [isExpanded, setIsExpanded] = React.useState(section.defaultExpanded ?? true);
      
      return (
        <Box key={index} style={{ marginBottom: 'var(--spacing-md)' }}>
          {section.title && !collapsed && (
            <Box
              style={{
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--foreground-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{section.title}</span>
              {section.collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ padding: '0.25rem' }}
                >
                  <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size="sm" />
                </Button>
              )}
            </Box>
          )}
          
          {(!section.collapsible || isExpanded) && (
            <Stack direction="column" gap="xs">
              {section.items.map((item) => (
                <Box key={item.href}>
                  {renderItem(item)}
                  {item.items && !collapsed && (
                    <Box style={{ marginTop: 'var(--spacing-xs)' }}>
                      <Stack direction="column" gap="xs">
                        {item.items.map((subItem) => renderItem(subItem, true))}
                      </Stack>
                    </Box>
                  )}
                  {item.divider && <hr style={{ margin: 'var(--spacing-sm) 0', border: 'none', borderTop: '1px solid var(--border)' }} />}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      );
    };
    
    return (
      <aside
        ref={ref}
        className={clsx(
          'sidebar',
          `sidebar--${variant}`,
          `sidebar--${position}`,
          `sidebar--${behavior}`,
          collapsed && 'sidebar--collapsed',
          hideOnMobile && `${mobileBreakpoint}:hidden`,
          className
        )}
        style={containerStyles}
        data-collapsed={collapsed}
        {...props}
      >
        {/* Header */}
        {header && (
          <Box style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--border)' }}>
            {header}
          </Box>
        )}
        
        {/* Toggle Button */}
        {showToggleButton && toggleButtonPosition === 'top' && (
          <Box style={{ 
            padding: 'var(--spacing-sm)', 
            display: 'flex', 
            justifyContent: collapsed ? 'center' : 'flex-end' 
          }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{ padding: '0.5rem' }}
            >
              <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size="sm" />
            </Button>
          </Box>
        )}
        
        {/* Search */}
        {searchable && !collapsed && (
          <Box style={{ padding: '0 var(--spacing-sm) var(--spacing-sm)' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--background)',
              }}
            />
          </Box>
        )}
        
        {/* Content */}
        <Box style={{ flex: 1, padding: '0 var(--spacing-xs)', overflowY: 'auto' }}>
          {allSections.map((section, index) => renderSection(section, index))}
        </Box>
        
        {/* Toggle Button Bottom */}
        {showToggleButton && toggleButtonPosition === 'bottom' && (
          <Box style={{ 
            padding: 'var(--spacing-sm)', 
            display: 'flex', 
            justifyContent: collapsed ? 'center' : 'flex-end',
            borderTop: '1px solid var(--border)'
          }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{ padding: '0.5rem' }}
            >
              <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size="sm" />
            </Button>
          </Box>
        )}
        
        {/* Footer */}
        {footer && (
          <Box style={{ 
            padding: 'var(--spacing-md)', 
            borderTop: '1px solid var(--border)',
            marginTop: 'auto'
          }}>
            {footer}
          </Box>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
