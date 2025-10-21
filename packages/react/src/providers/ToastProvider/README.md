# ToastProvider

**Centralized toast notification system for Spexop Design System.**

Global toast queue with auto-stacking, variants, and programmatic API.

---

## Features

✅ **Global Toast Queue** - Centralized notification management  
✅ **6 Position Options** - Top/bottom left/center/right  
✅ **Auto-Dismiss** - Configurable duration or persistent  
✅ **Action Buttons** - Optional call-to-action in toasts  
✅ **5 Variants** - Default, success, error, warning, info  
✅ **Programmatic API** - `toast.success()`, `toast.error()`, etc.  
✅ **Max Toast Limit** - Automatically removes oldest  
✅ **Reduced Motion Support** - Respects accessibility preferences  
✅ **Screen Reader Support** - ARIA live regions  
✅ **Border-First Design** - Follows Spexop principles

---

## Quick Start

### Basic Usage

```tsx
import { ToastProvider } from '@spexop/react';

function App() {
  return (
    <ToastProvider maxToasts={5} position="top-right">
      <YourApp />
    </ToastProvider>
  );
}
```

### Show Toast Notifications

```tsx
import { useToast } from '@spexop/react';

function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

---

## API Reference

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Child components |
| `maxToasts` | `number` | `5` | Maximum toasts to show simultaneously |
| `position` | `ToastPosition` | `"top-right"` | Default position for toasts |
| `defaultDuration` | `number` | `4000` | Default auto-dismiss duration (ms) |
| `enableAnimations` | `boolean` | `true` | Enable slide animations |

#### Position Options

- `"top-left"`
- `"top-center"`
- `"top-right"` (default)
- `"bottom-left"`
- `"bottom-center"`
- `"bottom-right"`

### useToast() Hook

Returns `ToastContextValue` with the following API:

```tsx
interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, options?: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  toast: {
    (message: string, options?: ToastOptions): string;
    success: (message: string, options?) => string;
    error: (message: string, options?) => string;
    warning: (message: string, options?) => string;
    info: (message: string, options?) => string;
  };
}
```

### Toast Options

```tsx
interface ToastOptions {
  title?: string;                    // Optional title
  duration?: number;                 // Auto-dismiss duration (0 = persistent)
  variant?: ToastVariant;            // Visual variant
  action?: {                         // Optional action button
    label: string;
    onClick: () => void;
  };
  closable?: boolean;                // Show close button (default: true)
  icon?: ReactNode;                  // Custom icon
}
```

### Toast Variants

- `"default"` - Neutral gray
- `"success"` - Green with checkmark
- `"error"` - Red with X
- `"warning"` - Orange with warning symbol
- `"info"` - Blue with info symbol

---

## Usage Examples

### Success Toast

```tsx
import { useToast } from '@spexop/react';

function Component() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast.success('Operation completed!')}>
      Complete
    </button>
  );
}
```

### Error Toast

```tsx
function Component() {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      toast.success('Form submitted');
    } catch (error) {
      toast.error('Submission failed', {
        duration: 0, // Persistent until dismissed
      });
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

### Toast with Title

```tsx
function Component() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast.success('Your profile has been updated successfully', {
          title: 'Profile Updated',
          duration: 5000,
        })
      }
    >
      Update Profile
    </button>
  );
}
```

### Toast with Action Button

```tsx
function Component() {
  const { toast } = useToast();
  const [deletedItem, setDeletedItem] = useState(null);

  const handleDelete = (item) => {
    setDeletedItem(item);
    
    toast.success('Item deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          restoreItem(deletedItem);
        },
      },
      duration: 5000,
    });
  };

  return <button onClick={() => handleDelete(item)}>Delete</button>;
}
```

### Programmatic Toast Management

```tsx
function Component() {
  const { toast, removeToast, clearToasts } = useToast();

  const showMultiple = () => {
    const id1 = toast.info('First notification');
    const id2 = toast.info('Second notification');
    const id3 = toast.info('Third notification');
  };

  return (
    <>
      <button onClick={showMultiple}>Show Multiple</button>
      <button onClick={clearToasts}>Clear All</button>
    </>
  );
}
```

### Custom Icon

```tsx
import { useToast } from '@spexop/react';
import { CheckCircle } from '@spexop/icons';

function Component() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast('Payment received', {
          variant: 'success',
          icon: <CheckCircle size={20} />,
        })
      }
    >
      Mark Paid
    </button>
  );
}
```

### Persistent Toast (No Auto-Dismiss)

```tsx
function Component() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast.warning('Your session will expire soon', {
          duration: 0, // Won't auto-dismiss
          title: 'Session Expiring',
          action: {
            label: 'Extend',
            onClick: () => extendSession(),
          },
        })
      }
    >
      Show Warning
    </button>
  );
}
```

### Different Positions

```tsx
function PositionDemo() {
  const { toast } = useToast();

  return (
    <div>
      <ToastProvider position="top-left">
        <button onClick={() => toast.info('Top left')}>Top Left</button>
      </ToastProvider>

      <ToastProvider position="bottom-center">
        <button onClick={() => toast.info('Bottom center')}>Bottom Center</button>
      </ToastProvider>
    </div>
  );
}
```

---

## How It Works

### Toast Queue

1. Toasts are added to a global queue
2. Maximum of `maxToasts` shown at once (default: 5)
3. Oldest toast removed when limit reached
4. Each toast has unique ID for tracking

### Auto-Dismiss

- Default duration: 4000ms (4 seconds)
- Set `duration: 0` for persistent toast
- Custom duration per toast via options
- Timer resets on re-render

### Animations

- Slide in from top/bottom based on position
- Smooth fade out on dismiss
- Respects `prefers-reduced-motion`
- 200ms animation duration

### Stacking

Toasts stack vertically with 12px gap (var(--theme-spacing-3)):

```txt
┌──────────────────┐
│ Toast 1 (newest) │
├──────────────────┤
│ Toast 2          │
├──────────────────┤
│ Toast 3 (oldest) │
└──────────────────┘
```

---

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - 2px solid borders, subtle shadows
2. **Typography before decoration** - Clear font weights and hierarchy
3. **Tokens before magic numbers** - All values use theme tokens
4. **Accessibility before aesthetics** - ARIA live regions, WCAG AAA
5. **Composition before complexity** - Simple, reusable patterns

### Border-First Design

- Default: Gray border
- Success: Left green border (4px)
- Error: Left red border (4px)
- Warning: Left orange border (4px)
- Info: Left blue border (4px)

### Typography Hierarchy

- **Title**: Bold, 14px (var(--theme-font-weight-bold))
- **Message**: Regular, 14px (var(--theme-font-weight-regular))
- **Action**: Semibold, 14px (var(--theme-font-weight-semibold))

---

## Accessibility

### Screen Reader Support

- Each toast has `role="alert"`
- Error toasts use `aria-live="assertive"`
- Other variants use `aria-live="polite"`
- Container has `aria-label="Notifications"`

### Keyboard Navigation

- Close button focusable
- Action button focusable
- Tab through interactive elements
- Enter/Space to activate

### ARIA Attributes

```tsx
<div role="alert" aria-live="polite" aria-atomic="true">
  {/* Toast content */}
</div>
```

### High Contrast Mode

- 3px borders in high contrast
- 3px focus outlines
- Strong color differentiation

### Reduced Motion

- Animations disabled when `prefers-reduced-motion: reduce`
- Instant show/hide instead of slide
- Respects user preference automatically

---

## Performance

### Optimization

- Memoized context value prevents unnecessary re-renders
- Efficient toast removal (filter by ID)
- Lazy animation calculations
- Minimal DOM updates

### Bundle Size

~3KB gzipped (including styles)

### Memory Management

- Old toasts automatically removed from queue
- Timers cleaned up on unmount
- No memory leaks

---

## Common Patterns

### Form Submission

```tsx
function FormComponent() {
  const { toast } = useToast();

  const handleSubmit = async (values) => {
    try {
      await api.submit(values);
      toast.success('Form submitted successfully');
    } catch (error) {
      toast.error(error.message || 'Submission failed');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Undo Actions

```tsx
function DeleteButton({ item }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const backup = { ...item };
    
    await deleteItem(item.id);
    
    toast.success('Item deleted', {
      action: {
        label: 'Undo',
        onClick: async () => {
          await restoreItem(backup);
          toast.info('Item restored');
        },
      },
      duration: 5000,
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Loading States

```tsx
function Component() {
  const { toast, removeToast } = useToast();

  const handleLongOperation = async () => {
    const loadingToastId = toast.info('Processing...', {
      duration: 0,
      closable: false,
    });

    try {
      await longRunningOperation();
      removeToast(loadingToastId);
      toast.success('Operation complete!');
    } catch (error) {
      removeToast(loadingToastId);
      toast.error('Operation failed');
    }
  };

  return <button onClick={handleLongOperation}>Process</button>;
}
```

### Batch Notifications

```tsx
function BatchProcessor() {
  const { toast } = useToast();

  const processBatch = async (items) => {
    let successCount = 0;
    let errorCount = 0;

    for (const item of items) {
      try {
        await processItem(item);
        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} items processed`);
    }
    
    if (errorCount > 0) {
      toast.error(`${errorCount} items failed`);
    }
  };

  return <button onClick={() => processBatch(items)}>Process All</button>;
}
```

---

## FAQ

### Can I show more than 5 toasts at once?

Yes! Set `maxToasts` prop to your desired limit:

```tsx
<ToastProvider maxToasts={10}>
```

### How do I make a toast stay until manually dismissed?

Set `duration: 0`:

```tsx
toast.error('Critical error', { duration: 0 });
```

### Can I customize the toast icon?

Yes, pass a custom `icon`:

```tsx
toast.success('Done!', { icon: <CustomIcon /> });
```

### How do I change the position globally?

Set `position` prop on ToastProvider:

```tsx
<ToastProvider position="bottom-center">
```

### Can I have multiple toast containers?

Not recommended. Use one ToastProvider at app root for consistency.

### Do toasts work with SSR?

Yes! The provider is SSR-safe. Toasts will only show after hydration.

### How do I test components that use toasts?

Wrap in ToastProvider and assert on toast content:

```tsx
import { render, screen } from '@testing-library/react';
import { ToastProvider } from '@spexop/react';

test('shows success toast', () => {
  render(
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
  
  // Trigger toast
  fireEvent.click(screen.getByText('Save'));
  
  // Assert
  expect(screen.getByRole('alert')).toHaveTextContent('Saved!');
});
```

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

---

## Related

- **Snackbar** - Simple notification component
- **Modal** - Dialog system (use ModalProvider)
- **Alert** - Static inline alerts

---

## Best Practices

1. **Use appropriate variants** - Success for confirmations, error for failures
2. **Keep messages concise** - Under 60 characters ideal
3. **Include actions when relevant** - Undo, retry, etc.
4. **Don't overuse** - Too many toasts frustrate users
5. **Set reasonable durations** - 4-6 seconds for most messages
6. **Test with screen readers** - Ensure announcements work
7. **Respect user preferences** - Animations, contrast, etc.

---

## Troubleshooting

### Toasts not showing

1. Check ToastProvider is wrapping your app
2. Verify `useToast()` is called inside provider
3. Check console for errors

### Animations not working

1. Verify `enableAnimations={true}` on provider
2. Check for `prefers-reduced-motion` setting
3. Ensure CSS is loaded

### Too many toasts

Increase `maxToasts` limit or clear old toasts:

```tsx
const { clearToasts } = useToast();
clearToasts();
```

---

**Last Updated**: October 21, 2025
**Version**: 0.3.0
**Package**: @spexop/react
