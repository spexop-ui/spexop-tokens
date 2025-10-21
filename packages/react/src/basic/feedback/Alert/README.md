# Alert

An accessible alert component for displaying important messages with semantic meaning.

## Features

- Semantic variants (info, success, warning, error)
- Optional dismissible functionality
- Icons support (default or custom)
- Screen reader accessible with ARIA
- High contrast colors (WCAG AA+)
- Keyboard accessible dismiss button
- Optional title support
- Flexible content

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Alert } from "@spexop/react";

function App() {
  return (
    <Alert variant="success">
      Your changes have been saved successfully.
    </Alert>
  );
}
```

## With Title

```tsx
<Alert variant="info" title="Information">
  Please read the following information carefully before proceeding.
</Alert>
```

## Variants

```tsx
{/* Info (default) */}
<Alert variant="info">
  This is an informational message.
</Alert>

{/* Success */}
<Alert variant="success">
  Operation completed successfully!
</Alert>

{/* Warning */}
<Alert variant="warning">
  Please review your changes before saving.
</Alert>

{/* Error */}
<Alert variant="error">
  An error occurred. Please try again.
</Alert>
```

## Dismissible

```tsx
import { useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <Alert
      variant="info"
      dismissible
      onDismiss={() => setShowAlert(false)}
    >
      This alert can be dismissed.
    </Alert>
  );
}
```

## Custom Icon

```tsx
<Alert variant="info" icon={<CustomIcon />}>
  Alert with custom icon.
</Alert>
```

## Without Icon

```tsx
<Alert variant="info" showIcon={false}>
  Alert without icon.
</Alert>
```

## Complex Content

```tsx
<Alert variant="warning" title="Action Required">
  <p>Your subscription will expire in 3 days.</p>
  <button>Renew Now</button>
</Alert>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Alert content |
| `title` | `React.ReactNode` | - | Alert title |
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Semantic variant |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | - | Callback when dismissed |
| `icon` | `React.ReactNode` | - | Custom icon |
| `showIcon` | `boolean` | `true` | Show default icon |
| `className` | `string` | - | Additional CSS class |
| `role` | `"alert" \| "status" \| "region"` | `"alert"` | ARIA role |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong semantic borders for clear distinction
- **Principle 3: Typography before decoration** - Bold title for hierarchy
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with semantic colors

## Accessibility

- Uses appropriate ARIA roles (`alert`, `status`, or `region`)
- `aria-live` for screen reader announcements
- High contrast colors meeting WCAG AA+ standards
- Keyboard accessible dismiss button
- Semantic color meanings conveyed through multiple means
- Focus visible indicators

## Keyboard Navigation

- **Tab**: Focus on dismiss button (if dismissible)
- **Enter/Space**: Dismiss alert
- **Escape**: Can be handled by parent component

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Toast - For temporary notifications
- Snackbar - For brief messages
- Modal - For important blocking messages
