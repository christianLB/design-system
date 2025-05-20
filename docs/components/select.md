# Select Component

## Overview

The `Select` component is a versatile dropdown list that allows users to choose one option from a set of predefined choices. Built on Radix UI primitives, it provides a robust, accessible, and customizable selection experience. The component is designed to work seamlessly in forms and supports both controlled and uncontrolled usage patterns.

## Features

- **Accessibility First**: Implements WAI-ARIA design patterns for screen readers and keyboard navigation
- **Fully Customizable**: Style every part of the select component with ease
- **Type-Safe**: Built with TypeScript for enhanced developer experience
- **Responsive**: Adapts to all screen sizes and devices
- **Theme Support**: Built-in light and dark mode compatibility
- **Flexible State Management**: Supports both controlled and uncontrolled patterns
- **Form Library Ready**: Seamless integration with popular form libraries
- **Performance Optimized**: Handles large lists efficiently with virtualization
- **Search & Filter**: Built-in support for searching through options
- **Logical Grouping**: Organize options into categorized groups
- **Icon Support**: Easily add icons to both trigger and options
- **Keyboard Navigation**: Full keyboard support for better accessibility
- **Mobile Friendly**: Touch-optimized for mobile devices
- **Custom Rendering**: Render custom components as select items
- **Form Validation**: Works with HTML5 form validation
- **Right-to-Left (RTL) Support**: Full RTL language support

## Installation

```bash
# Required dependencies
npm install @radix-ui/react-select
```

## Getting Started

### Installation

```bash
# Required dependencies
npm install @radix-ui/react-select
```

## Basic Usage

### Simple Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

function BasicSelect() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="fruit">Select a fruit</label>
      <Select>
        <SelectTrigger id="fruit" className="w-[180px]">
          <SelectValue placeholder="Choose a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### Controlled Component

```tsx
import { useState } from "react";
import { Button } from "@/components/button";

function ControlledSelect() {
  const [country, setCountry] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Selected country: ${country || 'None'}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="country">Country</label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger id="country" className="w-[280px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {country ? `Selected: ${country.toUpperCase()}` : 'No country selected'}
        </p>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Default Value

```tsx
function DefaultValueSelect() {
  return (
    <Select defaultValue="light">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## Advanced Patterns

### Grouped Options

Organize related options into logical groups with optional separators and section headers.

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/select";

function GroupedSelect() {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Time Zone</label>
      <Select>
        <SelectTrigger className="w-[320px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          
          <SelectSeparator />
          
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
          </SelectGroup>
          
          <SelectSeparator />
          
          <SelectGroup>
            <SelectLabel>Asia & Pacific</SelectLabel>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="aest">Australian Eastern Time (AEST)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### Searchable Select

Add search functionality to filter through large lists of options.

```tsx
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/input";

const COUNTRIES = [
  { code: 'us', name: 'United States' },
  { code: 'ca', name: 'Canada' },
  { code: 'mx', name: 'Mexico' },
  { code: 'br', name: 'Brazil' },
  { code: 'uk', name: 'United Kingdom' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'it', name: 'Italy' },
  { code: 'es', name: 'Spain' },
  { code: 'jp', name: 'Japan' },
  { code: 'cn', name: 'China' },
  { code: 'in', name: 'India' },
  { code: 'au', name: 'Australia' },
  { code: 'nz', name: 'New Zealand' },
];

function SearchableSelect() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  
  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    const searchTerm = search.toLowerCase();
    return COUNTRIES.filter(country => 
      country.name.toLowerCase().includes(searchTerm) || 
      country.code.toLowerCase().includes(searchTerm)
    );
  }, [search]);
  
  const selectedCountry = COUNTRIES.find(c => c.code === value);
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Search Country</label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a country">
            {selectedCountry ? `${selectedCountry.name} (${selectedCountry.code.toUpperCase()})` : null}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="p-0">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {search && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearch("");
                  }}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} ({country.code.toUpperCase()})
                </SelectItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
      {selectedCountry && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedCountry.name} ({selectedCountry.code.toUpperCase()})
        </p>
      )}
    </div>
  );
}
```

## Component Variants

### With Icons

Enhance the select component with icons for better visual hierarchy and recognition.

```tsx
import { Calendar, Clock, Globe, MapPin, Sun, Moon, Clock4, Clock9, SunDim, MoonStar } from "lucide-react";

function SelectWithIcons() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Select Timezone</label>
        <Select>
          <SelectTrigger className="w-[320px]">
            <Globe className="mr-2 h-4 w-4 opacity-70" />
            <SelectValue placeholder="Choose a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="flex items-center">
                <Clock4 className="mr-2 h-4 w-4" />
                <span>North America</span>
              </SelectLabel>
              <SelectItem value="est" className="pl-8">
                <MapPin className="mr-2 h-4 w-4" />
                Eastern Standard Time (EST)
              </SelectItem>
              <SelectItem value="cst" className="pl-8">
                <MapPin className="mr-2 h-4 w-4" />
                Central Standard Time (CST)
              </SelectItem>
              <SelectItem value="pst" className="pl-8">
                <Sun className="mr-2 h-4 w-4" />
                Pacific Standard Time (PST)
              </SelectItem>
            </SelectGroup>
            
            <SelectSeparator />
            
            <SelectGroup>
              <SelectLabel className="flex items-center">
                <Clock9 className="mr-2 h-4 w-4" />
                <span>Europe & Africa</span>
              </SelectLabel>
              <SelectItem value="gmt" className="pl-8">
                <Clock className="mr-2 h-4 w-4" />
                Greenwich Mean Time (GMT)
              </SelectItem>
              <SelectItem value="cet" className="pl-8">
                <MoonStar className="mr-2 h-4 w-4" />
                Central European Time (CET)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Theme Settings</label>
        <Select defaultValue="system">
          <SelectTrigger className="w-[280px]">
            <SunDim className="mr-2 h-4 w-4 opacity-70" />
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <Sun className="mr-2 h-4 w-4" />
              Light
            </SelectItem>
            <SelectItem value="dark">
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </SelectItem>
            <SelectItem value="system">
              <Monitor className="mr-2 h-4 w-4" />
              System
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

### Disabled States

Control the disabled state of the entire select or individual options.

```tsx
function DisabledSelect() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Account Type</label>
        <Select disabled>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free Plan</SelectItem>
            <SelectItem value="pro">Pro Plan</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Please contact support to change your plan
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Notification Preferences</label>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select notification frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="hourly">Hourly Digest</SelectItem>
            <SelectItem value="daily" disabled>
              Daily Digest (Coming Soon)
            </SelectItem>
            <SelectItem value="weekly">Weekly Digest</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Some options may be temporarily unavailable
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Team Member</label>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a team member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alex">Alex Johnson (Developer)</SelectItem>
            <SelectItem value="sam" disabled>
              Sam Wilson (Out of Office)
            </SelectItem>
            <SelectItem value="jordan">Jordan Lee (Developer)</SelectItem>
            <SelectItem value="taylor">Taylor Smith (Designer)</SelectItem>
            <SelectItem value="casey" disabled>
              Casey Kim (On Leave)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

## Form Integration

The Select component works seamlessly with form libraries like React Hook Form. Here's how to integrate it:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  plan: z.string().min(1, "Please select a plan"),
  notifications: z.string().default("daily"),
});

function FormWithSelect() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      plan: "free",
      notifications: "daily",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <label htmlFor="country" className="block text-sm font-medium">
          Country <span className="text-destructive">*</span>
        </label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
              name={field.name}
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.country && (
          <p className="text-sm text-destructive">
            {errors.country.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="plan" className="block text-sm font-medium">
          Subscription Plan <span className="text-destructive">*</span>
        </label>
        <Controller
          name="plan"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
              name={field.name}
            >
              <SelectTrigger id="plan" className="w-full">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free Plan</SelectItem>
                <SelectItem value="pro">Pro Plan ($9.99/month)</SelectItem>
                <SelectItem value="team" disabled>
                  Team Plan (Coming Soon)
                </SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.plan && (
          <p className="text-sm text-destructive">
            {errors.plan.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="notifications" className="block text-sm font-medium">
          Notification Frequency
        </label>
        <Controller
          name="notifications"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
              name={field.name}
            >
              <SelectTrigger id="notifications" className="w-full">
                <SelectValue placeholder="Select notification frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <p className="text-sm text-muted-foreground">
          How often would you like to receive updates?
        </p>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
```

## Component Reference

### Props

#### SelectRoot

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The controlled value of the select. |
| `defaultValue` | `string` | - | The value of the select when initially rendered. |
| `onValueChange` | `(value: string) => void` | - | Event handler called when the value changes. |
| `defaultOpen` | `boolean` | - | The open state of the select when it is initially rendered. |
| `open` | `boolean` | - | The controlled open state of the select. |
| `onOpenChange` | `(open: boolean) => void` | - | Event handler called when the open state changes. |
| `dir` | `'ltr' \| 'rtl'` | - | The reading direction of the select. |
| `name` | `string` | - | The name of the select. Submitted with its owning form as part of a name/value pair. |
| `disabled` | `boolean` | `false` | When `true`, prevents the user from interacting with the select. |
| `required` | `boolean` | `false` | When `true`, indicates that the user must select a value before the owning form can be submitted. |

#### SelectTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `className` | `string` | - | Additional CSS classes to apply to the trigger. |

#### SelectValue

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `ReactNode` | - | The content to display when no value is selected. |
| `asChild` | `boolean` | `false` | Change the default rendered element for the one passed as a child. |

#### SelectContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'item-aligned' \| 'popper'` | `'item-aligned'` | The positioning mode to use. |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | The preferred side of the trigger to render against when open. |
| `sideOffset` | `number` | `4` | The distance in pixels from the trigger. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | The alignment of the content. |
| `alignOffset` | `number` | `0` | The alignment offset in pixels. |
| `avoidCollisions` | `boolean` | `true` | When `true`, overrides the `side` and `align` preferences to prevent collisions with boundary edges. |
| `collisionBoundary` | `Element \| null \| Array<Element \| null>` | `[]` | The boundary element for collision detection. |
| `collisionPadding` | `number \| { top?: number; right?: number; bottom?: number; left?: number; }` | `0` | The padding between the content and the viewport. |
| `arrowPadding` | `number` | `0` | The padding between the arrow and the edges of the content. |
| `sticky` | `'partial' \| 'always'` | `'partial'` | The sticky behavior on the align axis. |
| `hideWhenDetached` | `boolean` | `false` | Whether to hide the content when the trigger is not fully in the viewport. |
| `className` | `string` | - | Additional CSS classes to apply to the content. |

#### SelectItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value of the item. |
| `disabled` | `boolean` | `false` | When `true`, prevents the user from selecting the item. |
| `textValue` | `string` | - | Optional text used for typeahead purposes. |
| `className` | `string` | - | Additional CSS classes to apply to the item. |
| `onSelect` | `(event: Event) => void` | - | Event handler called when the user selects an item. |

## Best Practices

### When to Use

- When users need to select one option from a list of 5 or more items
- When space is limited and you need to conserve UI real estate
- When the list of options is static and known in advance
- When the default value is recommended for most users

### When to Consider Something Else

- For binary choices, use a `Switch` or `Checkbox` instead
- For fewer than 5 options, consider using `RadioGroup`
- When users need to select multiple options, use `MultiSelect` or `Checkbox` group
- For free-form input, use an `Input` with typeahead functionality

### Accessibility

- Always provide a descriptive label for the select
- Use the `label` element with `htmlFor` that matches the `id` of the select
- Ensure proper color contrast for text and background
- Support keyboard navigation (Arrow keys, Home, End, etc.)
- Include proper ARIA attributes for screen readers
- Provide clear error states and validation messages

### Performance

- For large lists (100+ items), implement virtualization
- Memoize the options array if it's computed from props or state
- Use `React.memo` for custom item components to prevent unnecessary re-renders
- Consider using `windowed` rendering for very large lists

### Styling

- Use consistent spacing and alignment with other form elements
- Ensure the select is wide enough to display the selected value
- Use icons and colors sparingly to highlight important options
- Maintain sufficient touch targets (minimum 44x44px) for mobile devices
- Provide clear visual feedback on interaction states (hover, focus, active)

### Internationalization

- Support right-to-left (RTL) layouts
- Localize all text, including placeholders and error messages
- Consider cultural differences in date, time, and number formats
- Test with various text directions and lengths

### Testing

- Test keyboard navigation and screen reader compatibility
- Verify behavior with different input methods (mouse, touch, keyboard)
- Test with different screen sizes and zoom levels
- Validate form submission with required fields
- Test error states and validation messages

## Troubleshooting

### The select doesn't update when the value changes

Make sure you're using the `value` and `onValueChange` props correctly. If you're using a controlled component, ensure you're updating the state in the `onValueChange` handler.

### The select menu is being cut off

This usually happens when the select is inside a container with `overflow: hidden`. You can either:

1. Move the select to a parent with `overflow: visible`
2. Use the `position="popper"` prop on `SelectContent`
3. Adjust the `side` and `align` props to position the menu differently

### The select doesn't work with my form library

For React Hook Form, make sure you're using the `Controller` component as shown in the form integration example. For other form libraries, you'll typically need to:

1. Get the `value` and `onChange` handlers from the form library
2. Pass them to the `Select` component
3. Handle the form submission with the form library's submit handler

### The select is not accessible

Ensure you've:

1. Added proper labels
2. Included ARIA attributes
3. Tested with a screen reader
4. Verified keyboard navigation works as expected

### The select is not working on mobile

Make sure:

1. Touch targets are large enough (minimum 44x44px)
2. The select is not inside a scrollable container that's intercepting touch events
3. You're using the latest version of the component library

## Related Components

- [Combobox](/docs/components/combobox) - For searchable select with autocomplete
- [Dropdown Menu](/docs/components/dropdown-menu) - For more complex menu interactions
- [Radio Group](/docs/components/radio-group) - For single selection from a small number of options
- [Checkbox](/docs/components/checkbox) - For multiple selection
- [Input](/docs/components/input) - For free-form text input

## Changelog

### [1.0.0] - 2023-10-15
- Initial release of the Select component
- Built on Radix UI primitives
- Supports all major form libraries
- Fully accessible and keyboard navigable
- Responsive design for all screen sizes

### [1.1.0] - 2023-11-05
- Added support for custom item rendering
- Improved TypeScript types
- Better mobile touch support
- Performance optimizations for large lists

## Contributing

We welcome contributions to improve the Select component. Please follow our [contribution guidelines](https://github.com/your-org/design-system/blob/main/CONTRIBUTING.md) to get started.

## License

MIT © [Your Organization](https://your-org.com)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="country" className="block text-sm font-medium mb-1">
          Country
        </label>
        <Select 
          onValueChange={(value) => setValue("country", value)}
          value={selectedCountry}
        >
          <SelectTrigger id="country" className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
```

## Subcomponents

The `Select` component is composed of several subcomponents that work together to create the complete dropdown experience:

| Component | Description |
|-----------|-------------|
| `Select` | The root component that manages the state of the select |
| `SelectTrigger` | The button that toggles the dropdown |
| `SelectValue` | Displays the currently selected value |
| `SelectContent` | The container for the dropdown options |
| `SelectItem` | An individual option in the dropdown |
| `SelectGroup` | Groups related `SelectItem` components |
| `SelectLabel` | A label for a group of items |
| `SelectSeparator` | A visual separator between items |
| `SelectScrollUpButton` | Button to scroll up in the dropdown |
| `SelectScrollDownButton` | Button to scroll down in the dropdown |

## Props

### Select

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value of the currently selected item |
| `defaultValue` | `string` | - | The default selected value (uncontrolled) |
| `onValueChange` | `(value: string) => void` | - | Callback when the selected value changes |
| `defaultOpen` | `boolean` | `false` | Whether the dropdown is open by default |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when the open state changes |
| `dir` | `'ltr' \| 'rtl'` | - | The direction of the text |
| `name` | `string` | - | Name of the form control |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `required` | `boolean` | `false` | Whether the select is required |

### SelectTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge the trigger with another element |
| `className` | `string` | - | Additional class name |

### SelectValue

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `ReactNode` | - | Placeholder text |
| `asChild` | `boolean` | `false` | Merge the value with another element |

### SelectContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'item-aligned' \| 'popper'` | `'item-aligned'` | How to position the content |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side of the trigger to render against |
| `sideOffset` | `number` | `0` | The distance in pixels from the trigger |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | The alignment of the content |
| `alignOffset` | `number` | `0` | The alignment offset in pixels |
| `avoidCollisions` | `boolean` | `true` | Whether to avoid collisions with the viewport |
| `collisionBoundary` | `Element \| null \| Array<Element \| null>` | `[]` | The boundary element for collision detection |
| `collisionPadding` | `number \| { top?: number; right?: number; bottom?: number; left?: number; }` | `0` | The padding between the content and the viewport |
| `arrowPadding` | `number` | `0` | The padding between the arrow and the content |
| `sticky` | `'partial' \| 'always'` | `'partial'` | The sticky behavior of the content |
| `hideWhenDetached` | `boolean` | `false` | Whether to hide the content when the trigger is not in the viewport |

### SelectItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value of the item |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `textValue` | `string` | - | The text value of the item for typeahead |
| `asChild` | `boolean` | `false` | Merge the item with another element |
| `className` | `string` | - | Additional class name |

## Styling

The Select component uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --select-trigger-bg: #ffffff;
  --select-trigger-border: #e2e8f0;
  --select-trigger-text: #1a202c;
  --select-trigger-placeholder: #a0aec0;
  --select-trigger-ring: #3b82f6;
  --select-trigger-ring-offset: #ffffff;
  --select-trigger-ring-width: 2px;
  --select-trigger-radius: 0.375rem;
  --select-trigger-padding-x: 0.75rem;
  --select-trigger-padding-y: 0.5rem;
  
  --select-content-bg: #ffffff;
  --select-content-border: #e2e8f0;
  --select-content-text: #1a202c;
  --select-content-highlight-bg: #f7fafc;
  --select-content-highlight-text: #1a202c;
  
  --select-item-padding-x: 0.5rem;
  --select-item-padding-y: 0.375rem;
  --select-item-radius: 0.25rem;
  
  --select-separator-bg: #e2e8f0;
  --select-separator-margin: 0.25rem;
  
  --select-scroll-button-size: 1.5rem;
}

/* Dark mode overrides */
.dark {
  --select-trigger-bg: #1a202c;
  --select-trigger-border: #2d3748;
  --select-trigger-text: #f7fafc;
  --select-trigger-placeholder: #718096;
  --select-trigger-ring: #63b3ed;
  --select-trigger-ring-offset: #1a202c;
  
  --select-content-bg: #1a202c;
  --select-content-border: #2d3748;
  --select-content-text: #f7fafc;
  --select-content-highlight-bg: #2d3748;
  --select-content-highlight-text: #f7fafc;
  
  --select-separator-bg: #2d3748;
}
```

## Best Practices

### When to Use

- When users need to select one option from a list of 5+ items
- When space is limited (compared to radio buttons)
- For form fields with predefined options
- In settings panels and configuration screens
- When the list of options is dynamic or loaded asynchronously

### When Not to Use

- For binary choices (use a Switch or Checkbox)
- When there are fewer than 5 options (consider RadioGroup)
- For commands or actions (use a Menu or Dropdown)
- When users need to select multiple options (use a MultiSelect or Checkbox group)

### Accessibility

The Select component follows WAI-ARIA design patterns and includes:

- Keyboard navigation (Arrow keys, Home, End, etc.)
- Screen reader announcements
- Proper ARIA attributes
- Focus management
- Typeahead support
- Touch and pointer device support

## Related Components

- [Combobox](./combobox.md) - For selecting from a list with search/filtering
- [Dropdown Menu](./dropdown-menu.md) - For command menus and actions
- [Radio Group](./radio-group.md) - For selecting one option from a small set
- [Checkbox](./checkbox.md) - For toggling options
- [Form](./form.md) - For building accessible forms

function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );
}
```
### Placeholder

Use the `placeholder` prop on `SelectValue` to display text when no item is selected.
```
tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";

function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select your favorite fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );
}
```
### Groups

Use `SelectGroup` to group related `SelectItem` components under a `SelectLabel`.
```
tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/select";

function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```
### Disabled State

Add the `disabled` prop to the `Select` component to disable the entire select element.
```
tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";

function MyComponent() {
  return (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );
}
```
## Structure

A complete `Select` component with all its subcomponents will follow this structure: