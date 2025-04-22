import React, { useState } from 'react';

interface RadioItem {
  value: string;
  label: string;
}

interface RadioGroupProps {
  items: RadioItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  items,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.value} className="flex items-center">
          <input
            type="radio"
            id={item.value}
            name="radio-group"
            value={item.value}
            checked={selectedValue === item.value}
            onChange={handleRadioChange}
            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <label htmlFor={item.value} className="ml-2 block text-sm font-medium text-gray-700">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;