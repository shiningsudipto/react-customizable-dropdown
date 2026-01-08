# React Customizable Dropdown

A professional, fully customizable, and accessible dropdown/select component for React. Designed to provide the best user and developer experience with extensive styling options and performance optimizations.

## 🚀 Features

### Core Functionality

- **Selection Modes**: Supports both single and multi-select options.
- **Built-in Search**: Integrated search input with deboucing and configurable delay.
- **Keyboard Navigation**: Full support for Arrow keys, Enter, and Escape.
- **Accessibility**: ARIA-compliant roles for dropdowns, listboxes, and options.

### 🎨 Design & Customization

- **Icons**:
  - Default Dropdown and Clear/Close icons.
  - Fully replaceable via props.
  - toggle visibility and customize size, color, and position.
- **Styling System**:
  - Granular control over border radius (individual corners), padding, and margins.
  - Customizable typography (font size, weight).
  - State-based colors (background, hover, active, selected, disabled).
  - Configurable height, max-height, and scrollbar styling.
  - Support for both inline styles and className overrides.

### 🌗 Theming

- **Built-in Themes**: Default Light and Dark themes.
- **Custom Themes**: Extendable via a `ThemeProvider` or configuration object.
- **Dynamic Switching**: Toggle themes on the fly.

### ⚙️ Behavior & Control

- **State Management**: Supports both controlled and uncontrolled modes.
- **Custom Renderers**:
  - `renderOption`: Customize how options appear in the list.
  - `renderValue`: Customize the selected value display.
  - `renderEmptyState`: Custom UI for no results.
- **Data Handling**: Support for option grouping and async data loading.

### ⚡ Performance

- **Optimized**: Memoized rendering for options.
- **Virtualization**: Optional support for handling large datasets efficiently.
- **Debounced Search**: Minimized re-renders during search.

## 📦 API Design (Draft)

The library aims for a clean, predictable, and strongly typed API.

### Components

- `<Dropdown />` - The main component.
- `<Dropdown.Option />` - Sub-component for options (if using composition).
- `<Dropdown.Group />` - Sub-component for grouped options.

### Developer Experience

- **TypeScript**: Written in TypeScript with full type definitions.
- **Tree-Shakable**: Minimal bundle size impact.
- **SSR Compatible**: Ready for Next.js and server-side rendering.
- **Documentation**: Comprehensive props documentation and examples.

## 🛠 Usage Examples

### Basic Usage

```tsx
import { Dropdown } from "your-package";

<Dropdown options={options} onSelect={(value) => console.log(value)} />;
```

### Searchable & Multi-Select

```tsx
<Dropdown
  options={options}
  multiSelect
  searchable
  searchDebounce={300}
  placeholder="Select items..."
/>
```

### Themed & Styled

```tsx
<Dropdown
  theme="dark"
  style={{ borderRadius: "8px" }}
  renderOption={(option) => <span>⭐ {option.label}</span>}
/>
```

## 📋 Roadmap

1. **Setup**: Initialize project with React 18+ and TypeScript.
2. **Core Implementation**: Build basic dropdown logic and UI.
3. **Styling Engine**: Implement the customization and theming system.
4. **Advanced Features**: Add search, async support, and virtualization.
5. **Testing**: Unit tests and accessibility audits.
6. **Documentation**: Write detailed docs and usage examples.
