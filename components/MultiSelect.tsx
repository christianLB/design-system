import React from "react";
import Select from "react-select";

interface Option {
  id: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  defaultValue?: Array<string | number>;
  placeholder?: string;
  onChange: (selectedIds: Array<string | number>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ 
  options, 
  defaultValue = [], 
  placeholder, 
  onChange 
}) => {
  const selectedOptions = options.filter(opt => 
    (defaultValue as Array<string | number>).includes(opt.id)
  );

  const handleChange = (selected: any) => {
    const selectedIds = selected ? selected.map((opt: any) => {
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

export default MultiSelect;
