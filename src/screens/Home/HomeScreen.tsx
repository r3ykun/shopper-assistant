//shopper-assistant\src\screens\Home\HomeScreen.tsx
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import SearchBar from "../../components/inputs/SearchBar";
import {
  StackActions,
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
import{
	PaymentMethod,
}from"../../database/entities/PaymentMethod";
import{
	PaymentMethodService,
}from"../../services";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  
  const [cartSearch, setCartSearch] =
    React.useState("");

  const[
    checkoutVisible,
    setCheckoutVisible,
  ]=React.useState(false);

  const[
    paymentMethods,
    setPaymentMethods,
  ]=React.useState<PaymentMethod[]>([]);

  const[
    selectedPaymentMethodId,
    setSelectedPaymentMethodId,
  ]=React.useState<number|null>(null);

  const[checkoutSaving,setCheckoutSaving]=
    React.useState(false);

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
    checkoutInProgress,
    setCheckoutInProgress,
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
      if(
        checkoutInProgress&&
        items.length>0
      ){
        Alert.alert(
          "Incomplete Checkout",
          "Your shopping cart was recovered."
        );

        setCheckoutInProgress(false);
      }
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

    const enabledMethods=
      PaymentMethodService.getEnabled();

    if(enabledMethods.length===0){
      Alert.alert(
        "No Payment Methods",
        "Enable or add a payment method before checkout."
      );
      return;
    }

    setPaymentMethods(enabledMethods);
    setSelectedPaymentMethodId(
      enabledMethods[0].id
    );
    setCheckoutVisible(true);
  }

  function closeCheckout(){
    if(checkoutSaving)return;

    setCheckoutVisible(false);
    setSelectedPaymentMethodId(null);
  }

  function completeCheckout(){
    if(!selectedStore)return;

    const paymentMethod=
      paymentMethods.find(
        method=>
          method.id===
          selectedPaymentMethodId
      );

    if(!paymentMethod){
      Alert.alert(
        "Payment Method",
        "Select a payment method."
      );
      return;
    }

    try{
      setCheckoutSaving(true);
      setCheckoutInProgress(true);

      const transactionId=
        TransactionService.checkout({
          storeId:selectedStore.id,
          paymentMethod:paymentMethod.name,
          items,
        });

      clearCart();
      setCheckoutInProgress(false);
      loadDashboardList();
      setCheckoutVisible(false);
      setSelectedPaymentMethodId(null);

      navigation.getParent()?.dispatch(
        StackActions.replace(
          "CheckoutSuccess",
          {
            transactionId,
          }
        )
      );

    }catch(error){
      Alert.alert(
        "Checkout Failed",
        error instanceof Error
          ?error.message
          :"The transaction could not be saved."
      );
    }finally{
      setCheckoutSaving(false);
      setCheckoutInProgress(false);
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <AppHeader
          showMenu
          showStoreSwitch
          title={
            selectedStore?.name??
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
                checkoutSaving&&styles.checkoutButtonDisabled,
              ]}
              onPress={handleConfirm}
              disabled={checkoutSaving}
            >
              <Text style={styles.confirmText}>
                {checkoutSaving
                  ?"SAVING..."
                  :"CONFIRM"}
              </Text>

              <Text style={styles.confirmIcon}>
                ✓
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={checkoutVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeCheckout}
      >
        <Pressable
          style={styles.checkoutBackdrop}
          onPress={closeCheckout}
        >
          <Pressable
            style={styles.checkoutModal}
            onPress={event=>
              event.stopPropagation()
            }
          >
            <View style={styles.checkoutHeader}>
              <View>
                <Text style={styles.checkoutModalTitle}>
                  Confirm Purchase
                </Text>

                <Text style={styles.checkoutStore}>
                  {selectedStore?.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={closeCheckout}
                disabled={checkoutSaving}
              >
                <Text style={styles.checkoutClose}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.checkoutAmountCard}>
              <Text style={styles.checkoutAmountLabel}>
                Total
              </Text>

              <Text style={styles.checkoutAmount}>
                ₱{totalPrice().toFixed(2)}
              </Text>

              <Text style={styles.checkoutItemCount}>
                {totalItems()} item(s)
              </Text>
            </View>

            <Text style={styles.paymentTitle}>
              Select Payment Method
            </Text>

            <ScrollView
              style={styles.paymentList}
              showsVerticalScrollIndicator={false}
            >
              {paymentMethods.map(method=>{
                const selected=
                  method.id===
                  selectedPaymentMethodId;

                return(
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentOption,
                      selected&&
                        styles.selectedPaymentOption,
                    ]}
                    onPress={()=>
                      setSelectedPaymentMethodId(
                        method.id
                      )
                    }
                  >
                    <View style={styles.paymentOptionInfo}>
                      <Text
                        style={[
                          styles.paymentOptionName,
                          selected&&
                            styles.selectedPaymentText,
                        ]}
                      >
                        {method.name}
                      </Text>

                      <Text style={styles.paymentOptionType}>
                        {method.type}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.paymentRadio,
                        selected&&
                          styles.selectedPaymentRadio,
                      ]}
                    >
                      {selected&&(
                        <View style={styles.paymentRadioDot}/>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.checkoutActions}>
              <TouchableOpacity
                style={styles.checkoutCancelButton}
                onPress={closeCheckout}
                disabled={checkoutSaving}
              >
                <Text style={styles.checkoutCancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkoutConfirmButton,
                  checkoutSaving&&
                    styles.checkoutButtonDisabled,
                ]}
                onPress={completeCheckout}
                disabled={checkoutSaving}
              >
                <Text style={styles.checkoutConfirmText}>
                  {checkoutSaving
                    ?"Saving..."
                    :"Confirm Purchase"}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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

  checkoutBackdrop:{
    flex:1,
    justifyContent:"center",
    padding:Spacing.lg,
    backgroundColor:"rgba(0,0,0,.55)",
  },
  checkoutModal:{
    maxHeight:"88%",
    borderRadius:20,
    backgroundColor:Colors.surface,
    overflow:"hidden",
  },
  checkoutHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:Spacing.lg,
    borderBottomWidth:1,
    borderBottomColor:Colors.border,
  },
  checkoutModalTitle:{
    fontSize:20,
    fontWeight:"800",
    color:Colors.text,
  },
  checkoutStore:{
    marginTop:3,
    fontSize:12,
    color:Colors.textLight,
  },
  checkoutClose:{
    fontSize:32,
    lineHeight:34,
    color:Colors.textLight,
  },
  checkoutAmountCard:{
    alignItems:"center",
    margin:Spacing.lg,
    padding:Spacing.lg,
    borderRadius:16,
    backgroundColor:Colors.background,
  },
  checkoutAmountLabel:{
    fontSize:12,
    color:Colors.textLight,
  },
  checkoutAmount:{
    marginTop:4,
    fontSize:30,
    fontWeight:"800",
    color:Colors.primary,
  },
  checkoutItemCount:{
    marginTop:4,
    fontSize:12,
    color:Colors.textLight,
  },
  paymentTitle:{
    paddingHorizontal:Spacing.lg,
    marginBottom:Spacing.sm,
    fontSize:14,
    fontWeight:"700",
    color:Colors.text,
  },
  paymentList:{
    maxHeight:260,
    paddingHorizontal:Spacing.lg,
  },
  paymentOption:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:Spacing.sm,
    padding:Spacing.md,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:12,
    backgroundColor:Colors.surface,
  },
  selectedPaymentOption:{
    borderColor:Colors.primary,
    backgroundColor:Colors.background,
  },
  paymentOptionInfo:{
    flex:1,
  },
  paymentOptionName:{
    fontSize:15,
    fontWeight:"700",
    color:Colors.text,
  },
  selectedPaymentText:{
    color:Colors.primary,
  },
  paymentOptionType:{
    marginTop:2,
    fontSize:11,
    color:Colors.textLight,
    textTransform:"capitalize",
  },
  paymentRadio:{
    width:22,
    height:22,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor:Colors.border,
    borderRadius:11,
  },
  selectedPaymentRadio:{
    borderColor:Colors.primary,
  },
  paymentRadioDot:{
    width:10,
    height:10,
    borderRadius:5,
    backgroundColor:Colors.primary,
  },
  checkoutActions:{
    flexDirection:"row",
    gap:Spacing.sm,
    padding:Spacing.lg,
    borderTopWidth:1,
    borderTopColor:Colors.border,
  },
  checkoutCancelButton:{
    minHeight:50,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:Spacing.lg,
    borderWidth:1,
    borderColor:"#D32F2F",
    borderRadius:12,
  },
  checkoutCancelText:{
    fontWeight:"700",
    color:"#D32F2F",
  },
  checkoutConfirmButton:{
    flex:1,
    minHeight:50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:12,
    backgroundColor:Colors.primary,
  },
  checkoutConfirmText:{
    fontWeight:"700",
    color:"#fff",
  },
  checkoutButtonDisabled:{
    opacity:.55,
  },
});