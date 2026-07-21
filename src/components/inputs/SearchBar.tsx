//shopper-assistant\src\components\inputs\SearchBar.tsx
import React from "react";
import {
  Pressable,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";
import {
  Ionicons,
} from "@expo/vector-icons";

type Props = {
    value: string;
    placeholder: string;
    onChangeText: (text:string)=>void;
    onSubmitEditing?: () => void;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
}: Props) {

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={Colors.textLight}
        style={styles.searchIcon}
      />

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder ?? "Search"}
        placeholderTextColor={Colors.textLight}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => {
            onChangeText("");
          }}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clearButton}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={Colors.textLight}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },

  searchIcon: {
    marginRight: Spacing.sm,
  },

  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.text,
  },

  clearButton: {
    marginLeft: Spacing.sm,
  },
});