# Spacer

Quick spacing utility for adding vertical or horizontal space between elements. Part of the Grid Primitives foundation.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Spacer } from '@spexop/react';
```

## Basic Usage

```tsx
<div>
  <h1>Title</h1>
  <Spacer size={6} />
  <p>Content below with 24px spacing</p>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `SpacingScale` \| `ResponsiveObject` | `4` | Size of spacing (0-10 scale, maps to design tokens) |
| `direction` | `"vertical"` \| `"horizontal"` | `"vertical"` | Direction of spacing |
| `className` | `string` | `""` | Additional CSS class |
| `ariaHidden` | `boolean` | `true` | ARIA hidden attribute (spacer is decorative) |

### SpacingScale

Spacing scale (0-10) maps to design tokens:

| Value | Token | Size |
|-------|-------|------|
| `0` | `--s-spacing-0` | 0px |
| `1` | `--s-spacing-1` | 4px |
| `2` | `--s-spacing-2` | 8px |
| `3` | `--s-spacing-3` | 12px |
| `4` | `--s-spacing-4` | 16px (default) |
| `5` | `--s-spacing-5` | 20px |
| `6` | `--s-spacing-6` | 24px |
| `7` | `--s-spacing-7` | 32px |
| `8` | `--s-spacing-8` | 40px |
| `9` | `--s-spacing-9` | 48px |
| `10` | `--s-spacing-10` | 64px |

## Examples

### Vertical Spacing (Default)

Add space between vertically stacked elements:

```tsx
<div>
  <h1>Welcome</h1>
  <Spacer size={4} />
  <p>This paragraph has 16px spacing above it.</p>
  <Spacer size={8} />
  <button>Click Me</button>
</div>
```

### Horizontal Spacing

Add space between horizontally arranged elements:

```tsx
<div style={{ display: 'flex' }}>
  <button>Cancel</button>
  <Spacer size={3} direction="horizontal" />
  <button>Submit</button>
</div>
```

### Responsive Spacing

Different spacing at different breakpoints:

```tsx
<div>
  <h1>Title</h1>
  <Spacer 
    size={{ 
      xs: 3,  // 12px on mobile
      md: 6,  // 24px on tablet
      lg: 8   // 40px on desktop
    }} 
  />
  <p>Content with responsive spacing</p>
</div>
```

### Large Sections

Separate major page sections:

```tsx
<main>
  <section>
    <h2>Features</h2>
    {/* Feature content */}
  </section>
  
  <Spacer size={10} />
  
  <section>
    <h2>Pricing</h2>
    {/* Pricing content */}
  </section>
</main>
```

### With Stack Component

Spacer works well with Stack for consistent spacing:

```tsx
import { Stack, Spacer } from '@spexop/react';

<Stack direction="vertical" gap={0}>
  <h2>Section 1</h2>
  <p>Content</p>
  <Spacer size={8} />
  <h2>Section 2</h2>
  <p>More content</p>
</Stack>
```

## When to Use

### Use Spacer When

- ✅ Adding quick spacing between elements
- ✅ Creating breathing room in layouts
- ✅ Separating sections on a page
- ✅ Adding responsive spacing
- ✅ Working with flex or block layouts

### Use Stack Instead When

- ⭐ Building reusable layouts with multiple children
- ⭐ Need alignment or justification control
- ⭐ Want automatic spacing between all children (gap)
- ⭐ Need wrapping behavior

### Use Grid Instead When

- ⭐ Building complex multi-column layouts
- ⭐ Need precise positioning control
- ⭐ Creating responsive grid patterns
- ⭐ Using named grid areas

## Accessibility

- The component has `aria-hidden="true"` by default since it's purely decorative
- Spacer creates visual separation but no semantic meaning
- Use semantic HTML elements (`<section>`, `<header>`, etc.) for meaningful structure
- Spacer is just a layout utility

## Best Practices

### Do ✅

```tsx
// Use for quick spacing adjustments
<Spacer size={6} />

// Use responsive sizing for better mobile experience
<Spacer size={{ xs: 4, lg: 8 }} />

// Use consistent spacing scale (0-10)
<Spacer size={4} /> // Good - uses scale

// Use horizontal spacer in flex layouts
<div style={{ display: 'flex' }}>
  <div>Left</div>
  <Spacer direction="horizontal" size={4} />
  <div>Right</div>
</div>
```

### Don't ❌

```tsx
// Don't use arbitrary sizes (use spacing scale)
<div style={{ marginTop: '23px' }} /> // Bad
<Spacer size={6} /> // Good - 24px from scale

// Don't use Spacer when Stack gap would be cleaner
<div>
  <div>Item 1</div>
  <Spacer size={4} />
  <div>Item 2</div>
  <Spacer size={4} />
  <div>Item 3</div>
</div>
// Instead, use Stack with gap:
<Stack gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Don't use for complex layouts (use Grid)
<Spacer size={4} direction="horizontal" />
// Consider Grid instead for multi-column layouts
```

## Related Components

- **Stack** - Flexbox utility with automatic gap between children
- **Grid** - CSS Grid for complex layouts
- **Container** - Max-width wrapper with padding
- **Section** - Page section with built-in spacing

## Design Tokens

Spacer uses the spacing scale from @spexop/tokens:

```typescript
import { 
  sSpacing0,  // 0px
  sSpacing1,  // 4px
  sSpacing2,  // 8px
  sSpacing3,  // 12px
  sSpacing4,  // 16px (default)
  sSpacing5,  // 20px
  sSpacing6,  // 24px
  sSpacing7,  // 32px
  sSpacing8,  // 40px
  sSpacing9,  // 48px
  sSpacing10  // 64px
} from '@spexop/tokens';
```

## TypeScript

Full TypeScript support with type definitions:

```typescript
import type { SpacerProps, SpacerDirection, SpacingScale } from '@spexop/react';

const props: SpacerProps = {
  size: 6,
  direction: 'vertical',
  className: 'custom-spacer'
};
```

## Browser Support

Works in all modern browsers that support CSS custom properties:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance

- Zero runtime JavaScript overhead
- Uses CSS custom properties from design tokens
- No re-renders (pure presentational component)
- Minimal CSS output (~50 bytes per instance)

---

**Part of Grid Primitives** - Master the 5 primitives (Grid, GridItem, Stack, Container, Spacer) before building complex layouts.

## Contributing

Contributions are welcome! Please see the [contributing guide](../../CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Author

This project was created by [@olmstedian](https://github.com/olmstedian) and [@spexop](https://github.com/spexop-ui). For more information, please see the [Spexop Design System](https://spexop.com).
