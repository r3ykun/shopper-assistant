import React, {
  useEffect,
  useState,
} from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../../navigation/RootStack";

import Screen from "../../components/layout/Screen";
import AppHeader from "../../components/layout/AppHeader";
import AppTextInput from "../../components/forms/AppTextInput";

import {
  Product,
} from "../../database/entities/Product";

import {
  Store,
} from "../../database/entities/Store";

import {
  ProductService,
  StorePriceService,
} from "../../services";

import {
  database,
} from "../../database/database";

import {
  useStoreStore,
} from "../../stores";

import {
  Colors,
  Spacing,
} from "../../theme";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "StoreDetails"
  >;

type PriceValues = Record<
  number,
  string
>;

type PriceErrors = Record<
  number,
  string
>;

const PAGE_SIZE = 20;

export default function StoreDetailsScreen({
  route,
}: Props) {
  const storeId =
    route.params.storeId;

  const { selectedStore } =
    useStoreStore();

  const [store, setStore] =
    useState<Store | null>(null);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    selectedProductId,
    setSelectedProductId,
  ] = useState<number | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [
    editedPrices,
    setEditedPrices,
  ] = useState<PriceValues>({});

  const [
    priceErrors,
    setPriceErrors,
  ] = useState<PriceErrors>({});

  const [
    saveMessage,
    setSaveMessage,
  ] = useState("");

  const [
    saveMessageType,
    setSaveMessageType,
  ] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    const storedStore =
      database.getFirstSync<Store>(
        `
        SELECT *
        FROM Stores
        WHERE id = ?;
        `,
        [storeId]
      );

    setStore(storedStore);

    setProducts(
      ProductService.getAllProducts()
    );
  }, [storeId]);

  useEffect(() => {
    const values: PriceValues = {};

    products.forEach(product => {
      const price =
        StorePriceService.getPrice(
          storeId,
          product.id
        );

      values[product.id] =
        typeof price === "number"
          ? price.toString()
          : "";
    });

    setEditedPrices(values);
  }, [
    products,
    storeId,
  ]);

  useEffect(() => {
    if (
      saveMessageType !== "success" ||
      !saveMessage
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setSaveMessage("");
      setSaveMessageType(null);
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [
    saveMessage,
    saveMessageType,
  ]);

  const filteredProducts =
    products.filter(product => {
      const keyword =
        search.trim().toLowerCase();

      if (!keyword) {
        return true;
      }

      return (
        product.name
          .toLowerCase()
          .includes(keyword) ||
        product.barcode.includes(keyword) ||
        (product.brand ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (product.category ?? "")
          .toLowerCase()
          .includes(keyword)
      );
    });

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
      PAGE_SIZE
    )
  );

  const pageStart =
    (currentPage - 1) *
    PAGE_SIZE;

  const paginatedProducts =
    filteredProducts.slice(
      pageStart,
      pageStart + PAGE_SIZE
    );

  const selectedProduct =
    products.find(
      product =>
        product.id ===
        selectedProductId
    ) ?? null;

  const startingStorePrice =
    selectedProduct &&
    selectedStore
      ? StorePriceService.getPrice(
          selectedStore.id,
          selectedProduct.id
        )
      : null;

  const viewedStorePrice =
    selectedProduct
      ? StorePriceService.getPrice(
          storeId,
          selectedProduct.id
        )
      : null;

  const priceDifference =
    startingStorePrice !== null &&
    viewedStorePrice !== null
      ? startingStorePrice -
        viewedStorePrice
      : null;

  const comparisonStatus =
    priceDifference === null
      ? "unavailable"
      : priceDifference < 0
        ? "lower"
        : priceDifference > 0
          ? "higher"
          : "same";

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  function loadCurrentPrices() {
    const values: PriceValues = {};

    products.forEach(product => {
      const price =
        StorePriceService.getPrice(
          storeId,
          product.id
        );

      values[product.id] =
        typeof price === "number"
          ? price.toString()
          : "";
    });

    return values;
  }

  function startEditing() {
    setEditedPrices(
      loadCurrentPrices()
    );

    setPriceErrors({});
    setSaveMessage("");
    setSaveMessageType(null);
    setIsEditing(true);
  }

  function cancelEditing() {
    setEditedPrices(
      loadCurrentPrices()
    );

    setPriceErrors({});
    setSaveMessage("");
    setSaveMessageType(null);
    setIsEditing(false);
  }

  function validatePrices() {
    const errors: PriceErrors = {};

    products.forEach(product => {
      const value =
        editedPrices[product.id]
          ?.trim() ?? "";

      if (!value) {
        return;
      }

      const numericPrice =
        Number(value);

      if (
        !Number.isFinite(
          numericPrice
        ) ||
        numericPrice < 0
      ) {
        errors[product.id] =
          "Enter a valid price.";

        return;
      }

      if (
        !/^\d+(\.\d{1,2})?$/.test(
          value
        )
      ) {
        errors[product.id] =
          "Maximum 2 decimals.";
      }
    });

    setPriceErrors(errors);

    return (
      Object.keys(errors).length === 0
    );
  }

  function handleSavePrices() {
    setSaveMessage("");
    setSaveMessageType(null);

    if (!validatePrices()) {
      setSaveMessage(
        "Some prices are invalid. Check the highlighted fields."
      );

      setSaveMessageType("error");

      return;
    }

    try {
      products.forEach(product => {
        const value =
          editedPrices[product.id]
            ?.trim() ?? "";

        if (!value) {
          StorePriceService.removePrice(
            storeId,
            product.id
          );

          return;
        }

        StorePriceService.savePrice(
          storeId,
          product.id,
          Number(value)
        );
      });

      setPriceErrors({});

      setSaveMessage(
        "Store prices saved successfully."
      );

      setSaveMessageType(
        "success"
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Failed to save Store Prices:",
        error
      );

      setSaveMessage(
        "The Store Prices could not be saved."
      );

      setSaveMessageType("error");
    }
  }

  function handlePriceChange(
    productId: number,
    text: string
  ) {
    const cleaned = text
      .replace(
        /[^0-9.]/g,
        ""
      )
      .replace(
        /(\..*)\./g,
        "$1"
      );

    setEditedPrices(current => ({
      ...current,
      [productId]: cleaned,
    }));

    setPriceErrors(current => {
      const updated = {
        ...current,
      };

      delete updated[productId];

      return updated;
    });

    setSaveMessage("");
    setSaveMessageType(null);
  }

  function goToPreviousPage() {
    setSelectedProductId(null);

    setCurrentPage(page =>
      Math.max(
        1,
        page - 1
      )
    );
  }

  function goToNextPage() {
    setSelectedProductId(null);

    setCurrentPage(page =>
      Math.min(
        totalPages,
        page + 1
      )
    );
  }

  return (
    <Screen>
      <AppHeader
        showBack
        title="Store Prices List"
      />

      <View style={styles.container}>
        <FlatList
          data={paginatedProducts}
          keyExtractor={item =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.screenContent
          }
          ListHeaderComponent={
            <>
              <View
                style={
                  styles.storeSection
                }
              >
                <View
                  style={
                    styles.storeBlock
                  }
                >
                  <Text
                    style={
                      styles.storeLabelMain
                    }
                  >
                    Currently Shopping In
                  </Text>

                  <Text
                    style={
                      styles.storeValue
                    }
                  >
                    {selectedStore?.name ??
                      "No store selected"}
                  </Text>
                </View>

                <View
                  style={
                    styles.storeDivider
                  }
                />

                <View
                  style={
                    styles.storeBlock
                  }
                >
                  <Text
                    style={
                      styles.storeLabel
                    }
                  >
                    For Store Comparison
                  </Text>

                  <Text
                    style={
                      styles.storeValue
                    }
                  >
                    {store?.name ??
                      "Store unavailable"}
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.comparisonSection
                }
              >
                <Text
                  style={
                    styles.comparisonTitle
                  }
                >
                  Price Comparison
                </Text>

                {!selectedProduct ? (
                  <Text
                    style={
                      styles.comparisonPlaceholder
                    }
                  >
                    Select a product from the
                    list to compare prices.
                  </Text>
                ) : (
                  <>
                    <View style={styles.selectedProductInfo}>
                        <Text
                        style={styles.selectedProductInfo}
                        numberOfLines={2}
                        >
                        <Text style={styles.selectedProductBrand}>
                            {selectedProduct.brand || "No Brand"}
                        </Text>

                        {" | "}

                        <Text style={styles.selectedProductItemName}>
                            {selectedProduct.name}
                        </Text>
                        </Text>
                    </View>

                    <View
                      style={
                        styles.comparisonTable
                      }
                    >
                      <View
                        style={
                          styles.comparisonHeaderRow
                        }
                      >
                        <View
                          style={[
                            styles.comparisonCell,
                            styles.comparisonHeaderCell,
                          ]}
                        >
                          <Text
                            style={
                              styles.comparisonStoreName
                            }
                            numberOfLines={2}
                          >
                            {selectedStore
                              ?.shortName ??
                              selectedStore
                                ?.name ??
                              "Selected Store"}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.comparisonCell,
                            styles.comparisonHeaderCell,
                          ]}
                        >
                          <Text
                            style={
                              styles.comparisonStoreName
                            }
                            numberOfLines={2}
                          >
                            {store?.shortName ??
                              store?.name ??
                              "Viewed Store"}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={
                          styles.comparisonPriceRow
                        }
                      >
                        <View
                          style={[
                            styles.comparisonCell,
                            styles.comparisonPriceCell,
                          ]}
                        >
                          <View
                            style={
                              styles.leftPriceContainer
                            }
                          >
                            <Text
                              style={[
                                styles.comparisonPrice,
                                comparisonStatus ===
                                "lower"
                                  ? styles.lowerPrice
                                  : comparisonStatus ===
                                      "higher"
                                    ? styles.higherPrice
                                    : styles.samePrice,
                              ]}
                            >
                              {typeof startingStorePrice ===
                              "number"
                                ? `₱${startingStorePrice.toFixed(
                                    2
                                  )}`
                                : "—"}
                            </Text>

                            {comparisonStatus !==
                            "unavailable" ? (
                              <Text
                                style={[
                                  styles.comparisonArrow,
                                  comparisonStatus ===
                                  "lower"
                                    ? styles.lowerPrice
                                    : comparisonStatus ===
                                        "higher"
                                      ? styles.higherPrice
                                      : styles.samePrice,
                                ]}
                              >
                                {comparisonStatus ===
                                "lower"
                                  ? "↓"
                                  : comparisonStatus ===
                                      "higher"
                                    ? "↑"
                                    : ""}
                              </Text>
                            ) : null}
                          </View>
                        </View>

                        <View
                          style={[
                            styles.comparisonCell,
                            styles.comparisonPriceCell,
                          ]}
                        >
                          <Text
                            style={
                              styles.comparisonPrice
                            }
                          >
                            {typeof viewedStorePrice ===
                            "number"
                              ? `₱${viewedStorePrice.toFixed(
                                  2
                                )}`
                              : "—"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </View>

              <AppTextInput
                value={search}
                placeholder="Search products..."
                onChangeText={setSearch}
              />

              <View
                style={
                  styles.editRow
                }
              >
                <View
                  style={
                    styles.editActions
                  }
                >
                  {isEditing ? (
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.cancelButton,
                      ]}
                      onPress={
                        cancelEditing
                      }
                    >
                      <Text
                        style={
                          styles.cancelButtonText
                        }
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.primaryActionButton,
                    ]}
                    onPress={
                      isEditing
                        ? handleSavePrices
                        : startEditing
                    }
                  >
                    <Text
                      style={
                        styles.primaryActionText
                      }
                    >
                      {isEditing
                        ? "Save"
                        : "Edit"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {saveMessage ? (
                <Text
                  style={[
                    styles.saveMessage,
                    saveMessageType ===
                    "error"
                      ? styles.errorMessage
                      : styles.successMessage,
                  ]}
                >
                  {saveMessageType ===
                  "error"
                    ? "✕"
                    : "✓"}{" "}
                  {saveMessage}
                </Text>
              ) : null}

              <View
                style={
                  styles.tableHeader
                }
              >
                <View
                  style={
                    styles.productColumn
                  }
                >
                  <Text
                    style={
                      styles.headerText
                    }
                  >
                    Product
                  </Text>
                </View>

                <View
                  style={
                    styles.priceColumn
                  }
                >
                  <Text
                    style={
                      styles.headerText
                    }
                  >
                    SRP
                  </Text>
                </View>

                <View
                  style={
                    styles.priceColumn
                  }
                >
                  <Text
                    style={
                      styles.headerText
                    }
                  >
                    Store Price
                  </Text>
                </View>
              </View>
            </>
          }
          ListEmptyComponent={
            <View
              style={
                styles.emptyContainer
              }
            >
              <Text
                style={
                  styles.emptyText
                }
              >
                No products found.
              </Text>
            </View>
          }
          ListFooterComponent={
            filteredProducts.length >
            0 ? (
              <View
                style={
                  styles.paginationSection
                }
              >
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage === 1
                      ? styles.disabledPageButton
                      : null,
                  ]}
                  disabled={
                    currentPage === 1
                  }
                  onPress={
                    goToPreviousPage
                  }
                >
                  <Text
                    style={
                      styles.pageButtonText
                    }
                  >
                    Previous
                  </Text>
                </TouchableOpacity>

                <Text
                  style={
                    styles.pageIndicator
                  }
                >
                  Page {currentPage} of{" "}
                  {totalPages}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage ===
                    totalPages
                      ? styles.disabledPageButton
                      : null,
                  ]}
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onPress={
                    goToNextPage
                  }
                >
                  <Text
                    style={
                      styles.pageButtonText
                    }
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const storePrice =
              StorePriceService.getPrice(
                storeId,
                item.id
              );

            const isSelected =
              selectedProductId ===
              item.id;

            const inputError =
              priceErrors[item.id];

            return (
              <TouchableOpacity
                style={[
                  styles.row,
                  isSelected
                    ? styles.selectedRow
                    : null,
                ]}
                activeOpacity={0.75}
                onPress={() =>
                  setSelectedProductId(
                    item.id
                  )
                }
              >
                <View
                  style={
                    styles.productColumn
                  }
                >
                  <Text
                    style={
                      styles.brand
                    }
                  >
                    {item.brand ||
                      "No Brand"}
                  </Text>

                  <Text
                    style={
                      styles.productName
                    }
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={
                      styles.category
                    }
                  >
                    {item.category ||
                      "Uncategorized"}
                  </Text>

                  <Text
                    style={
                      styles.barcode
                    }
                  >
                    #{item.barcode}
                  </Text>
                </View>

                <View
                  style={
                    styles.priceColumn
                  }
                >
                  <Text
                    style={
                      styles.price
                    }
                  >
                    {typeof item.srp ===
                    "number"
                      ? `₱${item.srp.toFixed(
                          2
                        )}`
                      : "—"}
                  </Text>
                </View>

                <View
                  style={
                    styles.priceColumn
                  }
                >
                  {isEditing ? (
                    <View
                      style={
                        styles.inputArea
                      }
                    >
                      <View
                        style={[
                          styles.priceInputContainer,
                          inputError
                            ? styles.invalidInput
                            : null,
                        ]}
                      >
                        <Text
                          style={
                            styles.pesoPrefix
                          }
                        >
                          ₱
                        </Text>

                        <TextInput
                          style={
                            styles.priceInput
                          }
                          value={
                            editedPrices[
                              item.id
                            ] ?? ""
                          }
                          keyboardType="decimal-pad"
                          placeholder="0.00"
                          placeholderTextColor={
                            Colors.textLight
                          }
                          onChangeText={text =>
                            handlePriceChange(
                              item.id,
                              text
                            )
                          }
                        />
                      </View>

                      {inputError ? (
                        <Text
                          style={
                            styles.inputErrorText
                          }
                        >
                          {inputError}
                        </Text>
                      ) : null}
                    </View>
                  ) : (
                    <Text
                      style={
                        styles.price
                      }
                    >
                      {typeof storePrice ===
                      "number"
                        ? `₱${storePrice.toFixed(
                            2
                          )}`
                        : "—"}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    screenContent: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xl,
    },

    description: {
      marginBottom: Spacing.md,
      color: Colors.textLight,
    },

    storeSection: {
      flexDirection: "row",
      marginBottom: Spacing.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 12,
      backgroundColor:
        Colors.surface,
    },

    storeBlock: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    storeDivider: {
      width: 1,
      marginHorizontal:
        Spacing.md,
      backgroundColor:
        Colors.border,
    },

    storeLabel: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: 400,
      color: Colors.black,
    },

    storeLabelMain: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: 600,
      color: Colors.primary,
    },

    storeValue: {
      marginTop: 4,
      textAlign: "center",
      fontSize: 14,
      fontWeight: "700",
      color: Colors.text,
    },

    comparisonSection: {
      marginBottom: Spacing.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 12,
      backgroundColor:
        Colors.surface,
    },

    comparisonTitle: {
      marginBottom: Spacing.sm,
      fontSize: 16,
      fontWeight: "700",
      color: Colors.text,
      textAlign: "center",
    },

    comparisonPlaceholder: {
      paddingVertical:
        Spacing.md,
      textAlign: "center",
      color: Colors.textLight,
    },

    selectedProductInfo: {
    marginBottom: Spacing.sm,
    },

    selectedProductBrand: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
    },

    selectedProductItemName: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primaryDark,
    },

    comparisonTable: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 10,
    },

    comparisonHeaderRow: {
      flexDirection: "row",
      backgroundColor:
        Colors.primary,
    },

    comparisonPriceRow: {
      flexDirection: "row",
      backgroundColor:
        Colors.surface,
    },

    comparisonCell: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      borderRightWidth: 1,
      borderRightColor:
        Colors.border,
    },

    comparisonHeaderCell: {
      minHeight: 32,
      paddingVertical: 3,
    },

    comparisonPriceCell: {
      minHeight: 46,
      paddingVertical: 7,
    },

    comparisonStoreName: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: "700",
      color: "white",
    },

    comparisonPrice: {
      textAlign: "center",
      fontSize: 17,
      fontWeight: "700",
      color: Colors.text,
    },

    leftPriceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    comparisonArrow: {
      marginLeft: 7,
      fontSize: 22,
      fontWeight: "800",
    },

    lowerPrice: {
      color: "#2E7D32",
    },

    higherPrice: {
      color: "#C62828",
    },

    samePrice: {
      color: Colors.text,
    },

    editRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: Spacing.md,
    },

    editActions: {
      flexDirection: "row",
      gap: 8,
    },

    actionButton: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 10,
    },

    primaryActionButton: {
      backgroundColor:
        Colors.primary,
    },

    primaryActionText: {
      fontWeight: "700",
      color: "white",
    },

    cancelButton: {
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor:
        Colors.surface,
    },

    cancelButtonText: {
      fontWeight: "700",
      color: Colors.text,
    },

    saveMessage: {
      marginBottom: Spacing.md,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      textAlign: "center",
      fontWeight: "600",
    },

    successMessage: {
      borderColor: "#81C784",
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
    },

    errorMessage: {
      borderColor: "#EF9A9A",
      backgroundColor: "#FFEBEE",
      color: "#C62828",
    },

    tableHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor:
        Colors.primary,
    },

    headerText: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: "700",
      color: "white",
    },

    row: {
      minHeight: 68,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 7,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor:
        Colors.border,
      backgroundColor:
        Colors.surface,
    },

    selectedRow: {
      borderWidth: 2,
      borderColor:
        Colors.primary,
      backgroundColor: "#E8F1F8",
    },

    productColumn: {
      flex: 2.2,
      paddingRight: 6,
    },

    priceColumn: {
      flex: 0.9,
      justifyContent: "center",
      alignItems: "center",
    },

    brand: {
    fontSize: 11,
    fontWeight: "400",
    color: Colors.black,
    },

    productName: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "800",
    color: Colors.primaryDark,
    },

    category: {
      marginTop: 2,
      fontSize: 11,
      color: Colors.textLight,
    },

    barcode: {
      marginTop: 2,
      fontSize: 12,
      fontWeight: 300,
      color: Colors.textLight,
    },

    price: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: "600",
      color: Colors.text,
    },

    inputArea: {
      width: "100%",
    },

    priceInputContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      backgroundColor:
        Colors.surface,
    },

    invalidInput: {
      borderColor: "#C62828",
      backgroundColor: "#FFEBEE",
    },

    pesoPrefix: {
      marginRight: 2,
      fontSize: 11,
      color: Colors.text,
    },

    priceInput: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 6,
      paddingHorizontal: 2,
      textAlign: "center",
      fontSize: 11,
      color: Colors.text,
    },

    inputErrorText: {
      marginTop: 3,
      textAlign: "center",
      fontSize: 8,
      color: "#C62828",
    },

    paginationSection: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },

    pageButton: {
      minWidth: 90,
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor:
        Colors.primary,
    },

    disabledPageButton: {
      opacity: 0.4,
    },

    pageButtonText: {
      fontWeight: "700",
      color: "white",
    },

    pageIndicator: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.text,
    },

    emptyContainer: {
      minHeight: 200,
      justifyContent: "center",
      alignItems: "center",
    },

    emptyText: {
      color: Colors.textLight,
    },
  });