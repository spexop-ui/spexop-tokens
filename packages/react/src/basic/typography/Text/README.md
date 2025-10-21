# Text Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile text component for paragraphs and body text with size, weight, alignment, and semantic variant control. Features typography-driven hierarchy following Spexop design principles.

## Features

- 8 size variants (xs through 4xl)
- 3 weight variants (regular, semibold, bold)
- 4 alignment options (left, center, right, justify)
- 5 semantic variants (default, secondary, success, error, warning)
- Text truncation and line clamping
- Polymorphic rendering (p, span, div, label)
- WCAG AA+ accessible
- TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Text } from '@spexop/react';

function App() {
  return (
    <Text size="base" weight="regular">
      Body text content goes here.
    </Text>
  );
}
```

## Sizes

```tsx
<Text size="xs">Extra small text (12px)</Text>
<Text size="sm">Small text (14px)</Text>
<Text size="base">Base text (16px)</Text>
<Text size="lg">Large text (18px)</Text>
<Text size="xl">Extra large (20px)</Text>
<Text size="2xl">2X large (24px)</Text>
<Text size="3xl">3X large (30px)</Text>
<Text size="4xl">4X large (36px)</Text>
```

## Weights

```tsx
<Text weight="regular">Regular weight (400)</Text>
<Text weight="semibold">Semibold weight (600)</Text>
<Text weight="bold">Bold weight (700)</Text>
```

## Alignment

```tsx
<Text align="left">Left aligned text</Text>
<Text align="center">Center aligned text</Text>
<Text align="right">Right aligned text</Text>
<Text align="justify">Justified text</Text>
```

## Variants

```tsx
<Text variant="default">Default text color</Text>
<Text variant="secondary">Secondary muted text</Text>
<Text variant="success">Success message</Text>
<Text variant="error">Error message</Text>
<Text variant="warning">Warning message</Text>
```

## Text Utilities

### Truncation

```tsx
<Text truncate>
  This is a very long text that will be truncated with ellipsis when it exceeds the container width...
</Text>
```

### Line Clamping

```tsx
<Text clamp={2}>
  This text will be limited to 2 lines and show ellipsis if it overflows.
  Any additional text beyond two lines will be hidden.
</Text>

<Text clamp={3}>
  This text will be limited to 3 lines...
</Text>
```

## Polymorphic Rendering

### As Span

```tsx
<Text as="span" size="sm">
  Inline text
</Text>
```

### As Div

```tsx
<Text as="div" size="base">
  Block text
</Text>
```

### As Label

```tsx
<Text as="label" weight="semibold">
  Form Label
</Text>
```

## Advanced Usage

### With ARIA Live

```tsx
<Text aria-live="polite" variant="success">
  Changes saved successfully
</Text>
```

### Without Margin

```tsx
<Text noMargin>
  Text without bottom margin
</Text>
```

### Combined Styles

```tsx
<Text 
  size="lg" 
  weight="semibold" 
  align="center"
  variant="secondary"
>
  Combined styling
</Text>
```

## Common Patterns

### Hero Description

```tsx
import { Stack, Heading, Text } from '@spexop/react';

<Stack direction="vertical" gap="sm" align="center">
  <Heading level={1} weight="bold" align="center">
    Build Beautiful Interfaces
  </Heading>
  <Text size="lg" weight="regular" align="center">
    Modern design system for React applications
  </Text>
</Stack>
```

### Feature Description

```tsx
import { Stack, Heading, Text, Icon } from '@spexop/react';

<Stack direction="vertical" gap="sm">
  <Icon name="Layout" size="lg" />
  <Heading level={3} weight="semibold">
    Responsive Design
  </Heading>
  <Text weight="regular">
    Built-in responsive breakpoints that adapt to any screen size
  </Text>
</Stack>
```

### Error Message

```tsx
<Text variant="error" size="sm" aria-live="polite">
  Please enter a valid email address
</Text>
```

### Metadata Text

```tsx
<Text size="sm" variant="secondary">
  Published on October 21, 2025 · 5 min read
</Text>
```

## Design Principles

### Typography before decoration

Text uses font-weight and size for emphasis, not color or decoration (except for semantic variants).

### Tokens before magic numbers

All sizes, weights, and colors use design tokens:

- Sizes: `--theme-font-size-*`
- Weights: `--theme-font-weight-*`
- Colors: `--theme-text*`

## Accessibility

### Semantic Variants

```tsx
// Success feedback
<Text variant="success" aria-live="polite">
  Saved successfully
</Text>

// Error feedback
<Text variant="error" aria-live="assertive">
  Invalid email address
</Text>
```

### Screen Reader Support

```tsx
<Text aria-label="Descriptive text for screen readers">
  Visual text
</Text>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Text content |
| `size` | `TextSize` | `"base"` | Font size |
| `weight` | `TextWeight` | `"regular"` | Font weight |
| `align` | `TextAlign` | `"left"` | Text alignment |
| `variant` | `TextVariant` | `"default"` | Semantic variant |
| `as` | `p\|span\|div\|label` | `"p"` | Element type |
| `noMargin` | `boolean` | `false` | Remove margin |
| `truncate` | `boolean` | `false` | Truncate with ellipsis |
| `clamp` | `number` | - | Line clamp (1-5) |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | Element ID |
| `aria-label` | `string` | - | ARIA label |
| `aria-live` | `string` | - | ARIA live region |
| `aria-describedby` | `string` | - | ARIA description |

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Related Components

- Heading - For headings (h1-h6)
- Link - For navigation links
- Badge - For status indicators

## Best Practices

### Do's

- Use `weight="regular"` for body text
- Use `weight="semibold"` for emphasis
- Use `variant="secondary"` for metadata
- Use `aria-live` for dynamic content
- Use `truncate` or `clamp` for constrained layouts

### Don'ts

- Don't use Text for headings (use Heading)
- Don't rely on color alone for meaning
- Don't forget aria-live for status updates
- Don't use excessive line clamping

## License

MIT © Spexop Team
