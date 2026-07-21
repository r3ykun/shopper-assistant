//shopper-assistant\src\screens\Products\ProductsScreen.tsx
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    useFocusEffect,
} from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import { ProductService, StorePriceService, } from "../../services";
import FloatingButton from "../../components/buttons/FloatingButton";
import {
  ProductRow,
  ProductTableHeader,
} from "../../components/tables";
import { useStoreStore, useCartStore } from "../../stores";
import SearchBar from "../../components/inputs/SearchBar";
import AppDropdown from "../../components/forms/AppDropdown";
import AppHeader from "../../components/layout/AppHeader";

export default function ProductsScreen() {
    const { selectedStore } =
        useStoreStore();

    const [products, setProducts] =
        useState(
            ProductService.getAllProducts()
        );
    
    const [search, setSearch] = useState("");

    const [selectedBrand, setSelectedBrand] =
        useState("All Brands");

    const [selectedCategory, setSelectedCategory] =
        useState("All Categories");

    function refreshProducts() {
        const updatedProducts =
            ProductService.getAllProducts();
        setProducts(updatedProducts);
    }

    const navigation = useNavigation<any>();

    useFocusEffect(
        React.useCallback(() => {
            refreshProducts();
        }, [selectedStore])
    );

    const brandOptions = [
        "All Brands",
        ...Array.from(
            new Set(
            products
                .map(product => product.brand?.trim())
                .filter(
                (brand): brand is string =>
                    Boolean(brand)
                )
            )
        ).sort(),
    ];

    const categoryOptions = [
        "All Categories",
        ...Array.from(
            new Set(
            products
                .map(product => product.category?.trim())
                .filter(
                (category): category is string =>
                    Boolean(category)
                )
            )
        ).sort(),
    ];

    const removeCartItem = useCartStore(
        state => state.removeItem
    );

    function handleDelete(id: number) {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [{
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                    try {
                        ProductService.deleteProduct(id);

                        removeCartItem(id);

                        refreshProducts();
                    } catch (error) {
                        console.error(
                        "Failed to delete product:",
                        error
                        );

                        Alert.alert(
                        "Delete Failed",
                        "The product could not be deleted."
                        );
                    }
                    }
                },
            ]
        );

    }

    const filteredProducts = products.filter(product => {
        const keyword =
            search.trim().toLowerCase();

        const matchesSearch =
            product.name
            .toLowerCase()
            .includes(keyword) ||
            product.barcode.includes(keyword) ||
            (product.brand ?? "")
            .toLowerCase()
            .includes(keyword);

        const matchesBrand =
            selectedBrand === "All Brands" ||
            product.brand === selectedBrand;

        const matchesCategory =
            selectedCategory === "All Categories" ||
            product.category === selectedCategory;

        return (
            matchesSearch &&
            matchesBrand &&
            matchesCategory
        );
    });

    return (
        <Screen>
            <AppHeader
                showMenu
                title="Products"
            />
            <View style={styles.container}>

            <SearchBar
            value={search}
            placeholder="Search products, brands, or barcodes"
            onChangeText={setSearch}
            />

            <View style={styles.filters}>
            <View style={styles.filter}>
                <AppDropdown
                label="Brand"
                selectedValue={selectedBrand}
                items={brandOptions}
                onValueChange={setSelectedBrand}
                />
            </View>

            <View style={styles.filter}>
                <AppDropdown
                label="Category"
                selectedValue={selectedCategory}
                items={categoryOptions}
                onValueChange={setSelectedCategory}
                />
            </View>
            </View>

            <ProductTableHeader />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                    {products.length === 0
                        ? "No products yet"
                        : search.trim()
                        ? "No matching products"
                        : "No products match the filters"}
                    </Text>

                    <Text style={styles.emptyMessage}>
                    {products.length === 0
                        ? "Add your first product using the button below."
                        : search.trim()
                        ? `No results for "${search.trim()}".`
                        : "Try selecting a different brand or category."}
                    </Text>
                </View>
                }
                contentContainerStyle={{
                    paddingBottom: 90,
                }}
                renderItem={({ item }) => (
                    <ProductRow
                    product={item}
                    searchQuery={search}
                    storePrice={
                        selectedStore
                        ? StorePriceService.getPrice(
                            selectedStore.id,
                            item.id
                            )
                        : null
                    }
                    onEdit={() =>
                        navigation.navigate("ProductForm", {
                        productId: item.id,
                        })
                    }
                    onDelete={() =>
                        handleDelete(item.id)
                    }
                    />
                )}
            />

            <FloatingButton
                onPress={() =>
                    navigation.navigate("ProductForm")
                }
            />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    emptyContainer: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 24,
    },

    emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    },

    emptyMessage: {
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.7,
    },
    filters: {
        flexDirection: "row",
        gap: 12,
    },
    filter: {
        flex: 1,
    },
});