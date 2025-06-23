import * as React from 'react';
import clsx from 'clsx';
import { Stack } from '@/components/Stack';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  /**
   * Layout direction for navigation items
   * - 'row': horizontal layout (default)
   * - 'stack': vertical layout
   */
  layout?: 'row' | 'stack';
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ items, logo, cta, layout = 'row', className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Create navigation links
    const navItems = items.map((item) => (
      <Link key={item.href} href={item.href} variant="nav">
        {item.label}
      </Link>
    ));

    return (
      <nav ref={ref} className={clsx('w-full p-md', className)} {...props}>
        {/* Mobile Header */}
        <Stack
          direction="row"
          align="center"
          justify="between"
          className="md:hidden w-full"
        >
          {logo && <Box>{logo}</Box>}
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <Icon name={isOpen ? 'X' : 'Menu'} />
          </Button>
        </Stack>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          align="center"
          justify="between"
          className="hidden md:flex w-full"
        >
          {logo && <Box className="mr-lg">{logo}</Box>}

          {/* Layout-aware navigation items - Row or Stack */}
          <Stack
            direction={layout === 'row' ? 'row' : 'column'}
            align={layout === 'row' ? 'center' : 'start'}
            gap="md"
            className="flex-grow flex justify-center"
          >
            {navItems}
          </Stack>

          {cta && <Box>{cta}</Box>}
        </Stack>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <Box className="mt-md md:hidden">
            <Stack direction="column" align="center" gap="md">
              {navItems}
              {cta && <Box className="mt-md">{cta}</Box>}
            </Stack>
          </Box>
        )}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
