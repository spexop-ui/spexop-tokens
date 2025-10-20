# Carousel Component

A slideshow component following Spexop design principles with bold borders, high-contrast controls, and full accessibility support.

## Features

✅ **Borders Before Shadows** - Bold 3px borders, zero shadows (Refined Minimalism)  
✅ **High-Contrast Controls** - WCAG AAA compliant navigation (7:1 text, 3:1 UI)  
✅ **Keyboard Navigation** - Arrow keys, Home, End support  
✅ **Auto-Play** - Optional auto-advance with pause on hover  
✅ **Dot Indicators** - Visual navigation with high contrast  
✅ **Item Counter** - Optional "1 / 5" display  
✅ **Infinite Loop** - Seamless continuous navigation  
✅ **Reduced Motion** - Respects user preferences  
✅ **Responsive** - Adapts to mobile (44px) and desktop (56px arrows)  

## Design Principles Applied

### 1. Borders Before Shadows (Principle #2)
```css
/* ✅ Bold 3px borders, no shadows */
border: 3px solid var(--s-color-neutral-900);

/* ❌ NOT USED: Heavy shadows */
/* box-shadow: 0 10px 50px rgba(0,0,0,0.3); */
```

### 2. Typography Before Decoration (Principle #3)
Counter uses typography for emphasis:
```css
.counter {
  font-size: var(--s-font-size-sm);
  font-weight: var(--s-font-weight-semibold);
  letter-spacing: 0.5px;
}
```

### 3. Accessibility Before Aesthetics (Principle #7)
- 7:1 contrast ratio on all text (WCAG AAA)
- 3:1 contrast ratio on all UI components
- 56px arrow buttons on desktop (44px minimum)
- Full keyboard navigation
- Complete ARIA support

### 4. Tokens Before Magic Numbers (Principle #4)
All values use design tokens:
```css
padding: var(--s-spacing-8);
gap: var(--s-spacing-3);
border-radius: var(--s-radius-md);
color: var(--s-color-neutral-900);
```

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Carousel } from '@spexop/react';

const items = [
  { 
    id: '1', 
    content: <img src="slide1.jpg" alt="Product view 1" />,
    ariaLabel: "Product view 1 of 3"
  },
  { 
    id: '2', 
    content: <img src="slide2.jpg" alt="Product view 2" />,
    ariaLabel: "Product view 2 of 3"
  },
  { 
    id: '3', 
    content: <img src="slide3.jpg" alt="Product view 3" />,
    ariaLabel: "Product view 3 of 3"
  }
];

function ProductGallery() {
  return (
    <Carousel
      items={items}
      showArrows
      showDots
      ariaLabel="Product image gallery"
    />
  );
}
```

## Props

### CarouselProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CarouselItem[]` | **Required** | Array of items to display |
| `activeIndex` | `number` | `undefined` | Controlled active index |
| `onChange` | `(index: number) => void` | `undefined` | Callback when active item changes |
| `autoPlayInterval` | `number` | `undefined` | Auto-advance interval in ms |
| `showArrows` | `boolean` | `true` | Show previous/next arrows |
| `showDots` | `boolean` | `true` | Show dot indicators |
| `showCounter` | `boolean` | `false` | Show item counter (e.g., "1 / 5") |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `enableKeyboard` | `boolean` | `true` | Enable keyboard navigation |
| `transitionDuration` | `number` | `300` | Transition duration in ms |
| `pauseOnHover` | `boolean` | `true` | Pause auto-play on hover |
| `ariaLabel` | `string` | `"Carousel"` | ARIA label for carousel |
| `className` | `string` | `""` | Additional CSS class |

### CarouselItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | **Required** - Unique identifier |
| `content` | `ReactNode` | **Required** - Content to display |
| `ariaLabel` | `string` | Optional ARIA label for the item |

## Examples

### Auto-Play Carousel

```tsx
<Carousel
  items={items}
  autoPlayInterval={5000}
  pauseOnHover
  showArrows
  showDots
  ariaLabel="Featured products"
/>
```

### Controlled Carousel

```tsx
function ControlledExample() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      items={items}
      activeIndex={activeIndex}
      onChange={setActiveIndex}
      showArrows
      showDots
      ariaLabel="Testimonials"
    />
  );
}
```

### With Counter (No Dots)

```tsx
<Carousel
  items={items}
  showArrows
  showDots={false}
  showCounter
  ariaLabel="Tutorial steps"
/>
```

### Non-Looping Carousel

```tsx
<Carousel
  items={items}
  loop={false}
  showArrows
  showDots
  ariaLabel="Step-by-step guide"
/>
```

### Text Content Carousel

```tsx
const testimonials = [
  {
    id: '1',
    content: (
      <div style={{ textAlign: 'center', padding: 'var(--s-spacing-8)' }}>
        <p style={{ fontSize: 'var(--s-font-size-xl)', marginBottom: 'var(--s-spacing-4)' }}>
          "This design system transformed our workflow."
        </p>
        <p style={{ fontWeight: 'var(--s-font-weight-semibold)' }}>
          - Sarah Johnson, Lead Designer
        </p>
      </div>
    ),
    ariaLabel: "Testimonial from Sarah Johnson"
  },
  // More testimonials...
];

<Carousel
  items={testimonials}
  autoPlayInterval={8000}
  showArrows
  showDots
  ariaLabel="Customer testimonials"
/>
```

### Custom Content with Grid

```tsx
import { Carousel, Grid, GridItem } from '@spexop/react';

const features = [
  {
    id: '1',
    content: (
      <Grid columns={2} gap={6}>
        <GridItem>
          <img src="feature1.jpg" alt="Feature 1" />
        </GridItem>
        <GridItem>
          <h3>Fast Performance</h3>
          <p>Optimized for speed and efficiency.</p>
        </GridItem>
      </Grid>
    )
  },
  // More features...
];

<Carousel items={features} showArrows showDots />
```

## Keyboard Navigation

When the carousel or any of its controls are focused:

- **Arrow Left** - Previous slide
- **Arrow Right** - Next slide
- **Home** - First slide
- **End** - Last slide
- **Tab** - Navigate through controls (arrows, dots)

## Accessibility

### ARIA Support

The carousel implements full ARIA support:

- `role="group"` and `aria-roledescription="slide"` on slides
- `role="tablist"` and `role="tab"` on dot indicators
- `aria-live="polite"` for screen reader announcements
- `aria-hidden="true"` on inactive slides
- `aria-label` on navigation buttons
- `aria-selected` on active dot

### Screen Reader Experience

1. Announces carousel role and label
2. Announces current slide when changed
3. Provides context for each slide
4. Clear button labels ("Previous slide", "Next slide", "Go to slide 1")

### High Contrast Mode

Automatically increases border widths in high contrast mode:

```css
@media (prefers-contrast: high) {
  border-width: 4px; /* Increased from 3px */
}
```

### Reduced Motion

Respects `prefers-reduced-motion` preference:

```css
@media (prefers-reduced-motion: reduce) {
  transition-duration: 0ms !important;
}
```

## Styling Customization

### Custom Container Width

```tsx
<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  <Carousel items={items} />
</div>
```

### Custom Slide Content

```tsx
const items = [
  {
    id: '1',
    content: (
      <div style={{
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <YourCustomComponent />
      </div>
    )
  }
];
```

### Custom Aspect Ratio (Images)

```tsx
const items = [
  {
    id: '1',
    content: (
      <img 
        src="slide.jpg" 
        alt="Slide" 
        style={{ 
          width: '100%', 
          height: '500px', 
          objectFit: 'cover' 
        }} 
      />
    )
  }
];
```

## Performance Considerations

### Lazy Loading Images

```tsx
const items = [
  {
    id: '1',
    content: <img src="slide1.jpg" alt="Slide 1" loading="lazy" />
  }
];
```

### GPU-Accelerated Transitions

The carousel uses `transform: translateX()` for smooth, GPU-accelerated transitions:

```css
.slidesContainer {
  transform: translateX(-100%);
  will-change: transform;
}
```

### Auto-Play Cleanup

Auto-play timers are automatically cleaned up when:
- Component unmounts
- User hovers (if `pauseOnHover` is true)
- User navigates manually

## Common Patterns

### Product Gallery

```tsx
<Carousel
  items={productImages}
  showArrows
  showDots
  loop
  ariaLabel="Product images"
/>
```

### Testimonials Carousel

```tsx
<Carousel
  items={testimonials}
  autoPlayInterval={8000}
  showArrows={false}
  showDots
  ariaLabel="Customer testimonials"
/>
```

### Tutorial Steps

```tsx
<Carousel
  items={tutorialSteps}
  loop={false}
  showCounter
  showArrows
  ariaLabel="Tutorial steps"
/>
```

### Hero Slider

```tsx
<Carousel
  items={heroSlides}
  autoPlayInterval={6000}
  showArrows
  showDots
  transitionDuration={500}
  ariaLabel="Featured content"
/>
```

## Integration with Grid Primitives

```tsx
import { Container, Grid, GridItem, Carousel } from '@spexop/react';

<Container maxWidth="2xl" padding={6}>
  <Grid columns={{ xs: 1, md: 2 }} gap={6}>
    <GridItem>
      <Carousel items={products} showArrows showDots />
    </GridItem>
    <GridItem>
      <h2>Product Details</h2>
      <p>Description...</p>
    </GridItem>
  </Grid>
</Container>
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Related Components

- **Grid** - Layout container for multiple carousels
- **Container** - Max-width wrapper
- **Card** - Common carousel content
- **Button** - Custom navigation buttons

## Contributing

When contributing to CodeBlock:

1. Follow "The Spexop Way" design principles
2. Maintain WCAG AAA contrast ratios
3. Use tokens from `@spexop/tokens` only
4. Test keyboard navigation and screen readers
5. Add tests for new features
6. Update documentation with examples

## Author

@olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui

## License

MIT © Spexop Design System
