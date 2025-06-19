import React from 'react';

export interface FieldGroupProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend: string;
  direction?: 'column' | 'row';
  children: React.ReactNode;
}

const FieldGroup = ({
  legend,
  direction = 'column',
  children,
  className,
  ...props
}: FieldGroupProps) => {
  const classes = ['field-group', `field-group--${direction}`, className || '']
    .filter(Boolean)
    .join(' ');
  return (
    <fieldset className={classes} {...props}>
      <legend className="field-group__legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export { FieldGroup };
