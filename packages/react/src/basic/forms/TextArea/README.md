# TextArea Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A multi-line text input component with auto-resize, character count, and full accessibility support. Perfect for comments, descriptions, and long-form text entry.

## Features

- ✅ Multi-line text input
- ✅ Auto-resize to content
- ✅ Character count with max length
- ✅ Label and helper text
- ✅ Error state with validation
- ✅ Disabled and read-only states
- ✅ Resize control (none, vertical, both)
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { TextArea } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <TextArea
      label="Description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter a description..."
    />
  );
}
```

## Basic Usage

### Simple TextArea

```tsx
<TextArea
  label="Comments"
  value={comments}
  onChange={(e) => setComments(e.target.value)}
  placeholder="Add your comments..."
/>
```

### With Helper Text

```tsx
<TextArea
  label="Bio"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  helperText="Tell us about yourself"
  placeholder="Write a brief bio..."
/>
```

### With Character Count

```tsx
<TextArea
  label="Tweet"
  value={tweet}
  onChange={(e) => setTweet(e.target.value)}
  maxLength={280}
  showCount={true}
  helperText="What's happening?"
/>
```

### Auto-Resize

```tsx
<TextArea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  autoResize={true}
  minRows={3}
  maxRows={10}
/>
```

## States

### Error State

```tsx
<TextArea
  label="Feedback"
  value={feedback}
  onChange={setFeedback}
  error="Feedback must be at least 10 characters"
/>
```

### Disabled

```tsx
<TextArea
  label="Generated Content"
  value={generatedText}
  onChange={handleChange}
  disabled={true}
/>
```

### Read-Only

```tsx
<TextArea
  label="Terms and Conditions"
  value={termsText}
  readOnly={true}
  rows={10}
/>
```

### Required

```tsx
<TextArea
  label="Description"
  value={description}
  onChange={setDescription}
  required={true}
  error={!description ? 'Description is required' : ''}
/>
```

## Resize Control

### No Resize (Default)

```tsx
<TextArea
  label="Fixed Size"
  value={value}
  onChange={setValue}
  resize="none"
  rows={5}
/>
```

### Vertical Resize

```tsx
<TextArea
  label="Vertical Resize"
  value={value}
  onChange={setValue}
  resize="vertical"
/>
```

### Both Directions

```tsx
<TextArea
  label="Free Resize"
  value={value}
  onChange={setValue}
  resize="both"
/>
```

## Common Patterns

### Comment Form

```tsx
function CommentForm() {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (comment.length < 10) {
      setError('Comment must be at least 10 characters');
      return;
    }
    
    // Submit comment
    console.log('Comment:', comment);
    setComment('');
    setError('');
  };

  return (
    <Stack direction="vertical" gap={4}>
      <TextArea
        label="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        maxLength={500}
        showCount={true}
        error={error}
        autoResize={true}
        minRows={3}
        maxRows={8}
      />
      
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={comment.length === 0}
      >
        Post Comment
      </Button>
    </Stack>
  );
}
```

### Contact Form

```tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <form>
      <TextInput
        label="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        required
      />
      
      <TextInput
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
      />
      
      <TextArea
        label="Message"
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.target.value })
        }
        placeholder="How can we help you?"
        required
        minRows={5}
        maxLength={1000}
        showCount={true}
      />
      
      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

### Feedback Form

```tsx
function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const minChars = 20;

  return (
    <TextArea
      label="Your Feedback"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      helperText={`Please provide at least ${minChars} characters`}
      error={
        feedback.length > 0 && feedback.length < minChars
          ? `${minChars - feedback.length} more characters needed`
          : ''
      }
      maxLength={500}
      showCount={true}
      autoResize={true}
      minRows={4}
    />
  );
}
```

### Review Form

```tsx
function ReviewForm() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  return (
    <Stack direction="vertical" gap={4}>
      <div>
        <label>Rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>
      
      <TextArea
        label="Your Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience with this product..."
        helperText="Help others by sharing your honest review"
        maxLength={1000}
        showCount={true}
        minRows={5}
        autoResize={true}
      />
      
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={review.length < 20}
      >
        Submit Review
      </Button>
    </Stack>
  );
}
```

## Props

```typescript
interface TextAreaProps {
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field */
  required?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** Minimum rows (for auto-resize) */
  minRows?: number;
  /** Maximum rows (for auto-resize) */
  maxRows?: number;
  /** Auto-resize to content */
  autoResize?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Show character count */
  showCount?: boolean;
  /** Resize behavior */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Additional CSS class */
  className?: string;
  /** Element ID */
  id?: string;
  /** Input name */
  name?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear, readable text
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML (`<textarea>` element)
- ✅ Proper label association
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Error announcements
- ✅ Character count announcements
- ✅ WCAG AA+ compliant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TextInput` - Single-line text input
- `Select` - Dropdown selection
- `SearchBar` - Search input
- `CodeBlock` - Code display/editing

## Best Practices

1. **Use auto-resize** - Better UX than fixed height
2. **Show character count** - Especially with maxLength
3. **Provide helpful placeholder** - Guide users
4. **Set reasonable maxLength** - Prevent excessive input
5. **Use helper text** - Clarify expectations

## License

MIT
