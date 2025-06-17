import React, { useState, useRef, useEffect, ReactNode } from 'react';

// Custom hook to detect clicks outside a component
function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export interface PopoverProps {
  /** The element that triggers the popover */
  trigger: ReactNode;
  /** The content to display inside the popover */
  children: ReactNode;
  /** Additional class names for the popover container */
  className?: string;
  /** Popover alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether the popover is initially open */
  isOpen?: boolean;
}

const Popover = ({ 
  trigger, 
  children, 
  className, 
  align = 'center',
  isOpen: initialIsOpen = false 
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popoverRef, () => setIsOpen(false));

  const getAlignmentClass = () => {
    switch (align) {
      case 'left':
        return 'popover-content--align-left';
      case 'right':
        return 'popover-content--align-right';
      case 'center':
      default:
        return 'popover-content--align-center';
    }
  };

  return (
    <div ref={popoverRef} className={`popover-container ${className || ''}`}>
      <div className="popover-trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`popover-content ${getAlignmentClass()}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export { Popover };
