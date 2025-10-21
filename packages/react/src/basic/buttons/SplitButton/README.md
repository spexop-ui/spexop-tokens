# SplitButton Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A button with a primary action and a dropdown menu for additional related actions. Perfect for providing default action with alternatives.

## Features

- ✅ Primary action button
- ✅ Dropdown menu for alternatives
- ✅ 3 variants (primary, secondary, outline)
- ✅ 3 sizes (sm, md, lg)
- ✅ Keyboard navigation
- ✅ Disabled state
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SplitButton } from '@spexop/react';

function App() {
  return (
    <SplitButton
      label="Save"
      onClick={handleSave}
      menuItems={[
        { label: 'Save and Close', onClick: handleSaveAndClose },
        { label: 'Save as Draft', onClick: handleSaveDraft },
        { label: 'Save as Template', onClick: handleSaveTemplate },
      ]}
    />
  );
}
```

## Variants

### Primary

```tsx
<SplitButton
  label="Publish"
  variant="primary"
  onClick={handlePublish}
  menuItems={[
    { label: 'Publish Now', onClick: handlePublishNow },
    { label: 'Schedule', onClick: handleSchedule },
    { label: 'Save as Draft', onClick: handleDraft },
  ]}
/>
```

### Secondary

```tsx
<SplitButton
  label="Export"
  variant="secondary"
  onClick={handleExport}
  menuItems={[
    { label: 'Export as PDF', onClick: () => handleExport('pdf') },
    { label: 'Export as CSV', onClick: () => handleExport('csv') },
    { label: 'Export as JSON', onClick: () => handleExport('json') },
  ]}
/>
```

### Outline

```tsx
<SplitButton
  label="Share"
  variant="outline"
  onClick={handleShare}
  menuItems={[
    { label: 'Copy Link', onClick: handleCopyLink },
    { label: 'Email', onClick: handleEmail },
    { label: 'Social Media', onClick: handleSocial },
  ]}
/>
```

## Sizes

### Small (sm)

```tsx
<SplitButton
  label="Actions"
  size="sm"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

### Medium (md) - Default

```tsx
<SplitButton
  label="Actions"
  size="md"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

### Large (lg)

```tsx
<SplitButton
  label="Actions"
  size="lg"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

## Common Patterns

### Save Options

```tsx
function DocumentEditor() {
  const handleSave = () => {
    saveDocument();
  };

  const saveMenuItems = [
    {
      label: 'Save and Continue',
      onClick: () => {
        saveDocument();
        // Stay on page
      }
    },
    {
      label: 'Save and Close',
      onClick: () => {
        saveDocument();
        navigate('/documents');
      }
    },
    {
      label: 'Save as Copy',
      onClick: () => {
        saveDocumentCopy();
      }
    },
    {
      label: 'Save as Template',
      onClick: () => {
        saveAsTemplate();
      }
    },
  ];

  return (
    <div className="editor-toolbar">
      <SplitButton
        label="Save"
        variant="primary"
        onClick={handleSave}
        menuItems={saveMenuItems}
      />
    </div>
  );
}
```

### Download Options

```tsx
function DownloadButton({ file }) {
  const downloadMenuItems = [
    {
      label: 'Download Original',
      onClick: () => download(file, 'original')
    },
    {
      label: 'Download Optimized',
      onClick: () => download(file, 'optimized')
    },
    {
      label: 'Download Thumbnail',
      onClick: () => download(file, 'thumbnail')
    },
  ];

  return (
    <SplitButton
      label="Download"
      onClick={() => download(file, 'original')}
      menuItems={downloadMenuItems}
    />
  );
}
```

### Create Actions

```tsx
function CreateButton() {
  const createMenuItems = [
    {
      label: 'New Document',
      icon: FileText,
      onClick: () => createNew('document')
    },
    {
      label: 'New Spreadsheet',
      icon: Table,
      onClick: () => createNew('spreadsheet')
    },
    {
      label: 'New Presentation',
      icon: Presentation,
      onClick: () => createNew('presentation')
    },
    {
      label: 'From Template',
      icon: Copy,
      onClick: () => showTemplates()
    },
  ];

  return (
    <SplitButton
      label="Create"
      variant="primary"
      onClick={() => createNew('document')}
      menuItems={createMenuItems}
    />
  );
}
```

### Email Actions

```tsx
function EmailActions() {
  const emailMenuItems = [
    { label: 'Reply', onClick: handleReply },
    { label: 'Reply All', onClick: handleReplyAll },
    { label: 'Forward', onClick: handleForward },
    { divider: true },
    { label: 'Mark as Read', onClick: handleMarkRead },
    { label: 'Archive', onClick: handleArchive },
  ];

  return (
    <SplitButton
      label="Reply"
      onClick={handleReply}
      menuItems={emailMenuItems}
    />
  );
}
```

## Props

```typescript
interface SplitButtonProps {
  /** Primary button label */
  label: string;
  /** Primary button click handler */
  onClick: () => void;
  /** Menu items for dropdown */
  menuItems: MenuItem[];
  /** Visual variant */
  variant?: "primary" | "secondary" | "outline";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS class */
  className?: string;
}

interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean button separation
2. **Typography before decoration** - Clear action labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard support

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper ARIA roles
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Focus management
- ✅ Screen reader support
- ✅ Menu state announced
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Tab` - Focus button/menu toggle
- `Enter/Space` - Activate focused button
- `Arrow Down` - Open menu (when dropdown focused)
- `Arrow Up/Down` - Navigate menu items
- `Enter/Space` - Select menu item
- `Escape` - Close menu

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Button` - Regular button
- `ButtonGroup` - Button grouping
- `Dropdown` - Menu component
- `IconButton` - Icon-only button

## Best Practices

1. **Primary action should be most common** - Default to the most frequent use case
2. **Limit menu items** - 4-7 items ideal
3. **Group related actions** - Use dividers for organization
4. **Clear labels** - Action verbs work best
5. **Consistent placement** - Keep menu position predictable

## License

MIT
