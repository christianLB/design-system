import React from "react";
import Select, { MultiValue } from "react-select";

export interface MultiSelectOption {
  id: string | number;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  defaultValue?: Array<string | number>;
  placeholder?: string;
  onChange: (selectedIds: Array<string | number>) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ 
  options, 
  defaultValue = [], 
  placeholder, 
  onChange 
}) => {
  const selectedOptions = options.filter(opt => 
    (defaultValue as Array<string | number>).includes(opt.id)
  ) as MultiSelectOption[];

  const handleChange = (selected: MultiValue<MultiSelectOption>) => {
    const selectedIds = selected ? selected.map(opt => {
      // Convert to number if the ID is a numeric string and the original ID was a number
      const originalOption = options.find(o => o.id.toString() === opt.id.toString());
      return originalOption ? originalOption.id : opt.id;
    }) : [];
    onChange(selectedIds);
  };

  return (
    <Select
      isMulti
      options={options}
      classNamePrefix="react-select"
      getOptionValue={(option) => option.id.toString()}
      value={selectedOptions}
      placeholder={placeholder || "Select..."}
      onChange={handleChange}
      className="text-black"
    />
  );
};

// Export the MultiSelect component as a named export
