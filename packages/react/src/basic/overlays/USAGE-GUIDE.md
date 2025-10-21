# Overlay Components - Usage Guide

**Component Version**: v0.2.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react @spexop/icons @spexop/theme
```

### Basic Imports

```tsx
import {
  Modal,
  Drawer,
  Tooltip,
  Snackbar,
  CommandPalette,
  Dropdown,
  Popover,
  SearchModal
} from '@spexop/react';
```

### Minimal Example

```tsx
import { useState } from 'react';
import { Modal, Button } from '@spexop/react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Hello">
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

## Overview

The overlay components provide various ways to display content on top of the main application interface. Each component serves a specific purpose:

- **Modal**: Full-featured dialog for important content that requires user attention
- **Drawer**: Slide-in panel from any edge for contextual content or actions
- **Tooltip**: Small contextual hints that appear on hover or focus
- **Snackbar**: Brief, unobtrusive notification messages
- **CommandPalette**: Spotlight-style command launcher with keyboard navigation
- **Dropdown**: Menu of actions or options triggered by a button
- **Popover**: Rich content overlay anchored to a trigger element
- **SearchModal**: Full-featured search interface with categorized results

## Common Patterns

### Z-Index Management

All overlay components use consistent z-index values from the theme system:

- **Modal**: `z-index: 1000` (highest priority)
- **CommandPalette**: `z-index: 1000`
- **SearchModal**: `z-index: 1000`
- **Drawer**: `z-index: 900`
- **Dropdown**: `z-index: 800`
- **Popover**: `z-index: 800`
- **Tooltip**: `z-index: 700`
- **Snackbar**: `z-index: 600`

This ensures proper stacking when multiple overlays are used together.

### Focus Management

Most overlay components implement proper focus management:

1. **Focus Trap**: Keyboard navigation stays within the overlay (Modal, Drawer, CommandPalette)
2. **Initial Focus**: Automatically focus the first interactive element
3. **Focus Restoration**: Return focus to the trigger element on close
4. **Escape Key**: Close the overlay and restore focus

### Body Scroll Lock

Components that cover the viewport (Modal, CommandPalette, SearchModal, Drawer) automatically lock body scroll to prevent background scrolling.

### Portal Rendering

Large overlays (Modal, CommandPalette, SearchModal) render to `document.body` using React portals to avoid z-index and overflow issues.

## Modal Component

### Overview of the Modal Component

The Modal component is a full-featured dialog for displaying important content that requires user attention and action.

### Basic Usage of the Modal Component

```tsx
import { useState } from 'react';
import { Modal, Button } from '@spexop/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
}
```

### With Footer Actions of the Modal Component

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>This action cannot be undone.</p>
</Modal>
```

### Size Variants of the Modal Component

```tsx
// Small modal
<Modal size="sm" isOpen={isOpen} onClose={onClose} title="Small">
  <p>Compact content</p>
</Modal>

// Medium (default)
<Modal size="md" isOpen={isOpen} onClose={onClose} title="Medium">
  <p>Standard content</p>
</Modal>

// Large
<Modal size="lg" isOpen={isOpen} onClose={onClose} title="Large">
  <p>More spacious content</p>
</Modal>

// Extra large
<Modal size="xl" isOpen={isOpen} onClose={onClose} title="Extra Large">
  <p>Maximum width content</p>
</Modal>

// Full screen
<Modal size="full" isOpen={isOpen} onClose={onClose} title="Full Screen">
  <p>Takes entire viewport</p>
</Modal>
```

### Without Close Button of the Modal Component

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Forced Action"
  showCloseButton={false}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <p>User must interact with buttons to close</p>
  <Button onClick={handleAction}>Complete Action</Button>
</Modal>
```

### Initial Focus Control of the Modal Component

```tsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enter Name"
      initialFocusRef={inputRef}
    >
      <input ref={inputRef} type="text" placeholder="Name" />
    </Modal>
  );
}
```

### Best Practices of the Modal Component

- Use modals sparingly for critical actions that require immediate attention
- Always provide a clear way to close the modal (X button, Cancel, or Escape)
- Keep modal content focused and concise
- Use appropriate size variants based on content
- Provide clear action buttons in the footer
- Consider using Drawer for less critical or contextual content

## Drawer Component

### Overview of the Drawer Component

The Drawer component provides a slide-in panel from any edge of the screen for contextual content or secondary actions.

### Basic Usage of the Drawer Component

```tsx
import { useState } from 'react';
import { Drawer, Button } from '@spexop/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Drawer Content</h2>
        <p>Your content here...</p>
      </Drawer>
    </>
  );
}
```

### Position Variants of the Drawer Component

```tsx
// From right (default)
<Drawer isOpen={isOpen} onClose={onClose} position="right">
  <p>Slides from right</p>
</Drawer>

// From left
<Drawer isOpen={isOpen} onClose={onClose} position="left">
  <p>Slides from left</p>
</Drawer>

// From top
<Drawer isOpen={isOpen} onClose={onClose} position="top">
  <p>Slides from top</p>
</Drawer>

// From bottom
<Drawer isOpen={isOpen} onClose={onClose} position="bottom">
  <p>Slides from bottom</p>
</Drawer>
```

### Custom Size of the Drawer Component

```tsx
// Custom width for left/right drawers
<Drawer isOpen={isOpen} onClose={onClose} position="right" size="500px">
  <p>500px wide drawer</p>
</Drawer>

// Custom height for top/bottom drawers
<Drawer isOpen={isOpen} onClose={onClose} position="bottom" size="300px">
  <p>300px tall drawer</p>
</Drawer>

// Percentage sizes
<Drawer isOpen={isOpen} onClose={onClose} size="50vw">
  <p>Half viewport width</p>
</Drawer>
```

### Without Backdrop of the Drawer Component

```tsx
<Drawer 
  isOpen={isOpen} 
  onClose={onClose} 
  showBackdrop={false}
>
  <p>No backdrop overlay</p>
</Drawer>
```

### Persistent Drawer

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <p>Must use explicit close button</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Drawer>
```

### Best Practices

- Use drawers for contextual actions, filters, or secondary navigation
- Right-side drawers are most common for forms and details
- Left-side drawers work well for navigation menus
- Bottom drawers are good for mobile-friendly action sheets
- Keep drawer content organized with clear sections
- Provide a clear close mechanism

## Tooltip Component

### Overview of the Tooltip Component

The Tooltip component provides contextual hints that appear on hover or focus, helping users understand interface elements.

### Basic Usage of the Tooltip Component

```tsx
import { Tooltip, Button } from '@spexop/react';

function MyComponent() {
  return (
    <Tooltip content="This is helpful information">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

### Placement Options of the Tooltip Component

```tsx
// Top (default)
<Tooltip content="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>

// Right
<Tooltip content="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>

// Bottom
<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

// Left
<Tooltip content="Left tooltip" placement="left">
  <Button>Left</Button>
</Tooltip>
```

### Custom Delay of the Tooltip Component

```tsx
// Instant tooltip
<Tooltip content="Instant" delay={0}>
  <Button>No delay</Button>
</Tooltip>

// Slower tooltip
<Tooltip content="Delayed" delay={1000}>
  <Button>1 second delay</Button>
</Tooltip>
```

### Without Arrow of the Tooltip Component

```tsx
<Tooltip content="No arrow" showArrow={false}>
  <Button>Hover</Button>
</Tooltip>
```

### Rich Content of the Tooltip Component

```tsx
<Tooltip 
  content={
    <div>
      <strong>Pro Tip</strong>
      <p>Use keyboard shortcuts for faster work</p>
    </div>
  }
>
  <Button>Tips</Button>
</Tooltip>
```

### Disabled State of the Tooltip Component

```tsx
<Tooltip content="This won't show" disabled={true}>
  <Button>Disabled tooltip</Button>
</Tooltip>
```

### Best Practices of the Tooltip Component

- Keep tooltip content brief and scannable
- Use tooltips for supplementary information, not critical content
- Ensure tooltips don't obstruct important UI elements
- Avoid tooltips on mobile (use other patterns)
- Provide keyboard accessibility (tooltips show on focus)
- Don't use tooltips for error messages (use validation feedback instead)

## Snackbar Component

### Overview of the Snackbar Component

The Snackbar component displays brief, unobtrusive notification messages that auto-dismiss.

### Basic Usage of the Snackbar Component

```tsx
import { useState } from 'react';
import { Snackbar, Button } from '@spexop/react';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    // ... save logic
    setIsVisible(true);
  };

  return (
    <>
      <Button onClick={handleSave}>Save</Button>
      <Snackbar 
        message="Changes saved successfully"
        isVisible={isVisible}
        onAction={() => setIsVisible(false)}
      />
    </>
  );
}
```

### With Action Button of the Snackbar Component

```tsx
<Snackbar
  message="Email sent"
  actionLabel="Undo"
  onAction={handleUndo}
  isVisible={isVisible}
/>
```

### Position Variants of the Snackbar Component

```tsx
// Bottom (default)
<Snackbar message="Bottom snackbar" position="bottom" isVisible={true} />

// Top
<Snackbar message="Top snackbar" position="top" isVisible={true} />
```

### Custom Auto-hide Duration

```tsx
// No auto-hide
<Snackbar 
  message="Persistent message"
  autoHideDuration={0}
  isVisible={isVisible}
/>

// Fast auto-hide (2 seconds)
<Snackbar 
  message="Quick message"
  autoHideDuration={2000}
  isVisible={isVisible}
/>
```

### Best Practices of the Snackbar Component

- Use for success confirmations and brief notifications
- Keep messages short and actionable
- Provide an undo action when appropriate
- Don't use for errors that require attention (use alerts instead)
- Position at bottom for desktop, top for mobile
- Limit auto-hide duration to 4-6 seconds

## CommandPalette Component

### Overview of the CommandPalette Component

The CommandPalette provides a Spotlight-style command launcher with fuzzy search and keyboard navigation.

### Basic Usage of the CommandPalette Component

```tsx
import { useState, useEffect } from 'react';
import { CommandPalette } from '@spexop/react';
import { Home, Settings, FileText } from '@spexop/icons';

function MyApp() {
  const [open, setOpen] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const commands = [
    {
      id: 'home',
      label: 'Go to Home',
      description: 'Navigate to home page',
      category: 'Navigation',
      icon: <Home size={20} />,
      shortcut: '⌘H',
      onSelect: () => navigate('/'),
    },
    {
      id: 'settings',
      label: 'Open Settings',
      description: 'Configure application settings',
      category: 'Navigation',
      icon: <Settings size={20} />,
      shortcut: '⌘,',
      onSelect: () => navigate('/settings'),
    },
    {
      id: 'docs',
      label: 'View Documentation',
      category: 'Help',
      icon: <FileText size={20} />,
      onSelect: () => window.open('/docs'),
    },
  ];

  return (
    <CommandPalette
      open={open}
      onClose={() => setOpen(false)}
      commands={commands}
    />
  );
}
```

### With Keywords of the CommandPalette Component

```tsx
const commands = [
  {
    id: 'settings',
    label: 'Settings',
    keywords: ['preferences', 'config', 'options'],
    onSelect: () => navigate('/settings'),
  },
];
```

### Custom Appearance of the CommandPalette Component

```tsx
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  commands={commands}
  placeholder="Search commands..."
  showCategories={true}
  showShortcuts={true}
  maxResults={10}
  emptyMessage="No commands found"
/>
```

### Disabled Commands of the CommandPalette Component

```tsx
const commands = [
  {
    id: 'premium',
    label: 'Premium Feature',
    disabled: true,
    onSelect: () => {},
  },
];
```

### Best Practices of the CommandPalette Component

- Provide global keyboard shortcut (Cmd/Ctrl + K is standard)
- Group related commands with categories
- Add keywords for better discoverability
- Show keyboard shortcuts for common actions
- Keep command labels concise and action-oriented
- Use icons to improve scannability
- Disable commands that are not available in current context

## Dropdown Component

### Overview of the Dropdown Component

The Dropdown component displays a menu of actions or options triggered by a button or other element.

### Basic Usage of the Dropdown Component

```tsx
import { Dropdown, Button } from '@spexop/react';
import { Edit, Copy, Trash } from '@spexop/icons';

function MyComponent() {
  const items = [
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={16} />,
      onClick: handleEdit,
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: <Copy size={16} />,
      onClick: handleDuplicate,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash size={16} />,
      variant: 'danger',
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown 
      items={items}
      trigger={<Button>Actions</Button>}
    />
  );
}
```

### With Dividers of the Dropdown Component

```tsx
const items = [
  { id: 'edit', label: 'Edit', onClick: handleEdit },
  { id: 'copy', label: 'Copy', onClick: handleCopy, divider: true },
  { id: 'delete', label: 'Delete', variant: 'danger', onClick: handleDelete },
];
```

### Disabled Items of the Dropdown Component

```tsx
const items = [
  { id: 'edit', label: 'Edit', onClick: handleEdit },
  { id: 'delete', label: 'Delete', disabled: true, onClick: handleDelete },
];
```

### Placement Options

```tsx
<Dropdown items={items} trigger={trigger} placement="bottom-start" />
<Dropdown items={items} trigger={trigger} placement="bottom-end" />
<Dropdown items={items} trigger={trigger} placement="top-start" />
<Dropdown items={items} trigger={trigger} placement="top-end" />
```

### Controlled Mode

```tsx
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      items={items}
      trigger={<Button>Actions</Button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
```

### Keep Open After Click

```tsx
<Dropdown
  items={items}
  trigger={<Button>Filters</Button>}
  closeOnItemClick={false}
/>
```

### Best Practices of the Dropdown Component

- Use for actions related to a specific item or context
- Group related items together with dividers
- Use danger variant for destructive actions
- Place destructive actions at the bottom
- Disable items that are not available
- Provide clear, action-oriented labels
- Use icons for better scannability

## Popover Component

### Overview of the Popover Component

The Popover component displays rich content in an overlay anchored to a trigger element.

### Basic Usage of the Popover Component

```tsx
import { Popover, Button } from '@spexop/react';

function MyComponent() {
  return (
    <Popover
      trigger={<Button>Show Info</Button>}
      title="Additional Information"
    >
      <p>This is detailed information that appears in a popover.</p>
    </Popover>
  );
}
```

### Hover Trigger of the Popover Component

```tsx
<Popover
  trigger={<Button>Hover me</Button>}
  triggerType="hover"
>
  <p>This appears on hover</p>
</Popover>
```

### Placement Options of the Popover Component

```tsx
<Popover trigger={trigger} placement="top">Top popover</Popover>
<Popover trigger={trigger} placement="right">Right popover</Popover>
<Popover trigger={trigger} placement="bottom">Bottom popover</Popover>
<Popover trigger={trigger} placement="left">Left popover</Popover>
```

### Without Arrow of the Popover Component

```tsx
<Popover trigger={trigger} showArrow={false}>
  <p>No arrow pointer</p>
</Popover>
```

### Controlled Mode of the Popover Component

```tsx
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      trigger={<Button>Toggle</Button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <p>Controlled popover content</p>
    </Popover>
  );
}
```

### Rich Content of the Popover Component

```tsx
<Popover
  trigger={<Button>User Info</Button>}
  title="John Doe"
>
  <div>
    <Avatar src="/avatar.jpg" />
    <p>Senior Developer</p>
    <p>john@example.com</p>
    <Button>View Profile</Button>
  </div>
</Popover>
```

### Best Practices of the Popover Component

- Use for supplementary information or actions
- Keep content focused and scannable
- Use hover trigger for non-critical information
- Use click trigger for interactive content
- Provide a title for context
- Don't nest popovers
- Ensure popover doesn't block important UI elements

## SearchModal Component

### Overview of the SearchModal Component

The SearchModal provides a full-featured search interface with categorized results, quick links, and recent searches.

### Basic Usage of the SearchModal Component

```tsx
import { useState } from 'react';
import { SearchModal } from '@spexop/react';
import { FileText } from '@spexop/icons';

function MyApp() {
  const [isOpen, setIsOpen] = useState(false);

  const results = [
    {
      id: 'doc-1',
      title: 'Getting Started',
      description: 'Learn the basics',
      category: 'Documentation',
      icon: <FileText size={20} />,
      onSelect: () => navigate('/docs/getting-started'),
    },
    {
      id: 'doc-2',
      title: 'API Reference',
      description: 'Complete API docs',
      category: 'Documentation',
      icon: <FileText size={20} />,
      onSelect: () => navigate('/docs/api'),
    },
  ];

  return (
    <SearchModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      results={results}
    />
  );
}
```

### With Quick Links of the SearchModal Component

```tsx
const quickLinks = [
  {
    url: '/home',
    label: 'Home',
    icon: <Home size={28} />,
  },
  {
    url: '/docs',
    label: 'Documentation',
    icon: <FileText size={28} />,
  },
];

<SearchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  results={results}
  quickLinks={quickLinks}
/>
```

### With Recent Searches

```tsx
<SearchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  results={results}
  recentSearches={['api', 'settings', 'dashboard']}
/>
```

### With Keywords

```tsx
const results = [
  {
    id: 'config',
    title: 'Configuration',
    keywords: ['settings', 'preferences', 'options'],
    onSelect: () => navigate('/config'),
  },
];
```

### Custom Placeholder

```tsx
<SearchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  results={results}
  placeholder="Search documentation..."
/>
```

### Best Practices of the SearchModal Component

- Provide comprehensive search results across your app
- Use categories to organize results
- Include quick links to important pages
- Store and display recent searches for convenience
- Add keywords to improve search relevance
- Keep result descriptions concise
- Use icons to identify result types

## Accessibility of the SearchModal Component

All overlay components follow WCAG AA+ accessibility standards:

### Keyboard Navigation of the SearchModal Component

- **Tab**: Navigate between focusable elements
- **Escape**: Close overlays
- **Enter/Space**: Activate buttons and select items
- **Arrow Keys**: Navigate lists and menus (CommandPalette, Dropdown, SearchModal)
- **Home/End**: Jump to first/last item in lists

### Screen Reader Support of the SearchModal Component

- Proper ARIA roles (`dialog`, `menu`, `tooltip`, etc.)
- ARIA attributes (`aria-modal`, `aria-labelledby`, `aria-describedby`)
- Live regions for dynamic content (`role="alert"` for Snackbar)
- Descriptive labels for all interactive elements

### Focus Management of the SearchModal Component

- Focus trap in modal-like components
- Initial focus on appropriate element
- Focus restoration after closing
- Visible focus indicators

### Visual Considerations of the SearchModal Component

- High contrast colors (WCAG AAA compliant)
- Sufficient touch targets (minimum 44px)
- Clear visual hierarchy
- Consistent spacing and alignment

## Performance of the SearchModal Component

### Code Splitting of the SearchModal Component

Import only the components you need:

```tsx
// Good: Named imports
import { Modal, Tooltip } from '@spexop/react';

// Avoid: Importing everything
import * as Spexop from '@spexop/react';
```

### Portal Rendering of the SearchModal Component

Large overlays use React portals for optimal performance:

- Rendered outside main DOM hierarchy
- No impact on parent component re-renders
- Better z-index management

### Animation Performance of the SearchModal Component

All animations use CSS transforms for 60fps performance:

- `transform: translateX/Y` for sliding
- `opacity` for fading
- Hardware acceleration enabled
- Smooth transitions with easing functions

## Theme Integration of the SearchModal Component

All overlay components respect theme variables:

```css
/* Customize overlay styles */
:root {
  --theme-overlay-backdrop: rgba(0, 0, 0, 0.5);
  --theme-overlay-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  --theme-overlay-border: var(--theme-border);
  --theme-overlay-radius: var(--theme-radius-lg);
}
```

## Mobile Responsiveness of the SearchModal Component

### Adaptive Behavior

- **Modal**: Full screen on mobile
- **Drawer**: Bottom drawer recommended for mobile
- **Tooltip**: Disabled on touch devices (use Popover instead)
- **CommandPalette**: Optimized touch targets
- **SearchModal**: Mobile-friendly keyboard

### Touch Gestures

- Swipe down to close Drawer (bottom position)
- Tap backdrop to close (when enabled)
- Large touch targets (minimum 44px)

## Common Patterns of the SearchModal Component

### Confirmation Dialogs of the SearchModal Component

```tsx
function ConfirmDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Action"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onConfirm}>Confirm</Button>
        </>
      }
    >
      <p>Are you sure you want to proceed?</p>
    </Modal>
  );
}
```

### Multi-Step Modals of the SearchModal Component

```tsx
function WizardModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Step ${step} of 3`}
      footer={
        <>
          <Button disabled={step === 1} onClick={() => setStep(step - 1)}>
            Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={handleComplete}>Complete</Button>
          )}
        </>
      }
    >
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
    </Modal>
  );
}
```

### Context Menus of the SearchModal Component

```tsx
function ContextMenu({ x, y, target }) {
  const items = [
    { id: 'copy', label: 'Copy', onClick: () => copy(target) },
    { id: 'cut', label: 'Cut', onClick: () => cut(target) },
    { id: 'paste', label: 'Paste', onClick: () => paste(target) },
  ];

  return (
    <Dropdown
      items={items}
      trigger={<div style={{ position: 'absolute', left: x, top: y }} />}
      isOpen={true}
    />
  );
}
```

### Filter Drawers

```tsx
function FilterDrawer({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({});

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="400px">
      <h2>Filters</h2>
      <FilterForm value={filters} onChange={setFilters} />
      <Button onClick={() => onApply(filters)}>Apply Filters</Button>
    </Drawer>
  );
}
```

## Anti-Patterns

### Don't: Nest Modals

```tsx
// ❌ BAD: Nested modals
<Modal isOpen={true}>
  <Modal isOpen={true}>
    <p>This is confusing</p>
  </Modal>
</Modal>
```

Instead, use a multi-step modal or close the first before opening the second.

### Don't: Use Tooltips for Critical Information

```tsx
// ❌ BAD: Important info in tooltip
<Tooltip content="Required field">
  <Input />
</Tooltip>
```

Instead, use visible labels and validation messages.

### Don't: Overuse Overlays

```tsx
// ❌ BAD: Too many overlays
<Snackbar isVisible={true} />
<Modal isOpen={true} />
<CommandPalette open={true} />
```

Show one overlay at a time for the best user experience.

### Don't: Block All Interactions

```tsx
// ❌ BAD: No way to close
<Modal 
  isOpen={true}
  showCloseButton={false}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <p>Trapped!</p>
</Modal>
```

Always provide a way to close or dismiss overlays.

## Migration Guide

### From v0.1.x to v0.2.0

No breaking changes. All components are backward compatible.

### New Features in v0.2.0

- Comprehensive test coverage
- Improved accessibility
- Better TypeScript types
- Performance optimizations
- Mobile responsiveness improvements

## Support

- Documentation: <https://spexop.dev/docs>
- GitHub: <https://github.com/spexop-ui>
- Issues: <https://github.com/spexop-ui/spexop/issues>

## License

MIT License - See LICENSE file for details
