# Stack

A simple flexbox utility for stacking elements vertically or horizontally with consistent spacing using design tokens.

## Overview

Stack is a lightweight alternative to Grid for simple stacking patterns. Use it when you need to stack items in one direction without complex positioning or spanning requirements.

## Quick Start

```tsx
import { Stack } from '@spexop/react';

// Vertical stack (default)
<Stack gap={4}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stack>

// Horizontal stack
<Stack direction="horizontal" gap={3}>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</Stack>
```

## Features

- **Two Directions** - Vertical (default) or horizontal
- **Gap Control** - Spacing scale 0-10 (0px to 64px)
- **Alignment** - Cross-axis alignment (start, center, end, stretch, baseline)
- **Justification** - Main-axis distribution (start, center, end, space-between, space-around, space-evenly)
- **Wrapping** - Optional flex-wrap support
- **Responsive Props** - All props support breakpoint objects
- **Overflow Protection** - min-width: 0 prevents flex overflow issues
- **Polymorphic** - Render as any HTML element

## Basic Usage

### Vertical Stack (Default)

```tsx
<Stack direction="vertical" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Horizontal Stack

```tsx
<Stack direction="horizontal" gap={3}>
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>
```

### Gap Variations

```tsx
// Tight spacing
<Stack gap={2}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Generous spacing
<Stack gap={8}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// No spacing
<Stack gap={0}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

## Advanced Usage

### Alignment

Control cross-axis alignment:

```tsx
// Vertical stack - controls horizontal alignment
<Stack direction="vertical" gap={4} align="center">
  <div style={{ width: '200px' }}>Centered horizontally</div>
  <div style={{ width: '150px' }}>Centered horizontally</div>
</Stack>

// Horizontal stack - controls vertical alignment
<Stack direction="horizontal" gap={4} align="center">
  <div style={{ height: '60px' }}>Centered vertically</div>
  <div style={{ height: '100px' }}>Centered vertically</div>
</Stack>
```

### Justification

Control main-axis distribution:

```tsx
// Push items to ends
<Stack direction="horizontal" gap={4} justify="space-between">
  <div>Left</div>
  <div>Right</div>
</Stack>

// Center items
<Stack direction="horizontal" gap={4} justify="center">
  <Button>Primary Action</Button>
</Stack>

// Right-align actions
<Stack direction="horizontal" gap={3} justify="end">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>
```

### Wrapping

Enable wrapping for tags, chips, or navigation:

```tsx
<Stack direction="horizontal" gap={2} wrap>
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
  <Badge>Tag 4</Badge>
  <Badge>Tag 5</Badge>
</Stack>
```

### Responsive Direction

Switch from vertical to horizontal at breakpoints:

```tsx
<Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
  <div>Stacked on mobile</div>
  <div>Side-by-side on desktop</div>
</Stack>
```

### Baseline Alignment

Perfect for text with different sizes:

```tsx
<Stack direction="horizontal" gap={3} align="baseline">
  <h1>$49</h1>
  <span>per month</span>
  <small>(billed annually)</small>
</Stack>
```

## Common Patterns

### Button Group

```tsx
<Stack direction="horizontal" gap={3} justify="end">
  <Button variant="ghost">Cancel</Button>
  <Button variant="secondary">Save Draft</Button>
  <Button variant="primary">Publish</Button>
</Stack>
```

### Form Layout

```tsx
<Stack direction="vertical" gap={6}>
  <TextInput label="Full Name" />
  <TextInput label="Email" />
  <TextArea label="Message" />
  
  <Stack direction="horizontal" gap={3} justify="end">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </Stack>
</Stack>
```

### Card List

```tsx
<Stack direction="vertical" gap={6}>
  <Card>
    <CardHeader title="Article 1" />
    <CardBody>Summary text</CardBody>
  </Card>
  <Card>
    <CardHeader title="Article 2" />
    <CardBody>Summary text</CardBody>
  </Card>
  <Card>
    <CardHeader title="Article 3" />
    <CardBody>Summary text</CardBody>
  </Card>
</Stack>
```

### Navigation Bar

```tsx
<Stack as="nav" direction="horizontal" gap={6} align="center" justify="space-between">
  <div>Logo</div>
  <Stack direction="horizontal" gap={4}>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/about">About</NavLink>
    <NavLink href="/contact">Contact</NavLink>
  </Stack>
  <Button variant="primary">Sign In</Button>
</Stack>
```

### Toolbar

```tsx
<Stack direction="horizontal" gap={6} align="center" justify="space-between">
  <Stack direction="horizontal" gap={2}>
    <IconButton icon={<Bold />} />
    <IconButton icon={<Italic />} />
    <IconButton icon={<Link />} />
  </Stack>
  
  <Stack direction="horizontal" gap={3}>
    <Button>Save</Button>
    <Button variant="primary">Publish</Button>
  </Stack>
</Stack>
```

### Nested Stacks

```tsx
<Stack direction="vertical" gap={6}>
  <h1>Page Title</h1>
  
  <Stack direction="horizontal" gap={6}>
    <Stack direction="vertical" gap={4} style={{ flex: 1 }}>
      <h2>Sidebar</h2>
      <Card>Widget 1</Card>
      <Card>Widget 2</Card>
    </Stack>
    
    <Stack direction="vertical" gap={4} style={{ flex: 3 }}>
      <h2>Main Content</h2>
      <Card>Content goes here</Card>
    </Stack>
  </Stack>
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content (required) |
| `direction` | `ResponsiveProp<"vertical" \| "horizontal">` | `"vertical"` | Stack direction |
| `gap` | `ResponsiveProp<0-10>` | `4` | Gap between items |
| `align` | `ResponsiveProp<"start" \| "center" \| "end" \| "stretch" \| "baseline">` | `"stretch"` | Cross-axis alignment |
| `justify` | `ResponsiveProp<"start" \| "center" \| "end" \| "space-between" \| "space-around" \| "space-evenly">` | `"start"` | Main-axis distribution |
| `wrap` | `boolean` | `false` | Enable wrapping |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `as` | `ElementType` | `"div"` | HTML element type |

## Responsive Props

All major props support responsive objects:

```tsx
<Stack 
  direction={{ xs: "vertical", md: "horizontal" }}
  gap={{ xs: 2, md: 4, lg: 6 }}
  align={{ xs: "start", lg: "center" }}
  justify={{ xs: "start", lg: "space-between" }}
>
  Content
</Stack>
```

**Breakpoints:**

- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1440px

## Spacing Scale Reference

The Stack component uses spacing tokens (0-10) from the design system:

- `0` - 0px
- `1` - 4px
- `2` - 8px
- `3` - 12px
- `4` - 16px (default)
- `5` - 20px
- `6` - 24px
- `7` - 32px
- `8` - 40px
- `9` - 48px
- `10` - 64px

## Best Practices

### DO

✅ **Use Stack for simple layouts**

```tsx
<Stack direction="vertical" gap={4}>
  Simple stacking without complex positioning
</Stack>
```

✅ **Use responsive direction**

```tsx
<Stack direction={{ xs: "vertical", md: "horizontal" }}>
  Mobile-first responsive layout
</Stack>
```

✅ **Nest stacks for complex layouts**

```tsx
<Stack direction="vertical">
  <Stack direction="horizontal" justify="space-between">
    Nested stacks for structure
  </Stack>
</Stack>
```

✅ **Use baseline for mixed text sizes**

```tsx
<Stack direction="horizontal" align="baseline">
  <h2>$99</h2>
  <span>per month</span>
</Stack>
```

### DON'T

❌ **Don't use Stack when you need Grid features**

```tsx
// Bad: Use Grid for spanning/positioning
<Stack>
  <div>Can't span multiple columns</div>
</Stack>

// Good: Use Grid for complex layouts
<Grid columns={12}>
  <GridItem span={6}>Can span columns</GridItem>
</Grid>
```

❌ **Don't use inline styles for static spacing**

```tsx
// Bad
<Stack style={{ gap: '20px' }}>
  Bypasses design tokens
</Stack>

// Good
<Stack gap={5}>
  Uses --s-spacing-5 (20px) token
</Stack>
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic markup:

```tsx
<Stack as="nav" direction="horizontal" gap={4}>
  <NavLink href="/">Home</NavLink>
  <NavLink href="/about">About</NavLink>
</Stack>

<Stack as="ul" direction="vertical" gap={3}>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</Stack>
```

### Landmarks

Combine with ARIA landmarks:

```tsx
<Stack as="nav" aria-label="Main navigation" direction="horizontal" gap={4}>
  Navigation items
</Stack>
```

## Stack vs Grid

**Use Stack when:**

- Simple vertical or horizontal stacking
- No complex positioning needed
- No spanning requirements
- Button groups, form fields, card lists

**Use Grid when:**

- Multi-column layouts
- Item spanning (span={6})
- Precise positioning (start/end)
- Named grid areas
- Complex responsive layouts

## Technical Details

### Overflow Protection

Stack includes `min-width: 0` to prevent flexbox overflow issues:

```css
.stack {
  min-width: 0; /* Allow flex items to shrink below content size */
}

.stack > * {
  min-width: 0; /* Ensure children can shrink */
}
```

This prevents issues with long words, code blocks, or images that might overflow.

### Auto-Expand for Centering

When using centering or space distribution, Stack automatically expands to full width:

```css
.justifyCenter,
.justifySpaceBetween,
.justifySpaceAround,
.justifySpaceEvenly {
  width: 100%; /* Auto-expand for proper distribution */
}
```

This ensures space-between, space-around, and space-evenly work correctly.

### Alignment vs Justification

**For Vertical Stacks:**

- `align` - Controls horizontal alignment (cross-axis)
- `justify` - Controls vertical distribution (main-axis)

**For Horizontal Stacks:**

- `align` - Controls vertical alignment (cross-axis)
- `justify` - Controls horizontal distribution (main-axis)

## Integration with Other Components

### With Grid

```tsx
<Grid columns={2} gap={6}>
  <GridItem>
    <Stack direction="vertical" gap={4}>
      <Card>Item 1</Card>
      <Card>Item 2</Card>
    </Stack>
  </GridItem>
  <GridItem>
    <Stack direction="vertical" gap={4}>
      <Card>Item 3</Card>
      <Card>Item 4</Card>
    </Stack>
  </GridItem>
</Grid>
```

### With Container

```tsx
<Container maxWidth="lg" padding={6}>
  <Stack direction="vertical" gap={8}>
    <h1>Page Title</h1>
    <p>Introduction</p>
    <Card>Content</Card>
  </Stack>
</Container>
```

## Browser Support

- **Flexbox**: All modern browsers
- **flex-direction**: All modern browsers
- **flex-wrap**: All modern browsers
- **gap property**: All modern browsers (IE11 requires fallback)

## TypeScript

```typescript
interface StackProps {
  children: ReactNode;
  direction?: ResponsiveProp<"vertical" | "horizontal">;
  gap?: ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>;
  align?: ResponsiveProp<"start" | "center" | "end" | "stretch" | "baseline">;
  justify?: ResponsiveProp<"start" | "center" | "end" | "space-between" | "space-around" | "space-evenly">;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
```

## Examples

See **Storybook** for 13 interactive examples:

- Vertical and horizontal stacks
- Gap variations
- Alignment options
- Justification options
- Wrapping patterns
- Responsive direction
- Real-world patterns

## Related Components

- **Grid** - Complex multi-dimensional layouts
- **GridItem** - Grid item positioning
- **Container** - Max-width wrapper
- **Spacer** - Simple spacing utility

## See Also

- [Grid Component](../Grid/README.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [Responsive Patterns](/docs/responsive-patterns.md)

## Contributing

Contributions are welcome! Please see the [contributing guide](../../CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Author

This project was created by [@olmstedian](https://github.com/olmstedian) and [@spexop](https://github.com/spexop-ui). For more information, please see the [Spexop Design System](https://spexop.com).
