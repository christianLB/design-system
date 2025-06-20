import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

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
    const handleToggle = () => onToggle?.(!collapsed);

    return (
      <motion.aside
        ref={ref}
        className={clsx(
          'flex flex-col h-screen overflow-y-auto bg-[var(--neutral100)]',
          className,
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
        <nav>
          <ul className="list-none m-0 p-0">
            {items.map((item) => (
              <li key={item.href} className="p-[var(--spacing-sm)] px-[var(--spacing-md)]">
                <a
                  href={item.href}
                  className={clsx('no-underline text-inherit', collapsed && 'whitespace-nowrap')}
                >
                  {item.label}
                </a>
                {item.items && (
                  <ul className="list-none m-0 p-0 pl-[var(--spacing-lg)]">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <a href={sub.href} className="no-underline text-inherit">
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {footer && <div className="p-[var(--spacing-md)]">{footer}</div>}
      </motion.aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
