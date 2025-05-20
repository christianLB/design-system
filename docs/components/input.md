# Input Component

## Overview

The `Input` component is a flexible and accessible form control that allows users to enter and edit text. It supports all standard HTML input types and includes built-in styling for various states like focus, disabled, and error states.

## Features

- **Multiple Input Types**: Supports all standard HTML input types (`text`, `email`, `password`, `number`, `tel`, `url`, `search`, etc.)
- **Accessibility**: Built with WAI-ARIA design patterns
- **Customizable**: Style with Tailwind CSS classes
- **States**: Support for disabled, read-only, and error states
- **Dark Mode**: Automatic dark mode support
- **Validation**: Built-in support for HTML5 form validation
- **Internationalization**: Supports RTL languages
- **Unstyled**: Fully customizable with CSS variables

## Installation

```bash
# No additional dependencies required
# The Input component is included in the core components
```

## Usage

### Basic Usage

```tsx
import { Input } from "@/components/input";

function MyForm() {
  const [value, setValue] = React.useState('');
  
  return (
    <div className="space-y-4">
      <label htmlFor="username" className="block text-sm font-medium">
        Username
      </label>
      <Input
        id="username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your username"
      />
    </div>
  );
}
```

### With Label and Helper Text

```tsx
function FormField() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <span className="text-xs text-muted-foreground">Required</span>
      </div>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <p className="text-xs text-muted-foreground">
        We'll only use this for important updates.
      </p>
    </div>
  );
}
```

### Input Types

```tsx
function InputTypes() {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium mb-1">
          Text
        </label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input 
          id="email" 
          type="email" 
          placeholder="you@example.com" 
          required 
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          minLength={8} 
        />
      </div>
      
      <div>
        <label htmlFor="number" className="block text-sm font-medium mb-1">
          Number
        </label>
        <Input 
          id="number" 
          type="number" 
          placeholder="Enter a number" 
          min={0} 
          max={100} 
        />
      </div>
      
      <div>
        <label htmlFor="search" className="block text-sm font-medium mb-1">
          Search
        </label>
        <Input 
          id="search" 
          type="search" 
          placeholder="Search..." 
          className="pl-8" 
        />
      </div>
    </div>
  );
}
```

### With Icons

```tsx
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function InputWithIcons() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-8" 
        />
      </div>
      
      <div className="relative">
        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="email" 
          placeholder="Email" 
          className="pl-8" 
        />
      </div>
      
      <div className="relative">
        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          className="pl-8 pr-10" 
        />
        <button 
          type="button" 
          className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
```

### Validation States

```tsx
function ValidationStates() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="valid-email" className="block text-sm font-medium mb-1">
          Email (with validation)
        </label>
        <Input
          id="valid-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={showError ? "border-destructive" : ""}
          placeholder="Enter a valid email"
        />
        {showError && (
          <p className="mt-1 text-xs text-destructive">
            Please enter a valid email address
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="required" className="block text-sm font-medium mb-1">
          Required Field
        </label>
        <Input 
          id="required" 
          required 
          placeholder="This field is required" 
          className="aria-required:ring-2 aria-required:ring-offset-2 aria-required:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="disabled" className="block text-sm font-medium mb-1">
          Disabled
        </label>
        <Input 
          id="disabled" 
          disabled 
          placeholder="This input is disabled" 
        />
      </div>
      
      <div>
        <label htmlFor="readonly" className="block text-sm font-medium mb-1">
          Read Only
        </label>
        <Input 
          id="readonly" 
          readOnly 
          value="This value cannot be edited" 
        />
      </div>
    </div>
  );
}
```

## Props

The `Input` component extends the standard HTML `input` element props and adds the following:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS class names |
| `type` | `string` | `'text'` | The type of input to render |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `required` | `boolean` | `false` | Whether the input is required |
| `aria-invalid` | `boolean` | - | Indicates that the input is invalid |
| `aria-errormessage` | `string` | - | Identifies the element that provides an error message |
| `aria-describedby` | `string` | - | Identifies the element that describes the input |
| `aria-label` | `string` | - | Defines a label for the input (for accessibility) |
| `aria-labelledby` | `string` | - | Identifies the element that labels the input |

## Styling

The Input component uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --input-bg: #ffffff;
  --input-border: #e2e8f0;
  --input-text: #1a202c;
  --input-placeholder: #a0aec0;
  --input-ring: #3b82f6;
  --input-ring-offset: #ffffff;
  --input-ring-width: 2px;
  --input-radius: 0.375rem;
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.5rem;
  
  /* States */
  --input-hover-border: #cbd5e0;
  --input-focus-border: #3b82f6;
  --input-disabled-bg: #f7fafc;
  --input-disabled-border: #e2e8f0;
  --input-disabled-text: #a0aec0;
  --input-invalid-border: #e53e3e;
  --input-invalid-ring: rgba(229, 62, 62, 0.2);
}

/* Dark mode overrides */
.dark {
  --input-bg: #1a202c;
  --input-border: #2d3748;
  --input-text: #f7fafc;
  --input-placeholder: #718096;
  --input-ring: #63b3ed;
  --input-ring-offset: #1a202c;
  --input-hover-border: #4a5568;
  --input-focus-border: #63b3ed;
  --input-disabled-bg: #2d3748;
  --input-disabled-border: #4a5568;
  --input-disabled-text: #718096;
  --input-invalid-border: #fc8181;
  --input-invalid-ring: rgba(252, 129, 129, 0.2);
}
```

## Best Practices

### When to Use

- Collecting text, numbers, or other input from users
- Search fields
- Form inputs
- Settings and preferences
- Anywhere user input is required

### When Not to Use

- For simple toggles (use a `Switch` or `Checkbox`)
- For selecting from predefined options (use `Select` or `RadioGroup`)
- For long-form text (use `Textarea`)

### Implementation Tips

1. **Always Use Labels**: Every input should have an associated `<label>` element for accessibility
2. **Provide Placeholder Text**: Use placeholders to show the expected format or example input
3. **Use Appropriate Input Types**: Use the most specific input type for the data you're collecting
4. **Validate Input**: Provide clear validation messages and visual feedback
5. **Consider Mobile Users**: Ensure inputs are large enough to tap on mobile devices (minimum 44x44px)
6. **Group Related Inputs**: Use `fieldset` and `legend` for related groups of inputs
7. **Show Required Fields**: Clearly indicate which fields are required
8. **Provide Help Text**: Use helper text to provide additional context or requirements

## Accessibility

The Input component follows WAI-ARIA design patterns and includes:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast mode support
- Reduced motion support
- Right-to-left (RTL) language support

## Related Components

- [Textarea](./textarea.md) - For multi-line text input
- [Select](./select.md) - For selecting from a dropdown list
- [Checkbox](./checkbox.md) - For toggling options
- [RadioGroup](./radio-group.md) - For selecting one option from many
- [Form](./form.md) - For building accessible forms
- [Label](./label.md) - For labeling form controls
- [Button](./button.md) - For form submission and actions