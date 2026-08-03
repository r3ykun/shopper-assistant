//shopper-assistant\src\screens\Home\HomeScreen.tsx
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/inputs/SearchBar";
import {
  useNavigation,
  useFocusEffect
} from "@react-navigation/native";
import {
  ShoppingListItemRecord,
  ShoppingListRecord,
  ShoppingListService,
  TransactionService,
} from "../../services";
import Screen from "../../components/layout/Screen";
import {
  useCartStore,
  useStoreStore,
} from "../../stores";
import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";
import AppHeader from "../../components/layout/AppHeader";
import HighlightedText from "../../components/text/HighlightedText";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  
  const [cartSearch, setCartSearch] =
    React.useState("");

  const [dashboardList, setDashboardList] =
    React.useState<ShoppingListRecord | null>(
      null
    );
  
  const [dashboardListItems, setDashboardListItems] =
    React.useState<ShoppingListItemRecord[]>(
      []
    );

  const { selectedStore } =
    useStoreStore();

  const {
    items,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const filteredItems = items.filter(item => {
    const keyword =
      cartSearch.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

  return (
      item.name
          .toLowerCase()
          .includes(keyword) ||
      item.barcode.includes(keyword) ||
      (item.brand ?? "")
          .toLowerCase()
          .includes(keyword) ||
      item.category
          .toLowerCase()
          .includes(keyword)
  );
  });

  const loadDashboardList =
    React.useCallback(() => {
      const lists =
        ShoppingListService.getAllLists();

      const activeList =
        lists.length > 0
          ? lists[0]
          : null;

      setDashboardList(activeList);

      if (!activeList) {
        setDashboardListItems([]);
        return;
      }

      setDashboardListItems(
        ShoppingListService.getItems(
          activeList.id
        )
      );
    }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadDashboardList();
    }, [loadDashboardList])
  );

  const completedShoppingListItems =
    dashboardListItems.filter(
      item => item.checked === 1
    ).length;

  const remainingShoppingListItems =
    dashboardListItems.length -
    completedShoppingListItems;

  const shoppingListProgress =
    dashboardListItems.length > 0
      ? Math.round(
          (
            completedShoppingListItems /
            dashboardListItems.length
          ) * 100
        )
      : 0;

  function handleClearCart() {
    if (items.length === 0) {
      return;
    }

    Alert.alert(
      "Cancel Shopping",
      "Remove all products from the cart?",
      [
        {
          text: "Keep Shopping",
          style: "cancel",
        },
        {
          text: "Clear Cart",
          style: "destructive",
          onPress: () => {
            clearCart();
          },
        },
      ]
    );
  }

  function handleConfirm(){
    if(items.length===0){
      Alert.alert(
        "Empty Cart",
        "Add at least one product before confirming."
      );
      return;
    }

    if(!selectedStore){
      Alert.alert(
        "No Store Selected",
        "Select a store before confirming the purchase."
      );
      return;
    }

    Alert.alert(
      "Confirm Purchase",
      `Confirm ${totalItems()} item(s) totaling ₱${totalPrice().toFixed(2)}?`,
      [
        {
          text:"Cancel",
          style:"cancel",
        },
        {
          text:"Confirm",
          onPress:()=>{
            try{
              const transactionId=
                TransactionService.checkout({
                  storeId:selectedStore.id,
                  items,
                });

              clearCart();
              loadDashboardList();

              Alert.alert(
                "Purchase Saved",
                `Transaction #${transactionId} was saved successfully.`
              );
            }catch(error){
              Alert.alert(
                "Checkout Failed",
                error instanceof Error
                  ?error.message
                  :"The transaction could not be saved."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <AppHeader
          showMenu
          title={
            selectedStore?.name ??
            "Select Store"
          }
        />

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() =>
              navigation.navigate("Scanner")
            }
          >
            <Text style={styles.scanIcon}>
              📷
            </Text>

            <View>
              <Text style={styles.scanTitle}>
                Scan Now
              </Text>

              <Text style={styles.scanSubtitle}>
                Scan a barcode to add it
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.shoppingListSection}>
          <TouchableOpacity
            style={styles.shoppingListCard}
            activeOpacity={0.8}
            onPress={() => {
              if (dashboardList) {
                navigation.navigate(
                  "ShoppingListDetails",
                  {
                    shoppingListId:
                      dashboardList.id,
                  }
                );

                return;
              }

              navigation.navigate(
                "MainDrawer",
                {
                  screen: "ShoppingList",
                }
              );
            }}
          >
            <View style={styles.shoppingListTopRow}>
              <View style={styles.shoppingListTitleArea}>
                <View style={styles.shoppingListIcon}>
                  <Text style={styles.shoppingListIconText}>
                    📝
                  </Text>
                </View>

                <View style={styles.shoppingListInfo}>
                  <Text style={styles.shoppingListLabel}>
                    SHOPPING LIST
                  </Text>

                  <Text
                    style={styles.shoppingListName}
                    numberOfLines={1}
                  >
                    {dashboardList?.name ??
                      "No active shopping list"}
                  </Text>
                </View>
              </View>

              <Text style={styles.shoppingListArrow}>
                ›
              </Text>
            </View>

            {dashboardList ? (
              <>
                <View style={styles.progressSummary}>
                  <Text style={styles.progressStatus}>
                    {remainingShoppingListItems}{" "}
                    {remainingShoppingListItems === 1
                      ? "item"
                      : "items"}{" "}
                    remaining
                  </Text>

                  <Text style={styles.progressPercentage}>
                    {shoppingListProgress}%
                  </Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width:
                          `${shoppingListProgress}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.progressDetails}>
                  {completedShoppingListItems} of{" "}
                  {dashboardListItems.length} completed
                </Text>
              </>
            ) : (
              <Text style={styles.noListMessage}>
                Tap here to create your first shopping
                list.
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.cartSection}>

            <View style={styles.cartHeader}>
                <View style={styles.cartTitleContainer}>
                    <View style={styles.cartIcon}>
                        <Text style={styles.cartIconText}>🛒</Text>
                    </View>

                    <Text style={styles.cartTitle}>
                        CART
                    </Text>
                </View>

                <View style={styles.searchContainer}>
                    <SearchBar
                        value={cartSearch}
                        placeholder="Search cart products"
                        onChangeText={setCartSearch}
                    />
                </View>
            </View>

          <View style={styles.tableHeader}>
            <Text
              style={[
                styles.headerCell,
                styles.nameColumn,
              ]}
            >
              Name
            </Text>

            <View style={styles.quantityColumn}>
              <Text style={styles.headerCell}>
                QTY
              </Text>
            </View>

            <Text
              style={[
                styles.headerCell,
                styles.categoryColumn,
              ]}
            >
              Category
            </Text>

            <Text
              style={[
                styles.headerCell,
                styles.priceColumn,
              ]}
            >
              Price
            </Text>

            <Text
              style={[
                styles.headerCell,
                styles.priceColumn,
              ]}
            >
              Subtotal
            </Text>

          </View>

          {!(cartSearch.trim() && filteredItems.length === 0) && (
              <Text style={styles.resultCount}>
                  {cartSearch.trim()
                      ? `Showing ${filteredItems.length} result${
                          filteredItems.length !== 1 ? "s" : ""
                      } for "${cartSearch.trim()}"`
                      : `Showing ${filteredItems.length} cart item${
                          filteredItems.length !== 1 ? "s" : ""
                      }`}
              </Text>
          )}

          <FlatList
            data={filteredItems}
            keyExtractor={(item) =>
              item.productId.toString()
            }
            style={styles.list}
            contentContainerStyle={
              items.length === 0
                ? styles.emptyList
                : styles.listContent
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {items.length === 0
                    ? "CART IS EMPTY"
                    : `No results for "${cartSearch}"`}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.rowCell,
                    styles.nameColumn,
                  ]}
                >
                {item.brand ? (
                    <HighlightedText
                        text={item.brand}
                        query={cartSearch}
                        style={styles.productBrand}
                        numberOfLines={1}
                    />
                ) : null}

                <HighlightedText
                    text={item.name}
                    query={cartSearch}
                    style={styles.productName}
                    numberOfLines={1}
                />

                <HighlightedText
                    text={`#${item.barcode}`}
                    query={cartSearch}
                    style={styles.productBarcode}
                    numberOfLines={1}
                />
                </View>

                <View style={styles.quantityColumn}>
                  <Text style={styles.rowCell}>
                    {item.quantity}
                  </Text>
                </View>

                <HighlightedText
                    text={item.category}
                    query={cartSearch}
                    style={[
                        styles.rowCell,
                        styles.categoryColumn,
                    ]}
                    numberOfLines={1}
                />

                <View style={styles.priceColumn}>
                  <Text style={styles.rowCell}>
                    {item.price > 0
                      ? `₱${item.price.toFixed(2)}`
                      : "—"}
                  </Text>
                </View>

                <View style={styles.priceColumn}>
                  <Text style={styles.rowCell}>
                    {item.price > 0
                      ? `₱${item.subtotal.toFixed(2)}`
                      : "—"}
                  </Text>
                </View>
              </View>
            )}
          />

          <View style={styles.bottomActions}>
            <View style={styles.checkoutSummary}>
              <Text style={styles.checkoutItems}>
                {totalItems()} item(s)
              </Text>

              <Text style={styles.checkoutTotal}>
                ₱{totalPrice().toFixed(2)}
              </Text>
          </View>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                styles.cancelButton,
              ]}
              onPress={handleClearCart}
            >
              <Text style={styles.cancelIcon}>
                ✕
              </Text>

              <Text style={styles.cancelText}>
                CANCEL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bottomButton,
                styles.confirmButton,
              ]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>
                CONFIRM
              </Text>

              <Text style={styles.confirmIcon}>
                ✓
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  actionsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  scanButton: {
    width: "100%",
    minHeight: 92,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    elevation: 4,
  },

  scanIcon: {
    marginRight: Spacing.lg,
    fontSize: 44,
    color: "white",
  },

  scanTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },

  scanSubtitle: {
    marginTop: 3,
    color: "rgba(255, 255, 255, 0.8)",
  },

  cartSection: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 6,
  },

  cartHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
  },

  cartTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 48,
  },

  cartIcon: {
      width: 46,
      height: 46,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 23,
      backgroundColor: Colors.primary,
  },

  cartIconText: {
    fontSize: 23,
  },

  cartTitle: {
      marginLeft: Spacing.sm,
      lineHeight: 24,   // Helps vertically center the text
      fontSize: Typography.heading,
      fontWeight: "700",
      color: Colors.text,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  headerCell: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "white",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 46,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  rowCell: {
    paddingHorizontal: 2,
    textAlign: "center",
    fontSize: 11,
    color: Colors.text,
  },

  nameColumn: {
    flex: 1.55,
  },

  quantityColumn: {
    flex: 0.55,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryColumn: {
    flex: 1.15,
  },

  priceColumn: {
    flex: 0.9,
  },

  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
  },

  productBarcode: {
    marginTop: 1,
    fontSize: 9,
    color: Colors.textLight,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: Spacing.md,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textLight,
  },

  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: 8,
  },

  bottomButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 12,
  },

  checkoutSummary: {
    flex: 1,
  },

  checkoutItems: {
    fontSize: 12,
    color: Colors.textLight,
  },

  checkoutTotal: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    backgroundColor: Colors.surface,
  },

  confirmButton: {
    backgroundColor: Colors.primary,
  },

  cancelIcon: {
    marginRight: 8,
    fontSize: 19,
    fontWeight: "700",
    color: "#D32F2F",
  },

  cancelText: {
    fontWeight: "700",
    color: "#D32F2F",
  },

  confirmText: {
    marginRight: 8,
    fontWeight: "700",
    color: "white",
  },

  confirmIcon: {
    fontSize: 19,
    fontWeight: "700",
    color: "white",
  },

  searchContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  searchSection: {
      marginBottom: 6,
  },

  searchBarContainer: {
      marginLeft: 150,
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

  shoppingListSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background,
  },

  shoppingListCard: {
    padding: Spacing.md,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    elevation: 3,
  },

  shoppingListTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  shoppingListTitleArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  shoppingListIcon: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    backgroundColor: Colors.primary,
  },

  shoppingListIconText: {
    fontSize: 20,
  },

  shoppingListInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },

  shoppingListLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
  },

  shoppingListName: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  shoppingListArrow: {
    marginLeft: Spacing.sm,
    fontSize: 30,
    color: Colors.textLight,
  },

  progressSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.md,
    marginBottom: 6,
  },

  progressStatus: {
    fontSize: 12,
    color: Colors.textLight,
  },

  progressPercentage: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },

  progressTrack: {
    height: 8,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: Colors.border,
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  progressDetails: {
    marginTop: 6,
    fontSize: 10,
    color: Colors.textLight,
  },

  noListMessage: {
    marginTop: Spacing.sm,
    fontSize: 12,
    color: Colors.textLight,
  },

  productBrand: {
      fontSize: 10,
      fontWeight: "700",
      color: Colors.primary,
      marginBottom: 1,
  },
});