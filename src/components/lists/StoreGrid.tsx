import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";

import StoreCard from "../cards/StoreCard";
import { Store } from "../../database/entities/Store";

type Props = {
  stores: Store[];
  selectedStore: Store | null;
  onSelect: (store: Store) => void;
  search: string;
};

export default function StoreGrid({
  stores,
  selectedStore,
  onSelect,
  search,
}: Props) {
  return (
    <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
            justifyContent: "space-between",
        }}
        ListEmptyComponent={
            search.trim() !== "" ? (
            <Text style={styles.emptyText}>
                No results found for "{search}"
            </Text>
            ) : null
        }
        renderItem={({ item }) => (
            <StoreCard
            store={item}
            selected={selectedStore?.id === item.id}
            onPress={() => onSelect(item)}
            />
        )}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
  },
});