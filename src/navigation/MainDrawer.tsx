//shopper-assistant\src\navigation\MainDrawer.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home/HomeScreen";
import ProductsScreen from "../screens/Products/ProductsScreen";
import ShoppingListScreen from "../screens/ShoppingList/ShoppingListScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import AnalyticsScreen from "../screens/Analytics/AnalyticsScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import StoresScreen from "../screens/Stores";
import PaymentMethodsScreen from "../screens/PaymentMethods";

export type DrawerParamList = {
  Home: undefined;
  Products: undefined;
  "Shopping List": undefined;
  Stores: undefined;
  "Payment Methods":undefined;
  History: undefined;
  Analytics: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function MainDrawer() {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />

      <Drawer.Screen
        name="Products"
        component={ProductsScreen}
      />

      <Drawer.Screen
        name="Shopping List"
        component={ShoppingListScreen}
      />

      <Drawer.Screen
        name="Stores"
        component={StoresScreen}
      />

      <Drawer.Screen
        name="Payment Methods"
        component={PaymentMethodsScreen}
      />

      <Drawer.Screen
        name="History"
        component={HistoryScreen}
      />

      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}