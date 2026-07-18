import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { 
  RouteProp, 
  useRoute, 
  useNavigation, 
  NavigationProp,
  useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootStack";
import Screen from "../../components/layout/Screen";
import AppTextInput from "../../components/forms/AppTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {
  ProductService,
  StorePriceService,
  ShoppingListService,
} from "../../services";
import {
  Colors,
  Spacing,
} from "../../theme";
import AppDropdown from "../../components/forms/AppDropdown";
import {
  PRODUCT_CATEGORIES,
} from "../../constants/categories";
import {
  PRODUCT_SUBCATEGORIES,
} from "../../constants/subcategories";
import {
  PRODUCT_UNITS,
} from "../../constants/units";
import { 
  useCartStore,
  useStoreStore,
  useScannerFeedbackStore,
 } from "../../stores";
import {
  PRODUCT_UNIT_DROPDOWN_ITEMS,
  type ProductUnit,
} from "../../constants/units";
import {
  getSubcategoryMetadata,
} from "../../constants/subcategoryMetadata";
import {
  detectProductCategory,
} from "../../utils/detectProductCategory";
import QuantitySelector from "../../components/forms/QuantitySelector";
import AppHeader from "../../components/layout/AppHeader";

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(
      /(^|[\s\-.'&()/])([a-z])/g,
      (
        _match,
        separator: string,
        letter: string
      ) =>
        `${separator}${letter.toUpperCase()}`
    );
}

export default function ProductFormScreen() {
    console.log("Metadata:", getSubcategoryMetadata);
    console.log("Units:", PRODUCT_UNIT_DROPDOWN_ITEMS);

    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState(
    PRODUCT_CATEGORIES[0]
    );
    const [subcategory, setSubcategory] = useState(
        PRODUCT_SUBCATEGORIES[
          PRODUCT_CATEGORIES[0]
        ]?.[0] ?? ""
      );
    const [unit, setUnit] = useState(
    PRODUCT_UNITS[0]
    );
    const [barcodeError, setBarcodeError] = useState("");
    const [nameError, setNameError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [
      categoryManuallySelected,
      setCategoryManuallySelected,
    ] = useState(false);
    const detectionTimeoutRef =
      useRef<
        ReturnType<typeof setTimeout> | null
      >(null);
    const manuallyCategorizedNameRef =
      useRef<string | null>(null);
    const route =
      useRoute<RouteProp<
          RootStackParamList,
          "ProductForm"
      >>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedStore } =
      useStoreStore();

    const subcategoryUnitMetadata =
      getSubcategoryMetadata(subcategory);

    const recommendedUnits =
      subcategoryUnitMetadata?.commonUnits ?? [];

    const recommendedUnitSet =
      new Set<ProductUnit>(
        recommendedUnits
      );

    const recommendedUnitItems =
      recommendedUnits
        .map(unitName =>
          PRODUCT_UNIT_DROPDOWN_ITEMS.find(
            item => item.value === unitName
          )
        )
        .filter(
          (
            item
          ): item is typeof PRODUCT_UNIT_DROPDOWN_ITEMS[number] =>
            Boolean(item)
        )
        .map(item => ({
          ...item,
          section: "Recommended",
        }));

    const remainingUnitItems =
      PRODUCT_UNIT_DROPDOWN_ITEMS.filter(
        item =>
          !recommendedUnitSet.has(
            item.value as ProductUnit
          )
      );

    const unitDropdownItems = [
      ...recommendedUnitItems,
      ...remainingUnitItems,
    ];
    const productId =
      route.params?.productId;
    const scannedBarcode =
      route.params?.barcode;
    const shouldAddToCart =
      route.params?.addToCart ?? false;
    const [buttonTitle, setButtonTitle] =
      useState(
        productId
          ? "Update Product"
          : "Save Product"
      );
    const [measurement, setMeasurement] = useState("1");
    const addItem = useCartStore(
      state => state.addItem
    );
    const updateCartPrice = useCartStore(
      state => state.updatePrice
    );
    const availableSubcategories =
      PRODUCT_SUBCATEGORIES[category] ?? [];
    const showScannerSuccess =
      useScannerFeedbackStore(
        state => state.showSuccess
      );
    const [quantity, setQuantity] =
      useState("1");
    const [srp, setSrp] =
      useState<number | undefined>(
        undefined
      );
    const [storePrice, setStorePrice] =
      useState("");
    const [storePriceError, setStorePriceError] =
      useState("");

    type OpenDropdown =
      | "category"
      | "subcategory"
      | "unit"
      | null;

    const [
      openDropdown,
      setOpenDropdown,
    ] = useState<OpenDropdown>(null);

  useEffect(() => {
    if (!subcategory) {
      return;
    }

    const metadata =
      getSubcategoryMetadata(subcategory);

    if (!metadata?.defaultUnit) {
      return;
    }

    setUnit(metadata.defaultUnit);
  }, [subcategory]);

  useEffect(() => {
    return () => {
      if (
        detectionTimeoutRef.current
      ) {
        clearTimeout(
          detectionTimeoutRef.current
        );
      }
    };
  }, []);

  useEffect(() => {
    if (productId) {
      const existingProduct =
        ProductService.getProduct(productId);

      if (!existingProduct) return;

      setBarcode(existingProduct.barcode);
      setName(existingProduct.name);
      setBrand(existingProduct.brand ?? "");
      setCategory(
        existingProduct.category ??
          PRODUCT_CATEGORIES[0]
      );
      setSubcategory(
        existingProduct.subcategory ??
          PRODUCT_SUBCATEGORIES[
            existingProduct.category ??
              PRODUCT_CATEGORIES[0]
          ]?.[0] ??
          ""
      );
      setCategoryManuallySelected(false);
      manuallyCategorizedNameRef.current = null;
      setMeasurement(
        existingProduct.measurement?.toString() ??
          "1"
      );
      setUnit(
        existingProduct.unit ??
          PRODUCT_UNITS[0]
      );

      setSrp(existingProduct.srp);

      if (selectedStore) {
        const existingPrice =
          StorePriceService.getPrice(
            selectedStore.id,
            existingProduct.id
          );

        setStorePrice(
          existingPrice !== null
            ? existingPrice.toString()
            : ""
        );
      } else {
        setStorePrice("");
      }

      return;
    }

    if (!scannedBarcode) return;

    setBarcode(scannedBarcode);

    const existingProduct =
      ProductService.findByBarcode(
        scannedBarcode
      );

    if (!existingProduct) return;

    setName(existingProduct.name);
    setBrand(existingProduct.brand ?? "");
    setCategory(
      existingProduct.category ??
        PRODUCT_CATEGORIES[0]
    );
    setSubcategory(
      existingProduct.subcategory ??
        PRODUCT_SUBCATEGORIES[
          existingProduct.category ??
            PRODUCT_CATEGORIES[0]
        ]?.[0] ??
        ""
    );
    setCategoryManuallySelected(false);
    manuallyCategorizedNameRef.current = null;
    setMeasurement(
      existingProduct.measurement?.toString() ??
        "1"
    );
    setUnit(
      existingProduct.unit ??
        PRODUCT_UNITS[0]
    );
  }, [productId, scannedBarcode, selectedStore?.id,]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!shouldAddToCart) {
          return;
        }

        setBarcode("");
        setName("");
        setBrand("");
        setCategory(
          PRODUCT_CATEGORIES[0]
        );
        setSubcategory(
          PRODUCT_SUBCATEGORIES[
            PRODUCT_CATEGORIES[0]
          ]?.[0] ?? ""
        );
        setCategoryManuallySelected(false);
        manuallyCategorizedNameRef.current = null;
        setMeasurement("1");
        setUnit(PRODUCT_UNITS[0]);
        setQuantity("1");
        setSrp(undefined);
        setStorePrice("");
        setBarcodeError("");
        setNameError("");
        setStorePriceError("");
        setSuccessMessage("");
      };
    }, [shouldAddToCart])
  );

  function validate() {
    let valid = true;

    setBarcodeError("");
    setNameError("");

    if (!barcode.trim()) {
      setBarcodeError("Barcode is required.");
      valid = false;
    }

    if (!name.trim()) {
      setNameError("Product name is required.");
      valid = false;
    }

    return valid;
  }

  function resetSaveStatus() {
    setSuccessMessage("");
    setButtonTitle("Save Product");
  }

  function handleSave() {
    if (!validate()) return;

    setStorePriceError("");
    setSuccessMessage("");

    const numericStorePrice =
      storePrice.trim() === ""
        ? null
        : Number(storePrice);

    if (
      numericStorePrice !== null &&
      (
        !Number.isFinite(numericStorePrice) ||
        numericStorePrice < 0
      )
    ) {
      setStorePriceError(
        "Enter a valid Store Price."
      );

      return;
    }

    const productData = {
      barcode: barcode.trim(),
      name: toTitleCase(name.trim()),
      brand: brand.trim() ? toTitleCase(brand.trim()) : undefined,
      category: toTitleCase(category.trim()),
      subcategory: subcategory.trim()
        ? toTitleCase(subcategory.trim()) : undefined,
      measurement: Number(measurement),
      unit: toTitleCase(unit.trim()),
      srp,
    };

    let savedProduct =
      ProductService.findByBarcode(
        productData.barcode
      );

    if (productId) {
      ProductService.updateProduct({
        id: productId,
        ...productData,
      });

      savedProduct =
        ProductService.getProduct(productId);
    } else if (savedProduct) {
      ProductService.updateProduct({
        id: savedProduct.id,
        ...productData,
      });

      savedProduct =
        ProductService.getProduct(
          savedProduct.id
        );
    } else {
      ProductService.createProduct(
        productData
      );

      savedProduct =
        ProductService.findByBarcode(
          productData.barcode
        );
    }

    if (!savedProduct) {
      setNameError(
        "The product could not be saved."
      );

      return;
    }

    if (
      selectedStore &&
      numericStorePrice !== null
    ) {
      StorePriceService.savePrice(
        selectedStore.id,
        savedProduct.id,
        numericStorePrice
      );

      updateCartPrice(
        savedProduct.id,
        numericStorePrice
      );
    }

    if (shouldAddToCart) {
      if (!selectedStore) {
        setStorePriceError(
          "Select a store before adding this product to the cart."
        );

        return;
      }

      const savedStorePrice =
        StorePriceService.getPrice(
          selectedStore.id,
          savedProduct.id
        );

      if (savedStorePrice === null) {
        setStorePriceError(
          "Enter a Store Price before adding this product to the cart."
        );

        return;
      }

      const selectedQuantity =
        Math.max(
          1,
          Number(quantity || 1)
        );

      addItem({
        productId: savedProduct.id,
        barcode: savedProduct.barcode,
        name: savedProduct.name,
        brand: savedProduct.brand ?? "",
        category:
          savedProduct.category ??
          "Uncategorized",
        unit: savedProduct.unit,
        srp: savedProduct.srp ?? 0,
        price: savedStorePrice,
        quantity: selectedQuantity,
        subtotal:
          savedStorePrice * selectedQuantity,
      });

    const checkedItems =
      ShoppingListService.checkMatchingItems({
        id: savedProduct.id,
        name: savedProduct.name,
        brand: savedProduct.brand,
        category: savedProduct.category,
      });

    showScannerSuccess(
      checkedItems > 0
        ? `${savedProduct.name} ×${selectedQuantity} added to cart. ${checkedItems} shopping list item(s) checked.`
        : `${savedProduct.name} ×${selectedQuantity} added to cart.`
    );

    navigation.goBack();

      return;
    }

    if (productId) {
      navigation.goBack();
      return;
    }

    setSuccessMessage(
      "Product saved successfully."
    );

    setButtonTitle(
      "✓ Product Saved"
    );
  }



  return (
    <Screen>
      <AppHeader
        showBack
        title={
          productId
            ? "Edit Product"
            : "Add Product"
        }
        onBackPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
            return;
          }

          navigation.navigate("MainDrawer",{screen: "Home",}
      );
        }}
      />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

            <AppTextInput
                label="Barcode"
                value={barcode}
                onFocus={() => {setOpenDropdown(null);}}
                placeholder="Enter barcode"
                keyboardType="number-pad"
                editable={!scannedBarcode && !productId}
                onChangeText={(text) => {
                  setSuccessMessage("");
                  setButtonTitle("Save Product");
                  setBarcode(
                    text.replace(/\D/g, "")
                  );
                }}
                error={barcodeError}
            />

            <AppTextInput
              label="Product Name"
              value={name}
              onFocus={() => {setOpenDropdown(null);}}
              placeholder="Enter product name"
              onChangeText={(text) => {
                resetSaveStatus();

                const cleaned = text.replace(
                  /[^a-zA-Z0-9\s\-.'&()/]/g,
                  ""
                );

                const formatted = toTitleCase(cleaned);

                setName(formatted);

                if (detectionTimeoutRef.current) {
                  clearTimeout(
                    detectionTimeoutRef.current
                  );
                  detectionTimeoutRef.current = null;
                }

                if (
                  categoryManuallySelected &&
                  manuallyCategorizedNameRef.current !==
                    formatted.trim()
                ) {
                  setCategoryManuallySelected(false);
                  manuallyCategorizedNameRef.current = null;
                }

                if (formatted.trim().length < 3) {return;}

                if (
                  categoryManuallySelected &&
                  manuallyCategorizedNameRef.current ===
                    formatted.trim()
                ) {return;}

                detectionTimeoutRef.current =
                  setTimeout(() => {
                    const detected = detectProductCategory(formatted);

                    if (!detected) {return;}

                    setCategory(detected.category);
                    setSubcategory(detected.subcategory);
                    detectionTimeoutRef.current = null;}, 300);
              }}
              error={nameError}
            />

            <AppTextInput
              label="Brand"
              value={brand}
              onFocus={() => {setOpenDropdown(null);}}
              placeholder="Enter brand"
              onChangeText={(text) => {
                resetSaveStatus();
                const cleaned = text.replace(
                  /[^a-zA-Z0-9\s\-.'&()/]/g,
                  ""
                );
                setBrand(toTitleCase(cleaned));
              }}
            />

            <AppDropdown
              label="Category"
              selectedValue={category}
              items={PRODUCT_CATEGORIES}
              isOpen={openDropdown === "category"}
              onOpen={() =>
                setOpenDropdown("category")
              }
              onClose={() =>
                setOpenDropdown(null)
              }
              onValueChange={(value) => {
                resetSaveStatus();

                if (detectionTimeoutRef.current) {
                  clearTimeout(
                    detectionTimeoutRef.current
                  );

                  detectionTimeoutRef.current = null;
                }

                setCategoryManuallySelected(true);

                manuallyCategorizedNameRef.current =
                  name.trim();

                setCategory(value);

                const availableSubcategories =
                  PRODUCT_SUBCATEGORIES[value] ?? [];

                setSubcategory(
                  availableSubcategories[0] ?? ""
                );

                setOpenDropdown(null);
              }}
            />

            <AppDropdown
              label="Subcategory"
              selectedValue={subcategory}
              items={
                PRODUCT_SUBCATEGORIES[category] ?? []
              }
              isOpen={
                openDropdown === "subcategory"
              }
              onOpen={() =>
                setOpenDropdown("subcategory")
              }
              onClose={() =>
                setOpenDropdown(null)
              }
              disabled={!category}
              onValueChange={(value) => {
                resetSaveStatus();

                if (detectionTimeoutRef.current) {
                  clearTimeout(
                    detectionTimeoutRef.current
                  );

                  detectionTimeoutRef.current = null;
                }

                setCategoryManuallySelected(true);

                manuallyCategorizedNameRef.current =
                  name.trim();

                setSubcategory(value);
                setOpenDropdown(null);
              }}
            />

            <AppTextInput
              label="Measurement"
              value={measurement}
              placeholder="Enter measurement"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                setSuccessMessage("");
                setButtonTitle("Save Product");
                setMeasurement(
                  text.replace(/[^0-9.]/g, "")
                );
              }}
            />

            <AppDropdown
              label="Unit"
              selectedValue={unit}
              items={unitDropdownItems}
              searchable
              searchPlaceholder="Search unit, abbreviation, or group..."
              isOpen={openDropdown === "unit"}
              onOpen={() =>
                setOpenDropdown("unit")
              }
              onClose={() =>
                setOpenDropdown(null)
              }
              onValueChange={(value) => {
                resetSaveStatus();
                setUnit(value);
                setOpenDropdown(null);
              }}
            />

            <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>
                Suggested Retail Price
              </Text>

              <Text style={styles.srpValue}>
                {srp !== undefined && srp !== null
                  ? `₱${srp.toFixed(2)}`
                  : "-"}
              </Text>

              <Text style={styles.srpNotice}>
                SRP is updated automatically when an
                internet connection and supported price
                source are available.
              </Text>
            </View>

            <AppTextInput
              label={`Store Price (${
                selectedStore?.shortName ??
                selectedStore?.name ??
                "No Store"
              })`}
              prefix="₱"
              value={storePrice}
              onFocus={() => {setOpenDropdown(null);}}
              placeholder="0.00"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                setStorePriceError("");
                setSuccessMessage("");

                const cleaned = text
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1");

                setStorePrice(cleaned);
              }}
              error={storePriceError}
            />

            {shouldAddToCart && (
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
              />
            )}

            {successMessage ? (
              <Text style={styles.success}>
                  ✓ {successMessage}
              </Text>
            ) : null}

            <PrimaryButton
              title={
                shouldAddToCart
                  ? "Confirm and Add to Cart"
                  : buttonTitle
              }
              onPress={handleSave}
            />
        </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },

  success: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#81C784",
    color: "#2E7D32",
    padding: 12,
    borderRadius: 10,
    marginBottom: Spacing.md,
    textAlign: "center",
    fontWeight: "600",
  },

  priceSection: {
  marginBottom: Spacing.lg,
  padding: Spacing.md,
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: 12,
  backgroundColor: Colors.surface,
},

  priceLabel: {
    color: Colors.textLight,
  },

  srpValue: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  srpNotice: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textLight,
  },
});