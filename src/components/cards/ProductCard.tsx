import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Product } from "../../database/entities/Product";
import { Colors, Spacing, Typography } from "../../theme";

type Props = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>

      <View style={styles.left}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text
          style={styles.details}
          numberOfLines={1}
        >
          {product.brand || "No Brand"} • {product.category} • {product.unit}
        </Text>

      </View>

      <View style={styles.actions}>

        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.icon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.icon}>🗑️</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 10,

    paddingHorizontal: 14,

    borderBottomWidth: 1,

    borderBottomColor: "#ECECEC",

    backgroundColor: "white",
  },

  left: {
    flex: 1,
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  details: {
    marginTop: 2,
    color: Colors.textLight,
    fontSize: 13,
  },

  actions: {
    flexDirection: "row",
  },

  icon: {
    fontSize: 22,
    marginLeft: 16,
  },

});