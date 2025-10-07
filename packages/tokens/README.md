# @spexop/tokens

TypeScript design tokens for building consistent, themeable user interfaces.

## Features

- 🎨 **Comprehensive Token System** - Colors, spacing, typography, shadows, and more
- 💯 **TypeScript-First** - Full type safety with IntelliSense support
- 🎭 **Built-in Themes** - Multiple pre-configured themes with dark mode support
- 📦 **Tree-Shakeable** - Import only what you need for optimal bundle size
- 🔄 **CSS Variables** - Automatic CSS custom property generation
- 🎯 **Framework Agnostic** - Works with any JavaScript framework or vanilla CSS
- ✅ **Fully Tested** - Comprehensive validation tests ensure token quality

## Installation

```bash
npm install @spexop/tokens
```

```bash
yarn add @spexop/tokens
```

```bash
pnpm add @spexop/tokens
```

## Quick Start

### Using TypeScript Tokens

```typescript
import { 
  sColorNeutral900, 
  sSpacing4, 
  sShadowCard,
  sFontSizeLg,
  sRadiusSubtle
} from "@spexop/tokens";

const styles = {
  backgroundColor: sColorNeutral900,   // '#1a1a1a'
  padding: sSpacing4,                  // '16px'  
  boxShadow: sShadowCard,              // Elevation shadow
  fontSize: sFontSizeLg,               // '18px'
  borderRadius: sRadiusSubtle,         // '8px'
};
```

### Using CSS Variables

```css
/* Import the CSS file in your app */
@import '@spexop/tokens/tokens.css';

.my-component {
  background-color: var(--s-color-neutral-900);
  padding: var(--s-spacing-4);
  box-shadow: var(--s-shadow-card);
  font-size: var(--s-font-size-lg);
  border-radius: var(--s-radius-subtle);
}
```

### Using Themes

```typescript
import { themes, minimalTheme, professionalTheme, boldTheme } from "@spexop/tokens";

// Access theme colors
const theme = minimalTheme;
console.log(theme.primary);      // '#1a1a1a'
console.log(theme.secondary);    // '#666666'

// Use with dark mode
import { minimalDarkTheme, professionalDarkTheme, boldDarkTheme } from "@spexop/tokens";
```

## Token Categories

### Colors

**Base Colors:**

- Neutrals (50-950) - 12 shades
- Slate (50-900) - 10 shades
- Blues (50-900) - 10 shades
- Reds (50-900) - 10 shades
- Purples (50-900) - 10 shades
- Greens (50-900) - 10 shades

**Semantic Colors:**

- Success (50-900) - 10 shades for positive feedback
- Warning (50-900) - 10 shades for cautionary messages
- Info (50-900) - 10 shades for informational content
- Error (50-900) - 10 shades for error states
- Glass colors for glassmorphism effects

**Theme Colors:**

- Semantic tokens that adapt to active theme
- Support for light and dark modes

### Spacing

Consistent spacing scale from 0 to 32:

```typescript
sSpacing0   // '0px'
sSpacing1   // '4px'
sSpacing2   // '8px'
sSpacing4   // '16px'
sSpacing8   // '32px'
// ... up to sSpacing32
```

### Typography

**Font Families:**

- `sFontFamilyBase` - System font stack
- `sFontFamilyMono` - Monospace font stack

**Font Sizes:**

```typescript
sFontSize3xs  // '10px'
sFontSizeXs   // '12px'
sFontSizeSm   // '14px'
sFontSizeBase // '16px'
sFontSizeLg   // '18px'
// ... up to sFontSizeHero
```

**Font Weights:**

- Normal, Medium, Semibold, Bold, Extrabold, Black

**Line Heights:**

- None, Tight, Snug, Normal, Relaxed

**Letter Spacing:**

- Tighter, Tight, Normal, Wide, Wider, Widest

### Effects

**Shadows:**

- `sShadowCard`, `sShadowFloat`, `sShadowDrawer`
- `sShadowGlassLight`, `sShadowGlassDark`

**Blur:**

- `sBlurSubtle`, `sBlurGlass`, `sBlurStrong`, `sBlurLiquid`

**Backdrop:**

- `sBackdropLight`, `sBackdropGlass`, `sBackdropStrong`

### Border Radius

```typescript
sRadiusNone     // '0px'
sRadiusTight    // '4px'
sRadiusSubtle   // '8px'
sRadiusRelaxed  // '12px'
sRadiusLiquid   // '16px'
sRadiusPill     // '9999px'
```

### Motion

**Durations:**

```typescript
sDurationFast    // '150ms'
sDurationNormal  // '250ms'
sDurationSlow    // '400ms'
```

**Easing:**

```typescript
sEaseSmooth      // Smooth transitions
sEaseDecelerate  // Natural deceleration
sEaseBounce      // Playful bounce
```

**Transition Presets:**

```typescript
sTransitionBase      // Basic transitions
sTransitionColors    // Color transitions
sTransitionTransform // Transform transitions
```

### Breakpoints & Media Queries

**Breakpoints:**

```typescript
sBreakpointXs   // '480px'
sBreakpointSm   // '640px'
sBreakpointMd   // '768px'
sBreakpointLg   // '1024px'
sBreakpointXl   // '1280px'
sBreakpoint2xl  // '1536px'
```

**Media Queries:**

```typescript
// Mobile-first (min-width)
sMediaMinSm  // '@media (min-width: 640px)'
sMediaMinMd  // '@media (min-width: 768px)'

// Desktop-first (max-width)
sMediaMaxMd  // '@media (max-width: 767px)'

// Ranges
sMediaMobile         // Mobile only
sMediaTabletDesktop  // Tablet and up

// Feature queries
sMediaDarkScheme     // '@media (prefers-color-scheme: dark)'
sMediaReducedMotion  // '@media (prefers-reduced-motion: reduce)'
```

### Z-Index

Consistent layering system:

```typescript
sZIndexBase          // 0
sZIndexContent       // 10
sZIndexSticky        // 100
sZIndexDropdown      // 1000
sZIndexOverlay       // 2000
sZIndexTooltip       // 3000
```

### Outline (Focus Indicators)

Accessibility-focused outline tokens for keyboard navigation:

**Outline Widths:**

```typescript
sOutlineWidth1  // '1px' - Subtle focus
sOutlineWidth2  // '2px' - Standard focus
sOutlineWidth3  // '3px' - Prominent focus
sOutlineWidth4  // '4px' - High visibility
```

**Outline Offsets:**

```typescript
sOutlineOffset0  // '0px' - No separation
sOutlineOffset2  // '2px' - Small gap
sOutlineOffset4  // '4px' - Medium gap
sOutlineOffset8  // '8px' - Large gap
```

**Outline Styles:**

```typescript
sOutlineStyleSolid   // 'solid'
sOutlineStyleDashed  // 'dashed'
sOutlineStyleDotted  // 'dotted'
```

### Grid Layout

Flexible grid system tokens for layout configuration:

**Grid Columns:**

```typescript
sGridColumns12  // '12' - Standard 12-column grid
sGridColumns16  // '16' - Extended 16-column grid
sGridColumns24  // '24' - Fine-grained 24-column grid
```

**Grid Gutters:**

```typescript
sGridGutterSm  // '16px' - Small gutter
sGridGutterMd  // '24px' - Medium gutter
sGridGutterLg  // '32px' - Large gutter
```

> **Note:** Container max widths are available via `sContainer*` tokens (see existing container tokens: `sContainerXs`, `sContainerSm`, `sContainerMd`, `sContainerLg`, `sContainerXl`, `sContainer2xl`, `sContainerFull`).

### Aspect Ratios

Standard aspect ratios for media and containers:

```typescript
sAspectRatioSquare     // '1 / 1'    - Perfect square
sAspectRatioVideo      // '16 / 9'   - Standard video
sAspectRatioWide       // '21 / 9'   - Ultra-wide
sAspectRatioClassic    // '4 / 3'    - Classic/standard
sAspectRatioPortrait   // '3 / 4'    - Portrait orientation
sAspectRatioGolden     // '1.618 / 1' - Golden ratio
sAspectRatioUltraWide  // '32 / 9'   - Ultra-wide/panoramic
```

### Constraints

Min/max width and height constraints for components:

**Width Constraints:**

```typescript
sMinWidthButton  // '88px'  - Minimum button width
sMinWidthInput   // '200px' - Minimum input width
sMinWidthCard    // '280px' - Minimum card width
sMaxWidthText    // '65ch'  - Optimal reading width
sMaxWidthProse   // '75ch'  - Prose content width
```

**Height Constraints:**

```typescript
sMinHeightButton  // '44px' - Touch target (WCAG)
sMinHeightInput   // '44px' - Touch target (WCAG)
sMaxHeightModal   // '90vh' - Modal max height
```

### Border Styles

Extended border style options:

```typescript
sBorderStyleSolid   // 'solid'
sBorderStyleDashed  // 'dashed'
sBorderStyleDotted  // 'dotted'
sBorderStyleDouble  // 'double'
sBorderStyleNone    // 'none'
```

## Theme System

Built-in themes with automatic dark mode support:

```typescript
import { 
  themes,             // All themes
  minimalTheme,       // Clean, sophisticated black-based theme
  professionalTheme,  // Modern professional blue theme  
  boldTheme,          // Vibrant, attention-grabbing red theme
  minimalDarkTheme,   // Dark mode variant
  professionalDarkTheme,
  boldDarkTheme
} from "@spexop/tokens";
```

Each theme includes:

- Primary, secondary, accent colors
- Background and surface colors
- Text colors (primary, secondary, muted)
- Border colors
- State colors (hover, active, disabled)

## Advanced Usage

### Media Query Utilities

```typescript
import { 
  createMediaQuery,
  createMinWidth,
  createMaxWidth,
  createRange
} from "@spexop/tokens";

// Create custom media queries
const customQuery = createMediaQuery('(min-width: 900px)');
const minWidthQuery = createMinWidth('1200px');
const rangeQuery = createRange('768px', '1024px');
```

### Semantic Tokens

Semantic tokens provide context-aware values that adapt to themes:

```typescript
import {
  sColorPrimary,
  sColorBackgroundPrimary,
  sColorTextPrimary,
  sColorBorder,
  sGlassSurface
} from "@spexop/tokens";
```

## Naming Convention

All tokens use the `s` prefix (Spexop prefix) to avoid naming conflicts:

- `sColor*` - Color tokens
- `sSpacing*` - Spacing tokens
- `sFont*` - Typography tokens
- `sShadow*` - Shadow tokens
- `sRadius*` - Border radius tokens
- `sMedia*` - Media query tokens
- `sZIndex*` - Z-index tokens
- `sOutline*` - Outline/focus tokens
- `sGrid*` - Grid layout tokens
- `sAspectRatio*` - Aspect ratio tokens
- `sMinWidth*`, `sMaxWidth*`, `sMinHeight*`, `sMaxHeight*` - Constraint tokens
- `sBorderStyle*` - Border style tokens

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type { ThemeName, ThemeColors, ColorMode } from "@spexop/tokens";

const theme: ThemeName = "professional";
const mode: ColorMode = "dark";
```

## Testing

The package includes comprehensive validation tests to ensure token quality:

```bash
pnpm test
```

Tests validate:

- Token value formats (colors, sizes, etc.)
- Naming conventions
- Theme completeness
- Type correctness

## License

MIT © Spexop Team

## Links

- [GitHub Repository](https://github.com/spexop-ui/design-system)
- [Documentation](https://github.com/spexop-ui/design-system/tree/main/packages/tokens)
- [Issues](https://github.com/spexop-ui/design-system/issues)
