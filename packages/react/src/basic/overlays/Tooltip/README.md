# Tooltip

An accessible tooltip component that provides contextual information on hover or focus.

## Features

- Keyboard accessible (shows on focus)
- Screen reader accessible with `aria-describedby`
- Configurable placement (top, right, bottom, left)
- Configurable delay before showing
- Optional arrow pointer
- Touch device support
- Escape key to close
- WCAG AA+ compliant with high contrast

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Tooltip } from "@spexop/react";

function App() {
  return (
    <Tooltip content="This is helpful information">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Placement

```tsx
<Tooltip content="Top tooltip" placement="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <button>Left</button>
</Tooltip>
```

## With Delay

```tsx
<Tooltip content="Shows after 500ms" delay={500}>
  <button>Delayed tooltip</button>
</Tooltip>
```

## Without Arrow

```tsx
<Tooltip content="No arrow" showArrow={false}>
  <button>No arrow</button>
</Tooltip>
```

## Complex Content

```tsx
<Tooltip 
  content={
    <div>
      <strong>Title</strong>
      <p>Detailed description here</p>
    </div>
  }
>
  <button>Rich content</button>
</Tooltip>
```

## Disabled State

```tsx
<Tooltip content="This won't show" disabled>
  <button>Disabled tooltip</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactElement` | required | Element to wrap with tooltip |
| `content` | `React.ReactNode` | required | Tooltip content |
| `placement` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Tooltip placement |
| `delay` | `number` | `300` | Delay before showing (ms) |
| `disabled` | `boolean` | `false` | Whether tooltip is disabled |
| `className` | `string` | - | Additional CSS class for tooltip |
| `triggerClassName` | `string` | - | Additional CSS class for trigger |
| `id` | `string` | auto-generated | ID for accessibility |
| `showArrow` | `boolean` | `true` | Whether to show arrow pointer |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Subtle border with minimal shadow for depth
- **Principle 3: Typography before decoration** - Clear, readable text
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with high contrast

## Accessibility

- Uses `aria-describedby` to associate tooltip with trigger
- Shows on both hover and keyboard focus
- Supports Escape key to close
- High contrast text (WCAG AAA)
- Screen reader friendly
- Keyboard navigation support
- Touch device support

## Keyboard Navigation

- **Tab**: Focus on trigger element (shows tooltip)
- **Escape**: Hide tooltip
- **Shift + Tab**: Move to previous element (hides tooltip)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Modal - For larger content that requires interaction
- Popover - For interactive content in an overlay
- Snackbar - For temporary notifications
