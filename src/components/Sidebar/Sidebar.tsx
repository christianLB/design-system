import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

export interface SidebarItem {
  label: string;
  href: string;
  items?: SidebarItem[];
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
      const linkClasses = isFuturistic
        ? clsx(
            'block w-full text-left no-underline rounded-md transition-colors duration-200',
            isSubItem ? 'px-2 py-1 text-sm' : 'px-3 py-2',
            'text-p-200 hover:bg-p-500/10 hover:text-p-100',
            collapsed && !isSubItem && 'whitespace-nowrap'
          )
        : clsx('no-underline text-inherit', isSubItem && 'text-sm');

      if (isFuturistic) {
        return (
          <motion.a href={item.href} whileHover={{ x: 4 }} className={linkClasses}>
            {item.label}
          </motion.a>
        );
      }
      return <a href={item.href} className={linkClasses}>{item.label}</a>;
    };

    return (
      <motion.aside
        ref={ref}
        data-collapsed={collapsed}
        className={clsx(
          'flex flex-col h-screen overflow-y-auto',
          isFuturistic ? 'bg-transparent' : 'bg-[var(--neutral100)]',
          className
        )}
        animate={{ width: collapsed ? '3rem' : '16rem' }}
        {...props}
      >
        {header && <div className="p-[var(--spacing-md)]">{header}</div>}
        <button
          className="self-end m-[var(--spacing-sm)] bg-transparent border-none"
          onClick={handleToggle}
          aria-label="Toggle"
        />
        <nav className="flex-grow p-2">
          <ul className="list-none m-0 p-0 space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                {renderLink(item)}
                {item.items && !collapsed && (
                  <ul className="list-none m-0 p-0 pl-[var(--spacing-md)] mt-1 space-y-1">
                    {item.items.map((sub) => (
                      <li key={sub.href}>{renderLink(sub, true)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {footer && <div className="mt-auto p-[var(--spacing-md)]">{footer}</div>}
      </motion.aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
