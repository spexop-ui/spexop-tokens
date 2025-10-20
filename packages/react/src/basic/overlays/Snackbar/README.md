# Snackbar

Toast notification component for temporary messages. Displays brief confirmations, alerts, and status updates. Auto-dismisses with optional actions.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Snackbar } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Snackbar } from '@spexop/react';

function MyComponent() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  const handleSave = () => {
    // Save logic...
    setShowSnackbar(true);
  };
  
  return (
    <>
      <button onClick={handleSave}>Save</button>
      
      <Snackbar
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="Changes saved successfully"
        duration={3000}
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **Required** | Whether snackbar is visible |
| `onClose` | `() => void` | **Required** | Close callback |
| `message` | `string` | **Required** | Message to display |
| `duration` | `number` | `3000` | Auto-dismiss after ms (0 = no auto-dismiss) |
| `action` | `{ label: string, onClick: () => void }` | `undefined` | Optional action button |
| `variant` | `"info"` \| `"success"` \| `"warning"` \| `"error"` | `"info"` | Visual variant |
| `position` | `"top"` \| `"bottom"` | `"bottom"` | Position on screen |
| `className` | `string` | `""` | Additional CSS class |

## Examples

### Success Message

```tsx
<Snackbar
  isOpen={saved}
  onClose={() => setSaved(false)}
  message="File saved successfully"
  variant="success"
  duration={3000}
/>
```

### Error Message

```tsx
<Snackbar
  isOpen={error}
  onClose={() => setError(false)}
  message="Failed to save changes"
  variant="error"
  duration={5000}
/>
```

### With Action Button

```tsx
<Snackbar
  isOpen={deleted}
  onClose={() => setDeleted(false)}
  message="Item deleted"
  variant="info"
  action={{
    label: 'Undo',
    onClick: handleUndo
  }}
  duration={5000}
/>
```

### Top Position

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={onClose}
  message="Update available"
  position="top"
  action={{
    label: 'Refresh',
    onClick: handleRefresh
  }}
/>
```

### No Auto-Dismiss

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={onClose}
  message="Action required"
  duration={0}
  action={{
    label: 'Review',
    onClick: handleReview
  }}
/>
```

## Use Cases

**Success**: Saved, Created, Updated, Deleted  
**Error**: Failed, Invalid, Rejected  
**Warning**: Unsaved changes, Quota exceeded  
**Info**: Offline mode, Update available, Copied

## Accessibility

- Auto-announced by screen readers
- Action buttons keyboard accessible
- Escape key closes snackbar
- Focus management handled

## Best Practices

### Do ✅

- Use for brief confirmations
- Auto-dismiss after 3-5 seconds
- Provide undo actions when possible
- Use appropriate variants

### Don't ❌

- Don't use for critical errors
- Don't stack multiple snackbars
- Don't use for complex content
- Don't disable auto-dismiss without action

## Related Components

- **Alert** - Persistent notifications
- **Modal** - Blocking user actions
- **Toast** - Alternative term for Snackbar

---

**Part of Overlay Components** - Temporary notifications and confirmations.
