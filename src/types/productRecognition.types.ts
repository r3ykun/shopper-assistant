export type RecognitionSource="barcode"|"camera"|"gallery"|"manual";
export type RecognitionStatus="idle"|"capturing"|"processing"|"reviewing"|"completed"|"failed";
export type RecognitionConfidenceLevel="high"|"medium"|"low"|"unknown";

export interface RecognitionConfidence{
  score:number;
  level:RecognitionConfidenceLevel;
}

export interface ProductMeasurement{
  value:number;
  unit:string;
  rawText:string;
  normalizedValue?:number;
  normalizedUnit?:string;
}

export interface OcrTextBlock{
  id:string;
  text:string;
  normalizedText:string;
  confidence?:number;
  boundingBox?:OcrBoundingBox;
}

export interface OcrBoundingBox{
  x:number;
  y:number;
  width:number;
  height:number;
}

export interface ProductImageInput{
  uri:string;
  width?:number;
  height?:number;
  fileName?:string;
  mimeType?:string;
  source:"camera"|"gallery";
}

export interface ProductOcrResult{
  image:ProductImageInput;
  rawText:string;
  normalizedText:string;
  blocks:OcrTextBlock[];
  processingTimeMs:number;
}

export interface RecognizedBrand{
  id?:string;
  name:string;
  matchedText:string;
  alias?:string;
  confidence:RecognitionConfidence;
}

export interface RecognizedProductLine{
  name:string;
  matchedText:string;
  confidence:RecognitionConfidence;
}

export interface RecognizedVariant{
  name:string;
  matchedText:string;
  confidence:RecognitionConfidence;
}

export interface ExtractedProductMetadata{
  brand?:RecognizedBrand;
  productName?:string;
  productLine?:RecognizedProductLine;
  variant?:RecognizedVariant;
  flavor?:string;
  measurement?:ProductMeasurement;
  category?:string;
  subcategory?:string;
  rawText:string;
  normalizedText:string;
  textBlocks:OcrTextBlock[];
  confidence:{
    overall:RecognitionConfidence;
    productName:RecognitionConfidence;
    measurement:RecognitionConfidence;
    category:RecognitionConfidence;
  };
}

export interface ProductMatchReason{
  field:"barcode"|"brand"|"productName"|"productLine"|"variant"|"measurement"|"category"|"subcategory";
  score:number;
  description:string;
}

export interface ProductMatchCandidate{
  productId:number|string;
  barcode?:string;
  brand?:string;
  productName:string;
  productLine?:string;
  variant?:string;
  measurement?:ProductMeasurement;
  category?:string;
  subcategory?:string;
  score:number;
  reasons:ProductMatchReason[];
}

export type DuplicateRisk="exact"|"high"|"possible"|"none";

export interface DuplicateDetectionResult{
  risk:DuplicateRisk;
  score:number;
  candidate?:ProductMatchCandidate;
  reasons:string[];
}

export interface ProductRecognitionResult{
  id:string;
  source:RecognitionSource;
  status:RecognitionStatus;
  barcode?:string;
  image?:ProductImageInput;
  ocr?:ProductOcrResult;
  metadata?:ExtractedProductMetadata;
  matches:ProductMatchCandidate[];
  duplicate?:DuplicateDetectionResult;
  error?:string;
  startedAt:string;
  completedAt?:string;
}

export interface ConfirmedProductRecognition{
  recognitionId:string;
  barcode?:string;
  brand:string;
  productName:string;
  productLine?:string;
  variant?:string;
  measurement?:ProductMeasurement;
  category:string;
  subcategory?:string;
  imageUri?:string;
  matchedProductId?:number|string;
  saveMode:"use-existing"|"update-existing"|"save-new";
}

export interface ProductRecognitionCorrection{
  field:string;
  original:string;
  corrected:string;
}

export interface ProductRecognitionCorrectionLog{
  recognitionId:string;
  createdAt:string;
  corrections:ProductRecognitionCorrection[];
}