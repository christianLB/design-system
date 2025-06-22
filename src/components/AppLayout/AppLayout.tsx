import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Box } from '../Box/Box';
import { Stack } from '../Stack/Stack';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarInitiallyCollapsed?: boolean;
  stickyHeader?: boolean;
  children: React.ReactNode;
}

/**
 * Provides a basic application layout with optional navbar and sidebar.
 */
export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      navbar,
      sidebar,
      children,
      className,
      sidebarInitiallyCollapsed = false,
      stickyHeader = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isFuturistic = theme === 'futuristic';
    const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(
      sidebarInitiallyCollapsed,
    );

    const handleSidebarToggle = () => {
      setSidebarCollapsed(prev => !prev);
    };

    const sidebarWithProps =
      sidebar && React.isValidElement(sidebar)
        ? React.cloneElement(sidebar as React.ReactElement<SidebarProps>, {
            collapsed: isSidebarCollapsed,
            onToggle: handleSidebarToggle,
          })
        : sidebar;

    const navbarBoxStyles: React.CSSProperties = stickyHeader
      ? { position: 'sticky', top: 0, zIndex: 10 }
      : {};

    const layout = (
      <Stack
        ref={ref}
        direction="column"
        style={{ minHeight: '100vh' }}
        className={className}
        {...props}
      >
        {navbar && <Box style={navbarBoxStyles}>{navbar}</Box>}
        <Stack direction="row" style={{ flex: 1, overflow: 'hidden' }}>
          {sidebar && <Box>{sidebarWithProps}</Box>}
          <Box
            style={{ flex: 1, overflowY: 'auto', position: 'relative' }}
            p="md"
            role="main"
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    );

    if (isFuturistic) {
      return (
        <div className="futuristic-wrap">
          <div className="futuristic-bg" />
          {layout}
        </div>
      );
    }

    return layout;
  }
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;
