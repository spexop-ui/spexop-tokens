# UnifiedThemeProvider

**The all-in-one theme provider for Spexop Design System.**

Combines light/dark mode switching AND full theme configuration in a single provider.

---

## Features

✅ **Simple Mode Switching** - Light/dark/auto themes  
✅ **Full Theme Configuration** - Complete brand customization  
✅ **Multi-Theme Support** - Switch between multiple theme configs  
✅ **System Preference Detection** - Respects `prefers-color-scheme`  
✅ **LocalStorage Persistence** - Remembers user preference  
✅ **SSR-Safe** - Works with Next.js, Remix, etc.  
✅ **Zero FOUC** - No flash of unstyled content  
✅ **Reduced Motion Support** - Respects `prefers-reduced-motion`

---

## Quick Start

### Simple Light/Dark Mode

```tsx
import { ThemeProvider } from '@spexop/react';

function App() {
  return (
    <ThemeProvider mode="auto">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Full Theme Configuration

```tsx
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Combined: Mode + Theme

```tsx
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider mode="auto" theme={techPreset}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Multi-Theme with Mode Switching

```tsx
import { ThemeProvider } from '@spexop/react';
import { lightTheme, darkTheme } from './themes';

function App() {
  return (
    <ThemeProvider 
      themes={[lightTheme, darkTheme]} 
      mode="auto"
      defaultTheme="light"
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Child components to be themed |
| **Mode Props** ||||
| `mode` | `"light" \| "dark" \| "auto"` | - | Controlled mode (overrides internal state) |
| `defaultMode` | `"light" \| "dark" \| "auto"` | `"auto"` | Initial mode on first load |
| `disableSystemMode` | `boolean` | `false` | Ignore system preference |
| **Theme Config Props** ||||
| `theme` | `SpexopThemeConfig` | - | Single theme configuration |
| `themes` | `SpexopThemeConfig[]` | - | Multiple themes for switching |
| `defaultTheme` | `string` | - | Default theme name (from themes array) |
| `scope` | `string` | `":root"` | CSS selector for scoping variables |
| **Storage Props** ||||
| `storageKey` | `string` | `"spexop-theme-mode"` | localStorage key for mode |
| `disableStorage` | `boolean` | `false` | Disable localStorage persistence |
| **Override Props** ||||
| `forcedMode` | `"light" \| "dark"` | - | Force specific mode (for testing) |

### Hook: `useTheme()`

Access theme context in any component.

```tsx
import { useTheme } from '@spexop/react';

function ThemeSwitcher() {
  const { 
    mode,              // Current mode setting
    resolvedMode,      // Actual applied mode
    systemMode,        // System preference
    setMode,           // Change mode
    currentTheme,      // Active theme config
    setTheme,          // Change theme (if multi-theme)
    availableThemes,   // All available themes
    isInitializing,    // Loading state
    prefersReducedMotion // User motion preference
  } = useTheme();

  return (
    <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Current: {resolvedMode}
    </button>
  );
}
```

---

## Usage Examples

### Basic Theme Toggle

```tsx
import { ThemeProvider, useTheme } from '@spexop/react';
import { Moon, Sun } from '@spexop/icons';

function ThemeToggle() {
  const { resolvedMode, setMode } = useTheme();
  const isDark = resolvedMode === 'dark';

  return (
    <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}
```

### Multi-Theme Switcher

```tsx
import { ThemeProvider, useTheme } from '@spexop/react';
import { techPreset, agencyPreset, financePreset } from '@spexop/theme';

function ThemePicker() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <select 
      value={currentTheme?.meta.name} 
      onChange={(e) => {
        const theme = availableThemes.find(t => t.meta.name === e.target.value);
        if (theme && setTheme) setTheme(theme);
      }}
    >
      {availableThemes.map(theme => (
        <option key={theme.meta.name} value={theme.meta.name}>
          {theme.meta.name}
        </option>
      ))}
    </select>
  );
}

function App() {
  return (
    <ThemeProvider themes={[techPreset, agencyPreset, financePreset]}>
      <ThemePicker />
      <YourApp />
    </ThemeProvider>
  );
}
```

### SSR with Next.js

```tsx
// app/layout.tsx
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider theme={techPreset} mode="auto">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Testing with Forced Mode

```tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@spexop/react';

test('component renders in dark mode', () => {
  render(
    <ThemeProvider forcedMode="dark">
      <MyComponent />
    </ThemeProvider>
  );
  
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
```

---

## Migration from Old Providers

### From Old Light/Dark Provider

```tsx
// ❌ Old way
import { ThemeProvider } from '@spexop/react/providers/ThemeProvider';

<ThemeProvider defaultTheme="auto">
  <App />
</ThemeProvider>

// ✅ New way (same API!)
import { ThemeProvider } from '@spexop/react';

<ThemeProvider mode="auto">
  <App />
</ThemeProvider>
```

### From Old Theme Config Provider

```tsx
// ❌ Old way
import { ThemeProvider } from '@spexop/react/theme';
import { techPreset } from '@spexop/theme';

<ThemeProvider theme={techPreset}>
  <App />
</ThemeProvider>

// ✅ New way (identical!)
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

<ThemeProvider theme={techPreset}>
  <App />
</ThemeProvider>
```

**Note**: The old providers have been removed in favor of this unified solution.

---

## How It Works

### Mode Management

1. **Auto Mode** (default)
   - Detects system preference via `prefers-color-scheme`
   - Automatically switches when system preference changes
   - Persists user selection if they manually override

2. **Manual Mode**
   - User explicitly chooses light or dark
   - Persists to localStorage
   - Ignores system changes

3. **Controlled Mode**
   - Parent controls the mode via prop
   - No localStorage (parent manages state)

### Theme Configuration

1. **No Theme** (mode only)
   - Just sets `data-theme="light|dark"` on `<html>`
   - Components use default styling

2. **Single Theme**
   - Generates CSS variables from theme config
   - Injects into document `<head>`
   - Updates when theme changes

3. **Multi-Theme**
   - Generates CSS from currently selected theme
   - Allows runtime theme switching
   - Can combine with mode switching

### CSS Variable Injection

When you provide a theme config, the provider:

1. Calls `generateCSS(theme, scope)` from `@spexop/theme`
2. Creates a `<style>` element with `data-spexop-theme` attribute
3. Injects CSS variables like:

   ```css
   :root {
     --theme-primary: #ef4444;
     --theme-text: #171717;
     --theme-spacing-4: 16px;
     /* ... all theme tokens */
   }
   ```

4. Components consume these variables in their CSS

### Priority Order

CSS variable resolution follows this order:

1. Theme config (highest priority)
2. Compatibility bridge (`--s-*` → `--theme-*` mapping)
3. Component fallbacks (hardcoded defaults)

---

## TypeScript Support

Full type safety with autocomplete:

```tsx
import type { 
  ThemeMode, 
  ResolvedThemeMode, 
  UnifiedThemeContextValue 
} from '@spexop/react';

const mode: ThemeMode = 'auto'; // ✅ Type-safe
const resolved: ResolvedThemeMode = 'light'; // ✅ No 'auto' allowed

const context: UnifiedThemeContextValue = useTheme(); // ✅ Fully typed
```

---

## FAQ

### Do I need both mode AND theme?

**No.** Use whichever you need:

- Just `mode` → Simple light/dark switching
- Just `theme` → Full brand customization (defaults to light mode)
- Both → Complete control over appearance

### Can I use this with Tailwind/Styled Components?

**Yes.** The provider just injects CSS variables. Use them however you like:

```tsx
// Tailwind
<div className="bg-[var(--theme-primary)]">...</div>

// Styled Components
const Button = styled.button`
  background: var(--theme-primary);
`;

// Inline styles
<div style={{ background: 'var(--theme-primary)' }}>...</div>
```

### Does this work with React 19?

**Yes.** Supports React 18.x and 19.x (including RC versions).

### What's the bundle size impact?

- **Mode only**: ~2KB gzipped
- **With theme config**: ~2KB + theme package (~8KB gzipped)

### Can I scope themes to specific parts of my app?

**Yes.** Use the `scope` prop:

```tsx
<ThemeProvider theme={adminTheme} scope=".admin-section">
  <AdminPanel />
</ThemeProvider>

<ThemeProvider theme={publicTheme} scope=".public-section">
  <PublicSite />
</ThemeProvider>
```

---

## Best Practices

1. **Wrap at root level** - Place provider as high as possible in component tree
2. **Use `mode="auto"` by default** - Respect user's system preference
3. **Persist mode, not theme** - Let users switch mode, not entire themes
4. **Provide fallbacks** - Always include fallback values in CSS variables
5. **Test both modes** - Ensure components work in light and dark

---

## Related

- **Theme System**: `@spexop/theme` package
- **Theme Builder**: <https://builder.spexop.com>
- **Components**: All components consume theme variables
- **Documentation**: `/docs/theme-system/`

---

**Last Updated**: October 18, 2025  
**Version**: 0.3.0  
**Package**: @spexop/react
