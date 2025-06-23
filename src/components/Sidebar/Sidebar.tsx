import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';

export interface SidebarItem {
  label: string;
  href: string;
  items?: SidebarItem[];
  icon?: React.ReactNode;
}

export interface SidebarProps extends HTMLMotionProps<'aside'> {
  items: SidebarItem[];
  collapsed?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    { items, collapsed = false, header, footer, onToggle, className, ...props },
    ref
  ) => {
    const { theme } = useTheme();
    const isFuturistic = theme === 'futuristic';
    const handleToggle = () => onToggle?.(!collapsed);

    const renderLink = (item: SidebarItem, isSubItem = false) => {
      const linkContent = (
        <Stack 
          direction="row" 
          align="center" 
          gap="sm"
        >
          {item.icon && !isSubItem && (
            <Box className={collapsed ? 'mx-auto' : ''}>{item.icon}</Box>
          )}
          {(!collapsed || isSubItem) && <span>{item.label}</span>}
        </Stack>
      );

      // Use the design system Link component with proper variant
      if (isFuturistic) {
        return (
          <motion.div whileHover={{ x: 4 }}>
            <Link 
              href={item.href} 
              variant="nav" 
              className={clsx(
                isSubItem ? 'text-sm pl-6' : '',
                collapsed && !isSubItem && 'whitespace-nowrap'
              )}
              fullWidth
            >
              {linkContent}
            </Link>
          </motion.div>
        );
      }
      
      return (
        <Link 
          href={item.href} 
          variant={isSubItem ? 'subtle' : 'nav'}
          className={clsx(isSubItem ? 'text-sm pl-6' : '')}
          fullWidth
        >
          {linkContent}
        </Link>
      );
    };

    return (
      <motion.aside
        ref={ref}
        data-collapsed={collapsed}
        className={clsx(
          'flex flex-col h-screen overflow-y-auto',
          isFuturistic ? 'bg-transparent' : 'bg-background',
          className
        )}
        animate={{ width: collapsed ? '3rem' : '16rem' }}
        {...props}
      >
        {header && <Box p="md">{header}</Box>}
        
        <Button
          variant="ghost"
          className="self-end m-2"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        />
        
        <Box className="flex-grow">
          <Stack direction="column" gap="xs">
            {items.map((item) => (
              <div key={item.href}>
                {renderLink(item)}
                
                {item.items && !collapsed && (
                  <Box m="sm" style={{ marginTop: '4px' }}>
                    <Stack direction="column" gap="xs">
                      {item.items.map((sub) => (
                        <div key={sub.href}>
                          {renderLink(sub, true)}
                        </div>
                      ))}
                    </Stack>
                  </Box>
                )}
              </div>
            ))}
          </Stack>
        </Box>
        
        {footer && <Box p="md" className="mt-auto">{footer}</Box>}
      </motion.aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
