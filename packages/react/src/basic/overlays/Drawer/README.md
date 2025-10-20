# Drawer

Side panel/drawer component that slides in from any edge. Perfect for settings panels, navigation menus, shopping carts, and detail views. Features backdrop, focus trap, and smooth animations.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Drawer } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Drawer, Button } from '@spexop/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <h2>Drawer Content</h2>
        <p>Your content here...</p>
      </Drawer>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **Required** | Whether drawer is open |
| `onClose` | `() => void` | **Required** | Close callback |
| `children` | `ReactNode` | **Required** | Drawer content |
| `position` | `"left"` \| `"right"` \| `"top"` \| `"bottom"` | `"right"` | Slide direction |
| `size` | `string` | `"400px"` | Width (left/right) or height (top/bottom) |
| `showBackdrop` | `boolean` | `true` | Show semi-transparent backdrop |
| `closeOnBackdropClick` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `lockScroll` | `boolean` | `true` | Lock body scroll when open |
| `trapFocus` | `boolean` | `true` | Trap focus within drawer |
| `className` | `string` | `""` | Additional CSS class |
| `title` | `string` | `undefined` | Optional drawer title |

## Examples

### Right Drawer (Default)

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
>
  <p>Settings content...</p>
</Drawer>
```

### Left Drawer

```tsx
<Drawer
  isOpen={menuOpen}
  onClose={() => setMenuOpen(false)}
  position="left"
  title="Navigation"
>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</Drawer>
```

### Top Drawer

```tsx
<Drawer
  isOpen={notificationsOpen}
  onClose={() => setNotificationsOpen(false)}
  position="top"
  size="200px"
  title="Notifications"
>
  <p>No new notifications</p>
</Drawer>
```

### Bottom Drawer

```tsx
<Drawer
  isOpen={sheetOpen}
  onClose={() => setSheetOpen(false)}
  position="bottom"
  size="300px"
  title="Options"
>
  <Button fullWidth>Option 1</Button>
  <Button fullWidth>Option 2</Button>
</Drawer>
```

### Custom Size

```tsx
// Wide drawer
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  size="600px"
>
  {content}
</Drawer>

// Narrow drawer
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  size="300px"
>
  {content}
</Drawer>
```

### Without Backdrop

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  showBackdrop={false}
>
  {content}
</Drawer>
```

### Prevent Close on Backdrop Click

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  closeOnBackdropClick={false}
  title="Unsaved Changes"
>
  <p>Please save or discard your changes before closing.</p>
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={onClose}>Discard</Button>
</Drawer>
```

### Settings Panel

```tsx
import { Drawer, Stack, Toggle, Select, Button } from '@spexop/react';

function SettingsDrawer({ isOpen, onClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      position="right"
      size="500px"
    >
      <Stack direction="vertical" gap={6}>
        <div>
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark mode"
          />
        </div>
        
        <div>
          <label htmlFor="language">Language</label>
          <Select
            id="language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' }
            ]}
          />
        </div>
        
        <Stack direction="horizontal" gap={3} justify="end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
```

### Shopping Cart

```tsx
function CartDrawer({ isOpen, onClose, items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping Cart"
      position="right"
      size="450px"
    >
      <Stack direction="vertical" gap={4}>
        {items.map(item => (
          <Card key={item.id}>
            <CardBody>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </CardBody>
          </Card>
        ))}
        
        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <p><strong>Total: ${total}</strong></p>
          <Button variant="primary" fullWidth>
            Checkout
          </Button>
        </div>
      </Stack>
    </Drawer>
  );
}
```

### Detail View

```tsx
function UserDetailDrawer({ user, isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={user.name}
      size="500px"
    >
      <Stack direction="vertical" gap={6}>
        <div>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
          />
        </div>
        
        <div>
          <h3>Contact</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
        
        <div>
          <h3>Bio</h3>
          <p>{user.bio}</p>
        </div>
        
        <Stack direction="horizontal" gap={3}>
          <Button variant="primary">Edit</Button>
          <Button variant="outline">Message</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Escape** | Close drawer (if closeOnEscape=true) |
| **Tab** | Move to next focusable element (trapped within drawer) |
| **Shift + Tab** | Move to previous focusable element (trapped) |

## Accessibility

### ARIA Attributes

- `role="dialog"` - Identifies drawer as dialog
- `aria-modal="true"` - Modal dialog behavior
- `aria-labelledby` - References title
- `aria-describedby` - References description (if provided)

### Focus Management

- ✅ Traps focus within drawer when open (if trapFocus=true)
- ✅ Returns focus to trigger on close
- ✅ Focuses first interactive element on open
- ✅ Keyboard navigation within drawer

### Body Scroll Lock

- ✅ Locks body scroll when drawer open (prevents background scrolling)
- ✅ Automatically unlocks on close
- ✅ Handles nested drawers correctly

### Screen Readers

- Announces when drawer opens
- Announces drawer title
- Announces role as "dialog"
- Announces modal state

## Styling

### Custom Styling

```tsx
<Drawer
  className="my-drawer"
  isOpen={isOpen}
  onClose={onClose}
>
  {content}
</Drawer>
```

```css
.my-drawer {
  /* Custom styles for drawer content */
  padding: var(--s-spacing-8);
}
```

### Design Tokens

Uses tokens for consistent styling:

- Colors: `--s-color-neutral-*`, `--s-color-red-500`
- Spacing: `--s-spacing-*`
- Shadows: `--s-shadow-xl`
- Transitions: `--s-transition-base`
- Z-index: `--s-z-drawer` (300)

## When to Use

### Use Drawer When ✅

- Settings panels
- Shopping carts
- Navigation menus (mobile)
- Detail views
- Filters and options
- User profiles

### Use Modal/Dialog Instead When

- Require user decision/action
- Block main content interaction
- Centered content preferred
- Critical confirmations

### Use Sidebar Instead When

- Permanent navigation
- Always visible (desktop)
- Tree-based navigation
- App-level navigation

## Best Practices

### Do ✅

```tsx
// Provide close callback
<Drawer isOpen={isOpen} onClose={handleClose} />

// Use appropriate position
<Drawer position="right" /> // Settings, details
<Drawer position="left" /> // Navigation
<Drawer position="bottom" /> // Mobile sheets

// Lock scroll for better UX
<Drawer lockScroll={true} />

// Trap focus for accessibility
<Drawer trapFocus={true} />

// Provide title for screen readers
<Drawer title="Settings" />
```

### Don't ❌

```tsx
// Don't skip onClose handler
<Drawer isOpen={true} /> // User can't close it

// Don't use for critical confirmations
<Drawer>Delete account?</Drawer> // Use Modal instead

// Don't make too wide
<Drawer size="90vw" /> // Use Modal for full-width

// Don't disable closeOnEscape without good reason
<Drawer closeOnEscape={false} /> // Frustrates users

// Don't nest multiple drawers
<Drawer>
  <Drawer> // Confusing UX
</Drawer>
```

## Related Components

- **Sidebar** - Permanent navigation drawer
- **SearchModal** - Full-screen search
- **CommandPalette** - Command interface
- **SettingsPanel** - Pre-built settings drawer

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance

- Portal-based rendering (renders at document root)
- CSS-only animations (GPU-accelerated)
- Efficient event listeners
- Lazy rendering (only when open)

---

**Part of Overlay Components** - Modal dialogs and overlay interfaces for enhanced UX.
