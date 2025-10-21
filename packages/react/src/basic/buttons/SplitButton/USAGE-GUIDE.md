# SplitButton Component - Complete Usage Guide

**Component Version**: v0.1.0
**Last Updated**: October 20, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Menu Options](#menu-options)
6. [Variants and Styling](#variants-and-styling)
7. [Keyboard Navigation](#keyboard-navigation)
8. [Click Outside Behavior](#click-outside-behavior)
9. [Icon Integration](#icon-integration)
10. [Accessibility](#accessibility)
11. [Advanced Patterns](#advanced-patterns)
12. [Best Practices](#best-practices)
13. [API Reference](#api-reference)

## Overview

SplitButton combines a primary action button with a dropdown menu of related secondary actions. It provides a clean interface for grouping similar actions while highlighting the most common one.

### When to Use

Use SplitButton when you need:

- Primary action with related alternatives
- Save options (Save, Save As, Save Template)
- Download formats (Download PDF, Download CSV)
- Send actions (Send Email, Send SMS, Schedule)
- Export options (Export JSON, Export XML, Export CSV)
- Action with variations
- Common action with advanced options

### When Not to Use

Consider alternatives when you need:

- **Single action**: Use Button
- **Many unrelated actions**: Use Menu or Dropdown
- **Navigation**: Use Select or Dropdown
- **Equal priority actions**: Use ButtonGroup
- **Binary choice**: Use Toggle or Switch
- **Multiple selections**: Use CheckboxGroup in Menu

### Key Features

- Primary action button + dropdown toggle
- Full keyboard navigation
- Click outside to close
- Escape key support
- Arrow Up/Down navigation
- Disabled state support
- Multiple variants
- Icon support
- ARIA menu pattern
- Theme-aware styling

## Quick Start

### Basic Example

```tsx
import { SplitButton } from '@spexop/react';

function SaveButton() {
  return (
    <SplitButton
      label="Save"
      onClick={() => console.log('Save clicked')}
      options={[
        {
          label: 'Save as Draft',
          value: 'draft',
          onClick: () => console.log('Save as draft')
        },
        {
          label: 'Save as Template',
          value: 'template',
          onClick: () => console.log('Save as template')
        }
      ]}
    />
  );
}
```

### With Icon

```tsx
import { SplitButton } from '@spexop/react';
import { Download } from '@spexop/icons';

function DownloadButton() {
  return (
    <SplitButton
      label="Download"
      icon={<Download size={20} />}
      onClick={() => downloadPDF()}
      options={[
        {
          label: 'Download as CSV',
          value: 'csv',
          onClick: () => downloadCSV()
        },
        {
          label: 'Download as JSON',
          value: 'json',
          onClick: () => downloadJSON()
        }
      ]}
    />
  );
}
```

### With Variants

```tsx
import { SplitButton } from '@spexop/react';

function VariantExample() {
  return (
    <SplitButton
      label="Send"
      variant="success"
      onClick={() => sendEmail()}
      options={[
        {
          label: 'Send SMS',
          value: 'sms',
          onClick: () => sendSMS()
        },
        {
          label: 'Schedule Send',
          value: 'schedule',
          onClick: () => scheduleSend()
        }
      ]}
    />
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
# or
yarn add @spexop/react @spexop/icons @spexop/theme
```

### Import Styles

```tsx
import '@spexop/react/dist/index.css';
```

## Basic Usage

### Save Actions

```tsx
import { SplitButton } from '@spexop/react';

function SaveActions() {
  const handleSave = () => {
    // Save document
    console.log('Saving...');
  };

  return (
    <SplitButton
      label="Save"
      onClick={handleSave}
      options={[
        {
          label: 'Save as Draft',
          value: 'draft',
          onClick: () => console.log('Draft saved')
        },
        {
          label: 'Save as Template',
          value: 'template',
          onClick: () => console.log('Template saved')
        },
        {
          label: 'Save and Close',
          value: 'save-close',
          onClick: () => console.log('Saved and closed')
        }
      ]}
    />
  );
}
```

### Export Options

```tsx
import { SplitButton } from '@spexop/react';
import { Download } from '@spexop/icons';

function ExportOptions() {
  return (
    <SplitButton
      label="Export"
      icon={<Download size={20} />}
      onClick={() => exportData('pdf')}
      options={[
        {
          label: 'Export as CSV',
          value: 'csv',
          onClick: () => exportData('csv')
        },
        {
          label: 'Export as JSON',
          value: 'json',
          onClick: () => exportData('json')
        },
        {
          label: 'Export as XML',
          value: 'xml',
          onClick: () => exportData('xml')
        }
      ]}
    />
  );
}
```

### Send Actions

```tsx
import { SplitButton } from '@spexop/react';
import { Send } from '@spexop/icons';

function SendOptions() {
  return (
    <SplitButton
      label="Send Email"
      icon={<Send size={20} />}
      variant="primary"
      onClick={() => sendEmail()}
      options={[
        {
          label: 'Send SMS',
          value: 'sms',
          onClick: () => sendSMS()
        },
        {
          label: 'Send Push Notification',
          value: 'push',
          onClick: () => sendPush()
        },
        {
          label: 'Schedule Send',
          value: 'schedule',
          onClick: () => openScheduler()
        }
      ]}
    />
  );
}
```

## Menu Options

### With Icons

```tsx
import { SplitButton } from '@spexop/react';
import { FileText, Table, Code } from '@spexop/icons';

function ExportWithIcons() {
  return (
    <SplitButton
      label="Export PDF"
      onClick={() => exportPDF()}
      options={[
        {
          label: 'Export as CSV',
          value: 'csv',
          icon: <Table size={18} />,
          onClick: () => exportCSV()
        },
        {
          label: 'Export as JSON',
          value: 'json',
          icon: <Code size={18} />,
          onClick: () => exportJSON()
        },
        {
          label: 'Export as TXT',
          value: 'txt',
          icon: <FileText size={18} />,
          onClick: () => exportTXT()
        }
      ]}
    />
  );
}
```

### Disabled Options

```tsx
import { SplitButton } from '@spexop/react';

function DisabledOptions() {
  return (
    <SplitButton
      label="Publish"
      onClick={() => publish()}
      options={[
        {
          label: 'Publish to Staging',
          value: 'staging',
          onClick: () => publishStaging()
        },
        {
          label: 'Publish to Production',
          value: 'production',
          onClick: () => publishProduction(),
          disabled: !hasPermission  // Conditionally disabled
        }
      ]}
    />
  );
}
```

### Custom ARIA Labels

```tsx
import { SplitButton } from '@spexop/react';

function AccessibleSplitButton() {
  return (
    <SplitButton
      label="Download"
      aria-label="Download report in PDF format"
      aria-label-toggle="Show more download options"
      onClick={() => downloadPDF()}
      options={[
        {
          label: 'CSV',
          value: 'csv',
          'aria-label': 'Download report as CSV file',
          onClick: () => downloadCSV()
        },
        {
          label: 'JSON',
          value: 'json',
          'aria-label': 'Download report as JSON file',
          onClick: () => downloadJSON()
        }
      ]}
    />
  );
}
```

## Variants and Styling

### Button Variants

```tsx
import { SplitButton } from '@spexop/react';

function VariantExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Primary (default) */}
      <SplitButton
        label="Primary"
        variant="primary"
        onClick={handleAction}
        options={menuOptions}
      />

      {/* Success */}
      <SplitButton
        label="Publish"
        variant="success"
        onClick={handlePublish}
        options={publishOptions}
      />

      {/* Danger */}
      <SplitButton
        label="Delete"
        variant="danger"
        onClick={handleDelete}
        options={deleteOptions}
      />

      {/* Secondary */}
      <SplitButton
        label="Secondary"
        variant="secondary"
        onClick={handleAction}
        options={menuOptions}
      />
    </div>
  );
}
```

### Disabled State

```tsx
import { SplitButton } from '@spexop/react';

function DisabledExample() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <SplitButton
      label="Process"
      disabled={isProcessing}
      onClick={() => processData()}
      options={[
        {
          label: 'Process All',
          value: 'all',
          onClick: () => processAll()
        },
        {
          label: 'Process Selected',
          value: 'selected',
          onClick: () => processSelected()
        }
      ]}
    />
  );
}
```

## Keyboard Navigation

### Navigation Keys

Full keyboard support:

- **Tab**: Focus main button
- **Tab** (on main button): Focus dropdown toggle
- **Enter/Space** (on toggle): Open menu
- **Escape**: Close menu
- **Arrow Down**: Navigate to next menu item (when open)
- **Arrow Up**: Navigate to previous menu item (when open)
- **Enter** (on menu item): Activate item
- **Tab** (when menu open): Close menu and move focus

```tsx
// Keyboard accessible by default
<SplitButton
  label="Actions"
  onClick={handleMain}
  options={[
    { label: 'Option 1', value: '1', onClick: handle1 },
    { label: 'Option 2', value: '2', onClick: handle2 }
  ]}
/>
```

### Custom Keyboard Handling

```tsx
import { SplitButton } from '@spexop/react';
import { useRef, useCallback } from 'react';

function CustomKeyboardHandling() {
  const buttonRef = useRef(null);

  const handleMainAction = useCallback(() => {
    console.log('Main action triggered');
    // Perform action
    // Keep focus on button for keyboard users
    buttonRef.current?.focus();
  }, []);

  return (
    <div ref={buttonRef}>
      <SplitButton
        label="Save"
        onClick={handleMainAction}
        options={[...]}
      />
    </div>
  );
}
```

## Click Outside Behavior

### Auto-Close on Click Outside

```tsx
// Menu automatically closes when clicking outside
// This is handled internally by the component
<SplitButton
  label="Actions"
  onClick={handleMain}
  options={[...]}
/>
```

### Escape Key Closes Menu

```tsx
// Pressing Escape automatically closes the menu
// and returns focus to the toggle button
<SplitButton
  label="Actions"
  onClick={handleMain}
  options={[...]}
/>
```

## Icon Integration

### Main Button Icon

```tsx
import { SplitButton } from '@spexop/react';
import { Save, Download, Send } from '@spexop/icons';

function IconExamples() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <SplitButton
        label="Save"
        icon={<Save size={20} />}
        onClick={handleSave}
        options={saveOptions}
      />

      <SplitButton
        label="Download"
        icon={<Download size={20} />}
        onClick={handleDownload}
        options={downloadOptions}
      />

      <SplitButton
        label="Send"
        icon={<Send size={20} />}
        onClick={handleSend}
        options={sendOptions}
      />
    </div>
  );
}
```

### Menu Item Icons

```tsx
import { SplitButton } from '@spexop/react';
import { Mail, MessageSquare, Bell, Calendar } from '@spexop/icons';

function MenuWithIcons() {
  return (
    <SplitButton
      label="Send Email"
      icon={<Mail size={20} />}
      onClick={() => sendEmail()}
      options={[
        {
          label: 'Send SMS',
          value: 'sms',
          icon: <MessageSquare size={18} />,
          onClick: () => sendSMS()
        },
        {
          label: 'Send Notification',
          value: 'notification',
          icon: <Bell size={18} />,
          onClick: () => sendNotification()
        },
        {
          label: 'Schedule',
          value: 'schedule',
          icon: <Calendar size={18} />,
          onClick: () => openScheduler()
        }
      ]}
    />
  );
}
```

## Accessibility

### ARIA Menu Pattern

SplitButton implements the WAI-ARIA menu pattern:

```tsx
// Main button
<button type="button" aria-label="Save document">
  Save
</button>

// Toggle button
<button
  type="button"
  aria-label="Show more options"
  aria-expanded={isOpen}
  aria-haspopup="true"
>
  {/* ChevronDown icon */}
</button>

// Menu
<div role="menu">
  <button role="menuitem" aria-label="Save as draft">
    Save as Draft
  </button>
  <button role="menuitem" aria-label="Save as template">
    Save as Template
  </button>
</div>
```

### Focus Management

```tsx
import { SplitButton } from '@spexop/react';

function FocusManagement() {
  return (
    <SplitButton
      label="Actions"
      onClick={handleMain}
      options={[
        {
          label: 'Option 1',
          value: '1',
          onClick: () => {
            handleOption1();
            // Focus returns to toggle button after action
          }
        },
        {
          label: 'Option 2',
          value: '2',
          onClick: () => handleOption2()
        }
      ]}
    />
  );
}
```

### Screen Reader Support

Screen readers will announce:

- Main button label and role
- Toggle button label and expanded state
- Menu role and item count
- Menu item labels and positions
- Disabled state

```tsx
// Example announcements:
// "Save document, button"
// "Show more options, button, collapsed"
// (when opened) "Show more options, button, expanded"
// "Save as draft, menu item, 1 of 3"
```

## Advanced Patterns

### Async Actions

```tsx
import { SplitButton } from '@spexop/react';
import { useState } from 'react';

function AsyncActions() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveDocument();
      console.log('Saved successfully');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SplitButton
      label={saving ? 'Saving...' : 'Save'}
      disabled={saving}
      onClick={handleSave}
      options={[
        {
          label: 'Save as Draft',
          value: 'draft',
          disabled: saving,
          onClick: async () => {
            await saveDraft();
          }
        },
        {
          label: 'Save as Template',
          value: 'template',
          disabled: saving,
          onClick: async () => {
            await saveTemplate();
          }
        }
      ]}
    />
  );
}
```

### Confirmation Pattern

```tsx
import { SplitButton } from '@spexop/react';
import { useState } from 'react';

function ConfirmationPattern() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      performDelete();
    }
  };

  return (
    <SplitButton
      label="Delete"
      variant="danger"
      onClick={handleDelete}
      options={[
        {
          label: 'Delete Permanently',
          value: 'permanent',
          onClick: () => {
            if (window.confirm('This cannot be undone. Continue?')) {
              permanentDelete();
            }
          }
        },
        {
          label: 'Move to Trash',
          value: 'trash',
          onClick: () => moveToTrash()
        }
      ]}
    />
  );
}
```

### Dynamic Options

```tsx
import { SplitButton } from '@spexop/react';
import { useState, useEffect } from 'react';

function DynamicOptions() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchAvailableActions().then(actions => {
      setOptions(
        actions.map(action => ({
          label: action.label,
          value: action.id,
          onClick: () => performAction(action.id)
        }))
      );
    });
  }, []);

  return (
    <SplitButton
      label="Actions"
      onClick={() => performDefaultAction()}
      options={options}
    />
  );
}
```

### Permissions-Based Options

```tsx
import { SplitButton } from '@spexop/react';

function PermissionBasedOptions({ userPermissions }) {
  const options = [
    {
      label: 'Edit',
      value: 'edit',
      onClick: () => editItem(),
      disabled: !userPermissions.canEdit
    },
    {
      label: 'Delete',
      value: 'delete',
      onClick: () => deleteItem(),
      disabled: !userPermissions.canDelete
    },
    {
      label: 'Share',
      value: 'share',
      onClick: () => shareItem(),
      disabled: !userPermissions.canShare
    }
  ].filter(option => 
    // Only show options user has permission for
    option.value === 'edit' && userPermissions.canEdit ||
    option.value === 'delete' && userPermissions.canDelete ||
    option.value === 'share' && userPermissions.canShare
  );

  return (
    <SplitButton
      label="Actions"
      onClick={() => viewItem()}
      options={options}
    />
  );
}
```

## Best Practices

### 1. Primary Action is Most Common

```tsx
// ✅ GOOD - Most common action is primary
<SplitButton
  label="Save"  // Most common
  onClick={handleSave}
  options={[
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
    { label: 'Save as Template', value: 'template', onClick: handleTemplate }
  ]}
/>

// ❌ BAD - Rare action as primary
<SplitButton
  label="Save as Template"  // Rarely used
  onClick={handleTemplate}
  options={[
    { label: 'Save', value: 'save', onClick: handleSave },  // Common action buried
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft }
  ]}
/>
```

### 2. Related Actions Only

```tsx
// ✅ GOOD - All save-related actions
<SplitButton
  label="Save"
  onClick={handleSave}
  options={[
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
    { label: 'Save and Close', value: 'save-close', onClick: handleSaveClose }
  ]}
/>

// ❌ BAD - Unrelated actions
<SplitButton
  label="Save"
  onClick={handleSave}
  options={[
    { label: 'Delete', value: 'delete', onClick: handleDelete },  // Unrelated!
    { label: 'Settings', value: 'settings', onClick: handleSettings }  // Unrelated!
  ]}
/>
```

### 3. Clear Labels

```tsx
// ✅ GOOD - Descriptive labels
<SplitButton
  label="Download PDF"
  onClick={() => downloadPDF()}
  options={[
    { label: 'Download as CSV', value: 'csv', onClick: () => downloadCSV() },
    { label: 'Download as JSON', value: 'json', onClick: () => downloadJSON() }
  ]}
/>

// ❌ BAD - Vague labels
<SplitButton
  label="Download"
  onClick={() => downloadPDF()}
  options={[
    { label: 'CSV', value: 'csv', onClick: () => downloadCSV() },
    { label: 'JSON', value: 'json', onClick: () => downloadJSON() }
  ]}
/>
```

### 4. Limit Number of Options

```tsx
// ✅ GOOD - 2-5 options (ideal)
<SplitButton
  label="Export"
  onClick={handleExport}
  options={[
    { label: 'Export as CSV', value: 'csv', onClick: handleCSV },
    { label: 'Export as JSON', value: 'json', onClick: handleJSON },
    { label: 'Export as XML', value: 'xml', onClick: handleXML }
  ]}
/>

// ❌ BAD - Too many options (use Menu instead)
<SplitButton
  label="Export"
  onClick={handleExport}
  options={[
    // 10+ options...
  ]}
/>
```

### 5. Provide ARIA Labels

```tsx
// ✅ GOOD - Clear ARIA labels
<SplitButton
  label="Send"
  aria-label="Send email to recipient"
  aria-label-toggle="Show more send options"
  onClick={handleSend}
  options={[...]}
/>

// ❌ BAD - No ARIA labels
<SplitButton
  label="Send"
  onClick={handleSend}
  options={[...]}
/>
```

## API Reference

### SplitButtonProps

```typescript
interface SplitButtonProps {
  /** Main button label */
  label: string;
  
  /** Main button click handler */
  onClick: () => void;
  
  /** Menu options */
  options: SplitButtonOption[];
  
  /** Button variant */
  variant?: ButtonVariant;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Additional CSS class */
  className?: string;
  
  /** Main button icon */
  icon?: React.ReactNode;
  
  /** ARIA label for main button */
  "aria-label"?: string;
  
  /** ARIA label for toggle button */
  "aria-label-toggle"?: string;
}

interface SplitButtonOption {
  /** Option label */
  label: string;
  
  /** Option value */
  value: string;
  
  /** Option click handler */
  onClick: () => void;
  
  /** Optional icon */
  icon?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom ARIA label */
  "aria-label"?: string;
}
```

### Button Variants of the SplitButton Component

- `primary` (default)
- `secondary`
- `outline`
- `ghost`
- `danger`
- `success`
- `warning`
- `info`
- `neutral`

## Related Components

- **Button**: Single action button
- **ButtonGroup**: Multiple related buttons
- **Dropdown**: Menu without primary action
- **Select**: Form selection control

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~3KB gzipped
- **Click Outside**: Efficient event listeners
- **Keyboard**: Full navigation support
- **Accessible**: ARIA menu pattern

## License

MIT

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/spexop-ui/design-system/issues)
- [Documentation](https://spexop.com)
