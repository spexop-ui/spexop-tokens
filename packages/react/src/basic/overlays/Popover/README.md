# Popover

An accessible popover component for displaying rich content in an overlay.

## Features

- Click or hover trigger
- Keyboard accessible (Escape to close)
- Screen reader accessible with ARIA
- Click outside to close
- Configurable placement (top, right, bottom, left)
- Optional arrow pointer
- Controlled and uncontrolled modes
- Focus management
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Popover } from "@spexop/react";

function App() {
  return (
    <Popover trigger={<button>Click me</button>}>
      <div>Popover content here</div>
    </Popover>
  );
}
```

## With Title

```tsx
<Popover 
  trigger={<button>Info</button>}
  title="Additional Information"
>
  <p>This is some helpful information about the feature.</p>
</Popover>
```

## Placement

```tsx
{/* Top */}
<Popover trigger={<button>Top</button>} placement="top">
  <div>Content</div>
</Popover>

{/* Right */}
<Popover trigger={<button>Right</button>} placement="right">
  <div>Content</div>
</Popover>

{/* Bottom (default) */}
<Popover trigger={<button>Bottom</button>} placement="bottom">
  <div>Content</div>
</Popover>

{/* Left */}
<Popover trigger={<button>Left</button>} placement="left">
  <div>Content</div>
</Popover>
```

## Hover Trigger

```tsx
<Popover 
  trigger={<button>Hover me</button>}
  triggerType="hover"
>
  <div>Shows on hover</div>
</Popover>
```

## Without Arrow

```tsx
<Popover 
  trigger={<button>No arrow</button>}
  showArrow={false}
>
  <div>Content</div>
</Popover>
```

## Controlled Mode

```tsx
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover 
      trigger={<button>Toggle</button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <div>Controlled content</div>
    </Popover>
  );
}
```

## Rich Content Example

```tsx
<Popover 
  trigger={<button>User Info</button>}
  title="John Doe"
>
  <div>
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Role:</strong> Developer</p>
    <button>View Profile</button>
  </div>
</Popover>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactElement` | required | Trigger element |
| `children` | `React.ReactNode` | required | Popover content |
| `title` | `React.ReactNode` | - | Popover title |
| `placement` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Placement |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Open state callback |
| `triggerType` | `"click" \| "hover"` | `"click"` | Trigger type |
| `showArrow` | `boolean` | `true` | Show arrow pointer |
| `className` | `string` | - | Additional CSS class |
| `triggerClassName` | `string` | - | CSS class for trigger |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear hierarchy with bold title
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses `role="dialog"` for proper semantics
- `aria-expanded` and `aria-haspopup` on trigger
- Escape key closes popover
- Click outside closes popover
- Focus returns to trigger on close
- Screen reader friendly
- Keyboard accessible

## Keyboard Navigation

- **Click/Enter**: Open popover (if click trigger)
- **Escape**: Close popover
- **Tab**: Navigate through interactive content

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Tooltip - For simple hover information
- Dropdown - For menu actions
- Modal - For larger overlay content

