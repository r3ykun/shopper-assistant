import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "Shopper Assistant",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}