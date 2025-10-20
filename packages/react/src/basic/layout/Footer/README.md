# Footer Component

**Versatile footer component for page layouts**

## Features

- 🎨 **3 Variants**: Default, Minimal, Bordered
- 📏 **Token-Based Spacing**: 0-10 scale with responsive support
- 🎯 **Primitives-First**: Works with Grid/Container/Stack primitives
- ♿ **Accessible**: Semantic HTML, ARIA support, keyboard-friendly
- 🌓 **Theme-Aware**: Automatic light/dark mode support
- 📱 **Responsive**: Mobile-first with responsive props

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Footer } from '@spexop/react';

function App() {
  return (
    <Footer padding={6}>
      <p>© 2025 Company Name</p>
    </Footer>
  );
}
```

## Variants

### Default (Standard Footer)

Border-top separator with surface background. Most common use case.

```tsx
<Footer variant="default" padding={6}>
  <Container maxWidth="xl">
    <p style={{ textAlign: 'center' }}>© 2025 Company Name</p>
  </Container>
</Footer>
```

### Minimal (Transparent)

No border, transparent background. For simple pages and clean aesthetic.

```tsx
<Footer variant="minimal" padding={4}>
  <Container maxWidth="xl">
    <p style={{ textAlign: 'center' }}>© 2025 Company Name</p>
  </Container>
</Footer>
```

### Bordered (Card-like)

All borders with border-radius and raised background. For standalone sections.

```tsx
<Footer variant="bordered" padding={6}>
  <Container maxWidth="xl">
    <p style={{ textAlign: 'center' }}>End of section content</p>
  </Container>
</Footer>
```

## Composition Examples

### Multi-Column Links

```tsx
<Footer padding={{ xs: 6, lg: 8 }}>
  <Container maxWidth="xl">
    <Grid columns={{ xs: 1, sm: 2, md: 4 }} gap={8}>
      <Stack direction="vertical" gap={3}>
        <h3>Product</h3>
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/docs">Documentation</a>
      </Stack>
      
      <Stack direction="vertical" gap={3}>
        <h3>Company</h3>
        <a href="/about">About Us</a>
        <a href="/careers">Careers</a>
        <a href="/contact">Contact</a>
      </Stack>
      
      <Stack direction="vertical" gap={3}>
        <h3>Resources</h3>
        <a href="/blog">Blog</a>
        <a href="/help">Help Center</a>
        <a href="/api">API Docs</a>
      </Stack>
      
      <Stack direction="vertical" gap={3}>
        <h3>Legal</h3>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/cookies">Cookie Policy</a>
      </Stack>
    </Grid>
  </Container>
</Footer>
```

### Complex Footer (Logo + Links + Social)

```tsx
<Footer padding={{ xs: 6, lg: 8 }}>
  <Container maxWidth="xl">
    <Stack direction="vertical" gap={8}>
      {/* Top row: Logo + Links */}
      <Grid columns={{ xs: 1, md: 2 }} gap={8}>
        <Stack direction="vertical" gap={4}>
          <img src="/logo.svg" alt="Company" width={120} />
          <p style={{ color: 'var(--s-color-text-subtle)' }}>
            Building the future of design systems.
          </p>
        </Stack>
        
        <Grid columns={{ xs: 2, sm: 3 }} gap={6}>
          <Stack direction="vertical" gap={3}>
            <h4>Product</h4>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
          </Stack>
          {/* More columns */}
        </Grid>
      </Grid>
      
      {/* Bottom row: Copyright + Social */}
      <Stack 
        direction={{ xs: "vertical", md: "horizontal" }} 
        gap={4}
        justify="space-between"
        align="center"
      >
        <p style={{ color: 'var(--s-color-text-subtle)' }}>
          © 2025 Company Name
        </p>
        
        <Stack direction="horizontal" gap={3}>
          <IconButton aria-label="Twitter" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="GitHub" href="https://github.com">
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  </Container>
</Footer>
```

### Sticky Footer Layout

```tsx
<div style={{
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
}}>
  <TopBar />
  
  <main style={{ flex: 1 }}>
    {/* Page content */}
  </main>
  
  <Footer padding={6}>
    {/* Footer content */}
  </Footer>
</div>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'footer' \| 'div' \| 'section'` | `'footer'` | HTML element to render |
| `variant` | `'default' \| 'minimal' \| 'bordered'` | `'default'` | Visual variant |
| `padding` | `ResponsiveProp<SpacingScale>` | `undefined` | Padding on all sides (0-10 scale) |
| `paddingTop` | `ResponsiveProp<SpacingScale>` | `undefined` | Padding top override |
| `paddingBottom` | `ResponsiveProp<SpacingScale>` | `undefined` | Padding bottom override |
| `paddingLeft` | `ResponsiveProp<SpacingScale>` | `undefined` | Padding left override |
| `paddingRight` | `ResponsiveProp<SpacingScale>` | `undefined` | Padding right override |
| `withBorder` | `boolean` | `false` | Show border around footer |
| `withBackground` | `boolean` | `true` | Apply background color |
| `aria-label` | `string` | `undefined` | ARIA label for footer |
| `aria-labelledby` | `string` | `undefined` | ID of element that labels this footer |
| `children` | `ReactNode` | required | Footer content |
| `className` | `string` | `undefined` | Additional CSS class |
| `style` | `CSSProperties` | `undefined` | Inline styles |

### Spacing Scale

```typescript
0  = 0px    (no padding)
4  = 16px   (mobile default)
6  = 24px   (desktop default)
8  = 40px   (large desktop)
10 = 64px   (extra large)
```

### Responsive Props

```tsx
// Single value (applies to all breakpoints)
<Footer padding={6}>

// Responsive object (mobile-first)
<Footer padding={{ xs: 4, md: 6, lg: 8 }}>
```

**Breakpoints**: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1440px)

## Accessibility

### Semantic HTML

```tsx
// ✅ Default: <footer> landmark
<Footer>...</Footer>
// Renders: <footer role="contentinfo">...</footer>

// ✅ Can override for nested footers
<Footer as="div">...</Footer>
```

**Rules:**
- Page-level footer MUST use `<footer>` element
- Only ONE main `<footer>` landmark per page
- Nested/section footers SHOULD use `<div>` or `<section>`

### ARIA Labels

```tsx
// ✅ Label footer
<Footer aria-label="Site footer">...</Footer>

// ✅ Or reference heading
<Footer aria-labelledby="footer-heading">
  <h2 id="footer-heading">Company Information</h2>
  ...
</Footer>
```

### Link Structure

```tsx
// ✅ Proper link groups with headings
<Stack direction="vertical" gap={3}>
  <h3>Product Links</h3>
  <a href="/features">Features</a>
  <a href="/pricing">Pricing</a>
</Stack>
```

**Rules:**
- Group related links under headings
- Use proper heading hierarchy (h2 → h3 → h4)
- All links MUST have discernible text
- Icon-only links MUST have `aria-label`

## Design Tokens

### Colors Used

```css
--s-color-surface          /* Background */
--s-color-surface-raised   /* Elevated background */
--s-color-text             /* Primary text */
--s-color-text-subtle      /* Secondary text */
--s-color-border           /* Default border */
--s-color-primary-500      /* Links, focus */
```

### Border Radius

```css
--s-radius-md: 6px  /* Bordered variant */
```

## Foundation Integration

Footer works seamlessly with Grid primitives:

```tsx
import { Footer, Container, Grid, Stack } from '@spexop/react';

<Footer padding={6}>
  <Container maxWidth="xl">
    <Grid columns={{ xs: 1, md: 3 }} gap={6}>
      <Stack direction="vertical" gap={3}>
        {/* Content */}
      </Stack>
    </Grid>
  </Container>
</Footer>
```

## Best Practices

### ✅ DO

- Use Container to constrain width
- Use Grid for multi-column layouts
- Use Stack for vertical spacing
- Apply responsive padding
- Use semantic HTML elements
- Group links under headings
- Use design tokens for colors

### ❌ DON'T

- Hardcode padding values
- Skip Container wrapper
- Use div with onClick for interactivity
- Mix Footer with CardFooter or SidebarFooter
- Skip ARIA labels for accessibility
- Use more than one `<footer>` landmark per page

## Related Components

- **Container** - Width constraints and centering
- **Grid** - Multi-column layouts
- **Stack** - Vertical/horizontal spacing
- **CardFooter** - Footer for Card components
- **SidebarFooter** - Footer for Sidebar navigation
- **NavLink** - Navigation links

## TypeScript

```typescript
import type { FooterProps, FooterVariant } from '@spexop/react';

const props: FooterProps = {
  variant: 'default',
  padding: 6,
  children: <p>Footer content</p>
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

## Version

**v0.1.0** - Initial release

## License

MIT © Spexop Design System

