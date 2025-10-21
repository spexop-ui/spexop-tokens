# Responsive Utilities for React

This guide shows the best ways to integrate media query tokens from `@spexop/theme` into your React components.

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [Hooks](#hooks)
3. [Components](#components)
4. [Integration Patterns](#integration-patterns)
5. [Examples](#examples)
6. [Best Practices](#best-practices)

## Quick Start

```tsx
import { 
  useBreakpoint, 
  useResponsiveValue, 
  Responsive 
} from '@spexop/react';

function MyComponent() {
  // Check current breakpoint
  const { isMobile, isDesktop } = useBreakpoint();
  
  // Responsive values
  const padding = useResponsiveValue({
    xs: '16px',
    md: '24px',
    lg: '32px'
  });
  
  return (
    <div style={{ padding }}>
      <Responsive mobile>
        <MobileNav />
      </Responsive>
      
      <Responsive desktop>
        <DesktopNav />
      </Responsive>
    </div>
  );
}
```

## Hooks

### `useMediaQuery(query: string)`

Match any media query using design tokens:

```tsx
import { useMediaQuery } from '@spexop/react';
import { sMediaMinMd, sMediaDarkScheme } from '@spexop/theme';

function Component() {
  const isTabletUp = useMediaQuery(sMediaMinMd);
  const isDarkMode = useMediaQuery(sMediaDarkScheme);
  const isLargeScreen = useMediaQuery(sMediaMinXl);
  
  return <div>Current: {isTabletUp ? 'Desktop' : 'Mobile'}</div>;
}
```

### `useBreakpoint()`

Get comprehensive breakpoint information:

```tsx
import { useBreakpoint } from '@spexop/react';

function Component() {
  const {
    current,    // "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    isMobile,   // xs-sm range
    isTablet,   // md only
    isDesktop,  // lg+ 
    isLg,       // lg breakpoint exactly
  } = useBreakpoint();
  
  return <div>Current breakpoint: {current}</div>;
}

// Or check specific breakpoints
function SpecificCheck() {
  const isLargeUp = useBreakpoint('min', 'lg');  // lg and up
  const isMediumOnly = useBreakpoint('only', 'md'); // md only
  const isSmallDown = useBreakpoint('max', 'sm');   // sm and down
  
  return <div>Large+ screen: {isLargeUp}</div>;
}
```

### `useResponsiveValue(value)`

Handle responsive prop values:

```tsx
import { useResponsiveValue } from '@spexop/react';

interface Props {
  size: string | { xs?: string; md?: string; lg?: string };
  columns: number | { xs?: number; md?: number; lg?: number };
}

function Grid({ size, columns }: Props) {
  const currentSize = useResponsiveValue(size);
  const currentColumns = useResponsiveValue(columns);
  
  return (
    <div 
      style={{ 
        fontSize: currentSize,
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)` 
      }}
    >
      {/* Grid content */}
    </div>
  );
}

// Usage
<Grid 
  size={{ xs: '14px', md: '16px', lg: '18px' }}
  columns={{ xs: 1, md: 2, lg: 3 }}
/>
```

## Components

### `<Responsive>`

Conditionally render components based on screen size:

```tsx
import { Responsive } from '@spexop/react';

function App() {
  return (
    <>
      {/* Show only on mobile */}
      <Responsive mobile>
        <MobileHeader />
      </Responsive>
      
      {/* Show on tablet and up */}
      <Responsive up="md">
        <DesktopHeader />
      </Responsive>
      
      {/* Show only on specific breakpoint */}
      <Responsive only="lg">
        <LargeScreenWidget />
      </Responsive>
      
      {/* Hide on small screens */}
      <Responsive down="sm" hide>
        <ComplexChart />
      </Responsive>
    </>
  );
}
```

## Integration Patterns

### 1. **Direct Token Usage in CSS-in-JS**

```tsx
import { sMediaMinMd, sMediaMaxLg } from '@spexop/theme';

const styles = {
  container: {
    padding: '16px',
    
    // Mobile-first
    [`@media screen and ${sMediaMinMd}`]: {
      padding: '24px'
    },
    
    // Desktop-first  
    [`@media screen and ${sMediaMaxLg}`]: {
      flexDirection: 'column'
    }
  }
};
```

### 2. **Responsive Component Props**

Create components that accept responsive values:

```tsx
import { ResponsiveProp, useResponsiveValue } from '@spexop/react';

interface CardProps {
  padding: ResponsiveProp<string>;
  columns: ResponsiveProp<number>;
}

function Card({ padding, columns }: CardProps) {
  const currentPadding = useResponsiveValue(padding);
  const currentColumns = useResponsiveValue(columns);
  
  return (
    <div 
      style={{ 
        padding: currentPadding,
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`
      }}
    >
      {/* Content */}
    </div>
  );
}

// Usage with responsive props
<Card 
  padding={{ xs: '12px', md: '20px', lg: '28px' }}
  columns={{ xs: 1, sm: 2, lg: 3 }}
/>
```

### 3. **Conditional Rendering with Hooks**

```tsx
import { useBreakpoint } from '@spexop/react';

function Navigation() {
  const { isMobile, isDesktop } = useBreakpoint();
  
  if (isMobile) {
    return <MobileNav />;
  }
  
  if (isDesktop) {
    return <DesktopNav />;
  }
  
  return <TabletNav />;
}
```

### 4. **Component Variants Based on Screen Size**

```tsx
import { useBreakpoint } from '@spexop/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  responsiveSize?: boolean;
}

function Button({ children, variant = 'primary', responsiveSize = true }: ButtonProps) {
  const { current } = useBreakpoint();
  
  // Automatically adjust button size based on screen
  const size = responsiveSize 
    ? current === 'xs' ? 'small' 
    : current === '2xl' ? 'large' 
    : 'medium'
    : 'medium';
  
  return (
    <button className={`btn btn--${variant} btn--${size}`}>
      {children}
    </button>
  );
}
```

## Examples

### Complete Responsive Card Component

```tsx
import { 
  useResponsiveValue, 
  useBreakpoint,
  type ResponsiveProp 
} from '@spexop/react';

interface ResponsiveCardProps {
  title: string;
  padding: ResponsiveProp<string>;
  shadow: ResponsiveProp<boolean>;
  columns?: ResponsiveProp<number>;
  children: React.ReactNode;
}

function ResponsiveCard({ 
  title, 
  padding, 
  shadow, 
  columns = 1,
  children 
}: ResponsiveCardProps) {
  const currentPadding = useResponsiveValue(padding);
  const currentShadow = useResponsiveValue(shadow);
  const currentColumns = useResponsiveValue(columns);
  const { isMobile } = useBreakpoint();
  
  return (
    <article 
      style={{
        padding: currentPadding,
        boxShadow: currentShadow ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
        display: 'grid',
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
        gap: isMobile ? '12px' : '20px'
      }}
    >
      <h2>{title}</h2>
      {children}
    </article>
  );
}

// Usage
<ResponsiveCard
  title="Product Grid"
  padding={{ xs: '16px', md: '24px', xl: '32px' }}
  shadow={{ xs: false, md: true }}
  columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
>
  <ProductCard />
  <ProductCard />
  <ProductCard />
</ResponsiveCard>
```

### Media Query Container

```tsx
import { sMediaMinMd, sMediaMinLg } from '@spexop/theme';

function MediaQueryContainer() {
  return (
    <>
      <div 
        style={{
          padding: '16px',
          
          // Tablet and up
          [`@media screen and ${sMediaMinMd}`]: {
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          },
          
          // Desktop and up  
          [`@media screen and ${sMediaMinLg}`]: {
            padding: '32px',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }
        }}
      >
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
```

## Best Practices

### 1. **Mobile-First Approach**

Always design for mobile first, then enhance for larger screens:

```tsx
// ✅ Good: Mobile-first
const styles = {
  fontSize: '16px',
  [`@media screen and ${sMediaMinMd}`]: {
    fontSize: '18px'
  }
};

// ❌ Avoid: Desktop-first
const styles = {
  fontSize: '18px',  
  [`@media screen and ${sMediaMaxMd}`]: {
    fontSize: '16px'
  }
};
```

### 2. **Use Semantic Breakpoint Names**

Prefer semantic names over device-specific ones:

```tsx
// ✅ Good: Semantic names
const { isDesktop, isMobile } = useBreakpoint();

// ❌ Avoid: Device-specific assumptions
const { isLg } = useBreakpoint(); // What if tablet is actually lg?
```

### 3. **Batch Responsive Changes**

Group related responsive changes together:

```tsx
// ✅ Good: Grouped responsive logic
const cardStyles = useResponsiveValue({
  xs: { padding: '12px', columns: 1, gap: '8px' },
  md: { padding: '20px', columns: 2, gap: '16px' },
  lg: { padding: '24px', columns: 3, gap: '20px' }
});

// ❌ Avoid: Separate responsive values for related properties
const padding = useResponsiveValue({ xs: '12px', md: '20px' });
const columns = useResponsiveValue({ xs: 1, md: 2 });
const gap = useResponsiveValue({ xs: '8px', md: '16px' });
```

### 4. **Performance Considerations**

Use `<Responsive>` component for expensive operations:

```tsx
// ✅ Good: Conditional rendering prevents expensive work
<Responsive desktop>
  <ExpensiveChart data={bigDataset} />
</Responsive>

// ❌ Avoid: Always renders, just hides with CSS
<div style={{ display: isDesktop ? 'block' : 'none' }}>
  <ExpensiveChart data={bigDataset} />
</div>
```

### 5. **TypeScript Integration**

Define responsive prop types for better DX:

```tsx
import { ResponsiveProp } from '@spexop/react';

interface ComponentProps {
  size: ResponsiveProp<'small' | 'medium' | 'large'>;
  spacing: ResponsiveProp<string>;
  columns: ResponsiveProp<number>;
}
```

---

## Summary

The responsive utilities provide four main integration methods:

1. **Direct token usage** - For CSS-in-JS and styled components
2. **Hooks** - For programmatic responsive logic
3. **Components** - For declarative conditional rendering  
4. **Responsive props** - For component-level responsive behavior

Choose the method that best fits your component's needs and your team's preferences. The utilities are designed to work together, so you can mix and match approaches within the same application.
