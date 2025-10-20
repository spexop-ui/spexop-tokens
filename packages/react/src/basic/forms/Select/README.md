# Select

Custom dropdown select component with keyboard navigation, accessibility, and smooth animations. Built with TypeScript and design tokens.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Select } from '@spexop/react';
import type { SelectOption } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Select } from '@spexop/react';

function MyComponent() {
  const [value, setValue] = useState('option1');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  
  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder="Choose an option"
      aria-label="Select an option"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | Currently selected value |
| `onChange` | `(value: string) => void` | **Required** | Change handler callback |
| `options` | `SelectOption[]` | **Required** | Array of selectable options |
| `disabled` | `boolean` | `false` | Disable the select |
| `placeholder` | `string` | `undefined` | Placeholder when no value selected |
| `density` | `"compact"` \| `"normal"` \| `"spacious"` | `"normal"` | Spacing density |
| `className` | `string` | `""` | Additional CSS class |
| `id` | `string` | auto-generated | HTML id attribute |
| `aria-label` | `string` | `undefined` | ARIA label for accessibility |
| `aria-labelledby` | `string` | `undefined` | ARIA labelledby reference |

### SelectOption Type

```typescript
interface SelectOption {
  value: string;        // Unique value identifier
  label: string;        // Display text
  disabled?: boolean;   // Disable this option
}
```

## Examples

### With Label

```tsx
<div>
  <label htmlFor="country-select" style={{ display: 'block', marginBottom: '8px' }}>
    Country
  </label>
  <Select
    id="country-select"
    value={country}
    onChange={setCountry}
    options={[
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' }
    ]}
  />
</div>
```

### With Placeholder

```tsx
<Select
  value={selectedOption}
  onChange={setSelectedOption}
  options={options}
  placeholder="Select a category..."
  aria-label="Category selection"
/>
```

### Disabled Options

```tsx
<Select
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
  ]}
  aria-label="Select plan"
/>
```

### Disabled Select

```tsx
<Select
  value={value}
  onChange={setValue}
  options={options}
  disabled={true}
  aria-label="Disabled select"
/>
```

### Density Variants

```tsx
// Compact - for dashboards and dense UIs
<Select
  value={value}
  onChange={setValue}
  options={options}
  density="compact"
  aria-label="Compact select"
/>

// Normal - default, balanced spacing
<Select
  value={value}
  onChange={setValue}
  options={options}
  density="normal"
  aria-label="Normal select"
/>

// Spacious - for content-heavy pages
<Select
  value={value}
  onChange={setValue}
  options={options}
  density="spacious"
  aria-label="Spacious select"
/>
```

### In a Form

```tsx
import { Stack, Select, TextInput, Button } from '@spexop/react';

function RegistrationForm() {
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="vertical" gap={4}>
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <div>
          <label htmlFor="country">Country</label>
          <Select
            id="country"
            value={country}
            onChange={setCountry}
            options={countryOptions}
          />
        </div>
        
        <div>
          <label htmlFor="role">Role</label>
          <Select
            id="role"
            value={role}
            onChange={setRole}
            options={[
              { value: 'dev', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' }
            ]}
          />
        </div>
        
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Stack>
    </form>
  );
}
```

## Keyboard Navigation

The Select component supports full keyboard navigation:

| Key | Action |
|-----|--------|
| **Space** / **Enter** | Open/close dropdown |
| **Arrow Down** | Move to next option (wraps to first) |
| **Arrow Up** | Move to previous option (wraps to last) |
| **Home** | Jump to first option |
| **End** | Jump to last option |
| **Escape** | Close dropdown |
| **Tab** | Close dropdown and move to next focusable element |

## Accessibility

### ARIA Attributes

The component implements proper ARIA patterns:

- `role="combobox"` - Identifies the select trigger
- `aria-expanded` - Indicates dropdown state
- `aria-haspopup="listbox"` - Indicates dropdown menu
- `aria-activedescendant` - Points to currently focused option
- `role="listbox"` - Dropdown container
- `role="option"` - Each selectable option
- `aria-selected` - Currently selected option
- `aria-disabled` - Disabled options

### Focus Management

- ✅ Focus visible on keyboard navigation
- ✅ Focus trap within dropdown when open
- ✅ Returns focus to trigger after selection
- ✅ Click outside closes dropdown

### Screen Readers

- Announces current selection
- Announces when dropdown opens/closes
- Announces option count
- Reads option labels clearly

### Requirements

**Always provide either**:

- `aria-label` prop for standalone selects
- Associated `<label>` element with matching `id`

```tsx
// Option 1: aria-label
<Select aria-label="Select country" {...props} />

// Option 2: label element
<label htmlFor="country-select">Country</label>
<Select id="country-select" {...props} />
```

## Styling

### Custom Styling

Add custom styles via `className`:

```tsx
<Select
  className="my-custom-select"
  value={value}
  onChange={setValue}
  options={options}
/>
```

```css
.my-custom-select {
  /* Custom styles here */
  max-width: 300px;
}
```

### Design Tokens

The component uses design tokens for consistent styling:

- Colors: `--s-color-neutral-*`, `--s-color-red-*`
- Spacing: `--s-spacing-*`
- Border radius: `--s-radius-md`
- Transitions: `--s-transition-fast`
- Shadows: `--s-shadow-md`

## Integration with Forms

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Select } from '@spexop/react';

function Form() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            options={categoryOptions}
            aria-label="Category"
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Form, Field } from 'formik';
import { Select } from '@spexop/react';

function MyForm() {
  return (
    <Formik initialValues={{ role: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="role">
          {({ field }) => (
            <Select
              value={field.value}
              onChange={(value) => field.onChange({ target: { name: field.name, value } })}
              options={roleOptions}
              aria-label="Role"
            />
          )}
        </Field>
      </Form>
    </Formik>
  );
}
```

## Common Patterns

### Country Select

```tsx
const countries = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'au', label: '🇦🇺 Australia' }
];

<Select
  value={country}
  onChange={setCountry}
  options={countries}
  placeholder="Select your country"
  aria-label="Country"
/>
```

### Status Select

```tsx
const statuses = [
  { value: 'active', label: '✓ Active' },
  { value: 'pending', label: '○ Pending' },
  { value: 'inactive', label: '✕ Inactive' }
];

<Select
  value={status}
  onChange={setStatus}
  options={statuses}
  aria-label="Status"
/>
```

### Grouped Options (Via Labels)

```tsx
const options = [
  { value: '', label: '--- Fruits ---', disabled: true },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: '', label: '--- Vegetables ---', disabled: true },
  { value: 'carrot', label: 'Carrot' },
  { value: 'lettuce', label: 'Lettuce' }
];

<Select
  value={food}
  onChange={setFood}
  options={options}
  aria-label="Food selection"
/>
```

## Troubleshooting

### Dropdown Not Opening

**Issue**: Clicking the select doesn't open dropdown

**Solutions**:

- Check if `disabled` prop is set to `true`
- Verify options array is not empty
- Check for JavaScript errors in console
- Ensure parent doesn't have `pointer-events: none`

### Selected Value Not Showing

**Issue**: Value updates but display doesn't change

**Solutions**:

- Verify `value` prop matches an option's `value`
- Check that value is a string (not number or object)
- Ensure options array includes the selected value
- Verify onChange handler updates state correctly

### Styling Issues

**Issue**: Custom styles not applying

**Solutions**:

- Check CSS specificity (use className)
- Ensure design tokens CSS is imported
- Verify `@spexop/react/dist/index.css` is imported
- Check for CSS conflicts with global styles

## Performance Considerations

- **Memoize large option arrays** - Use `useMemo` for options with 100+ items
- **Virtual scrolling** - For 1000+ options, consider a virtualized select library
- **Debounce search** - If implementing search, debounce input handlers
- **Lazy loading** - Load options on-demand for large datasets

## Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

Requires support for:

- CSS custom properties
- ES2022 features
- Flexbox
- `ResizeObserver` API

## Related Components

- **RadioGroup** - For 3-5 mutually exclusive options (better UX)
- **SegmentedControl** - For 2-4 visible options (iOS-style)
- **SegmentedButton** - For button-style selection
- **SearchBar** - For search input with dropdown
- **CommandPalette** - For command selection with search

## When to Use

### Use Select When ✅

- You have 5+ options to choose from
- Options are dynamic or can grow
- Space is limited (dropdown saves space)
- Single selection required
- Options need grouping or categories

### Use RadioGroup Instead When

- You have 2-5 options (all visible is better UX)
- Options should be immediately visible
- Comparison between options is important
- Space is not constrained

### Use SegmentedControl Instead When

- You have 2-4 toggle-style options
- Options represent modes or views
- iOS-style appearance preferred
- Options are short (1-2 words)

## Design System Integration

Select follows the Spexop design principles:

- **Borders before shadows** - Clean border-based design
- **Typography-driven** - Clear, readable option text
- **Token-based** - All values from @spexop/tokens
- **Accessible** - WCAG AA compliant
- **Responsive** - Works on mobile and desktop

---

**Part of Form Components** - Essential form controls with validation and accessibility built-in.
