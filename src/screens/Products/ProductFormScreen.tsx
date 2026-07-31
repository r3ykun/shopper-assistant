//shopper-assistant\src\screens\Products\ProductFormScreen.tsx
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
  useCartStore,
  useStoreStore,
  useScannerFeedbackStore,
 } from "../../stores";
import{
  PRODUCT_PACKAGING,
  MEASUREMENT_UNITS,
  QUANTITY_UNITS,
}from "../../constants/units";
import {
  getSubcategoryMetadata,
} from "../../constants/subcategoryMetadata";
import {
  detectProductCategory,
  type DetectedProductCategory,
} from "../../utils/product/detectProductCategory";
import QuantitySelector from "../../components/forms/QuantitySelector";
import AppHeader from "../../components/layout/AppHeader";
import { 
  detectProductBrand,
  type BrandDetectionResult,
 } from "../../utils/brand/detectProductBrand";

type SortDirection = "asc" | "desc";

function sortAlphabetically(
  values: string[],
  direction: SortDirection
): string[] {
  return [...values].sort((a, b) => {
    const comparison = a.localeCompare(
      b,
      undefined,
      {
        sensitivity: "base",
      }
    );

    return direction === "asc"
      ? comparison
      : -comparison;
  });
}

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

function normalizeProductName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function ProductFormScreen() {
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
    const [packaging,setPackaging]=useState(
      PRODUCT_PACKAGING[0]
    );
    const [measurementUnit,setMeasurementUnit]=useState(
      MEASUREMENT_UNITS[0]
    );
    const [quantityUnit,setQuantityUnit]=useState(
      QUANTITY_UNITS[0]
    );
    const [barcodeError, setBarcodeError] = useState("");
    const [nameError, setNameError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [
      detection,
      setDetection,
    ] = useState<
      DetectedProductCategory | null
    >(null);
    const [
      brandDetection,
      setBrandDetection,
    ] = useState<
      BrandDetectionResult | null
    >(null);
    const detectionTimeoutRef =
      useRef<
        ReturnType<typeof setTimeout> | null
      >(null);
    const [categoryLocked, setCategoryLocked] =
      useState(false);
    const [subcategoryLocked, setSubcategoryLocked] =
      useState(false);
    const [unitLocked, setUnitLocked] =
      useState(false);
    const [
      brandLocked,
      setBrandLocked,
    ] = useState(false);

    const manuallyEditedNameRef =
      useRef<string | null>(null);
    const route =
      useRoute<RouteProp<
          RootStackParamList,
          "ProductForm"
      >>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedStore } =
      useStoreStore();
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

    const categorySortDirection:
      SortDirection = "asc";

    const subcategorySortDirection:
      SortDirection = "asc";

    const [measurement, setMeasurement] = useState("1");
    const addItem = useCartStore(
      state => state.addItem
    );
    const updateCartPrice = useCartStore(
      state => state.updatePrice
    );
    const availableSubcategories =
      PRODUCT_SUBCATEGORIES[category] ?? [];
    const sortedCategories =
      sortAlphabetically(
        PRODUCT_CATEGORIES,
        categorySortDirection
      );

    const sortedSubcategories =
      sortAlphabetically(
        availableSubcategories,
        subcategorySortDirection
      );
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

    type OpenDropdown=
      |"category"
      |"subcategory"
      |"packaging"
      |"measurementUnit"
      |"quantityUnit"
      |null;

    const [
      openDropdown,
      setOpenDropdown,
    ] = useState<OpenDropdown>(null);

  useEffect(() => {
    const metadata =
      getSubcategoryMetadata(subcategory);

    if (!subcategory || unitLocked) {
      return;
    }

    if (metadata?.defaultUnit) {
      setPackaging(metadata.defaultUnit);
      return;
    }

    const firstCommonUnit =
      metadata?.commonUnits?.[0];

    if (firstCommonUnit) {
      setPackaging(firstCommonUnit);
    }
  }, [subcategory, unitLocked]);

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
      setCategoryLocked(true);
      setSubcategoryLocked(true);
      setUnitLocked(true);
      setBrandLocked(true);

      manuallyEditedNameRef.current =
        normalizeProductName(existingProduct.name);  

      setMeasurement(
        existingProduct.measurement?.toString() ??
          "1"
      );
      setPackaging(
        existingProduct.packaging ??
          PRODUCT_PACKAGING[0]
      );

      setMeasurementUnit(
        existingProduct.measurementUnit ??
          MEASUREMENT_UNITS[0]
      );

      setQuantity(
        existingProduct.quantity?.toString() ??
          "1"
      );

      setQuantityUnit(
        existingProduct.quantityUnit ??
          QUANTITY_UNITS[0]
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

    setDetection(null);
    setCategoryLocked(true);
    setSubcategoryLocked(true);
    setUnitLocked(true);
    setBrandLocked(true);

    manuallyEditedNameRef.current =
      normalizeProductName(existingProduct.name); 
    setMeasurement(
      existingProduct.measurement?.toString() ??
        "1"
    );
    setPackaging(
      existingProduct.packaging ??
        PRODUCT_PACKAGING[0]
    );

    setMeasurementUnit(
      existingProduct.measurementUnit ??
        MEASUREMENT_UNITS[0]
    );

    setQuantity(
      existingProduct.quantity?.toString() ??
        "1"
    );

    setQuantityUnit(
      existingProduct.quantityUnit ??
        QUANTITY_UNITS[0]
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
        setBrandLocked(false);
        setBrandDetection(null);

        setCategory(
          PRODUCT_CATEGORIES[0]
        );

        setSubcategory(
          PRODUCT_SUBCATEGORIES[
            PRODUCT_CATEGORIES[0]
          ]?.[0] ?? ""
        );

        setCategoryLocked(false);
        setSubcategoryLocked(false);
        setUnitLocked(false);

        manuallyEditedNameRef.current = null;

        setDetection(null);
        setMeasurement("1");
        setPackaging(PRODUCT_PACKAGING[0]);
        setMeasurementUnit(MEASUREMENT_UNITS[0]);
        setQuantityUnit(QUANTITY_UNITS[0]);
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
      packaging:toTitleCase(packaging.trim()),
      measurement:Number(measurement),
      measurementUnit,
      quantity:Number(quantity),
      quantityUnit,
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
        packaging:savedProduct.packaging,
        measurement:savedProduct.measurement,
        measurementUnit:savedProduct.measurementUnit,
        productQuantity:savedProduct.quantity,
        quantityUnit:savedProduct.quantityUnit,
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

  function getBrandConfidence(
    score?: number
  ): "high" | "medium" | "low" | undefined {
    if (score === undefined) {
      return undefined;
    }

    if (score >= 80) {
      return "high";
    }

    if (score >= 50) {
      return "medium";
    }

    return "low";
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

                const normalizedName = normalizeProductName(formatted);

                if (
                  manuallyEditedNameRef.current !== null &&
                  manuallyEditedNameRef.current !== normalizedName
                ) {
                  setCategoryLocked(false);
                  setSubcategoryLocked(false);
                  setUnitLocked(false);
                  setBrandLocked(false);
                  manuallyEditedNameRef.current = null;
                }

      if (normalizedName.length < 3) {
        setDetection(null);
        setBrandDetection(null);

        if (!brandLocked) {
          setBrand("");
        }

        return;
      }

                detectionTimeoutRef.current =
                  setTimeout(() => {
                    const detectedBrand = detectProductBrand(formatted);
                    const cleanedProductName = detectedBrand?.productName ?? formatted;
                    const detected = detectProductCategory(cleanedProductName);
                  
                    setBrandDetection(
                      detectedBrand
                    );

                    if (
                      detectedBrand && !brandLocked
                    ) {
                      setBrand(detectedBrand.brand);

                      if (detectedBrand.removeFromProductName) 
                        {
                          const cleanedName = detectedBrand.productName;

                          if (
                            normalizeProductName(cleanedName) !==
                            normalizeProductName(formatted)
                          ) {
                            setName(cleanedName);
                            manuallyEditedNameRef.current =
                              normalizeProductName(cleanedName);
                          }
                        }
                    }

                    setDetection(detected);

                    if (!detected) {
                      detectionTimeoutRef.current = null;
                      return;
                    }

                    if (!categoryLocked) {
                      setCategory(detected.category);
                    }

                    if (!subcategoryLocked) {
                      setSubcategory(
                        detected.subcategory
                      );
                    }

                    if (!unitLocked) {
                      const metadata = getSubcategoryMetadata(
                        detected.subcategory
                      );

                      if (metadata?.defaultUnit) {
                        setPackaging(metadata.defaultUnit);
                      }
                    }

                    detectionTimeoutRef.current = null;
                  }, 300);
                }}
              error={nameError}
            />

            {detection && detection.confidence !== "low" && (
              <View style={styles.detectionCard}>
                <View style={styles.detectionHeader}>
                  <Text style={styles.detectionTitle}>
                    ✨ Smart Detection
                  </Text>

                  <View
                    style={[
                      styles.confidenceBadge,
                      detection.confidence === "high" &&
                        styles.highConfidence,
                      detection.confidence === "medium" &&
                        styles.mediumConfidence,
                    ]}
                  >
                    <Text style={styles.confidenceText}>
                      {detection.confidence.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {brandDetection && (
                  <>
                    <View style={styles.detectionRow}>
                      <Text style={styles.detectionLabel}>
                        Brand
                      </Text>

                      <Text style={styles.detectionValue}>
                        {brandDetection.brand}
                      </Text>
                    </View>

                    <View style={styles.detectionRow}>
                      <Text style={styles.detectionLabel}>
                        Matched Alias
                      </Text>

                      <Text style={styles.detectionValue}>
                        {brandDetection.matchedAlias}
                      </Text>
                    </View>

                    {brandDetection?.productLine && (
                      <View style={styles.detectionRow}>
                        <Text style={styles.detectionLabel}>
                          Product Line
                        </Text>

                        <Text style={styles.detectionValue}>
                          {brandDetection.productLine}
                        </Text>
                      </View>
                    )}

                    <View style={styles.detectionRow}>
                      <Text style={styles.detectionLabel}>
                        Alias Type
                      </Text>

                      <Text style={styles.detectionValue}>
                        {brandDetection?.matchedAliasType
                          ?.replace(/-/g, " ")
                          .replace(/\b\w/g, c => c.toUpperCase()) ?? "-"}
                      </Text>
                    </View>

                    <View style={styles.detectionRow}>
                      <Text style={styles.detectionLabel}>
                        Match Type
                      </Text>

                      <Text style={styles.detectionValue}>
                        {brandDetection?.matchType
                          ?.replace(/-/g, " ")
                          .replace(/\b\w/g, c => c.toUpperCase()) ?? "-"}
                      </Text>
                    </View>

                    <View style={styles.detectionRow}>
                      <Text style={styles.detectionLabel}>
                        Brand Score
                      </Text>

                      <Text style={styles.detectionValue}>
                        {brandDetection
                          ? `${Math.round(brandDetection.score)}%`
                          : "-"}
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles.detectionRow}>
                  <Text style={styles.detectionLabel}>
                    Category
                  </Text>

                  <Text style={styles.detectionValue}>
                    {detection.category}
                  </Text>
                </View>

                <View style={styles.detectionRow}>
                  <Text style={styles.detectionLabel}>
                    Subcategory
                  </Text>

                  <Text style={styles.detectionValue}>
                    {detection.subcategory}
                  </Text>
                </View>

                <View style={styles.detectionRow}>
                  <Text style={styles.detectionLabel}>
                    Recommended Unit
                  </Text>

                  <Text style={styles.detectionValue}>
                    {getSubcategoryMetadata(
                      detection.subcategory
                    )?.defaultUnit ?? "None"}
                  </Text>
                </View>

                <View style={styles.detectionDivider} />

                <Text style={styles.detectionMatch}>
                  Matched “{detection.matchedTerm}” using{" "}
                  {detection.matchedBy === "shoppingAlias"
                    ? "shopping alias"
                    : detection.matchedBy === "productKeyword"
                      ? "product keyword"
                      : "subcategory name"}
                </Text>
              </View>
            )}

            <AppTextInput
              label="Brand"
              value={brand}
              onFocus={() => {
                setOpenDropdown(null);
              }}
              placeholder="Enter brand"
              autofillState={
                brandLocked
                  ? "locked"
                  : brandDetection
                    ? "auto"
                    : "manual"
              }
              autofillConfidence={
                brandLocked
                  ? undefined
                  : getBrandConfidence(
                      brandDetection?.score
                    )
              }
              onChangeText={(text) => {
                resetSaveStatus();

                const cleaned = text.replace(
                  /[^a-zA-Z0-9\s\-.'&()/]/g,
                  ""
                );

                setBrandLocked(true);
                setBrand(toTitleCase(cleaned));
              }}
            />

            <AppDropdown
              label="Category"
              selectedValue={category}
              autofillState={
                categoryLocked
                  ? "locked"
                  : detection
                    ? "auto"
                    : "manual"
              }
              autofillConfidence={
                categoryLocked
                  ? undefined
                  : detection?.confidence
              }
              items={sortedCategories}
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

                setCategoryLocked(true);
                setSubcategoryLocked(false);
                setUnitLocked(false);

                manuallyEditedNameRef.current =
                  normalizeProductName(name);

                setCategory(value);

                const nextSubcategories =
                  PRODUCT_SUBCATEGORIES[value] ?? [];

                const sortedNextSubcategories =
                  sortAlphabetically(
                    nextSubcategories,
                    subcategorySortDirection
                  );

                const firstSubcategory =
                  sortedNextSubcategories[0] ?? "";

                setSubcategory(firstSubcategory);

                if (firstSubcategory) {
                  const metadata =
                    getSubcategoryMetadata(firstSubcategory);

                  if (metadata?.defaultUnit) {
                    setPackaging(metadata.defaultUnit);
                  }
                }

                setOpenDropdown(null);
              }}
            />

            <AppDropdown
              label="Subcategory"
              selectedValue={subcategory}
              autofillState={
                subcategoryLocked
                  ? "locked"
                  : detection
                    ? "auto"
                    : "manual"
              }
              autofillConfidence={
                subcategoryLocked
                  ? undefined
                  : detection?.confidence
              }
              items={sortedSubcategories}
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

                setCategoryLocked(true);
                setSubcategoryLocked(true);
                setUnitLocked(false);

                manuallyEditedNameRef.current =
                  normalizeProductName(name);

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
              label="Packaging"
              selectedValue={packaging}
              items={PRODUCT_PACKAGING}
              searchable
              isOpen={openDropdown==="packaging"}
              onOpen={()=>setOpenDropdown("packaging")}
              onClose={()=>setOpenDropdown(null)}
              onValueChange={value=>{
                resetSaveStatus();
                setPackaging(value);
                setOpenDropdown(null);
              }}
            />

            <AppDropdown
              label="Measurement Unit"
              selectedValue={measurementUnit}
              items={MEASUREMENT_UNITS}
              searchable
              isOpen={openDropdown==="measurementUnit"}
              onOpen={()=>setOpenDropdown("measurementUnit")}
              onClose={()=>setOpenDropdown(null)}
              onValueChange={value=>{
                resetSaveStatus();
                setMeasurementUnit(value);
                setOpenDropdown(null);
              }}
            />

            {!shouldAddToCart&&(
              <AppDropdown
                label="Quantity Unit"
                selectedValue={quantityUnit}
                items={QUANTITY_UNITS}
                searchable
                isOpen={openDropdown==="quantityUnit"}
                onOpen={()=>setOpenDropdown("quantityUnit")}
                onClose={()=>setOpenDropdown(null)}
                onValueChange={value=>{
                  resetSaveStatus();
                  setQuantityUnit(value);
                  setOpenDropdown(null);
                }}
              />
            )}

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

  detectionCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },

  detectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  detectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  highConfidence: {
    backgroundColor: "#DFF5E3",
  },

  mediumConfidence: {
    backgroundColor: "#FFF3CD",
  },

  lowConfidence: {
    backgroundColor: "#FDE2E2",
  },

  confidenceText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text,
  },

  detectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  detectionLabel: {
    color: Colors.textLight,
    fontSize: 13,
  },

  detectionValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
  },

  detectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },

  detectionMatch: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textLight,
  },
});