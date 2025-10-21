# Toggle Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible toggle switch component for binary on/off states. Features smooth animations, multiple sizes, and full keyboard support.

## Features

- ✅ 3 sizes (sm, md, lg)
- ✅ Checked and unchecked states
- ✅ Disabled state support
- ✅ Keyboard navigation (Space, Enter)
- ✅ Smooth animations
- ✅ WCAG AA+ accessible
- ✅ Label association
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Toggle } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Toggle
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

## Sizes

### Small (sm)

Compact toggle for dense layouts.

```tsx
<Toggle
  size="sm"
  checked={value}
  onChange={setValue}
  label="Small toggle"
/>
```

### Medium (md) - Default

Standard toggle size.

```tsx
<Toggle
  size="md"
  checked={value}
  onChange={setValue}
  label="Medium toggle"
/>
```

### Large (lg)

Larger toggle for emphasis.

```tsx
<Toggle
  size="lg"
  checked={value}
  onChange={setValue}
  label="Large toggle"
/>
```

## States

### Checked

```tsx
<Toggle
  checked={true}
  onChange={handleChange}
  label="Enabled feature"
/>
```

### Unchecked

```tsx
<Toggle
  checked={false}
  onChange={handleChange}
  label="Disabled feature"
/>
```

### Disabled

```tsx
<Toggle
  checked={value}
  onChange={handleChange}
  disabled={true}
  label="Cannot change"
/>
```

## Common Use Cases

### Settings Panel

```tsx
function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <Stack direction="vertical" gap={4}>
      <Toggle
        checked={notifications}
        onChange={setNotifications}
        label="Push notifications"
      />
      <Toggle
        checked={darkMode}
        onChange={setDarkMode}
        label="Dark mode"
      />
      <Toggle
        checked={autoSave}
        onChange={setAutoSave}
        label="Auto-save"
      />
    </Stack>
  );
}
```

### With Description

```tsx
<SettingItem
  label="Beta Features"
  description="Enable experimental features (may be unstable)"
>
  <Toggle
    checked={betaEnabled}
    onChange={setBetaEnabled}
  />
</SettingItem>
```

### Controlled Form

```tsx
function Form() {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: false,
  });

  return (
    <form>
      <Toggle
        checked={formData.emailNotifications}
        onChange={(checked) =>
          setFormData({ ...formData, emailNotifications: checked })
        }
        label="Email notifications"
      />
      <Toggle
        checked={formData.smsNotifications}
        onChange={(checked) =>
          setFormData({ ...formData, smsNotifications: checked })
        }
        label="SMS notifications"
      />
      <Toggle
        checked={formData.newsletter}
        onChange={(checked) =>
          setFormData({ ...formData, newsletter: checked })
        }
        label="Subscribe to newsletter"
      />
    </form>
  );
}
```

## Props

```typescript
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean border-based design
2. **Typography before decoration** - Clear labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML with proper ARIA roles
- ✅ Keyboard navigation (Space/Enter to toggle)
- ✅ Screen reader announcements
- ✅ Focus indicators
- ✅ Label association
- ✅ Disabled state properly communicated
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Space` - Toggle the switch
- `Enter` - Toggle the switch
- `Tab` - Move focus to/from toggle

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Checkbox` - For multi-select options
- `RadioGroup` - For single-select options
- `Select` - For dropdown selections
- `SettingItem` - For settings layout

## License

MIT
