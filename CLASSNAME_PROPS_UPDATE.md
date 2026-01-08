# Dropdown ClassName Props Update

## Summary

Added two new className props to the Dropdown component for enhanced customization:

### New Props

1. **`optionClassName`** - Custom classes for dropdown option items in the list

   - Applied to each `<li>` element in the dropdown menu
   - Allows customization of individual option styling
   - Example: `optionClassName="hover:bg-purple-50 font-medium"`

2. **`selectedOptionClassName`** - Custom classes for selected options in the dropdown list

   - Applied to the `<li>` element when it's selected (when dropdown is open)
   - Works in both single-select and multi-select modes
   - **Takes precedence over theme-based styling** - when provided, theme colors for selected items are disabled
   - Complements the theme-based selected styling with custom classes
   - Example: `selectedOptionClassName="bg-red-500 text-white"`

3. **`menuClassName`** - Custom classes for the dropdown menu wrapper/container
   - Applied to the main dropdown menu container (the div that wraps all options)
   - Allows customization of the entire dropdown menu appearance
   - Example: `menuClassName="border-4 border-purple-500 shadow-2xl"`

### Important Notes

- When `selectedOptionClassName` is provided, it **overrides** the theme-based `backgroundColor` and `color` for selected items, allowing your custom classes to work properly
- `optionClassName` applies to all options and works alongside theme styling

### Usage Example

```tsx
<Dropdown
  label="Framework Selection"
  labelClassName="text-purple-600 font-bold"
  options={sampleOptions}
  value={value}
  onChange={setValue}
  placeholder="Select with custom classes"
  optionClassName="hover:bg-purple-50 font-medium"
  selectedOptionClassName="text-purple-600 font-semibold"
/>
```

## Files Modified

1. **`Dropdown.types.ts`** - Added type definitions for the new props
2. **`Dropdown.tsx`** - Implemented the props and applied them to the respective elements
3. **`App.tsx`** - Added a demo example showcasing the new functionality

## Benefits

- **Flexibility**: Users can now pass custom Tailwind or CSS classes directly to options
- **Consistency**: Follows the same pattern as `labelClassName`
- **Granular Control**: Separate control for option items vs selected value display
- **Non-Breaking**: All new props are optional with sensible defaults
