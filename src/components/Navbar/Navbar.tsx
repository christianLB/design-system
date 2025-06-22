import * as React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  sticky?: boolean;
  position?: 'top' | 'bottom';
  background?: 'light' | 'dark';
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      items,
      logo,
      cta,
      sticky,
      position = 'top',
      background = 'light',
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen((o) => !o);

    return (
      <nav
        ref={ref}
        className={clsx(
          'flex w-full px-[var(--spacing-md)] py-[var(--spacing-sm)]',
          background === 'dark'
            ? 'bg-[var(--neutral900)] text-[var(--primary-foreground)]'
            : 'bg-[var(--neutral100)]',
          sticky && 'sticky top-0 z-10',
          position === 'bottom' && 'top-auto bottom-0',
          className,
        )}
        {...props}
      >
        <div className="flex items-center w-full">
          {logo && <div className="mr-[var(--spacing-md)]">{logo}</div>}
          <button
            className="mr-[var(--spacing-md)] bg-transparent border-none md:hidden"
            onClick={toggle}
            aria-label="Menu"
          >
            ☰
          </button>
          <ul
            className={clsx(
              'list-none m-0 p-0 gap-[var(--spacing-md)]',
              open ? 'flex flex-col' : 'hidden', // Mobile behavior
              'md:flex md:flex-row md:items-center' // Desktop override
            )}
          >
            {items.map((item) => (
              <li key={item.href}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  className="no-underline text-inherit"
                  href={item.href}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
          {cta && <div className="ml-auto hidden md:block">{cta}</div>}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
