import React, { forwardRef, useState } from 'react';
import { cn } from '../utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  className?: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, className, ...props }, ref) => {
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpanded = (index: number) => {
      setExpanded(expanded === index ? null : index);
    };

    return (
      <div 
        ref={ref} 
        className={cn('space-y-2', className)} 
        {...props}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              'border rounded-md',
              'border-border',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between px-4 py-2 cursor-pointer',
                'bg-muted hover:bg-muted/80 transition-colors',
                'text-muted-foreground',
                item.disabled && 'pointer-events-none'
              )}
              onClick={() => !item.disabled && toggleExpanded(index)}
            >
              <h3 className="text-base font-medium">{item.title}</h3>
              <ChevronDown 
                className={cn(
                  'w-4 h-4 transition-transform',
                  expanded === index && 'rotate-180'
                )} 
              />
            </div>
            {expanded === index && (
              <div className="p-4 bg-card text-card-foreground">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export { Accordion };