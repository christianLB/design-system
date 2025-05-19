import React from 'react';
import Badge from '../../components/Badge';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function BadgeDemo() {
  const variants = [
    'default',
    'primary',
    'secondary',
    'success',
    'error',
  ] as const;

  return (
    <ComponentShowcase
      title="Badge"
      description="Displays a badge or a component that looks like a badge."
    >
      <ComponentVariant title="Variants">
        <div className="flex flex-wrap gap-2 items-center">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>
          ))}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Icons">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="default" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Info
          </Badge>
          <Badge variant="primary" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Success
          </Badge>
          <Badge variant="error" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Error
          </Badge>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Counters">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <Badge variant="error" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              3
            </Badge>
          </div>

          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <Badge variant="primary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              5
            </Badge>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
