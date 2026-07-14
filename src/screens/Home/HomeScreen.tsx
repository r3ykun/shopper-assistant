import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

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

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  
  const [cartSearch, setCartSearch] =
    React.useState("");

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
      item.category
        .toLowerCase()
        .includes(keyword)
    );
  });

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
          onPress: clearCart,
        },
      ]
    );
  }

  function handleConfirm() {
    if (items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Add at least one product before confirming."
      );

      return;
    }

    Alert.alert(
      "Confirm Cart",
      `${totalItems()} item(s) are ready for checkout.`
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

        <View style={styles.cartSection}>
          <View style={styles.cartHeader}>
            <View style={styles.cartTitleContainer}>
              <View style={styles.cartIcon}>
                <Text style={styles.cartIconText}>
                  🛒
                </Text>
              </View>

              <Text style={styles.cartTitle}>
                CART
              </Text>
            </View>

            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>
                🔍
              </Text>

              <TextInput
                style={styles.searchInput}
                value={cartSearch}
                placeholder="Search cart"
                placeholderTextColor={Colors.textLight}
                onChangeText={setCartSearch}
                returnKeyType="search"
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
                  <Text
                    style={styles.productName}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={styles.productBarcode}
                    numberOfLines={1}
                  >
                    #{item.barcode}
                  </Text>
                </View>

                <View style={styles.quantityColumn}>
                  <Text style={styles.rowCell}>
                    {item.quantity}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.rowCell,
                    styles.categoryColumn,
                  ]}
                  numberOfLines={1}
                >
                  {item.category}
                </Text>

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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  cartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    width: 150,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },

  searchIcon: {
    marginRight: 6,
    fontSize: 14,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 13,
    color: Colors.text,
  },
});