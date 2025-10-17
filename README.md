# Spexop Design Tokens

A comprehensive TypeScript design token system with 379 tokens for building modern, consistent UIs.

## ✨ Key Features

- **🎨 379 Design Tokens** - Refined token system following Refined Minimalism principles
- **💯 TypeScript-First** - Full type coverage with IntelliSense support
- **📦 Multiple Formats** - ES Modules, CommonJS, CSS variables, and JSON
- **🎭 Built-in Themes** - Pre-configured theme tokens with dark mode support
- **🔧 Flexible** - Use with any framework (React, Vue, Angular, vanilla JS)
- **📱 Responsive** - Modern breakpoints for all screen sizes
- **⚡ Tree-Shakeable** - Import only the tokens you need
- **🚀 Zero Dependencies** - Lightweight and fast

## 🚀 Quick Start

```bash
# Install with npm
npm install @spexop/tokens

# Or with pnpm
pnpm add @spexop/tokens

# Or with yarn
yarn add @spexop/tokens
```

### TypeScript/JavaScript

```typescript
import { 
  sColorBlue500, 
  sSpacing4, 
  sFontSizeXl,
  sFontWeightBold,
  sRadiusMd 
} from '@spexop/tokens';

const buttonStyles = {
  backgroundColor: sColorBlue500,  // "#3b82f6"
  padding: sSpacing4,               // "16px"
  fontSize: sFontSizeXl,            // "20px"
  fontWeight: sFontWeightBold,      // "700"
  borderRadius: sRadiusMd,          // "8px"
};
```

### CSS Variables

```css
/* Import CSS variables */
@import '@spexop/tokens/dist/tokens.css';

.button {
  background-color: var(--s-color-blue-500);
  padding: var(--s-spacing-4);
  font-size: var(--s-font-size-xl);
  font-weight: var(--s-font-weight-bold);
  border-radius: var(--s-radius-md);
}
```

---

## 🆕 What's New in v0.4.0

**Current Version: v0.4.0** - Large Spacing Tokens 🎯

✨ **NEW FEATURES** - Added 10 new large spacing tokens for hero sections and modern layouts

**Added:**

- ✅ **10 large spacing tokens** (sSpacing40 through sSpacing192)
- ✅ **Extended spacing scale** - Now covers 0px to 768px (was 0px to 128px)
- ✅ **Breakpoint-aligned** - sSpacing160 and sSpacing192 match responsive breakpoints
- ✅ **Better large-screen support** - Perfect for 1920px+, 2560px+ displays

**New Tokens:**

| Token | Value | Use Case |
|-------|-------|----------|
| `sSpacing40` | 160px | Large component spacing |
| `sSpacing48` | 192px | Section spacing |
| `sSpacing56` | 224px | Large section spacing |
| `sSpacing64` | 256px | Hero section vertical spacing |
| `sSpacing80` | 320px | Extra large spacing |
| `sSpacing96` | 384px | Massive spacing |
| `sSpacing100` | 400px | Ultra spacing |
| `sSpacing128` | 512px | Full-viewport-like spacing |
| `sSpacing160` | 640px | Matches sBreakpointSm |
| `sSpacing192` | 768px | Matches sBreakpointMd |

**Result:**

- ✅ **379 tokens** (up from 369) - Complete spacing scale
- ✅ **Backward compatible** - No breaking changes
- ✅ **Modern layout support** - Hero sections, full-height designs

[See full changelog →](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/CHANGELOG.md)

---

## 📦 Token Categories

| Category | Token Count | Examples |
|----------|-------------|----------|
| **Colors** | 98 | `sColorBlue500`, `sColorRed600`, `sColorNeutral100` |
| **Spacing** | 31 | `sSpacing0` - `sSpacing192` (0px to 768px) |
| **Typography** | 43 | Font sizes, weights, line heights, letter spacing |
| **Border Radius** | 8 | `sRadiusNone` to `sRadiusPill` |
| **Shadows** | 2 | `sShadowNone`, `sShadowSubtle` (minimal use) |
| **Breakpoints** | 6 | `sBreakpointXs` to `sBreakpoint2xl` |
| **Layout** | 30+ | Grid, constraints, z-index |
| **Motion** | 15+ | Durations, easings, transitions |
| **Other** | 146+ | Aspect ratios, opacity, cursors, transforms |
| **Total** | **379** | Refined design system |

### Package Contents

The `@spexop/tokens` package includes:

- **TypeScript/JavaScript** - ES Modules (`index.js`) and CommonJS (`index.cjs`)
- **Type Definitions** - Full TypeScript support (`index.d.ts`, `index.d.cts`)
- **CSS Variables** - All tokens as CSS custom properties (`tokens.css`)
- **JSON Export** - Token values in JSON format (`tokens.json`)
- **Documentation** - Reference guide and demo HTML (`TOKENS-REFERENCE.md`, `tokens-demo.html`)

---

## 📚 Token Usage Examples

### Spacing System

```typescript
import { 
  sSpacing0, 
  sSpacing4, 
  sSpacing8, 
  sSpacing16,
  sSpacing64,
  sSpacing160 
} from '@spexop/tokens';

// Component spacing
const cardStyles = {
  padding: sSpacing4,        // 16px
  marginBottom: sSpacing8,   // 32px
  gap: sSpacing2,            // 8px
};

// Large layout spacing (NEW in v0.4.0)
const heroStyles = {
  paddingTop: sSpacing64,    // 256px
  paddingBottom: sSpacing64,
  minHeight: sSpacing160,    // 640px
};
```

### Color System

```typescript
import { sColorBlue500, sColorGray100, sColorRed600 } from '@spexop/tokens';

// Semantic usage
const buttonStyles = {
  primary: sColorBlue500,    // "#3b82f6"
  background: sColorGray100, // "#f3f4f6"
  error: sColorRed600,       // "#dc2626"
};
```

### Typography System

```typescript
import { 
  sFontSizeBase, 
  sFontSizeXl, 
  sFontSize3xl,
  sFontWeightBold,
  sLineHeightRelaxed 
} from '@spexop/tokens';

const typographyStyles = {
  body: {
    fontSize: sFontSizeBase,      // "16px"
    lineHeight: sLineHeightRelaxed, // "1.625"
  },
  heading: {
    fontSize: sFontSize3xl,       // "30px"
    fontWeight: sFontWeightBold,  // "700"
  },
};
```

### Responsive Breakpoints

```typescript
import { sBreakpointMd, sBreakpointLg } from '@spexop/tokens';

// Media query usage
const mediaQuery = `@media (min-width: ${sBreakpointMd})`; // "@media (min-width: 768px)"
```

---

## 📚 Documentation

- **[GitHub Repository](https://github.com/spexop-ui/spexop-tokens)** - Source code and documentation
- **[npm Package](https://www.npmjs.com/package/@spexop/tokens)** - Published package on npm
- **[Token Reference](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/TOKENS-REFERENCE.md)** - Complete token list
- **[Changelog](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/CHANGELOG.md)** - Version history
- **[Demo HTML](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/tokens-demo.html)** - Interactive token showcase

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on [GitHub](https://github.com/spexop-ui/spexop-tokens).

---

## 📄 License

MIT License - see [LICENSE](https://github.com/spexop-ui/spexop-tokens/blob/main/LICENSE) for details.

---

<div align="center">

**[@spexop/tokens](https://www.npmjs.com/package/@spexop/tokens)** • Built with TypeScript

[GitHub](https://github.com/spexop-ui/spexop-tokens) • [npm](https://www.npmjs.com/package/@spexop/tokens) • [Issues](https://github.com/spexop-ui/spexop-tokens/issues)

[github]: <https://github.com/olmstedian> | <ccakar@spexop.com> | <https://spexop.com>

</div>
