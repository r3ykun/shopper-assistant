//shopper-assistant\src\screens\Scanner\ScannerScreen.tsx
import React, { useEffect, useRef } from "react";
import{
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
}from "react-native";
import { useAudioPlayer } from "expo-audio";
import{
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
}from "expo-camera";
import type{ProductImageInput}from "../../types/productRecognition.types";
import{
  createProductConfirmationDraft,
  ProductRecognitionPipelineResult,
  cropProductImage,
  recognizeProductImage,
}from "../../services/productRecognition";
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
  useProductRecognitionStore,
  } from "../../stores";
import QuantitySelector from "../../components/forms/QuantitySelector";

export default function ScannerScreen() {
  const setPendingRecognition=
    useProductRecognitionStore(state=>state.setRecognition);

  const scanSound = useAudioPlayer(
    require("../../assets/sounds/scannerBeep.wav")  
  );

  scanSound.volume = 0.05;

  const [permission, requestPermission] =
    useCameraPermissions();

  const cameraRef=useRef<CameraView|null>(null);
  const[recognitionMode,setRecognitionMode]=
    React.useState(false);
  const[cameraReady,setCameraReady]=
    React.useState(false);
  const[capturingPhoto,setCapturingPhoto]=
    React.useState(false);
  const[capturedProductImage,setCapturedProductImage]=
    React.useState<ProductImageInput|null>(null);
  const[captureError,setCaptureError]=
    React.useState("");

  const[processingRecognition,setProcessingRecognition]=
    React.useState(false);
  const[recognitionError,setRecognitionError]=
    React.useState("");
  const[recognitionResult,setRecognitionResult]=
    React.useState<ProductRecognitionPipelineResult|null>(null);

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

  function openProductRecognition():void{
    resultAnimation.stopAnimation();
    resultAnimation.setValue(0);
    setShowResult(false);
    setProduct(null);
    setRecognitionMode(true);
    setCapturedProductImage(null);
    setRecognitionResult(null);
    setRecognitionError("");
    setCaptureError("");
    setCapturingPhoto(false);
    setProcessingRecognition(false);
  }

  function getRecognitionProducts(){
    return ProductService.getAllProducts().map(product=>({
      id:product.id,
      barcode:product.barcode,
      name:product.name,
      brand:product.brand,
      category:product.category,
      subcategory:product.subcategory,
      measurement:product.measurement,
      measurementUnit:product.measurementUnit,
    }));
  }

  function closeProductRecognition():void{
    setRecognitionMode(false);
    setCapturedProductImage(null);
    setCaptureError("");
    setCapturingPhoto(false);
    setRecognitionResult(null);
    setRecognitionError("");
    setProcessingRecognition(false);
    setProduct(null);
    setScanned(true);
    setShowResult(true);
    resultAnimation.setValue(1);
  }

  async function captureProductPhoto():Promise<void>{
    if(
      !cameraRef.current||
      !cameraReady||
      capturingPhoto
    )return;

    try{
      setCapturingPhoto(true);
      setCaptureError("");

      const picture=await cameraRef.current.takePictureAsync({
        quality:0.85,
      });

      if(!picture?.uri){
        throw new Error("The product photo could not be captured.");
      }

      const originalImage={
        uri:picture.uri,
        width:picture.width,
        height:picture.height,
        fileName:`product-${Date.now()}.jpg`,
        mimeType:"image/jpeg",
        source:"camera"as const,
      };
      const croppedImage=await cropProductImage(originalImage);
      setCapturedProductImage(croppedImage);
    }catch(error){
      setCaptureError(
        error instanceof Error
          ?error.message
          :"The product photo could not be captured.",
      );
    }finally{
      setCapturingPhoto(false);
    }
  }

  function retakeProductPhoto():void{
    setCapturedProductImage(null);
    setCaptureError("");
    setRecognitionResult(null);
    setRecognitionError("");
  }

  async function processCapturedProductPhoto():Promise<void>{
    if(!capturedProductImage||processingRecognition)return;
    const image=capturedProductImage;
    try{
      setProcessingRecognition(true);
      setRecognitionError("");
      setRecognitionResult(null);
      const result=await recognizeProductImage(
        image,
        getRecognitionProducts,
        {
          barcode:scannedBarcode,
          limit:5,
          minimumScore:20,
        },
      );
      setRecognitionResult(result);
      console.log("Product recognition result:",result);
    }catch(error){
      setRecognitionError(
        error instanceof Error
          ?error.message
          :"Product recognition failed.",
      );
    }finally{
      setProcessingRecognition(false);
    }
  }

  function reviewRecognizedProduct():void{
    if(!recognitionResult)return;
    const draft=createProductConfirmationDraft({
      recognitionId:recognitionResult.recognitionId,
      metadata:recognitionResult.metadata,
      image:recognitionResult.image,
      barcode:scannedBarcode,
      matchedProductId:
        recognitionResult.duplicate.candidate?.productId,
    });
    console.log(
      "Transferring OCR text:",
      recognitionResult.ocr.rawText,
    );
    setPendingRecognition(recognitionResult,draft);
    navigation.navigate("ProductForm",{
      barcode:scannedBarcode,
      addToCart:true,
    });
  }

  function handleBarcodeScanned(
    result:BarcodeScanningResult,
  ):void{
    if(scanned||recognitionMode)return;
    const barcode=result.data.trim();
    if(!barcode)return;

    if(pendingBarcode.current!==barcode){
      pendingBarcode.current=barcode;
      if(pendingBarcodeTimer.current){
        clearTimeout(pendingBarcodeTimer.current);
      }
      pendingBarcodeTimer.current=setTimeout(()=>{
        pendingBarcode.current=null;
        pendingBarcodeTimer.current=null;
      },700);
      return;
    }

    if(pendingBarcodeTimer.current){
      clearTimeout(pendingBarcodeTimer.current);
    }

    pendingBarcode.current=null;
    pendingBarcodeTimer.current=null;

    const foundProduct=
      ProductService.findByBarcode(barcode)??null;

    setScanned(true);
    setScannedBarcode(barcode);
    setProduct(foundProduct);
    setShowResult(true);
    setRecognitionMode(false);
    setCapturedProductImage(null);
    setRecognitionResult(null);
    setRecognitionError("");
    setCaptureError("");
    setQuantity("1");

    playScanSound();
    resultAnimation.stopAnimation();
    resultAnimation.setValue(0);

    Animated.timing(resultAnimation,{
      toValue:1,
      duration:300,
      easing:Easing.out(Easing.cubic),
      useNativeDriver:true,
    }).start();
  }

  function resetScanner() {
    scanLoop.current?.stop();
    setRecognitionResult(null);
    setRecognitionError("");
    setProcessingRecognition(false);

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

    setRecognitionMode(false);
    setCapturedProductImage(null);
    setCaptureError("");
    setCapturingPhoto(false);
    setCameraReady(false);
  }

  function resumeScanning():void{
    setRecognitionMode(false);
    setCapturedProductImage(null);
    setRecognitionResult(null);
    setRecognitionError("");
    setCaptureError("");
    setCapturingPhoto(false);
    setProcessingRecognition(false);
    Animated.timing(resultAnimation,{
      toValue:0,
      duration:220,
      easing:Easing.in(Easing.cubic),
      useNativeDriver:true,
    }).start(()=>{
      setScanned(false);
      setProduct(null);
      setShowResult(false);
      setScannedBarcode("");
      setCartMessage("");
      setCartMessageType("success");
      setQuantity("1");
      resultAnimation.setValue(0);
    });
  }

  function handleAddToCart(){
    if(!product)return;

    const selectedQuantity=Math.max(
      1,
      Math.floor(Number(quantity||1))
    );

    const storePrice=selectedStore
      ?StorePriceService.getPrice(
        selectedStore.id,
        product.id
      )
      :null;

    if(storePrice===null){
      setCartMessageType("error");
      setCartMessage(
        "No store price is available for this product."
      );
      return;
    }

    const shoppingListMatch=
      ShoppingListService.checkMatchingItemsWithQuantity(
        {
          id:product.id,
          name:product.name,
          brand:product.brand,
          category:product.category,
          subcategory:product.subcategory,
        },
        selectedQuantity
      );

    addItem({
      productId:product.id,
      barcode:product.barcode,
      name:product.name,
      brand:product.brand??"",
      category:
        product.category??
        "Uncategorized",
      packaging:product.packaging,
      measurement:product.measurement,
      measurementUnit:product.measurementUnit,
      productQuantity:product.quantity,
      quantityUnit:product.quantityUnit,
      srp:product.srp??0,
      price:storePrice,
      quantity:selectedQuantity,
      subtotal:
        storePrice*selectedQuantity,
    });

    setCartMessageType("success");

    setCartMessage(
      shoppingListMatch.consumedQuantity>0
        ?shoppingListMatch.remainingQuantity>0
          ?`${product.name} ×${selectedQuantity} added to cart. ${shoppingListMatch.remainingQuantity} still needed.`
          :`${product.name} ×${selectedQuantity} added to cart. Shopping-list item completed.`
        :`${product.name} ×${selectedQuantity} added to cart.`
    );

    setTimeout(()=>{
      setCartMessage("");
      resumeScanning();
    },700);
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        mode="picture"
        enableTorch={torchEnabled}
        onCameraReady={()=>setCameraReady(true)}
        onBarcodeScanned={
          recognitionMode||scanned
            ?undefined
            :handleBarcodeScanned
        }
      />

      {recognitionMode&&!capturedProductImage?(
        <View
          pointerEvents="none"
          style={styles.productCaptureGuide}
        >
          <View style={styles.productCaptureSquare}>
            <View style={styles.productCornerTL}/>
            <View style={styles.productCornerTR}/>
            <View style={styles.productCornerBL}/>
            <View style={styles.productCornerBR}/>
          </View>
          <Text style={styles.productCaptureGuideText}>
            Center the product inside the square
          </Text>
        </View>
      ):null}

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

      {showResult&&!recognitionMode?(
        <Animated.View
          pointerEvents="none"
          style={[
            styles.cameraDim,
            {
              opacity:resultAnimation.interpolate({
                inputRange:[0,1],
                outputRange:[0,0.35],
              }),
            },
          ]}
        />
      ):null}

      {!recognitionMode&&!showResult?(
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
        ):null}

        {recognitionMode?(
          <View
            style={[
              styles.productCaptureControls,
              {
                paddingBottom:Math.max(
                  insets.bottom,
                  16,
                ),
              },
            ]}
          >
            {capturedProductImage?(
              <>
                <Image
                  source={{uri:capturedProductImage.uri}}
                  style={styles.productCapturePreview}
                  resizeMode="cover"
                />

                <View style={styles.productCaptureActions}>
                  <TouchableOpacity
                    style={styles.productCaptureSecondaryButton}
                    disabled={processingRecognition}
                    onPress={retakeProductPhoto}
                  >
                    <Text style={styles.productCaptureSecondaryText}>
                      Retake
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.productCapturePrimaryButton,
                      processingRecognition&&
                        styles.productCaptureButtonDisabled,
                    ]}
                    disabled={processingRecognition}
                    onPress={processCapturedProductPhoto}
                  >
                    <Text style={styles.productCapturePrimaryText}>
                      {processingRecognition
                        ?"Processing..."
                        :recognitionResult
                          ?"Process Again"
                          :"Use Photo"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {recognitionError?(
                  <Text style={styles.productCaptureError}>
                    {recognitionError}
                  </Text>
                ):null}

                {recognitionResult?(
                  <View style={styles.recognitionResultCard}>
                    <Text style={styles.recognitionResultTitle}>
                      Recognition Result
                    </Text>

                    <Text style={styles.recognitionResultName}>
                      {recognitionResult.metadata.productName||
                        "Product name not detected"}
                    </Text>

                    <Text style={styles.recognitionResultText}>
                      Brand:{" "}
                      {recognitionResult.metadata.brand?.name??"-"}
                    </Text>

                    <Text style={styles.recognitionResultText}>
                      Measurement:{" "}
                      {recognitionResult.metadata.measurement
                        ?`${recognitionResult.metadata.measurement.value} ${recognitionResult.metadata.measurement.unit}`
                        :"-"}
                    </Text>

                    <Text style={styles.recognitionResultText}>
                      Category:{" "}
                      {[
                        recognitionResult.metadata.category,
                        recognitionResult.metadata.subcategory,
                      ].filter(Boolean).join(" • ")||"-"}
                    </Text>

                    <Text style={styles.recognitionResultText}>
                      Confidence:{" "}
                      {Math.round(
                        recognitionResult.metadata.confidence.overall.score*100,
                      )}%
                    </Text>

                    <TouchableOpacity
                      style={styles.reviewRecognitionButton}
                      onPress={reviewRecognizedProduct}
                    >
                      <Text style={styles.reviewRecognitionButtonText}>
                        Review and Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                ):null}
              </>
            ):(
              <>
                {captureError?(
                  <Text style={styles.productCaptureError}>
                    {captureError}
                  </Text>
                ):null}

                <TouchableOpacity
                  style={[
                    styles.captureButton,
                    (!cameraReady||capturingPhoto)&&
                      styles.captureButtonDisabled,
                  ]}
                  disabled={!cameraReady||capturingPhoto}
                  onPress={captureProductPhoto}
                >
                  <View style={styles.captureButtonInner}/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelCaptureButton}
                  disabled={capturingPhoto}
                  onPress={closeProductRecognition}
                >
                  <Text style={styles.cancelCaptureText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ):null}

        {showResult&&product&&!recognitionMode?(
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
              {[
                product.packaging,
                product.measurement !== undefined
                  ? `${product.measurement} ${product.measurementUnit ?? ""}`.trim()
                  : undefined,
                product.quantity !== undefined &&
                product.quantity > 1
                  ? `${product.quantity} ${product.quantityUnit ?? ""}`.trim()
                  : undefined,
              ]
                .filter(Boolean)
                .join(" • ")}
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
        ):null}

        {showResult&&!product&&!recognitionMode?(
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
              title="Recognize Product"
              onPress={openProductRecognition}
            />

            <PrimaryButton
              title="Scan Again"
              onPress={resumeScanning}
            />
          </Animated.View>
        ):null}
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

recognitionModeButton:{
  position:"absolute",
  alignSelf:"center",
  paddingHorizontal:16,
  paddingVertical:10,
  borderRadius:20,
  backgroundColor:"rgba(0,0,0,0.65)",
  zIndex:20,
},
recognitionModeText:{
  color:"#FFFFFF",
  fontSize:14,
  fontWeight:"700",
},
productCaptureControls:{
  position:"absolute",
  left:0,
  right:0,
  bottom:0,
  alignItems:"center",
  paddingHorizontal:20,
  paddingTop:14,
  backgroundColor:"transparent",
  zIndex:30,
  elevation:0,
},
productCapturePreview:{
  width:280,
  height:280,
  borderRadius:16,
  backgroundColor:"#111111",
},
productCaptureGuide:{
  position:"absolute",
  left:0,
  right:0,
  top:0,
  bottom:110,
  justifyContent:"center",
  alignItems:"center",
  zIndex:20,
  backgroundColor:"transparent",
},
productCaptureSquare:{
  width:290,
  height:290,
  position:"relative",
},
productCaptureGuideText:{
  marginTop:18,
  paddingHorizontal:12,
  paddingVertical:6,
  borderRadius:8,
  overflow:"hidden",
  color:"#FFFFFF",
  fontSize:15,
  fontWeight:"700",
  textAlign:"center",
  textShadowColor:"#000000",
  textShadowOffset:{width:0,height:1},
  textShadowRadius:4,
  backgroundColor:"transparent",
},
productCornerTL:{
  position:"absolute",
  top:0,
  left:0,
  width:45,
  height:45,
  borderTopWidth:5,
  borderLeftWidth:5,
  borderColor:"#FFFFFF",
},
productCornerTR:{
  position:"absolute",
  top:0,
  right:0,
  width:45,
  height:45,
  borderTopWidth:5,
  borderRightWidth:5,
  borderColor:"#FFFFFF",
},
productCornerBL:{
  position:"absolute",
  bottom:0,
  left:0,
  width:45,
  height:45,
  borderBottomWidth:5,
  borderLeftWidth:5,
  borderColor:"#FFFFFF",
},
productCornerBR:{
  position:"absolute",
  right:0,
  bottom:0,
  width:45,
  height:45,
  borderRightWidth:5,
  borderBottomWidth:5,
  borderColor:"#FFFFFF",
},
productCaptureTitle:{
  marginTop:12,
  color:"#FFFFFF",
  fontSize:18,
  fontWeight:"700",
  textAlign:"center",
},
productCaptureInstruction:{
  marginTop:6,
  marginBottom:18,
  color:"#DDDDDD",
  fontSize:14,
  textAlign:"center",
},
productCaptureError:{
  marginBottom:12,
  color:"#FFB4B4",
  fontSize:14,
  textAlign:"center",
},
productCaptureActions:{
  width:"100%",
  flexDirection:"row",
  gap:12,
  marginTop:16,
},
productCapturePrimaryButton:{
  flex:1,
  alignItems:"center",
  paddingVertical:14,
  borderRadius:10,
  backgroundColor:"#FFFFFF",
},
productCapturePrimaryText:{
  color:"#111111",
  fontWeight:"700",
},
productCaptureSecondaryButton:{
  flex:1,
  alignItems:"center",
  paddingVertical:14,
  borderRadius:10,
  borderWidth:1,
  borderColor:"#FFFFFF",
},
productCaptureSecondaryText:{
  color:"#FFFFFF",
  fontWeight:"700",
},
captureButton:{
  width:72,
  height:72,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:36,
  borderWidth:4,
  borderColor:"#FFFFFF",
  backgroundColor:"transparent",
},
captureButtonDisabled:{
  opacity:0.45,
},
captureButtonInner:{
  width:56,
  height:56,
  borderRadius:28,
  backgroundColor:"#FFFFFF",
},
cancelCaptureButton:{
  marginTop:16,
  paddingHorizontal:24,
  paddingVertical:10,
},
cancelCaptureText:{
  color:"#FFFFFF",
  fontSize:15,
  fontWeight:"600",
},
productCaptureButtonDisabled:{
  opacity:0.5,
},
recognitionResultCard:{
  width:"100%",
  marginTop:16,
  padding:14,
  borderRadius:12,
  backgroundColor:"rgb(48, 48, 48)",
},
recognitionResultTitle:{
  color:"#FFFFFF",
  fontSize:13,
  fontWeight:"700",
  textTransform:"uppercase",
},
recognitionResultName:{
  marginTop:8,
  color:"#FFFFFF",
  fontSize:18,
  fontWeight:"700",
},
recognitionResultText:{
  marginTop:5,
  color:"#DDDDDD",
  fontSize:14,
},
reviewRecognitionButton:{
  marginTop:14,
  alignItems:"center",
  paddingVertical:12,
  borderRadius:10,
  backgroundColor:"#FFFFFF",
},
reviewRecognitionButtonText:{
  color:"#111111",
  fontWeight:"700",
},
});