import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Spacing,
} from "../../theme";

export type AutofillState =
  | "auto"
  | "manual"
  | "locked";

export type AutofillConfidence =
  | "high"
  | "medium"
  | "low";

type Props = {
  state: AutofillState;
  confidence?: AutofillConfidence;
};

type IndicatorConfig = {
  icon: string;
  label: string;
  textColor: string;
  backgroundColor: string;
};

const STATE_CONFIG: Record<
  AutofillState,
  IndicatorConfig
> = {
  auto: {
    icon: "✨",
    label: "Auto",
    textColor: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },

  manual: {
    icon: "✏️",
    label: "Manual",
    textColor: "#1565C0",
    backgroundColor: "#E3F2FD",
  },

  locked: {
    icon: "🔒",
    label: "Locked",
    textColor: "#EF6C00",
    backgroundColor: "#FFF3E0",
  },
};

const CONFIDENCE_LABELS: Record<
  AutofillConfidence,
  string
> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function AutofillIndicator({
  state,
  confidence,
}: Props) {
  const config = STATE_CONFIG[state];

  const shouldShowConfidence =
    state === "auto" &&
    confidence !== undefined;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            config.backgroundColor,
        },
      ]}
    >
      <Text style={styles.icon}>
        {config.icon}
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: config.textColor,
          },
        ]}
      >
        {config.label}

        {shouldShowConfidence
          ? ` · ${
              CONFIDENCE_LABELS[
                confidence
              ]
            }`
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",

    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,

    borderRadius: 999,
  },

  icon: {
    marginRight: 4,
    fontSize: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
  },
});