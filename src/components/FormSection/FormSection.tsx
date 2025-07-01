import * as React from 'react';
import clsx from 'clsx';
import { Box } from '../Box/Box';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text';

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  className?: string;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ 
    title,
    description,
    children,
    variant = 'bordered',
    className,
    ...props 
  }, ref) => {
    
    const variantStyles = {
      default: '',
      bordered: 'border border-[var(--border)] bg-[var(--muted)] rounded-lg',
      elevated: 'border border-[var(--border)] bg-[var(--background)] rounded-lg shadow-sm'
    };

    return (
      <Box
        ref={ref}
        className={clsx(
          'p-4',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <Stack gap="md">
          {/* Header */}
          {(title || description) && (
            <Stack gap="xs">
              {title && (
                <Text size="sm" className="font-medium">
                  {title}
                </Text>
              )}
              {description && (
                <Text size="xs" color="subtle">
                  {description}
                </Text>
              )}
            </Stack>
          )}
          
          {/* Content */}
          <div>
            {children}
          </div>
        </Stack>
      </Box>
    );
  }
);

FormSection.displayName = 'FormSection';

export { FormSection };
export default FormSection;