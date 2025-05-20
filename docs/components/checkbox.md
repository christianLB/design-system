# Checkbox Component

## Overview

The `Checkbox` component is a versatile form element that allows users to toggle between checked, unchecked, and indeterminate states. Built on top of Radix UI's accessible primitives, it provides a robust and accessible checkbox implementation with support for various states, form integration, and custom styling.

## Features

- **Multiple States**: Supports checked, unchecked, and indeterminate states
- **Form Integration**: Works seamlessly with React Hook Form and other form libraries
- **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
- **Customization**: Extensible styling through CSS variables and class overrides
- **Multiple Selection**: Supports selecting multiple options with "Select All" functionality
- **Rich Labels**: Supports complex label structures with descriptions and additional content
- **Validation**: Built-in support for form validation states
- **Theming**: Consistent theming with the rest of the design system

## Installation

```bash
npm install @radix-ui/react-checkbox lucide-react
```

## Usage

### Basic Usage

```tsx
import { Checkbox } from "@/components/checkbox";

function MyComponent() {
  const [checked, setChecked] = React.useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={checked} 
        onCheckedChange={setChecked} 
      />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
}
```

### States

#### Checked State

```tsx
<Checkbox checked />
```

#### Indeterminate State

```tsx
const [checked, setChecked] = React.useState<'indeterminate' | boolean>('indeterminate');

<Checkbox 
  checked={checked}
  onCheckedChange={setChecked}
/>
```

#### Disabled State

```tsx
<Checkbox disabled />
<Checkbox checked disabled />
```

### With Form

The Checkbox component works seamlessly with form libraries like React Hook Form:

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" {...register('terms')} />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
```

### Multiple Selection

```tsx
function FruitList() {
  const fruits = [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'orange', label: 'Orange' },
  ];
  
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  
  const toggleFruit = (id: string) => {
    const newSelection = new Set(selected);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelected(newSelection);
  };
  
  const allSelected = selected.size === fruits.length;
  const someSelected = selected.size > 0 && !allSelected;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="select-all"
          checked={allSelected}
          onCheckedChange={() => {
            if (allSelected) {
              setSelected(new Set());
            } else {
              setSelected(new Set(fruits.map(f => f.id)));
            }
          }}
          ref={(el) => {
            if (el) {
              // @ts-ignore
              el.indeterminate = someSelected;
            }
          }}
        />
        <label htmlFor="select-all">Select all</label>
      </div>
      
      {fruits.map((fruit) => (
        <div key={fruit.id} className="flex items-center space-x-2">
          <Checkbox 
            id={fruit.id}
            checked={selected.has(fruit.id)}
            onCheckedChange={() => toggleFruit(fruit.id)}
          />
          <label htmlFor={fruit.id}>{fruit.label}</label>
        </div>
      ))}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | The id of the checkbox input |
| `checked` | `boolean \| 'indeterminate'` | `false` | The controlled checked state |
| `defaultChecked` | `boolean` | `false` | The default checked state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `required` | `boolean` | `false` | Whether the checkbox is required |
| `name` | `string` | - | The name of the checkbox (for forms) |
| `value` | `string` | - | The value of the checkbox (for forms) |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | - | Callback when the checked state changes |
| `className` | `string` | - | Additional CSS class names |
| `style` | `React.CSSProperties` | - | Inline styles |

## Styling

The checkbox uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --checkbox-size: 16px;
  --checkbox-border-radius: 4px;
  --checkbox-border-color: #94a3b8;
  --checkbox-bg: white;
  --checkbox-hover-bg: #f1f5f9;
  --checkbox-active-bg: #e2e8f0;
  --checkbox-checked-bg: #3b82f6;
  --checkbox-checked-hover-bg: #2563eb;
  --checkbox-checked-active-bg: #1d4ed8;
  --checkbox-disabled-bg: #f1f5f9;
  --checkbox-disabled-border-color: #e2e8f0;
  --checkbox-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

## Accessibility

The Checkbox component follows WAI-ARIA design patterns and includes:

- Keyboard navigation (Tab, Space, Enter)
- Proper ARIA attributes
- Screen reader announcements
- Focus management
- High contrast support

## Best Practices

- Always provide a meaningful label for each checkbox
- Group related checkboxes with a `<fieldset>` and `<legend>`
- Use the indeterminate state when a parent checkbox has some but not all children checked
- Ensure sufficient color contrast for text and interactive elements
- Test with keyboard navigation and screen readers
### Disabled

The checkbox in a disabled state, preventing user interaction.
```
tsx
import { Checkbox } from "../components/checkbox";

function MyComponent() {
  return <Checkbox disabled />;
}
```
### Indeterminate

The checkbox in an indeterminate state, typically used when a subset of related checkboxes are checked. This state is styled differently from both checked and unchecked.
You can use `defaultIndeterminate` prop for an initial indeterminate state.
```
tsx
import { Checkbox } from "../components/checkbox";
import { useState } from "react";

function MyComponent() {
const [isChecked, setIsChecked] = useState(false)
const [isIndeterminate, setIsIndeterminate] = useState(true);

  return <Checkbox checked={isChecked} indeterminate={isIndeterminate}/>;
}
```
## Structure

A typical `Checkbox` component will have the following basic structure: