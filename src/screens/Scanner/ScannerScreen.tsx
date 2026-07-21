import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";

import { useAudioPlayer } from "expo-audio";

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import PrimaryButton from "../../components/buttons/PrimaryButton";
import { ProductService, StorePriceService, ShoppingListService } from "../../services";
import {
  RouteProp,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootStack";
import { Product } from "../../database/entities/Product";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { 
  useCartStore, 
  useStoreStore,
  useScannerFeedbackStore,
  } from "../../stores";
import QuantitySelector from "../../components/forms/QuantitySelector";

export default function ScannerScreen() {

  const scanSound = useAudioPlayer(
    require("../../assets/sounds/scannerBeep.wav")  
  );

  scanSound.volume = 0.05;

  const [permission, requestPermission] =
    useCameraPermissions();

  const addItem = useCartStore(
    state => state.addItem
  );

  const [scanned, setScanned] =
    React.useState(false);

  const [product, setProduct] =
    React.useState<Product | null>(null);

  const [showResult, setShowResult] =
    React.useState(false);

  const [scannedBarcode, setScannedBarcode] =
    React.useState("");

  const scanLine = useRef(
    new Animated.Value(0)
  ).current;

  const resultAnimation = useRef(
    new Animated.Value(0)
  ).current;

  const scanLoop = useRef<
    Animated.CompositeAnimation | null
  >(null);

  const scannerFeedback =
    useScannerFeedbackStore(
      state => state.message
    );

  const clearScannerFeedback =
    useScannerFeedbackStore(
      state => state.clearFeedback
    );

  const pendingBarcode = useRef<string | null>(
    null
  );

  const pendingBarcodeTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  type ScannerNavigationProp =
    NativeStackNavigationProp<
      RootStackParamList,
      "Scanner"
    >;

  const navigation =
    useNavigation<ScannerNavigationProp>();  

    const route =
    useRoute<
      RouteProp<
        RootStackParamList,
        "Scanner"
      >
    >();

  const [torchEnabled, setTorchEnabled] =
    React.useState(false);

  const insets = useSafeAreaInsets();

  const [cartMessage, setCartMessage] =
    React.useState("");

  const [cartMessageType, setCartMessageType] =
    React.useState<"success" | "error">(
      "success"
    );

  const [quantity, setQuantity] =
    React.useState("1");

  const { selectedStore } =
    useStoreStore();

  useEffect(() => {
    if (showResult) {
      scanLoop.current?.stop();
      return;
    }

    scanLine.setValue(0);

    scanLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 180,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    scanLoop.current.start();

    return () => {
      scanLoop.current?.stop();
    };
  }, [showResult, scanLine]);

  // ← ADD STEP 6 HERE
  useEffect(() => {
    if (!scannerFeedback) {
      return;
    }

    const timer = setTimeout(() => {
      clearScannerFeedback();
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [
    scannerFeedback,
    clearScannerFeedback,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetScanner();
      };
    }, [])
  );

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required.
        </Text>

        <PrimaryButton
          title="Allow Camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  function playScanSound() {
      try {
          scanSound.seekTo(0);
          scanSound.play();
      } catch (error) {
          console.error(error);
      }
  }

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (scanned) return;

    const barcode = result.data.trim();

    if (!barcode) return;

    if (pendingBarcode.current !== barcode) {
      pendingBarcode.current = barcode;

      if (pendingBarcodeTimer.current) {
        clearTimeout(
          pendingBarcodeTimer.current
        );
      }

      pendingBarcodeTimer.current =
        setTimeout(() => {
          pendingBarcode.current = null;
        }, 700);

      return;
    }

    if (pendingBarcodeTimer.current) {
      clearTimeout(
        pendingBarcodeTimer.current
      );
    }

    pendingBarcode.current = null;
    pendingBarcodeTimer.current = null;

    setScanned(true);
    playScanSound();
    setScannedBarcode(barcode);

    const foundProduct =
      ProductService.findByBarcode(barcode);

    setProduct(foundProduct);
    setShowResult(true);
    setQuantity("1");

    resultAnimation.setValue(0);

    Animated.timing(resultAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }

  function resetScanner() {
    scanLoop.current?.stop();

    if (pendingBarcodeTimer.current) {
      clearTimeout(
        pendingBarcodeTimer.current
      );
    }

    pendingBarcode.current = null;
    pendingBarcodeTimer.current = null;

    setScanned(false);
    setProduct(null);
    setShowResult(false);
    setScannedBarcode("");
    setCartMessage("");
    setCartMessageType("success");
    setQuantity("1");

    setTorchEnabled(false);

    scanLine.setValue(0);
    resultAnimation.setValue(0);
  }

  function resumeScanning() {
    Animated.timing(resultAnimation, {
      toValue: 0,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setScanned(false);
      setProduct(null);
      setShowResult(false);
      setScannedBarcode("");
      setCartMessage("");
      setCartMessageType("success");
      setQuantity("1");
    });
  }

  function handleAddToCart() {
    if (!product) return;

    const selectedQuantity =
      Math.max(
        1,
        Number(quantity || 1)
      );

    const storePrice =
      selectedStore
        ? StorePriceService.getPrice(
            selectedStore.id,
            product.id
          )
        : null;
    
    if (storePrice === null) {
      setCartMessageType("error");

      setCartMessage(
        "No store price is available for this product."
      );

      return;
    }

    const price = storePrice;

  addItem({
    productId: product.id,
    barcode: product.barcode,
    name: product.name,
    brand: product.brand ?? "",
    category:
      product.category ??
      "Uncategorized",
    unit: product.unit,
    srp: product.srp ?? 0,
    price,
    quantity: selectedQuantity,
    subtotal:
      price * selectedQuantity,
  });

  const checkedItems =
    ShoppingListService.checkMatchingItems({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
    });

  setCartMessageType("success");

  const message =
    checkedItems > 0
      ? `${product.name} ×${selectedQuantity} added to cart. ${checkedItems} shopping list item(s) checked.`
      : `${product.name} ×${selectedQuantity} added to cart.`;

  setCartMessage(message);

    setTimeout(() => {
      setCartMessage("");
      resumeScanning();
    }, 700);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={torchEnabled}
        onBarcodeScanned={
          scanned
            ? undefined
            : handleBarcodeScanned
        }
      />

      <TouchableOpacity
        style={[
          styles.scannerBackButton,
          {
            top: insets.top + 12,
          },
        ]}
        onPress={() => {
          resetScanner();
          navigation.goBack();
        }}
      >
        <Text style={styles.scannerBackIcon}>
          ‹
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.torchButton,
          {
            top: insets.top + 12,
          },
        ]}
        onPress={() =>
          setTorchEnabled(prev => !prev)
        }
      >
        <Text style={styles.torchIcon}>
          {torchEnabled ? "💡" : "🔦"}
        </Text>
      </TouchableOpacity>

      {scannerFeedback ? (
        <View
          style={[
            styles.scannerFeedback,
            {
              top: insets.top + 70,
            },
          ]}
        >
          <Text style={styles.scannerFeedbackText}>
            ✓ {scannerFeedback}
          </Text>
        </View>
      ) : null}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.cameraDim,
          {
            opacity: resultAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.35],
            }),
          },
        ]}
      />

      <View style={styles.overlay}>

        <View style={styles.topShade} />

        <View style={styles.middleRow}>

          <View style={styles.sideShade} />

          <View style={styles.scanBox}>

            <Animated.View
              style={[
                styles.scanLine,
                {
                  opacity: resultAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                  transform: [
                    {
                      translateY: scanLine,
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: resultAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.2],
                  }),
                },
              ]}
            >
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </Animated.View>

          </View>

          <View style={styles.sideShade} />

        </View>

        <View style={styles.bottomShade}>
          {!showResult && (
            <Text style={styles.instruction}>
              Align the barcode inside the frame
            </Text>
          )}
        </View>

      </View>

        {showResult && product && (
          <Animated.View
            style={[
              styles.resultPanel,
              {
                bottom: insets.bottom,
                paddingBottom: 24,
                opacity: resultAnimation,
                transform: [
                  {
                    translateY: resultAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [280, 0],
                    }),
                  },
                ],
              },
            ]}
          >

            <Text style={styles.productName}>
              {product.name}
            </Text>

            <Text style={styles.productInfo}>
              Brand: {product.brand || "-"}
            </Text>

            <Text style={styles.productInfo}>
              Barcode: {product.barcode}
            </Text>

            <Text style={styles.productInfo}>
              {product.measurement} {product.unit}
            </Text>

            <Text style={styles.productInfo}>
              Store Price:{" "}
              {selectedStore
                ? (() => {
                    const price =
                      StorePriceService.getPrice(
                        selectedStore.id,
                        product.id
                      );

                    return price !== null
                      ? `₱${price.toFixed(2)}`
                      : "—";
                  })()
                : "—"}
            </Text>

            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
            />

            {cartMessage ? (
              <Text
                style={[
                  styles.cartMessage,
                  cartMessageType === "error"
                    ? styles.cartErrorMessage
                    : styles.cartSuccessMessage,
                ]}
              >
                {cartMessageType === "error"
                  ? "✕"
                  : "✓"}{" "}
                {cartMessage}
              </Text>
            ) : null}

            <PrimaryButton
              title="Add to Cart"
              onPress={handleAddToCart}
            />

            <PrimaryButton
              title="Continue Scanning"
              onPress={resumeScanning}
            />

          </Animated.View>
        )}

        {showResult && !product && (
          <Animated.View
            style={[
              styles.resultPanel,
              {
                bottom: insets.bottom,
                paddingBottom: 24,
                opacity: resultAnimation,
                transform: [
                  {
                    translateY: resultAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [280, 0],
                    }),
                  },
                ],
              },
            ]}
          >

            <Text style={styles.resultTitle}>
              Product Not Found
            </Text>

            <Text style={styles.unknownMessage}>
              No registered product was found for barcode:
            </Text>

            <Text style={styles.unknownBarcode}>
              {scannedBarcode}
            </Text>

            <PrimaryButton
              title="Add This Product"
              onPress={() => {
                const barcodeToAdd =
                  scannedBarcode;

                resetScanner();

                navigation.navigate(
                  "ProductForm",
                  {
                    barcode: barcodeToAdd,
                    addToCart: true,
                  }
                );
              }}
            />

            <PrimaryButton
              title="Scan Again"
              onPress={resumeScanning}
            />
          </Animated.View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  text: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },

  container: {
  flex: 1,
},

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFill,

  },

  topShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  middleRow: {
    flexDirection: "row",
    height: 220,
  },

  sideShade: {
    flex: 1,
  },

  scanBox: {
    width: 300,
    height: 220,
    position: "relative",
  },

  bottomShade: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  instruction: {
    marginTop: 24,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#00FF66",
  },

  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 35,
    height: 35,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: "#00FF66",
  },

  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#00FF66",
  },

  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "#00FF66",
  },

  scanLine: {
    position: "absolute",
    top: 20,
    left: 15,
    right: 15,
    height: 3,
    backgroundColor: "#00FF66",
    borderRadius: 2,
  },

  cameraDim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
  },

  resultPanel: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
  },

  resultTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },

  productName: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: "bold",
  },

  productInfo: {
    fontSize: 16,
    marginBottom: 8,
  },

  unknownMessage: {
    marginBottom: 8,
    fontSize: 16,
    color: "#555",
  },

  unknownBarcode: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "700",
  },

  cartMessage: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "600",
  },

  cartSuccessMessage: {
    borderColor: "#81C784",
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },

  cartErrorMessage: {
    borderColor: "#EF9A9A",
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },

  scannerBackButton: {
  position: "absolute",
  left: 16,
  zIndex: 20,
  width: 46,
  height: 46,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 23,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
},

scannerBackIcon: {
  marginTop: -4,
  fontSize: 40,
  lineHeight: 42,
  color: "white",
},

torchButton: {
  position: "absolute",
  right: 16,
  zIndex: 20,

  width: 46,
  height: 46,

  justifyContent: "center",
  alignItems: "center",

  borderRadius: 23,

  backgroundColor: "rgba(0,0,0,0.55)",
},

torchIcon: {
  fontSize: 22,
},

scannerFeedback: {
  position: "absolute",
  left: 20,
  right: 20,
  zIndex: 30,

  paddingHorizontal: 16,
  paddingVertical: 13,

  borderWidth: 1,
  borderColor: "#81C784",
  borderRadius: 12,

  backgroundColor: "#E8F5E9",

  elevation: 8,
},

scannerFeedbackText: {
  textAlign: "center",
  fontSize: 15,
  fontWeight: "700",
  color: "#2E7D32",
},
});