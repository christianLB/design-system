import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './sidebar.css';

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
          'sidebar',
          collapsed && 'sidebar--collapsed',
          className
        )}
        animate={{ width: collapsed ? '3rem' : '16rem' }}
        {...props}
      >
        {header && <div className="sidebar__header">{header}</div>}
        <button
          className="sidebar__toggle"
          onClick={handleToggle}
          aria-label="Toggle"
        />
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {items.map((item) => (
              <li key={item.href} className="sidebar__item">
                <a href={item.href} className="sidebar__link">
                  {item.label}
                </a>
                {item.items && (
                  <ul className="sidebar__sublist">
                    {item.items.map((sub) => (
                      <li key={sub.href} className="sidebar__subitem">
                        <a href={sub.href} className="sidebar__link">
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
        {footer && <div className="sidebar__footer">{footer}</div>}
      </motion.aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
