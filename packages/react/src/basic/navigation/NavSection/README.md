# NavSection Component

**Status**: ✅ Production Ready | **Version**: 0.2.0

A collapsible accordion section for grouping navigation links in a sidebar.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#sidebar-navigation-system)

## Overview

The `NavSection` component provides an accordion-style container for organizing navigation links into collapsible sections within a Sidebar.

## Features

✅ **Accordion Behavior**: Expand/collapse with smooth animations  
✅ **Auto-Close**: Only one section open at a time (when managed)  
✅ **Smooth Animations**: Max-height transition with cubic-bezier easing  
✅ **Icon Animation**: + to × rotation on expand  
✅ **Accessibility**: ARIA attributes and keyboard support  
✅ **Dark Mode**: Automatic theme support

---

## Installation

```tsx
import { NavSection, NavLink } from '@spexop/react';
```

---

## Basic Usage

```tsx
import { NavSection, NavLink } from '@spexop/react';

function Sidebar() {
  return (
    <NavSection label="Components" defaultOpen>
      <NavLink href="/button">Button</NavLink>
      <NavLink href="/card">Card</NavLink>
      <NavLink href="/badge">Badge</NavLink>
    </NavSection>
  );
}
```

---

## Props

### `NavSectionProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Section heading text |
| `defaultOpen` | `boolean` | `false` | Initial open/closed state |
| `children` | `ReactNode` | **required** | Content (usually NavLink components) |
| `onToggle` | `(isOpen: boolean) => void` | `undefined` | Callback when section expands/collapses |
| `className` | `string` | `""` | Additional CSS classes |

---

## Examples

### Multiple Sections

```tsx
import { NavSection, NavLink } from '@spexop/react';

function Sidebar() {
  return (
    <>
      <NavSection label="Foundation" defaultOpen>
        <NavLink href="/grid">Grid</NavLink>
        <NavLink href="/stack">Stack</NavLink>
        <NavLink href="/container">Container</NavLink>
      </NavSection>

      <NavSection label="Components">
        <NavLink href="/button">Button</NavLink>
        <NavLink href="/card">Card</NavLink>
        <NavLink href="/badge">Badge</NavLink>
      </NavSection>

      <NavSection label="Documentation">
        <NavLink href="/tokens">Design Tokens</NavLink>
        <NavLink href="/icons">Icons</NavLink>
        <NavLink href="/getting-started">Getting Started</NavLink>
      </NavSection>
    </>
  );
}
```

### With State Management (Auto-Close)

```tsx
import { NavSection, NavLink } from '@spexop/react';
import { useState } from 'react';

function Sidebar() {
  const [openSection, setOpenSection] = useState<string | null>('foundation');

  return (
    <>
      <NavSection 
        label="Foundation"
        defaultOpen={openSection === 'foundation'}
        onToggle={(isOpen) => setOpenSection(isOpen ? 'foundation' : null)}
      >
        <NavLink href="/grid">Grid</NavLink>
        <NavLink href="/stack">Stack</NavLink>
      </NavSection>

      <NavSection 
        label="Components"
        defaultOpen={openSection === 'components'}
        onToggle={(isOpen) => setOpenSection(isOpen ? 'components' : null)}
      >
        <NavLink href="/button">Button</NavLink>
        <NavLink href="/card">Card</NavLink>
      </NavSection>
    </>
  );
}
```

### With useAccordion Hook

```tsx
import { NavSection, NavLink, useAccordion } from '@spexop/react';

function Sidebar() {
  const { isOpen, toggle } = useAccordion('foundation');

  return (
    <>
      <NavSection 
        label="Foundation"
        defaultOpen={isOpen('foundation')}
        onToggle={() => toggle('foundation')}
      >
        <NavLink href="/grid">Grid</NavLink>
        <NavLink href="/stack">Stack</NavLink>
      </NavSection>

      <NavSection 
        label="Components"
        defaultOpen={isOpen('components')}
        onToggle={() => toggle('components')}
      >
        <NavLink href="/button">Button</NavLink>
        <NavLink href="/card">Card</NavLink>
      </NavSection>
    </>
  );
}
```

---

## Styling

### CSS Variables

```css
/* Spacing */
--s-spacing-2 (8px) - content padding bottom
--s-spacing-4 (16px) - button padding
--s-spacing-5 (20px) - button padding

/* Typography */
--s-font-size-sm (14px)
--s-font-weight-bold (700)
--s-font-weight-bold (700)

/* Colors */
--s-color-neutral-200 (border)
--s-color-neutral-900 (label text)
--s-color-neutral-700 (icon)
--s-color-neutral-100 (hover background)

/* Animation */
--s-duration-normal (300ms)
cubic-bezier(0.4, 0, 0.2, 1)
```

### Animation Details

**Expand Icon**:

- Default: `+` symbol
- Expanded: Rotates 45° to form `×`
- Transition: `transform 300ms ease`

**Content Area**:

- Collapsed: `max-height: 0`
- Expanded: `max-height: 800px`
- Transition: `max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)`

---

## Accessibility

### ARIA Attributes

```tsx
<button 
  aria-expanded={isOpen}
  aria-controls="section-content-id"
>
  Section Label
</button>

<section 
  id="section-content-id"
  aria-labelledby="section-button-id"
>
  {children}
</section>
```

### Keyboard Navigation

- ✅ **Tab**: Navigate to section button
- ✅ **Enter/Space**: Toggle section open/closed
- ✅ **Focus indicator**: 2px red outline

---

## Best Practices

### 1. **Default Open State**

Open the section containing the current page:

```tsx
const location = useLocation();
const isComponentsRoute = location.pathname.startsWith('/components');

<NavSection label="Components" defaultOpen={isComponentsRoute}>
  <NavLink href="/components/button">Button</NavLink>
</NavSection>
```

### 2. **Auto-Close Behavior**

Use state to ensure only one section is open:

```tsx
const [openSection, setOpenSection] = useState('foundation');

<NavSection 
  label="Foundation"
  defaultOpen={openSection === 'foundation'}
  onToggle={(isOpen) => setOpenSection(isOpen ? 'foundation' : null)}
>
  {/* links */}
</NavSection>
```

### 3. **Content Organization**

Group related links logically:

```tsx
// Good: Organized by feature area
<NavSection label="Foundation">
  <NavLink href="/grid">Grid</NavLink>
  <NavLink href="/stack">Stack</NavLink>
</NavSection>

// Avoid: Mixing unrelated items
<NavSection label="Misc">
  <NavLink href="/grid">Grid</NavLink>
  <NavLink href="/about">About</NavLink>
</NavSection>
```

---

## TypeScript Support

```tsx
import { NavSection, type NavSectionProps } from "@spexop/react";

const props: NavSectionProps = {
  label: "Settings",
  defaultOpen: false,
  onToggle: (isOpen) => console.log('Section toggled:', isOpen)
};

<NavSection {...props}>
  {/* NavLink children */}
</NavSection>
```

## Performance

- Lightweight: < 1KB gzipped
- Smooth CSS transitions
- No layout shifts

## Related Components

- [NavLink](../NavLink/README.md) - Individual navigation links
- [Sidebar](../Sidebar/README.md) - Main navigation container
- [SidebarFooter](../SidebarFooter/README.md) - Footer section
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization

---

## License

MIT
