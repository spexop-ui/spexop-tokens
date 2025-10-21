# Snackbar Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A brief notification component that appears at the bottom of the screen. Perfect for showing success messages, errors, or informational updates that don't require user action.

## Features

- ✅ 4 variants (default, success, warning, error)
- ✅ Auto-dismiss with configurable duration
- ✅ Action button support
- ✅ Dismiss button (X)
- ✅ Slide-up animation
- ✅ Queue management
- ✅ Position control (bottom-left, bottom-center, bottom-right)
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
import { Snackbar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Show Notification
      </button>
      
      <Snackbar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Changes saved successfully!"
        variant="success"
        duration={3000}
      />
    </>
  );
}
```

## Variants

### Default

Neutral information message.

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Profile updated"
  variant="default"
/>
```

### Success

Positive confirmation message.

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="File uploaded successfully!"
  variant="success"
/>
```

### Warning

Cautionary message.

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Network connection unstable"
  variant="warning"
/>
```

### Error

Error message.

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Failed to save changes"
  variant="error"
/>
```

## Duration

### Auto-dismiss

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Changes saved"
  duration={3000} // 3 seconds
/>
```

### Persistent (Manual dismiss only)

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Important notification"
  duration={0} // Won't auto-dismiss
/>
```

## Position

### Bottom Center (Default)

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-center"
/>
```

### Bottom Left

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-left"
/>
```

### Bottom Right

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-right"
/>
```

## With Action Button

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Connection lost"
  variant="error"
  action={{
    label: "Retry",
    onClick: handleRetry
  }}
/>
```

## Common Patterns

### Success Notification

```tsx
function SaveButton() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      await saveData();
      setShowSuccess(true);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      
      <Snackbar
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Changes saved successfully!"
        variant="success"
        duration={3000}
      />
    </>
  );
}
```

### Error with Retry

```tsx
function DataLoader() {
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      await fetchData();
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {/* Your component */}
      
      <Snackbar
        isOpen={error}
        onClose={() => setError(false)}
        message="Failed to load data"
        variant="error"
        action={{
          label: "Retry",
          onClick: loadData
        }}
        duration={0} // Don't auto-dismiss errors
      />
    </>
  );
}
```

### Undo Action

```tsx
function DeleteButton({ item, onDelete }) {
  const [showUndo, setShowUndo] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const handleDelete = () => {
    setDeletedItem(item);
    setShowUndo(true);
    
    // Delay actual deletion
    setTimeout(() => {
      if (deletedItem) {
        onDelete(deletedItem);
      }
    }, 5000);
  };

  const handleUndo = () => {
    setDeletedItem(null);
    setShowUndo(false);
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      
      <Snackbar
        isOpen={showUndo}
        onClose={() => setShowUndo(false)}
        message="Item deleted"
        variant="default"
        action={{
          label: "Undo",
          onClick: handleUndo
        }}
        duration={5000}
      />
    </>
  );
}
```

### Queue Management

```tsx
function NotificationManager() {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  const showNotification = (message, variant = 'default') => {
    const notification = { id: Date.now(), message, variant };
    setQueue(prev => [...prev, notification]);
  };

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [current, queue]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <>
      <button onClick={() => showNotification('First', 'success')}>
        Show First
      </button>
      <button onClick={() => showNotification('Second', 'info')}>
        Show Second
      </button>
      
      {current && (
        <Snackbar
          isOpen={true}
          onClose={handleClose}
          message={current.message}
          variant={current.variant}
          duration={3000}
        />
      )}
    </>
  );
}
```

## Props

```typescript
interface SnackbarProps {
  /** Whether the snackbar is visible */
  isOpen: boolean;
  /** Callback when snackbar closes */
  onClose: () => void;
  /** Message to display */
  message: string;
  /** Visual variant */
  variant?: "default" | "success" | "warning" | "error";
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Position on screen */
  position?: "bottom-left" | "bottom-center" | "bottom-right";
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean border-based design
2. **Typography before decoration** - Clear message text
3. **Tokens before magic numbers** - Uses spacing and timing tokens
4. **Accessibility before aesthetics** - Screen reader announcements

## Accessibility

- ✅ ARIA live region for announcements
- ✅ Keyboard dismissible (Escape key)
- ✅ Focus management
- ✅ Screen reader support
- ✅ High contrast variants
- ✅ Sufficient color contrast
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Escape` - Dismiss snackbar
- `Tab` - Focus action button (if present)
- `Enter/Space` - Activate action button

## Animation

- **Slide up** on open (200ms)
- **Slide down** on close (200ms)
- **Easing**: ease-in-out

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Alert` - Persistent inline notifications
- `Toast` - More prominent notifications
- `Modal` - Blocking dialogs

## Best Practices

1. **Keep messages brief** - One line is ideal
2. **Use appropriate variants** - Match severity to variant
3. **Auto-dismiss for success** - 3-4 seconds is good
4. **Don't auto-dismiss errors** - Let users read and act
5. **Provide actions sparingly** - Only when needed
6. **Queue notifications** - Don't show multiple at once

## License

MIT
