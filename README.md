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

## 🆕 What's New in v0.2.1

**@spexop/tokens v0.2.1** - Modern breakpoint updates! 📱

- **Updated breakpoints** for modern displays (Lg: 1280px, Xl: 1920px, 2xl: 2560px)
- **Better tablet support** - Expanded tablet range to 768px-1280px
- **Full HD & 2K support** - Proper breakpoints for 1080p and QHD displays
- **17 responsive tokens updated** - Breakpoints, containers, and media queries

**Previous: v0.2.0** - Major color system expansion! 🎨

- 441 design tokens (up from 393) - 48 new color tokens
- 10 complete color families - Added Purple & Green, expanded all semantic colors
- Interactive documentation - HTML demo, markdown reference, text quick reference

[See full changelog →](https://github.com/spexop-ui/design-system/blob/main/packages/tokens/CHANGELOG.md)

---

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@spexop/react`](https://github.com/spexop-ui/design-system/tree/main/packages/react) | React component library | ✅ Available |
| [`@spexop/tokens`](https://github.com/spexop-ui/design-system/tree/main/packages/tokens) | Design tokens (colors, spacing, typography, etc.) | ✅ Available |
| [`@spexop/utils`](https://github.com/spexop-ui/design-system/tree/main/packages/utils) | Utility functions | ✅ Available |
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

- **[Main Repository](https://github.com/spexop-ui/design-system)** - Source code and documentation
- **[Documentation Site](https://spexop.design)** - Live examples and guides *(coming soon)*
- **[Storybook](https://storybook.spexop.design)** - Interactive component explorer *(coming soon)*
- **[npm Packages](https://www.npmjs.com/org/spexop)** - Published packages

---

## 🤝 Contributing

We welcome contributions! Check out our [Contributing Guidelines](https://github.com/spexop-ui/design-system/blob/main/CONTRIBUTING.md) to get started.

---

## 📄 License

All Spexop packages are released under the [MIT License](https://github.com/spexop-ui/design-system/blob/main/LICENSE).

---

<div align="center">

Built by Cuneyt Cakar (<https://github.com/olmstedian>)

[GitHub](https://github.com/spexop-ui) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)

</div>
