# ColorPicker

A color selection component with preset colors following "The Spexop Way".

## Features

- Native color picker integration
- Preset color palette
- Hex color input with validation
- Visual color swatch
- Size variants (sm, md, lg)
- Error and validation states
- Custom preset colors
- Custom icons
- Theme-aware styling
- Type-safe with TypeScript

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { ColorPicker } from '@spexop/react';

function App() {
  const [color, setColor] = useState('#ff0000');

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Select color"
    />
  );
}
```

## With Custom Presets

```tsx
const brandColors = [
  '#0066cc', // Primary blue
  '#00cc66', // Success green
  '#ff6600', // Warning orange
  '#cc0000', // Danger red
  '#666666', // Gray
  '#000000', // Black
  '#ffffff', // White
];

<ColorPicker
  value={color}
  onChange={setColor}
  presets={brandColors}
  label="Brand color"
/>
```

## Without Presets

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showPresets={false}
  label="Select color"
/>
```

## Without Hex Input

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showInput={false}
  label="Select color"
/>
```

## Size Variants

```tsx
<ColorPicker size="sm" {...props} />
<ColorPicker size="md" {...props} /> {/* Default */}
<ColorPicker size="lg" {...props} />
```

## With Validation

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  required
  error={!color ? 'Please select a color' : ''}
  helpText="Choose your preferred color"
/>
```

## With Icon

```tsx
import { Icon } from '@spexop/react';
import { Palette } from '@spexop/icons';

<ColorPicker
  value={color}
  onChange={setColor}
  icon={<Icon name="Palette" />}
  label="Select color"
/>
```

## Design Principles Applied

### 1. Primitives before patterns

Built on native HTML5 color input element, enhanced with presets and hex input.

### 2. Borders before shadows

Uses clean 2px borders for swatches and inputs, minimal shadow for depth.

### 3. Typography before decoration

Font weight (semibold) for labels. Monospace font for hex values.

### 4. Tokens before magic numbers

All spacing, colors, and sizing use design tokens from `@spexop/theme`.

### 5. Composition before complexity

Simple color input combined with preset palette. No over-engineering.

### 6. Standards before frameworks

Native color input API for cross-browser compatibility.

### 7. Accessibility before aesthetics

- Full keyboard navigation
- Focus management and visible focus indicators
- Screen reader support with ARIA labels
- Required field indicator
- High contrast mode support

## Keyboard Navigation

- **Enter/Space**: Open native color picker
- **Tab**: Navigate between elements
- **Arrow Keys**: Navigate preset colors
- **Type**: Enter hex value directly

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current selected color in hex format (required) |
| `onChange` | `(color: string) => void` | - | Change handler (required) |
| `label` | `string` | - | Label for the color picker |
| `disabled` | `boolean` | `false` | Whether color picker is disabled |
| `required` | `boolean` | `false` | Whether field is required |
| `error` | `string` | - | Error message to display |
| `helpText` | `string` | - | Help text below color picker |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id attribute |
| `showPresets` | `boolean` | `true` | Show preset colors |
| `presets` | `string[]` | [16 default colors] | Preset color palette |
| `showAlpha` | `boolean` | `false` | Show alpha channel (future feature) |
| `showInput` | `boolean` | `true` | Show hex input field |
| `format` | `"hex" \| "rgb" \| "hsl"` | `"hex"` | Color format (future feature) |
| `icon` | `ReactNode` | - | Custom icon |

## Default Presets

The component includes 16 default preset colors:

```typescript
const DEFAULT_PRESETS = [
  '#000000', // Black
  '#ffffff', // White
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff8800', // Orange
  '#8800ff', // Purple
  '#00ff88', // Mint
  '#ff0088', // Pink
  '#888888', // Gray
  '#444444', // Dark Gray
  '#cccccc', // Light Gray
  '#aaaaaa', // Medium Gray
];
```

## Color Format

Colors are always returned in lowercase hex format:

```typescript
// Example values
'#ff0000'  // Red
'#00ff00'  // Green
'#0000ff'  // Blue
'#ffffff'  // White
'#000000'  // Black
```

## Examples

### Theme Color Selector

```tsx
const themeColors = [
  '#1a73e8', // Blue
  '#34a853', // Green
  '#fbbc04', // Yellow
  '#ea4335', // Red
  '#673ab7', // Purple
  '#ff6d00', // Deep Orange
];

<ColorPicker
  value={themeColor}
  onChange={setThemeColor}
  presets={themeColors}
  label="Theme color"
  helpText="Choose your theme color"
/>
```

### Brand Color Picker

```tsx
const brandPalette = [
  '#0066cc', // Primary
  '#004d99', // Primary Dark
  '#3399ff', // Primary Light
  '#00cc66', // Success
  '#ff6600', // Warning
  '#cc0000', // Danger
];

<ColorPicker
  value={brandColor}
  onChange={setBrandColor}
  presets={brandPalette}
  label="Brand color"
  required
  error={!brandColor ? 'Brand color is required' : ''}
/>
```

### Simple Color Input

```tsx
<ColorPicker
  value={backgroundColor}
  onChange={setBackgroundColor}
  showPresets={false}
  size="sm"
  label="Background"
/>
```

### Minimal Color Picker

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showPresets={false}
  showInput={false}
  size="sm"
/>
```

## Browser Support

- Chrome/Edge: Latest 2 versions (native color input)
- Firefox: Latest 2 versions (native color input)
- Safari: Latest 2 versions (native color input)
- Mobile browsers: iOS Safari 14+, Chrome Android

Note: The native color picker appearance varies by browser. Preset colors provide a consistent cross-browser experience.

## Accessibility Features

- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Screen reader tested with VoiceOver and NVDA
- High contrast mode support
- Reduced motion support
- Focus visible indicators
- Error announcements via `role="alert"`
- Color name announced for screen readers

## Related Components

- **TextInput** - Basic text input
- **Combobox** - Searchable select

## Future Features

- Alpha channel support (`showAlpha` prop)
- RGB and HSL color formats (`format` prop)
- Custom color picker interface (beyond native)
- Color history
- Gradient picker

## License

MIT License - Part of the Spexop Design System
