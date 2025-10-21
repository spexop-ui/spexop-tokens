# Modal

An accessible modal dialog component that overlays content with proper focus management.

## Features

- Focus trap (keyboard navigation stays within modal)
- Body scroll lock when open
- Escape key to close
- Click outside to close
- Screen reader accessible with ARIA attributes
- Smooth animations
- Multiple size variants
- Portal rendering (outside DOM hierarchy)
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { useState } from "react";
import { Modal } from "@spexop/react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="My Modal"
      >
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
```

## With Footer

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </>
  }
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

## Size Variants

```tsx
{/* Small */}
<Modal size="sm" isOpen={isOpen} onClose={onClose} title="Small">
  <p>Small modal</p>
</Modal>

{/* Medium (default) */}
<Modal size="md" isOpen={isOpen} onClose={onClose} title="Medium">
  <p>Medium modal</p>
</Modal>

{/* Large */}
<Modal size="lg" isOpen={isOpen} onClose={onClose} title="Large">
  <p>Large modal</p>
</Modal>

{/* Extra Large */}
<Modal size="xl" isOpen={isOpen} onClose={onClose} title="Extra Large">
  <p>Extra large modal</p>
</Modal>

{/* Full Screen */}
<Modal size="full" isOpen={isOpen} onClose={onClose} title="Full Screen">
  <p>Full screen modal</p>
</Modal>
```

## Without Close Button

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="No Close Button"
  showCloseButton={false}
>
  <p>Must use footer buttons to close</p>
</Modal>
```

## Prevent Backdrop Close

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Force Action"
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <p>Must use buttons to close</p>
</Modal>
```

## Custom Initial Focus

```tsx
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Form Modal"
      initialFocusRef={inputRef}
    >
      <input ref={inputRef} type="text" placeholder="Focus here first" />
    </Modal>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Whether the modal is open |
| `onClose` | `() => void` | required | Callback when modal should close |
| `title` | `React.ReactNode` | - | Modal title |
| `children` | `React.ReactNode` | required | Modal content |
| `footer` | `React.ReactNode` | - | Footer content (buttons) |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Size variant |
| `closeOnBackdropClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `showCloseButton` | `boolean` | `true` | Show close button in header |
| `className` | `string` | - | Additional CSS class for modal |
| `backdropClassName` | `string` | - | Additional CSS class for backdrop |
| `id` | `string` | auto-generated | ID for accessibility |
| `initialFocusRef` | `React.RefObject<HTMLElement>` | - | Initial focus element |
| `preventBodyScroll` | `boolean` | `true` | Prevent body scroll when open |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear hierarchy with bold title
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with focus management

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Title linked with `aria-labelledby`
- Focus trapped within modal when open
- Body scroll locked when open
- Escape key closes modal
- Close button has `aria-label`
- Keyboard navigation support
- Screen reader friendly

## Keyboard Navigation

- **Tab**: Navigate through focusable elements in modal
- **Shift + Tab**: Navigate backwards
- **Escape**: Close modal (if enabled)
- **Enter**: Activate focused button

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Drawer - For side panel overlays
- Tooltip - For small contextual information
- Popover - For interactive floating content
- CommandPalette - For command search interface
