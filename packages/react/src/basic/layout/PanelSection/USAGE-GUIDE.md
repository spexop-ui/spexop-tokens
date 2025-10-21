# PanelSection - Usage Guide

**Component Version**: v1.0.0
**Last Updated**: October 21, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { PanelSection } from '@spexop/react';

function App() {
  return (
    <PanelSection title="Appearance">
      <p>Theme and visual settings go here</p>
    </PanelSection>
  );
}
```

## Common Use Cases

### Settings Panel Section

Organize settings into logical groups:

```tsx
import { PanelSection, SettingItem, Select, Toggle } from '@spexop/react';

function AppearanceSettings() {
  return (
    <PanelSection
      title="Appearance"
      description="Customize how the application looks"
    >
      <SettingItem
        label="Theme"
        description="Choose your preferred color theme"
      >
        <Select
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "auto", label: "Auto" }
          ]}
        />
      </SettingItem>
      
      <SettingItem
        label="Compact Mode"
        description="Reduce spacing for a denser interface"
      >
        <Toggle />
      </SettingItem>
    </PanelSection>
  );
}
```

### Form Section

Group related form fields:

```tsx
import { PanelSection, TextInput, TextArea } from '@spexop/react';

function ProfileForm() {
  return (
    <form>
      <PanelSection
        title="Basic Information"
        description="Your public profile information"
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
        />
        
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        
        <TextArea
          label="Bio"
          placeholder="Tell us about yourself"
          rows={4}
        />
      </PanelSection>
      
      <PanelSection
        title="Social Links"
        description="Connect your social media profiles"
      >
        <TextInput
          label="Twitter"
          placeholder="@username"
        />
        
        <TextInput
          label="GitHub"
          placeholder="github.com/username"
        />
      </PanelSection>
    </form>
  );
}
```

### Dashboard Section

Organize dashboard content:

```tsx
import { PanelSection, Card, Grid } from '@spexop/react';

function DashboardPanel() {
  return (
    <PanelSection
      title="Recent Activity"
      description="Your latest actions and updates"
    >
      <Grid columns={{ xs: 1, md: 2 }} gap={4}>
        <Card>Activity 1</Card>
        <Card>Activity 2</Card>
        <Card>Activity 3</Card>
        <Card>Activity 4</Card>
      </Grid>
    </PanelSection>
  );
}
```

### Nested Sections

Create hierarchical content structure:

```tsx
import { PanelSection, SettingsPanel } from '@spexop/react';

function AdvancedSettings() {
  return (
    <SettingsPanel>
      <PanelSection title="Privacy">
        <PanelSection
          title="Data Sharing"
          description="Control how your data is shared"
        >
          {/* Privacy settings */}
        </PanelSection>
        
        <PanelSection
          title="Visibility"
          description="Who can see your content"
        >
          {/* Visibility settings */}
        </PanelSection>
      </PanelSection>
    </SettingsPanel>
  );
}
```

## Features and Props

### Title

Section heading (required):

```tsx
<PanelSection title="Account Settings">
  {/* Content */}
</PanelSection>
```

### Description

Optional subtitle for context:

```tsx
<PanelSection
  title="Notifications"
  description="Manage how and when you receive notifications"
>
  {/* Content */}
</PanelSection>
```

### Custom Styling

Apply custom classes:

```tsx
<PanelSection
  title="Custom Section"
  className="my-custom-section"
  titleClassName="my-custom-title"
  contentClassName="my-custom-content"
>
  {/* Content */}
</PanelSection>
```

## Integration with Other Components

### With SettingsPanel

```tsx
import { SettingsPanel, PanelSection, SettingItem } from '@spexop/react';

function Settings() {
  return (
    <SettingsPanel>
      <PanelSection title="General">
        <SettingItem label="Language">
          <Select options={languages} />
        </SettingItem>
      </PanelSection>
      
      <PanelSection title="Advanced">
        <SettingItem label="Debug Mode">
          <Toggle />
        </SettingItem>
      </PanelSection>
    </SettingsPanel>
  );
}
```

### With SettingItem

```tsx
import { PanelSection, SettingItem, Select, Toggle, TextInput } from '@spexop/react';

function PreferencesPanel() {
  return (
    <PanelSection
      title="Preferences"
      description="Customize your experience"
    >
      <SettingItem
        label="Language"
        description="Choose your preferred language"
      >
        <Select options={languageOptions} />
      </SettingItem>
      
      <SettingItem
        label="Notifications"
        description="Receive email notifications"
      >
        <Toggle />
      </SettingItem>
      
      <SettingItem
        label="Display Name"
        description="How your name appears to others"
      >
        <TextInput placeholder="Enter display name" />
      </SettingItem>
    </PanelSection>
  );
}
```

### With Grid Layout

```tsx
import { PanelSection, Grid, Card } from '@spexop/react';

function GridSection() {
  return (
    <PanelSection
      title="Quick Actions"
      description="Common tasks and shortcuts"
    >
      <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap={4}>
        <Card>Action 1</Card>
        <Card>Action 2</Card>
        <Card>Action 3</Card>
      </Grid>
    </PanelSection>
  );
}
```

### With Stack Layout

```tsx
import { PanelSection, Stack, Button } from '@spexop/react';

function ActionSection() {
  return (
    <PanelSection
      title="Actions"
      description="Manage your account"
    >
      <Stack direction="vertical" gap={3}>
        <Button variant="outline">Export Data</Button>
        <Button variant="outline">Change Password</Button>
        <Button variant="ghost" style={{ color: 'var(--theme-error)' }}>
          Delete Account
        </Button>
      </Stack>
    </PanelSection>
  );
}
```

## Accessibility

### Semantic HTML

Uses semantic `<section>` element:

```tsx
<PanelSection title="Settings">
  {/* Renders as <section> with proper heading */}
</PanelSection>
```

### Heading Hierarchy

Uses `<h3>` for section titles:

```tsx
<PanelSection title="Preferences">
  {/* Title renders as <h3> */}
</PanelSection>
```

### Screen Readers

- Proper heading structure for navigation
- Descriptive titles and descriptions
- Semantic HTML for better context

## Best Practices

### DO

- Use clear, descriptive titles
- Provide helpful descriptions for complex sections
- Group related content together
- Keep sections focused on single topics
- Use consistent spacing and layout
- Make titles scannable (2-4 words)
- Use semantic HTML structure

### DON'T

- Don't create sections with no content
- Don't use overly long titles
- Don't nest sections too deeply (max 2-3 levels)
- Don't forget to provide titles
- Don't mix unrelated content in one section
- Don't skip description for complex sections

## Common Patterns

### Multi-Section Form

```tsx
function ProfileSettings() {
  return (
    <form>
      <PanelSection
        title="Personal Information"
        description="Your basic profile details"
      >
        <TextInput label="Name" />
        <TextInput label="Email" />
      </PanelSection>
      
      <PanelSection
        title="Security"
        description="Protect your account"
      >
        <TextInput label="Current Password" type="password" />
        <TextInput label="New Password" type="password" />
      </PanelSection>
      
      <PanelSection
        title="Preferences"
        description="Customize your experience"
      >
        <Select label="Language" options={languages} />
        <Toggle label="Email Notifications" />
      </PanelSection>
      
      <Stack direction="horizontal" gap={3} justify="end">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </Stack>
    </form>
  );
}
```

### Dashboard Layout

```tsx
function DashboardLayout() {
  return (
    <Grid columns={{ xs: 1, lg: 2 }} gap={6}>
      <PanelSection
        title="Overview"
        description="Key metrics at a glance"
      >
        <StatsCard value="1,234" label="Total Users" />
        <StatsCard value="5,678" label="Active Sessions" />
      </PanelSection>
      
      <PanelSection
        title="Recent Activity"
        description="Latest actions and updates"
      >
        <ActivityFeed items={recentActivity} />
      </PanelSection>
    </Grid>
  );
}
```

### Settings Panel

```tsx
function FullSettingsPanel() {
  return (
    <SettingsPanel>
      <PanelSection
        title="Account"
        description="Manage your account settings"
      >
        <SettingItem label="Email">
          <TextInput value={email} onChange={setEmail} />
        </SettingItem>
        <SettingItem label="Username">
          <TextInput value={username} onChange={setUsername} />
        </SettingItem>
      </PanelSection>
      
      <PanelSection
        title="Appearance"
        description="Customize how the app looks"
      >
        <SettingItem label="Theme">
          <Select value={theme} onChange={setTheme} options={themeOptions} />
        </SettingItem>
        <SettingItem label="Compact Mode">
          <Toggle checked={compact} onChange={setCompact} />
        </SettingItem>
      </PanelSection>
      
      <PanelSection
        title="Privacy"
        description="Control your privacy settings"
      >
        <SettingItem label="Profile Visibility">
          <Select value={visibility} onChange={setVisibility} options={visibilityOptions} />
        </SettingItem>
        <SettingItem label="Show Email">
          <Toggle checked={showEmail} onChange={setShowEmail} />
        </SettingItem>
      </PanelSection>
    </SettingsPanel>
  );
}
```

## Styling

### Theme Integration

PanelSection automatically uses theme tokens:

- Title color: `var(--theme-text)`
- Description color: `var(--theme-text-secondary)`
- Spacing: `var(--theme-spacing-*)`
- Font sizes: `var(--theme-font-size-*)`

### Custom Styling (className)

```tsx
<PanelSection
  title="Custom Section"
  className="my-section"
>
  {/* Content */}
</PanelSection>
```

```css
.my-section {
  padding: var(--theme-spacing-6);
  border: 2px solid var(--theme-border);
  border-radius: var(--theme-radius-lg);
}
```

### Title Styling

```tsx
<PanelSection
  title="Styled Title"
  titleClassName="my-title"
>
  {/* Content */}
</PanelSection>
```

```css
.my-title {
  color: var(--theme-primary);
  font-size: var(--theme-font-size-xl);
}
```

### Content Styling

```tsx
<PanelSection
  title="Styled Content"
  contentClassName="my-content"
>
  {/* Content */}
</PanelSection>
```

```css
.my-content {
  display: grid;
  gap: var(--theme-spacing-4);
}
```

## Performance Tips

- Keep section content focused and minimal
- Use lazy loading for complex nested content
- Avoid deeply nested sections
- Use Grid/Stack for efficient layouts

## Related Components

- **SettingsPanel**: Container for multiple PanelSections
- **SettingItem**: Individual settings within PanelSection
- **Card**: Alternative container component
- **Grid/Stack**: Layout components for organizing content

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Settings panels
- Form layouts
- Dashboard sections
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

PanelSection provides:

- Clear content organization
- Optional descriptions for context
- Flexible layout integration
- Semantic HTML structure
- Complete accessibility
- Theme integration
- Custom styling support

Perfect for:

- Settings panels
- Form sections
- Dashboard layouts
- Content organization
- Nested hierarchies

Built with Spexop design principles for a refined, accessible user experience.
