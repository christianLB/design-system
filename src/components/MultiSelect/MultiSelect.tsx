import React, { forwardRef, useState, useEffect } from 'react';
import { Checkbox } from '../Checkbox/Checkbox'; // Assuming Checkbox is in a sibling directory

export interface MultiSelectOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedIds?: Array<string | number>;
  onChange: (selectedIds: Array<string | number>) => void;
  className?: string;
  disabled?: boolean; // Top-level disable for the whole group
  label?: string; // Optional label for the group
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>((
  { 
    options, 
    selectedIds = [], 
    onChange, 
    className, 
    disabled = false,
    label,
    ...props 
  },
  ref
) => {
  const [currentSelectedIds, setCurrentSelectedIds] = useState(selectedIds);

  useEffect(() => {
    setCurrentSelectedIds(selectedIds);
  }, [selectedIds]);

  const handleCheckboxChange = (optionId: string | number) => {
    const newSelectedIds = currentSelectedIds.includes(optionId)
      ? currentSelectedIds.filter(id => id !== optionId)
      : [...currentSelectedIds, optionId];
    
    setCurrentSelectedIds(newSelectedIds);
    onChange(newSelectedIds);
  };

  return (
    <div 
      ref={ref} 
      data-testid="multiselect" 
      className={`multiselect-container ${disabled ? 'multiselect-container--disabled' : ''} ${className || ''}`}
      role="group"
      aria-labelledby={label ? `multiselect-label-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined}
      {...props}
    >
      {label && (
        <label 
          id={`multiselect-label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="multiselect-group-label"
        >
          {label}
        </label>
      )}
      {options.map(option => (
        <div key={option.id} className="multiselect-option">
          <Checkbox
            id={`multiselect-option-${option.id}`}
            label={option.label}
            checked={currentSelectedIds.includes(option.id)}
            onChange={() => handleCheckboxChange(option.id)}
            disabled={disabled || option.disabled}
            aria-labelledby={`multiselect-option-label-${option.id}`}
          />
        </div>
      ))}
    </div>
  );
});

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
