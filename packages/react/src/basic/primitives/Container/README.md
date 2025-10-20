# Container

A max-width wrapper for page content with responsive padding using design tokens.

## Overview

Container constrains content width and provides consistent padding. Use it to wrap page sections and maintain readable line lengths and proper margins across different screen sizes.

## Quick Start

```tsx
import { Container } from '@spexop/react';

// Default container (xl max-width, centered)
<Container>
  <h1>Page Content</h1>
  <p>This content is constrained to 1440px max-width</p>
</Container>

// Medium container for articles
<Container maxWidth="md" padding={8}>
  <article>Blog post content</article>
</Container>
```

## Features

- **7 Max-Width Options** - xs, sm, md, lg, xl (default), 2xl, full
- **Padding Control** - Spacing scale 0-10 (0px to 64px)
- **Individual Padding** - Override left, right, top, bottom independently
- **Auto-Centering** - Centered by default
- **Fluid Mode** - No max-width constraints
- **Responsive Props** - All props support breakpoint objects
- **Token-Based** - Uses design system breakpoint tokens

## Basic Usage

### Default Container

```tsx
<Container>
  <h1>Page Title</h1>
  <p>Content automatically centered with xl max-width (1440px)</p>
</Container>
```

### Custom Max-Width

```tsx
// Article/blog content (optimal reading width)
<Container maxWidth="md">
  <article>Blog content</article>
</Container>

// Dashboard/data displays (wide)
<Container maxWidth="2xl">
  <DashboardContent />
</Container>

// Narrow forms
<Container maxWidth="sm">
  <form>Login form</form>
</Container>
```

### Custom Padding

```tsx
// Tight padding
<Container padding={2}>
  Compact layout
</Container>

// Generous padding
<Container padding={8}>
  Spacious layout
</Container>

// No padding
<Container padding={0}>
  Edge-to-edge content
</Container>
```

## Advanced Usage

### Individual Padding Overrides

```tsx
<Container
  maxWidth="lg"
  padding={4}
  paddingTop={8}
  paddingBottom={8}
>
  More vertical spacing, normal horizontal
</Container>

<Container
  maxWidth="lg"
  paddingLeft={2}
  paddingRight={2}
  paddingTop={6}
  paddingBottom={6}
>
  Tight horizontal, generous vertical
</Container>
```

### Fluid Container

No max-width, full viewport width:

```tsx
<Container fluid padding={6}>
  <div>Full-width content, still has padding</div>
</Container>
```

### Not Centered

Left-aligned container:

```tsx
<Container maxWidth="lg" centered={false}>
  <div>Left-aligned container</div>
</Container>
```

### Responsive Max-Width

Different widths at different breakpoints:

```tsx
<Container
  maxWidth={{ xs: "full", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
  padding={6}
>
  Adapts width based on screen size
</Container>
```

### Responsive Padding

Tighter on mobile, generous on desktop:

```tsx
<Container
  maxWidth="lg"
  padding={{ xs: 2, sm: 4, md: 6, lg: 8 }}
>
  Mobile: 8px, Desktop: 40px
</Container>
```

## Common Patterns

### Page Layout

```tsx
<Container maxWidth="2xl" padding={6}>
  <Stack direction="vertical" gap={8}>
    <header>
      <h1>Page Title</h1>
      <p>Subtitle</p>
    </header>
    <main>
      <p>Main content</p>
    </main>
    <footer>
      <p>Footer content</p>
    </footer>
  </Stack>
</Container>
```

### Article/Blog Post

```tsx
<Container maxWidth="md" padding={{ xs: 4, md: 8 }}>
  <article>
    <h1>Article Title</h1>
    <p>Optimal reading width for long-form content.</p>
    <p>Medium container (1024px) provides comfortable line length.</p>
  </article>
</Container>
```

### Form Container

```tsx
<Container maxWidth="sm" padding={6}>
  <Stack direction="vertical" gap={6}>
    <h2>Sign Up</h2>
    <TextInput label="Email" fullWidth />
    <TextInput label="Password" type="password" fullWidth />
    <Button fullWidth variant="primary">Create Account</Button>
  </Stack>
</Container>
```

### Dashboard

```tsx
<Container maxWidth="2xl" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={12}>
      <h1>Dashboard</h1>
    </GridItem>
    <GridItem span={{ xs: 12, md: 3 }}>
      <Sidebar />
    </GridItem>
    <GridItem span={{ xs: 12, md: 9 }}>
      <MainContent />
    </GridItem>
  </Grid>
</Container>
```

### Marketing Page

```tsx
<Container maxWidth="2xl" padding={6}>
  <Stack direction="vertical" gap={10}>
    <Hero />
    <Grid columns={{ xs: 1, md: 3 }} gap={6}>
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
    </Grid>
    <Footer />
  </Stack>
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content (required) |
| `maxWidth` | `ResponsiveProp<"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full">` | `"xl"` | Maximum width |
| `padding` | `ResponsiveProp<0-10>` | `4` | Padding around content |
| `paddingLeft` | `ResponsiveProp<0-10>` | - | Left padding override |
| `paddingRight` | `ResponsiveProp<0-10>` | - | Right padding override |
| `paddingTop` | `ResponsiveProp<0-10>` | - | Top padding override |
| `paddingBottom` | `ResponsiveProp<0-10>` | - | Bottom padding override |
| `centered` | `boolean` | `true` | Center horizontally |
| `fluid` | `boolean` | `false` | No max-width constraints |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `as` | `ElementType` | `"div"` | HTML element type |

## Max-Width Values (Token-Based)

All max-widths use design system breakpoint tokens:

- `xs`: 640px (sBreakpointSm)
- `sm`: 768px (sBreakpointMd)
- `md`: 1024px (sBreakpointLg)
- `lg`: 1280px (sBreakpointXl)
- `xl`: 1440px (sBreakpoint2xl) - **default**
- `2xl`: 1920px
- `full`: No max-width

## Spacing Scale Reference

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

✅ **Wrap page content in Container**

```tsx
<Container maxWidth="2xl">
  Consistent max-width across your app
</Container>
```

✅ **Use appropriate max-width for content type**

```tsx
// Articles: md (1024px)
<Container maxWidth="md">
  <article>Long-form content</article>
</Container>

// Dashboard: 2xl (1920px)
<Container maxWidth="2xl">
  <Dashboard />
</Container>
```

✅ **Use responsive padding**

```tsx
<Container padding={{ xs: 2, md: 6 }}>
  Tighter on mobile, generous on desktop
</Container>
```

### DON'T

❌ **Don't use fluid with specific maxWidth**

```tsx
// Bad: Conflicting props
<Container maxWidth="lg" fluid>
  Fluid overrides maxWidth
</Container>

// Good: Use one or the other
<Container maxWidth="lg">Constrained</Container>
<Container fluid>Full-width</Container>
```

❌ **Don't nest Containers**

```tsx
// Bad: Unnecessary nesting
<Container>
  <Container>Double-wrapped</Container>
</Container>

// Good: One container per section
<Container>
  <Grid>Layout content</Grid>
</Container>
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic landmarks:

```tsx
<Container as="main" maxWidth="2xl">
  Main page content
</Container>

<Container as="article" maxWidth="md">
  Article content
</Container>

<Container as="section" maxWidth="lg">
  Page section
</Container>
```

### Landmarks

Combine with ARIA:

```tsx
<Container as="main" aria-label="Main content" maxWidth="2xl">
  Page content
</Container>
```

## Integration with Other Components

### With Grid

```tsx
<Container maxWidth="2xl" padding={6}>
  <Grid columns={12} gap={6}>
    <GridItem span={12}>Header</GridItem>
    <GridItem span={3}>Sidebar</GridItem>
    <GridItem span={9}>Content</GridItem>
  </Grid>
</Container>
```

### With Stack

```tsx
<Container maxWidth="lg" padding={8}>
  <Stack direction="vertical" gap={6}>
    <h1>Title</h1>
    <Card>Content</Card>
    <Card>More content</Card>
  </Stack>
</Container>
```

## Browser Support

- **max-width**: All browsers
- **margin: 0 auto**: All browsers (for centering)
- **padding**: All browsers

## TypeScript

```typescript
interface ContainerProps {
  children: ReactNode;
  maxWidth?: ResponsiveProp<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full">;
  padding?: ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>;
  paddingLeft?: ResponsiveProp<SpacingScale>;
  paddingRight?: ResponsiveProp<SpacingScale>;
  paddingTop?: ResponsiveProp<SpacingScale>;
  paddingBottom?: ResponsiveProp<SpacingScale>;
  centered?: boolean;
  fluid?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
```

## Examples

See **Storybook** for 12 interactive examples:

- Max-width variations
- Padding variations
- Responsive sizing
- Page layouts
- Article layouts
- Dashboard layouts

## Related Components

- **Grid** - Layout system
- **Stack** - Simple stacking
- **Spacer** - Spacing utility

## See Also

- [Grid Primitives Guide](/docs/grid-primitives.md)
- [Responsive Patterns](/docs/responsive-patterns.md)

## Contributing

Contributions are welcome! Please see the [contributing guide](../../CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Author

This project was created by [@olmstedian](https://github.com/olmstedian) and [@spexop](https://github.com/spexop-ui). For more information, please see the [Spexop Design System](https://spexop.com).
