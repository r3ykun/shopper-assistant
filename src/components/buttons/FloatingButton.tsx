import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import { Colors } from "../../theme";

type Props = {
  onPress: () => void;
};

export default function FloatingButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.icon}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 25,
    bottom: 75,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  icon: {
    fontSize: 34,
    color: "white",
    marginTop: -2,
  },
});