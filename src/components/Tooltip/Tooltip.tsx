import React, { useState, useRef, useEffect, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  delay?: number;
  isOpen?: boolean;
  showArrow?: boolean;
  maxWidth?: string | number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
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
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const isControlled = controlledOpen !== undefined;
    const show = isControlled ? controlledOpen : isVisible;

    const handleMouseEnter = () => {
      if (isControlled) return;
      if (delay) {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
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

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const tooltipClasses = [
      'tooltip',
      `tooltip--position-${position}`,
      `tooltip--variant-${variant}`,
      show ? 'tooltip--visible' : 'tooltip--hidden',
      className || ''
    ].filter(Boolean).join(' ');

    const arrowClasses = [
        'tooltip-arrow',
        `tooltip-arrow--position-${position}`,
        `tooltip-arrow--variant-${variant}`,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className="tooltip-trigger-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <motion.div
          className={tooltipClasses}
          style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        >
          {content}
          {showArrow && <div className={arrowClasses} />}
        </motion.div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
