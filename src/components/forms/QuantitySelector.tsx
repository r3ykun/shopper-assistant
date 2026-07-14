import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Spacing,
} from "../../theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
  minimum?: number;
};

export default function QuantitySelector({
  value,
  onChange,
  minimum = 1,
}: Props) {
  function decrease() {
    const currentValue = Number(value || minimum);

    onChange(
      Math.max(
        minimum,
        currentValue - 1
      ).toString()
    );
  }

  function increase() {
    const currentValue = Number(value || 0);

    onChange(
      (currentValue + 1).toString()
    );
  }

  function handleTextChange(text: string) {
    const numbersOnly =
      text.replace(/\D/g, "");

    onChange(numbersOnly);
  }

  function handleEndEditing() {
    const numericValue = Number(value);

    if (!value || numericValue < minimum) {
      onChange(minimum.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Quantity
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={decrease}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            −
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value}
          keyboardType="number-pad"
          selectTextOnFocus
          onChangeText={handleTextChange}
          onEndEditing={handleEndEditing}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
  },

  label: {
    marginBottom: Spacing.sm,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },

  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 28,
  },

  input: {
    width: 84,
    height: 44,
    marginHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },
});