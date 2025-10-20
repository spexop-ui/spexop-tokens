# Getting Started with Spexop

## Installation

```bash
# Install both packages
npm install @spexop/react @spexop/theme

# Or with pnpm
pnpm add @spexop/react @spexop/theme
```

## Usage Options

### Option 1: Pre-built CSS (Easiest)

Import a ready-made theme:

```typescript
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import { Button, Grid, Card } from '@spexop/react';

// Components automatically use the tech theme
```

Available themes: default, tech, startup, healthcare, finance, ecommerce, education, corporate, agency, minimal, dark, pastel, vibrant

### Option 2: ThemeProvider (Flexible)

Use React context for dynamic theme switching:

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Option 3: Custom Theme (Full Control)

Create your own theme:

```typescript
import { ThemeProvider } from '@spexop/react';
import type { SpexopThemeConfig } from '@spexop/theme';

const myTheme: SpexopThemeConfig = {
  meta: { name: "My Brand", version: "1.0.0" },
  colors: {
    primary: "#your-color",
    secondary: "#your-color",
    accent: "#your-color",
    // ... other colors
  },
};

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

## Framework Integration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### Next.js

```typescript
// app/layout.tsx or pages/_app.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Create React App

```typescript
// index.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import App from './App';
```

## Next Steps

- Explore [Examples](../examples/)
- Read [Theme System Guide](../packages/theme/README.md)
- Browse [Component Docs](../packages/react/README.md)
- Try [Theme Builder](https://builder.spexop.com)
