# NavSection Component - Usage Guide

## Common Patterns

### Basic Collapsible Section

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

function AppSidebar() {
  return (
    <Sidebar isOpen={true}>
      <NavLink href="/" active>Dashboard</NavLink>
      
      <NavSection label="Projects" defaultOpen={true}>
        <NavLink href="/projects/active">Active</NavLink>
        <NavLink href="/projects/archived">Archived</NavLink>
        <NavLink href="/projects/templates">Templates</NavLink>
      </NavSection>
      
      <NavLink href="/settings">Settings</NavLink>
    </Sidebar>
  );
}
```

### Documentation Sidebar

```tsx
import { Sidebar, NavLink, NavSection } from '@spexop/react';

function DocsSidebar() {
  return (
    <Sidebar isOpen={true}>
      <NavSection label="Getting Started" defaultOpen={true}>
        <NavLink href="/docs/installation">Installation</NavLink>
        <NavLink href="/docs/quick-start">Quick Start</NavLink>
        <NavLink href="/docs/configuration">Configuration</NavLink>
      </NavSection>

      <NavSection label="Components" defaultOpen={true}>
        <NavLink href="/docs/button">Button</NavLink>
        <NavLink href="/docs/card">Card</NavLink>
        <NavLink href="/docs/modal">Modal</NavLink>
        <NavLink href="/docs/tabs">Tabs</NavLink>
      </NavSection>

      <NavSection label="Guides" defaultOpen={false}>
        <NavLink href="/docs/guides/theming">Theming</NavLink>
        <NavLink href="/docs/guides/accessibility">Accessibility</NavLink>
        <NavLink href="/docs/guides/testing">Testing</NavLink>
      </NavSection>

      <NavSection label="API Reference" defaultOpen={false}>
        <NavLink href="/docs/api/components">Components</NavLink>
        <NavLink href="/docs/api/hooks">Hooks</NavLink>
        <NavLink href="/docs/api/utils">Utilities</NavLink>
      </NavSection>
    </Sidebar>
  );
}
```

### Controlled Section State

```tsx
import { NavSection, NavLink } from '@spexop/react';
import { useState } from 'react';

function ControlledSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavSection 
      label="Settings" 
      defaultOpen={isOpen}
      onToggle={(open) => {
        setIsOpen(open);
        // Save to localStorage
        localStorage.setItem('settings-section-open', String(open));
      }}
    >
      <NavLink href="/settings/profile">Profile</NavLink>
      <NavLink href="/settings/security">Security</NavLink>
      <NavLink href="/settings/notifications">Notifications</NavLink>
    </NavSection>
  );
}
```

### Nested Sections

```tsx
import { NavSection, NavLink } from '@spexop/react';

<Sidebar isOpen={true}>
  <NavSection label="Administration" defaultOpen={true}>
    <NavLink href="/admin/overview">Overview</NavLink>
    
    <NavSection label="User Management" defaultOpen={false}>
      <NavLink href="/admin/users">Users</NavLink>
      <NavLink href="/admin/roles">Roles</NavLink>
      <NavLink href="/admin/permissions">Permissions</NavLink>
    </NavSection>
    
    <NavSection label="System" defaultOpen={false}>
      <NavLink href="/admin/settings">Settings</NavLink>
      <NavLink href="/admin/logs">Logs</NavLink>
    </NavSection>
  </NavSection>
</Sidebar>
```

### With Icons

```tsx
import { NavSection, NavLink } from '@spexop/react';
import { FileText, Image, Video, Music } from '@spexop/icons';

<NavSection label="Media Library" defaultOpen={true}>
  <NavLink href="/media/documents">
    <FileText size={18} strokeWidth={2} />
    <span>Documents</span>
  </NavLink>
  <NavLink href="/media/images">
    <Image size={18} strokeWidth={2} />
    <span>Images</span>
  </NavLink>
  <NavLink href="/media/videos">
    <Video size={18} strokeWidth={2} />
    <span>Videos</span>
  </NavLink>
  <NavLink href="/media/audio">
    <Music size={18} strokeWidth={2} />
    <span>Audio</span>
  </NavLink>
</NavSection>
```

### Persist State in LocalStorage

```tsx
import { NavSection, NavLink } from '@spexop/react';
import { useState, useEffect } from 'react';

function PersistentSection({ label, children, storageKey }) {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOpen));
  }, [isOpen, storageKey]);

  return (
    <NavSection 
      label={label} 
      defaultOpen={isOpen}
      onToggle={setIsOpen}
    >
      {children}
    </NavSection>
  );
}

// Usage
<PersistentSection label="Projects" storageKey="nav-projects-open">
  <NavLink href="/projects/active">Active</NavLink>
  <NavLink href="/projects/archived">Archived</NavLink>
</PersistentSection>
```

## Design Tokens

```css
/* Section header */
padding: var(--theme-spacing-3) var(--theme-spacing-4)
font-weight: var(--theme-font-weight-semibold)
color: var(--theme-text-secondary)

/* Section content */
padding-left: var(--theme-spacing-6)
border-left: var(--theme-border-width) solid var(--theme-border)
```

## Accessibility

### Disclosure Widget

NavSection follows ARIA disclosure pattern:

```html
<div>
  <button 
    aria-expanded="true"
    aria-controls="section-content"
  >
    Section Label
  </button>
  <div id="section-content">
    <!-- Links -->
  </div>
</div>
```

### Keyboard Navigation

- Tab to focus section toggle
- Enter/Space to expand/collapse
- Tab to navigate into expanded content
- Escape to close section (optional)

## Best Practices

### Do's

- Use for related navigation groups
- Provide clear section labels
- Set sensible default states
- Use onToggle to persist state
- Keep sections focused (3-7 items)

### Don'ts

- Don't nest too deeply (max 2 levels)
- Don't create single-item sections
- Don't forget defaultOpen state
- Don't use for unrelated items

## Performance

- Only renders children when expanded
- Controlled state for optimization
- CSS Modules for scoped styling
- Minimal re-renders

## Related

- NavLink - Sidebar links
- Sidebar - Container for navigation
- Link - General-purpose links
