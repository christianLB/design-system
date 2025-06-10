import * as React from 'react';
import { cn } from '../../utils';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * The position of the tooltip relative to its trigger
   * @default 'top'
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * The visual style of the tooltip
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * Delay in milliseconds before the tooltip appears
   * @default 0
   */
  delay?: number;
  /**
   * Whether the tooltip is manually controlled
   */
  isOpen?: boolean;
  /**
   * Additional class name for the tooltip
   */
  className?: string;
  /**
   * Whether to show an arrow pointing to the trigger element
   * @default true
   */
  showArrow?: boolean;
  /**
   * The maximum width of the tooltip
   * @default '240px'
   */
  maxWidth?: string | number;
}

/**
 * A customizable tooltip component that displays additional information when hovering over an element.
 * 
 * @component
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({
    children,
    content,
    position = 'top',
    variant = 'default',
    delay = 0,
    isOpen: controlledOpen,
    className,
    showArrow = true,
    maxWidth = '240px',
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const isControlled = controlledOpen !== undefined;
    const show = isControlled ? controlledOpen : isVisible;

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    };

    const arrowClasses = {
      top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
      right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45',
      bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
      left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 -rotate-45',
    };

    const variantClasses = {
      default: 'bg-popover text-popover-foreground border border-border',
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      danger: 'bg-destructive text-destructive-foreground',
    };

    const handleMouseEnter = () => {
      if (isControlled) return;
      
      if (delay) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (isControlled) return;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div 
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          if (!isControlled) {
            e.stopPropagation();
            setIsVisible(prev => !prev);
          }
        }}
        {...props}
      >
        {children}
        
        {show && (
          <div 
            className={cn(
              'absolute z-50 rounded-md px-3 py-1.5 text-sm shadow-md',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              positionClasses[position],
              variantClasses[variant],
              className
            )}
            style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
          >
            {content}
            {showArrow && (
              <div 
                className={cn(
                  'absolute w-2 h-2',
                  arrowClasses[position],
                  variantClasses[variant]
                )}
                style={{
                  width: '8px',
                  height: '8px',
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
