import type { ReactNode, CSSProperties } from "react";

export interface DropdownOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  group?: string;
  [key: string]: any;
}

export interface DropdownTheme {
  primaryColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  menuBackgroundColor?: string;
  optionTextColor?: string;
  selectedOptionTextColor?: string;
  selectedOptionBackgroundColor?: string;
  multiSelectSelectedOptionTextColor?: string;
  multiSelectSelectedOptionBackgroundColor?: string;
}

export interface DropdownProps {
  /** Label for the dropdown */
  label?: ReactNode;

  /** Custom classes for the label */
  labelClassName?: string;

  /** Custom classes for dropdown option items */
  optionClassName?: string;

  /** Custom classes for selected options in the dropdown list (when dropdown is open) */
  selectedOptionClassName?: string;

  /** Custom classes for the dropdown menu wrapper/container */
  menuClassName?: string;

  /** Custom classes for the dropdown trigger/field area */
  triggerClassName?: string;

  /** Inline styles for the dropdown trigger/field area */
  triggerStyle?: CSSProperties;

  /** Array of options to display */
  options: DropdownOption[];

  /** Current selected value(s) */
  value?: string | number | (string | number)[];

  /** Callback when selection changes */
  onChange?: (
    value: string | number | (string | number)[],
    option?: DropdownOption | DropdownOption[]
  ) => void;

  /** Placeholder text when nothing is selected */
  placeholder?: string;

  /** Whether to allow selecting multiple options */
  multiSelect?: boolean;

  /** Whether to show a search input */
  searchable?: boolean;

  /** Custom functionality to handle search externally */
  onSearch?: (query: string) => void;

  /** Debounce delay for search in ms */
  searchDebounce?: number;

  /** Disable the entire dropdown */
  disabled?: boolean;

  /** Custom theme overrides */
  theme?: DropdownTheme;

  /** Whether the options are currently loading */
  loading?: boolean;

  /** Custom render function for options */
  renderOption?: (option: DropdownOption) => ReactNode;

  /** Custom render function for selected value */
  renderValue?: (value: DropdownOption | DropdownOption[]) => ReactNode;

  /** Custom class names */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;
}
