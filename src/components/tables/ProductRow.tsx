import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "../../database/entities/Product";
import { Colors } from "../../theme";

type Props = {
  product: Product;
  storePrice: number | null;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductRow({
  product,
  storePrice,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.productColumn}>
        <Text
          style={styles.brand}
          numberOfLines={1}
        >
          {product.brand || "No Brand"}
        </Text>

        <Text
          style={styles.productName}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={styles.category}
          numberOfLines={1}
        >
          {product.category || "Uncategorized"}
        </Text>

        <Text
          style={styles.barcode}
          numberOfLines={1}
        >
          #{product.barcode}
        </Text>

        <Text style={styles.measurement}>
          {product.measurement ?? 1}{" "}
          {product.unit || ""}
        </Text>
      </View>

      <View style={styles.priceColumn}>
        <Text style={styles.price}>
          {product.srp !== undefined &&
          product.srp !== null
            ? `₱${product.srp.toFixed(2)}`
            : "—"}
        </Text>
      </View>

      <View style={styles.priceColumn}>
        <Text style={styles.price}>
        {typeof storePrice === "number"
          ? `₱${storePrice.toFixed(2)}`
          : "—"}
        </Text>
      </View>

      <View style={styles.actionColumn}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
        >
          <Text style={styles.actionIcon}>
            ✏️
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDelete}
        >
          <Text style={styles.actionIcon}>
            🗑️
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 96,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  productColumn: {
    flex: 2.2,
    paddingRight: 6,
  },

  brand: {
    marginBottom: 1,
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textLight,
  },

  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  category: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "600",
    color: Colors.primary,
  },

  barcode: {
    marginTop: 2,
    fontSize: 10,
    color: Colors.textLight,
  },

  measurement: {
    marginTop: 2,
    fontSize: 10,
    color: Colors.textLight,
  },

  priceColumn: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },

  price: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
  },

  actionColumn: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButton: {
    width: 40,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 18,
  },
});