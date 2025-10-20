# Checkbox Component

@author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
@version 1.0.0
@since 2025-10-15

Clean checkbox component following Spexop's Refined Minimalism aesthetic.

## Features

- ✅ **Border-Based Design** - No heavy shadows, clean 1px borders
- ✅ **Density Variants** - Compact, normal, spacious sizing
- ✅ **Theme-Aware** - Automatic light/dark theme support
- ✅ **Keyboard Accessible** - Space and Enter key support
- ✅ **Smooth Animations** - GPU-accelerated checkmark appearance
- ✅ **Optional Description** - Support for helper text
- ✅ **WCAG 2.2 AA** - Full accessibility compliance

## Basic Usage

```tsx
import { Checkbox } from '@spexop/react';

function MyForm() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      checked={accepted}
      onChange={setAccepted}
      label="I accept the terms and conditions"
    />
  );
}
```

## With Description

```tsx
<Checkbox
  checked={notifications}
  onChange={setNotifications}
  label="Enable notifications"
  description="Receive email updates about your account activity"
/>
```

## Density Variants

```tsx
{/* Compact - Dashboard context */}
<Checkbox density="compact" checked={value} onChange={setValue} label="Compact" />

{/* Normal - Default */}
<Checkbox density="normal" checked={value} onChange={setValue} label="Normal" />

{/* Spacious - Blog/Content context */}
<Checkbox density="spacious" checked={value} onChange={setValue} label="Spacious" />
```

## Disabled State

```tsx
<Checkbox
  checked={true}
  onChange={() => {}}
  label="Disabled checkbox"
  disabled
/>
```

## Without Label (Use aria-label)

```tsx
<Checkbox
  checked={selected}
  onChange={setSelected}
  aria-label="Select this item"
/>
```

## Props

### `checked` (required)

**Type:** `boolean`

Whether the checkbox is checked.

### `onChange` (required)

**Type:** `(checked: boolean) => void`

Callback when checkbox state changes.

### `label`

**Type:** `string`

Optional label text displayed next to the checkbox.

### `description`

**Type:** `string`

Optional description text displayed below the label.

### `density`

**Type:** `"compact" | "normal" | "spacious"`  
**Default:** `"normal"`

Density variant for different contexts:

- `compact`: Dashboard context (16px checkbox, smaller text)
- `normal`: Default (20px checkbox, balanced sizing)
- `spacious`: Blog/Content context (24px checkbox, larger text)

### `disabled`

**Type:** `boolean`  
**Default:** `false`

Whether the checkbox is disabled.

### `className`

**Type:** `string`

Additional CSS class names for custom styling.

### `id`

**Type:** `string`

Custom ID for the checkbox element. Auto-generated if not provided.

### `aria-label`

**Type:** `string`

ARIA label for accessibility. Required if no `label` prop is provided.

### `aria-labelledby`

**Type:** `string`

ARIA labelledby attribute for accessibility.

## Styling

The Checkbox component uses:

- **Borders** instead of heavy shadows (Refined Minimalism)
- **Design tokens** for all spacing, colors, and typography
- **Theme-aware colors** (Red in light theme, Blue in dark theme)
- **Smooth animations** that respect `prefers-reduced-motion`

## Accessibility

- ✅ Native checkbox input for screen readers
- ✅ Keyboard navigation (Space, Enter)
- ✅ Focus indicators (2px outline, 2px offset)
- ✅ ARIA labels and descriptions
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Proper label associations

## Integration with Grid

```tsx
import { Grid, Checkbox } from '@spexop/react';

<Grid columns={{ xs: 1, md: 2 }} gap={4}>
  <Checkbox
    checked={option1}
    onChange={setOption1}
    label="Option 1"
    description="First option description"
  />
  <Checkbox
    checked={option2}
    onChange={setOption2}
    label="Option 2"
    description="Second option description"
  />
</Grid>
```

## Design Principles

This component follows Spexop's **Refined Minimalism** aesthetic:

1. **Borders before shadows** - Clean 1px borders, no drop shadows
2. **Typography before decoration** - Clear labels and descriptions
3. **Tokens before magic numbers** - All values from design tokens
4. **Accessibility before aesthetics** - WCAG 2.2 AA compliant
5. **Standards before frameworks** - Semantic HTML with progressive enhancement

## Related Components

- [Toggle](../Toggle/README.md) - Switch-style toggle for on/off states
- [RadioGroup](../RadioGroup/README.md) - Mutually exclusive selection
- [Select](../Select/README.md) - Dropdown selection

## See Also

- [Checkbox Component Types](./Checkbox.types.md) - Checkbox component types.
- [Checkbox Component](./Checkbox.tsx) - Checkbox component implementation.
- [Checkbox Component Index](./index.ts) - Checkbox component index.
- [Checkbox Component Styles](./Checkbox.module.css) - Checkbox component styles.

## Contributing

Contributions are welcome! Please feel free to submit an issue or pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Credits

- [@spexop-ui](https://github.com/spexop-ui) - Spexop UI
- [@olmstedian](https://github.com/olmstedian) - Olmstedian
