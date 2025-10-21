# Dropdown

An accessible dropdown menu component for displaying a list of actions or options.

## Features

- Keyboard accessible (Arrow keys, Enter, Escape)
- Screen reader accessible with ARIA
- Click outside to close
- Configurable placement
- Icons support
- Disabled items
- Danger variant for destructive actions
- Dividers between items
- Controlled and uncontrolled modes
- Focus management
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Dropdown } from "@spexop/react";

const items = [
  { id: '1', label: 'Edit', onClick: () => console.log('Edit') },
  { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate') },
  { id: '3', label: 'Delete', variant: 'danger', onClick: () => console.log('Delete') },
];

function App() {
  return (
    <Dropdown items={items} trigger={<button>Actions</button>} />
  );
}
```

## With Icons

```tsx
const items = [
  { id: '1', label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
  { id: '2', label: 'Share', icon: <ShareIcon />, onClick: handleShare },
  { id: '3', label: 'Delete', icon: <DeleteIcon />, variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## With Dividers

```tsx
const items = [
  { id: '1', label: 'View', onClick: handleView },
  { id: '2', label: 'Edit', onClick: handleEdit, divider: true },
  { id: '3', label: 'Delete', variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## Placement

```tsx
{/* Bottom start (default) */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="bottom-start" />

{/* Bottom end */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="bottom-end" />

{/* Top start */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="top-start" />

{/* Top end */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="top-end" />
```

## Disabled Items

```tsx
const items = [
  { id: '1', label: 'Edit', onClick: handleEdit },
  { id: '2', label: 'Share', disabled: true },
  { id: '3', label: 'Delete', variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## Controlled Mode

```tsx
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown 
      items={items}
      trigger={<button>Actions</button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
```

## Keep Open on Click

```tsx
<Dropdown 
  items={items}
  trigger={<button>Options</button>}
  closeOnItemClick={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownMenuItem[]` | required | Menu items |
| `trigger` | `React.ReactElement` | required | Trigger element |
| `placement` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Dropdown placement |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Open state callback |
| `className` | `string` | - | Additional CSS class |
| `triggerClassName` | `string` | - | CSS class for trigger |
| `closeOnItemClick` | `boolean` | `true` | Close on item click |

### DropdownMenuItem Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `React.ReactNode` | Yes | Item label |
| `icon` | `React.ReactNode` | No | Icon to display |
| `disabled` | `boolean` | No | Whether disabled |
| `variant` | `"default" \| "danger"` | No | Item variant |
| `onClick` | `() => void` | No | Click handler |
| `divider` | `boolean` | No | Show divider after |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear hierarchy
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses `role="menu"` and `role="menuitem"` for proper semantics
- `aria-expanded` and `aria-haspopup` on trigger
- Keyboard navigation with arrow keys
- Focus management within menu
- Escape key closes menu
- Click outside closes menu
- Focus returns to trigger on close
- Screen reader friendly

## Keyboard Navigation

- **Click/Enter**: Open dropdown
- **Escape**: Close dropdown
- **Arrow Down**: Next item
- **Arrow Up**: Previous item
- **Home**: First item
- **End**: Last item
- **Enter/Space**: Activate item

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Popover - For more complex interactive content
- Tooltip - For simple hover information
- Modal - For larger overlay content
