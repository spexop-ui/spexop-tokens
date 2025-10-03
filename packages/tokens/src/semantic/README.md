# Semantic Tokens

Semantic tokens provide **context-aware** values that adapt to different themes and use cases. Instead of referencing specific color values, semantic tokens describe the *purpose* of the color.

## Why Use Semantic Tokens?

### Problem with Base Tokens

```typescript
// ❌ Using base tokens directly
import { sColorNeutral900, sColorBlue600 } from "@spexop/tokens";

const button = {
  backgroundColor: sColorNeutral900,  // What is this for?
  color: sColorBlue600                 // Why blue?
};
```

**Issues:**

- Hard to understand intent
- Difficult to change theme
- Colors don't adapt to dark mode
- Inconsistent usage across components

### Solution with Semantic Tokens

```typescript
// ✅ Using semantic tokens
import { sColorPrimary, sColorTextPrimary } from "@spexop/tokens";

const button = {
  backgroundColor: sColorPrimary,      // Clear intent: primary action
  color: sColorTextPrimary             // Clear intent: main text
};
```

**Benefits:**

- Self-documenting code
- Automatic theme adaptation
- Consistent across components
- Easy to maintain

## Available Semantic Tokens

### Color Tokens

#### Background Colors

```typescript
sColorBackgroundPrimary     // Main background (usually white/dark)
sColorBackgroundSecondary   // Secondary background (subtle contrast)
sColorBackgroundTertiary    // Tertiary background (more contrast)
sColorBackgroundHover       // Background on hover state
```

#### Surface Colors

```typescript
sColorSurface               // Component surface (cards, panels)
sColorSurfaceRaised         // Elevated surface (dialogs, dropdowns)
sColorSurfaceHover          // Surface hover state
```

#### Text Colors

```typescript
sColorTextPrimary           // Main text color
sColorTextSecondary         // Secondary text (labels, captions)
sColorTextMuted             // Muted text (placeholders, hints)
sColorTextInverted          // Text on dark backgrounds
sColorTextDisabled          // Disabled text
```

#### Border Colors

```typescript
sColorBorder                // Default border
sColorBorderSubtle          // Subtle border (dividers)
sColorBorderHover           // Border on hover
sColorBorderFocus           // Border on focus (accessibility)
```

#### Interactive Colors

```typescript
sColorPrimary               // Primary action color
sColorPrimaryHover          // Primary hover state
sColorPrimaryActive         // Primary active/pressed state

sColorInteractiveHover      // Generic interactive hover
sColorInteractiveFocus      // Focus indicator
sColorInteractiveActive     // Active/pressed state
```

#### Overlay Colors

```typescript
sColorOverlay               // Modal overlay
sColorOverlayLight          // Light overlay
sColorOverlayHeavy          // Heavy/dark overlay
```

### Glass Tokens

Special semantic tokens for glassmorphism effects:

```typescript
// Glass surfaces with different opacity levels
sGlassSurface               // Standard glass surface
sGlassOverlay               // Glass overlay (modals, dialogs)
sGlassNav                   // Glass navigation bars
sGlassHero                  // Glass hero sections

// Light glass variants
sGlassLight10               // 10% light glass
sGlassLight20               // 20% light glass
sGlassLight30               // 30% light glass
sGlassLight50               // 50% light glass

// Dark glass variants
sGlassDark10                // 10% dark glass
sGlassDark20                // 20% dark glass
sGlassDark30                // 30% dark glass
sGlassDark50                // 50% dark glass
```

## Usage Examples

### Basic Component Styling

```typescript
import {
  sColorPrimary,
  sColorTextPrimary,
  sColorSurface,
  sColorBorder
} from "@spexop/tokens";

const Card = styled.div`
  background-color: ${sColorSurface};
  border: 1px solid ${sColorBorder};
  color: ${sColorTextPrimary};
`;

const Button = styled.button`
  background-color: ${sColorPrimary};
  color: ${sColorTextInverted};
  border: none;
  
  &:hover {
    background-color: ${sColorPrimaryHover};
  }
`;
```

### Form Elements

```typescript
import {
  sColorSurface,
  sColorTextPrimary,
  sColorBorder,
  sColorBorderFocus,
  sColorTextMuted
} from "@spexop/tokens";

const Input = styled.input`
  background-color: ${sColorSurface};
  color: ${sColorTextPrimary};
  border: 1px solid ${sColorBorder};
  
  &:focus {
    border-color: ${sColorBorderFocus};
    outline: none;
  }
  
  &::placeholder {
    color: ${sColorTextMuted};
  }
  
  &:disabled {
    color: ${sColorTextDisabled};
    cursor: not-allowed;
  }
`;
```

### Navigation with Glass Effect

```typescript
import { sGlassNav, sColorTextPrimary, sShadowCard } from "@spexop/tokens";

const Nav = styled.nav`
  background: ${sGlassNav};
  backdrop-filter: blur(12px);
  color: ${sColorTextPrimary};
  box-shadow: ${sShadowCard};
`;
```

### Modal with Overlay

```typescript
import {
  sColorOverlay,
  sColorSurfaceRaised,
  sColorTextPrimary,
  sShadowFloat
} from "@spexop/tokens";

const ModalOverlay = styled.div`
  background-color: ${sColorOverlay};
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: ${sColorSurfaceRaised};
  color: ${sColorTextPrimary};
  box-shadow: ${sShadowFloat};
`;
```

## Theme Adaptation

Semantic tokens automatically adapt to the active theme:

### Minimal Theme

```typescript
sColorPrimary = sColorNeutral900  // Black
sColorTextPrimary = sColorNeutral900
```

### Professional Theme

```typescript
sColorPrimary = sColorBlue600  // Blue
sColorTextPrimary = sColorNeutral900
```

### Bold Theme

```typescript
sColorPrimary = sColorRed500  // Red
sColorTextPrimary = sColorNeutral900
```

## Best Practices

### 1. Prefer Semantic Over Base Tokens

```typescript
// ✅ Good - Semantic tokens
import { sColorPrimary, sColorTextPrimary } from "@spexop/tokens";

// ❌ Avoid - Direct base tokens
import { sColorBlue600, sColorNeutral900 } from "@spexop/tokens";
```

**Exception:** Use base tokens when you need a *specific* color regardless of theme (e.g., brand colors, status colors).

### 2. Use Consistent Patterns

```typescript
// ✅ Good - Consistent semantic usage
const components = {
  button: { backgroundColor: sColorPrimary },
  link: { color: sColorPrimary },
  badge: { backgroundColor: sColorPrimary }
};

// ❌ Bad - Mixing semantic and base tokens
const components = {
  button: { backgroundColor: sColorPrimary },
  link: { color: sColorBlue600 },
  badge: { backgroundColor: sColorRed500 }
};
```

### 3. Use Hierarchy for Text

```typescript
// ✅ Good - Clear text hierarchy
const styles = {
  title: { color: sColorTextPrimary },      // Most important
  subtitle: { color: sColorTextSecondary }, // Less important
  caption: { color: sColorTextMuted }       // Least important
};
```

### 4. Respect Interactive States

```typescript
// ✅ Good - All states covered
const button = {
  backgroundColor: sColorPrimary,
  '&:hover': { backgroundColor: sColorPrimaryHover },
  '&:active': { backgroundColor: sColorPrimaryActive },
  '&:focus': { outline: `2px solid ${sColorBorderFocus}` }
};
```

### 5. Use Glass Tokens for Glassmorphism

```typescript
// ✅ Good - Complete glass effect
const glassSurface = {
  background: sGlassSurface,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${sGlassLight20}`
};

// ❌ Bad - Incomplete glass effect
const surface = {
  background: 'rgba(255,255,255,0.1)'
  // Missing backdrop-filter
};
```

## When NOT to Use Semantic Tokens

### Brand-Specific Colors

```typescript
// OK to use base tokens for specific brand colors
import { sColorBlue600 } from "@spexop/tokens";

const brandLogo = {
  color: sColorBlue600  // Your brand is specifically blue
};
```

### Status Colors

```typescript
// OK to use base tokens for specific status meanings
import { sColorError500, sColorSuccess500 } from "@spexop/tokens";

const statusBadge = {
  error: { backgroundColor: sColorError500 },
  success: { backgroundColor: sColorSuccess500 }
};
```

### Illustrations and Graphics

```typescript
// OK to use specific colors for illustrations
import { sColorBlue400, sColorRed300 } from "@spexop/tokens";

const illustration = {
  sky: sColorBlue400,
  sunset: sColorRed300
};
```

## TypeScript Types

```typescript
// All semantic tokens are typed as strings
const primary: string = sColorPrimary;
const surface: string = sGlassSurface;
```

## Migration from Base Tokens

If you're currently using base tokens, migrate gradually:

```typescript
// Before
import { sColorNeutral900, sColorNeutral500 } from "@spexop/tokens";

const styles = {
  color: sColorNeutral900,
  backgroundColor: sColorNeutral500
};

// After
import { sColorTextPrimary, sColorBackgroundSecondary } from "@spexop/tokens";

const styles = {
  color: sColorTextPrimary,
  backgroundColor: sColorBackgroundSecondary
};
```

## Framework Examples

### React Component

```typescript
import { 
  sColorPrimary, 
  sColorSurface, 
  sColorTextPrimary 
} from "@spexop/tokens";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: sColorSurface,
      color: sColorTextPrimary,
      padding: '16px',
      borderRadius: '8px'
    }}>
      {children}
    </div>
  );
}
```

### Vue Component

```vue
<template>
  <div :style="cardStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { sColorSurface, sColorTextPrimary } from "@spexop/tokens";

const cardStyles = {
  backgroundColor: sColorSurface,
  color: sColorTextPrimary,
  padding: '16px',
  borderRadius: '8px'
};
</script>
```

### CSS Variables

```typescript
import { sColorPrimary, sColorTextPrimary } from "@spexop/tokens";

// Set CSS variables
document.documentElement.style.setProperty('--color-primary', sColorPrimary);
document.documentElement.style.setProperty('--color-text', sColorTextPrimary);
```

```css
/* Use in CSS */
.button {
  background-color: var(--color-primary);
  color: var(--color-text);
}
```

## Related Documentation

- [Theme System](../themes/README.md) - Learn about themes
- [Main README](../README.md) - Package overview
- [Color Tokens](../color/) - Base color palette
