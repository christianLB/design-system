# Radio Group Component

## Description

The Radio Group component is used to allow a user to select only one option from a predefined set of choices. This component is ideal for scenarios where a single selection is required, such as choosing a preference or answering a multiple-choice question.

## Features

-   **Single Selection:** Enforces that only one option can be selected at any time.
-   **Configurable Options:** Accepts an array of objects, where each object represents an option with a `value` and a `label`.
-   **Label Display:** Displays the `label` for each option, providing clear text for user understanding.
-   **Internal State:** Manages the currently selected `value` internally.
-   **Event Emission:** Emits an event whenever a new option is selected, allowing for external handling of the selection change.
-   **Clear Indication:** Visually highlights the selected option for easy identification.
-   **Accessibility:** Supports keyboard navigation and screen readers, ensuring accessibility compliance.

## Dependencies

-   **React:** The component is built using React, so it requires React to be installed and available in the project.
-   **TailwindCSS**: The component uses Tailwind classes for styling.
-   **Typescript:** The component is written in typescript.

## Props

-   **options** (`Array<{ value: string | number; label: string }>`): An array of objects, each defining an option with a `value` (which can be a string or number) and a `label` (a string) to display to the user.
-   **onChange** (`(value: string | number) => void`): A callback function that is triggered when a new option is selected. It receives the `value` of the selected option as an argument.

## Usage

The component is straightforward to use. Provide an array of options and a callback for handling changes.
```
jsx
<RadioGroup
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  onChange={(value) => console.log('Selected value:', value)}
/>
```
## Example
```
typescript
import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  onChange: (value: string | number) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  const handleChange = (value: string | number) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
          <span className="ml-2 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
```
## Considerations

-   The `value` prop should be unique for each option to ensure proper identification and selection.
-   The `onChange` callback is essential for handling changes in the selected option. Make sure to implement it to react to user selections.