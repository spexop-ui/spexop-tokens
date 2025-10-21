# FileUpload

A drag-and-drop file upload component following "The Spexop Way".

## Features

- Drag and drop file upload
- Click to browse files
- Multiple file selection
- File size validation
- File type filtering
- File list preview with remove option
- Size variants (sm, md, lg)
- Error and validation states
- Custom icons
- Theme-aware styling
- Type-safe with TypeScript
- Both controlled and uncontrolled modes

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { FileUpload } from '@spexop/react';

function App() {
  const handleFileChange = (files) => {
    if (files) {
      console.log('Uploaded files:', Array.from(files));
    }
  };

  return (
    <FileUpload
      onChange={handleFileChange}
      label="Upload files"
    />
  );
}
```

## Multiple Files

```tsx
<FileUpload
  onChange={handleFileChange}
  label="Upload documents"
  multiple
/>
```

## File Type Restrictions

```tsx
{/* Images only */}
<FileUpload
  onChange={handleFileChange}
  accept="image/*"
  label="Upload images"
/>

{/* Specific file types */}
<FileUpload
  onChange={handleFileChange}
  accept=".pdf,.doc,.docx"
  label="Upload documents"
/>
```

## File Size Limit

```tsx
<FileUpload
  onChange={handleFileChange}
  maxSize={5 * 1024 * 1024} // 5MB
  label="Upload files (max 5MB)"
  helpText="Maximum file size: 5MB"
/>
```

## Size Variants

```tsx
<FileUpload size="sm" {...props} />
<FileUpload size="md" {...props} /> {/* Default */}
<FileUpload size="lg" {...props} />
```

## With Validation

```tsx
const [files, setFiles] = useState(null);

<FileUpload
  onChange={setFiles}
  required
  error={!files ? 'Please upload at least one file' : ''}
  helpText="Select files to upload"
/>
```

## Controlled Component

```tsx
const [files, setFiles] = useState<File[]>([]);

const handleChange = (fileList: FileList | null) => {
  if (fileList) {
    setFiles(Array.from(fileList));
  }
};

const handleRemove = (index: number) => {
  setFiles(files.filter((_, i) => i !== index));
};

<FileUpload
  onChange={handleChange}
  files={files}
  onRemoveFile={handleRemove}
  label="Upload files"
/>
```

## Custom Upload Text

```tsx
<FileUpload
  onChange={handleFileChange}
  uploadText="Drop your files here"
  dragText="or click to browse"
/>
```

## Without Preview

```tsx
<FileUpload
  onChange={handleFileChange}
  showPreview={false}
  label="Upload files"
/>
```

## Custom Icon

```tsx
import { Icon } from '@spexop/react';
import { Upload } from '@spexop/icons';

<FileUpload
  onChange={handleFileChange}
  icon={<Icon name="Upload" size={48} />}
  label="Upload files"
/>
```

## With Drop Callback

```tsx
<FileUpload
  onChange={handleFileChange}
  onDrop={(files) => {
    console.log('Files dropped:', files);
  }}
  label="Drop files here"
/>
```

## Design Principles Applied

### 1. Primitives before patterns

Built on native file input element, enhanced with drag-and-drop functionality.

### 2. Borders before shadows

Uses dashed 2px borders for the drop zone, minimal shadow for elevation.

### 3. Typography before decoration

Font weight (semibold) for file names and primary text. No color-only hierarchy.

### 4. Tokens before magic numbers

All spacing, colors, and sizing use design tokens from `@spexop/theme`.

### 5. Composition before complexity

Simple file input combined with drag-drop area and file list. No over-engineering.

### 6. Standards before frameworks

Native File API for cross-platform compatibility.

### 7. Accessibility before aesthetics

- Full keyboard navigation
- Focus management and visible focus indicators
- Screen reader support with ARIA labels
- Required field indicator
- Error announcements

## Keyboard Navigation

- **Enter/Space**: Open file browser
- **Tab**: Navigate between elements
- **Escape**: Cancel file selection (browser default)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(files: FileList \| null) => void` | - | Change handler (required) |
| `label` | `string` | - | Label for the file upload |
| `disabled` | `boolean` | `false` | Whether file upload is disabled |
| `required` | `boolean` | `false` | Whether field is required |
| `error` | `string` | - | Error message to display |
| `helpText` | `string` | - | Help text below file upload |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `accept` | `string` | - | Accepted file types (e.g., "image/*", ".pdf") |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `maxSize` | `number` | - | Maximum file size in bytes |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id attribute |
| `icon` | `ReactNode` | - | Custom icon for upload area |
| `showPreview` | `boolean` | `true` | Show file list preview |
| `uploadText` | `string` | `"Click to upload"` | Text for upload area |
| `dragText` | `string` | `"or drag and drop"` | Text for drag area |
| `onDrop` | `(files: FileList) => void` | - | Callback when files are dropped |
| `files` | `File[]` | - | Current files (controlled mode) |
| `onRemoveFile` | `(index: number) => void` | - | Remove file handler (controlled mode) |

## File Size Constants

```typescript
// Common file size limits
const KB = 1024;
const MB = 1024 * KB;
const GB = 1024 * MB;

// Examples
const maxSize5MB = 5 * MB;
const maxSize10MB = 10 * MB;
const maxSize100MB = 100 * MB;
```

## Accept Patterns

```typescript
// Common accept patterns
const acceptImages = "image/*";
const acceptPDFs = ".pdf";
const acceptDocuments = ".pdf,.doc,.docx,.txt";
const acceptSpreadsheets = ".xls,.xlsx,.csv";
const acceptAudio = "audio/*";
const acceptVideo = "video/*";
```

## Examples

### Image Upload with Preview

```tsx
const [imageFiles, setImageFiles] = useState<File[]>([]);

const handleImageUpload = (fileList: FileList | null) => {
  if (fileList) {
    setImageFiles(Array.from(fileList));
  }
};

<FileUpload
  onChange={handleImageUpload}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  label="Upload images"
  helpText="PNG, JPG, GIF up to 5MB"
/>
```

### Document Upload

```tsx
<FileUpload
  onChange={handleDocumentUpload}
  accept=".pdf,.doc,.docx"
  multiple
  maxSize={10 * 1024 * 1024}
  label="Upload documents"
  helpText="PDF, DOC, DOCX up to 10MB"
/>
```

### Avatar Upload (Single File)

```tsx
<FileUpload
  onChange={handleAvatarUpload}
  accept="image/*"
  multiple={false}
  maxSize={2 * 1024 * 1024}
  size="sm"
  label="Upload avatar"
  helpText="Square image, max 2MB"
/>
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
- Clear file type and size information

## Related Components

- **TextInput** - Basic text input
- **Button** - Action buttons

## License

MIT License - Part of the Spexop Design System
