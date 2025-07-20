# Button

Button is an interactive button component that provides consistent styling and behavior across the application. Use it for actions, form submissions, and navigation.

## Props

| Prop            | Type                           | Required | Default    | Description                                               |
| --------------- | ------------------------------ | -------- | ---------- | --------------------------------------------------------- | --- | ------------------------ |
| `ref`           | `React.Ref<HTMLButtonElement>` | ❌       | `-`        | React ref to the HTML button element                      |
| `variant`       | `ButtonVariant`                | ❌       | `-`        | Property variant                                          |
| `size`          | `ButtonSize`                   | ❌       | `-`        | Property size                                             |
| `fullWidth`     | `boolean`                      | ❌       | `-`        | Property fullWidth                                        |
| `glow`          | `boolean`                      | ❌       | `-`        | Adds a subtle glow effect, great for futuristic themes    |
| `elevated`      | `boolean`                      | ❌       | `-`        | Makes the button look like it's elevated from the surface |
| `scanlines`     | `boolean`                      | ❌       | `-`        | Adds cyberpunk scanline effects                           |
| `matrixRain`    | `boolean`                      | ❌       | `-`        | Adds Matrix-style digital rain effect                     |
| `cyberpunkGlow` | `'subtle'                      | 'normal' | 'intense'` | ❌                                                        | `-` | Cyberpunk glow intensity |
| `vital`         | `boolean`                      | ❌       | `-`        | Adds pulsing/breathing effects for alien theme variants   |
| `atmospheric`   | `boolean`                      | ❌       | `-`        | Adds neural pathway effects for alien theme variants      |
| `iconStart`     | `IconName`                     | ❌       | `-`        | Icon to display before button content                     |
| `iconEnd`       | `IconName`                     | ❌       | `-`        | Icon to display after button content                      |
| `iconSize`      | `IconSize`                     | ❌       | `-`        | Size for any icons                                        |

## Examples

```tsx
// Basic usage
<Button />
```

```tsx
// With props
<Button ref="value" variant="value" />
```

```tsx
// With children
<Button>Content goes here</Button>
```

## Best Practices

- Use clear, action-oriented labels that describe what will happen when clicked
- Provide appropriate loading states for async actions
- Consider the visual hierarchy when choosing button variants
- Use Button consistently throughout your application
- Follow the established design system patterns and guidelines
- Test with keyboard navigation and screen readers

## Accessibility

- Uses ARIA state attributes for dynamic content

## Usage Notes

- This component includes animations powered by Framer Motion
- This component forwards refs to the underlying DOM element
- Multiple visual variants available for different use cases
- Supports multiple size options for layout flexibility

## Related Components

- [`Stack`](./Stack.md)
- [`Icon`](./Icon.md)
- [`IconName`](./IconName.md)
- [`IconSize`](./IconSize.md)

---

_Documentation generated automatically by Claude Code Documentation System_
_Last updated: 2025-07-19T19:02:57.146Z_
