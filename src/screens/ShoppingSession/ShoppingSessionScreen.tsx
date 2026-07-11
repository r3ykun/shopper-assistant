import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Splash: undefined;
  ShoppingSession: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ShoppingSession"
>;

export default function ShoppingSessionScreen({
  navigation,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Select Store
      </Text>

      <Button
        title="Continue"
        onPress={() => navigation.replace("Home")}
      />
    </View>
  );
}