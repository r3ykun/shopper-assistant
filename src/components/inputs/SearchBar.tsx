import React from "react";
import {
  TextInput,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
    value: string;
    placeholder: string;
    onChangeText: (text:string)=>void;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: 12,

    padding: Spacing.md,

    fontSize: Typography.body,

    marginBottom: Spacing.lg,
  },
});