# @your-username/dropdown

A highly customizable, accessible, and premium React Dropdown component built with TypeScript and Tailwind-inspired styling.

## Features

- 🎨 **Premium Aesthetics**: Smooth animations and modern design.
- 🔍 **Searchable**: Built-in search functionality for large option sets.
- 📦 **Multi-select**: Support for selecting multiple values with chip display.
- 🛠️ **Field Mapping**: Use custom keys for `label`, `value`, and `sublabel`.
- 📝 **Sublabels**: Support for descriptive subtext below each option.
- ⌨️ **Keyboard Accessible**: Full support for arrow keys, enter, and escape.
- 📱 **Responsive**: Works seamlessly on mobile and desktop.
- 🎨 **Themable**: Easy customization via theme props.

---

## Installation

```bash
npm install @your-username/dropdown
# or
yarn add @your-username/dropdown
# or
pnpm add @your-username/dropdown
```

## Basic Usage

```tsx
import { Dropdown } from "@your-username/dropdown";
import { useState } from "react";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

function App() {
  const [value, setValue] = useState("1");

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={setValue}
      label="Select an Option"
    />
  );
}
```

---

## Advanced Features

### 1. Dynamic Field Mapping

If your data doesn't use the standard `label` and `value` keys, you can map them using props:

```tsx
const users = [
  { id: 101, fullName: "John Doe", role: "Admin" },
  { id: 102, fullName: "Jane Smith", role: "User" },
];

<Dropdown
  options={users}
  valueField="id" // Use 'id' for the value logic
  labelField="fullName" // Use 'fullName' for the display label
  sublabelField="role" // Use 'role' for the descriptive text
  value={selectedUserId}
  onChange={setSelectedUserId}
/>;
```

### 2. Multi-Select & Searchable

Enable multiple selections and search filter:

```tsx
<Dropdown
  options={options}
  multiSelect
  searchable
  placeholder="Search and select many..."
/>
```

---

## Props API

| Prop            | Type                                 | Default       | Description                                |
| :-------------- | :----------------------------------- | :------------ | :----------------------------------------- |
| `options`       | `DropdownOption[]`                   | `[]`          | Array of option objects.                   |
| `value`         | `any`                                | -             | Current selected value(s).                 |
| `onChange`      | `(value: any, option?: any) => void` | -             | Callback when selection changes.           |
| `label`         | `ReactNode`                          | -             | Label displayed above the dropdown.        |
| `labelField`    | `string`                             | `"label"`     | Field name to use as labels in options.    |
| `valueField`    | `string`                             | `"value"`     | Field name to use as values in options.    |
| `sublabelField` | `string`                             | `"sublabel"`  | Field name to use as sublabels in options. |
| `searchable`    | `boolean`                            | `false`       | Enable/disable search input.               |
| `multiSelect`   | `boolean`                            | `false`       | Enable/disable multiple selection.         |
| `disabled`      | `boolean`                            | `false`       | Disable the component.                     |
| `loading`       | `boolean`                            | `false`       | Show a loading spinner.                    |
| `placeholder`   | `string`                             | `"Select..."` | Placeholder text.                          |
| `theme`         | `DropdownTheme`                      | -             | UI theme customization object.             |

---

## Guidelines for Publishing and Usage

### How to Publish

1.  **Prepare for Publishing**:
    - Build the package to generate the `dist` folder:
      ```bash
      npm run build
      ```
    - Ensure your `package.json` has a unique `name` (e.g., `@your-org/dropdown`).
    - Login to NPM:
      ```bash
      npm login
      ```

2.  **Publish**:
    - For public scoped packages:
      ```bash
      npm publish --access public
      ```
    - For private packages (requires paid plan):
      ```bash
      npm publish
      ```

3.  **Versioning**:
    - Update the version before publishing new changes:
      ```bash
      npm version patch # 1.0.0 -> 1.0.1
      ```

### How to Use in Your Projects

1.  **Import Styles**:
    Make sure your project supports CSS imports (standard in Next.js/Vite). The component uses Tailwind-like CSS variables.
2.  **External Styling**:
    You can pass `className` or `triggerClassName`, `menuClassName`, and `optionClassName` to stylize the component using your utility classes (like Tailwind).

3.  **Types**:
    The package includes TypeScript definitions (`.d.ts`) automatically, so you'll get full IntelliSense in VS Code.

---

## License

MIT © [your-username]
