import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

export interface DropdownItem {
  label: string;
  value: string;
  keywords?: string[];
  section?: string;
  icon?: string;
}

type Props = {
  label: string;
  selectedValue: string;
  items: Array<string | DropdownItem>;
  onValueChange: (value: string) => void;

  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  error?: string;
};

export default function AppDropdown({
  label,
  selectedValue,
  items,
  onValueChange,

  isOpen,
  onOpen,
  onClose,

  placeholder = "Select an option",
  disabled = false,
  searchable,
  searchPlaceholder = "Search...",
  error,
}: Props) {

  const normalizedItems = useMemo<
    DropdownItem[]
  >(() => {
    return items.map(item => {
      if (typeof item === "string") {
        return {
          label: item,
          value: item,
        };
      }

      return item;
    });
  }, [items]);

  const [internalOpen, setInternalOpen] =
  useState(false);

  const dropdownOpen =
    isOpen ?? internalOpen;

  const [searchText, setSearchText] =
    useState("");

  const arrowRotation =
    useRef(new Animated.Value(0)).current;

  /*
   * Automatically enable search when the list
   * contains more than 10 items, unless explicitly
   * configured through the searchable prop.
   */
  const shouldShowSearch =
    searchable ??
    normalizedItems.length > 10;

  const filteredItems = useMemo(() => {
    const normalizedSearch =
      searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return normalizedItems;
    }

    return normalizedItems.filter(item => {
      const searchableTerms = [
        item.label,
        item.value,
        item.section ?? "",
        ...(item.keywords ?? []),
      ];

      return searchableTerms.some(term =>
        term
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [
    normalizedItems,
    searchText,
  ]);

  const showSectionHeaders = useMemo(
    () =>
      filteredItems.some(
        item => Boolean(item.section)
      ),
    [filteredItems]
  );

  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: dropdownOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();

    if (!dropdownOpen) {
      setSearchText("");
      Keyboard.dismiss();
    }
  }, [
    dropdownOpen,
    arrowRotation,
  ]);

  /*
   * Close the dropdown if its selected value is
   * removed from the available items.
   */
  useEffect(() => {
    if (
      dropdownOpen &&
      selectedValue &&
      !normalizedItems.some(
        item => item.value === selectedValue
      )
    ) {
      closeDropdown();
    }
  }, [
    dropdownOpen,
    normalizedItems,
    selectedValue,
  ]);

  const rotateArrow =
    arrowRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

  function openDropdown() {
    if (onOpen) {
      onOpen();
    } else {
      setInternalOpen(true);
    }
  }

  function closeDropdown() {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  }

  function toggleDropdown() {
    if (disabled) {
      return;
    }

    if (dropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function handleSelect(value: string) {
    onValueChange(value);
    closeDropdown();
    setSearchText("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Pressable
        disabled={disabled}
        onPress={toggleDropdown}
        android_ripple={{
          color: Colors.border,
        }}
        style={({ pressed }) => [
          styles.field,

          dropdownOpen &&
            styles.fieldOpen,

          error &&
            styles.fieldError,

          disabled &&
            styles.fieldDisabled,

          pressed &&
            !disabled &&
            styles.fieldPressed,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.selectedText,

            !selectedValue &&
              styles.placeholderText,

            disabled &&
              styles.disabledText,
          ]}
        >
          {selectedValue || placeholder}
        </Text>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.arrowContainer,
            {
              transform: [
                {
                  rotate: rotateArrow,
                },
              ],
            },
          ]}
        >
          <Ionicons
            name="chevron-down"
            size={20}
            color={
              disabled
                ? Colors.border
                : Colors.text
            }
          />
        </Animated.View>
      </Pressable>

      {dropdownOpen && (
        <View style={styles.optionsContainer}>
          {shouldShowSearch && (
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={19}
                color={Colors.text}
              />

              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder={
                  searchPlaceholder
                }
                placeholderTextColor={
                  Colors.textLight ??
                  Colors.text
                }
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.searchInput}
              />

              {searchText.length > 0 && (
                <Pressable
                  onPress={() =>
                    setSearchText("")
                  }
                  hitSlop={10}
                >
                  <Ionicons
                    name="close-circle"
                    size={19}
                    color={Colors.text}
                  />
                </Pressable>
              )}
            </View>
          )}

          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
            style={styles.optionsScroll}
            contentContainerStyle={
              styles.optionsContent
            }
          >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isSelected =
                    item.value === selectedValue;

                  const previousItem =
                    filteredItems[index - 1];

                  const shouldShowSectionHeader =
                    showSectionHeaders &&
                    Boolean(item.section) &&
                    (
                      index === 0 ||
                      previousItem?.section !== item.section
                    );

                  return (
                    <React.Fragment
                      key={`${item.section ?? "default"}-${item.value}`}
                    >
                      {shouldShowSectionHeader && (
                        <View style={styles.sectionHeader}>
                          <Text style={styles.sectionHeaderText}>
                            {item.section}
                          </Text>

                          <View style={styles.sectionDivider} />
                        </View>
                      )}

                      <Pressable
                        onPress={() =>
                          handleSelect(item.value)
                        }
                        android_ripple={{
                          color: Colors.border,
                        }}
                        style={({ pressed }) => [
                          styles.option,

                          isSelected &&
                            styles.selectedOption,

                          pressed &&
                            styles.optionPressed,
                        ]}
                      >
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.optionText,

                            isSelected &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {item.label}
                        </Text>

                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={21}
                            color={
                              isSelected
                                ? "#FFFFFF"
                                : Colors.primary
                            }
                          />
                        )}
                      </Pressable>
                    </React.Fragment>
                  );
                })
              ) : (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="search-outline"
                  size={24}
                  color={Colors.text}
                />

                <Text style={styles.emptyText}>
                  No results found for
                  {" "}
                  “{searchText}”
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {!!error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    fontWeight: "600",
    color: Colors.text,
  },

  field: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: Spacing.md,
    paddingRight: 48,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,

    backgroundColor: Colors.surface,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
    overflow: "hidden",
  },

  fieldOpen: {
    borderColor: Colors.primary,

    /*
     * The bottom corners become slightly less
     * rounded to visually connect with the list.
     */
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  fieldError: {
    borderColor: "#D32F2F",
  },

  fieldDisabled: {
    opacity: 0.55,
  },

  fieldPressed: {
    opacity: 0.9,
  },

  selectedText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.text,
  },

  placeholderText: {
    color:
      Colors.textLight ??
      Colors.text,
  },

  disabledText: {
    color:
      Colors.textLight ??
      Colors.text,
  },

  arrowContainer: {
    position: "absolute",
    right: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },

  optionsContainer: {
    marginTop: 6,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,

    backgroundColor: Colors.surface,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 8,

    elevation: 5,
    overflow: "hidden",
  },

  searchContainer: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,

    paddingHorizontal: Spacing.md,

    borderBottomWidth: 1,
    borderBottomColor: Colors.border,

    backgroundColor: Colors.surface,
  },

  searchInput: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 0,

    fontSize: Typography.body,
    color: Colors.text,
  },

  optionsScroll: {
    maxHeight: 260,
  },

  optionsContent: {
    paddingVertical: 4,
  },

  option: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,

    backgroundColor: Colors.surface,
  },

  selectedOption: {
    backgroundColor: Colors.primary ?? Colors.surface,
  },

  optionPressed: {
    opacity: 0.8,
  },

  optionText: {
    flex: 1,
    marginRight: Spacing.md,

    fontSize: Typography.body,
    color: Colors.text,
  },

  selectedOptionText: {
    fontWeight: "500",
    color: "white",
  },

  emptyContainer: {
    minHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },

  emptyText: {
    marginTop: Spacing.sm,
    textAlign: "center",
    fontSize: Typography.body,
    color:
      Colors.textLight ??
      Colors.text,
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#D32F2F",
  },

  sectionHeader: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 6,

    backgroundColor: Colors.surface,
  },

  sectionHeaderText: {
    marginRight: Spacing.sm,

    fontSize: 12,
    fontWeight: "700",
    color:
      Colors.textLight ??
      Colors.text,

    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  sectionDivider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
  },
});