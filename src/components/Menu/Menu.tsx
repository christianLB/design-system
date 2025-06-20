import * as React from 'react';
import clsx from 'clsx';

export interface MenuItem {
  label: string;
  value: string;
}

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  trigger: React.ReactNode;
  items: MenuItem[];
  onItemSelect?: (value: string) => void;
  align?: 'left' | 'right';
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    { trigger, items, onItemSelect, align = 'left', className, ...props },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen((o) => !o);
    const handleSelect = (value: string) => {
      onItemSelect?.(value);
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        className={clsx('relative inline-block', className)}
        {...props}
      >
        <button
          onClick={toggle}
          className="bg-transparent border-none"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {trigger}
        </button>
        {open && (
          <ul
            className={clsx(
              'absolute mt-[var(--spacing-xs)] list-none p-[var(--spacing-xs)] bg-[var(--neutral100)] border border-[var(--neutral900)] z-20',
              align === 'right' ? 'right-0' : ''
            )}
            role="menu"
          >
            {items.map((item) => (
              <li key={item.value} role="menuitem">
                <button
                  className="block w-full text-left bg-transparent border-none px-[var(--spacing-md)] py-[var(--spacing-xs)] hover:bg-[var(--neutral900)] hover:text-[var(--primary-foreground)]"
                  onClick={() => handleSelect(item.value)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export { Menu };
