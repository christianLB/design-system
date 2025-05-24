import React, { forwardRef } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import { cn } from '../../utils';

export interface MultiSelectOption {
  id: string | number;
  label: string;
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: MultiSelectOption[];
  initialValue?: Array<string | number>;
  placeholder?: string;
  onChange: (selectedIds: Array<string | number>) => void;
  className?: string;
  isDisabled?: boolean;
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(({ 
  options, 
  initialValue = [], 
  placeholder,
  onChange,
  className,
  isDisabled = false,
  ...props
}, ref) => {
  const selectedOptions = options.filter(opt => 
    (initialValue as Array<string | number>).includes(opt.id)
  ) as MultiSelectOption[];

  const handleChange = (selected: MultiValue<MultiSelectOption>) => {
    const selectedIds = selected ? selected.map(opt => {
      // Convert to number if the ID is a numeric string and the original ID was a number
      const originalOption = options.find(o => o.id.toString() === opt.id.toString());
      return originalOption ? originalOption.id : opt.id;
    }) : [];
    onChange(selectedIds);
  };

  // Customize styles to match our design system
  const customStyles: StylesConfig<MultiSelectOption, true> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--background)',
      borderColor: state.isFocused ? 'var(--ring)' : 'var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--ring)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--ring)' : 'var(--border)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--background)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--primary)' 
        : state.isFocused 
          ? 'var(--muted)' 
          : 'var(--background)',
      color: state.isSelected 
        ? 'var(--primary-foreground)' 
        : 'var(--foreground)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? 'var(--primary)' : 'var(--muted)',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--muted)',
      borderRadius: 'calc(var(--radius) - 2px)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--muted-foreground)',
      fontSize: '0.875rem',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--muted-foreground)',
      '&:hover': {
        backgroundColor: 'var(--destructive)',
        color: 'var(--destructive-foreground)',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--foreground)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--muted-foreground)',
    }),
  };

  return (
    <div ref={ref} data-testid="multiselect" className={cn(className)} {...props}>
      <Select
        isMulti
        options={options}
        classNamePrefix="react-select"
        getOptionValue={(option) => option.id.toString()}
        value={selectedOptions}
        placeholder={placeholder || "Select..."}
        onChange={handleChange}
        isDisabled={isDisabled}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--primary)',
            primary75: 'var(--primary-foreground)',
            primary50: 'var(--primary-foreground)',
            primary25: 'var(--primary-foreground)',
          },
        })}
      />
    </div>
  );
});

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
