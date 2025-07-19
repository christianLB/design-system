import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
// import { useMicroInteraction } from '../../hooks'; // Using optimized framer-motion animations
import clsx from 'clsx';
import { Stack } from '../Stack/Stack';
import { Icon, IconName, IconSize } from '../Icon/Icon';

// The component uses whileFocus prop via object spread instead of a type definition

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'outline'
  | 'link'
  | 'cyberpunk-matrix'
  | 'cyberpunk-doom'
  | 'cyberpunk-ghost'
  | 'cyberpunk-neon'
  | 'membrane'
  | 'vessel'
  | 'neural';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Use HTMLMotionProps as the base type for our Button
export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  /** React ref to the HTML button element */
  ref?: React.Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Adds a subtle glow effect, great for futuristic themes */
  glow?: boolean;
  /** Makes the button look like it's elevated from the surface */
  elevated?: boolean;
  /** Adds cyberpunk scanline effects */
  scanlines?: boolean;
  /** Adds Matrix-style digital rain effect */
  matrixRain?: boolean;
  /** Cyberpunk glow intensity */
  cyberpunkGlow?: 'subtle' | 'normal' | 'intense';
  /** Adds pulsing/breathing effects for alien theme variants */
  vital?: boolean;
  /** Adds neural pathway effects for alien theme variants */
  atmospheric?: boolean;
  /** Icon to display before button content */
  iconStart?: IconName;
  /** Icon to display after button content */
  iconEnd?: IconName;
  /** Size for any icons */
  iconSize?: IconSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled,
      className,
      children,
      fullWidth = false,
      glow = false,
      elevated = false,
      scanlines = false,
      matrixRain = false,
      cyberpunkGlow,
      vital = false,
      atmospheric = false,
      iconStart,
      iconEnd,
      iconSize,
      // Extract motion props from base props
      whileHover,
      whileTap,
      whileFocus,
      transition,
      ...props
    },
    ref
  ) => {
    // const micro = useMicroInteraction('button'); // Using optimized framer-motion animations instead
    // Calculate icon size based on button size if not explicitly provided
    const calculatedIconSize: IconSize =
      iconSize || (size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm');

    // Build the CSS class names based on component props
    const classes = clsx(
      'btn', // Base button class that all buttons share
      // Variant classes
      `button--${variant}`, // E.g., button--primary, button--secondary, etc.
      // Size classes
      `button--${size}`, // E.g., button--sm, button--md, button--lg
      // State and modifier classes
      disabled && 'button--disabled',
      fullWidth && 'button--full-width',
      elevated && 'button--elevated',
      glow && 'button--glow',
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      // Alien theme modifier classes
      atmospheric && 'atmospheric-interactive neural-pathways',
      vital && 'vital-element active',
      // Specific alien variant classes
      variant === 'membrane' && [
        'atmospheric-membrane atmospheric-border-vessel atmospheric-depth-membrane',
        vital && 'atmospheric-breathe'
      ],
      variant === 'vessel' && [
        'atmospheric-vessel atmospheric-border-organ atmospheric-depth-organ atmospheric-vessel-pulse',
        vital && 'atmospheric-pulse'
      ],
      variant === 'neural' && [
        'atmospheric-neural-grid atmospheric-border-cell atmospheric-neural-shadow',
        vital && 'atmospheric-neural'
      ],
      // Custom class name passed as prop
      className
    );

    // Check if we need to show content wrapper
    const hasContent = React.Children.count(children) > 0;

    return (
      <motion.button
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        whileHover={disabled ? undefined : whileHover || {
          scale: 1.02,
          y: -1,
          transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] }
        }}
        whileTap={disabled ? undefined : whileTap || {
          scale: 0.98,
          y: 0,
          transition: { duration: 0.08, ease: [0.16, 1, 0.3, 1] }
        }}
        {...{ whileFocus: disabled ? undefined : whileFocus || {
          scale: 1.01,
          y: -0.5,
          transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
        }}}
        transition={transition || {
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }}
        disabled={disabled}
        {...props}
      >
        <Stack
          direction="row"
          align="center"
          justify="center"
          gap={size}
          className="w-full h-full"
        >
          {iconStart && (
            <Icon
              name={iconStart}
              size={calculatedIconSize}
              className="flex-shrink-0"
              aria-hidden={true}
            />
          )}

          {hasContent && (
            <span className="flex-1 text-center whitespace-nowrap">
              {/* Ensure we're only rendering valid React children */}
              {React.isValidElement(children) || typeof children === 'string' || typeof children === 'number' ? children : null}
            </span>
          )}

          {iconEnd && (
            <Icon
              name={iconEnd}
              size={calculatedIconSize}
              className="flex-shrink-0"
              aria-hidden={true}
            />
          )}
        </Stack>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Cast to ButtonProps to avoid framer-motion specific prop type issues
const ButtonWithProperTypes = Button as React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export default ButtonWithProperTypes;

// Helper component for backward compatibility with existing code
export const ButtonWithIconBackwardCompatibility = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => {
  // Ensure we're working with valid React children
  const safeChildren = children as React.ReactNode;

  // If the Button has children that include an Icon, extract it as iconStart
  const childrenArray = React.Children.toArray(safeChildren);

  // Look for Icon in the children
  const iconElement = childrenArray.find(
    (child) =>
      React.isValidElement(child) &&
      ((child.type as { displayName?: string })?.displayName === 'Icon' ||
        (child.type as { name?: string })?.name === 'Icon')
  );

  // If we found an Icon and no iconStart/iconEnd was explicitly specified
  if (
    iconElement &&
    React.isValidElement(iconElement) &&
    !props.iconStart &&
    !props.iconEnd
  ) {
    // Remove the icon from children
    const textContent = childrenArray
      .filter((child) => child !== iconElement)
      .map((child) =>
        typeof child === 'string' ? <span key={child}>{child}</span> : child
      ) as React.ReactNode[];

    // Get the icon name from props - this should be a valid IconName
    const iconName = (iconElement.props as { name?: IconName }).name;

    if (iconName) {
      // Return a Button with iconStart
      return (
        <Button ref={ref} iconStart={iconName} {...props}>
          {textContent}
        </Button>
      );
    }
  }

  // Otherwise just render normally
  // Use explicit type casting to avoid MotionValue issues
  return (
    <Button ref={ref} {...props}>
      {safeChildren as React.ReactNode}
    </Button>
  );
});

ButtonWithIconBackwardCompatibility.displayName =
  'ButtonWithIconBackwardCompatibility';
