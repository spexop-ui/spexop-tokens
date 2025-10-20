# ButtonGridItem Component

**Interactive media card that displays images/videos with overlay content and call-to-action buttons.**

**component** ButtonGridItem  
**packageName** @spexop/react  
**description** Interactive media card with overlay content and call-to-action  
**author** @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian  
**version** 0.1.0  
**since** 2025-10-13

---

## Features

- ✅ **Media Support**: img, picture, or video elements as background
- ✅ **Dual Click Areas**: Click anywhere on card OR the button to trigger action
- ✅ **Smooth Animations**: Card lift, media zoom, button slide effects
- ✅ **Gradient Overlay**: Ensures text legibility on any background
- ✅ **Aspect Ratio Control**: Configurable aspect ratio with minimum height
- ✅ **Full Accessibility**: Keyboard navigation, ARIA labels, focus management
- ✅ **primitives-Aligned**: Uses spacing tokens, semantic colors
- ✅ **Theme-Aware**: Works in light and dark modes
- ✅ **Palette Integration**: Action button adapts to selected color palette
- ✅ **Mobile Responsive**: Optimized spacing and typography for small screens
- ✅ **Performance**: GPU acceleration, lazy loading support

---

## Installation

```bash
pnpm add @spexop/react
```

---

## Basic Usage

```tsx
import { ButtonGridItem } from '@spexop/react';

function MediaCard() {
  const handleClick = () => {
    console.log('Card clicked!');
  };

  return (
    <ButtonGridItem
      media={<img src="hero-image.jpg" alt="Design system showcase" />}
      label="Learn More"
      description="Discover our comprehensive design system with modern components"
      buttonText="Get Started"
      onClick={handleClick}
    />
  );
}
```

---

## With Video Background

```tsx
import { ButtonGridItem } from '@spexop/react';

function VideoCard() {
  return (
    <ButtonGridItem
      media={
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="video-poster.jpg"
        >
          <source src="hero-video.mp4" type="video/mp4" />
        </video>
      }
      label="Watch Demo"
      description="See our design system in action with this interactive demo"
      buttonText="Play Video"
      onClick={() => window.open('/demo', '_blank')}
    />
  );
}
```

---

## With Responsive Images

```tsx
import { ButtonGridItem } from '@spexop/react';

function ResponsiveCard() {
  return (
    <ButtonGridItem
      media={
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="hero-desktop.jpg 2x, hero-desktop.jpg 1x"
          />
          <source
            media="(max-width: 767px)"
            srcSet="hero-mobile.jpg 2x, hero-mobile.jpg 1x"
          />
          <img
            src="hero-desktop.jpg"
            alt="Responsive hero image"
            loading="lazy"
          />
        </picture>
      }
      label="Explore"
      description="Discover our responsive design patterns and mobile-first approach"
      buttonText="Learn More"
      onClick={handleExplore}
    />
  );
}
```

---

## Custom Aspect Ratio

```tsx
import { ButtonGridItem } from '@spexop/react';

function SquareCard() {
  return (
    <ButtonGridItem
      media={<img src="square-image.jpg" alt="Square format" />}
      label="Square Format"
      description="Custom aspect ratio example"
      buttonText="View"
      aspectRatio="1/1"
      minHeight={400}
      onClick={handleView}
    />
  );
}

function WideCard() {
  return (
    <ButtonGridItem
      media={<img src="wide-banner.jpg" alt="Wide banner" />}
      label="Wide Banner"
      description="21:9 aspect ratio for cinematic feel"
      buttonText="Explore"
      aspectRatio="21/9"
      minHeight={200}
      onClick={handleExplore}
    />
  );
}
```

---

## Props

### ButtonGridItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `media` | `ReactNode` | required | Media content (img, picture, or video element) |
| `label` | `string` | required | Title/label for the card |
| `description` | `string` | required | Teaser text/description |
| `buttonText` | `string` | required | CTA button label |
| `onClick` | `() => void` | required | Click handler for the action |
| `className` | `string` | - | Additional CSS class |
| `aspectRatio` | `string` | `'16/9'` | Aspect ratio for the media container |
| `minHeight` | `number` | `300` | Minimum height in pixels |
| `aria-label` | `string` | - | ARIA label for the entire card (overrides label) |
| `aria-label-button` | `string` | - | ARIA label for the internal button |

---

## Keyboard Navigation

### Card Interaction

- **Tab**: Navigate to card
- **Enter/Space**: Activate card action
- **Focus**: Visible focus indicator (3px outline)

### Internal Button

- **Tab**: Navigate to internal button (within card)
- **Enter/Space**: Activate button action
- **Focus**: Visible focus indicator (2px white outline)

---

## Examples

### Hero Section

```tsx
import { ButtonGridItem } from '@spexop/react';

function HeroSection() {
  return (
    <section>
      <ButtonGridItem
        media={<img src="hero-bg.jpg" alt="Hero background" />}
        label="Welcome to Spexop"
        description="Build beautiful, accessible, and performant user interfaces with our comprehensive design system"
        buttonText="Get Started"
        aspectRatio="21/9"
        minHeight={400}
        onClick={() => router.push('/docs')}
      />
    </section>
  );
}
```

### Feature Showcase

```tsx
import { ButtonGridItem, Grid, GridItem } from '@spexop/react';

function FeatureShowcase() {
  const features = [
    {
      media: <img src="components.jpg" alt="Components" />,
      label: "Components",
      description: "100+ production-ready components",
      buttonText: "Browse Components",
      onClick: () => router.push('/components')
    },
    {
      media: <img src="tokens.jpg" alt="Design tokens" />,
      label: "Design Tokens",
      description: "Consistent design language",
      buttonText: "View Tokens",
      onClick: () => router.push('/tokens')
    },
    {
      media: <img src="icons.jpg" alt="Icons" />,
      label: "Icon Library",
      description: "262 carefully crafted icons",
      buttonText: "Explore Icons",
      onClick: () => router.push('/icons')
    }
  ];

  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      {features.map((feature, index) => (
        <GridItem key={index}>
          <ButtonGridItem {...feature} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Product Showcase

```tsx
import { ButtonGridItem } from '@spexop/react';

function ProductCard() {
  return (
    <ButtonGridItem
      media={
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="product-desktop.jpg 2x"
          />
          <source
            media="(min-width: 768px)"
            srcSet="product-tablet.jpg 2x"
          />
          <img
            src="product-mobile.jpg"
            alt="Product showcase"
            loading="lazy"
          />
        </picture>
      }
      label="New Product Launch"
      description="Introducing our latest innovation in design system technology"
      buttonText="Learn More"
      onClick={() => openModal('product-details')}
    />
  );
}
```

---

## Accessibility

### ARIA Pattern

ButtonGridItem implements the **button** ARIA pattern:

```tsx
<article
  role="button"
  tabIndex={0}
  aria-label="Learn More: Discover our comprehensive design system"
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  <img src="..." alt="..." />
  <div>
    <h3>Learn More</h3>
    <p>Description...</p>
    <button aria-label="Get Started">Get Started</button>
  </div>
</article>
```

### Focus Management

- Card receives focus on Tab
- Internal button receives focus when tabbing within card
- Clear focus indicators for both elements
- Keyboard activation with Enter/Space

### Screen Reader Support

- Card announces label and description
- Button announces its label
- All media has proper alt text
- Semantic HTML structure

---

## Foundation Integration

### With Grid System

```tsx
import { Grid, GridItem, Container, ButtonGridItem } from '@spexop/react';

function MediaGrid() {
  return (
    <Container maxWidth="2xl" padding={6}>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        <GridItem>
          <ButtonGridItem
            media={<img src="card1.jpg" alt="Card 1" />}
            label="Feature 1"
            description="Description for feature 1"
            buttonText="Learn More"
            onClick={handleFeature1}
          />
        </GridItem>
        
        <GridItem>
          <ButtonGridItem
            media={<img src="card2.jpg" alt="Card 2" />}
            label="Feature 2"
            description="Description for feature 2"
            buttonText="Explore"
            onClick={handleFeature2}
          />
        </GridItem>
        
        <GridItem>
          <ButtonGridItem
            media={<img src="card3.jpg" alt="Card 3" />}
            label="Feature 3"
            description="Description for feature 3"
            buttonText="Get Started"
            onClick={handleFeature3}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### With Stack Layout

```tsx
import { Stack, ButtonGridItem } from '@spexop/react';

function VerticalStack() {
  return (
    <Stack direction="vertical" gap={6}>
      <ButtonGridItem
        media={<img src="hero.jpg" alt="Hero" />}
        label="Main Feature"
        description="Primary feature description"
        buttonText="Primary Action"
        onClick={handlePrimary}
      />
      
      <ButtonGridItem
        media={<img src="secondary.jpg" alt="Secondary" />}
        label="Secondary Feature"
        description="Secondary feature description"
        buttonText="Secondary Action"
        onClick={handleSecondary}
      />
    </Stack>
  );
}
```

---

## Design Tokens Used

```css
/* Card */
--s-color-surface: #ffffff           /* Background */
--s-color-border: #e5e5e5           /* Border */
--s-radius-lg: 8px                  /* Border radius */
--s-spacing-6: 24px                 /* Content padding */

/* Typography */
--s-font-size-xl: 20px              /* Label size */
--s-font-size-base: 16px            /* Description size */
--s-font-weight-bold: 700           /* Label weight */
--s-font-weight-normal: 400         /* Description weight */
--s-font-weight-semibold: 600       /* Button weight */

/* Button */
--s-color-primary-500: #ef4444      /* Button background (palette-aware) */
--s-color-primary-600: #dc2626      /* Button hover */
--s-spacing-3: 12px                 /* Button padding */
--s-spacing-5: 20px                 /* Button padding */
--s-radius-md: 6px                  /* Button radius */

/* Spacing */
--s-spacing-2: 8px                  /* Element gaps */
--s-spacing-4: 16px                 /* Mobile padding */

/* Transitions */
--s-transition-fast: 150ms ease-in-out
```

**Palette Integration**: The action button uses `--s-color-primary-500` and `--s-color-primary-600`, which automatically adapt when users switch between color palettes.

---

## Best Practices

### ✅ DO

```tsx
// Use descriptive alt text for media
<ButtonGridItem
  media={<img src="design-system.jpg" alt="Design system components showcase" />}
  label="Components"
  description="Browse our comprehensive component library"
  buttonText="Explore"
  onClick={handleExplore}
/>

// Use appropriate aspect ratios
<ButtonGridItem
  aspectRatio="16/9"    // Standard video/image ratio
  minHeight={300}       // Ensure minimum height
  {...props}
/>

// Use responsive images for better performance
<ButtonGridItem
  media={
    <picture>
      <source media="(min-width: 768px)" srcSet="desktop.jpg 2x" />
      <img src="mobile.jpg" alt="..." loading="lazy" />
    </picture>
  }
  {...props}
/>

// Provide clear, actionable labels
<ButtonGridItem
  label="Get Started"
  description="Start building with our design system"
  buttonText="Begin Tutorial"
  onClick={handleStart}
/>
```

### ❌ DON'T

```tsx
// Don't use generic or missing alt text
<ButtonGridItem
  media={<img src="image.jpg" alt="Image" />}  // Too generic!
  {...props}
/>

// Don't use extremely tall aspect ratios
<ButtonGridItem
  aspectRatio="1/3"    // Too tall for most use cases!
  {...props}
/>

// Don't use vague descriptions
<ButtonGridItem
  label="Click Here"                    // Not descriptive!
  description="More info"               // Too vague!
  buttonText="Button"                   // Not actionable!
  {...props}
/>

// Don't forget keyboard accessibility
// Always ensure onClick handlers work with keyboard
```

---

## Use Cases

**Perfect for:**

- Hero sections with call-to-action
- Feature showcases with media
- Product/service presentations
- Portfolio items with previews
- Marketing campaign cards
- Educational content with visuals
- Event announcements with imagery

**Not suitable for:**

- Simple text-only content (use Card)
- Navigation items (use ButtonGroup)
- Form inputs (use Form components)
- Data display (use Table/List)
- Pure decorative content (use Image)

---

## Mobile Behavior

On screens < 768px:

- Reduced padding (16px instead of 24px)
- Smaller label font size (18px instead of 20px)
- Smaller description font size (14px instead of 16px)
- Smaller button padding and font size
- Maintained aspect ratio and minimum height
- Touch-friendly interactions

```css
@media (max-width: 768px) {
  .contentOverlay {
    padding: var(--s-spacing-4, 16px);  /* Reduced from 24px */
  }
  
  .label {
    font-size: var(--s-font-size-lg, 18px);  /* Reduced from 20px */
  }
  
  .description {
    font-size: var(--s-font-size-sm, 14px);  /* Reduced from 16px */
  }
}
```

---

## Performance

- **GPU Acceleration**: All animations use `transform: translateZ(0)` and `will-change`
- **Lazy Loading**: Support for `loading="lazy"` on images
- **Efficient Animations**: `requestAnimationFrame` for smooth interactions
- **Optimized Hover**: Separate hover states for different elements
- **Media Optimization**: Support for responsive images and modern formats

**Bundle Size**: ~3KB (gzipped)

---

## TypeScript

Full TypeScript support:

```tsx
import type { ButtonGridItemProps } from '@spexop/react';

const MyCard: React.FC<ButtonGridItemProps> = (props) => {
  return <ButtonGridItem {...props} />;
};

// Custom media type
interface CustomMediaProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

const CustomMedia: React.FC<CustomMediaProps> = ({ src, alt, loading }) => (
  <img src={src} alt={alt} loading={loading} />
);

<ButtonGridItem
  media={<CustomMedia src="image.jpg" alt="Custom" loading="lazy" />}
  label="Custom Media"
  description="Using custom media component"
  buttonText="Action"
  onClick={handleAction}
/>
```

---

## Testing

### Interaction Testing

- [ ] Card click triggers onClick handler
- [ ] Button click triggers onClick handler (stops propagation)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators visible on both card and button
- [ ] Hover animations work smoothly
- [ ] Media zoom effect on hover

### Visual Testing

- [ ] Aspect ratio maintained correctly
- [ ] Minimum height respected
- [ ] Gradient overlay provides good text contrast
- [ ] Button slides right on hover
- [ ] Card lifts on hover
- [ ] Media scales on hover
- [ ] Mobile responsive behavior

### Accessibility Testing

- [ ] All interactive elements have accessible names
- [ ] Focus order is logical
- [ ] Screen reader announces content correctly
- [ ] Keyboard navigation complete
- [ ] Color contrast meets WCAG standards
- [ ] Alt text provided for all media

---

## Design System Alignment

This component follows **Spexop's Refined Minimalism** principles:

1. ✅ **Border-based separation** - Clear 2px border around card
2. ✅ **Typography-driven** - Bold labels, clear hierarchy
3. ✅ **High-contrast** - Strong gradient overlay for text legibility
4. ✅ **Minimal decoration** - Purposeful animations only
5. ✅ **Primitives-First** - Uses spacing and color tokens
6. ✅ **Palette integration** - Action button adapts to themes

---

## Related Components

- **Card**: For text-only content without media
- **Button**: For simple actions without media
- **Image**: For display-only images
- **Grid**: For laying out multiple ButtonGridItems

---

## License

MIT © Spexop Design System
