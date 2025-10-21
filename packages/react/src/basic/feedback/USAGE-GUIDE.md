# Feedback Components Usage Guide

Comprehensive guide for using Spexop feedback components effectively in your applications.

## Table of Contents

- [Overview](#overview)
- [When to Use Each Component](#when-to-use-each-component)
- [Component Comparison Matrix](#component-comparison-matrix)
- [Design Principles](#design-principles)
- [Common Patterns](#common-patterns)
- [Real-World Examples](#real-world-examples)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Performance Considerations](#performance-considerations)
- [Testing Strategies](#testing-strategies)
- [Troubleshooting](#troubleshooting)

## Overview

Feedback components provide visual and semantic feedback to users about system status, user actions, and application state. The Spexop feedback suite includes four core components:

- **Alert** - Persistent, prominent messages for important information
- **Toast** - Temporary, non-intrusive notifications
- **Progress** - Visual indication of task completion percentage
- **Spinner** - Indication of indeterminate loading state

## When to Use Each Component

### Alert

Use Alert when:

- Information is critical and requires user attention
- Content should persist until explicitly dismissed
- Multiple pieces of information need to be displayed together
- User needs time to read and understand the message
- Supplementary actions (buttons, links) are needed

**Examples:**

- Form validation errors at the top of a form
- System-wide announcements or maintenance notices
- Permission warnings or security alerts
- Success confirmation with additional details

### Toast

Use Toast when:

- Feedback is brief and doesn't require immediate action
- Message should auto-dismiss after a short duration
- Multiple notifications might appear in sequence
- User focus shouldn't be interrupted
- Confirmation of completed actions is needed

**Examples:**

- "Item added to cart"
- "Settings saved successfully"
- "File uploaded"
- "Copied to clipboard"

### Progress

Use Progress when:

- Task completion percentage is known and measurable
- User needs to understand how much work remains
- Process takes more than a few seconds
- Multiple steps are involved with trackable progress
- File uploads, downloads, or data processing

**Examples:**

- File upload progress
- Multi-step form completion
- Data import/export operations
- Profile completion percentage

### Spinner

Use Spinner when:

- Task duration is unknown (indeterminate)
- Loading time is expected to be short (< 10 seconds)
- Space is limited for feedback indicators
- Simple "working" indication is sufficient

**Examples:**

- Button loading states
- Data fetching from API
- Form submission
- Search operations
- Content lazy loading

## Component Comparison Matrix

| Feature | Alert | Toast | Progress | Spinner |
|---------|-------|-------|----------|---------|
| **Persistence** | Until dismissed | Auto-dismiss | Until complete | Until complete |
| **Positioning** | Inline in content | Fixed viewport | Inline or fixed | Inline or fixed |
| **Interactivity** | Can have actions | Optional action | Read-only | None |
| **Visibility** | Always visible | Slides in/out | Always visible | Always visible |
| **Semantic Meaning** | Status with context | Brief notification | Measurable progress | Loading state |
| **Best For** | Critical info | Quick feedback | Known duration | Unknown duration |
| **Accessibility Role** | alert/status | status | progressbar | status |
| **User Action Required** | Sometimes | Rarely | No | No |

## Design Principles

### Following "The Spexop Way"

All feedback components adhere to Spexop's 7 core principles:

1. **Primitives before patterns** - Components are foundational elements that compose into larger patterns
2. **Borders before shadows** - Alert and Toast use strong 2px semantic borders
3. **Typography before decoration** - Font weight creates hierarchy, not color alone
4. **Tokens before magic numbers** - All styling uses design tokens
5. **Composition before complexity** - Simple APIs that combine effectively
6. **Standards before frameworks** - Built on web standards with proper ARIA
7. **Accessibility before aesthetics** - WCAG AA+ compliance throughout

### Color Semantics

Feedback components use semantic colors consistently:

- **Info (Blue)** - General information, tips, guidance
- **Success (Green)** - Completed actions, positive outcomes
- **Warning (Yellow)** - Caution, potential issues, important notices
- **Error (Red)** - Failures, errors, critical problems

### Timing Guidelines

- **Toast duration**: 3-7 seconds for simple messages
- **Loading feedback**: Show after 300ms delay to avoid flashing
- **Progress updates**: Update at least every 500ms for smoothness
- **Alert persistence**: Until user dismisses or context changes

## Common Patterns

### Form Validation Feedback

```tsx
import { Alert } from "@spexop/react";

function FormWithValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Submit form...
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <Alert 
          variant="error" 
          title="Please fix the following errors:"
          dismissible
          onDismiss={() => setErrors([])}
        >
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      
      {/* Form fields */}
    </form>
  );
}
```

### File Upload with Progress

```tsx
import { Progress, Toast } from "@spexop/react";
import { useState } from "react";

function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload with progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          setUploadProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        setIsUploading(false);
        setShowSuccess(true);
      });

      xhr.open('POST', '/api/upload');
      xhr.send(file);
    } catch (error) {
      setIsUploading(false);
      // Handle error
    }
  };

  return (
    <>
      {isUploading && (
        <Progress
          value={uploadProgress}
          showLabel
          label={`Uploading: ${Math.round(uploadProgress)}%`}
          color={uploadProgress === 100 ? "success" : "primary"}
          variant="animated"
        />
      )}

      <Toast
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="File uploaded successfully!"
        variant="success"
        duration={3000}
      />
    </>
  );
}
```

### Loading States with Spinner

```tsx
import { Spinner } from "@spexop/react";

function DataFetchingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      await fetchData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleFetch} 
      disabled={isLoading}
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {isLoading && <Spinner size="sm" color="white" label="Loading data..." />}
      <span>{isLoading ? 'Loading...' : 'Fetch Data'}</span>
    </button>
  );
}
```

### Toast Notification System

```tsx
import { Toast } from "@spexop/react";
import { useState, useCallback } from "react";

interface ToastData {
  id: number;
  message: string;
  variant: "info" | "success" | "warning" | "error";
  duration?: number;
}

function useToastManager() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((
    message: string, 
    variant: ToastData["variant"] = "info",
    duration = 5000
  ) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant, duration }]);
  }, []);

  const closeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, closeToast };
}

function App() {
  const { toasts, showToast, closeToast } = useToastManager();

  const handleAction = async () => {
    try {
      await performAction();
      showToast("Action completed successfully!", "success");
    } catch (error) {
      showToast("Action failed. Please try again.", "error");
    }
  };

  return (
    <>
      <button onClick={handleAction}>Perform Action</button>

      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          isOpen={true}
          onClose={() => closeToast(toast.id)}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          position={index === 0 ? "bottom-right" : "bottom-right"}
        />
      ))}
    </>
  );
}
```

### Multi-Step Process with Progress

```tsx
import { Progress, Alert } from "@spexop/react";
import { useState } from "react";

interface Step {
  id: string;
  label: string;
  completed: boolean;
}

function MultiStepProcess() {
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', label: 'Account Details', completed: false },
    { id: '2', label: 'Payment Info', completed: false },
    { id: '3', label: 'Confirmation', completed: false },
  ]);

  const completedSteps = steps.filter(s => s.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div>
      <Alert variant="info" showIcon={false}>
        Complete all steps to finish your registration
      </Alert>

      <Progress
        value={progress}
        showLabel
        label={`Step ${completedSteps + 1} of ${steps.length}`}
        color={progress === 100 ? "success" : "primary"}
        size="lg"
      />

      {/* Render steps */}
    </div>
  );
}
```

### Contextual Loading States

```tsx
import { Spinner, Alert } from "@spexop/react";

function DataDisplay() {
  const { data, isLoading, error } = useQuery('data');

  if (error) {
    return (
      <Alert variant="error" title="Failed to load data">
        {error.message}
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '16px',
        padding: '32px'
      }}>
        <Spinner size="lg" label="Loading data..." />
        <p>Please wait while we fetch your data...</p>
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

### Undo Action with Toast

```tsx
import { Toast } from "@spexop/react";
import { useState } from "react";

function ItemList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleDelete = (item: string) => {
    setDeletedItem(item);
    setItems(prev => prev.filter(i => i !== item));
    setShowToast(true);
  };

  const handleUndo = () => {
    if (deletedItem) {
      setItems(prev => [...prev, deletedItem]);
      setDeletedItem(null);
      setShowToast(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setDeletedItem(null);
  };

  return (
    <>
      <ul>
        {items.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => handleDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>

      <Toast
        isOpen={showToast}
        onClose={handleCloseToast}
        message="Item deleted"
        variant="info"
        action={{
          label: "Undo",
          onClick: handleUndo,
        }}
        duration={5000}
      />
    </>
  );
}
```

## Real-World Examples

### E-Commerce Checkout Flow

```tsx
import { Alert, Progress, Toast, Spinner } from "@spexop/react";

function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];
  const progress = (currentStep / steps.length) * 100;

  const handleNext = async () => {
    const stepErrors = validateCurrentStep();
    
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep === steps.length) {
      setIsProcessing(true);
      try {
        await processOrder();
        setShowSuccess(true);
      } catch (error) {
        setErrors(['Payment processing failed. Please try again.']);
      } finally {
        setIsProcessing(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
      setErrors([]);
    }
  };

  return (
    <div>
      {errors.length > 0 && (
        <Alert 
          variant="error" 
          title="Please correct the following:"
          dismissible
          onDismiss={() => setErrors([])}
        >
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Progress
        value={progress}
        showLabel
        label={`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]}`}
        color="primary"
        size="lg"
      />

      {/* Render current step content */}

      <button onClick={handleNext} disabled={isProcessing}>
        {isProcessing && <Spinner size="sm" color="white" />}
        {isProcessing ? 'Processing...' : currentStep === steps.length ? 'Place Order' : 'Next'}
      </button>

      <Toast
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Order placed successfully! Confirmation email sent."
        variant="success"
        duration={7000}
      />
    </div>
  );
}
```

### Dashboard with Real-Time Updates

```tsx
import { Alert, Spinner } from "@spexop/react";

function Dashboard() {
  const { data, isLoading, isError, refetch } = useRealTimeData();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  if (isError) {
    return (
      <Alert 
        variant="error" 
        title="Connection Lost"
        dismissible={false}
      >
        Unable to fetch latest data. 
        <button onClick={() => refetch()}>Retry Connection</button>
      </Alert>
    );
  }

  return (
    <div>
      <Alert variant="info" showIcon={false}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isLoading && <Spinner size="sm" />}
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </Alert>

      {/* Dashboard content */}
    </div>
  );
}
```

### Form with Autosave

```tsx
import { Toast } from "@spexop/react";
import { useState, useEffect } from "react";

function AutosaveForm() {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (Object.keys(formData).length > 0) {
        setIsSaving(true);
        try {
          await saveForm(formData);
          setShowSaved(true);
        } catch (error) {
          setShowError(true);
        } finally {
          setIsSaving(false);
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <>
      {/* Form fields */}

      <Toast
        isOpen={showSaved}
        onClose={() => setShowSaved(false)}
        message="Changes saved"
        variant="success"
        duration={2000}
        position="bottom-right"
      />

      <Toast
        isOpen={showError}
        onClose={() => setShowError(false)}
        message="Failed to save changes"
        variant="error"
        duration={5000}
        position="bottom-right"
      />
    </>
  );
}
```

## Accessibility Guidelines

### WCAG AA+ Compliance

All feedback components meet WCAG AA+ standards:

- **Color Contrast**: 7:1 for text, 3:1 for UI elements
- **Focus Indicators**: 2px outlines with 2px offset
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Screen Reader Support**: Proper ARIA attributes and roles

### ARIA Roles and Attributes

**Alert Component:**

```tsx
<Alert role="alert" aria-live="assertive">
  // role="alert" for critical messages
  // role="status" for less urgent info
  // aria-live determines announcement priority
</Alert>
```

**Toast Component:**

```tsx
<Toast>
  // role="status" - non-intrusive updates
  // aria-live="polite" - announced when convenient
  // aria-atomic="true" - announces complete message
</Toast>
```

**Progress Component:**

```tsx
<Progress value={50}>
  // role="progressbar" - assistive tech recognizes as progress
  // aria-valuemin="0" - minimum value
  // aria-valuemax="100" - maximum value
  // aria-valuenow="50" - current value
  // aria-label - describes what's progressing
</Progress>
```

**Spinner Component:**

```tsx
<Spinner>
  // role="status" - loading indicator
  // aria-live="polite" - announces loading state
  // aria-label - describes what's loading
  // Hidden text fallback for screen readers
</Spinner>
```

### Keyboard Navigation

- **Alert dismiss button**: Tab to focus, Enter/Space to dismiss
- **Toast close button**: Tab to focus, Enter/Space to close
- **Toast action button**: Tab to focus, Enter/Space to activate
- **Progress and Spinner**: Non-interactive, no keyboard handling needed

### Screen Reader Announcements

**Best Practices:**

- Use `role="alert"` for critical, immediate announcements
- Use `role="status"` for non-critical updates
- Provide descriptive labels for all loading states
- Ensure messages are complete and contextual
- Avoid redundant announcements

**Example:**

```tsx
// Good: Descriptive and contextual
<Spinner label="Loading user profile data..." />

// Bad: Generic and vague
<Spinner label="Loading..." />
```

### Reduced Motion Support

All animated feedback components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable animations */
  .progress-bar { animation: none; }
  .spinner { animation-duration: 2s; }
  .toast { transition: none; }
}
```

## Performance Considerations

### Toast Management

Limit concurrent toasts to prevent overwhelming users:

```tsx
const MAX_TOASTS = 3;

function useToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    setToasts(prev => {
      const newToasts = [...prev, toast];
      // Keep only the most recent MAX_TOASTS
      return newToasts.slice(-MAX_TOASTS);
    });
  };

  return { toasts, showToast };
}
```

### Progress Update Frequency

Update progress at reasonable intervals to avoid performance issues:

```tsx
// Good: Update every 500ms
const throttledUpdate = throttle(updateProgress, 500);

// Bad: Update on every byte transferred
xhr.upload.onprogress = (e) => {
  updateProgress(e.loaded / e.total * 100); // Too frequent!
};
```

### Spinner Visibility Delay

Prevent "flashing" spinners for fast operations:

```tsx
function useDelayedLoading(isLoading: boolean, delay = 300) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSpinner(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [isLoading, delay]);

  return showSpinner;
}

// Usage
function DataFetcher() {
  const { isLoading } = useQuery();
  const showSpinner = useDelayedLoading(isLoading);

  return showSpinner ? <Spinner /> : <Data />;
}
```

### Alert Memory Management

Clean up dismissed alerts to prevent memory leaks:

```tsx
function AlertContainer() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          dismissible
          onDismiss={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
    </>
  );
}
```

## Testing Strategies

### Unit Testing

Test individual component behavior:

```tsx
import { render, screen } from '@testing-library/react';
import { Alert } from '@spexop/react';

describe('Alert', () => {
  it('should render message', () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should call onDismiss when dismissed', async () => {
    const onDismiss = vi.fn();
    const { user } = render(
      <Alert dismissible onDismiss={onDismiss}>Message</Alert>
    );
    
    await user.click(screen.getByLabelText('Dismiss alert'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
```

### Integration Testing

Test component interactions:

```tsx
import { render, screen, waitFor } from '@testing-library/react';

describe('Form with feedback', () => {
  it('should show error alert on validation failure', async () => {
    const { user } = render(<FormWithValidation />);
    
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/please fix/i)).toBeInTheDocument();
  });

  it('should show success toast on submission', async () => {
    const { user } = render(<FormWithValidation />);
    
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
    });
  });
});
```

### Accessibility Testing

Verify ARIA attributes and keyboard navigation:

```tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Alert accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Alert>Message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', async () => {
    const onDismiss = vi.fn();
    const { user } = render(
      <Alert dismissible onDismiss={onDismiss}>Message</Alert>
    );
    
    await user.tab();
    expect(screen.getByLabelText('Dismiss alert')).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(onDismiss).toHaveBeenCalled();
  });
});
```

### Visual Regression Testing

Test visual appearance:

```tsx
import { render } from '@testing-library/react';

describe('Alert visual', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Alert variant="success" title="Success">
        Operation completed successfully
      </Alert>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Troubleshooting

### Common Issues

### Common Issues of Accessibility

#### **Issue: Toast not appearing**

```tsx
// Problem: isOpen is not managed correctly
<Toast isOpen={showToast} onClose={() => {}} message="Test" />

// Solution: Use state management
const [showToast, setShowToast] = useState(false);
<Toast 
  isOpen={showToast} 
  onClose={() => setShowToast(false)} 
  message="Test" 
/>
```

#### **Common Issues of Accessibility**

#### **Issue: Progress bar not updating**

```tsx
// Problem: Value not changing
<Progress value={50} />

// Solution: Use state to track progress
const [progress, setProgress] = useState(0);
<Progress value={progress} />
```

#### **Issue: Spinner causing layout shifts**

```tsx
// Problem: Spinner adds/removes space
{isLoading && <Spinner />}

// Solution: Reserve space for spinner
<div style={{ minHeight: '24px' }}>
  {isLoading && <Spinner />}
</div>
```

#### **Issue: Alert not dismissed**

```tsx
// Problem: No state management
<Alert dismissible>Message</Alert>

// Solution: Control visibility with state
const [showAlert, setShowAlert] = useState(true);
{showAlert && (
  <Alert dismissible onDismiss={() => setShowAlert(false)}>
    Message
  </Alert>
)}
```

#### **Issue: Multiple toasts overlapping**

```tsx
// Problem: All toasts at same position
toasts.map(toast => (
  <Toast position="bottom-right" ... />
))

// Solution: Use toast manager with stacking
// Or limit to one toast at a time
```

### Debug Tips

1. **Check console for errors** - Missing props or invalid values
2. **Verify ARIA attributes** - Use browser dev tools
3. **Test with screen reader** - Ensure announcements work
4. **Check z-index stacking** - Toast should appear above other content
5. **Verify timing** - Use React DevTools to check state updates
6. **Test reduced motion** - Ensure animations respect preferences
7. **Validate color contrast** - Use accessibility checker tools

### Browser Support

All feedback components work in:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

For older browsers, ensure polyfills for:

- CSS custom properties
- Intersection Observer (for lazy loading)
- ResizeObserver (for responsive behavior)

## Migration Guide

### From Other Design Systems

**Material-UI:**

```tsx
// Material-UI
<Alert severity="success">Message</Alert>
<Snackbar open={open} message="Message" />
<CircularProgress />
<LinearProgress value={50} />

// Spexop
<Alert variant="success">Message</Alert>
<Toast isOpen={open} message="Message" onClose={handleClose} />
<Spinner />
<Progress value={50} />
```

**Chakra UI:**

```tsx
// Chakra UI
<Alert status="success">Message</Alert>
<Toast title="Message" status="success" />
<Spinner />
<Progress value={50} />

// Spexop (nearly identical!)
<Alert variant="success">Message</Alert>
<Toast message="Message" variant="success" />
<Spinner />
<Progress value={50} />
```

**Ant Design:**

```tsx
// Ant Design
<Alert type="success" message="Message" />
<message.success("Message")>
<Spin />
<Progress percent={50} />

// Spexop
<Alert variant="success">Message</Alert>
<Toast message="Message" variant="success" />
<Spinner />
<Progress value={50} />
```

## Best Practices Summary

1. **Choose the right component** for the use case
2. **Limit concurrent feedback** - Don't overwhelm users
3. **Provide context** in messages - Be specific
4. **Use semantic colors** consistently
5. **Ensure accessibility** - ARIA, keyboard, screen readers
6. **Test with real users** - Especially with assistive technology
7. **Respect user preferences** - Reduced motion, high contrast
8. **Handle errors gracefully** - Provide recovery actions
9. **Keep messages brief** - Users scan, don't read
10. **Test performance** - Especially with multiple toasts

## Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [Spexop Component Documentation](../README.md)

## Support

For issues, questions, or contributions:

- GitHub Issues: [github.com/spexop-ui/spexop](https://github.com/spexop-ui)
- Documentation: [spexop.dev](https://spexop.dev)
- Author: [@olmstedian](https://github.com/olmstedian)
