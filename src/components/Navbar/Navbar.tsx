import * as React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './navbar.css';

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
          'navbar',
          `navbar--${background}`,
          sticky && 'navbar--sticky',
          `navbar--${position}`,
          className
        )}
        {...props}
      >
        <div className="navbar__inner">
          {logo && <div className="navbar__logo">{logo}</div>}
          <button className="navbar__toggle" onClick={toggle} aria-label="Menu">
            ☰
          </button>
          <ul className={clsx('navbar__list', open && 'navbar__list--open')}>
            {items.map((item) => (
              <li key={item.href} className="navbar__item">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  className="navbar__link"
                  href={item.href}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
          {cta && <div className="navbar__cta">{cta}</div>}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
