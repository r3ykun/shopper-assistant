//shopper-assistant\src\screens\Products\ProductsScreen.tsx
import React, { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal
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
import { Colors } from "../../theme";

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

    type SortOption =
        | "latest"
        | "oldest"
        | "priceHigh"
        | "priceLow"
        | "brandAsc"
        | "brandDesc"
        | "nameAsc"
        | "nameDesc";

    const [sortOption, setSortOption] =
        useState<SortOption>("latest");

    const [sortVisible, setSortVisible] =
        useState(false);

    const filteredProducts = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        const matchingProducts =
            products.filter(product => {
                const productName =
                    product.name
                        ?.trim()
                        .toLowerCase() ?? "";

                const productBrand =
                    product.brand
                        ?.trim()
                        .toLowerCase() ?? "";

                const productBarcode =
                    product.barcode?.trim() ?? "";

                const matchesSearch =
                    productName.includes(keyword) ||
                    productBrand.includes(keyword) ||
                    productBarcode.includes(keyword);

                const matchesBrand =
                    selectedBrand === "All Brands" ||
                    product.brand?.trim() === selectedBrand;

                const matchesCategory =
                    selectedCategory === "All Categories" ||
                    product.category?.trim() === selectedCategory;

                return (
                    matchesSearch &&
                    matchesBrand &&
                    matchesCategory
                );
            });

            matchingProducts.sort((a, b) => {

                switch (sortOption) {

                    case "latest":
                        return (
                            new Date(b.createdAt ?? 0).getTime() -
                            new Date(a.createdAt ?? 0).getTime()
                        );

                    case "oldest":
                        return (
                            new Date(a.createdAt ?? 0).getTime() -
                            new Date(b.createdAt ?? 0).getTime()
                        );

                    case "priceHigh": {

                        const priceA =
                            selectedStore
                                ? StorePriceService.getPrice(
                                    selectedStore.id,
                                    a.id
                                ) ?? 0
                                : a.srp ?? 0;

                        const priceB =
                            selectedStore
                                ? StorePriceService.getPrice(
                                    selectedStore.id,
                                    b.id
                                ) ?? 0
                                : b.srp ?? 0;

                        return priceB - priceA;
                    }

                    case "priceLow": {

                        const priceA =
                            selectedStore
                                ? StorePriceService.getPrice(
                                    selectedStore.id,
                                    a.id
                                ) ?? 0
                                : a.srp ?? 0;

                        const priceB =
                            selectedStore
                                ? StorePriceService.getPrice(
                                    selectedStore.id,
                                    b.id
                                ) ?? 0
                                : b.srp ?? 0;

                        return priceA - priceB;
                    }

                    case "brandAsc":
                        return (a.brand ?? "").localeCompare(
                            b.brand ?? "",
                            undefined,
                            {
                                sensitivity: "base",
                                numeric: true,
                            }
                        );

                    case "brandDesc":
                        return (b.brand ?? "").localeCompare(
                            a.brand ?? "",
                            undefined,
                            {
                                sensitivity: "base",
                                numeric: true,
                            }
                        );

                    case "nameAsc":
                        return (a.name ?? "").localeCompare(
                            b.name ?? "",
                            undefined,
                            {
                                sensitivity: "base",
                                numeric: true,
                            }
                        );

                    case "nameDesc":
                        return (b.name ?? "").localeCompare(
                            a.name ?? "",
                            undefined,
                            {
                                sensitivity: "base",
                                numeric: true,
                            }
                        );

                    default:
                        return 0;
                }

            });
        return matchingProducts;
    }, [
        products,
        search,
        selectedBrand,
        selectedCategory,
        sortOption,
        selectedStore
    ]);

    const renderSortOption = (
        label: string,
        value: SortOption,
    ) => (

        <TouchableOpacity
            style={[
                styles.sortOption,
                sortOption === value &&
                styles.selectedSortOption,
            ]}
            onPress={() => {
                setSortOption(value);
                setSortVisible(false);
            }}
        >

            <Text style={styles.sortOptionText}>
                {label}
            </Text>

            {sortOption === value && (
                <Text style={styles.sortCheck}>
                    ✓
                </Text>
            )}

        </TouchableOpacity>

    );

    return (
        <Screen>
            <AppHeader
                showMenu
                title="Products"
            />
            <View style={styles.container}>

            <View style={styles.searchRow}>
                <View style={styles.searchArea}>
                    <SearchBar
                        value={search}
                        placeholder="Search..."
                        onChangeText={setSearch}
                    />
                </View>

                <TouchableOpacity
                    style={styles.sortButton}
                    activeOpacity={0.75}
                    onPress={() =>
                        setSortVisible(true)
                    }
                >
                    <Text style={styles.sortIcon}>
                        ⇅
                    </Text>
                </TouchableOpacity>
            </View>

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

            <ProductTableHeader/>

            {!(search.trim() && filteredProducts.length === 0) && (
                <Text style={styles.resultCount}>
                    {search.trim()
                        ? `Showing ${filteredProducts.length} result${
                            filteredProducts.length !== 1 ? "s" : ""
                        } for "${search.trim()}"`
                        : `Showing ${filteredProducts.length} product${
                            filteredProducts.length !== 1 ? "s" : ""
                        }`}
                </Text>
            )}

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

            <Modal
                visible={sortVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setSortVisible(false)
                }
            >
                <TouchableOpacity
                    style={styles.sortOverlay}
                    activeOpacity={1}
                    onPress={() => setSortVisible(false)}
                >

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.sortMenu}
                    >

                        <Text style={styles.sortMenuTitle}>
                            Sort Products
                        </Text>

                        <Text style={styles.sortSection}>
                            TIME ADDED
                        </Text>

                        {renderSortOption("Latest First", "latest")}
                        {renderSortOption("Oldest First", "oldest")}

                        <Text style={styles.sortSection}>
                            PRICE
                        </Text>

                        {renderSortOption("Highest First", "priceHigh")}
                        {renderSortOption("Lowest First", "priceLow")}

                        <Text style={styles.sortSection}>
                            NAME
                        </Text>

                        {renderSortOption("Brand (A → Z)", "brandAsc")}
                        {renderSortOption("Brand (Z → A)", "brandDesc")}
                        {renderSortOption("Item Name (A → Z)", "nameAsc")}
                        {renderSortOption("Item Name (Z → A)", "nameDesc")}

                    </TouchableOpacity>

                </TouchableOpacity>
            </Modal>

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
    resultCount: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 12,
        color: Colors.textLight,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
        textAlign: "center"
    },
    filters: {
        flexDirection: "row",
        gap: 12,
        marginTop: 6
    },
    filter: {
        flex: 1,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    searchArea: {
        flex: 1
    },

    sortButton: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },

    sortIcon: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.primary,
    },

    sortOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
    },

    sortMenu: {
        width: "100%",
        maxWidth: 320,
        overflow: "hidden",
        borderRadius: 16,
        backgroundColor: Colors.surface,
        elevation: 8,
    },

    sortMenuTitle: {
        paddingHorizontal: 18,
        paddingVertical: 16,
        fontSize: 16,
        fontWeight: "700",
        color: Colors.text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },

    sortOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },

    selectedSortOption: {
        backgroundColor: Colors.background,
    },

    sortOptionText: {
        fontSize: 15,
        color: Colors.text,
    },

    sortCheck: {
        fontSize: 17,
        fontWeight: "700",
        color: Colors.primary,
    },

    sortSection: {
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 6,
        fontSize: 12,
        fontWeight: "700",
        color: Colors.textLight,
    },
});