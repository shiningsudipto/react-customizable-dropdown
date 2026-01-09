# 🎯 React Customizable Dropdown

A beautiful, fully customizable dropdown component for React with built-in search, multi-select, and extensive theming options.

## ✨ Features

- 🎨 **Fully Customizable** - Control every aspect of styling
- 🔍 **Built-in Search** - Searchable options with auto-focus
- ✅ **Multi-Select** - Select multiple options with chips
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape)
- 🎭 **Theming System** - Easy color customization
- 🎪 **Custom Icons** - Replace default icons with your own SVGs
- ♿ **Accessible** - ARIA-compliant for screen readers
- 📦 **TypeScript** - Full type safety included

## 📦 Installation

```bash
npm install your-dropdown-package
# or
yarn add your-dropdown-package
```

## 🚀 Quick Start

```tsx
import { Dropdown } from "your-dropdown-package";

const options = [
  { value: "1", label: "React" },
  { value: "2", label: "Vue" },
  { value: "3", label: "Angular" },
];

function App() {
  const [value, setValue] = useState("");

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="Select a framework"
    />
  );
}
```

## 📚 Use Cases

### Single Select Dropdown

Perfect for selecting one option from a list.

```tsx
<Dropdown
  options={frameworks}
  value={selectedFramework}
  onChange={setSelectedFramework}
  placeholder="Choose a framework"
/>
```

### Multi-Select with Search

Great for tags, categories, or filtering.

```tsx
<Dropdown
  options={tags}
  value={selectedTags}
  onChange={setSelectedTags}
  placeholder="Select tags..."
  multiSelect
  searchable
/>
```

### Async Data Loading

Load options from an API with loading state.

```tsx
<Dropdown
  options={asyncOptions}
  value={value}
  onChange={setValue}
  loading={isLoading}
  placeholder={isLoading ? "Loading..." : "Select option"}
/>
```

### Themed Dropdown

Match your app's design with custom colors.

```tsx
<Dropdown
  options={options}
  value={value}
  onChange={setValue}
  theme={{
    primaryColor: "#10b981",
    backgroundColor: "#1f2937",
    textColor: "#fff",
  }}
/>
```

## 🎛️ Props Reference

### Core Props

| Prop          | Type                        | Default       | Description                     |
| ------------- | --------------------------- | ------------- | ------------------------------- |
| `options`     | `DropdownOption[]`          | **required**  | Array of options to display     |
| `value`       | `string \| number \| array` | `undefined`   | Currently selected value(s)     |
| `onChange`    | `function`                  | `undefined`   | Callback when selection changes |
| `placeholder` | `string`                    | `'Select...'` | Placeholder text when empty     |

### Feature Props

| Prop          | Type      | Default | Description                  |
| ------------- | --------- | ------- | ---------------------------- |
| `multiSelect` | `boolean` | `false` | Enable multiple selections   |
| `searchable`  | `boolean` | `false` | Show search input in trigger |
| `disabled`    | `boolean` | `false` | Disable the dropdown         |
| `loading`     | `boolean` | `false` | Show loading spinner         |

### Label & Text

| Prop             | Type        | Default     | Description                    |
| ---------------- | ----------- | ----------- | ------------------------------ |
| `label`          | `ReactNode` | `undefined` | Label displayed above dropdown |
| `labelClassName` | `string`    | `''`        | Custom classes for label       |

### Custom Icons

| Prop                 | Type        | Default     | Description                    |
| -------------------- | ----------- | ----------- | ------------------------------ |
| `arrowIcon`          | `ReactNode` | `undefined` | Custom arrow/chevron icon      |
| `arrowIconClassName` | `string`    | `''`        | Classes for arrow icon wrapper |

### Styling Props (Class Names)

Use these to completely customize the appearance:

| Prop                      | Type     | Description                          |
| ------------------------- | -------- | ------------------------------------ |
| `className`               | `string` | Container wrapper classes            |
| `triggerClassName`        | `string` | Dropdown trigger/button classes      |
| `menuClassName`           | `string` | Dropdown menu container classes      |
| `optionClassName`         | `string` | Individual option item classes       |
| `selectedOptionClassName` | `string` | Classes for selected options in menu |

### Styling Props (Inline Styles)

| Prop           | Type            | Description             |
| -------------- | --------------- | ----------------------- |
| `style`        | `CSSProperties` | Container inline styles |
| `triggerStyle` | `CSSProperties` | Trigger inline styles   |

## 🎨 Theme System

The `theme` prop accepts an object to customize colors and spacing:

```tsx
interface DropdownTheme {
  // Primary color (used for focus, selected items, etc.)
  primaryColor?: string;

  // Background colors
  backgroundColor?: string;
  menuBackgroundColor?: string;

  // Text colors
  textColor?: string;
  optionTextColor?: string;

  // Hover & Selection colors
  hoverColor?: string;
  selectedOptionTextColor?: string;
  selectedOptionBackgroundColor?: string;

  // Multi-select chip colors
  multiSelectSelectedOptionTextColor?: string;
  multiSelectSelectedOptionBackgroundColor?: string;

  // Focus state
  focusBorderColor?: string;

  // Spacing
  padding?: string;
}
```

### Theme Examples

**Dark Theme**

```tsx
<Dropdown
  options={options}
  theme={{
    primaryColor: "#60a5fa",
    backgroundColor: "#1f2937",
    menuBackgroundColor: "#111827",
    textColor: "#fff",
    optionTextColor: "#e5e7eb",
    hoverColor: "#374151",
  }}
/>
```

## 🎪 Custom Styling Examples

### Using Class Names

```tsx
<Dropdown
  options={options}
  triggerClassName="border-2 border-purple-500 rounded-xl px-4 py-3 hover:shadow-lg"
  menuClassName="shadow-2xl border-2 border-purple-200 rounded-xl"
  optionClassName="hover:bg-purple-50 px-4 py-3"
  selectedOptionClassName="bg-purple-100 text-purple-900 font-semibold"
/>
```

### With Custom Arrow Icon

```tsx
<Dropdown
  options={options}
  arrowIcon={
    <svg
      className="w-5 h-5 text-blue-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      />
    </svg>
  }
  arrowIconClassName="transition-transform duration-300"
/>
```

### Inline Styles

```tsx
<Dropdown
  options={options}
  triggerStyle={{
    borderRadius: "12px",
    padding: "12px 16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }}
/>
```

## 🎯 Complete Example

```tsx
import { useState } from "react";
import { Dropdown } from "your-dropdown-package";

const frameworks = [
  { value: "1", label: "React" },
  { value: "2", label: "Vue" },
  { value: "3", label: "Angular" },
  { value: "4", label: "Svelte" },
  { value: "5", label: "Next.js" },
];

function StyledDropdown() {
  const [selected, setSelected] = useState([]);

  return (
    <Dropdown
      // Core
      options={frameworks}
      value={selected}
      onChange={(value) => setSelected(value)}
      placeholder="Choose your tech stack..."
      // Features
      multiSelect
      searchable
      label="Select Frameworks"
      // Custom Styling
      labelClassName="text-purple-900 font-semibold mb-2"
      triggerClassName="border-2 border-purple-300 rounded-xl px-4 py-3 hover:border-purple-500 transition-all"
      menuClassName="shadow-2xl border-2 border-purple-200 rounded-xl"
      optionClassName="hover:bg-purple-50 px-4 py-3"
      selectedOptionClassName="bg-purple-100 text-purple-900"
      // Theme
      theme={{
        primaryColor: "#a855f7",
        focusBorderColor: "#c084fc",
        multiSelectSelectedOptionBackgroundColor: "#a855f7",
        multiSelectSelectedOptionTextColor: "#ffffff",
      }}
      // Custom Icon
      arrowIcon={
        <svg
          className="w-5 h-5 text-purple-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
          />
        </svg>
      }
    />
  );
}
```

## ⌨️ Keyboard Shortcuts

| Key          | Action                                    |
| ------------ | ----------------------------------------- |
| `Enter`      | Open dropdown / Select highlighted option |
| `Escape`     | Close dropdown                            |
| `Arrow Down` | Move to next option                       |
| `Arrow Up`   | Move to previous option                   |
| `Type`       | Search for options (when searchable)      |

## 📖 Option Structure

```tsx
interface DropdownOption {
  value: string | number; // Unique identifier
  label: ReactNode; // Display text or component
  disabled?: boolean; // Disable this option
  group?: string; // Group name (for future grouping)
}
```

## 🤝 TypeScript Support

Full TypeScript definitions included:

```tsx
import {
  Dropdown,
  DropdownProps,
  DropdownOption,
  DropdownTheme,
} from "your-dropdown-package";

const options: DropdownOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
];

const theme: DropdownTheme = {
  primaryColor: "#3b82f6",
};

function MyComponent() {
  return <Dropdown options={options} theme={theme} />;
}
```

## 💡 Tips & Best Practices

1. **Performance**: For large lists (100+ items), consider using pagination or virtual scrolling
2. **Search**: Enable `searchable` for lists with more than 10 items
3. **Multi-select**: Great for filters and tags, but avoid for too many options (use transfer list instead)
4. **Theming**: Use `theme` prop for colors, `className` props for layout/spacing
5. **Custom Icons**: SVGs work best - keep them simple and sized appropriately

## 🐛 Troubleshooting

**Dropdown menu is cut off**

- Remove `overflow-hidden` from parent containers
- Ensure parent has enough space or use a portal

**Search not working**

- Make sure `searchable={true}` is set
- Search works on the option's `label` field

**Styles not applying**

- Check that Tailwind classes are included in your build
- When using `triggerClassName`, it overrides default styles completely

## 📄 License

MIT

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
