# Progress

An accessible progress indicator component for showing completion status.

## Features

- Multiple size variants
- Color variants for semantic meaning
- Optional percentage label
- Visual variants (default, striped, animated)
- Indeterminate mode for unknown progress
- Screen reader accessible with ARIA
- Smooth transitions
- Reduced motion support
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Progress } from "@spexop/react";

function App() {
  return <Progress value={75} />;
}
```

## With Label

```tsx
{/* Show percentage */}
<Progress value={50} showLabel />

{/* Custom label */}
<Progress value={75} label="Uploading: 75%" />
```

## Sizes

```tsx
{/* Small */}
<Progress value={50} size="sm" />

{/* Medium (default) */}
<Progress value={50} size="md" />

{/* Large */}
<Progress value={50} size="lg" />
```

## Colors

```tsx
{/* Primary (default) */}
<Progress value={50} color="primary" />

{/* Secondary */}
<Progress value={50} color="secondary" />

{/* Success */}
<Progress value={100} color="success" />

{/* Warning */}
<Progress value={60} color="warning" />

{/* Error */}
<Progress value={30} color="error" />
```

## Variants

```tsx
{/* Default */}
<Progress value={50} variant="default" />

{/* Striped */}
<Progress value={50} variant="striped" />

{/* Animated */}
<Progress value={50} variant="animated" />
```

## Indeterminate

```tsx
<Progress indeterminate label="Loading..." />
```

## Dynamic Progress

```tsx
import { useState, useEffect } from "react";

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return <Progress value={progress} showLabel />;
}
```

## File Upload Example

```tsx
function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File) => {
    // Simulate upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
  };

  return (
    <div>
      <Progress 
        value={uploadProgress} 
        label={`Uploading: ${uploadProgress}%`}
        color={uploadProgress === 100 ? "success" : "primary"}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Current progress (0-100) |
| `max` | `number` | `100` | Maximum value |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "error"` | `"primary"` | Color variant |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `label` | `string` | - | Custom label text |
| `variant` | `"default" \| "striped" \| "animated"` | `"default"` | Visual variant |
| `className` | `string` | - | Additional CSS class |
| `indeterminate` | `boolean` | `false` | Indeterminate mode |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Clear borders for definition
- **Principle 3: Typography before decoration** - Clear, readable labels
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with proper ARIA

## Accessibility

- Uses `role="progressbar"` for assistive technologies
- Includes `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-label` for custom descriptions
- `aria-busy` for indeterminate state
- High contrast colors meeting WCAG AA+ standards
- Respects `prefers-reduced-motion` preference

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Spinner - For indeterminate loading
- Skeleton - For content placeholders
- Alert - For status messages
