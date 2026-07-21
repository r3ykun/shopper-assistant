//shopper-assistant\src\components\forms\AppTextInput.tsx
import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import AutofillIndicator, {
  AutofillState,
  AutofillConfidence,
} from "./AutofillIndicator";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
  label?: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  error?: string;
  prefix?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  onFocus?: () => void;
  autofillState?: AutofillState;
  autofillConfidence?: AutofillConfidence;
};

export default function AppTextInput({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  prefix,
  keyboardType,
  editable = true,
  autoCapitalize = "sentences",
  onFocus,
  autofillState,
  autofillConfidence,
}: Props) {
  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.labelRow}>
            <Text style={styles.label}>
                {label}
            </Text>

            {autofillState && (
                <AutofillIndicator
                    state={autofillState}
                    confidence={autofillConfidence}
                />
            )}
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
          !editable ? styles.disabled : null,
        ]}
      >
        {prefix ? (
          <Text style={styles.prefix}>
            {prefix}
          </Text>
        ) : null}

        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize={autoCapitalize}
          onFocus={onFocus}
        />
      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: Typography.body,
    fontWeight: "600",
    color: Colors.text,
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },

  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: Typography.body,
    color: Colors.text,
  },

  prefix: {
    marginRight: Spacing.sm,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  inputError: {
    borderColor: "#D32F2F",
  },

  error: {
    marginTop: 5,
    fontSize: 12,
    color: "#D32F2F",
  },

  disabled: {
    opacity: 0.65,
    backgroundColor: Colors.background,
  },

  labelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.sm,
  },
});