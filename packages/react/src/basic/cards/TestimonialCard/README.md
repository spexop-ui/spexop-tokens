# TestimonialCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card for displaying customer testimonials and reviews. Features quote, author information, avatar, rating, and company details with professional design.

## Features

- ✅ Quote text display
- ✅ Author name and title
- ✅ Author avatar
- ✅ Star rating
- ✅ Company/organization
- ✅ Date
- ✅ Featured variant
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { TestimonialCard } from '@spexop/react';

function App() {
  return (
    <TestimonialCard
      quote="This product transformed how we work. Highly recommended!"
      author={{
        name: "Jane Doe",
        title: "CEO",
        company: "TechCorp",
        avatar: "/avatars/jane.jpg"
      }}
      rating={5}
    />
  );
}
```

## Basic Usage

### Simple Testimonial

```tsx
<TestimonialCard
  quote="Amazing product! It saved us countless hours."
  author={{
    name: "John Smith",
    title: "Product Manager"
  }}
/>
```

### With Avatar and Rating

```tsx
<TestimonialCard
  quote="The best design system I've used. Clean, consistent, and well-documented."
  author={{
    name: "Sarah Johnson",
    title: "Lead Designer",
    company: "DesignStudio",
    avatar: "/avatars/sarah.jpg"
  }}
  rating={5}
/>
```

### With Date

```tsx
<TestimonialCard
  quote="Incredible support team and fantastic product quality."
  author={{
    name: "Mike Chen",
    title: "CTO",
    company: "StartupXYZ"
  }}
  rating={5}
  date="January 2025"
/>
```

### Featured Testimonial

```tsx
<TestimonialCard
  quote="Game-changer for our development workflow. Can't imagine working without it."
  author={{
    name: "Emily Brown",
    title: "Engineering Director",
    company: "Enterprise Inc.",
    avatar: "/avatars/emily.jpg"
  }}
  rating={5}
  featured={true}
/>
```

## Common Patterns

### Testimonials Grid

```tsx
import { Grid, GridItem, TestimonialCard } from '@spexop/react';

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Outstanding product with excellent support.",
      author: {
        name: "Alice Wilson",
        title: "VP of Engineering",
        company: "TechCo",
        avatar: "/avatars/alice.jpg"
      },
      rating: 5,
    },
    {
      id: 2,
      quote: "Best investment we made this year.",
      author: {
        name: "Bob Martin",
        title: "Founder",
        company: "StartupABC"
      },
      rating: 5,
    },
    // ... more testimonials
  ];

  return (
    <Container maxWidth="xl" padding={8}>
      <h2>What Our Customers Say</h2>
      
      <Grid columns="auto-fit" minColumnWidth="350px" gap={6}>
        {testimonials.map(testimonial => (
          <GridItem key={testimonial.id}>
            <TestimonialCard {...testimonial} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
```

### Featured Testimonial Section

```tsx
<Container maxWidth="lg" padding={8}>
  <TestimonialCard
    quote="This platform revolutionized our entire workflow. The team loves it, productivity is up 40%, and we couldn't be happier with the results."
    author={{
      name: "Jennifer Lee",
      title: "Chief Product Officer",
      company: "Fortune 500 Company",
      avatar: "/avatars/jennifer.jpg"
    }}
    rating={5}
    date="December 2024"
    featured={true}
  />
</Container>
```

### Carousel of Testimonials

```tsx
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Carousel
      items={testimonials}
      currentIndex={currentIndex}
      onChange={setCurrentIndex}
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </Carousel>
  );
}
```

## Props

```typescript
interface TestimonialCardProps {
  /** Testimonial quote text */
  quote: string;
  /** Author information */
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  /** Star rating (1-5) */
  rating?: number;
  /** Date of testimonial */
  date?: string;
  /** Featured/highlighted variant */
  featured?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Quote typography emphasis
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Composition before complexity** - Simple, focused layout

## Accessibility

- ✅ Semantic HTML structure
- ✅ Quote properly marked up
- ✅ Author information accessible
- ✅ Rating conveyed to screen readers
- ✅ High contrast text
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `ProfileCard` - User profiles
- `Carousel` - Testimonial slider

## Best Practices

1. **Use real testimonials** - Authentic feedback builds trust
2. **Include details** - Name, title, company add credibility
3. **Show ratings** - Star ratings provide quick validation
4. **Feature best ones** - Highlight strongest testimonials
5. **Keep quotes concise** - 2-3 sentences ideal

## License

MIT
