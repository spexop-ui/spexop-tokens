# Combobox

A searchable select component with autocomplete functionality following "The Spexop Way".

## Features

- Searchable dropdown with real-time filtering
- Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
- Full accessibility (ARIA, focus management, screen reader support)
- Optional descriptions for options
- Custom filter functions
- Size variants (sm, md, lg)
- Error and validation states
- Left icon support
- Theme-aware styling
- Type-safe with TypeScript

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Combobox } from '@spexop/react';

function App() {
  const [framework, setFramework] = useState('react');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <Combobox
      value={framework}
      onChange={setFramework}
      options={options}
      placeholder="Search frameworks..."
      label="Framework"
    />
  );
}
```

## With Descriptions

```tsx
const options = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    value: 'vue',
    label: 'Vue',
    description: 'The Progressive JavaScript Framework'
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications'
  },
];

<Combobox
  value={selected}
  onChange={setSelected}
  options={options}
  placeholder="Search..."
/>
```

## With Custom Filter

```tsx
const customFilter = (option, query) => {
  // Only match from the start of the label
  return option.label.toLowerCase().startsWith(query.toLowerCase());
};

<Combobox
  value={selected}
  onChange={setSelected}
  options={options}
  filterFn={customFilter}
/>
```

## Size Variants

```tsx
<Combobox size="sm" {...props} />
<Combobox size="md" {...props} /> {/* Default */}
<Combobox size="lg" {...props} />
```

## With Validation

```tsx
<Combobox
  value={selected}
  onChange={setSelected}
  options={options}
  required
  error={!selected ? 'Please select an option' : ''}
  helpText="Choose your preferred framework"
/>
```

## With Icon

```tsx
import { Icon } from '@spexop/react';
import { Search } from '@spexop/icons';

<Combobox
  value={selected}
  onChange={setSelected}
  options={options}
  leftIcon={<Icon name="Search" />}
/>
```

## Design Principles Applied

### 1. Primitives before patterns

Built on native `input` element with ARIA combobox role, enhanced with search and filter functionality.

### 2. Borders before shadows

Uses clean 2px borders for focus states, minimal shadow only for dropdown elevation.

### 3. Typography before decoration

Font weight (semibold) for selected options, normal weight for others. No color-only hierarchy.

### 4. Tokens before magic numbers

All spacing, colors, and sizing use design tokens from `@spexop/theme`.

### 5. Composition before complexity

Simple searchable input combined with filtered dropdown list. No over-engineering.

### 6. Standards before frameworks

Native HTML input with proper ARIA attributes for screen readers and keyboard navigation.

### 7. Accessibility before aesthetics

- Full keyboard navigation (Arrow keys, Enter, Escape, Home, End, Tab)
- ARIA roles: `combobox`, `listbox`, `option`
- ARIA states: `aria-expanded`, `aria-activedescendant`, `aria-selected`
- Focus management and visible focus indicators
- Screen reader announcements for state changes
- Required field indicator

## Keyboard Navigation

- **Down Arrow**: Open dropdown or move to next option
- **Up Arrow**: Move to previous option
- **Enter**: Select focused option
- **Escape**: Close dropdown and clear search
- **Home**: Jump to first option
- **End**: Jump to last option
- **Tab**: Close dropdown and move focus
- **Type**: Filter options in real-time

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current selected value (required) |
| `onChange` | `(value: string) => void` | - | Change handler (required) |
| `options` | `ComboboxOption[]` | - | Available options (required) |
| `label` | `string` | - | Label for the combobox |
| `disabled` | `boolean` | `false` | Whether combobox is disabled |
| `placeholder` | `string` | `"Search..."` | Placeholder text |
| `required` | `boolean` | `false` | Whether field is required |
| `error` | `string` | - | Error message to display |
| `helpText` | `string` | - | Help text below combobox |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id attribute |
| `aria-label` | `string` | - | Accessibility label |
| `aria-labelledby` | `string` | - | ID of labeling element |
| `filterFn` | `(option, query) => boolean` | - | Custom filter function |
| `maxHeight` | `string` | `"300px"` | Maximum dropdown height |
| `leftIcon` | `ReactNode` | - | Icon on left side |

### ComboboxOption Type

```typescript
interface ComboboxOption {
  value: string;           // Unique option value
  label: string;           // Display text
  disabled?: boolean;      // Disable option
  description?: string;    // Optional description
}
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android

## Accessibility Features

- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Screen reader tested with VoiceOver and NVDA
- High contrast mode support
- Reduced motion support
- Focus visible indicators
- Error announcements via `role="alert"`

## Related Components

- **Select** - Simple dropdown without search
- **TextInput** - Basic text input
- **SearchBar** - Dedicated search component

## License

MIT License - Part of the Spexop Design System
