# SplitButton Component

**Button with primary action + dropdown menu for secondary options.**

**component** SplitButton  
**packageName** @spexop/react  
**description** Split button with main action and dropdown options  
**author** @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian  
**version** 0.1.0  
**since** 2025-10-13

---

## Features

- ✅ **Primary + Secondary Actions**: Main button for primary action, dropdown for alternatives
- ✅ **Click Outside to Close**: Dropdown closes when clicking outside
- ✅ **Escape Key Support**: Press Escape to close dropdown and return focus
- ✅ **Keyboard Navigation**: Arrow Up/Down to navigate menu items
- ✅ **Icon Support**: Optional icons for main button and menu items
- ✅ **Disabled Options**: Individual menu items can be disabled
- ✅ **Full Accessibility**: ARIA menu pattern, keyboard support, focus management
- ✅ **primitives-Aligned**: Uses spacing tokens, semantic colors
- ✅ **Theme-Aware**: Works in light and dark modes
- ✅ **Palette Integration**: Primary variant adapts to selected color palette
- ✅ **Mobile Responsive**: Stacks vertically on small screens

---

## Installation

```bash
pnpm add @spexop/react
```

---

## Basic Usage

```tsx
import { SplitButton } from '@spexop/react';

function SaveDocument() {
  const handleSave = () => {
    console.log('Saving document...');
  };

  const handleSaveAsDraft = () => {
    console.log('Saving as draft...');
  };

  const handleSaveAsTemplate = () => {
    console.log('Saving as template...');
  };

  return (
    <SplitButton
      label="Save Document"
      onClick={handleSave}
      options={[
        { label: 'Save as Draft', value: 'draft', onClick: handleSaveAsDraft },
        { label: 'Save as Template', value: 'template', onClick: handleSaveAsTemplate }
      ]}
    />
  );
}
```

---

## With Icons

```tsx
import { SplitButton } from '@spexop/react';
import { Save, FileText, Layout } from '@spexop/icons';

function SaveWithIcons() {
  return (
    <SplitButton
      label="Save"
      icon={<Save size={20} />}
      onClick={handleSave}
      options={[
        {
          label: 'Save as Draft',
          value: 'draft',
          icon: <FileText size={20} />,
          onClick: handleDraft
        },
        {
          label: 'Save as Template',
          value: 'template',
          icon: <Layout size={20} />,
          onClick: handleTemplate
        }
      ]}
    />
  );
}
```

---

## Variants

```tsx
import { SplitButton } from '@spexop/react';

// Primary (default) - Uses palette color
<SplitButton
  label="Publish"
  variant="primary"
  onClick={handlePublish}
  options={publishOptions}
/>

// Secondary - Neutral styling
<SplitButton
  label="Export"
  variant="secondary"
  onClick={handleExport}
  options={exportOptions}
/>
```

---

## With Disabled Options

```tsx
import { SplitButton } from '@spexop/react';

function ExportData() {
  return (
    <SplitButton
      label="Export"
      onClick={handleExportDefault}
      options={[
        { label: 'Export as CSV', value: 'csv', onClick: handleCSV },
        { label: 'Export as JSON', value: 'json', onClick: handleJSON },
        {
          label: 'Export as PDF',
          value: 'pdf',
          onClick: handlePDF,
          disabled: true  // Premium feature
        }
      ]}
    />
  );
}
```

---

## Props

### SplitButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Main button label (primary action) |
| `onClick` | `() => void` | required | Main button click handler |
| `options` | `SplitButtonOption[]` | required | Array of dropdown menu options |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Button variant for styling |
| `disabled` | `boolean` | `false` | Disabled state (affects both buttons) |
| `className` | `string` | - | Additional CSS class |
| `icon` | `ReactNode` | - | Optional icon for main button |
| `aria-label` | `string` | - | ARIA label for main button (overrides label) |
| `aria-label-toggle` | `string` | `'Show more options'` | ARIA label for dropdown toggle |

### SplitButtonOption

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | required | Display label for the menu item |
| `value` | `string` | required | Unique value identifier |
| `onClick` | `() => void` | required | Click handler for this option |
| `icon` | `ReactNode` | - | Optional icon before label |
| `disabled` | `boolean` | `false` | Disabled state for this option |
| `aria-label` | `string` | - | Optional ARIA label |

---

## Keyboard Navigation

### Main Buttons

- **Tab**: Navigate to main button → toggle button
- **Enter/Space**: Activate focused button
- **Arrow Down**: Open dropdown (when toggle button focused)

### Dropdown Menu

- **Arrow Up**: Navigate to previous menu item
- **Arrow Down**: Navigate to next menu item
- **Enter/Space**: Select focused menu item
- **Escape**: Close dropdown and return focus to toggle button
- **Tab**: Close dropdown and move to next focusable element

---

## Examples

### Save Document

```tsx
import { SplitButton } from '@spexop/react';
import { Save } from '@spexop/icons';

function DocumentActions() {
  const handleSave = () => {
    // Save current document
    saveDocument();
  };

  const handleSaveDraft = () => {
    // Save as draft
    saveAsDraft();
  };

  const handleSaveTemplate = () => {
    // Save as reusable template
    saveAsTemplate();
  };

  return (
    <SplitButton
      label="Save"
      icon={<Save size={20} />}
      variant="primary"
      onClick={handleSave}
      options={[
        {
          label: 'Save as Draft',
          value: 'draft',
          onClick: handleSaveDraft
        },
        {
          label: 'Save as Template',
          value: 'template',
          onClick: handleSaveTemplate
        }
      ]}
    />
  );
}
```

### Export Data

```tsx
import { SplitButton } from '@spexop/react';
import { Download, FileText, Code } from '@spexop/icons';

function DataExport() {
  const exportOptions = [
    {
      label: 'Export as CSV',
      value: 'csv',
      icon: <FileText size={20} />,
      onClick: () => exportData('csv')
    },
    {
      label: 'Export as JSON',
      value: 'json',
      icon: <Code size={20} />,
      onClick: () => exportData('json')
    },
    {
      label: 'Export as Excel',
      value: 'excel',
      icon: <FileText size={20} />,
      onClick: () => exportData('excel')
    }
  ];

  return (
    <SplitButton
      label="Download"
      icon={<Download size={20} />}
      variant="secondary"
      onClick={() => exportData('default')}
      options={exportOptions}
    />
  );
}
```

### Publish Content

```tsx
import { SplitButton } from '@spexop/react';
import { Upload, Eye, Clock } from '@spexop/icons';

function PublishActions() {
  return (
    <SplitButton
      label="Publish Now"
      icon={<Upload size={20} />}
      onClick={handlePublishNow}
      options={[
        {
          label: 'Publish & Preview',
          value: 'preview',
          icon: <Eye size={20} />,
          onClick: handlePublishPreview
        },
        {
          label: 'Schedule Publish',
          value: 'schedule',
          icon: <Clock size={20} />,
          onClick: handleSchedule
        }
      ]}
    />
  );
}
```

---

## Accessibility

### ARIA Pattern

SplitButton implements the **menu button** ARIA pattern:

```tsx
<div>
  <button aria-label="Save Document">Save</button>
  <button aria-expanded="false" aria-haspopup="true" aria-label="Show more options">
    ▼
  </button>
  
  <div role="menu">
    <button role="menuitem">Save as Draft</button>
    <button role="menuitem">Save as Template</button>
  </div>
</div>
```

### Focus Management

- Main button click executes immediately (no dropdown)
- Toggle button opens/closes dropdown
- When dropdown opens, focus stays on toggle button
- Arrow keys navigate menu items
- Escape returns focus to toggle button
- Click outside closes dropdown

### Screen Reader Announcements

- Main button label announced
- Toggle button announces "Show more options" + expanded state
- Menu items announced with labels
- Disabled states communicated

---

## Foundation Integration

### With Stack

```tsx
import { Stack, SplitButton } from '@spexop/react';

<Stack direction="horizontal" gap={4} align="center">
  <SplitButton
    label="Save"
    onClick={handleSave}
    options={saveOptions}
  />
  
  <SplitButton
    label="Export"
    variant="secondary"
    onClick={handleExport}
    options={exportOptions}
  />
</Stack>
```

### In Forms

```tsx
import { Stack, SplitButton } from '@spexop/react';

<form onSubmit={handleSubmit}>
  <Stack direction="vertical" gap={6}>
    {/* Form fields... */}
    
    <Stack direction="horizontal" gap={4} justify="end">
      <Button variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      
      <SplitButton
        label="Submit"
        variant="primary"
        onClick={handleSubmit}
        options={[
          { label: 'Submit & Continue', value: 'continue', onClick: handleContinue },
          { label: 'Submit & New', value: 'new', onClick: handleNew }
        ]}
      />
    </Stack>
  </Stack>
</form>
```

---

## Design Tokens Used

```css
/* Buttons */
--s-color-surface: #ffffff         /* Background */
--s-color-text: #171717            /* Text */
--s-color-border: #e5e5e5          /* Border */
--s-color-primary-500: #ef4444     /* Primary variant (palette-aware) */
--s-color-primary-600: #dc2626     /* Primary hover */
--s-spacing-3: 12px                /* Button padding */
--s-spacing-5: 20px                /* Button padding */
--s-radius-md: 6px                 /* Button radius */

/* Menu */
--s-color-hover-bg: #f5f5f5        /* Menu item hover */
--s-spacing-2: 8px                 /* Menu padding & spacing */
--s-radius-sm: 4px                 /* Menu item radius */

/* Typography */
--s-font-size-base: 16px
--s-font-weight-semibold: 600
--s-font-weight-medium: 500

/* Transitions */
--s-transition-fast: 150ms ease-in-out
```

**Palette Integration**: The primary variant uses `--s-color-primary-500` and `--s-color-primary-600`, which automatically adapt when users switch between color palettes.

---

## Best Practices

### ✅ DO

```tsx
// Use for actions with related alternatives
<SplitButton
  label="Save"
  onClick={handleSave}
  options={[
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
    { label: 'Save as Template', value: 'template', onClick: handleTemplate }
  ]}
/>

// Provide clear labels
<SplitButton
  label="Publish Now"
  onClick={handlePublish}
  options={publishOptions}
  aria-label-toggle="Show publish options"
/>

// Use icons for clarity
<SplitButton
  icon={<Save size={20} />}
  label="Save"
  {...props}
/>

// Disable premium features gracefully
<SplitButton
  options={[
    { label: 'Basic Export', value: 'basic', onClick: handleBasic },
    { label: 'Pro Export', value: 'pro', onClick: handlePro, disabled: true }
  ]}
/>
```

### ❌ DON'T

```tsx
// Don't use for unrelated actions
<SplitButton  // Use separate buttons instead
  label="Save"
  options={[
    { label: 'Delete', value: 'delete', onClick: handleDelete },  // Unrelated!
    { label: 'Share', value: 'share', onClick: handleShare }      // Unrelated!
  ]}
/>

// Don't use for single action
<SplitButton  // Use regular Button instead
  label="Save"
  onClick={handleSave}
  options={[]}  // Empty options!
/>

// Don't forget main action
<SplitButton  // Main button should do something!
  label="Select Action"
  onClick={() => {}}  // Empty handler!
  options={options}
/>

// Don't use too many options
<SplitButton
  options={[...20options]}  // Too many! Use Select/Dropdown instead
/>
```

---

## Use Cases

**Perfect for:**

- Save/Publish actions with variants
- Export/Download with format options
- Submit forms with different flows
- Actions with related alternatives
- Primary action + 2-5 secondary options

**Not suitable for:**

- Unrelated actions (use separate buttons)
- Single action (use regular Button)
- Many options (use Select dropdown)
- Navigation (use ButtonGroup or Tabs)

---

## Mobile Behavior

On screens < 768px:

- Buttons stack vertically
- Main button on top, toggle below
- Full-width layout
- Menu becomes full-width
- Touch-friendly spacing maintained

```css
@media (max-width: 768px) {
  /* Vertical stacking */
  .splitButton {
    flex-direction: column;
    width: 100%;
  }
}
```

---

## TypeScript

Full TypeScript support:

```tsx
import type { SplitButtonOption, SplitButtonProps } from '@spexop/react';

const options: SplitButtonOption[] = [
  { label: 'Option A', value: 'a', onClick: () => {} },
  { label: 'Option B', value: 'b', onClick: () => {} }
];

const MySplitButton: React.FC<SplitButtonProps> = (props) => {
  return <SplitButton {...props} />;
};
```

---

## Performance

- **requestAnimationFrame**: All interactions use RAF for smooth 60fps updates
- **Click Outside**: Efficient event listener cleanup
- **Keyboard Nav**: Optimized arrow key handling
- **GPU Acceleration**: CSS transforms for animations
- **Lazy Menu**: Dropdown only renders when open

**Bundle Size**: ~2.5KB (gzipped)

---

## Testing

### Interaction Testing

- [ ] Main button executes primary action
- [ ] Toggle button opens dropdown
- [ ] Menu items execute their onClick handlers
- [ ] Click outside closes dropdown
- [ ] Escape key closes dropdown and returns focus

### Keyboard Testing

- [ ] Tab navigates to buttons
- [ ] Enter/Space activates buttons
- [ ] Arrow Down opens dropdown
- [ ] Arrow Up/Down navigates menu items
- [ ] Enter selects menu item
- [ ] Escape closes dropdown

### Visual Testing

- [ ] Rounded corners correct (left for main, right for toggle)
- [ ] Border between buttons visible
- [ ] Hover states work on both buttons
- [ ] Menu positioning correct
- [ ] Mobile: Stacks vertically
- [ ] Primary variant uses palette color

### Accessibility Testing

- [ ] All buttons have accessible names
- [ ] aria-expanded toggles correctly
- [ ] Menu has role="menu"
- [ ] Menu items have role="menuitem"
- [ ] Focus indicators visible
- [ ] Screen reader announces states

---

## Design System Alignment

This component follows **Spexop's Refined Minimalism** principles:

1. ✅ **Border-based separation** - Clear border between buttons
2. ✅ **Typography-driven** - Semibold text, clear labels
3. ✅ **High-contrast** - Strong borders and colors
4. ✅ **Minimal decoration** - No heavy shadows, simple dropdown
5. ✅ **Primitives-First** - Uses spacing and color tokens
6. ✅ **Palette integration** - Primary variant adapts to themes

---

## Related Components

- **Button**: For single actions
- **ButtonGroup**: For independent multi-button toolbars
- **SegmentedButton**: For mutually exclusive selections
- **Select**: For many options in a compact dropdown

---

## License

MIT © Spexop Design System
