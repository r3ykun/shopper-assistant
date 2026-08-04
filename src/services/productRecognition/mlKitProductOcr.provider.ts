import TextRecognition from "@react-native-ml-kit/text-recognition";

export async function mlKitProductOcrRecognizer(imageUri:string){
  return TextRecognition.recognize(imageUri);
}