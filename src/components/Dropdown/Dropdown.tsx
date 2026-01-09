import React, { useState, useRef, useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import type { DropdownProps, DropdownOption } from "./Dropdown.types";

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  multiSelect = false,
  searchable = false,
  disabled = false,
  loading = false,
  className = "",
  style = {},
  theme,
  label,
  labelClassName = "",
  optionClassName = "",
  selectedOptionClassName = "",
  menuClassName = "",
  triggerClassName = "",
  triggerStyle = {},
  arrowIcon,
  arrowIconClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // ... (rest of state)
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Styling Logic
  const themeStyles = useMemo(() => {
    const defaultTheme = {
      primaryColor: "#3b82f6", // blue-500
      backgroundColor: "#ffffff",
      hoverColor: "#eff6ff", // blue-50
      textColor: "#1f2937", // gray-800
      padding: "0.5rem 1rem",
      menuBackgroundColor: "#ffffff",
      optionTextColor: "#1f2937",
      selectedOptionTextColor: "#3b82f6",
      selectedOptionBackgroundColor: "#eff6ff",
      multiSelectSelectedOptionTextColor: "#1e40af", // blue-800
      multiSelectSelectedOptionBackgroundColor: "#dbeafe", // blue-100
      focusBorderColor: "#3b82f6", // blue-500 (defaults to primaryColor)
    };

    const userTheme = theme || {};
    // Use user specific theme props if available, else fallback to relevant logical defaults
    const processedSelectedText =
      userTheme.selectedOptionTextColor ??
      userTheme.primaryColor ??
      defaultTheme.selectedOptionTextColor;
    const processedSelectedBg =
      userTheme.selectedOptionBackgroundColor ??
      userTheme.hoverColor ??
      defaultTheme.selectedOptionBackgroundColor;

    const processedMultiSelectedText =
      userTheme.multiSelectSelectedOptionTextColor ?? "#1e40af"; // default fallback

    const processedMultiSelectedBg =
      userTheme.multiSelectSelectedOptionBackgroundColor ?? "#dbeafe"; // default fallback

    const finalTheme = {
      ...defaultTheme,
      ...userTheme,
      menuBackgroundColor:
        userTheme.menuBackgroundColor ??
        userTheme.backgroundColor ??
        defaultTheme.menuBackgroundColor,
      optionTextColor:
        userTheme.optionTextColor ??
        userTheme.textColor ??
        defaultTheme.optionTextColor,
      selectedOptionTextColor: processedSelectedText,
      selectedOptionBackgroundColor: processedSelectedBg,
      multiSelectSelectedOptionTextColor: processedMultiSelectedText,
      multiSelectSelectedOptionBackgroundColor: processedMultiSelectedBg,
      focusBorderColor:
        userTheme.focusBorderColor ??
        userTheme.primaryColor ??
        defaultTheme.focusBorderColor,
    };

    return {
      "--dd-primary": finalTheme.primaryColor,
      "--dd-bg": finalTheme.backgroundColor,
      "--dd-hover": finalTheme.hoverColor,
      "--dd-text": finalTheme.textColor,
      "--dd-padding": finalTheme.padding,
      "--dd-menu-bg": finalTheme.menuBackgroundColor,
      "--dd-option-text": finalTheme.optionTextColor,
      "--dd-selected-text": finalTheme.selectedOptionTextColor,
      "--dd-selected-bg": finalTheme.selectedOptionBackgroundColor,
      "--dd-multi-selected-text": finalTheme.multiSelectSelectedOptionTextColor,
      "--dd-multi-selected-bg":
        finalTheme.multiSelectSelectedOptionBackgroundColor,
      "--dd-focus-border": finalTheme.focusBorderColor,
      ...style,
    } as CSSProperties;
  }, [theme, style]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(-1);
        setTimeout(() => {
          if (searchable && inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    }
  };

  const handleTriggerClick = () => {
    if (!searchable) {
      toggleDropdown();
    } else {
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(-1);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    }
  };

  const getSelectedOptions = (): DropdownOption[] => {
    if (value === undefined || value === null) return [];
    if (Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value));
    }
    const found = options.find((opt) => opt.value === value);
    return found ? [found] : [];
  };

  const selectedOptions = getSelectedOptions();

  const handleOptionClick = (option: DropdownOption, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (option.disabled) return;

    let newValue: string | number | (string | number)[];
    let newOption: DropdownOption | DropdownOption[];

    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const isSelected = currentValues.includes(option.value);

      if (isSelected) {
        newValue = currentValues.filter((v) => v !== option.value);
      } else {
        newValue = [...currentValues, option.value];
      }
      newOption = options.filter((opt) =>
        (newValue as (string | number)[]).includes(opt.value)
      );
    } else {
      newValue = option.value;
      newOption = option;
      setIsOpen(false);
      setSearchValue("");
    }

    if (onChange) {
      onChange(newValue, newOption);
    }
  };

  const handleRemoveOption = (
    optionValue: string | number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!onChange) return;

    const currentValues = Array.isArray(value) ? value : value ? [value] : [];
    const newValue = currentValues.filter((v) => v !== optionValue);
    const newOptions = options.filter((opt) => newValue.includes(opt.value));

    onChange(newValue, newOptions);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If dropdown is open and searchable, clear search and close dropdown
    if (isOpen && searchable) {
      setSearchValue("");
      setIsOpen(false);
      return;
    }

    // Otherwise, clear the selected values
    if (onChange) {
      onChange(multiSelect ? [] : "", multiSelect ? [] : []);
    }
  };

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) => {
        if (!searchable || !searchValue) return true;
        const labelString =
          typeof opt.label === "string" ? opt.label : String(opt.value);
        return labelString.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [options, searchable, searchValue]
  );

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (isOpen) {
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < filteredOptions.length
          ) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      default:
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const list = listRef.current;
      const element = list.children[highlightedIndex] as HTMLElement;
      if (element) {
        const listTop = list.scrollTop;
        const listBottom = listTop + list.clientHeight;
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.clientHeight;

        if (elementTop < listTop) {
          list.scrollTop = elementTop;
        } else if (elementBottom > listBottom) {
          list.scrollTop = elementBottom - list.clientHeight;
        }
      }
    }
  }, [highlightedIndex, isOpen]);

  const isSelected = (optionValue: string | number) => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      style={themeStyles}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          className={`block mb-1 text-sm font-medium text-gray-700 cursor-pointer ${labelClassName}`}
          onClick={toggleDropdown}
          style={theme ? { color: theme.textColor } : undefined}
        >
          {label}
        </label>
      )}

      {/* Trigger / Input Area */}
      <div
        onClick={handleTriggerClick}
        className={`
          flex items-center justify-between
          w-full
          bg-[var(--dd-bg)]
          cursor-pointer
          transition-all duration-200
          text-[var(--dd-text)]
          ${triggerClassName || "border rounded-lg"}
        `}
        style={{
          padding: triggerClassName ? undefined : "var(--dd-padding)",
          minHeight: triggerClassName ? undefined : "42px",
          borderColor: triggerClassName
            ? undefined
            : isOpen
            ? "var(--dd-focus-border)"
            : "#d1d5db",
          outline: "none",
          ...triggerStyle,
        }}
        role="button"
        tabIndex={searchable ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap gap-1 flex-1 overflow-hidden">
          {searchable && (isOpen || selectedOptions.length === 0) ? (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedOptions.length === 0 ? placeholder : "Search..."}
              className="flex-1 outline-none bg-transparent min-w-[60px]"
              onClick={(e) => {
                e.stopPropagation();
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
              disabled={disabled}
            />
          ) : selectedOptions.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : multiSelect ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center px-2 py-0.5 rounded text-sm animate-fadeIn"
                style={{
                  backgroundColor: "var(--dd-multi-selected-bg)",
                  color: "var(--dd-multi-selected-text)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {opt.label}
                <span
                  className="ml-1 cursor-pointer font-bold"
                  style={{ color: "currentColor", opacity: 0.8 }}
                  onClick={(e) => handleRemoveOption(opt.value, e)}
                >
                  &times;
                </span>
              </span>
            ))
          ) : (
            <span className="truncate">{selectedOptions[0].label}</span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {loading && (
            <div className="animate-spin h-4 w-4 border-2 border-[var(--dd-primary)] border-t-transparent rounded-full" />
          )}

          {/* Clear Icon */}
          {!loading &&
            !disabled &&
            (selectedOptions.length > 0 || (isOpen && searchable && searchValue)) && (
              <div
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
                title={
                  isOpen && searchable
                    ? "Clear search"
                    : "Clear selection"
                }
              >
                <svg
                  className="w-3 h-3 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}

          {/* Chevron Icon */}
          <div
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${arrowIconClassName}`}
          >
            {arrowIcon ? (
              arrowIcon
            ) : (
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 bg-[var(--dd-menu-bg)] border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col animate-enter ${menuClassName}`}
        >
          {loading ? (
            <div className="px-4 py-8 flex justify-center items-center text-gray-400">
              <div className="animate-spin h-6 w-6 border-2 border-[var(--dd-primary)] border-t-transparent rounded-full mr-2"></div>
              Loading options...
            </div>
          ) : (
            <ul ref={listRef} className="py-1 overflow-y-auto" role="listbox">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-gray-500 text-center text-sm">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const checked = isSelected(option.value);
                  const isHighlighted = index === highlightedIndex;
                  return (
                    <li
                      key={option.value}
                      className={`
                        px-4 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
                        text-[var(--dd-option-text)]
                        ${optionClassName}
                        ${checked ? selectedOptionClassName : ""}
                        `}
                      style={{
                        backgroundColor:
                          checked && selectedOptionClassName
                            ? undefined
                            : isHighlighted && !optionClassName
                            ? "var(--dd-hover)"
                            : checked
                            ? "var(--dd-selected-bg)"
                            : optionClassName
                            ? undefined
                            : "transparent",
                        color:
                          checked && selectedOptionClassName
                            ? undefined
                            : optionClassName
                            ? undefined
                            : checked
                            ? "var(--dd-selected-text)"
                            : "var(--dd-option-text)",
                        fontWeight: checked ? 500 : 400,
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={checked}
                      onClick={(e) => handleOptionClick(option, e)}
                    >
                      <span>{option.label}</span>
                      {checked && (
                        <svg
                          className="w-4 h-4"
                          style={{ color: "var(--dd-selected-text)" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
