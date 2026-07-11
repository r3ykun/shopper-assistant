import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import ShoppingSessionScreen from "../screens/ShoppingSession/ShoppingSessionScreen";
import HomeScreen from "../screens/Home/HomeScreen";

export type RootStackParamList = {
  Splash: undefined;
  ShoppingSession: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="ShoppingSession"
        component={ShoppingSessionScreen}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}