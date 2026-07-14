import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
  label: string;
  selectedValue: string;
  items: string[];
  onValueChange: (value: string) => void;
};

export default function AppDropdown({
  label,
  selectedValue,
  items,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={Colors.text}
          mode="dropdown"
        >
          {items.map(item => (
            <Picker.Item
              key={item}
              label={item}
              value={item}
              color={Colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
    marginBottom: Spacing.md,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    fontWeight: "600",
    color: Colors.text,
  },

  pickerContainer: {
    minHeight: 54,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: "hidden",
    elevation: 2,
  },

  picker: {
    width: "100%",
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
});