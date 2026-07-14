import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors, Spacing, Typography } from "../../theme";

type Props = {
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
};

export default function DashboardCard({
  title,
  subtitle,
  icon,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>
        {icon}
      </Text>

      <View>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: 18,

    padding: Spacing.lg,

    marginBottom: Spacing.lg,

    flexDirection: "row",

    alignItems: "center",

    elevation: 3,
  },

  icon: {
    fontSize: 32,

    marginRight: Spacing.lg,
  },

  title: {
    fontSize: Typography.heading,

    fontWeight: "600",

    color: Colors.text,
  },

  subtitle: {
    fontSize: Typography.caption,

    color: Colors.textLight,

    marginTop: 2,
  },
});