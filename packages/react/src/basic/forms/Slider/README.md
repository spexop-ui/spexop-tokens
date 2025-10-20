# Slider

Range slider component for selecting numeric values. Features smooth animations, keyboard navigation, and value display. Perfect for settings, filters, and adjustments.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Slider } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Slider } from '@spexop/react';

function MyComponent() {
  const [volume, setVolume] = useState(50);
  
  return (
    <Slider
      value={volume}
      onChange={setVolume}
      min={0}
      max={100}
      aria-label="Volume control"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **Required** | Current slider value |
| `onChange` | `(value: number) => void` | **Required** | Change handler callback |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step size for increments |
| `disabled` | `boolean` | `false` | Disable the slider |
| `showValue` | `boolean` | `false` | Display current value |
| `formatValue` | `(value: number) => string` | `undefined` | Custom value formatter |
| `density` | `"compact"` \| `"normal"` \| `"spacious"` | `"normal"` | Spacing density |
| `className` | `string` | `""` | Additional CSS class |
| `id` | `string` | auto-generated | HTML id attribute |
| `aria-label` | `string` | `undefined` | ARIA label (required if no label element) |
| `aria-labelledby` | `string` | `undefined` | ARIA labelledby reference |

## Examples

### Basic Slider

```tsx
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  aria-label="Percentage slider"
/>
```

### With Label

```tsx
<div>
  <label htmlFor="brightness-slider" style={{ display: 'block', marginBottom: '8px' }}>
    Brightness
  </label>
  <Slider
    id="brightness-slider"
    value={brightness}
    onChange={setBrightness}
    min={0}
    max={100}
  />
</div>
```

### Show Current Value

```tsx
<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  showValue={true}
  aria-label="Volume"
/>
```

### Custom Value Format

```tsx
<Slider
  value={price}
  onChange={setPrice}
  min={0}
  max={1000}
  step={10}
  showValue={true}
  formatValue={(val) => `$${val}`}
  aria-label="Price range"
/>
```

### Custom Range and Step

```tsx
// Temperature slider (0-30°C, 0.5° steps)
<Slider
  value={temperature}
  onChange={setTemperature}
  min={0}
  max={30}
  step={0.5}
  showValue={true}
  formatValue={(val) => `${val}°C`}
  aria-label="Temperature"
/>

// Percentage (0-100%, 5% steps)
<Slider
  value={opacity}
  onChange={setOpacity}
  min={0}
  max={100}
  step={5}
  showValue={true}
  formatValue={(val) => `${val}%`}
  aria-label="Opacity"
/>
```

### Disabled State

```tsx
<Slider
  value={value}
  onChange={setValue}
  disabled={true}
  aria-label="Disabled slider"
/>
```

### Density Variants

```tsx
// Compact - for dashboards
<Slider
  value={value}
  onChange={setValue}
  density="compact"
  aria-label="Compact slider"
/>

// Normal - default
<Slider
  value={value}
  onChange={setValue}
  density="normal"
  aria-label="Normal slider"
/>

// Spacious - for content pages
<Slider
  value={value}
  onChange={setValue}
  density="spacious"
  aria-label="Spacious slider"
/>
```

### Settings Panel

```tsx
import { Stack, Slider } from '@spexop/react';

function AudioSettings() {
  const [volume, setVolume] = useState(75);
  const [bass, setBass] = useState(50);
  const [treble, setTreble] = useState(50);
  
  return (
    <Stack direction="vertical" gap={6}>
      <div>
        <label htmlFor="volume">Volume: {volume}%</label>
        <Slider
          id="volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
        />
      </div>
      
      <div>
        <label htmlFor="bass">Bass: {bass - 50}</label>
        <Slider
          id="bass"
          value={bass}
          onChange={setBass}
          min={0}
          max={100}
        />
      </div>
      
      <div>
        <label htmlFor="treble">Treble: {treble - 50}</label>
        <Slider
          id="treble"
          value={treble}
          onChange={setTreble}
          min={0}
          max={100}
        />
      </div>
    </Stack>
  );
}
```

### Filter Controls

```tsx
function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  
  return (
    <Stack direction="vertical" gap={4}>
      <div>
        <label>Min Price: ${minPrice}</label>
        <Slider
          value={minPrice}
          onChange={setMinPrice}
          min={0}
          max={maxPrice}
          step={10}
        />
      </div>
      
      <div>
        <label>Max Price: ${maxPrice}</label>
        <Slider
          value={maxPrice}
          onChange={setMaxPrice}
          min={minPrice}
          max={1000}
          step={10}
        />
      </div>
    </Stack>
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Arrow Left** | Decrease value by step |
| **Arrow Right** | Increase value by step |
| **Arrow Down** | Decrease value by step |
| **Arrow Up** | Increase value by step |
| **Home** | Jump to minimum value |
| **End** | Jump to maximum value |
| **Page Up** | Increase by 10× step |
| **Page Down** | Decrease by 10× step |

## Accessibility

### ARIA Attributes

- `role="slider"` - Identifies slider behavior
- `aria-valuenow` - Current value
- `aria-valuemin` - Minimum value
- `aria-valuemax` - Maximum value
- `aria-label` or `aria-labelledby` - Label (required)
- `aria-disabled` - Disabled state

### Focus Management

- ✅ Focus visible on keyboard navigation
- ✅ Smooth focus outline
- ✅ Keyboard control fully functional
- ✅ Disabled sliders skip focus

### Screen Readers

- Announces current value
- Announces min/max range
- Announces when value changes
- Announces when disabled

### Requirements

**Always provide** one of:

- `aria-label` prop
- Associated `<label>` element with matching `id` or `aria-labelledby`

```tsx
// Option 1: aria-label
<Slider aria-label="Volume control" {...props} />

// Option 2: label element (preferred)
<label htmlFor="volume">Volume</label>
<Slider id="volume" {...props} />
```

## Styling

### Custom Styling

```tsx
<Slider
  className="my-slider"
  value={value}
  onChange={setValue}
/>
```

```css
.my-slider {
  max-width: 300px;
}
```

### Design Tokens

Uses tokens for consistent styling:

- Colors: `--s-color-neutral-*`, `--s-color-red-500`
- Spacing: `--s-spacing-*`
- Border radius: `--s-radius-full`
- Transitions: `--s-transition-base`

## Integration with Forms

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Slider } from '@spexop/react';

function Form() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Slider
            value={field.value}
            onChange={field.onChange}
            min={1}
            max={10}
            aria-label="Rating"
          />
        )}
      />
    </form>
  );
}
```

## When to Use

### Use Slider When ✅

- Selecting numeric values
- Adjusting settings (volume, brightness, etc.)
- Range/filter controls
- Visual feedback needed
- Value can vary continuously

### Use TextInput Instead When

- Precise numeric input needed
- Users know exact value
- Value can be very large/small
- Keyboard entry preferred

### Use Select Instead When

- Discrete values only (e.g., Small/Medium/Large)
- Predefined options
- Options have labels

## Best Practices

### Do ✅

```tsx
// Provide clear labels
<label htmlFor="volume">Volume</label>
<Slider id="volume" {...props} />

// Show current value for clarity
<Slider showValue={true} {...props} />

// Use appropriate steps
<Slider step={1} {...props} /> // Integer values
<Slider step={0.1} {...props} /> // Decimal values

// Format displayed values
<Slider
  formatValue={(val) => `${val}%`}
  showValue={true}
  {...props}
/>
```

### Don't ❌

```tsx
// Don't skip labels
<Slider value={val} onChange={setVal} /> // No accessibility

// Don't use for precise input
<Slider min={0} max={999999} /> // Use TextInput

// Don't use unclear ranges
<Slider min={-50} max={200} /> // Confusing

// Don't forget step for integers
<Slider step={0.00001} /> // Too precise for UI slider
```

## Related Components

- **TextInput** - For precise numeric input
- **Select** - For discrete option selection
- **Toggle** - For binary on/off
- **RadioGroup** - For labeled options

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance

- CSS-only visual updates
- Throttled onChange (smooth performance)
- No re-renders on drag
- Lightweight (~300 bytes JS)

---

**Part of Form Components** - Essential form controls with validation and accessibility built-in.
