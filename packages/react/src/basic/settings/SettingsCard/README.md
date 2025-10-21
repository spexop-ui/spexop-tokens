# SettingsCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A card-based container for organizing settings into distinct sections. Features clear typography hierarchy, visual separation, and consistent layout.

## Features

- ✅ Section title
- ✅ Optional description
- ✅ Visual separator line
- ✅ Content area for settings
- ✅ Clean card design
- ✅ Theme-aware styling
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { SettingsCard, SettingItem, Toggle } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <SettingsCard
      title="NOTIFICATIONS"
      description="Manage your notification preferences"
    >
      <SettingItem label="Email notifications">
        <Toggle
          checked={notifications}
          onChange={setNotifications}
        />
      </SettingItem>
    </SettingsCard>
  );
}
```

## Basic Usage

### Simple Section

```tsx
<SettingsCard title="APPEARANCE">
  <SegmentedControl
    value={theme}
    onChange={setTheme}
    options={[
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'auto', label: 'Auto' },
    ]}
  />
</SettingsCard>
```

### With Description

```tsx
<SettingsCard
  title="PRIVACY"
  description="Control who can see your information"
>
  <Stack direction="vertical" gap={3}>
    <SettingItem label="Profile visibility">
      <Select value={visibility} onChange={handleChange}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </Select>
    </SettingItem>
  </Stack>
</SettingsCard>
```

### Multiple Settings

```tsx
<SettingsCard
  title="PREFERENCES"
  description="Customize your experience"
>
  <Stack direction="vertical" gap={4}>
    <SettingItem
      label="Show tooltips"
      description="Display helpful hints"
    >
      <Toggle checked={showTooltips} onChange={setShowTooltips} />
    </SettingItem>
    
    <SettingItem
      label="Auto-save"
      description="Save work automatically"
    >
      <Toggle checked={autoSave} onChange={setAutoSave} />
    </SettingItem>
    
    <SettingItem
      label="Default view"
      description="Choose your starting view"
    >
      <Select value={defaultView} onChange={handleViewChange}>
        <option value="list">List</option>
        <option value="grid">Grid</option>
      </Select>
    </SettingItem>
  </Stack>
</SettingsCard>
```

## Common Patterns

### Complete Settings Page

```tsx
function SettingsPage() {
  return (
    <Container maxWidth="lg" padding={8}>
      <h1>Settings</h1>
      
      <Stack direction="vertical" gap={6}>
        <SettingsCard
          title="THEME"
          description="Choose your preferred appearance"
        >
          <SegmentedControl
            value={theme}
            onChange={setTheme}
            options={themeOptions}
          />
        </SettingsCard>
        
        <SettingsCard
          title="NOTIFICATIONS"
          description="Manage how you receive notifications"
        >
          <Stack direction="vertical" gap={3}>
            <SettingItem label="Email notifications">
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
            </SettingItem>
            <SettingItem label="Push notifications">
              <Toggle checked={pushNotifs} onChange={setPushNotifs} />
            </SettingItem>
          </Stack>
        </SettingsCard>
        
        <SettingsCard
          title="ACCOUNT"
          description="Manage your account settings"
        >
          <Stack direction="vertical" gap={3}>
            <SettingItem label="Email">
              <TextInput value={email} onChange={handleEmailChange} />
            </SettingItem>
            <SettingItem label="Language">
              <Select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </Select>
            </SettingItem>
          </Stack>
        </SettingsCard>
      </Stack>
    </Container>
  );
}
```

## Props

```typescript
interface SettingsCardProps {
  /** Section title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Settings content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean separator line
3. **Typography before decoration** - Bold title for hierarchy
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Composition before complexity** - Simple container

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Clear visual grouping
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SettingItem` - Individual setting rows
- `SettingsPanel` - Settings drawer
- `Card` - Base card component

## License

MIT
