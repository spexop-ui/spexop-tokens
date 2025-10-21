# Slider Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible range slider component for selecting numeric values. Features value display, step control, min/max bounds, and full keyboard support.

## Features

- ✅ Horizontal range slider
- ✅ Min/max value bounds
- ✅ Step control
- ✅ Value display with formatting
- ✅ Label and helper text
- ✅ Disabled state
- ✅ Keyboard navigation (Arrow keys)
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Slider } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState(50);
  
  return (
    <Slider
      label="Volume"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      showValue={true}
    />
  );
}
```

## Basic Usage

### Simple Slider

```tsx
<Slider
  label="Brightness"
  value={brightness}
  onChange={setBrightness}
  min={0}
  max={100}
/>
```

### With Value Display

```tsx
<Slider
  label="Volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  showValue={true}
/>
```

### Custom Format

```tsx
<Slider
  label="Price Range"
  value={price}
  onChange={setPrice}
  min={0}
  max={1000}
  step={10}
  showValue={true}
  formatValue={(val) => `$${val}`}
/>
```

### With Steps

```tsx
<Slider
  label="Rating"
  value={rating}
  onChange={setRating}
  min={0}
  max={5}
  step={0.5}
  showValue={true}
  formatValue={(val) => `${val} stars`}
/>
```

## Common Patterns

### Volume Control

```tsx
function VolumeControl() {
  const [volume, setVolume] = useState(75);

  return (
    <Slider
      label="Volume"
      value={volume}
      onChange={setVolume}
      min={0}
      max={100}
      step={1}
      showValue={true}
      formatValue={(val) => `${val}%`}
      aria-label="Adjust volume level"
    />
  );
}
```

### Price Range Filter

```tsx
function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <Stack direction="vertical" gap={4}>
      <Slider
        label="Minimum Price"
        value={minPrice}
        onChange={setMinPrice}
        min={0}
        max={maxPrice}
        step={10}
        showValue={true}
        formatValue={(val) => `$${val}`}
      />
      
      <Slider
        label="Maximum Price"
        value={maxPrice}
        onChange={setMaxPrice}
        min={minPrice}
        max={2000}
        step={10}
        showValue={true}
        formatValue={(val) => `$${val}`}
      />
    </Stack>
  );
}
```

### Settings Panel

```tsx
function DisplaySettings() {
  const [brightness, setBrightness] = useState(80);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(100);

  return (
    <Stack direction="vertical" gap={5}>
      <Slider
        label="Brightness"
        value={brightness}
        onChange={setBrightness}
        min={0}
        max={100}
        showValue={true}
        formatValue={(val) => `${val}%`}
      />
      
      <Slider
        label="Contrast"
        value={contrast}
        onChange={setContrast}
        min={0}
        max={100}
        showValue={true}
        formatValue={(val) => `${val}%`}
      />
      
      <Slider
        label="Saturation"
        value={saturation}
        onChange={setSaturation}
        min={0}
        max={200}
        showValue={true}
        formatValue={(val) => `${val}%`}
      />
    </Stack>
  );
}
```

### Text Zoom

```tsx
function TextZoomControl() {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}%`;
  }, [zoom]);

  return (
    <Slider
      label="Text Size"
      value={zoom}
      onChange={setZoom}
      min={100}
      max={200}
      step={10}
      showValue={true}
      formatValue={(val) => `${val}%`}
      helperText="WCAG 2.2 AA requires support up to 200%"
    />
  );
}
```

### Rating Selector

```tsx
function RatingSelector() {
  const [rating, setRating] = useState(3);

  return (
    <Slider
      label="Rate this product"
      value={rating}
      onChange={setRating}
      min={1}
      max={5}
      step={1}
      showValue={true}
      formatValue={(val) => '⭐'.repeat(val)}
    />
  );
}
```

## Props

```typescript
interface SliderProps {
  /** Current value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Show current value */
  showValue?: boolean;
  /** Format value display */
  formatValue?: (value: number) => string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Element ID */
  id?: string;
  /** Input name */
  name?: string;
  /** ARIA label */
  "aria-label"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean track and thumb design
2. **Typography before decoration** - Clear value display
3. **Tokens before magic numbers** - Uses spacing and color tokens
4. **Accessibility before aesthetics** - Full keyboard support

## Accessibility

- ✅ Semantic HTML (`<input type="range">`)
- ✅ Proper label association
- ✅ Keyboard navigation (Arrow keys, Home, End, Page Up/Down)
- ✅ Screen reader support with value announcements
- ✅ Focus indicators
- ✅ ARIA attributes for current value
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Right/Up` - Increase value by step
- `Arrow Left/Down` - Decrease value by step
- `Home` - Jump to minimum value
- `End` - Jump to maximum value
- `Page Up` - Increase by larger increment
- `Page Down` - Decrease by larger increment

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TextInput` - Text entry
- `Select` - Dropdown selection
- `Toggle` - Binary on/off
- `RadioGroup` - Discrete options

## Best Practices

1. **Show current value** - Use `showValue` for clarity
2. **Use appropriate steps** - Match precision to use case
3. **Format values** - Make units clear (%, px, $)
4. **Provide labels** - Always include label for context
5. **Set reasonable bounds** - min/max should make sense

## License

MIT
