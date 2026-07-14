import React from "react";
import {
  View,
  Text,
 StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Spacing,
} from "../../theme";

type Props = {
  title: string;
};

export default function Header({
  title,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
  },

  title: {
    fontSize: Typography.title,
    fontWeight: "bold",
    color: Colors.text,
  },
});