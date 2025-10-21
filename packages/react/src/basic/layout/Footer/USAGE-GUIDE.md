# Footer - Usage Guide

**Component Version**: v0.1.0
**Last Updated**: October 21, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { Footer } from '@spexop/react';

function App() {
  return (
    <Footer padding={6}>
      <p>© 2025 Company Name. All rights reserved.</p>
    </Footer>
  );
}
```

## Common Use Cases

### Site-Wide Footer

Complete footer with links and copyright:

```tsx
import { Footer, Container, Grid, Stack } from '@spexop/react';

function SiteFooter() {
  return (
    <Footer
      variant="default"
      padding={10}
      withBorder
      withBackground
      aria-label="Site footer"
    >
      <Container maxWidth="xl">
        <Grid columns={{ xs: 1, md: 4 }} gap={8}>
          <Stack direction="vertical" gap={4}>
            <h3>Product</h3>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/docs">Documentation</a>
          </Stack>
          
          <Stack direction="vertical" gap={4}>
            <h3>Company</h3>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/careers">Careers</a>
          </Stack>
          
          <Stack direction="vertical" gap={4}>
            <h3>Resources</h3>
            <a href="/support">Support</a>
            <a href="/community">Community</a>
            <a href="/contact">Contact</a>
          </Stack>
          
          <Stack direction="vertical" gap={4}>
            <h3>Legal</h3>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/security">Security</a>
          </Stack>
        </Grid>
        
        <Stack
          direction="horizontal"
          gap={4}
          justify="space-between"
          align="center"
          style={{ marginTop: 'var(--theme-spacing-8)', paddingTop: 'var(--theme-spacing-8)', borderTop: '1px solid var(--theme-border)' }}
        >
          <p>© 2025 Company Name. All rights reserved.</p>
          <Stack direction="horizontal" gap={4}>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://github.com">GitHub</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </Stack>
        </Stack>
      </Container>
    </Footer>
  );
}
```

### Minimal Footer

Simple copyright notice:

```tsx
import { Footer, Container } from '@spexop/react';

function MinimalFooter() {
  return (
    <Footer
      variant="minimal"
      padding={4}
      withBorder={false}
      withBackground={false}
    >
      <Container maxWidth="xl">
        <p style={{ textAlign: 'center', color: 'var(--theme-text-secondary)' }}>
          © 2025 Company Name
        </p>
      </Container>
    </Footer>
  );
}
```

### Section Footer

Footer within a specific section:

```tsx
import { Footer, Stack } from '@spexop/react';

function ArticleFooter() {
  return (
    <Footer
      as="div"
      variant="bordered"
      padding={6}
      withBorder
    >
      <Stack direction="horizontal" gap={6} justify="space-between" align="center">
        <div>
          <p><strong>Author:</strong> Jane Doe</p>
          <p><strong>Published:</strong> October 21, 2025</p>
        </div>
        <Stack direction="horizontal" gap={4}>
          <button>Share</button>
          <button>Bookmark</button>
        </Stack>
      </Stack>
    </Footer>
  );
}
```

### Footer with Newsletter

```tsx
import { Footer, Container, Grid, Stack, TextInput, Button } from '@spexop/react';

function NewsletterFooter() {
  return (
    <Footer padding={10} withBorder>
      <Container maxWidth="xl">
        <Grid columns={{ xs: 1, md: 2 }} gap={8}>
          <Stack direction="vertical" gap={4}>
            <h2>Stay Updated</h2>
            <p>Get the latest news and updates delivered to your inbox.</p>
            <Stack direction="horizontal" gap={2}>
              <TextInput
                placeholder="Enter your email"
                type="email"
                style={{ flex: 1 }}
              />
              <Button variant="primary">Subscribe</Button>
            </Stack>
          </Stack>
          
          <Stack direction="vertical" gap={4}>
            <h3>Quick Links</h3>
            <Grid columns={2} gap={2}>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </Grid>
          </Stack>
        </Grid>
        
        <p style={{ marginTop: 'var(--theme-spacing-6)', textAlign: 'center' }}>
          © 2025 Company Name. All rights reserved.
        </p>
      </Container>
    </Footer>
  );
}
```

## Features and Props

### Variants

```tsx
{/* Default - full styling */}
<Footer variant="default" padding={6}>
  <p>Footer content</p>
</Footer>

{/* Minimal - transparent, no borders */}
<Footer variant="minimal" padding={4}>
  <p>Footer content</p>
</Footer>

{/* Bordered - emphasis on top border */}
<Footer variant="bordered" padding={6}>
  <p>Footer content</p>
</Footer>
```

### Padding

Control spacing with responsive padding:

```tsx
{/* Fixed padding */}
<Footer padding={6}>
  <p>Footer content</p>
</Footer>

{/* Responsive padding */}
<Footer padding={{ xs: 4, md: 8, lg: 12 }}>
  <p>Footer content</p>
</Footer>

{/* Directional padding */}
<Footer
  paddingTop={8}
  paddingBottom={8}
  paddingLeft={6}
  paddingRight={6}
>
  <p>Footer content</p>
</Footer>
```

### Visual Modifiers

```tsx
{/* With top border */}
<Footer withBorder>
  <p>Footer content</p>
</Footer>

{/* Without background */}
<Footer withBackground={false}>
  <p>Footer content</p>
</Footer>

{/* Combination */}
<Footer
  withBorder
  withBackground={false}
  variant="minimal"
>
  <p>Footer content</p>
</Footer>
```

### Semantic HTML

```tsx
{/* As footer element (default) */}
<Footer>
  <p>Site footer</p>
</Footer>

{/* As div element (for section footers) */}
<Footer as="div">
  <p>Section footer</p>
</Footer>

{/* As section element */}
<Footer as="section" aria-label="Page footer">
  <p>Footer content</p>
</Footer>
```

## Layout Composition

### With Grid System

```tsx
import { Footer, Container, Grid } from '@spexop/react';

function GridFooter() {
  return (
    <Footer padding={8}>
      <Container maxWidth="xl">
        <Grid
          columns={{ xs: 1, sm: 2, md: 4 }}
          gap={{ xs: 6, md: 8 }}
        >
          <div>Column 1</div>
          <div>Column 2</div>
          <div>Column 3</div>
          <div>Column 4</div>
        </Grid>
      </Container>
    </Footer>
  );
}
```

### With Stack

```tsx
import { Footer, Container, Stack } from '@spexop/react';

function StackFooter() {
  return (
    <Footer padding={6}>
      <Container maxWidth="xl">
        <Stack direction="vertical" gap={6}>
          <Stack direction="horizontal" gap={8} justify="space-between">
            <div>Brand Info</div>
            <div>Quick Links</div>
          </Stack>
          <Stack direction="horizontal" justify="center">
            <p>© 2025 Company Name</p>
          </Stack>
        </Stack>
      </Container>
    </Footer>
  );
}
```

## Accessibility

### ARIA Labels

```tsx
{/* Primary site footer */}
<Footer aria-label="Site footer">
  <p>Footer content</p>
</Footer>

{/* Reference footer by ID */}
<Footer aria-labelledby="footer-heading">
  <h2 id="footer-heading">Site Information</h2>
  <p>Footer content</p>
</Footer>
```

### Keyboard Navigation

All links and buttons within Footer are keyboard accessible:

- **Tab**: Navigate through interactive elements
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate links and buttons

### Screen Readers

- Uses semantic `<footer>` element by default
- Properly labeled with `aria-label` or `aria-labelledby`
- Link text is descriptive and meaningful

## Best Practices

### DO

- Use semantic `<footer>` element for site-wide footers
- Use `as="div"` for section-specific footers
- Provide proper ARIA labels for accessibility
- Use Container for consistent max-width
- Use Grid/Stack for responsive layout
- Keep footer height reasonable (not too tall)
- Include copyright and legal information
- Use consistent padding across breakpoints

### DON'T

- Don't use multiple site-wide footers on one page
- Don't forget responsive padding adjustments
- Don't use `variant="minimal"` with `withBorder=true` (conflicting)
- Don't hide critical information in footer
- Don't use tiny text that's hard to read
- Don't forget to test keyboard navigation

## Common Patterns

### Two-Tier Footer

```tsx
<Footer padding={0}>
  <Container maxWidth="xl">
    {/* Main footer content */}
    <div style={{ padding: 'var(--theme-spacing-10) 0' }}>
      <Grid columns={{ xs: 1, md: 4 }} gap={8}>
        {/* Footer columns */}
      </Grid>
    </div>
    
    {/* Bottom bar */}
    <div style={{
      padding: 'var(--theme-spacing-4) 0',
      borderTop: '1px solid var(--theme-border)'
    }}>
      <Stack direction="horizontal" justify="space-between" align="center">
        <p>© 2025 Company</p>
        <Stack direction="horizontal" gap={4}>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </Stack>
      </Stack>
    </div>
  </Container>
</Footer>
```

### Footer with Logo

```tsx
<Footer padding={8}>
  <Container maxWidth="xl">
    <Stack direction="vertical" gap={6}>
      <img src="/logo.svg" alt="Company Logo" style={{ height: '40px' }} />
      <Grid columns={{ xs: 2, md: 4 }} gap={6}>
        {/* Footer links */}
      </Grid>
      <p style={{ color: 'var(--theme-text-secondary)' }}>
        © 2025 Company Name. All rights reserved.
      </p>
    </Stack>
  </Container>
</Footer>
```

## Responsive Design

### Mobile-First Approach

```tsx
<Footer
  padding={{ xs: 6, md: 10 }}
  paddingTop={{ xs: 8, md: 12 }}
  paddingBottom={{ xs: 8, md: 12 }}
>
  <Container maxWidth="xl" padding={{ xs: 4, md: 6 }}>
    <Grid
      columns={{ xs: 1, sm: 2, md: 4 }}
      gap={{ xs: 6, md: 8 }}
    >
      {/* Responsive columns */}
    </Grid>
  </Container>
</Footer>
```

## Styling

### Theme Integration

Footer automatically uses theme tokens:

- Background: `var(--theme-surface)`
- Text: `var(--theme-text)`
- Border: `var(--theme-border)`
- Spacing: `var(--theme-spacing-*)`

### Custom Styling

```tsx
<Footer
  className="custom-footer"
  style={{
    backgroundColor: 'var(--theme-surface-alt)',
    borderTop: '2px solid var(--theme-primary)'
  }}
>
  <p>Footer content</p>
</Footer>
```

## Performance Tips

- Keep footer content relatively simple
- Lazy load social media widgets
- Optimize images and logos
- Use CSS for visual effects, not JavaScript
- Minimize external scripts in footer

## Related Components

- **Container**: For consistent max-width
- **Grid**: For responsive column layouts
- **Stack**: For horizontal/vertical arrangements
- **Section**: For page sections with footers

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Site-wide footers
- Section footers
- Newsletter footers
- Social media integration
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

Footer provides:

- Versatile footer component for any layout
- Multiple variants (default, minimal, bordered)
- Responsive padding system
- Semantic HTML options
- Complete accessibility
- Theme integration
- Primitives-first composition

Perfect for:

- Site-wide footers
- Section footers
- Article footers
- Newsletter sections
- Legal information

Built with Spexop design principles for a refined, accessible user experience.
