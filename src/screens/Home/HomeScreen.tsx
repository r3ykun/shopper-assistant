import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 25,
        }}
      >
        Shopper Assistant
      </Text>

      <Text>Current Store:</Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 30,
        }}
      >
        None Selected
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Quick Actions
      </Text>

      <Text>📷 Scan Barcode</Text>
      <Text>⌨ Manual Entry</Text>
      <Text>📝 Shopping List</Text>
      <Text>📦 Products</Text>
    </View>
  );
}