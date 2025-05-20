# DatePicker Component

## Overview

The `DatePicker` component allows users to select a date (or date range) from a calendar UI. It supports keyboard navigation, accessibility, and custom formatting. Ideal for forms, booking, scheduling, and filtering.

## Features
- **Calendar Popup**: Select single date or range
- **Input Masking**: Optional input for manual entry
- **Custom Format**: Display date in various formats
- **Disabled Dates**: Block weekends, past/future, or custom rules
- **Keyboard Navigation**: Arrow keys, Enter, Esc
- **Themed**: Custom styles and theming
- **Accessible**: ARIA roles, focus management, screen reader support

## Usage

### Basic Usage
```jsx
<DatePicker value={date} onChange={setDate} />
```

### Date Range
```jsx
<DatePicker range value={range} onChange={setRange} />
```

### Disabled Dates
```jsx
<DatePicker disabledDates={[new Date(), ...holidays]} />
```

### Custom Format
```jsx
<DatePicker format="MM/dd/yyyy" />
```

## Prop Table
| Prop          | Type                     | Default   | Description                                 |
|---------------|--------------------------|-----------|---------------------------------------------|
| `value`       | `Date \| Date[]`         | —         | Selected date or range                      |
| `onChange`    | `(date: Date \| Date[]) => void` | — | Callback when date changes                  |
| `range`       | `boolean`                | false     | Enable date range selection                 |
| `disabledDates`| `Date[]`                | []        | Array of dates to disable                   |
| `format`      | `string`                 | 'yyyy-MM-dd'| Date display format                        |
| `placeholder` | `string`                 | —         | Placeholder text for input                  |
| `className`   | `string`                 | —         | Custom class for styling                    |
| `aria-label`  | `string`                 | —         | Accessible label for screen readers         |

## Accessibility
- Uses `role="dialog"` for calendar popup
- Keyboard navigation: arrows, Enter, Esc
- Focus management: returns to input after selection
- ARIA attributes for input, calendar, and selected dates

**Example Accessible DatePicker:**
```jsx
<label htmlFor="dob">Date of Birth</label>
<DatePicker id="dob" aria-label="Date of Birth" />
```

## Best Practices
- Use for date input, not for time or datetime unless supported
- Always provide a clear label
- Disable invalid dates to prevent errors
- Format date for locale or user expectation
- Test keyboard and screen reader navigation

## Troubleshooting
- If calendar doesn't open, check focus and event handlers
- For accessibility, ensure ARIA attributes and focus management
- If date can't be selected, check `disabledDates` and format

## Related Components
- [Input](./input.md) — For manual date entry
- [Form](./form.md) — For grouping fields
- [Button](./button.md) — For calendar trigger
- [Tooltip](./tooltip.md) — For date info/help
