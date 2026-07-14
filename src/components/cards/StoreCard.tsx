import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";

import { Store } from "../../database/entities/Store";
import { Colors, Typography } from "../../theme";

type Props = {
  store: Store;
  selected: boolean;
  onPress: () => void;
};

export default function StoreCard({
  store,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.logoContainer}>
        <Image
          source={store.logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text
        numberOfLines={2}
        style={styles.name}
      >
        {store.shortName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    margin: 6,

    height: 150,

    borderRadius: 18,

    justifyContent: "space-evenly",
    alignItems: "center",

    backgroundColor: Colors.surface,

    borderWidth: 2,
    borderColor: Colors.border,

    elevation: 3,

    shadowColor: "#301616",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
    width: 0,
    height: 2,
    },
  },

  selected: {
    borderColor: Colors.primary,
    backgroundColor: "#EAF4FF",
  },

  logoContainer: {
    width: 90,
    height: 90,

    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  name: {
    fontSize: Typography.body,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.text,
    paddingHorizontal: 8,
  },
});