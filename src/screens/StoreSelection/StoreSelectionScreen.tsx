//shopper-assistant\src\screens\StoreSelection\StoreSelectionScreen.tsx
import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useStoreStore } from "../../stores";

import Screen from "../../components/layout/Screen";
import Header from "../../components/layout/Header";
import SearchBar from "../../components/inputs/SearchBar";
import StoreGrid from "../../components/lists/StoreGrid";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { STORES } from "../../constants/stores";
import { Store } from "../../database/entities/Store";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

export default function StoreSelectionScreen({ navigation, route }: any) {
  const [search, setSearch] = useState("");
  const{
    selectedStore:activeStore,
    setSelectedStore:saveSelectedStore,
  }=useStoreStore();

  const[selectedStore,setSelectedStore]=
    useState<Store|null>(
      activeStore
    );

  const filteredStores = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return STORES;

    return STORES.filter((store) => {
      return (
        store.shortName.toLowerCase().startsWith(keyword) ||
        store.name.toLowerCase().startsWith(keyword)
      );
    });
  }, [search]);

  return (
    <Screen>
      <View style={styles.container}>
        <Header title="Select Store" />

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search stores"
        />

        <View style={styles.gridContainer}>
          <StoreGrid
            stores={filteredStores}
            selectedStore={selectedStore}
            onSelect={setSelectedStore}
            search={search}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.label}>
            Current Store
          </Text>

          <Text style={styles.store}>
            {selectedStore?.name ?? "None Selected"}
          </Text>

          <PrimaryButton
            title={
              route.params?.returnToHome
                ?"Change Store"
                :"Start Shopping"
            }
            onPress={()=>{
              if(!selectedStore)return;

              saveSelectedStore(selectedStore);

              if(route.params?.returnToHome){
                navigation.goBack();
                return;
              }

              navigation.replace(
                "MainDrawer"
              );
            }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },

  gridContainer: {
    flex: 1,
  },

  footer: {
    paddingTop: Spacing.md,
  },

  label: {
    color: Colors.textLight,
    fontSize: Typography.caption,
  },

  store: {
    fontSize: Typography.heading,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
});