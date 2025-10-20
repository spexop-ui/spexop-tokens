# Sidebar Component

Main sidebar navigation with responsive behavior and accessibility features.

## Features

- **Responsive**: Desktop side-by-side, mobile full-screen overlay
- **CLS Optimized**: Static 320px width (no layout shift)
- **Accessibility**: Body scroll lock, focus trap, keyboard navigation
- **Animations**: Smooth slide-in/out transitions
- **Dark Theme**: Full dark mode support

## Usage

### Basic Sidebar

```tsx
import { Sidebar, NavSection, NavLink, SidebarFooter } from '@spexop/react';

function App() {
  return (
    <Sidebar>
      <NavSection label="Getting Started" defaultOpen>
        <NavLink href="/installation">Installation</NavLink>
        <NavLink href="/quickstart">Quick Start</NavLink>
      </NavSection>

      <NavSection label="Components">
        <NavLink href="/button">Button</NavLink>
        <NavLink href="/card">Card</NavLink>
      </NavSection>

      <SidebarFooter>
        <select>
          <option>v3.0 (latest)</option>
        </select>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### Controlled Sidebar (Mobile Toggle)

```tsx
import { Sidebar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {/* Navigation content */}
    </Sidebar>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Sidebar content (NavSection, NavLink, etc.) |
| `isOpen` | `boolean` | `true` | Whether sidebar is open (controlled mode) |
| `onClose` | `() => void` | - | Callback when sidebar is closed (mobile) |
| `showHeader` | `boolean` | `true` | Show header with close button on mobile |
| `headerTitle` | `string` | `"Navigation"` | Header title text |
| `className` | `string` | `""` | Additional CSS class |

## Responsive Behavior

### Desktop (≥ 768px)

- Side-by-side layout
- 320px static width
- Always visible
- No overlay, no backdrop
- No header

### Mobile (< 768px)

- Fixed overlay (top: 64px)
- Full width
- Slides in from left
- Body scroll locked when open
- Focus trapped when open
- Backdrop with click-to-close
- Escape key to close
- Header with close button

## Accessibility

- ✅ **Body Scroll Lock**: Prevents background scrolling on mobile
- ✅ **Focus Trap**: Keeps focus within sidebar on mobile
- ✅ **Escape Key**: Closes sidebar on mobile
- ✅ **ARIA**: `aria-label="Main navigation"`, `aria-hidden` on mobile
- ✅ **Keyboard**: Full keyboard navigation support
- ✅ **Touch Targets**: 44px+ min-height on mobile

## CLS Optimization

The sidebar maintains a **static 320px width** on desktop/tablet to prevent Cumulative Layout Shift (CLS):

- **Mobile**: Full width overlay (no CLS impact)
- **Tablet/Desktop**: 320px static width (CLS score: 0)

## Composition

Use with these components:

- `NavSection` - Accordion-style sections
- `NavLink` - Navigation links with active state
- `SidebarFooter` - Footer content (version selector, etc.)

## Examples

See `Sidebar.example.tsx` for complete usage examples.
