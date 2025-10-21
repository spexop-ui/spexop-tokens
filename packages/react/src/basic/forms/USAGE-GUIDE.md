# Forms Components Usage Guide

Comprehensive guide for using Spexop forms components effectively in your applications.

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

Forms components provide the foundation for user input and data collection in applications. The Spexop forms suite includes 12 core components designed following "The Spexop Way" principles:

### Text Input Components

- **TextInput** - Single-line text input for short text entries
- **TextArea** - Multi-line text input for longer content
- **SearchBar** - Specialized input for search functionality

### Selection Components

- **Select** - Dropdown selection from a list of options
- **Combobox** - Searchable dropdown with autocomplete
- **RadioGroup** - Mutually exclusive option selection
- **Checkbox** - Binary or multi-select options
- **Toggle** - On/off switch for boolean values

### Specialized Input Components

- **DatePicker** - Calendar-based date selection
- **ColorPicker** - Visual color selection with presets
- **Slider** - Numeric value selection within a range
- **FileUpload** - Drag-and-drop file upload interface

## When to Use Each Component

### TextInput

Use TextInput when:

- Collecting short, single-line text entries
- User needs to enter names, emails, URLs, or other brief text
- Input fits on a single line
- You need different input types (text, email, password, number, etc.)

**Examples:**

- First name, last name fields
- Email address
- Password fields
- Phone numbers
- URLs
- Search terms (though SearchBar is preferred for search)

**Avoid when:**

- Text might span multiple lines (use TextArea)
- You need autocomplete from a list (use Combobox)
- Looking for a specific search interface (use SearchBar)

### TextArea

Use TextArea when:

- Text input might span multiple lines
- Users need to enter paragraphs or longer content
- You want to show more context for the input
- Auto-resize based on content is beneficial

**Examples:**

- Comments and feedback
- Descriptions and bios
- Message composition
- Code snippets
- Notes and documentation

**Avoid when:**

- Input is guaranteed to be single-line (use TextInput)
- You need formatted text (consider rich text editor)

### SearchBar

Use SearchBar when:

- Implementing search functionality
- Need to trigger a command palette
- Want to show platform-specific keyboard shortcuts
- Search is a primary action

**Examples:**

- Global site search
- Command palette trigger
- Product search
- Documentation search
- Filter search boxes

**Avoid when:**

- General text input is needed (use TextInput)
- Search is not the primary purpose

### Select

Use Select when:

- User must choose one option from a predefined list
- Options are known and limited (5-20 items ideal)
- Labels clearly describe each option
- Order of options matters
- Search/filter is not necessary

**Examples:**

- Country selection
- State/province selection
- Time zone selection
- Language preferences
- Sort order selection

**Avoid when:**

- Many options need searching (use Combobox)
- Multiple selections needed (consider multi-select or Checkbox group)
- Options have complex descriptions (use RadioGroup)

### Combobox

Use Combobox when:

- User needs to search/filter through many options
- Options list is large (20+ items)
- Autocomplete would help user find options
- You want type-ahead functionality
- Options might have descriptions

**Examples:**

- City selection from thousands
- Product selection in e-commerce
- Tag selection with search
- Framework/library selection
- User search and selection

**Avoid when:**

- Few options that fit easily in a dropdown (use Select)
- Need mutually exclusive selection with descriptions (use RadioGroup)
- Custom text input is allowed (use TextInput with suggestions)

### RadioGroup

Use RadioGroup when:

- User must choose exactly one option
- All options should be visible simultaneously
- Options have helpful descriptions
- Visual comparison of options is important
- Limited options (typically 2-5)

**Examples:**

- Shipping method selection
- Subscription plan selection
- Privacy settings
- Notification preferences
- Density/spacing preferences

**Avoid when:**

- Many options don't fit on screen (use Select or Combobox)
- Descriptions are not needed (use Select)
- Multiple selections are allowed (use Checkbox)

### Checkbox

Use Checkbox when:

- User can select zero, one, or multiple options
- Each option is independent
- Choices are binary (yes/no, on/off)
- All options should be visible
- User might select multiple items

**Examples:**

- Terms and conditions acceptance
- Newsletter subscriptions
- Feature toggles
- Filter selections
- Multi-select lists
- Permission checkboxes

**Avoid when:**

- Only one option can be selected (use RadioGroup or Toggle)
- Many options make the list unwieldy (consider grouped checkboxes)

### Toggle

Use Toggle when:

- Setting has exactly two states (on/off)
- Change takes effect immediately
- Visual representation of state is important
- Common in settings and preferences
- State is easily understood as binary

**Examples:**

- Dark mode toggle
- Notification settings
- Feature flags
- Visibility controls
- Auto-save settings

**Avoid when:**

- More than two options exist (use RadioGroup or Select)
- Selection has a description (use Checkbox with label)
- Multiple independent choices (use Checkbox group)

### Slider

Use Slider when:

- Selecting numeric value from a continuous or discrete range
- Visual representation of value position is helpful
- Approximate value is acceptable
- Range has clear minimum and maximum
- Fine-tuning is needed

**Examples:**

- Volume control
- Brightness adjustment
- Price range filters
- Zoom level
- Opacity settings
- Age range selection

**Avoid when:**

- Precise numeric input is required (use TextInput type="number")
- Many discrete values make slider awkward
- Range is not intuitive

### DatePicker

Use DatePicker when:

- User needs to select a specific date
- Calendar view would be helpful
- Date ranges might apply (min/max)
- Visual calendar helps context
- Date format flexibility is needed

**Examples:**

- Birth date selection
- Appointment scheduling
- Event date selection
- Deadline setting
- Date range filters

**Avoid when:**

- Time selection is also needed (consider DateTimePicker)
- Only month/year needed (use Select dropdowns)
- Date entry is optional and typing is faster (consider TextInput alternative)

### ColorPicker

Use ColorPicker when:

- User needs to choose colors
- Visual color preview is important
- Color presets would be helpful
- Hex values need to be editable
- Brand colors or themes are being set

**Examples:**

- Theme customization
- Brand color selection
- UI element color settings
- Chart color selection
- Syntax highlighting colors

**Avoid when:**

- Limited predefined colors (use RadioGroup with color swatches)
- Accessibility is the primary concern (provide named color alternatives)

### FileUpload

Use FileUpload when:

- Users need to upload files
- Drag-and-drop would improve UX
- File type restrictions apply
- Size limits need enforcement
- Preview of uploaded files is helpful

**Examples:**

- Profile picture upload
- Document submission
- Resume upload
- Image galleries
- Attachment handling

**Avoid when:**

- Files are very large (consider chunked upload solution)
- Special processing is needed (ensure backend support)
- Multiple upload methods are required

## Component Comparison Matrix

| Feature | TextInput | TextArea | SearchBar | Select | Combobox | RadioGroup | Checkbox | Toggle | Slider | DatePicker | ColorPicker | FileUpload |
|---------|-----------|----------|-----------|---------|----------|------------|----------|--------|--------|------------|-------------|------------|
| Single Line | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Multi Line | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Free Text | ✅ | ✅ | ✅ | ❌ | Partial | ❌ | ❌ | ❌ | ❌ | ❌ | Partial | ❌ |
| Predefined Options | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Partial | ❌ |
| Search/Filter | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Multiple Selection | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Visual Input | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Keyboard Shortcuts | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Drag & Drop | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Preview | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Size Variants | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Density Variants | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Error States | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Help Text | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Icons | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Validation | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |

## Design Principles

### Applying "The Spexop Way" to Forms

All forms components follow the seven fundamental principles:

#### 1. Primitives Before Patterns

Forms are built on native HTML elements:

```tsx
// ✅ CORRECT - Built on native input
<TextInput label="Name" type="text" />

// ✅ CORRECT - Uses native select behavior
<Select value={value} onChange={onChange} options={options} />

// ❌ WRONG - Don't reinvent basic HTML
<CustomInput withCustomBehavior />
```

#### 2. Borders Before Shadows

Form inputs use strong borders for definition:

```css
/* ✅ CORRECT - Strong 2px borders */
border: 2px solid var(--theme-border);

/* ❌ WRONG - Heavy shadows */
box-shadow: 0 10px 30px rgba(0,0,0,0.3);
```

#### 3. Typography Before Decoration

Labels and text use font weight for hierarchy:

```css
/* ✅ CORRECT - Bold labels */
.label {
  font-weight: var(--theme-font-weight-semibold); /* 600 */
}

/* ❌ WRONG - Lighter colors for hierarchy */
.label {
  color: var(--theme-text-muted); /* Too light */
}
```

#### 4. Tokens Before Magic Numbers

All spacing and sizing uses design tokens:

```tsx
// ✅ CORRECT - Design tokens
<TextInput size="md" /> // Uses --theme-spacing tokens

// ❌ WRONG - Magic numbers
<input style={{ padding: "12px 16px" }} />
```

#### 5. Composition Before Complexity

Complex forms are built from simple components:

```tsx
// ✅ CORRECT - Compose from simple parts
<form>
  <TextInput label="Name" />
  <TextInput label="Email" type="email" />
  <Toggle label="Subscribe" />
  <Button type="submit">Submit</Button>
</form>

// ❌ WRONG - Monolithic form component
<MegaForm withAllFeatures />
```

#### 6. Standards Before Frameworks

Uses native HTML5 form features:

```tsx
// ✅ CORRECT - Native validation
<TextInput label="Email" type="email" required />

// ✅ CORRECT - Native form submission
<form onSubmit={handleSubmit}>

// ❌ WRONG - Custom validation when native works
<CustomEmailValidator>
```

#### 7. Accessibility Before Aesthetics

WCAG AA+ compliance is built-in:

```tsx
// ✅ CORRECT - Full accessibility
<TextInput
  label="Name"
  required
  error="Name is required"
  aria-describedby="name-help"
/>

// ❌ WRONG - Visual only
<input placeholder="Name*" />
```

## Common Patterns

### Login Form

```tsx
import { TextInput, Checkbox, Button } from '@spexop/react';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <Checkbox
        checked={remember}
        onChange={setRemember}
        label="Remember me"
      />
      
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Registration Form

```tsx
import { TextInput, Select, Checkbox, Button } from '@spexop/react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    acceptTerms: false,
  });

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  return (
    <form>
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        required
      />
      
      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        required
      />
      
      <TextInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <Select
        value={formData.country}
        onChange={(value) => setFormData({ ...formData, country: value })}
        options={countries}
        aria-label="Country"
      />
      
      <Checkbox
        checked={formData.acceptTerms}
        onChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
        label="I accept the terms and conditions"
        required
      />
      
      <Button type="submit">Create Account</Button>
    </form>
  );
}
```

### Profile Edit Form

```tsx
import {
  TextInput,
  TextArea,
  DatePicker,
  FileUpload,
  Button
} from '@spexop/react';

function ProfileForm() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    birthDate: "",
    avatar: null,
  });

  return (
    <form>
      <FileUpload
        label="Profile Picture"
        accept="image/*"
        maxSize={5 * 1024 * 1024}
        onChange={(files) => setProfile({ ...profile, avatar: files[0] })}
      />
      
      <TextInput
        label="Display Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        required
      />
      
      <TextArea
        label="Bio"
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        rows={4}
        helpText="Tell us about yourself"
      />
      
      <DatePicker
        label="Birth Date"
        value={profile.birthDate}
        onChange={(date) => setProfile({ ...profile, birthDate: date })}
      />
      
      <Button type="submit">Save Profile</Button>
    </form>
  );
}
```

### Search Interface

```tsx
import { SearchBar, Select, Checkbox, Slider } from '@spexop/react';

function SearchFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [priceRange, setPriceRange] = useState(50);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
  ];

  return (
    <div>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search products..."
      />
      
      <Select
        value={category}
        onChange={setCategory}
        options={categories}
        aria-label="Category filter"
      />
      
      <Checkbox
        checked={inStock}
        onChange={setInStock}
        label="In stock only"
      />
      
      <Slider
        value={priceRange}
        onChange={setPriceRange}
        min={0}
        max={100}
        showValue
        formatValue={(val) => `$${val}`}
        aria-label="Maximum price"
      />
    </div>
  );
}
```

### Settings Panel

```tsx
import { RadioGroup, Toggle, Select, Button } from '@spexop/react';

function SettingsPanel() {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  const themeOptions = [
    { value: "light", label: "Light", description: "Light color scheme" },
    { value: "dark", label: "Dark", description: "Dark color scheme" },
    { value: "system", label: "System", description: "Follow system preference" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
  ];

  return (
    <div>
      <RadioGroup
        value={theme}
        onChange={setTheme}
        options={themeOptions}
        aria-label="Theme selection"
      />
      
      <Toggle
        checked={notifications}
        onChange={setNotifications}
        label="Enable notifications"
      />
      
      <Select
        value={language}
        onChange={setLanguage}
        options={languages}
        aria-label="Language"
      />
      
      <Button onClick={saveSettings}>Save Settings</Button>
    </div>
  );
}
```

### Multi-Step Form

```tsx
import { TextInput, Select, DatePicker, Button } from '@spexop/react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    email: "",
    // Step 2
    phone: "",
    country: "",
    // Step 3
    startDate: "",
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
            <TextInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Select
              value={formData.country}
              onChange={(value) => setFormData({ ...formData, country: value })}
              options={[/* countries */]}
              aria-label="Country"
            />
          </>
        );
      case 3:
        return (
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
        );
    }
  };

  return (
    <div>
      <div>Step {step} of 3</div>
      {renderStep()}
      <div>
        {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}
```

## Real-World Examples

### Contact Form with Validation

```tsx
import { TextInput, TextArea, Button } from '@spexop/react';
import { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  if (submitted) {
    return <div>Thank you! We'll be in touch soon.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        required
      />
      
      <TextInput
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        required
      />
      
      <TextInput
        label="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      
      <TextArea
        label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        error={errors.message}
        rows={6}
        required
      />
      
      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

### Advanced Search with All Input Types

```tsx
import {
  SearchBar,
  Select,
  Combobox,
  DatePicker,
  Slider,
  Checkbox,
  Button
} from '@spexop/react';

function AdvancedSearch() {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    priceRange: [0, 1000],
    hasImages: false,
    featured: false,
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "tech", label: "Technology" },
    { value: "fashion", label: "Fashion" },
  ];

  const locations = [
    { value: "nyc", label: "New York", description: "New York, NY" },
    { value: "la", label: "Los Angeles", description: "Los Angeles, CA" },
    { value: "chi", label: "Chicago", description: "Chicago, IL" },
  ];

  return (
    <form>
      <SearchBar
        value={filters.query}
        onChange={(q) => setFilters({ ...filters, query: q })}
        onSearch={handleSearch}
        placeholder="Search..."
      />
      
      <Select
        value={filters.category}
        onChange={(val) => setFilters({ ...filters, category: val })}
        options={categories}
        aria-label="Category"
      />
      
      <Combobox
        value={filters.location}
        onChange={(val) => setFilters({ ...filters, location: val })}
        options={locations}
        label="Location"
        placeholder="Search locations..."
      />
      
      <DatePicker
        label="From Date"
        value={filters.dateFrom}
        onChange={(date) => setFilters({ ...filters, dateFrom: date })}
      />
      
      <DatePicker
        label="To Date"
        value={filters.dateTo}
        onChange={(date) => setFilters({ ...filters, dateTo: date })}
        min={filters.dateFrom}
      />
      
      <Slider
        value={filters.priceRange[1]}
        onChange={(val) => setFilters({ ...filters, priceRange: [0, val] })}
        min={0}
        max={1000}
        step={10}
        showValue
        formatValue={(val) => `$${val}`}
        aria-label="Maximum price"
      />
      
      <Checkbox
        checked={filters.hasImages}
        onChange={(checked) => setFilters({ ...filters, hasImages: checked })}
        label="Has images"
      />
      
      <Checkbox
        checked={filters.featured}
        onChange={(checked) => setFilters({ ...filters, featured: checked })}
        label="Featured only"
      />
      
      <Button type="submit">Search</Button>
      <Button variant="ghost" onClick={resetFilters}>Reset</Button>
    </form>
  );
}
```

## Accessibility Guidelines

### WCAG AA+ Compliance

All forms components meet WCAG 2.2 AA standards:

#### 1. Keyboard Navigation

Every component is fully keyboard accessible:

```tsx
// ✅ All inputs support Tab navigation
<TextInput label="Name" />
// Tab to focus

// ✅ Select supports Arrow keys
<Select options={options} />
// Space/Enter to open, Arrow keys to navigate

// ✅ RadioGroup supports Arrow keys
<RadioGroup options={options} />
// Arrow keys to select, no Tab between options
```

#### 2. Screen Reader Support

Proper ARIA labels and roles:

```tsx
// ✅ Label association
<TextInput label="Email" required />
// Screen reader: "Email, required, edit text"

// ✅ Error announcements
<TextInput label="Email" error="Invalid email" />
// Screen reader announces error via role="alert"

// ✅ Help text association
<TextInput label="Password" helpText="At least 8 characters" />
// aria-describedby links help text
```

#### 3. Focus Management

Visible focus indicators:

```css
/* ✅ Strong focus indication */
:focus {
  outline: 2px solid var(--theme-primary);
  outline-offset: 2px;
}

/* ❌ Don't remove focus styles */
:focus {
  outline: none; /* Bad! */
}
```

#### 4. Color Contrast

Text meets 7:1 contrast ratio (AAA):

```css
/* ✅ High contrast labels */
.label {
  color: var(--theme-text); /* 15:1 contrast */
}

/* ✅ Adequate contrast for secondary text */
.helpText {
  color: var(--theme-text-secondary); /* 7:1 contrast */
}
```

#### 5. Touch Targets

Minimum 44px tap targets:

```css
/* ✅ Adequate touch target */
.checkbox {
  min-width: 44px;
  min-height: 44px;
}
```

### Testing for Accessibility

```tsx
// Test keyboard navigation
test('can navigate with keyboard', async () => {
  const user = userEvent.setup();
  render(<TextInput label="Name" />);
  
  await user.tab();
  expect(screen.getByLabelText('Name')).toHaveFocus();
});

// Test screen reader announcements
test('announces errors to screen readers', () => {
  render(<TextInput label="Email" error="Invalid email" />);
  
  expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
});

// Test ARIA attributes
test('has proper ARIA attributes', () => {
  render(<Select value="" onChange={() => {}} options={[]} />);
  
  const select = screen.getByRole('button');
  expect(select).toHaveAttribute('aria-haspopup', 'listbox');
  expect(select).toHaveAttribute('aria-expanded');
});
```

## Performance Considerations

### Controlled vs Uncontrolled Components

```tsx
// ✅ Uncontrolled - Better for simple forms
function SimpleForm() {
  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // Use data
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Name" name="name" />
      <Button type="submit">Submit</Button>
    </form>
  );
}

// ✅ Controlled - Better for complex validation
function ComplexForm() {
  const [data, setData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  
  const validate = useCallback(() => {
    // Real-time validation
  }, [data]);
  
  useEffect(() => {
    validate();
  }, [data, validate]);
  
  return (
    <form>
      <TextInput
        label="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        error={errors.name}
      />
    </form>
  );
}
```

### Debouncing Search Inputs

```tsx
import { useMemo } from 'react';
import { debounce } from 'lodash';

function SearchWithDebounce() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Debounce API calls
  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery) => {
      const data = await fetch(`/api/search?q=${searchQuery}`);
      setResults(data);
    }, 300),
    []
  );

  const handleChange = (newQuery) => {
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return <SearchBar value={query} onChange={handleChange} />;
}
```

### Lazy Loading Options

```tsx
function LazyCombobox() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load options on demand
  const loadOptions = async (query) => {
    if (query.length < 2) return;
    
    setLoading(true);
    const data = await fetch(`/api/options?q=${query}`);
    setOptions(data);
    setLoading(false);
  };

  return (
    <Combobox
      value={value}
      onChange={setValue}
      options={options}
      onChange={loadOptions}
    />
  );
}
```

## Testing Strategies

### Unit Testing Components

```tsx
describe('TextInput', () => {
  it('renders with label', () => {
    render(<TextInput label="Name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    render(<TextInput label="Name" onChange={handleChange} />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<TextInput label="Name" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
```

### Integration Testing Forms

```tsx
describe('Login Form', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('shows validation errors', async () => {
    render(<LoginForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Forms Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <form>
        <TextInput label="Name" required />
        <Button type="submit">Submit</Button>
      </form>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Troubleshooting

### Common Issues

#### Input Not Updating

**Problem:** Controlled input doesn't update when typing

```tsx
// ❌ WRONG - Missing onChange
<TextInput label="Name" value={name} />

// ✅ CORRECT - Include onChange
<TextInput
  label="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

#### Select Not Opening

**Problem:** Select dropdown doesn't open

```tsx
// ❌ WRONG - Missing options
<Select value={value} onChange={setValue} />

// ✅ CORRECT - Provide options
<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>
```

#### File Upload Not Working

**Problem:** Files aren't being captured

```tsx
// ❌ WRONG - Wrong onChange parameter
<FileUpload onChange={(e) => setFile(e.target.value)} />

// ✅ CORRECT - Use FileList from parameter
<FileUpload onChange={(files) => setFile(files[0])} />
```

#### DatePicker Shows Wrong Format

**Problem:** Date displays in unexpected format

```tsx
// ❌ WRONG - No format specified
<DatePicker value={date} onChange={setDate} />

// ✅ CORRECT - Specify format
<DatePicker
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"
/>
```

### Performance Issues

#### Slow Combobox

**Problem:** Combobox lags with many options

```tsx
// ✅ Use virtualization for large lists
// ✅ Implement server-side filtering
// ✅ Limit initial options shown
<Combobox
  value={value}
  onChange={setValue}
  options={options.slice(0, 100)} // Limit initial
  filterFn={customFilter} // Efficient filtering
/>
```

#### Form Re-renders Too Often

**Problem:** Form re-renders on every keystroke

```tsx
// ✅ Use useCallback for handlers
const handleChange = useCallback((e) => {
  setValue(e.target.value);
}, []);

// ✅ Memoize expensive computations
const validationErrors = useMemo(() => {
  return validate(formData);
}, [formData]);
```

### Browser Compatibility

All components work in:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers:

- Include polyfills for modern JavaScript features
- Test thoroughly in target browsers
- Consider progressive enhancement

---

**Need Help?**

- Check component README files for specific usage
- Review test files for additional examples
- Consult The Spexop Way principles
- File issues on GitHub for bugs or feature requests
