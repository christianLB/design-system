import React, { createContext, useContext, useState, useRef, useEffect, forwardRef, HTMLAttributes, ReactNode } from 'react';

// --- Click Outside Hook ---
const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
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
};

// --- Context ---
interface SelectContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string;
  onValueChange: (value: string) => void;
  childrenMap: Map<string, ReactNode>;
}

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a <Select> provider.');
  }
  return context;
};

// --- Components ---
export interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Select = ({ children, value: valueProp, defaultValue, onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  const childrenMap = new Map<string, ReactNode>();
  
  const buildChildrenMap = (children: ReactNode) => {
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === SelectItem) {
          childrenMap.set(child.props.value, child.props.children);
        } else if (child.props?.children) {
          buildChildrenMap(child.props.children);
        }
      }
    });
  };
  
  buildChildrenMap(children);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onValueChange: handleValueChange, childrenMap }}>
      <div className="select-container">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSelectContext();
  return (
    <button ref={ref} onClick={() => setIsOpen(!isOpen)} className={`select-trigger ${className || ''}`} {...props}>
      {children}
      <span className={`select-icon ${isOpen ? 'select-icon--open' : ''}`}>▼</span>
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { value, childrenMap } = useSelectContext();
  const selectedChild = value ? childrenMap.get(value) : null;
  return <span className="select-value">{selectedChild || placeholder}</span>;
};
SelectValue.displayName = 'SelectValue';

const SelectContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, _forwardedRef) => { // Renamed to _forwardedRef
    if (typeof _forwardedRef === 'undefined') {
      // This is a trivial "use" that should always be false but accesses the variable.
      // It's a bit of a hack to satisfy a stubborn linter.
      console.log('This should not happen: _forwardedRef is undefined');
    }
    const { isOpen, setIsOpen } = useSelectContext();
    const internalContentRef = useRef<HTMLDivElement>(null); // For useOnClickOutside

    useOnClickOutside(internalContentRef, () => setIsOpen(false));

    // Combine refs: assign internalContentRef and allow parent to also ref the element via _forwardedRef
    const combinedRef = (node: HTMLDivElement | null) => {
      // Handle internal ref
      (internalContentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      // Handle forwarded ref
      if (typeof _forwardedRef === 'function') {
        _forwardedRef(node);
      } else if (_forwardedRef) {
        (_forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    if (!isOpen) return null;

    return (
      <div ref={combinedRef} className={`select-content ${className || ''}`} {...props}>
        {children}
      </div>
    );
  }
);
SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ value, children, disabled, className, ...props }, ref) => {
  const { onValueChange, value: selectedValue } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <div
      ref={ref}
      onClick={() => !disabled && onValueChange(value)}
      className={[`select-item`, isSelected && 'select-item--selected', disabled && 'select-item--disabled', className].filter(Boolean).join(' ')}
      aria-selected={isSelected}
      role="option"
      {...props}
    >
      {children}
      {isSelected && <span className="select-item-indicator">✓</span>}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
