import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../theme";

export default function ProductTableHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.productColumn}>
        <Text style={styles.text}>
          Product
        </Text>
      </View>

      <View style={styles.priceColumn}>
        <Text style={styles.text}>
          SRP
        </Text>
      </View>

      <View style={styles.priceColumn}>
        <Text style={styles.text}>
          Store Price
        </Text>
      </View>

      <View style={styles.actionColumn}>
        <Text style={styles.text}>
          Actions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  text: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "white",
  },

  productColumn: {
    flex: 2.2,
  },

  priceColumn: {
    flex: 0.9,
    alignItems: "center",
  },

  actionColumn: {
    width: 50,
    alignItems: "center",
  },
});