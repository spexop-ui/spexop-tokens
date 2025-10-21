# Spinner

An accessible loading spinner component for indicating processing states.

## Features

- Multiple size variants
- Color variants
- Configurable thickness
- Screen reader accessible with aria-label
- Smooth CSS animation
- Reduced motion support
- Semantic HTML
- Lightweight and performant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Spinner } from "@spexop/react";

function App() {
  return <Spinner />;
}
```

## Sizes

```tsx
{/* Small */}
<Spinner size="sm" />

{/* Medium (default) */}
<Spinner size="md" />

{/* Large */}
<Spinner size="lg" />

{/* Extra Large */}
<Spinner size="xl" />
```

## Colors

```tsx
{/* Primary (default) */}
<Spinner color="primary" />

{/* Secondary */}
<Spinner color="secondary" />

{/* Neutral */}
<Spinner color="neutral" />

{/* White (for dark backgrounds) */}
<Spinner color="white" />
```

## Custom Thickness

```tsx
<Spinner thickness={2} />
<Spinner thickness={5} />
```

## With Custom Label

```tsx
<Spinner label="Loading content..." />
<Spinner label="Saving changes..." />
```

## In Button

```tsx
<button disabled>
  <Spinner size="sm" color="white" />
  <span>Loading...</span>
</button>
```

## Centered Loading State

```tsx
<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
  <Spinner size="lg" label="Loading data..." />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size variant |
| `color` | `"primary" \| "secondary" \| "neutral" \| "white"` | `"primary"` | Color variant |
| `label` | `string` | `"Loading..."` | Loading text for screen readers |
| `className` | `string` | - | Additional CSS class |
| `thickness` | `number` | `3` | Border thickness (1-10) |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Uses circular border animation
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - Screen reader accessible with proper ARIA

## Accessibility

- Uses `role="status"` for assistive technologies
- Includes `aria-label` for screen reader announcement
- `aria-live="polite"` for non-intrusive updates
- Hidden text fallback for screen readers
- Respects `prefers-reduced-motion` preference

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Progress - For determinate loading states
- Skeleton - For content placeholders
- Alert - For loading messages
