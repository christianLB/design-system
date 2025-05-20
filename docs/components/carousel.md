# Carousel Component

## Overview

The `Carousel` component displays a collection of items in a rotating or sliding view. It supports images, cards, or custom elements, with navigation controls, autoplay, and full accessibility support.

## Features
- **Item Display**: Shows one or more items at a time
- **Navigation Controls**: Previous/next buttons and navigation dots
- **Autoplay**: Optional automatic rotation with configurable interval
- **Responsive**: Adjusts number of visible items based on screen size
- **Customizable**: Theming, custom classes, and custom content
- **Accessible**: Keyboard navigation, ARIA roles, and screen reader support

## Usage

### Basic Carousel
```jsx
<Carousel items={[<img src="1.jpg" />, <img src="2.jpg" />, <img src="3.jpg" />]} />
```

### Multiple Items
```jsx
<Carousel items={cards} itemsToShow={3} />
```

### Autoplay with Custom Interval
```jsx
<Carousel items={slides} autoPlay interval={5000} />
```

### Hide Dots/Buttons
```jsx
<Carousel items={slides} showDots={false} showButtons={false} />
```

## Prop Table
| Prop         | Type           | Default | Description                                      |
|--------------|----------------|---------|--------------------------------------------------|
| `items`      | `ReactNode[]`  | —       | Array of elements to display                      |
| `itemsToShow`| `number`       | 1       | Number of items visible at once                   |
| `autoPlay`   | `boolean`      | false   | Enable automatic rotation                         |
| `interval`   | `number`       | 3000    | Interval (ms) for autoplay                        |
| `showDots`   | `boolean`      | true    | Show navigation dots                              |
| `showButtons`| `boolean`      | true    | Show previous/next navigation buttons             |
| `className`  | `string`       | —       | Custom class for styling                          |
| `aria-label` | `string`       | —       | Accessible label for screen readers               |

## Accessibility
- Uses `region` or `listbox` ARIA roles
- Navigation buttons and dots are keyboard accessible
- Each slide has `aria-roledescription="slide"`
- Supports screen readers with `aria-label` and focus management
- Pause on hover for autoplay

**Example Accessible Carousel:**
```jsx
<Carousel aria-label="Featured Products" />
```

## Best Practices
- Use for showcasing images, cards, or featured content
- Limit autoplay speed for readability
- Always provide keyboard navigation
- Use descriptive `aria-label` for screen readers
- Test on all device sizes

## Troubleshooting
- If slides do not rotate, check `autoPlay` and `interval`
- For accessibility, ensure ARIA roles and labels are present
- If navigation is broken, check `showButtons` and event handlers

## Related Components
- [Tabs](./tabs.md) — For switching between views
- [Card](./card.md) — For carousel card content
- [Button](./button.md) — For navigation controls
- [Tooltip](./tooltip.md) — For slide descriptions