import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStack";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

export default function SplashScreen({
  navigation,
}: Props) {
useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace("StoreSelection");
  }, 2000);

  return () => clearTimeout(timer);
}, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Shopper Assistant
      </Text>

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}