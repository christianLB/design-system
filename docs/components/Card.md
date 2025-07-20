# Card

Card is a layout component that provides consistent spacing, borders, and styling for content containers.

## Props

| Prop            | Type                        | Required | Default    | Description                                    |
| --------------- | --------------------------- | -------- | ---------- | ---------------------------------------------- | --- | ------------------------ |
| `ref`           | `React.Ref<HTMLDivElement>` | ❌       | `-`        | React ref to the HTML div element              |
| `variant`       | `CardVariant`               | ❌       | `-`        | Card visual variant                            |
| `scanlines`     | `boolean`                   | ❌       | `-`        | Adds cyberpunk scanline effects                |
| `matrixRain`    | `boolean`                   | ❌       | `-`        | Adds Matrix-style digital rain effect          |
| `cyberpunkGlow` | `'subtle'                   | 'normal' | 'intense'` | ❌                                             | `-` | Cyberpunk glow intensity |
| `glow`          | `boolean`                   | ❌       | `-`        | Adds a subtle glow effect                      |
| `elevated`      | `boolean`                   | ❌       | `-`        | Makes the card look elevated from the surface  |
| `vital`         | `boolean`                   | ❌       | `-`        | Adds atmospheric alien breathing effects       |
| `neural`        | `boolean`                   | ❌       | `-`        | Enables neural pathways effect for alien theme |
| `atmospheric`   | `boolean`                   | ❌       | `-`        | Adds alien atmospheric effects                 |

## Examples

```tsx
// Basic usage
<Card />
```

```tsx
// With props
<Card ref="value" variant="value" />
```

## Best Practices

- Use Card consistently throughout your application
- Follow the established design system patterns and guidelines
- Test with keyboard navigation and screen readers

## Accessibility

- Follows WCAG 2.1 accessibility guidelines
- Compatible with screen readers and assistive technologies
- Supports keyboard navigation

## Usage Notes

- This component includes animations powered by Framer Motion
- This component forwards refs to the underlying DOM element
- Multiple visual variants available for different use cases

## Related Components

- [`useMicroInteraction`](./useMicroInteraction.md)

---

_Documentation generated automatically by Claude Code Documentation System_
_Last updated: 2025-07-19T19:03:21.404Z_
