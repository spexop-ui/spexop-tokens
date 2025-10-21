# Form Component - Usage Guide

## Common Patterns

### Login Form

```tsx
import { Form, Stack, TextInput, Checkbox, Button, Link, Text } from '@spexop/react';
import { useState } from 'react';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
  
  const handleSubmit = async (event, formData) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        setValidation({
          isValid: false,
          errors: ['Invalid email or password'],
          fieldErrors: {},
        });
      }
    } catch (error) {
      setValidation({
        isValid: false,
        errors: ['Network error. Please try again.'],
        fieldErrors: {},
      });
    }
    
    setLoading(false);
  };
  
  return (
    <Form 
      variant="card"
      onSubmit={handleSubmit} 
      loading={loading}
      validation={validation}
      aria-label="Login form"
    >
      <Stack direction="vertical" gap="md">
        <TextInput 
          label="Email" 
          type="email" 
          name="email" 
          required 
        />
        <TextInput 
          label="Password" 
          type="password" 
          name="password" 
          required 
        />
        
        <Stack direction="horizontal" gap="sm" align="center" justify="space-between">
          <Checkbox label="Remember me" name="remember" />
          <Link href="/forgot-password" variant="text" size="sm">
            Forgot password?
          </Link>
        </Stack>
        
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Sign In
        </Button>
      </Stack>
    </Form>
  );
}
```

### Contact Form with Validation

```tsx
import { Form, Stack, TextInput, TextArea, Button } from '@spexop/react';
import { useState } from 'react';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
  
  const validateForm = (formData) => {
    const errors = [];
    const fieldErrors = {};
    
    const email = formData.get('email');
    if (!email || !email.includes('@')) {
      errors.push('Valid email is required');
      fieldErrors.email = 'Please enter a valid email';
    }
    
    const message = formData.get('message');
    if (!message || message.length < 10) {
      errors.push('Message must be at least 10 characters');
      fieldErrors.message = 'Please provide more details';
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      fieldErrors,
    };
  };
  
  const handleSubmit = async (event, formData) => {
    const validationResult = validateForm(formData);
    setValidation(validationResult);
    
    if (!validationResult.isValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      
      // Success - clear form
      event.target.reset();
      setValidation(null);
    } catch (error) {
      setValidation({
        isValid: false,
        errors: ['Failed to send message. Please try again.'],
        fieldErrors: {},
      });
    }
    
    setLoading(false);
  };
  
  return (
    <Form 
      variant="card"
      onSubmit={handleSubmit} 
      loading={loading}
      validation={validation}
    >
      <Stack direction="vertical" gap="md">
        <TextInput 
          label="Name" 
          name="name" 
          required 
          error={validation?.fieldErrors.name}
        />
        <TextInput 
          label="Email" 
          type="email" 
          name="email" 
          required 
          error={validation?.fieldErrors.email}
        />
        <TextArea 
          label="Message" 
          name="message" 
          required 
          rows={5}
          error={validation?.fieldErrors.message}
        />
        <Button type="submit" variant="primary" size="lg">
          Send Message
        </Button>
      </Stack>
    </Form>
  );
}
```

### Newsletter Signup

```tsx
import { Form, Stack, TextInput, Button, Text } from '@spexop/react';

function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event, formData) => {
    setLoading(true);
    await subscribeToNewsletter(formData.get('email'));
    setLoading(false);
  };
  
  return (
    <Form onSubmit={handleSubmit} loading={loading}>
      <Stack direction="vertical" gap="sm">
        <Stack direction="horizontal" gap="xs">
          <TextInput 
            label="Email" 
            type="email" 
            name="email" 
            placeholder="you@example.com"
            required 
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </Stack>
        <Text size="sm" variant="secondary" noMargin>
          We'll never share your email. Unsubscribe anytime.
        </Text>
      </Stack>
    </Form>
  );
}
```

### Multi-Step Form

```tsx
import { Form, Stack, TextInput, Button } from '@spexop/react';
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async (event, data) => {
    if (step < 3) {
      // Save step data and continue
      setFormData({ ...formData, ...Object.fromEntries(data.entries()) });
      setStep(step + 1);
    } else {
      // Final submission
      setLoading(true);
      await submitForm({ ...formData, ...Object.fromEntries(data.entries()) });
      setLoading(false);
    }
  };
  
  return (
    <Form variant="card" onSubmit={handleSubmit} loading={loading}>
      <Stack direction="vertical" gap="md">
        {step === 1 && (
          <>
            <TextInput label="Full Name" name="name" required />
            <TextInput label="Email" type="email" name="email" required />
          </>
        )}
        
        {step === 2 && (
          <>
            <TextInput label="Company" name="company" required />
            <TextInput label="Job Title" name="jobTitle" required />
          </>
        )}
        
        {step === 3 && (
          <>
            <TextInput label="Phone" type="tel" name="phone" required />
            <TextArea label="Additional Info" name="info" />
          </>
        )}
        
        <Stack direction="horizontal" gap="sm" justify="space-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button type="submit" variant="primary">
            {step < 3 ? 'Next' : 'Submit'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
```

## Design Tokens

All styles use theme tokens:

```css
/* Spacing */
padding: var(--theme-spacing-6)
gap: var(--theme-spacing-4)

/* Borders */
border: var(--theme-border-width) solid var(--theme-border)
border-radius: var(--theme-radius-relaxed)

/* Colors */
background: var(--theme-surface)
error: var(--theme-error)
```

## Accessibility

### Form Labels

```tsx
<Form aria-label="Contact form">
  {/* fields */}
</Form>
```

### Error Announcements

Errors are automatically announced with ARIA live regions.

### Loading State

Loading spinner uses `role="status"` and `aria-label="Loading"`.

## Performance

- CSS Modules for scoped styling
- Zero runtime overhead
- Tree-shakeable
- Minimal bundle impact (~2KB)

## Related

- TextInput - Text input fields
- TextArea - Multi-line input
- Button - Form buttons
- Checkbox - Checkbox fields
- Select - Select dropdowns
