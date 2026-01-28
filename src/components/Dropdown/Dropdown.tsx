import { useState, useRef, useEffect, useMemo } from "react";
import type { FC } from "react";
import type { DropdownProps, DropdownOption } from "./Dropdown.types";

// Inline styles to avoid Tailwind dependency in consumer projects
const styles = {
  container: {
    position: "relative" as const,
    width: "100%",
  },
  containerDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  label: {
    display: "block",
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.2s",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
  },
  triggerContent: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "4px",
    flex: 1,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    outline: "none",
    border: "none",
    background: "transparent",
    minWidth: "60px",
    fontSize: "inherit",
    color: "inherit",
    padding: 0,
    margin: 0,
  },
  placeholder: {
    color: "#9ca3af",
  },
  multiTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  multiTagRemove: {
    marginLeft: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    opacity: 0.8,
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "dropdown-spin 1s linear infinite",
  },
  clearButton: {
    padding: "4px",
    borderRadius: "50%",
    transition: "background-color 0.2s",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "12px",
    height: "12px",
    color: "#9ca3af",
  },
  chevronContainer: {
    transition: "transform 0.2s",
  },
  chevronIcon: {
    width: "16px",
    height: "16px",
    color: "#6b7280",
  },
  menu: {
    position: "absolute" as const,
    zIndex: 50,
    width: "100%",
    marginTop: "4px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    maxHeight: "240px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
  },
  loadingContainer: {
    padding: "32px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#9ca3af",
  },
  loadingSpinner: {
    width: "24px",
    height: "24px",
    border: "2px solid",
    borderTopColor: "transparent",
    borderRadius: "50%",
    marginRight: "8px",
    animation: "dropdown-spin 1s linear infinite",
  },
  optionsList: {
    padding: "4px 0",
    overflowY: "auto" as const,
    margin: 0,
    listStyle: "none",
  },
  option: {
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  optionContent: {
    display: "flex",
    flexDirection: "column" as const,
  },
  sublabel: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px",
  },
  checkIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  noOptions: {
    padding: "8px 16px",
    color: "#6b7280",
    textAlign: "center" as const,
    fontSize: "14px",
  },
};

// Inject keyframes for spinner animation
const injectKeyframes = () => {
  if (typeof document === "undefined") return;
  const styleId = "dropdown-keyframes";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes dropdown-spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};

export const Dropdown: FC<DropdownProps> = ({
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
  labelField = "label",
  valueField = "value",
  sublabelField = "sublabel",
  sublabelClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inject keyframes on mount
  useEffect(() => {
    injectKeyframes();
  }, []);

  // Styling Logic
  const themeStyles = useMemo(() => {
    const defaultTheme = {
      primaryColor: "#3b82f6",
      backgroundColor: "#ffffff",
      hoverColor: "#eff6ff",
      textColor: "#1f2937",
      padding: "0.5rem 1rem",
      menuBackgroundColor: "#ffffff",
      optionTextColor: "#1f2937",
      selectedOptionTextColor: "#3b82f6",
      selectedOptionBackgroundColor: "#eff6ff",
      multiSelectSelectedOptionTextColor: "#1e40af",
      multiSelectSelectedOptionBackgroundColor: "#dbeafe",
      focusBorderColor: "#3b82f6",
    };

    const userTheme = theme || {};
    const processedSelectedText =
      userTheme.selectedOptionTextColor ??
      userTheme.primaryColor ??
      defaultTheme.selectedOptionTextColor;
    const processedSelectedBg =
      userTheme.selectedOptionBackgroundColor ??
      userTheme.hoverColor ??
      defaultTheme.selectedOptionBackgroundColor;
    const processedMultiSelectedText =
      userTheme.multiSelectSelectedOptionTextColor ?? "#1e40af";
    const processedMultiSelectedBg =
      userTheme.multiSelectSelectedOptionBackgroundColor ?? "#dbeafe";

    return {
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
  }, [theme]);

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
      return options.filter((opt) => value.includes(opt[valueField]));
    }
    const found = options.find((opt) => opt[valueField] === value);
    return found ? [found] : [];
  };

  const selectedOptions = getSelectedOptions();

  const handleOptionClick = (option: DropdownOption, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (option.disabled) return;

    let newValue: any;
    let newOption: DropdownOption | DropdownOption[];

    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const isSelected = currentValues.includes(option[valueField]);

      if (isSelected) {
        newValue = currentValues.filter((v) => v !== option[valueField]);
      } else {
        newValue = [...currentValues, option[valueField]];
      }
      newOption = options.filter((opt) =>
        (newValue as any[]).includes(opt[valueField])
      );
    } else {
      newValue = option[valueField];
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
    const newOptions = options.filter((opt) =>
      newValue.includes(opt[valueField])
    );

    onChange(newValue, newOptions);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOpen && searchable) {
      setSearchValue("");
      setIsOpen(false);
      return;
    }

    if (onChange) {
      onChange(multiSelect ? [] : "", multiSelect ? [] : []);
    }
  };

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) => {
        if (!searchable || !searchValue) return true;
        const labelString =
          typeof opt[labelField] === "string"
            ? opt[labelField]
            : String(opt[valueField]);
        return labelString.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [options, searchable, searchValue, labelField, valueField]
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
      className={className}
      style={{
        ...styles.container,
        ...(disabled ? styles.containerDisabled : {}),
        ...style,
      }}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          className={labelClassName}
          onClick={toggleDropdown}
          style={{
            ...styles.label,
            ...(theme?.textColor ? { color: theme.textColor } : {}),
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger / Input Area */}
      <div
        onClick={handleTriggerClick}
        className={triggerClassName}
        style={{
          ...styles.trigger,
          backgroundColor: themeStyles.backgroundColor,
          color: themeStyles.textColor,
          padding: themeStyles.padding,
          minHeight: "42px",
          borderColor: isOpen ? themeStyles.focusBorderColor : "#d1d5db",
          ...triggerStyle,
        }}
        role="button"
        tabIndex={searchable ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div style={styles.triggerContent}>
          {searchable && (isOpen || selectedOptions.length === 0) ? (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedOptions.length === 0 ? placeholder : "Search..."
              }
              style={{
                ...styles.searchInput,
                color: themeStyles.textColor,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
              disabled={disabled}
            />
          ) : selectedOptions.length === 0 ? (
            <span style={styles.placeholder}>{placeholder}</span>
          ) : multiSelect ? (
            selectedOptions.map((opt) => (
              <span
                key={opt[valueField]}
                style={{
                  ...styles.multiTag,
                  backgroundColor:
                    themeStyles.multiSelectSelectedOptionBackgroundColor,
                  color: themeStyles.multiSelectSelectedOptionTextColor,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {opt[labelField]}
                <span
                  style={{
                    ...styles.multiTagRemove,
                    color: themeStyles.multiSelectSelectedOptionTextColor,
                  }}
                  onClick={(e) => handleRemoveOption(opt[valueField], e)}
                >
                  ×
                </span>
              </span>
            ))
          ) : (
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedOptions[0][labelField]}
            </span>
          )}
        </div>

        <div style={styles.actionsContainer}>
          {loading && (
            <div
              style={{
                ...styles.spinner,
                borderColor: themeStyles.primaryColor,
                borderTopColor: "transparent",
              }}
            />
          )}

          {/* Clear Icon */}
          {!loading &&
            !disabled &&
            (selectedOptions.length > 0 ||
              (isOpen && searchable && searchValue)) && (
              <div
                onClick={handleClear}
                style={styles.clearButton}
                title={
                  isOpen && searchable ? "Clear search" : "Clear selection"
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg
                  style={styles.icon}
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
            className={arrowIconClassName}
            style={{
              ...styles.chevronContainer,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {arrowIcon ? (
              arrowIcon
            ) : (
              <svg
                style={styles.chevronIcon}
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
          className={menuClassName}
          style={{
            ...styles.menu,
            backgroundColor: themeStyles.menuBackgroundColor,
          }}
        >
          {loading ? (
            <div style={styles.loadingContainer}>
              <div
                style={{
                  ...styles.loadingSpinner,
                  borderColor: themeStyles.primaryColor,
                  borderTopColor: "transparent",
                }}
              />
              Loading options...
            </div>
          ) : (
            <ul ref={listRef} style={styles.optionsList} role="listbox">
              {filteredOptions.length === 0 ? (
                <li style={styles.noOptions}>No options found</li>
              ) : (
                filteredOptions.map((option, index) => {
                  const checked = isSelected(option[valueField]);
                  const isHighlighted = index === highlightedIndex;
                  const isDisabledOption = option.disabled;

                  let bgColor = "transparent";
                  if (checked) {
                    bgColor = themeStyles.selectedOptionBackgroundColor;
                  } else if (isHighlighted) {
                    bgColor = themeStyles.hoverColor;
                  }

                  return (
                    <li
                      key={option[valueField]}
                      className={`${optionClassName} ${checked ? selectedOptionClassName : ""}`}
                      style={{
                        ...styles.option,
                        ...(isDisabledOption ? styles.optionDisabled : {}),
                        backgroundColor:
                          optionClassName || selectedOptionClassName
                            ? undefined
                            : bgColor,
                        color:
                          optionClassName || selectedOptionClassName
                            ? undefined
                            : checked
                              ? themeStyles.selectedOptionTextColor
                              : themeStyles.optionTextColor,
                        fontWeight: checked ? 500 : 400,
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={checked}
                      onClick={(e) => handleOptionClick(option, e)}
                    >
                      <div style={styles.optionContent}>
                        <span>{option[labelField]}</span>
                        {option[sublabelField] && (
                          <span
                            className={sublabelClassName}
                            style={styles.sublabel}
                          >
                            {option[sublabelField]}
                          </span>
                        )}
                      </div>
                      {checked && (
                        <svg
                          style={{
                            ...styles.checkIcon,
                            color: themeStyles.selectedOptionTextColor,
                          }}
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
