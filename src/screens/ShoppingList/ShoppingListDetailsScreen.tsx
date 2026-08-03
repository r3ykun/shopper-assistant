//shopper-assistant/src/screens/ShoppingList/ShoppingListDetailsScreen.tsx
import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ProductService,
  ShoppingListItemRecord,
  ShoppingListRecord,
  ShoppingListService,
} from "../../services";
import {
  Colors,
  Spacing,
} from "../../theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useFocusEffect} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootStack";
import Screen from "../../components/layout/Screen";
import AppHeader from "../../components/layout/AppHeader";
import AppTextInput from "../../components/forms/AppTextInput";
import QuantitySelector from "../../components/forms/QuantitySelector";
import {Product} from "../../database/entities/Product";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "ShoppingListDetails"
  >;

type AddMode =
  | "product"
  | "manual";

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => {
      if (!word) return "";

      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");
}
export default function ShoppingListDetailsScreen({
  route,
}: Props) {
    const insets =
        useSafeAreaInsets();

  const shoppingListId =
    route.params.shoppingListId;

  const [list, setList] =
    useState<ShoppingListRecord | null>(
      null
    );

  const [items, setItems] =
    useState<ShoppingListItemRecord[]>(
      []
    );

  const [search, setSearch] =
    useState("");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [addMode, setAddMode] =
    useState<AddMode>("product");

  const [productSearch, setProductSearch] =
    useState("");

  const [manualName, setManualName] =
    useState("");

  const [quantity, setQuantity] =
    useState("1");

  const [formError, setFormError] =
    useState("");

    const [products, setProducts] =
    useState<Product[]>([]);

    const loadData =
    useCallback(() => {
        setList(
        ShoppingListService.getList(
            shoppingListId
        )
        );

        setItems(
        ShoppingListService.getItems(
            shoppingListId
        )
        );

        setProducts(
        ProductService.getAllProducts()
        );
    }, [shoppingListId]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const filteredItems =
    items.filter(item => {
      const keyword =
        search.trim().toLowerCase();

      if (!keyword) {
        return true;
      }

      const displayName =
        item.productName ??
        item.itemName;

      return (
        displayName
          .toLowerCase()
          .includes(keyword) ||
        (item.brand ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (item.barcode ?? "")
          .includes(keyword)
      );
    });

  const filteredProducts =
    useMemo(() => {
      const keyword =
        productSearch
          .trim()
          .toLowerCase();

      if (!keyword) {
        return products.slice(0, 20);
      }

      return products
        .filter(product => {
          return (
            product.name
              .toLowerCase()
              .includes(keyword) ||
            product.barcode.includes(
              keyword
            ) ||
            (product.brand ?? "")
              .toLowerCase()
              .includes(keyword)
          );
        })
        .slice(0, 20);
    }, [
      products,
      productSearch,
    ]);

  const completedCount =
    items.filter(
      item => item.checked === 1
    ).length;

  const progress =
    items.length > 0
      ? Math.round(
          (
            completedCount /
            items.length
          ) * 100
        )
      : 0;

  function resetModal() {
    setAddMode("product");
    setProductSearch("");
    setManualName("");
    setQuantity("1");
    setFormError("");
  }

  function openAddModal() {
    resetModal();
    setModalVisible(true);
  }

  function closeAddModal() {
    setModalVisible(false);
    resetModal();
  }

  function getValidatedQuantity() {
    const parsed =
      Number(quantity);

    if (
      !Number.isInteger(parsed) ||
      parsed < 1
    ) {
      setFormError(
        "Enter a valid quantity."
      );

      return null;
    }

    return parsed;
  }

  function handleAddProduct(
    product: Product
  ) {
    const parsedQuantity =
      getValidatedQuantity();

    if (parsedQuantity === null) {
      return;
    }

    ShoppingListService.addProductItem(
      shoppingListId,
      product.id,
      parsedQuantity
    );

    loadData();
    closeAddModal();
  }

  function handleAddManualItem() {
    const cleanedName =
        toTitleCase(
            manualName.trim()
        );

    if (!cleanedName) {
      setFormError(
        "Item name is required."
      );

      return;
    }

    const parsedQuantity =
      getValidatedQuantity();

    if (parsedQuantity === null) {
      return;
    }

    ShoppingListService.addManualItem(
      shoppingListId,
      cleanedName,
      parsedQuantity
    );

    loadData();
    closeAddModal();
  }

  function handleToggle(
    item: ShoppingListItemRecord
  ) {
    ShoppingListService.toggleItemChecked(
      item.id,
      item.checked !== 1
    );

    loadData();
  }

  function handleDecrease(
    item: ShoppingListItemRecord
  ) {
    const nextQuantity =
      Math.max(
        1,
        item.quantity - 1
      );

    ShoppingListService.updateItemQuantity(
      item.id,
      nextQuantity
    );

    loadData();
  }

  function handleIncrease(
    item: ShoppingListItemRecord
  ) {
    ShoppingListService.updateItemQuantity(
      item.id,
      item.quantity + 1
    );

    loadData();
  }

  function handleDelete(
    item: ShoppingListItemRecord
  ) {
    const displayName =
      item.productName ??
      item.itemName;

    Alert.alert(
      "Remove Item",
      `Remove "${displayName}" from this shopping list?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            ShoppingListService.deleteItem(
              item.id
            );

            loadData();
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <AppHeader
        showBack
        title={
          list?.name ??
          "Shopping List"
        }
      />

      <View style={styles.container}>
        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <Text style={styles.progressLabel}>
              Progress
            </Text>

            <Text style={styles.progressCount}>
              {completedCount} /{" "}
              {items.length} completed
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressPercent}>
            {progress}%
          </Text>
        </View>

        <AppTextInput
          value={search}
          placeholder="Search list items..."
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredItems}
          keyExtractor={item =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            filteredItems.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {items.length === 0
                  ? "This list is empty"
                  : "No matching items"}
              </Text>

              <Text style={styles.emptyMessage}>
                {items.length === 0
                  ? "Add your first planned item."
                  : `No results for "${search}".`}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const displayName =
              item.productName ??
              item.itemName;

            const checked =
              item.checked === 1;

            return (
              <View
                style={[
                  styles.itemCard,
                  checked
                    ? styles.checkedCard
                    : null,
                ]}
              >
                <TouchableOpacity
                  style={styles.checkButton}
                  onPress={() =>
                    handleToggle(item)
                  }
                >
                  <Text
                    style={[
                      styles.checkIcon,
                      checked
                        ? styles.checkedIcon
                        : null,
                    ]}
                  >
                    {checked ? "✓" : ""}
                  </Text>
                </TouchableOpacity>

                <View style={styles.itemInfo}>
                  <Text
                    style={[
                      styles.itemName,
                      checked
                        ? styles.checkedText
                        : null,
                    ]}
                    numberOfLines={2}
                  >
                    {item.brand ? (
                      <>
                        <Text
                          style={
                            styles.itemBrand
                          }
                        >
                          {item.brand}
                        </Text>

                        {" "}
                      </>
                    ) : null}

                    {displayName}
                  </Text>

                  {item.barcode ? (
                    <Text
                      style={
                        styles.itemBarcode
                      }
                    >
                      #{item.barcode}
                    </Text>
                  ) : (
                    <Text
                      style={
                        styles.manualLabel
                      }
                    >
                      Manual item
                    </Text>
                  )}
                </View>

                <View
                  style={
                    styles.quantityControls
                  }
                >
                  <TouchableOpacity
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      handleDecrease(item)
                    }
                  >
                    <Text
                      style={
                        styles.quantityButtonText
                      }
                    >
                      −
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.quantityProgress}>
                    <Text style={styles.quantityValue}>
                      {item.fulfilledQuantity??0}/{item.quantity}
                    </Text>
                    <Text style={styles.quantityProgressLabel}>
                      In Cart
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      handleIncrease(item)
                    }
                  >
                    <Text
                      style={
                        styles.quantityButtonText
                      }
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDelete(item)
                  }
                >
                  <Text
                    style={
                      styles.deleteText
                    }
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <TouchableOpacity
          style={styles.addItemButton}
          onPress={openAddModal}
        >
          <Text
            style={
              styles.addItemButtonText
            }
          >
            + Add Item
          </Text>
        </TouchableOpacity>
      </View>

        <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={closeAddModal}
        >
        <KeyboardAvoidingView
            style={styles.modalKeyboardContainer}
            behavior={
            Platform.OS === "ios"
                ? "padding"
                : "height"
            }
        >
            <View style={styles.modalOverlay}>
            <View
                style={[
                styles.modalCard,
                {
                    paddingBottom: Math.max(
                    insets.bottom,
                    Spacing.lg
                    ),
                },
                ]}
            >
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                    Add Item
                </Text>

                <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={closeAddModal}
                >
                    <Text style={styles.modalCloseText}>
                    ✕
                    </Text>
                </TouchableOpacity>
                </View>

                <View style={styles.modeRow}>
                <TouchableOpacity
                    style={[
                    styles.modeButton,
                    addMode === "product"
                        ? styles.activeModeButton
                        : null,
                    ]}
                    onPress={() => {
                    setFormError("");
                    setAddMode("product");
                    }}
                >
                    <Text
                    style={[
                        styles.modeText,
                        addMode === "product"
                        ? styles.activeModeText
                        : null,
                    ]}
                    >
                    Existing Product
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                    styles.modeButton,
                    addMode === "manual"
                        ? styles.activeModeButton
                        : null,
                    ]}
                    onPress={() => {
                    setFormError("");
                    setAddMode("manual");
                    }}
                >
                    <Text
                    style={[
                        styles.modeText,
                        addMode === "manual"
                        ? styles.activeModeText
                        : null,
                    ]}
                    >
                    Manual Item
                    </Text>
                </TouchableOpacity>
                </View>

                <QuantitySelector
                value={quantity}
                onChange={value => {
                    setFormError("");
                    setQuantity(value);
                }}
                />

                {addMode === "product" ? (
                <View style={styles.productModeContent}>
                    <AppTextInput
                    value={productSearch}
                    placeholder="Search products..."
                    onChangeText={text => {
                        setFormError("");
                        setProductSearch(text);
                    }}
                    />

                    <FlatList
                    data={filteredProducts}
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    style={styles.productResults}
                    contentContainerStyle={
                        filteredProducts.length === 0
                        ? styles.emptyProductResults
                        : styles.productResultsContent
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    ListEmptyComponent={
                        <Text style={styles.noProducts}>
                        No products found.
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.productResultRow}
                        onPress={() =>
                            handleAddProduct(item)
                        }
                        >
                        <Text
                            style={
                            styles.productResultName
                            }
                            numberOfLines={2}
                        >
                            {item.brand ? (
                            <>
                                <Text
                                style={
                                    styles.productResultBrand
                                }
                                >
                                {item.brand}
                                </Text>

                                {" "}
                            </>
                            ) : null}

                            {item.name}
                        </Text>

                        <Text
                            style={
                            styles.productResultBarcode
                            }
                        >
                            #{item.barcode}
                        </Text>
                        </TouchableOpacity>
                    )}
                    />
                </View>
                ) : (
                <View style={styles.manualModeContent}>
                    <AppTextInput
                    label="Item Name"
                    value={manualName}
                    placeholder="Enter item name"
                    onChangeText={text => {
                        setFormError("");

                        setManualName(
                        toTitleCase(text)
                        );
                    }}
                    />

                    <TouchableOpacity
                    style={styles.saveManualButton}
                    onPress={handleAddManualItem}
                    >
                    <Text style={styles.saveManualText}>
                        Add Manual Item
                    </Text>
                    </TouchableOpacity>
                </View>
                )}

                {formError ? (
                <Text style={styles.formError}>
                    ✕ {formError}
                </Text>
                ) : null}
            </View>
            </View>
        </KeyboardAvoidingView>
        </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
},
progressCard: {
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
},
progressTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
progressLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
},
progressCount: {
    fontSize: 12,
    color: Colors.textLight,
},
progressTrack: {
    height: 10,
    marginTop: Spacing.md,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: Colors.border,
},
progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: Colors.primary,
},
progressPercent: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
},
list: {
    paddingBottom: 90,
},
emptyList: {
    flexGrow: 1,
},
emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: Colors.text,
},
emptyMessage: {
    marginTop: Spacing.sm,
    textAlign: "center",
    color: Colors.textLight,
},
itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
},
checkedCard: {
    opacity: 0.6,
    backgroundColor: Colors.background,
},
checkButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 7,
},
checkIcon: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
},
checkedIcon: {
    color: "#2E7D32",
},
itemInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
},
itemName: {
    fontSize: 13,
    fontWeight: "400",
    color: Colors.text,
},
itemBrand: {
    fontWeight: "800",
    color: Colors.text,
},
checkedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
},
itemBarcode: {
    marginTop: 3,
    fontSize: 9,
    color: Colors.textLight,
},
manualLabel: {
    marginTop: 3,
    fontSize: 9,
    color: Colors.primary,
},
quantityControls: {
    flexDirection: "row",
    alignItems: "center",
},
quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 7,
    backgroundColor: Colors.background,
},
quantityButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
},
quantityValue: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
},
quantityProgress:{
	minWidth:46,
	alignItems:"center",
},
quantityProgressLabel:{
	marginTop:1,
	fontSize:8,
	color:Colors.textLight,
},
deleteButton: {
    marginLeft: Spacing.sm,
    padding: 5,
},
deleteText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#C62828",
},
addItemButton: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    elevation: 5,
},
addItemButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
},
modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 40,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
},
modalCard: {
    maxHeight: "92%",
    minHeight: 360,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: Colors.surface,
},
modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
},
modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
},
modalCloseButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
},
modalCloseText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textLight,
},
modalKeyboardContainer: {
    flex: 1,
},
manualModeContent: {
    flexShrink: 1,
},
productResults: {
    flexShrink: 1,
    minHeight: 120,
    maxHeight: 300,
},
productResultsContent: {
    paddingBottom: Spacing.sm,
},
emptyProductResults: {
    minHeight: 120,
    justifyContent: "center",
},
productModeContent: {
    flexShrink: 1,
    minHeight: 0,
},
modeRow: {
    flexDirection: "row",
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    overflow: "hidden",
},
modeButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: Colors.surface,
},
activeModeButton: {
    backgroundColor: Colors.primary,
},
modeText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.text,
},
activeModeText: {
    color: "white",
},
productResultRow: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
},
productResultName: {
    fontSize: 13,
    color: Colors.primary,
},
productResultBrand: {
    fontWeight: "800",
    color: Colors.text,
},
productResultBarcode: {
    marginTop: 3,
    fontSize: 9,
    color: Colors.textLight,
},
noProducts: {
    paddingVertical: Spacing.lg,
    textAlign: "center",
    color: Colors.textLight,
},
saveManualButton: {
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: Colors.primary,
},
saveManualText: {
    fontWeight: "700",
    color: "white",
},
formError: {
    marginTop: Spacing.md,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EF9A9A",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "600",
    color: "#C62828",
    backgroundColor: "#FFEBEE",
},
});