# SegmentedButton Component

**Radio-style button group with exclusive selection and keyboard navigation.**

**component** SegmentedButton  
**packageName** @spexop/react  
**description** Radio-style button selection with keyboard navigation  
**author** @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian  
**version** 0.1.0  
**since** 2025-10-13

---

## Features

- ✅ **Radio-Style Selection**: Only one option selected at a time
- ✅ **Controlled Component**: value + onChange pattern
- ✅ **Keyboard Navigation**: Arrow keys to navigate options
- ✅ **Icon Support**: Optional icons before labels
- ✅ **Disabled Options**: Individual options can be disabled
- ✅ **Full Accessibility**: ARIA radiogroup pattern, keyboard support
- ✅ **primitives-Aligned**: Uses spacing tokens, semantic colors
- ✅ **Theme-Aware**: Works in light and dark modes
- ✅ **Palette Integration**: Active state shows colored accent border that adapts to selected palette

---

## Installation

```bash
pnpm add @spexop/react
```

---

## Basic Usage

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function MyComponent() {
  const [view, setView] = useState('list');

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' }
      ]}
      aria-label="View mode"
    />
  );
}
```

---

## With Icons

```tsx
import { SegmentedButton } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function ViewSelector() {
  const [view, setView] = useState('list');

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List', icon: <List size={20} /> },
        { value: 'grid', label: 'Grid', icon: <Grid size={20} /> },
        { value: 'table', label: 'Table', icon: <Table size={20} /> }
      ]}
      aria-label="Display mode"
    />
  );
}
```

---

## With Disabled Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function TimePeriodSelector() {
  const [period, setPeriod] = useState('week');

  return (
    <SegmentedButton
      value={period}
      onChange={setPeriod}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year', disabled: true }  // Coming soon
      ]}
      aria-label="Time period"
    />
  );
}
```

---

## Props

### SegmentedButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Current selected value (controlled) |
| `onChange` | `(value: string) => void` | required | Change handler |
| `options` | `SegmentedButtonOption[]` | required | Array of button options |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | required | ARIA label describing the group |
| `aria-labelledby` | `string` | - | Alternative to aria-label |

### SegmentedButtonOption

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | required | Unique value identifier |
| `label` | `string` | required | Display label |
| `icon` | `ReactNode` | - | Optional icon before label |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | - | Optional ARIA label override |

---

## Keyboard Navigation

- **Arrow Left**: Select previous option
- **Arrow Right**: Select next option
- **Tab**: Navigate to/from component
- **Enter/Space**: Select focused option (native behavior)

**Behavior**:

- Arrow keys wrap around (last → first, first → last)
- Disabled options are skipped during navigation
- Only active option is in tab order (tabIndex={0})

---

## Examples

### View Mode Selector

```tsx
import { SegmentedButton } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function ViewModeSelector() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <SegmentedButton
      value={viewMode}
      onChange={setViewMode}
      options={[
        { value: 'list', label: 'List', icon: <List size={20} /> },
        { value: 'grid', label: 'Grid', icon: <Grid size={20} /> },
        { value: 'table', label: 'Table', icon: <Table size={20} /> }
      ]}
      aria-label="View mode selection"
    />
  );
}
```

### Time Period Filter

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function TimePeriodFilter() {
  const [period, setPeriod] = useState('week');

  return (
    <SegmentedButton
      value={period}
      onChange={setPeriod}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' }
      ]}
      aria-label="Time period"
    />
  );
}
```

### Alignment Controls

```tsx
import { SegmentedButton } from '@spexop/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@spexop/icons';
import { useState } from 'react';

function AlignmentControls() {
  const [align, setAlign] = useState('left');

  return (
    <SegmentedButton
      value={align}
      onChange={setAlign}
      options={[
        { value: 'left', label: 'Left', icon: <AlignLeft size={18} /> },
        { value: 'center', label: 'Center', icon: <AlignCenter size={18} /> },
        { value: 'right', label: 'Right', icon: <AlignRight size={18} /> },
        { value: 'justify', label: 'Justify', icon: <AlignJustify size={18} /> }
      ]}
      aria-label="Text alignment"
    />
  );
}
```

---

## Accessibility

### ARIA Pattern

SegmentedButton implements the **radiogroup** ARIA pattern:

```tsx
<div role="radiogroup" aria-label="View mode">
  <button role="radio" aria-checked="true">List</button>
  <button role="radio" aria-checked="false">Grid</button>
</div>
```

### Required Attributes

```tsx
// ✅ CORRECT - aria-label is required
<SegmentedButton
  value={value}
  onChange={setValue}
  options={options}
  aria-label="View mode"
/>

// ❌ INCORRECT - Missing aria-label
<SegmentedButton
  value={value}
  onChange={setValue}
  options={options}
/>

// ✅ CORRECT - Using aria-labelledby
<div>
  <span id="view-label">View Mode</span>
  <SegmentedButton
    value={value}
    onChange={setValue}
    options={options}
    aria-labelledby="view-label"
  />
</div>
```

### Keyboard Behavior

- **Arrow Keys**: Navigate between options
- **Tab**: Enter/exit component
- **Only active option in tab order**: tabIndex={0} for selected, -1 for others
- **Disabled options skipped**: Arrow keys jump over disabled items

---

## Foundation Integration

### With Stack

```tsx
import { Stack, SegmentedButton } from '@spexop/react';

<Stack direction="vertical" gap={4}>
  <label htmlFor="view-selector">Choose View</label>
  
  <SegmentedButton
    id="view-selector"
    value={view}
    onChange={setView}
    options={options}
    aria-label="View mode"
  />
</Stack>
```

### In Forms

```tsx
import { Stack, SegmentedButton } from '@spexop/react';

<form onSubmit={handleSubmit}>
  <Stack direction="vertical" gap={6}>
    <div>
      <label>Display Mode</label>
      <SegmentedButton
        value={displayMode}
        onChange={setDisplayMode}
        options={[
          { value: 'compact', label: 'Compact' },
          { value: 'normal', label: 'Normal' },
          { value: 'spacious', label: 'Spacious' }
        ]}
        aria-label="Display mode selection"
      />
    </div>
    
    <Button type="submit" variant="primary">Save Preferences</Button>
  </Stack>
</form>
```

---

## Design Tokens Used

```css
/* Container */
--s-color-subtle-bg: #f5f5f5        /* Background pill */
--s-color-border: #e5e5e5           /* Container border */
--s-radius-md: 6px                   /* Container radius */
--s-spacing-1: 4px                   /* Container padding & gap */

/* Options */
--s-color-surface: #ffffff           /* Active background */
--s-color-text: #171717              /* Active text */
--s-color-text-secondary: #525252    /* Default text */
--s-color-primary-500: #ef4444       /* Active accent border (palette-aware) */
--s-spacing-2: 8px                   /* Button padding */
--s-spacing-4: 16px                  /* Button padding */
--s-radius-sm: 4px                   /* Button radius */

/* Typography */
--s-font-size-base: 16px
--s-font-weight-semibold: 600

/* Transitions */
--s-transition-fast: 150ms ease-in-out
```

**Palette Integration**: The active state uses `--s-color-primary-500` for the accent border, which automatically adapts when users switch between color palettes (Red, Blue, Green, Purple, Neutral).

---

## Best Practices

### ✅ DO

```tsx
// Use for mutually exclusive choices
<SegmentedButton
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' }
  ]}
  aria-label="View mode"
/>

// Provide aria-label
<SegmentedButton
  aria-label="Selection type"
  {...props}
/>

// Use controlled component pattern
const [value, setValue] = useState('option1');
<SegmentedButton value={value} onChange={setValue} {...props} />

// Add icons for better UX
<SegmentedButton
  options={[
    { value: 'a', label: 'Option A', icon: <Icon /> }
  ]}
  {...props}
/>
```

### ❌ DON'T

```tsx
// Don't forget aria-label
<SegmentedButton {...props} />  // Missing aria-label!

// Don't use for non-exclusive actions
<SegmentedButton  // Use ButtonGroup instead
  options={[
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' }
  ]}
/>

// Don't use uncontrolled
<SegmentedButton options={options} />  // Missing value and onChange!

// Don't disable all options
<SegmentedButton
  options={options.map(o => ({ ...o, disabled: true }))}  // Bad UX
/>
```

---

## vs ButtonGroup

**Use SegmentedButton when**:

- ✅ Only ONE option can be selected (radio behavior)
- ✅ Visual emphasis on selected state (elevated)
- ✅ Compact visual grouping in a pill container

**Use ButtonGroup when**:

- ✅ Multiple buttons can be active independently (toolbar)
- ✅ Each button triggers different actions
- ✅ Connected border appearance desired

---

## TypeScript

Full TypeScript support:

```tsx
import type { SegmentedButtonOption, SegmentedButtonProps } from '@spexop/react';

const options: SegmentedButtonOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' }
];

const MySegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  return <SegmentedButton {...props} />;
};
```

---

## Testing

### Keyboard Testing

- [ ] Arrow Left navigates to previous option
- [ ] Arrow Right navigates to next option
- [ ] Navigation wraps around (last → first, first → last)
- [ ] Disabled options are skipped
- [ ] Tab enters/exits component
- [ ] Only active option has tabIndex={0}

### Visual Testing

- [ ] Active option has elevated appearance
- [ ] Hover shows visual feedback
- [ ] Disabled options appear dimmed
- [ ] Focus indicators visible (3px outline)
- [ ] Icons display correctly
- [ ] Mobile: Horizontal scroll if overflow

### Screen Reader Testing

- [ ] Group purpose announced (radiogroup)
- [ ] Current selection announced
- [ ] aria-checked states correct
- [ ] Disabled options communicated

---

## Design System Alignment

This component follows **Spexop's Refined Minimalism** principles:

1. ✅ **Border-based separation** - 2px border on container
2. ✅ **Typography-driven** - Semibold text, clear labels
3. ✅ **High-contrast** - Active state clearly visible
4. ✅ **Minimal decoration** - Subtle shadow on active only
5. ✅ **Primitives-First** - Uses spacing and color tokens

---

## Performance

- **Bundle Size**: ~1.5KB (gzipped)
- **Render Time**: < 16ms
- **Keyboard Response**: < 50ms

---

## Related Components

- **ButtonGroup**: For independent multi-button toolbars
- **RadioGroup**: For traditional radio button forms
- **Select**: For dropdown selections with many options

---

## License

MIT © Spexop Design System
