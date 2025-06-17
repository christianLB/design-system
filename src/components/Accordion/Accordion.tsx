import React, { createContext, useContext, useState, forwardRef, HTMLAttributes, ReactNode } from 'react';

// --- Context ---
interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an <Accordion> component.');
  }
  return context;
};

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  disabled?: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItem must be used within an <AccordionItem> component.');
  }
  return context;
};


// --- Components ---
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string[]) => void;
  children: ReactNode;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({
    type = 'single',
    defaultValue,
    value: valueProp,
    onValueChange,
    children,
    className,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string[]>(
      (defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : [])
    );

    const isControlled = valueProp !== undefined;
    const value = isControlled ? (Array.isArray(valueProp) ? valueProp : [valueProp]) : internalValue;

    const handleValueChange = (newValue: string[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const contextValue: AccordionContextValue = {
      type,
      value,
      onValueChange: handleValueChange,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={`accordion ${className || ''}`} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';


export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, children, className, ...props }, ref) => {
    const { value: contextValue } = useAccordion();
    const isExpanded = contextValue.includes(value);

    const itemContextValue: AccordionItemContextValue = {
      value,
      isExpanded,
      disabled,
    };

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          className={[`accordion-item`, isExpanded && 'accordion-item--expanded', disabled && 'accordion-item--disabled', className].filter(Boolean).join(' ')}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';


export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { type, value: contextValue, onValueChange } = useAccordion();
    const { value: itemValue, isExpanded, disabled } = useAccordionItem();

    const handleClick = () => {
      if (disabled) return;

      let newValue: string[];
      if (type === 'single') {
        newValue = isExpanded ? [] : [itemValue];
      } else {
        newValue = isExpanded
          ? contextValue.filter((v) => v !== itemValue)
          : [...contextValue, itemValue];
      }
      onValueChange(newValue);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={`accordion-trigger ${className || ''}`}
        {...props}
      >
        {children}
        <span className="accordion-icon" aria-hidden="true">▼</span>
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';


export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => {
    const { isExpanded } = useAccordionItem();

    if (!isExpanded) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="region"
        className={`accordion-content ${className || ''}`}
        {...props}
      >
        <div className="accordion-content__inner">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
