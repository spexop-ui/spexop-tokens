# Spexop Design System

A professional TypeScript design system with comprehensive design tokens and built-in theming support.

## ✨ Key Features

- **🎨 Design Tokens** - Complete TypeScript-first token system with s-prefix naming convention
- **⚡ React Components** - Fully typed and tree-shakeable
- **🎭 Built-in Themes** - Multiple theme options with dark mode support
- **📦 Icon Library** - Optimized SVG icons with automatic tree-shaking
- **♿ Accessible** - WCAG 2.1 AA compliant components
- **🚀 High Performance** - Optimized bundles and fast rendering
- **💯 TypeScript** - Full type coverage with IntelliSense support
- **📱 Responsive** - Mobile-first design approach

## 🚀 Quick Start

```bash
# Install React components (includes tokens and icons)
npm install @spexop/react

# Or install tokens separately
npm install @spexop/tokens
```

```tsx
import { ThemeProvider, Button, Card, Text } from "@spexop/react";

function App() {
  return (
    <ThemeProvider initialTheme="minimal">
      <Card variant="glass" padding="large">
        <Text size="2xl" weight="bold">
          Welcome to Spexop
        </Text>
        <Button variant="primary" size="large">
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

---

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@spexop/react`](https://github.com/spexop-ui/design-system/tree/main/packages/react) | React component library | ✅ Available |
| [`@spexop/tokens`](https://github.com/spexop-ui/design-system/tree/main/packages/tokens) | Design tokens (colors, spacing, typography, etc.) | ✅ Available |
| [`@spexop/icons`](https://github.com/spexop-ui/design-system/tree/main/packages/icons) | Icon library with tree-shaking | ✅ Available |
| [`@spexop/utils`](https://github.com/spexop-ui/design-system/tree/main/packages/utils) | Utility functions | ✅ Available |
| `@spexop/vue` | Vue 3 adapters | 🚧 In Development |
| `@spexop/angular` | Angular adapters | 🚧 In Development |

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

**Built with ❤️ by the Spexop Team**

[GitHub](https://github.com/spexop-ui) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)

</div>
