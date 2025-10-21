# Container Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A responsive container component that constrains content width and provides consistent padding. One of the 5 core grid primitives in the Spexop design system.

## Features

- ✅ Responsive max-width breakpoints
- ✅ Configurable padding
- ✅ Center alignment
- ✅ Design token integration
- ✅ Fluid to fixed-width control
- ✅ TypeScript support
- ✅ Composable with Grid, Stack, and other primitives

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Container } from '@spexop/react';

function App() {
  return (
    <Container maxWidth="xl" padding={6}>
      <h1>Page Content</h1>
      <p>Constrained to max-width with consistent padding.</p>
    </Container>
  );
}
```

## Max Width Options

### xs (480px)

Extra small container for narrow content.

```tsx
<Container maxWidth="xs">
  <p>Narrow content</p>
</Container>
```

### sm (640px)

Small container for mobile-optimized content.

```tsx
<Container maxWidth="sm">
  <form>...</form>
</Container>
```

### md (768px)

Medium container for tablet layouts.

```tsx
<Container maxWidth="md">
  <article>...</article>
</Container>
```

### lg (1024px)

Large container for desktop content.

```tsx
<Container maxWidth="lg">
  <div>...</div>
</Container>
```

### xl (1280px) - Default

Extra large container for wide layouts.

```tsx
<Container maxWidth="xl">
  <main>...</main>
</Container>
```

### 2xl (1536px)

Double extra large for very wide content.

```tsx
<Container maxWidth="2xl">
  <section>...</section>
</Container>
```

### full

No max-width constraint, full viewport width.

```tsx
<Container maxWidth="full">
  <div>Full width content</div>
</Container>
```

## Padding

Uses spacing tokens for consistent padding.

```tsx
{/* No padding */}
<Container padding={0}>...</Container>

{/* Small padding */}
<Container padding={4}>...</Container>

{/* Default padding */}
<Container padding={6}>...</Container>

{/* Large padding */}
<Container padding={8}>...</Container>
```

## Composition

### With Grid

```tsx
<Container maxWidth="xl" padding={6}>
  <Grid columns={3} gap={6}>
    <GridItem span={1}>Column 1</GridItem>
    <GridItem span={1}>Column 2</GridItem>
    <GridItem span={1}>Column 3</GridItem>
  </Grid>
</Container>
```

### With Stack

```tsx
<Container maxWidth="lg" padding={8}>
  <Stack direction="vertical" gap={4}>
    <h1>Title</h1>
    <p>Content</p>
    <button>Action</button>
  </Stack>
</Container>
```

### Nested Containers

```tsx
<Container maxWidth="2xl" padding={8}>
  <Container maxWidth="lg" padding={0}>
    <p>Nested narrower content</p>
  </Container>
</Container>
```

## Props

```typescript
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Core layout primitive
2. **Tokens before magic numbers** - Uses breakpoint and spacing tokens
3. **Composition before complexity** - Designed to wrap other components
4. **Standards before frameworks** - Standard div with constrained width

## Accessibility

- Semantic HTML (div element)
- No specific ARIA requirements
- Maintains document structure
- Works with screen readers

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Grid` - Grid layout system
- `GridItem` - Grid cell
- `Stack` - Vertical/horizontal stacking
- `Spacer` - Flexible spacing
- `Section` - Semantic sections

## License

MIT
