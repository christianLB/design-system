/**
 * ThemeSwitcher Component
 *
 * A dropdown/button group for switching between available themes
 * with optional preview and persistence.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Sun,
  Moon,
  Palette,
  Monitor,
  Sparkles,
  Skull,
  Leaf,
  Heart,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme, type Theme } from '../../theme/ThemeContext';

const themeSwitcherVariants = cva(
  'inline-flex items-center rounded-lg border border-border bg-card p-1 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const themeButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md transition-all cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 w-7 min-w-[28px]',
        md: 'h-8 w-8 min-w-[32px]',
        lg: 'h-10 w-10 min-w-[40px]',
      },
      active: {
        true: 'bg-primary text-primary-foreground shadow-sm',
        false: 'hover:bg-muted text-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      active: false,
    },
  },
);

export interface ThemeOption {
  value: Theme;
  label: string;
  icon: LucideIcon;
  description?: string;
}

const defaultThemeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun, description: 'Clean and bright' },
  { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
  { value: 'futuristic', label: 'Futuristic', icon: Sparkles, description: 'Sci-fi inspired' },
  { value: 'cyberpunk', label: 'Cyberpunk', icon: Skull, description: 'Neon and gritty' },
  { value: 'alien', label: 'Alien', icon: Leaf, description: 'Organic and mysterious' },
  { value: 'mirtha', label: 'Mirtha', icon: Heart, description: 'Warm and inviting' },
];

export interface ThemeSwitcherProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof themeSwitcherVariants> {
  /** Available theme options */
  options?: ThemeOption[];
  /** Show only icons (default) or include labels */
  showLabels?: boolean;
  /** Show system/auto option */
  showSystem?: boolean;
  /** Callback when theme changes */
  onChange?: (theme: Theme) => void;
  /** Show tooltip on hover */
  showTooltip?: boolean;
}

export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  (
    {
      options = defaultThemeOptions,
      size,
      showLabels = false,
      showSystem = false,
      onChange,
      showTooltip = true,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme);
      onChange?.(newTheme);
    };

    const allOptions = showSystem
      ? [
          { value: 'light' as Theme, label: 'System', icon: Monitor, description: 'Follow system' },
          ...options,
        ]
      : options;

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

    return (
      <div ref={ref} className={cn(themeSwitcherVariants({ size }), className)} {...props}>
        {allOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleThemeChange(option.value)}
              className={cn(themeButtonVariants({ size, active: isActive }))}
              title={
                showTooltip
                  ? `${option.label}${option.description ? ` - ${option.description}` : ''}`
                  : undefined
              }
              aria-label={`Switch to ${option.label} theme`}
              aria-pressed={isActive}
            >
              <Icon size={iconSize} />
              {showLabels && <span className="ml-1.5 text-sm font-medium">{option.label}</span>}
            </button>
          );
        })}
      </div>
    );
  },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';

export { themeSwitcherVariants, themeButtonVariants, defaultThemeOptions };
export default ThemeSwitcher;
