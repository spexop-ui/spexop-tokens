# Animation Components - Usage Guide

**Component Version**: v0.2.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
npm install @spexop/react
```

### Basic Imports

```tsx
import {
  Reveal,
  FadeIn,
  SlideIn,
  ZoomIn,
  RotateIn,
  ScaleUp,
  Stagger,
  Motion,
  useIntersectionObserver,
  useSpring,
  useMotionValue
} from '@spexop/react';
```

### Minimal Example

```tsx
import { FadeIn } from '@spexop/react';

function App() {
  return (
    <FadeIn direction="up">
      <h1>Hello, World!</h1>
    </FadeIn>
  );
}
```

## Overview

The animation system provides three types of animations:

1. **Viewport-Triggered** - Animate when elements enter the viewport (Reveal, FadeIn, SlideIn, etc.)
2. **State-Based** - Animate based on component state (Motion)
3. **Sequential** - Animate children in sequence (Stagger)

All animations are:

- GPU-accelerated (transform/opacity only)
- Accessibility-friendly (respects prefers-reduced-motion)
- Performance-optimized (60fps)
- Highly configurable

## Reveal Component

The universal animation wrapper that powers most other animation components.

### Basic Usage

```tsx
import { Reveal } from '@spexop/react';

function Section() {
  return (
    <Reveal variant="fadeInUp" duration={600}>
      <section>
        <h2>Section Title</h2>
        <p>This content animates when scrolled into view.</p>
      </section>
    </Reveal>
  );
}
```

### All Animation Variants

```tsx
// Fade variants
<Reveal variant="fadeIn">Simple fade</Reveal>
<Reveal variant="fadeInUp">Fade with upward movement</Reveal>
<Reveal variant="fadeInDown">Fade with downward movement</Reveal>
<Reveal variant="fadeInLeft">Fade from left</Reveal>
<Reveal variant="fadeInRight">Fade from right</Reveal>

// Slide variants (larger movement)
<Reveal variant="slideUp">Slide up 20px</Reveal>
<Reveal variant="slideDown">Slide down 20px</Reveal>
<Reveal variant="slideLeft">Slide from left 20px</Reveal>
<Reveal variant="slideRight">Slide from right 20px</Reveal>

// Scale variants
<Reveal variant="zoomIn">Zoom in from 95%</Reveal>
<Reveal variant="zoomOut">Zoom out from 105%</Reveal>
<Reveal variant="scaleUp">Scale up from 92%</Reveal>

// Rotation
<Reveal variant="rotateIn">Rotate -3deg with scale</Reveal>
```

### Custom Timing

```tsx
<Reveal
  variant="fadeInUp"
  duration={800}        // Slower animation
  delay={300}           // Wait before starting
  timing="ease-in-out"  // Custom timing function
>
  <Content />
</Reveal>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<Reveal variant="fadeInUp" once={false}>
  <Card>Animates on every scroll</Card>
</Reveal>
```

### Visibility Threshold

```tsx
// Trigger when 50% of element is visible
<Reveal variant="fadeInUp" threshold={0.5}>
  <Section>Waits until half visible</Section>
</Reveal>

// Trigger immediately when any part is visible
<Reveal variant="fadeInUp" threshold={0}>
  <Section>Triggers as soon as visible</Section>
</Reveal>
```

## FadeIn Component

Convenient wrapper for fade animations with directional movement.

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <FadeIn direction="up" delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </FadeIn>
      <FadeIn direction="up" delay={200} duration={600}>
        <p className="subtitle">Build faster with design systems</p>
      </FadeIn>
      <FadeIn direction="up" delay={400} duration={600}>
        <button>Get Started</button>
      </FadeIn>
    </div>
  );
}
```

### Content Reveal from Sides

```tsx
function Features() {
  return (
    <div className="features">
      <FadeIn direction="left">
        <FeatureCard icon="fast" title="Fast" />
      </FadeIn>
      <FadeIn direction="right">
        <FeatureCard icon="secure" title="Secure" />
      </FadeIn>
      <FadeIn direction="left">
        <FeatureCard icon="scalable" title="Scalable" />
      </FadeIn>
    </div>
  );
}
```

### Simple Fade (No Movement)

```tsx
<FadeIn direction="none" duration={800}>
  <div className="overlay">
    Fades in without movement
  </div>
</FadeIn>
```

### With Custom Styles

```tsx
<FadeIn
  direction="up"
  style={{ width: '100%', maxWidth: '600px' }}
  className="custom-animation"
>
  <Card>Custom styled animated card</Card>
</FadeIn>
```

## SlideIn Component

Slide animations from any direction with larger movement (20px vs 12px for FadeIn).

### Navigation Panel

```tsx
function Sidebar({ isOpen }) {
  return isOpen ? (
    <SlideIn direction="right" duration={400}>
      <nav className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </SlideIn>
  ) : null;
}
```

### Notification Banner

```tsx
function NotificationBanner({ message }) {
  return (
    <SlideIn direction="down" duration={300}>
      <div className="banner">
        {message}
      </div>
    </SlideIn>
  );
}
```

### Footer Reveal

```tsx
<SlideIn direction="up" threshold={0.3}>
  <footer>
    <p>© 2025 Your Company</p>
  </footer>
</SlideIn>
```

### Alternating Slides

```tsx
function AlternatingContent() {
  return (
    <>
      <SlideIn direction="left">
        <Section>Content from left</Section>
      </SlideIn>
      <SlideIn direction="right">
        <Section>Content from right</Section>
      </SlideIn>
      <SlideIn direction="left">
        <Section>Content from left again</Section>
      </SlideIn>
    </>
  );
}
```

## ZoomIn Component

Scale-based zoom effects for emphasis.

### Modal Entrance

```tsx
function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <ZoomIn type="in" duration={300}>
        <div className="modal">
          <h2>Modal Title</h2>
          <p>Modal content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </ZoomIn>
    </div>
  );
}
```

### Call-to-Action Emphasis

```tsx
<ZoomIn type="in" duration={500} delay={600}>
  <button className="cta-button">
    Get Started Now
  </button>
</ZoomIn>
```

### Image Gallery Reveal

```tsx
function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <ZoomIn key={image.id} type="in" delay={index * 100}>
          <img src={image.url} alt={image.alt} />
        </ZoomIn>
      ))}
    </div>
  );
}
```

### Zoom Out Effect

```tsx
<ZoomIn type="out" duration={400}>
  <div className="highlighted-card">
    Starts larger and zooms to normal size
  </div>
</ZoomIn>
```

## RotateIn Component

Subtle rotation with fade for creative flourishes.

### Badge Reveal

```tsx
function Badge({ label }) {
  return (
    <RotateIn duration={500}>
      <div className="badge">{label}</div>
    </RotateIn>
  );
}
```

### Feature Icons

```tsx
<RotateIn timing="bounce">
  <div className="icon-wrapper">
    <Icon name="star" size={48} />
  </div>
</RotateIn>
```

### Price Cards

```tsx
function PricingCard({ plan }) {
  return (
    <RotateIn delay={plan.order * 150}>
      <div className="pricing-card">
        <h3>{plan.name}</h3>
        <p className="price">${plan.price}/mo</p>
        <button>Select Plan</button>
      </div>
    </RotateIn>
  );
}
```

## ScaleUp Component

Subtle scale animation for interactive elements.

### Button Hover States

```tsx
function InteractiveButton() {
  return (
    <ScaleUp duration={400} timing="ease-out">
      <button className="scale-button">
        Hover Me
      </button>
    </ScaleUp>
  );
}
```

### Card Grid

```tsx
function CardGrid({ items }) {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <ScaleUp key={item.id} delay={index * 80}>
          <Card>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        </ScaleUp>
      ))}
    </div>
  );
}
```

### Testimonial Reveal

```tsx
<ScaleUp duration={600} timing="elastic">
  <blockquote className="testimonial">
    <p>"This product changed my life!"</p>
    <cite>— Happy Customer</cite>
  </blockquote>
</ScaleUp>
```

## Stagger Component

Animate children sequentially with customizable delay.

### Feature List

```tsx
function FeatureList() {
  return (
    <Stagger delay={100} variant="fadeInUp">
      <FeatureItem icon="fast" title="Blazing Fast" />
      <FeatureItem icon="secure" title="Secure by Default" />
      <FeatureItem icon="scalable" title="Infinitely Scalable" />
      <FeatureItem icon="accessible" title="Fully Accessible" />
    </Stagger>
  );
}
```

### Navigation Menu

```tsx
function NavigationMenu() {
  return (
    <nav>
      <Stagger delay={80} variant="fadeInLeft">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Stagger>
    </nav>
  );
}
```

### Image Grid

```tsx
function ImageGrid({ images }) {
  return (
    <Stagger delay={120} variant="scaleUp" threshold={0.3}>
      {images.map(image => (
        <img key={image.id} src={image.url} alt={image.alt} />
      ))}
    </Stagger>
  );
}
```

### Custom Stagger Timing

```tsx
// Slower stagger for dramatic effect
<Stagger delay={200} variant="fadeInUp" duration={800}>
  <Section>Section 1</Section>
  <Section>Section 2</Section>
  <Section>Section 3</Section>
</Stagger>

// Fast stagger for subtle effect
<Stagger delay={40} variant="fadeIn" duration={300}>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</Stagger>
```

### Nested Staggers

```tsx
function NestedStagger() {
  return (
    <Stagger delay={150} variant="fadeInUp">
      <section>
        <h2>Section 1</h2>
        <Stagger delay={80} variant="fadeInLeft">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Stagger>
      </section>
      <section>
        <h2>Section 2</h2>
        <Stagger delay={80} variant="fadeInLeft">
          <p>Paragraph 3</p>
          <p>Paragraph 4</p>
        </Stagger>
      </section>
    </Stagger>
  );
}
```

## Motion Component

State-based animations using spring physics.

### Dropdown Menu

```tsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Menu
      </button>
      <Motion isActive={isOpen} type="slideDown" spring="gentle">
        <ul className="dropdown-menu">
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </Motion>
    </div>
  );
}
```

### Expandable Panel

```tsx
function ExpandablePanel({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="panel">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {title}
      </button>
      <Motion isActive={isExpanded} type="slideDown" spring="default">
        <div className="panel-content">
          {children}
        </div>
      </Motion>
    </div>
  );
}
```

### Sidebar Toggle

```tsx
function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Sidebar
      </button>
      <Motion isActive={isVisible} type="slideRight" spring="stiff">
        <aside className="sidebar">
          <nav>Navigation content</nav>
        </aside>
      </Motion>
    </>
  );
}
```

### Spring Presets Comparison

```tsx
function SpringDemo() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <button onClick={() => setActive(!active)}>Toggle</button>

      <Motion isActive={active} spring="default">
        <div>Default - Balanced</div>
      </Motion>

      <Motion isActive={active} spring="gentle">
        <div>Gentle - Soft and smooth</div>
      </Motion>

      <Motion isActive={active} spring="wobbly">
        <div>Wobbly - Bouncy</div>
      </Motion>

      <Motion isActive={active} spring="stiff">
        <div>Stiff - Quick and firm</div>
      </Motion>

      <Motion isActive={active} spring="slow">
        <div>Slow - Deliberate</div>
      </Motion>
    </div>
  );
}
```

### Custom Spring Configuration

```tsx
<Motion
  isActive={isActive}
  type="scale"
  spring={{
    stiffness: 200,
    damping: 15,
    mass: 1,
    velocity: 0
  }}
>
  <div>Custom physics</div>
</Motion>
```

### Modal with Spring

```tsx
function SpringModal({ isOpen, onClose }) {
  return (
    <>
      <Motion isActive={isOpen} type="fade" spring="gentle">
        <div className="modal-overlay" onClick={onClose} />
      </Motion>
      <Motion isActive={isOpen} type="scale" spring="wobbly">
        <div className="modal">
          <h2>Modal Title</h2>
          <p>Content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </Motion>
    </>
  );
}
```

## useIntersectionObserver Hook

Low-level hook for custom viewport-triggered animations.

### Basic Usage of the useIntersectionObserver Hook

```tsx
import { useIntersectionObserver } from '@spexop/react';

function CustomReveal() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out'
      }}
    >
      Custom animated content
    </div>
  );
}
```

### With Delay

```tsx
function DelayedReveal() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    delay: 500  // Wait 500ms after visible
  });

  return (
    <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>
      Content with delayed animation
    </div>
  );
}
```

### Repeated Trigger

```tsx
function RepeatedAnimation() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false  // Animate every time
  });

  return (
    <div
      ref={ref}
      className={isVisible ? 'animate-in' : 'animate-out'}
    >
      Animates on every scroll
    </div>
  );
}
```

### Progress Tracking

```tsx
function ProgressBar() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.8 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div ref={ref}>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

### Multiple Elements

```tsx
function MultipleObservers() {
  const [ref1, isVisible1] = useIntersectionObserver();
  const [ref2, isVisible2] = useIntersectionObserver();
  const [ref3, isVisible3] = useIntersectionObserver();

  return (
    <>
      <div ref={ref1} className={isVisible1 ? 'visible' : ''}>
        Section 1
      </div>
      <div ref={ref2} className={isVisible2 ? 'visible' : ''}>
        Section 2
      </div>
      <div ref={ref3} className={isVisible3 ? 'visible' : ''}>
        Section 3
      </div>
    </>
  );
}
```

## useSpring Hook

Physics-based value interpolation for smooth animations.

### Animated Counter

```tsx
import { useSpring } from '@spexop/react';

function AnimatedCounter({ target }) {
  const value = useSpring(target, 'gentle');

  return (
    <div className="counter">
      {Math.round(value)}
    </div>
  );
}

// Usage
<AnimatedCounter target={1000} />
```

### Progress Circle

```tsx
function ProgressCircle({ percent }) {
  const progress = useSpring(percent, {
    stiffness: 100,
    damping: 20
  });

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
```

### Smooth Scroll Progress

```tsx
function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const smoothProgress = useSpring(scrollPercent, 'default');

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const percent = (scrollTop / (docHeight - winHeight)) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${smoothProgress}%` }}
    />
  );
}
```

### Interactive Scale

```tsx
function ScaleOnHover() {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useSpring(isHovered ? 1.1 : 1, 'wobbly');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `scale(${scale})` }}
    >
      Hover me
    </div>
  );
}
```

## useMotionValue Hook

Eased value transitions with custom timing.

### Fade Controller

```tsx
import { useMotionValue } from '@spexop/react';

function FadeController({ isVisible }) {
  const opacity = useMotionValue(
    isVisible ? 1 : 0,
    { duration: 600, easing: 'easeOutCubic' }
  );

  return (
    <div style={{ opacity }}>
      Content fades with easing
    </div>
  );
}
```

### Smooth Value Transition

```tsx
function ValueDisplay({ value }) {
  const smoothValue = useMotionValue(value, {
    duration: 400,
    easing: 'easeInOut'
  });

  return (
    <div className="value-display">
      {smoothValue.toFixed(2)}
    </div>
  );
}
```

### Custom Easing Functions

```tsx
import { useMotionValue, EASINGS } from '@spexop/react';

function CustomEasing({ target }) {
  // Built-in easing
  const value1 = useMotionValue(target, { easing: 'easeOutExpo' });

  // Custom easing function
  const customEasing = (t: number) => t * t * t;
  const value2 = useMotionValue(target, { easing: customEasing });

  return (
    <div>
      <div>Built-in: {value1}</div>
      <div>Custom: {value2}</div>
    </div>
  );
}
```

### Delayed Transition

```tsx
function DelayedValue({ value }) {
  const delayed = useMotionValue(value, {
    duration: 300,
    delay: 500,
    easing: 'easeOut'
  });

  return <div>{delayed}</div>;
}
```

## Advanced Patterns

### Orchestrated Sequence

Combine multiple animations for complex sequences:

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <FadeIn direction="down" delay={0} duration={600}>
        <span className="eyebrow">INTRODUCING</span>
      </FadeIn>

      <FadeIn direction="up" delay={200} duration={800}>
        <h1 className="title">Next Generation Design</h1>
      </FadeIn>

      <FadeIn direction="up" delay={400} duration={600}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </FadeIn>

      <Stagger delay={100} variant="scaleUp">
        <button className="cta-primary">Get Started</button>
        <button className="cta-secondary">Learn More</button>
      </Stagger>
    </div>
  );
}
```

### Scroll-Based Parallax

```tsx
function ParallaxSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const offset = window.innerHeight - rect.top;
        setScrollOffset(offset * 0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div ref={ref} className="parallax-container">
      <div
        className="parallax-content"
        style={{ transform: `translateY(-${scrollOffset}px)` }}
      >
        <h2>Parallax Content</h2>
      </div>
    </div>
  );
}
```

### Conditional Animation

```tsx
function ConditionalReveal({ shouldAnimate, children }) {
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <FadeIn direction="up" duration={600}>
      {children}
    </FadeIn>
  );
}

// Usage
<ConditionalReveal shouldAnimate={user.prefersAnimation}>
  <Card>Content</Card>
</ConditionalReveal>
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <Motion isActive={true} type="fade" spring="gentle">
        <div className="spinner">Loading...</div>
      </Motion>
    );
  }

  return (
    <Stagger delay={80} variant="fadeInUp">
      {data.map(item => (
        <DataCard key={item.id} {...item} />
      ))}
    </Stagger>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <FadeIn key={location.pathname} direction="up" duration={400}>
      {children}
    </FadeIn>
  );
}

// Usage with React Router
<PageTransition location={location}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</PageTransition>
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <Stagger delay={100} variant="fadeInLeft">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone" />
        <textarea placeholder="Message" />
        <button type="submit">Send</button>
      </Stagger>
    </form>
  );
}
```

## Best Practices

### DO

- Use subtle animations (200-600ms duration)
- Prefer `transform` and `opacity` for performance
- Set `once={true}` for content that shouldn't re-animate
- Use appropriate thresholds (0.1-0.3 for large elements)
- Stagger animations with 80-150ms delays
- Test with `prefers-reduced-motion` enabled
- Use spring physics for interactive elements
- Keep animation purposes clear (don't animate for animation's sake)

### DON'T

- Don't use long animations (>1000ms)
- Don't animate width/height (causes layout shifts)
- Don't chain too many animations
- Don't block content with animations
- Don't use animations on every element
- Don't ignore accessibility preferences
- Don't animate critical interactive elements
- Don't use animations to hide loading issues

## Accessibility

### Reduced Motion Support

All animation components respect `prefers-reduced-motion`:

```css
/* Automatically applied by components */
@media (prefers-reduced-motion: reduce) {
  .spex-reveal {
    transition-duration: 0.001ms !important;
  }
}
```

### Testing Reduced Motion

```tsx
// Enable in browser DevTools or OS settings
// Components will automatically disable/speed up animations
```

### Manual Reduced Motion Check

```tsx
function RespectfulAnimation() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    return <div>Content without animation</div>;
  }

  return (
    <FadeIn direction="up">
      <div>Animated content</div>
    </FadeIn>
  );
}
```

## Performance Optimization

### Lazy Load Animations

```tsx
// Only import when needed
const FadeIn = lazy(() => import('@spexop/react').then(m => ({ default: m.FadeIn })));

function OptimizedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FadeIn direction="up">
        <Content />
      </FadeIn>
    </Suspense>
  );
}
```

### Limit Simultaneous Animations

```tsx
// ✅ Good: Staggered animations
<Stagger delay={80}>
  {items.map(item => <Card key={item.id} />)}
</Stagger>

// ❌ Bad: All at once
{items.map(item => (
  <FadeIn key={item.id}>
    <Card />
  </FadeIn>
))}
```

### Use Once for Static Content

```tsx
// Content that doesn't need to re-animate
<Reveal variant="fadeInUp" once={true}>
  <Footer />
</Reveal>
```

### Monitor Performance

```tsx
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 16) {
        console.warn('Slow animation frame:', entry);
      }
    }
  });

  observer.observe({ entryTypes: ['measure'] });
  return () => observer.disconnect();
}, []);
```

## Troubleshooting

### Animation Not Triggering

**Problem**: Element doesn't animate when scrolled into view

**Solutions**:

```tsx
// 1. Check threshold - might need lower value
<Reveal threshold={0.1}>  // Instead of 0.5
  <Content />
</Reveal>

// 2. Element might already be visible on mount
<Reveal threshold={0}>  // Trigger immediately
  <Content />
</Reveal>

// 3. Parent might have overflow hidden
// Ensure parent doesn't hide IntersectionObserver
```

### Animation Too Fast/Slow

**Problem**: Animation duration doesn't feel right

**Solutions**:

```tsx
// Adjust duration
<FadeIn duration={600}>  // Slower
  <Content />
</FadeIn>

// Try different timing functions
<FadeIn timing="ease-in-out">  // Smoother
  <Content />
</FadeIn>

// Use spring physics instead
<Motion spring="gentle">  // Natural feel
  <Content />
</Motion>
```

### Stagger Not Working

**Problem**: Children animate simultaneously instead of staggered

**Solutions**:

```tsx
// Ensure children are direct descendants
<Stagger delay={100}>
  <Card>1</Card>  {/* ✅ Direct child */}
  <Card>2</Card>
  <Card>3</Card>
</Stagger>

// Not this:
<Stagger delay={100}>
  <div>  {/* ❌ Wrapper prevents stagger */}
    <Card>1</Card>
    <Card>2</Card>
  </div>
</Stagger>

// Increase delay for more noticeable effect
<Stagger delay={150}>  // More visible
  <Card>1</Card>
  <Card>2</Card>
</Stagger>
```

### Motion Not Animating

**Problem**: Motion component doesn't animate state changes

**Solutions**:

```tsx
// Ensure isActive prop changes
const [active, setActive] = useState(false);

<Motion isActive={active} type="slideDown">
  <Content />
</Motion>

// Check spring configuration
<Motion
  isActive={active}
  spring="default"  // Try different preset
>
  <Content />
</Motion>
```

### Performance Issues

**Problem**: Animations cause lag or jank

**Solutions**:

```tsx
// 1. Reduce simultaneous animations
<Stagger delay={100}>  // Staggers reduce load
  {items.map(item => <Card key={item.id} />)}
</Stagger>

// 2. Use once={true} for static content
<Reveal once={true}>
  <StaticContent />
</Reveal>

// 3. Shorten durations
<FadeIn duration={300}>  // Faster = less work
  <Content />
</FadeIn>

// 4. Check for layout thrashing
// Don't animate width, height, top, left
// Only use transform and opacity
```

### TypeScript Errors

**Problem**: Type errors with animation props

**Solutions**:

```tsx
import type { AnimationVariant } from '@spexop/react';

// Ensure variant is typed correctly
const variant: AnimationVariant = 'fadeInUp';

<Reveal variant={variant}>
  <Content />
</Reveal>

// For custom types
import type { AnimationProps } from '@spexop/react';

interface CustomAnimatedProps extends AnimationProps {
  customProp: string;
}
```

## Browser Compatibility

All modern browsers supported:

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

**Polyfills**: None required for supported browsers

**Graceful Degradation**: Content renders immediately if IntersectionObserver unavailable

## Migration Guide

### From v0.1.x to v0.2.0

No breaking changes. All APIs remain compatible.

### New Features in v0.2.0

- Improved TypeScript types
- Better performance
- Enhanced accessibility
- Comprehensive test coverage

## Related Components

- **Card** - Animated card containers
- **Button** - Interactive button animations
- **Grid** - Layout for animated content
- **Stack** - Sequential layouts

## Examples Repository

See the examples directory for complete working demos:

- Hero sections with animations
- Product galleries
- Feature lists
- Interactive forms
- Page transitions

## Support

- Documentation: <https://spexop.dev/docs>
- GitHub: <https://github.com/spexop-ui/spexop>
- Issues: <https://github.com/spexop-ui/spexop/issues>

## License

MIT License - See LICENSE file for details

---

**Built with Spexop design principles for refined, accessible animations.**
