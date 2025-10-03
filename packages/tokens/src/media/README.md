# Media Query Utilities

Comprehensive set of media query utilities built on top of the Spexop Design System breakpoint tokens.

## Available Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `sBreakpointXs` | 480px | Extra small devices |
| `sBreakpointSm` | 640px | Small devices |
| `sBreakpointMd` | 768px | Tablets |
| `sBreakpointLg` | 1024px | Desktops |
| `sBreakpointXl` | 1280px | Large desktops |
| `sBreakpoint2xl` | 1440px | Wide screens |

## Min-width Queries (Mobile-first)

Perfect for mobile-first responsive design:

```typescript
import { sMediaMinMd, sMediaMinLg } from '@spexop/tokens';

// CSS-in-JS
const styles = {
  component: {
    fontSize: '16px',
    [`@media screen and ${sMediaMinMd}`]: {
      fontSize: '18px'
    },
    [`@media screen and ${sMediaMinLg}`]: {
      fontSize: '20px'
    }
  }
};
```

```css
/* Regular CSS */
.component {
  font-size: 16px;
}

@media screen and (min-width: 768px) {
  .component {
    font-size: 18px;
  }
}

@media screen and (min-width: 1024px) {
  .component {
    font-size: 20px;
  }
}
```

Available tokens:

- `sMediaMinXs` - `(min-width: 480px)`
- `sMediaMinSm` - `(min-width: 640px)`
- `sMediaMinMd` - `(min-width: 768px)`
- `sMediaMinLg` - `(min-width: 1024px)`
- `sMediaMinXl` - `(min-width: 1280px)`
- `sMediaMin2xl` - `(min-width: 1440px)`

## Max-width Queries (Desktop-first)

For desktop-first approaches:

```typescript
import { sMediaMaxMd } from '@spexop/tokens';

const mobileStyles = {
  [`@media screen and ${sMediaMaxMd}`]: {
    display: 'block'
  }
};
```

Available tokens:

- `sMediaMaxXs` - `(max-width: calc(480px - 0.02px))`
- `sMediaMaxSm` - `(max-width: calc(640px - 0.02px))`
- `sMediaMaxMd` - `(max-width: calc(768px - 0.02px))`
- `sMediaMaxLg` - `(max-width: calc(1024px - 0.02px))`
- `sMediaMaxXl` - `(max-width: calc(1280px - 0.02px))`
- `sMediaMax2xl` - `(max-width: calc(1440px - 0.02px))`

## Range Queries

Target specific breakpoint ranges:

```typescript
import { sMediaOnlyMd, sMediaMobile } from '@spexop/tokens';

// Only tablets
const tabletStyles = {
  [`@media screen and ${sMediaOnlyMd}`]: {
    padding: '24px'
  }
};

// Mobile and tablet range
const mobileTabletStyles = {
  [`@media screen and ${sMediaMobile}`]: {
    flexDirection: 'column'
  }
};
```

Available tokens:

- `sMediaOnlyXs` - Only extra small devices
- `sMediaOnlySm` - Only small devices  
- `sMediaOnlyMd` - Only tablets
- `sMediaOnlyLg` - Only desktops
- `sMediaOnlyXl` - Only large desktops
- `sMediaMobile` - Mobile and tablet range (480px-1023.98px)
- `sMediaTabletDesktop` - Tablet and desktop range (768px-1439.98px)

## Utility Functions

Create custom media queries programmatically:

```typescript
import { createMinWidth, createRange, createMediaQuery } from '@spexop/tokens';

// Custom breakpoints
const customQuery = createMinWidth('900px');
// Returns: "(min-width: 900px)"

// Custom ranges
const customRange = createRange('600px', '1200px');
// Returns: "(min-width: 600px) and (max-width: calc(1200px - 0.02px))"

// Full media query
const fullQuery = createMediaQuery(customQuery);
// Returns: "@media screen and (min-width: 900px)"
```

## Device & Preference Queries

```typescript
import { 
  sMediaPortrait,
  sMediaHover,
  sMediaReducedMotion,
  sMediaDarkScheme 
} from '@spexop/tokens';

const styles = {
  // Only apply hover effects on devices that support hover
  [`@media screen and ${sMediaHover}`]: {
    '&:hover': {
      backgroundColor: 'blue'
    }
  },
  
  // Respect reduced motion preferences
  [`@media screen and ${sMediaReducedMotion}`]: {
    animation: 'none'
  },
  
  // Dark mode styles
  [`@media screen and ${sMediaDarkScheme}`]: {
    backgroundColor: '#1a1a1a',
    color: 'white'
  }
};
```

Available preference queries:

- `sMediaPortrait` / `sMediaLandscape` - Device orientation
- `sMediaHover` / `sMediaNoHover` - Hover capability
- `sMediaFinePointer` / `sMediaCoarsePointer` - Pointer precision
- `sMediaReducedMotion` / `sMediaMotion` - Motion preferences
- `sMediaDarkScheme` / `sMediaLightScheme` - Color scheme preference
- `sMediaHighContrast` - High contrast preference
- `sMediaReducedTransparency` - Transparency preference

## Best Practices

1. **Use mobile-first approach** with min-width queries when possible
2. **Combine with container queries** for component-level responsive design
3. **Respect user preferences** like reduced motion and high contrast
4. **Test across devices** to ensure breakpoints work as expected
5. **Use semantic names** that describe the intent, not the device
