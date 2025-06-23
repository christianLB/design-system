import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@/components/Box';
import { Stack } from '@/components/Stack';
import { Button } from '@/components/Button';

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
      <Box
        ref={ref}
        className={clsx('relative inline-block', className)}
        {...props}
      >
        <Button
          variant="ghost"
          onClick={toggle}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {trigger}
        </Button>
        {open && (
          <div
            className={clsx(
              'absolute mt-2 list-none rounded-md shadow-lg z-20',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            role="menu"
          >
            <Box p="xs" bg="background">
              <Stack direction="column" gap="xs">
                {items.map((item) => (
                  <div key={item.value} role="menuitem">
                    <Button
                      variant="ghost"
                      onClick={() => handleSelect(item.value)}
                      className="justify-start w-full text-left"
                    >
                      {item.label}
                    </Button>
                  </div>
                ))}
              </Stack>
            </Box>
          </div>
        )}
      </Box>
    );
  }
);

Menu.displayName = 'Menu';

export { Menu };
