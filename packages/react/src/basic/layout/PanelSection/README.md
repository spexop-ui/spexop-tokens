# PanelSection Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A semantic section component for organizing content into distinct areas within panels, sidebars, or pages. Features optional title, border separation, and consistent padding.

## Features

- ✅ Optional section title
- ✅ Visual border separation
- ✅ Consistent padding
- ✅ Collapsible variant
- ✅ Theme-aware styling
- ✅ Flexible content area
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { PanelSection } from '@spexop/react';

function App() {
  return (
    <PanelSection title="Account Information">
      <p>Your account details go here...</p>
    </PanelSection>
  );
}
```

## Basic Usage

### Simple Section

```tsx
<PanelSection title="Profile">
  <TextInput label="Name" value={name} onChange={setName} />
  <TextInput label="Email" value={email} onChange={setEmail} />
</PanelSection>
```

### Without Title

```tsx
<PanelSection>
  <p>Content without a title</p>
</PanelSection>
```

### With Border

```tsx
<PanelSection title="Preferences" bordered={true}>
  <SettingItem label="Theme">
    <Select value={theme} onChange={setTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  </SettingItem>
</PanelSection>
```

## Common Patterns

### Settings Sections

```tsx
function SettingsPage() {
  return (
    <Container maxWidth="lg" padding={8}>
      <Stack direction="vertical" gap={6}>
        <PanelSection title="ACCOUNT" bordered={true}>
          <Stack direction="vertical" gap={4}>
            <TextInput label="Username" value={username} onChange={setUsername} />
            <TextInput label="Email" type="email" value={email} onChange={setEmail} />
          </Stack>
        </PanelSection>
        
        <PanelSection title="PREFERENCES" bordered={true}>
          <Stack direction="vertical" gap={4}>
            <SettingItem label="Language">
              <Select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </Select>
            </SettingItem>
            
            <SettingItem label="Notifications">
              <Toggle checked={notifications} onChange={setNotifications} />
            </SettingItem>
          </Stack>
        </PanelSection>
      </Stack>
    </Container>
  );
}
```

### Sidebar Sections

```tsx
function SidebarContent() {
  return (
    <div className="sidebar">
      <PanelSection title="NAVIGATION">
        <Stack direction="vertical" gap={2}>
          <NavLink href="/" label="Home" icon={Home} />
          <NavLink href="/projects" label="Projects" icon={Folder} />
          <NavLink href="/team" label="Team" icon={Users} />
        </Stack>
      </PanelSection>
      
      <PanelSection title="RECENT">
        <Stack direction="vertical" gap={2}>
          {recentItems.map(item => (
            <NavLink key={item.id} href={item.href} label={item.label} />
          ))}
        </Stack>
      </PanelSection>
    </div>
  );
}
```

### Form Sections

```tsx
<form>
  <PanelSection title="Personal Information" bordered={true}>
    <Grid columns={2} gap={4}>
      <GridItem>
        <TextInput label="First Name" value={firstName} onChange={setFirstName} required />
      </GridItem>
      <GridItem>
        <TextInput label="Last Name" value={lastName} onChange={setLastName} required />
      </GridItem>
    </Grid>
    <TextInput label="Email" type="email" value={email} onChange={setEmail} required />
  </PanelSection>
  
  <PanelSection title="Address" bordered={true}>
    <TextInput label="Street" value={street} onChange={setStreet} />
    <Grid columns={2} gap={4}>
      <GridItem>
        <TextInput label="City" value={city} onChange={setCity} />
      </GridItem>
      <GridItem>
        <TextInput label="ZIP" value={zip} onChange={setZip} />
      </GridItem>
    </Grid>
  </PanelSection>
  
  <Button type="submit" variant="primary">Submit</Button>
</form>
```

## Props

```typescript
interface PanelSectionProps {
  /** Section title */
  title?: string;
  /** Section content */
  children: React.ReactNode;
  /** Show border separator */
  bordered?: boolean;
  /** Collapsible section */
  collapsible?: boolean;
  /** Initially collapsed */
  defaultCollapsed?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple section wrapper
2. **Borders before shadows** - Clean border separation
3. **Typography before decoration** - Bold section titles
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Composition before complexity** - Flexible content container

## Accessibility

- ✅ Semantic HTML (`<section>` element)
- ✅ Proper heading hierarchy
- ✅ Logical content grouping
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Section` - Page-level sections
- `Card` - Content containers
- `Stack` - Vertical layout

## License

MIT
