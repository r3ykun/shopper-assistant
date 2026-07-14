import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootStack";
import React, { useEffect } from "react";
import { createTables } from "./src/database";
import { seedDatabase } from "./src/database/seed";
import { database } from "./src/database";

export default function App() {
  useEffect(() => {
    createTables();
    seedDatabase();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}