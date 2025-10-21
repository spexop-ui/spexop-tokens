# Drawer Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A slide-out panel component that appears from the edge of the screen. Perfect for side navigation, settings panels, filters, and contextual content. Features smooth animations, backdrop, and focus management.

## Features

- ✅ 4 positions (left, right, top, bottom)
- ✅ Configurable sizes
- ✅ Backdrop overlay with click-to-close
- ✅ Focus trap when open
- ✅ Body scroll lock
- ✅ Escape key to close
- ✅ Smooth slide animations
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Drawer } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <h2>Drawer Content</h2>
        <p>This is a slide-out panel.</p>
      </Drawer>
    </>
  );
}
```

## Positions

### Right (Default)

Slides from the right edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="right"
>
  {/* Content */}
</Drawer>
```

### Left

Slides from the left edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="left"
>
  {/* Navigation menu */}
</Drawer>
```

### Top

Slides from the top edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="top"
>
  {/* Notifications */}
</Drawer>
```

### Bottom

Slides from the bottom edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="bottom"
>
  {/* Mobile filters */}
</Drawer>
```

## Sizes

### Custom Width/Height

```tsx
{/* Fixed width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="right"
  size="400px"
>
  {/* Content */}
</Drawer>

{/* Percentage width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="left"
  size="80%"
>
  {/* Content */}
</Drawer>

{/* Full width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="top"
  size="100%"
>
  {/* Content */}
</Drawer>
```

## Common Use Cases

### Navigation Menu

```tsx
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        size="320px"
      >
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </Drawer>
    </>
  );
}
```

### Settings Panel

```tsx
function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      size="420px"
    >
      <h2>Settings</h2>
      
      <SettingsCard title="Theme">
        <Select value={theme} onChange={setTheme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </Select>
      </SettingsCard>
      
      <Button onClick={() => setIsOpen(false)}>
        Close
      </Button>
    </Drawer>
  );
}
```

### Filter Panel

```tsx
function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    inStock: true,
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="left"
      size="360px"
    >
      <h2>Filters</h2>
      
      <Select
        label="Category"
        value={filters.category}
        onChange={(e) => 
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </Select>
      
      <Toggle
        label="In Stock Only"
        checked={filters.inStock}
        onChange={(checked) =>
          setFilters({ ...filters, inStock: checked })
        }
      />
      
      <Button onClick={() => setIsOpen(false)}>
        Apply Filters
      </Button>
    </Drawer>
  );
}
```

### Sheet (Bottom Drawer)

```tsx
function MobileSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="bottom"
      size="auto"
    >
      <div style={{ padding: '24px' }}>
        <h3>Share</h3>
        <button>Copy Link</button>
        <button>Email</button>
        <button>Social Media</button>
      </div>
    </Drawer>
  );
}
```

## Props

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: string;
  children: React.ReactNode;
  className?: string;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean edge separation
2. **Typography before decoration** - Clear content hierarchy
3. **Tokens before magic numbers** - Uses spacing and transition tokens
4. **Accessibility before aesthetics** - Focus trap and keyboard support

## Accessibility

- ✅ Focus trap when open
- ✅ Focus returns to trigger on close
- ✅ Escape key closes drawer
- ✅ Body scroll lock when open
- ✅ ARIA role="dialog"
- ✅ ARIA labels for screen readers
- ✅ Backdrop click closes drawer
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Escape` - Close drawer
- `Tab` - Cycle through focusable elements (trapped in drawer)
- `Shift + Tab` - Reverse cycle

## Animation

Smooth slide animations with easing:

- **Duration**: 250ms
- **Easing**: ease-in-out
- **Transform**: translateX/translateY based on position

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Modal` - Centered dialog overlay
- `Sidebar` - Persistent side navigation
- `Popover` - Floating content container
- `CommandPalette` - Quick actions overlay

## License

MIT
