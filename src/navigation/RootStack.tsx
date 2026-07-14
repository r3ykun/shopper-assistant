import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import StoreSelectionScreen from "../screens/StoreSelection/StoreSelectionScreen";
import ProductFormScreen from "../screens/Products/ProductFormScreen";
import StoreDetailsScreen from "../screens/Stores/StoreDetailsScreen";
import MainDrawer from "./MainDrawer";
import ScannerScreen from "../screens/Scanner";
  
export type RootStackParamList = {
  Splash: undefined;
  StoreSelection: undefined;
  MainDrawer: undefined;
  ProductForm:
    | {
        productId?: number;
        barcode?: string;
        addToCart?: boolean;
      }
    | undefined;
  Scanner: undefined;
  StoreDetails: {
    storeId: number;
  };
}; 

const Stack =
  createNativeStackNavigator<RootStackParamList>();

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
        name="StoreSelection"
        component={StoreSelectionScreen}
      />

      <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
      />

      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
      />

      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
      />

      <Stack.Screen
        name="StoreDetails"
        component={StoreDetailsScreen}
      />
    </Stack.Navigator>
  );
}