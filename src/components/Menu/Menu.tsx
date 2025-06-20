import * as React from 'react';
import './menu.css';

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
      <div ref={ref} className={`menu ${className ?? ''}`} {...props}>
        <button
          onClick={toggle}
          className="menu__trigger"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {trigger}
        </button>
        {open && (
          <ul className={`menu__list menu__list--${align}`} role="menu">
            {items.map((item) => (
              <li key={item.value} role="menuitem">
                <button
                  className="menu__item"
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
