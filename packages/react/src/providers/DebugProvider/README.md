# DebugProvider

**Visual debugging system for Spexop Design System components.**

Border-based visualization of component boundaries, breakpoints, and layout structure.

---

## Features

✅ **Breakpoint Indicator** - Visual overlay showing current responsive breakpoint  
✅ **Component Boundaries** - Color-coded outlines for Grid, Stack, Container, GridItem  
✅ **Token Display** - Show design token values on hover  
✅ **Hierarchy Visualization** - See nesting depth of components  
✅ **LocalStorage Persistence** - Remembers debug state across sessions  
✅ **Keyboard Shortcut** - Toggle with Ctrl+Shift+D (or Cmd+Shift+D on Mac)  
✅ **Screen Reader Support** - ARIA live regions for accessibility  
✅ **SSR-Safe** - Works with Next.js, Remix, etc.  
✅ **Zero Performance Impact** - Only active when enabled

---

## Quick Start

### Basic Usage

```tsx
import { DebugProvider } from '@spexop/react';

function App() {
  return (
    <DebugProvider initialEnabled={false}>
      <YourApp />
    </DebugProvider>
  );
}
```

### Enable by Default (Development)

```tsx
import { DebugProvider } from '@spexop/react';

function App() {
  return (
    <DebugProvider 
      initialEnabled={process.env.NODE_ENV === 'development'}
    >
      <YourApp />
    </DebugProvider>
  );
}
```

### Custom Options

```tsx
import { DebugProvider } from '@spexop/react';

function App() {
  return (
    <DebugProvider
      initialEnabled={false}
      defaultOptions={{
        showBreakpoint: true,
        showBoundaries: true,
        showTokens: false,
        showHierarchy: true,
      }}
      storageKey="my-app-debug-mode"
    >
      <YourApp />
    </DebugProvider>
  );
}
```

---

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Child components to wrap |
| `initialEnabled` | `boolean` | `false` | Initial debug state |
| `defaultOptions` | `DebugOptions` | see below | Default debug options |
| `storageKey` | `string` | `"spexop-debug-mode"` | localStorage key for persistence |
| `disableStorage` | `boolean` | `false` | Disable localStorage persistence |

#### Default Options

```tsx
{
  showBreakpoint: true,    // Show breakpoint indicator
  showTokens: true,        // Show token values
  showBoundaries: true,    // Show component outlines
  showHierarchy: true,     // Show nesting depth
  showSpacing: false,      // Show spacing visualization
  showAccessibility: false, // Highlight a11y issues
  showPerformance: false   // Show render counts
}
```

### Hook: `useDebug()`

Access debug context in any component.

```tsx
import { useDebug } from '@spexop/react';

function DebugControls() {
  const { 
    enabled,           // Current debug state
    toggle,            // Toggle debug mode
    setEnabled,        // Set debug state
    updateOptions,     // Update debug options
    showBreakpoint,    // Individual option flags
    showBoundaries,
    showTokens,
    showHierarchy
  } = useDebug();

  return (
    <button onClick={toggle}>
      Debug: {enabled ? 'ON' : 'OFF'}
    </button>
  );
}
```

---

## Usage Examples

### Basic Debug Toggle

```tsx
import { DebugProvider, useDebug } from '@spexop/react';

function DebugToggle() {
  const { enabled, toggle } = useDebug();

  return (
    <button onClick={toggle}>
      {enabled ? '🐛 Debug ON' : '🐛 Debug OFF'}
    </button>
  );
}

function App() {
  return (
    <DebugProvider>
      <DebugToggle />
      <YourApp />
    </DebugProvider>
  );
}
```

### Advanced Debug Panel

```tsx
import { DebugProvider, useDebug } from '@spexop/react';

function DebugPanel() {
  const { enabled, toggle, updateOptions, ...options } = useDebug();

  if (!enabled) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 16, 
      left: 16, 
      background: 'white',
      border: '2px solid black',
      padding: 16,
      zIndex: 10000 
    }}>
      <h3>Debug Controls</h3>
      <button onClick={toggle}>Close Debug Mode</button>
      
      <label>
        <input
          type="checkbox"
          checked={options.showBreakpoint}
          onChange={(e) => updateOptions({ showBreakpoint: e.target.checked })}
        />
        Show Breakpoint
      </label>

      <label>
        <input
          type="checkbox"
          checked={options.showBoundaries}
          onChange={(e) => updateOptions({ showBoundaries: e.target.checked })}
        />
        Show Boundaries
      </label>

      <label>
        <input
          type="checkbox"
          checked={options.showTokens}
          onChange={(e) => updateOptions({ showTokens: e.target.checked })}
        />
        Show Tokens
      </label>
    </div>
  );
}

function App() {
  return (
    <DebugProvider initialEnabled={true}>
      <DebugPanel />
      <YourApp />
    </DebugProvider>
  );
}
```

### Development-Only Debug Mode

```tsx
import { DebugProvider } from '@spexop/react';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <DebugProvider 
      initialEnabled={isDevelopment}
      disableStorage={!isDevelopment}
    >
      <YourApp />
    </DebugProvider>
  );
}
```

### Testing with Debug Mode

```tsx
import { render } from '@testing-library/react';
import { DebugProvider } from '@spexop/react';

test('component renders correctly', () => {
  render(
    <DebugProvider initialEnabled={true} disableStorage={true}>
      <MyComponent />
    </DebugProvider>
  );
  
  // Component boundaries will be visible in test
});
```

---

## Keyboard Shortcut

**Ctrl+Shift+D** (Windows/Linux)

**Cmd+Shift+D** (Mac)

Toggles debug mode on/off from anywhere in your app.

---

## Component Boundary Colors

When `showBoundaries` is enabled:

- **Container** - Blue outline (`#3b82f6`)
- **Grid** - Green outline (`#10b981`)
- **GridItem** - Purple outline (`#8b5cf6`)
- **Stack** - Orange outline (`#f59e0b`)

### Dark Mode

Colors automatically adjust for better visibility in dark themes.

---

## Breakpoint Indicator

Visual overlay in top-right corner showing current breakpoint:

| Breakpoint | Color | Width |
|------------|-------|-------|
| **xs** | Red | < 480px |
| **sm** | Orange | 480-768px |
| **md** | Green | 768-1024px |
| **lg** | Blue | 1024-1440px |
| **xl** | Purple | 1440-1920px |
| **2xl** | Pink | > 1920px |

---

## How It Works

### Visual Boundaries

When debug mode is enabled and `showBoundaries: true`:

1. DebugProvider adds `data-debug` attributes to primitive components
2. CSS outlines are applied based on component type
3. Outlines use `outline-offset: -2px` to stay inside boundaries
4. Colors follow "Borders before shadows" principle

### Breakpoint Detection

Uses the `useBreakpoint()` hook to detect current viewport size:

```tsx
const { current } = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

### LocalStorage Persistence

Debug state is saved to localStorage:

```json
{
  "spexop-debug-mode": "true"
}
```

Persists across page reloads and browser sessions.

---

## Accessibility

### Screen Reader Support

- Breakpoint indicator has `role="status"` and `aria-live="polite"`
- Debug state changes announced with `aria-live="assertive"`
- Visual indicators use `aria-hidden="true"` to avoid noise

### Keyboard Navigation

- Full keyboard support via Ctrl+Shift+D shortcut
- Does not interfere with component keyboard navigation
- Focus management preserved

### ARIA Attributes

```tsx
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  aria-label="Debug mode active. Current breakpoint: md"
>
  {/* Breakpoint indicator */}
</div>

<div 
  className="sr-only" 
  aria-live="assertive"
>
  Debug mode enabled. Current breakpoint: md.
</div>
```

---

## Performance

### Zero-Cost When Disabled

When `enabled: false`:

- No visual elements rendered
- No additional CSS loaded
- Minimal memory footprint

### Minimal Impact When Enabled

- Uses CSS outlines (no layout shifts)
- `pointer-events: none` on overlays
- Memoized context value prevents re-renders
- SSR-safe initialization

---

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Uses 2px solid outlines, not shadows
2. **Typography before decoration** - Clear monospace labels
3. **Tokens before magic numbers** - All values use theme tokens
4. **Accessibility before aesthetics** - Screen reader support first
5. **Standards before frameworks** - Native CSS and HTML

---

## Common Patterns

### Debug-Aware Components

```tsx
import { useDebug } from '@spexop/react';

function MyComponent() {
  const { enabled } = useDebug();

  return (
    <div data-debug={enabled ? 'custom' : undefined}>
      {enabled && <span>Debug Info Here</span>}
    </div>
  );
}
```

### Conditional Debug Panels

```tsx
import { useDebug } from '@spexop/react';

function DevTools() {
  const { enabled } = useDebug();

  if (!enabled) return null;

  return (
    <div className="dev-tools">
      <h2>Developer Tools</h2>
      {/* Your debug tools */}
    </div>
  );
}
```

### Debug Logging

```tsx
import { useDebug } from '@spexop/react';
import { useEffect } from 'react';

function MyComponent() {
  const { enabled } = useDebug();

  useEffect(() => {
    if (enabled) {
      console.log('[Debug] Component mounted');
    }
  }, [enabled]);

  return <div>Content</div>;
}
```

---

## FAQ

### Does debug mode work in production?

Yes, but it's recommended to disable in production:

```tsx
<DebugProvider initialEnabled={process.env.NODE_ENV === 'development'}>
```

### Can I customize the boundary colors?

Currently, colors are fixed. Future versions may support custom color schemes.

### Does this work with other design systems?

DebugProvider is designed for Spexop components but the `enabled` flag can be used with any components.

### What's the performance impact?

Minimal. When disabled, zero impact. When enabled, only CSS outlines are added (no layout recalculation).

### Can I use this in tests?

Yes! Enable debug mode in tests to see component boundaries:

```tsx
<DebugProvider initialEnabled={true} disableStorage={true}>
```

### Does this work with SSR?

Yes! SSR-safe with proper guards for `window` and `localStorage`.

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

---

## Related

- **UnifiedThemeProvider** - Theme system provider
- **useBreakpoint** - Breakpoint detection hook
- **Grid, Stack, Container** - Layout primitives that show boundaries

---

## Best Practices

1. **Enable in development** - Use `process.env.NODE_ENV` check
2. **Disable storage in tests** - Set `disableStorage={true}` for consistent test behavior
3. **Use keyboard shortcut** - Fastest way to toggle debug mode
4. **Combine with DevTools** - Use React DevTools alongside DebugProvider
5. **Educate your team** - Document the keyboard shortcut in your README

---

## Troubleshooting

### Boundaries not showing

1. Check if `showBoundaries: true` in options
2. Verify debug mode is enabled (`enabled: true`)
3. Ensure components have `data-debug` attributes

### LocalStorage not persisting

1. Check browser privacy settings (some browsers block localStorage)
2. Verify `disableStorage` is not `true`
3. Check for localStorage quota errors

### Keyboard shortcut not working

1. Check for conflicting browser/OS shortcuts
2. Ensure DebugProvider is mounted
3. Try clicking in the page first (focus issue)

---

## Migration

### From Previous Debug Systems

If you had custom debug tooling:

```tsx
// ❌ Old way
const [debug, setDebug] = useState(false);

// ✅ New way
<DebugProvider initialEnabled={false}>
  {/* Use useDebug() hook in components */}
</DebugProvider>
```

---

**Last Updated**: October 21, 2025
**Version**: 0.3.0
**Package**: @spexop/react
