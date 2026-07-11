import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}