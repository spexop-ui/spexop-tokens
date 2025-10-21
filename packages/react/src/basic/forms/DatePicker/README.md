# DatePicker

A calendar-based date selection component following "The Spexop Way".

## Features

- Visual calendar interface for date selection
- Multiple date format options (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
- Month navigation
- Date range validation (min/max dates)
- Today indicator
- Keyboard navigation
- Size variants (sm, md, lg)
- Error and validation states
- Left icon support
- First day of week configuration
- Theme-aware styling
- Type-safe with TypeScript

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { DatePicker } from '@spexop/react';

function App() {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="Select date"
      placeholder="MM/DD/YYYY"
    />
  );
}
```

## Date Formats

```tsx
<DatePicker format="MM/DD/YYYY" {...props} /> {/* 10/20/2025 */}
<DatePicker format="DD/MM/YYYY" {...props} /> {/* 20/10/2025 */}
<DatePicker format="YYYY-MM-DD" {...props} /> {/* 2025-10-20 */}
```

## With Date Range

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  min="2025-01-01"
  max="2025-12-31"
  label="Select date in 2025"
/>
```

## Size Variants

```tsx
<DatePicker size="sm" {...props} />
<DatePicker size="md" {...props} /> {/* Default */}
<DatePicker size="lg" {...props} />
```

## With Validation

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  required
  error={!date ? 'Please select a date' : ''}
  helpText="Choose a date for your appointment"
/>
```

## With Icon

```tsx
import { Icon } from '@spexop/react';
import { Calendar } from '@spexop/icons';

<DatePicker
  value={date}
  onChange={setDate}
  leftIcon={<Icon name="Calendar" />}
/>
```

## Week Configuration

```tsx
{/* Start week on Monday */}
<DatePicker
  value={date}
  onChange={setDate}
  firstDayOfWeek={1}
/>

{/* Start week on Sunday (default) */}
<DatePicker
  value={date}
  onChange={setDate}
  firstDayOfWeek={0}
/>
```

## Design Principles Applied

### 1. Primitives before patterns

Built on native text input with calendar overlay, using standard Date objects.

### 2. Borders before shadows

Uses clean 2px borders for focus states, minimal shadow only for calendar elevation.

### 3. Typography before decoration

Font weight (semibold) for month/year header and selected date. No color-only hierarchy.

### 4. Tokens before magic numbers

All spacing, colors, and sizing use design tokens from `@spexop/theme`.

### 5. Composition before complexity

Simple input field combined with calendar grid. No over-engineering.

### 6. Standards before frameworks

Native Date objects and ISO string format for cross-platform compatibility.

### 7. Accessibility before aesthetics

- Full keyboard navigation
- ARIA labels for all interactive elements
- Focus management and visible focus indicators
- Screen reader support
- Required field indicator

## Keyboard Navigation

- **Enter**: Open/close calendar
- **Escape**: Close calendar
- **Arrow Keys**: Navigate calendar dates (when calendar is open)
- **Tab**: Close calendar and move focus

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current selected date in ISO format (required) |
| `onChange` | `(date: string) => void` | - | Change handler (required) |
| `label` | `string` | - | Label for the date picker |
| `disabled` | `boolean` | `false` | Whether date picker is disabled |
| `placeholder` | `string` | `"Select date..."` | Placeholder text |
| `required` | `boolean` | `false` | Whether field is required |
| `error` | `string` | - | Error message to display |
| `helpText` | `string` | - | Help text below date picker |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `min` | `string` | - | Minimum date (ISO format) |
| `max` | `string` | - | Maximum date (ISO format) |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id attribute |
| `format` | `"MM/DD/YYYY" \| "DD/MM/YYYY" \| "YYYY-MM-DD"` | `"MM/DD/YYYY"` | Date display format |
| `leftIcon` | `ReactNode` | - | Icon on left side |
| `showWeekNumbers` | `boolean` | `false` | Show week numbers (future feature) |
| `firstDayOfWeek` | `0 \| 1` | `0` | First day of week (0 = Sunday, 1 = Monday) |

## Value Format

The component uses ISO 8601 date strings for the `value` and `onChange` props:

```typescript
// Example: October 20, 2025
const date = "2025-10-20T00:00:00.000Z"

// Convert to Date object
const dateObj = new Date(date);

// Convert Date to ISO string
const isoString = dateObj.toISOString();
```

## Examples

### Birthday Picker

```tsx
<DatePicker
  value={birthday}
  onChange={setBirthday}
  label="Date of Birth"
  max={new Date().toISOString()}
  required
  error={!birthday ? 'Birthday is required' : ''}
/>
```

### Appointment Scheduler

```tsx
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);

<DatePicker
  value={appointment}
  onChange={setAppointment}
  label="Appointment Date"
  min={tomorrow.toISOString()}
  max={nextMonth.toISOString()}
  helpText="Select a date within the next month"
/>
```

### Event Date

```tsx
<DatePicker
  value={eventDate}
  onChange={setEventDate}
  label="Event Date"
  format="DD/MM/YYYY"
  size="lg"
  leftIcon={<Icon name="Calendar" />}
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
- Clear visual indicators for today, selected date, and disabled dates

## Related Components

- **TextInput** - Basic text input
- **Combobox** - Searchable select

## License

MIT License - Part of the Spexop Design System
