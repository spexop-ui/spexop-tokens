# Hero Component with Animations

## Day 3: Enhanced Hero Component with Animations

### **Component Overview**

Create a reusable, animated Hero component that serves as a prominent entry point for landing pages, with support for multiple layout variants and sophisticated scroll-triggered animations.

### **Core Requirements**

#### **1. Component Structure**

Create a new `Hero` component at `/packages/react/src/components/Hero/` with:

- `Hero.tsx` - Main component
- `Hero.module.css` - Component styles (liquid glass aesthetic)
- `Hero.types.ts` - TypeScript interfaces
- `index.ts` - Exports
- `README.md` - Documentation

#### **2. Hero Variants**

Support multiple layout patterns:

- **`split`** - Side-by-side content (like current HomePage hero)
- **`centered`** - Center-aligned content with optional background media
- **`minimal`** - Simplified single-column layout
- **`full-bleed`** - Full-width with background video/image overlay

#### **3. Animation Features**

Leverage existing animation system from `/packages/react/src/animations/`:

**Required Animations:**

- Title entrance: `FadeIn` with `slideUp` variant
- Subtitle/description: `FadeIn` with sequential delay
- CTA buttons: `ScaleUp` with stagger effect using `Stagger` component
- Stats/metrics: `ZoomIn` with sequential reveals
- Optional background: Parallax scroll effect (new micro-animation)

**Animation Controls:**

```typescript
interface HeroAnimationConfig {
  disabled?: boolean; // Respect prefers-reduced-motion
  sequence?: 'sequential' | 'simultaneous';
  staggerDelay?: number; // Default: 100ms
  entranceDelay?: number; // Default: 0ms
}
```

#### **4. Props API Design**

```typescript
interface HeroProps {
  // Layout
  variant?: 'split' | 'centered' | 'minimal' | 'full-bleed';
  
  // Content
  eyebrow?: React.ReactNode; // Badge/tag above title
  title: string;
  subtitle?: string;
  description?: string;
  
  // Actions
  primaryAction?: ButtonConfig;
  secondaryAction?: ButtonConfig;
  
  // Optional Features
  stats?: Array<{ value: string; label: string }>;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    overlay?: boolean;
  };
  
  // Styling
  background?: 'default' | 'elevated' | 'gradient' | 'transparent';
  align?: 'left' | 'center' | 'right';
  
  // Animations
  animation?: HeroAnimationConfig;
  
  // Accessibility
  titleLevel?: 1 | 2; // h1 or h2
  ariaLabel?: string;
}
```

#### **5. Design Tokens Integration**

Use existing S-prefix design tokens:

```css
.hero {
  padding: var(--s-spacing-4xl) var(--s-spacing-xl);
  background: var(--s-color-surface-elevated);
  border-radius: var(--s-border-radius-2xl);
  backdrop-filter: blur(var(--s-blur-lg));
}
```

#### **6. Responsive Behavior**

- Mobile (< 768px): Stack all variants vertically
- Tablet (768-1024px): Maintain variant layouts with adjusted spacing
- Desktop (> 1024px): Full variant expressions

#### **7. Accessibility Requirements**

- WCAG 2.1 Level AA compliant
- Keyboard navigation for all interactive elements
- Respect `prefers-reduced-motion` (disable animations)
- Proper heading hierarchy (configurable h1/h2)
- Screen reader announcements for animated content
- Sufficient color contrast ratios
- Focus indicators on all focusable elements

#### **8. Performance Considerations**

- Lazy load media (images/videos)
- Use `IntersectionObserver` from existing animation hooks
- Optimize re-renders with `React.memo` if needed
- CSS-based animations (no JavaScript animations for transitions)
- Maximum 60fps animation performance

### **Implementation Steps**

**Phase 1: Component Foundation** (1-2 hours)

1. Create file structure
2. Define TypeScript interfaces
3. Build basic component shell with prop types
4. Set up CSS module with design tokens

**Phase 2: Layout Variants** (2-3 hours)

1. Implement `centered` variant (simplest)
2. Implement `split` variant
3. Implement `minimal` variant
4. Implement `full-bleed` variant
5. Add responsive breakpoints

**Phase 3: Animation Integration** (2-3 hours)

1. Import animation components (`FadeIn`, `ScaleUp`, `Stagger`, `ZoomIn`)
2. Wrap title with `FadeIn` + `slideUp`
3. Add sequential animations for subtitle/description
4. Implement staggered CTA buttons
5. Add stats counter animations (optional: use `useMotionValue` hook)
6. Create parallax effect for background media (optional)

**Phase 4: Polish & Accessibility** (1-2 hours)

1. Add `prefers-reduced-motion` support
2. Implement keyboard navigation
3. Add ARIA labels and landmarks
4. Test with screen readers
5. Verify color contrast
6. Add loading states for media

**Phase 5: Documentation** (1 hour)

1. Write README with examples
2. Document all props
3. Add usage examples for each variant
4. Include accessibility guidelines

### **Testing Requirements**

- Unit tests: Props rendering, variants, animations
- Visual regression: Storybook stories for each variant
- Accessibility: ARIA attributes, keyboard nav, screen reader
- Performance: Animation frame rates, media loading
- Responsive: All breakpoints

### **Example Usage**

```tsx
import { Hero } from '@spexop/react';

<Hero
  variant="centered"
  eyebrow={<Badge>New Release</Badge>}
  title="Build Faster with Spexop"
  subtitle="Modern design system for React"
  description="Production-ready components with 245+ design tokens"
  primaryAction={{
    label: "Get Started",
    onClick: () => navigate('/docs'),
    iconRight: <ArrowRight />
  }}
  secondaryAction={{
    label: "View Source",
    onClick: () => window.open(githubUrl),
    iconLeft: <Github />
  }}
  stats={[
    { value: "245+", label: "Design Tokens" },
    { value: "30+", label: "Components" },
    { value: "100%", label: "TypeScript" }
  ]}
  animation={{
    sequence: 'sequential',
    staggerDelay: 100
  }}
/>
```

### **Success Criteria**

- ✅ Component works in all 4 variants
- ✅ Smooth, performant animations (60fps)
- ✅ Fully accessible (WCAG AA)
- ✅ Responsive on all devices
- ✅ Matches liquid glass design aesthetic
- ✅ Respects user motion preferences
- ✅ Well-documented with examples
- ✅ Type-safe with comprehensive TypeScript support

### **Future Enhancements** (Post-Day 3)

- Particle effects background option
- Advanced parallax with multiple layers
- Interactive 3D card effects
- Video autoplay with intersection observer
- Custom animation curve builder

---

Would you like me to proceed with implementing this Hero component based on this plan? I can start with Phase 1 and work through each phase systematically.
