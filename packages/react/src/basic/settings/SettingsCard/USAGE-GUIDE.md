# SettingsCard Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Advanced Patterns](#advanced-patterns)
- [Layout Strategies](#layout-strategies)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

SettingsCard is a card-based container component designed to organize settings into distinct, visually separated sections. It provides clear typography hierarchy, visual separation with borders, and consistent layout structure.

### When to Use SettingsCard

- Grouping related settings into sections
- Creating organized settings pages
- Displaying configuration options
- Building preference panels
- Organizing user profile settings

### When NOT to Use SettingsCard

- Single isolated settings (use SettingItem directly)
- General card layouts (use Card component)
- Data display (use Card or data components)
- Complex forms (use form components)

## Core Concepts

### Section Title

The title prop creates a clear section heading using uppercase text:

```tsx
<SettingsCard title="NOTIFICATIONS">
  {/* Settings content */}
</SettingsCard>
```

### Optional Description

Description provides context about the settings section:

```tsx
<SettingsCard
  title="PRIVACY"
  description="Control who can see your information"
>
  {/* Settings content */}
</SettingsCard>
```

### Visual Separator

SettingsCard includes a built-in separator line between the header and content, following the "Borders before shadows" principle.

### Content Area

The children prop accepts any React content, typically SettingItem components or other settings controls.

## Basic Usage

### Simple Section

```tsx
import { SettingsCard, SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function ThemeCard() {
  const [theme, setTheme] = useState('light');
  
  return (
    <SettingsCard title="THEME">
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
  );
}
```

### With Description

```tsx
<SettingsCard
  title="APPEARANCE"
  description="Customize how the application looks and feels"
>
  <SegmentedControl
    value={colorScheme}
    onChange={setColorScheme}
    options={colorOptions}
  />
</SettingsCard>
```

### With Multiple Settings

```tsx
import { SettingsCard, SettingItem, Toggle, Stack } from '@spexop/react';

function NotificationsCard() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [smsNotifs, setSmsNotifs] = useState(false);

  return (
    <SettingsCard
      title="NOTIFICATIONS"
      description="Manage how you receive notifications"
    >
      <Stack direction="vertical" gap={4}>
        <SettingItem
          label="Email notifications"
          description="Receive updates via email"
        >
          <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
        </SettingItem>
        
        <SettingItem
          label="Push notifications"
          description="Get real-time alerts on your device"
        >
          <Toggle checked={pushNotifs} onChange={setPushNotifs} />
        </SettingItem>
        
        <SettingItem
          label="SMS notifications"
          description="Receive text messages for important updates"
        >
          <Toggle checked={smsNotifs} onChange={setSmsNotifs} />
        </SettingItem>
      </Stack>
    </SettingsCard>
  );
}
```

### With Different Controls

```tsx
<SettingsCard
  title="PREFERENCES"
  description="Customize your experience"
>
  <Stack direction="vertical" gap={4}>
    <SettingItem label="Language">
      <Select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </Select>
    </SettingItem>
    
    <SettingItem label="Timezone">
      <Select value={timezone} onChange={handleTimezoneChange}>
        <option value="UTC">UTC</option>
        <option value="EST">Eastern Time</option>
        <option value="PST">Pacific Time</option>
      </Select>
    </SettingItem>
    
    <SettingItem label="Text size">
      <Slider
        value={textSize}
        onChange={setTextSize}
        min={100}
        max={200}
        showValue={true}
        formatValue={(val) => `${val}%`}
      />
    </SettingItem>
  </Stack>
</SettingsCard>
```

## Advanced Patterns

### Multiple Cards in Page

```tsx
import { Container, Stack, SettingsCard } from '@spexop/react';

function SettingsPage() {
  return (
    <Container maxWidth="lg" padding={6}>
      <h1>Settings</h1>
      
      <Stack direction="vertical" gap={6}>
        <SettingsCard
          title="ACCOUNT"
          description="Manage your account information"
        >
          {/* Account settings */}
        </SettingsCard>
        
        <SettingsCard
          title="PRIVACY"
          description="Control your privacy settings"
        >
          {/* Privacy settings */}
        </SettingsCard>
        
        <SettingsCard
          title="NOTIFICATIONS"
          description="Manage notification preferences"
        >
          {/* Notification settings */}
        </SettingsCard>
      </Stack>
    </Container>
  );
}
```

### Conditional Settings

```tsx
function ConditionalCard() {
  const [enabled, setEnabled] = useState(false);

  return (
    <SettingsCard
      title="ADVANCED OPTIONS"
      description="Advanced configuration options"
    >
      <Stack direction="vertical" gap={4}>
        <SettingItem label="Enable advanced features">
          <Toggle checked={enabled} onChange={setEnabled} />
        </SettingItem>
        
        {enabled && (
          <>
            <SettingItem label="Debug mode">
              <Toggle checked={debugMode} onChange={setDebugMode} />
            </SettingItem>
            
            <SettingItem label="Developer tools">
              <Toggle checked={devTools} onChange={setDevTools} />
            </SettingItem>
          </>
        )}
      </Stack>
    </SettingsCard>
  );
}
```

### With Custom Content

```tsx
<SettingsCard
  title="API KEYS"
  description="Manage your API keys and tokens"
>
  <Stack direction="vertical" gap={4}>
    <div>
      <p>Your API Key:</p>
      <CodeBlock language="text" code={apiKey} />
    </div>
    
    <Button variant="outline" onClick={regenerateKey}>
      Regenerate Key
    </Button>
  </Stack>
</SettingsCard>
```

### Nested Settings Groups

```tsx
<SettingsCard
  title="SECURITY"
  description="Manage security and authentication"
>
  <Stack direction="vertical" gap={5}>
    <div>
      <h4>Two-Factor Authentication</h4>
      <Stack direction="vertical" gap={3}>
        <SettingItem label="Enable 2FA">
          <Toggle checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
        </SettingItem>
        
        {twoFactorEnabled && (
          <SettingItem label="2FA Method">
            <Select value={twoFactorMethod} onChange={handleMethodChange}>
              <option value="sms">SMS</option>
              <option value="app">Authenticator App</option>
              <option value="email">Email</option>
            </Select>
          </SettingItem>
        )}
      </Stack>
    </div>
    
    <div>
      <h4>Password Settings</h4>
      <Stack direction="vertical" gap={3}>
        <SettingItem label="Require password change">
          <Toggle checked={requireChange} onChange={setRequireChange} />
        </SettingItem>
        
        <SettingItem label="Password expiry (days)">
          <TextInput
            type="number"
            value={expiryDays}
            onChange={handleExpiryChange}
          />
        </SettingItem>
      </Stack>
    </div>
  </Stack>
</SettingsCard>
```

### With Action Buttons

```tsx
<SettingsCard
  title="DANGER ZONE"
  description="Irreversible actions"
>
  <Stack direction="vertical" gap={4}>
    <div>
      <p>Delete your account and all associated data</p>
      <Button variant="destructive" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </div>
    
    <div>
      <p>Reset all settings to default values</p>
      <Button variant="outline" onClick={handleReset}>
        Reset Settings
      </Button>
    </div>
  </Stack>
</SettingsCard>
```

## Layout Strategies

### Grid Layout for Cards

```tsx
<Grid columns={{ base: 1, md: 2 }} gap={6}>
  <SettingsCard title="THEME">
    <SegmentedControl options={themeOptions} />
  </SettingsCard>
  
  <SettingsCard title="LANGUAGE">
    <Select options={languageOptions} />
  </SettingsCard>
  
  <SettingsCard title="TIMEZONE">
    <Select options={timezoneOptions} />
  </SettingsCard>
  
  <SettingsCard title="TEXT SIZE">
    <Slider min={100} max={200} />
  </SettingsCard>
</Grid>
```

### Tabbed Settings with Cards

```tsx
function TabbedSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Container maxWidth="lg" padding={6}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab value="general">General</Tab>
          <Tab value="privacy">Privacy</Tab>
          <Tab value="security">Security</Tab>
        </TabList>
        
        <TabPanel value="general">
          <Stack direction="vertical" gap={6}>
            <SettingsCard title="APPEARANCE">
              {/* Appearance settings */}
            </SettingsCard>
            
            <SettingsCard title="PREFERENCES">
              {/* Preference settings */}
            </SettingsCard>
          </Stack>
        </TabPanel>
        
        <TabPanel value="privacy">
          <SettingsCard title="PRIVACY CONTROLS">
            {/* Privacy settings */}
          </SettingsCard>
        </TabPanel>
        
        <TabPanel value="security">
          <SettingsCard title="SECURITY OPTIONS">
            {/* Security settings */}
          </SettingsCard>
        </TabPanel>
      </Tabs>
    </Container>
  );
}
```

### Sidebar Layout

```tsx
<Grid columns={{ base: 1, lg: 12 }} gap={6}>
  <GridItem span={{ base: 1, lg: 3 }}>
    <nav>
      <h3>Settings</h3>
      <ul>
        <li>Account</li>
        <li>Privacy</li>
        <li>Notifications</li>
      </ul>
    </nav>
  </GridItem>
  
  <GridItem span={{ base: 1, lg: 9 }}>
    <Stack direction="vertical" gap={6}>
      <SettingsCard title="ACCOUNT">
        {/* Account settings */}
      </SettingsCard>
      
      <SettingsCard title="PRIVACY">
        {/* Privacy settings */}
      </SettingsCard>
    </Stack>
  </GridItem>
</Grid>
```

## Real-World Examples

### Complete User Settings Page

```tsx
import { Container, Stack, SettingsCard, SettingItem, Toggle, Select, TextInput, Slider } from '@spexop/react';
import { useState } from 'react';

function UserSettingsPage() {
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    bio: '',
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    textSize: 100,
    timezone: 'UTC',
  });

  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showProfile: true,
    allowMessages: true,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  return (
    <Container maxWidth="lg" padding={6}>
      <h1>Account Settings</h1>
      
      <Stack direction="vertical" gap={6}>
        {/* Profile Section */}
        <SettingsCard
          title="PROFILE"
          description="Manage your public profile information"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Display name"
              description="How others see your name"
            >
              <TextInput
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                placeholder="Enter your name"
              />
            </SettingItem>
            
            <SettingItem
              label="Email address"
              description="Your contact email"
            >
              <TextInput
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="email@example.com"
              />
            </SettingItem>
            
            <SettingItem
              label="Bio"
              description="Tell others about yourself"
            >
              <TextArea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Write a short bio"
                rows={3}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>

        {/* Preferences Section */}
        <SettingsCard
          title="PREFERENCES"
          description="Customize your experience"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Theme"
              description="Choose your color theme"
            >
              <Select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </Select>
            </SettingItem>
            
            <SettingItem
              label="Language"
              description="Choose your preferred language"
            >
              <Select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Select>
            </SettingItem>
            
            <SettingItem
              label="Text size"
              description="Adjust text size for better readability"
            >
              <Slider
                value={preferences.textSize}
                onChange={(val) => setPreferences({ ...preferences, textSize: val })}
                min={100}
                max={200}
                step={10}
                showValue={true}
                formatValue={(val) => `${val}%`}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>

        {/* Privacy Section */}
        <SettingsCard
          title="PRIVACY"
          description="Control who can see your information"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Show email address"
              description="Display email on your public profile"
            >
              <Toggle
                checked={privacy.showEmail}
                onChange={(val) => setPrivacy({ ...privacy, showEmail: val })}
              />
            </SettingItem>
            
            <SettingItem
              label="Public profile"
              description="Make your profile visible to everyone"
            >
              <Toggle
                checked={privacy.showProfile}
                onChange={(val) => setPrivacy({ ...privacy, showProfile: val })}
              />
            </SettingItem>
            
            <SettingItem
              label="Allow direct messages"
              description="Let other users message you directly"
            >
              <Toggle
                checked={privacy.allowMessages}
                onChange={(val) => setPrivacy({ ...privacy, allowMessages: val })}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>

        {/* Notifications Section */}
        <SettingsCard
          title="NOTIFICATIONS"
          description="Manage how you receive notifications"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Email notifications"
              description="Receive updates via email"
            >
              <Toggle
                checked={notifications.email}
                onChange={(val) => setNotifications({ ...notifications, email: val })}
              />
            </SettingItem>
            
            <SettingItem
              label="Push notifications"
              description="Get real-time alerts"
            >
              <Toggle
                checked={notifications.push}
                onChange={(val) => setNotifications({ ...notifications, push: val })}
              />
            </SettingItem>
            
            <SettingItem
              label="SMS notifications"
              description="Receive text messages"
            >
              <Toggle
                checked={notifications.sms}
                onChange={(val) => setNotifications({ ...notifications, sms: val })}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>
      </Stack>
    </Container>
  );
}
```

### Application Settings

```tsx
function AppSettings() {
  return (
    <Container maxWidth="lg" padding={6}>
      <h1>Application Settings</h1>
      
      <Stack direction="vertical" gap={6}>
        <SettingsCard
          title="GENERAL"
          description="Basic application settings"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem label="Auto-save">
              <Toggle checked={autoSave} onChange={setAutoSave} />
            </SettingItem>
            
            <SettingItem label="Show tooltips">
              <Toggle checked={showTooltips} onChange={setShowTooltips} />
            </SettingItem>
          </Stack>
        </SettingsCard>
        
        <SettingsCard
          title="PERFORMANCE"
          description="Optimize performance settings"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem label="Enable hardware acceleration">
              <Toggle checked={hwAccel} onChange={setHwAccel} />
            </SettingItem>
            
            <SettingItem label="Cache size (MB)">
              <Slider
                value={cacheSize}
                onChange={setCacheSize}
                min={100}
                max={1000}
                step={100}
                showValue={true}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>
        
        <SettingsCard
          title="ACCESSIBILITY"
          description="Accessibility features"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem label="High contrast mode">
              <Toggle checked={highContrast} onChange={setHighContrast} />
            </SettingItem>
            
            <SettingItem label="Reduce motion">
              <Toggle checked={reduceMotion} onChange={setReduceMotion} />
            </SettingItem>
            
            <SettingItem label="Screen reader optimizations">
              <Toggle checked={screenReader} onChange={setScreenReader} />
            </SettingItem>
          </Stack>
        </SettingsCard>
      </Stack>
    </Container>
  );
}
```

## Common Pitfalls

### 1. Overusing Cards

**Problem:**

```tsx
// Too many cards for simple settings
<SettingsCard title="ENABLE FEATURE">
  <Toggle checked={enabled} onChange={setEnabled} />
</SettingsCard>

<SettingsCard title="ANOTHER FEATURE">
  <Toggle checked={another} onChange={setAnother} />
</SettingsCard>
```

**Solution:**

```tsx
// Group related settings in one card
<SettingsCard title="FEATURES">
  <Stack direction="vertical" gap={4}>
    <SettingItem label="Enable feature">
      <Toggle checked={enabled} onChange={setEnabled} />
    </SettingItem>
    
    <SettingItem label="Another feature">
      <Toggle checked={another} onChange={setAnother} />
    </SettingItem>
  </Stack>
</SettingsCard>
```

### 2. Missing Descriptions

**Problem:**

```tsx
// No context for what this section contains
<SettingsCard title="ADVANCED">
  {/* Complex settings without explanation */}
</SettingsCard>
```

**Solution:**

```tsx
// Provide helpful description
<SettingsCard
  title="ADVANCED"
  description="Advanced configuration options for power users"
>
  {/* Complex settings */}
</SettingsCard>
```

### 3. Improper Nesting

**Problem:**

```tsx
// Cards nested inside cards
<SettingsCard title="OUTER">
  <SettingsCard title="INNER">
    {/* Content */}
  </SettingsCard>
</SettingsCard>
```

**Solution:**

```tsx
// Use Stack to organize cards
<Stack direction="vertical" gap={6}>
  <SettingsCard title="FIRST SECTION">
    {/* Content */}
  </SettingsCard>
  
  <SettingsCard title="SECOND SECTION">
    {/* Content */}
  </SettingsCard>
</Stack>
```

### 4. Inconsistent Spacing

**Problem:**

```tsx
// Random spacing between items
<SettingsCard title="SETTINGS">
  <div>
    <SettingItem label="One">
      <Toggle />
    </SettingItem>
  </div>
  <br />
  <div>
    <SettingItem label="Two">
      <Toggle />
    </SettingItem>
  </div>
</SettingsCard>
```

**Solution:**

```tsx
// Use Stack for consistent spacing
<SettingsCard title="SETTINGS">
  <Stack direction="vertical" gap={4}>
    <SettingItem label="One">
      <Toggle />
    </SettingItem>
    
    <SettingItem label="Two">
      <Toggle />
    </SettingItem>
  </Stack>
</SettingsCard>
```

### 5. Missing Semantic Headings

**Problem:**

```tsx
// Title is not a proper heading
<SettingsCard title="ACCOUNT">
  <div style={{ fontWeight: 'bold' }}>Profile</div>
  {/* Settings */}
</SettingsCard>
```

**Solution:**

```tsx
// Use proper heading hierarchy
<SettingsCard title="ACCOUNT">
  <Stack direction="vertical" gap={5}>
    <div>
      <h4>Profile</h4>
      <Stack direction="vertical" gap={3}>
        {/* Profile settings */}
      </Stack>
    </div>
  </Stack>
</SettingsCard>
```

## Accessibility

### Semantic Structure

SettingsCard uses semantic HTML with proper heading hierarchy:

```tsx
// Title is rendered as h3
<SettingsCard title="NOTIFICATIONS">
  {/* Content */}
</SettingsCard>

// Results in:
// <h3>NOTIFICATIONS</h3>
```

### Visual Hierarchy

The card uses typography and borders (not colors) to create hierarchy:

- **Title**: Uppercase, bold, high contrast
- **Description**: Regular weight, secondary color (7:1 contrast)
- **Separator**: 2px border for clear visual separation

### Screen Reader Support

All text content is properly announced:

```tsx
<SettingsCard
  title="PRIVACY"
  description="Control your privacy settings"
>
  <SettingItem label="Show email">
    <Toggle checked={showEmail} onChange={setShowEmail} />
  </SettingItem>
</SettingsCard>

// Screen reader announces:
// "Privacy. Control your privacy settings. Show email, toggle button, on/off"
```

### High Contrast Mode

SettingsCard adapts to high contrast preferences:

```css
@media (prefers-contrast: high) {
  /* Border width increases to 3px */
  /* Title font weight increases to 700 */
}
```

## API Reference

### Props

```typescript
interface SettingsCardProps {
  /** Section title (rendered as uppercase) */
  title: string;
  
  /** Optional description text */
  description?: string;
  
  /** Settings content */
  children: React.ReactNode;
  
  /** Additional CSS class */
  className?: string;
}
```

### Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple card container built on basic primitives
2. **Borders before shadows** - 2px borders for separation, no box shadows
3. **Typography before decoration** - Bold uppercase title for hierarchy
4. **Tokens before magic numbers** - Uses spacing tokens (spacing-4, spacing-5)
5. **Accessibility before aesthetics** - Proper heading structure, high contrast

### Theme Tokens Used

**Spacing:**

- `--theme-spacing-2` (8px) - Title margin
- `--theme-spacing-4` (16px) - Header padding bottom
- `--theme-spacing-5` (20px) - Header/content padding, separator margin

**Typography:**

- `--theme-font-family` - Font family
- `--theme-font-weight-bold` (700) - Title weight
- `--theme-font-weight-normal` (400) - Description weight
- `--theme-text` - Title color
- `--theme-text-secondary` - Description color

**Borders:**

- `--theme-border-width` (2px) - Border and separator width
- `--theme-border-strong` - Border color
- `--theme-radius-subtle` (8px) - Border radius

**Colors:**

- `--theme-surface` - Background color
- `--theme-border-strong` - Border and separator color

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

### Related Components

- `SettingItem` - Individual setting rows
- `SettingsPanel` - Full settings drawer
- `Card` - Base card component
- `Stack` - Vertical spacing for settings
- `Container` - Page-level container

## License

MIT
