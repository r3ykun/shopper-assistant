//shopper-assistant\src\navigation\RootStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import StoreSelectionScreen from "../screens/StoreSelection/StoreSelectionScreen";
import ProductFormScreen from "../screens/Products/ProductFormScreen";
import StoreDetailsScreen from "../screens/Stores/StoreDetailsScreen";
import MainDrawer, { DrawerParamList } from "./MainDrawer";
import type {
  NavigatorScreenParams,
} from "@react-navigation/native";
import ScannerScreen from "../screens/Scanner";
import { ShoppingListDetailsScreen } from "../screens/ShoppingList"; 
import CheckoutSuccessScreen from"../screens/CheckoutSuccess";

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  StoreSelection:
    |{
      returnToHome?:boolean;
    }
    |undefined;
  MainDrawer:
    NavigatorScreenParams<
    DrawerParamList
    >;
  ShoppingListDetails: {
    shoppingListId: number;
  };
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
  CheckoutSuccess:{
    transactionId:number;
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
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
      />

      <Stack.Screen
        name="ShoppingListDetails"
        component={ShoppingListDetailsScreen}
      />

      <Stack.Screen
        name="StoreDetails"
        component={StoreDetailsScreen}
      />
    </Stack.Navigator>
  );
}