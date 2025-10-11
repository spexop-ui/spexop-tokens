# Spexop Design System

A professional TypeScript design system with comprehensive design tokens and built-in theming support.

## ✨ Key Features

- **🎨 Design Tokens** - Complete TypeScript-first token system with s-prefix naming convention
- **⚡ React Components** - Fully typed and tree-shakeable
- **🎭 Built-in Themes** - Multiple theme options with dark mode support
- **📦 Icon Integration** - Works seamlessly with Lucide Icons
- **♿ Accessible** - WCAG 2.1 AA compliant components
- **🚀 High Performance** - Optimized bundles and fast rendering
- **💯 TypeScript** - Full type coverage with IntelliSense support
- **📱 Responsive** - Mobile-first design approach

## 🚀 Quick Start

```bash
# Install React components (includes tokens)
npm install @spexop/react

# Or install tokens separately
npm install @spexop/tokens

# Recommended: Add Lucide Icons
npm install lucide-react
```

```tsx
import { ThemeProvider, Button, Card, Text } from "@spexop/react";
import { Search, Plus } from "lucide-react";

function App() {
  return (
    <ThemeProvider initialTheme="minimal">
      <Card variant="glass" padding="large">
        <Text size="2xl" weight="bold">
          Welcome to Spexop
        </Text>
        <Button variant="primary" size="large">
          <Search size={20} />
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

---

## 🆕 What's New in v0.2.3

**@spexop/tokens v0.2.3** - Complete token scale! 🎯

- **11 new tokens added** - Spacing, font sizes, and font weights
- **452 total tokens** (up from 441, +2.5%)
- **sSpacing7, sSpacing9** - Fill gaps in spacing scale (28px, 36px)
- **sFontSize6xl (60px), sFontSize7xl (72px)** - Larger headlines for hero sections
- **sFontWeight300-900** - Numbered font weights for flexibility
- **Repository renamed** to spexop-tokens for clarity

**Previous: v0.2.2** - Critical CSS fix + Modern breakpoints! 📱

- Fixed CSS variable naming bug (--s-color-red-500 format)
- Updated breakpoints for modern displays (Lg: 1280px, Xl: 1920px, 2xl: 2560px)
- ⚠️ Skip v0.2.1 (has CSS bug)

[See full changelog →](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/CHANGELOG.md)

---

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@spexop/react`](https://github.com/spexop-ui/spexop-tokens/tree/main/packages/react) | React component library | ✅ Available |
| [`@spexop/tokens`](https://github.com/spexop-ui/spexop-tokens/tree/main/packages/tokens) | Design tokens (colors, spacing, typography, etc.) | ✅ Available |
| [`@spexop/utils`](https://github.com/spexop-ui/spexop-tokens/tree/main/packages/utils) | Utility functions | ✅ Available |
| `@spexop/vue` | Vue 3 adapters | 🚧 In Development |
| `@spexop/angular` | Angular adapters | 🚧 In Development |

### Recommended Icons

We recommend using [**Lucide Icons**](https://lucide.dev/) - a beautiful, consistent open-source icon library that perfectly complements our design system:

- **1000+ icons** - Comprehensive coverage
- **Consistent style** - Stroke-based, matches our minimal theme
- **Framework support** - React, Vue, Angular, Svelte, Vanilla JS
- **ISC License** - Free and open-source
- **Tree-shakeable** - Import only what you need

```bash
npm install lucide-react    # For React
npm install lucide          # For Vanilla JS
npm install lucide-vue-next # For Vue
```

---

## 🎨 Component Categories

**Layout:** Container, Grid, Section  
**UI:** Button, Card, Text, Badge, Alert  
**Forms:** Input, Textarea, Select, Checkbox, Radio, Switch  
**Navigation:** Header, Sidebar, Tabs, PageHeader  
**Advanced:** Hero, FeatureCard, Toast, Skeleton, SettingsPanel  
**Animation:** Motion, FadeIn, SlideIn, ZoomIn, Stagger

---

## 📚 Resources

- **[Main Repository](https://github.com/spexop-ui/spexop-tokens)** - Source code and documentation
- **[Documentation Site](https://spexop.design)** - Live examples and guides *(coming soon)*
- **[Storybook](https://storybook.spexop.design)** - Interactive component explorer *(coming soon)*
- **[npm Packages](https://www.npmjs.com/org/spexop)** - Published packages

---

## 🤝 Contributing

We welcome contributions! Check out our [Contributing Guidelines](https://github.com/spexop-ui/spexop-tokens/blob/main/CONTRIBUTING.md) to get started.

---

## 📄 License

All Spexop packages are released under the [MIT License](https://github.com/spexop-ui/spexop-tokens/blob/main/LICENSE).

---

<div align="center">

Built by Cuneyt Cakar (<https://github.com/olmstedian>)

[GitHub](https://github.com/spexop-ui) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)

</div>
