//shopper-assistant\src\types\BrandRecognitionResult.ts
import { ProductBrandMetadata } from "../constants/productBrandMetadata.types";

export interface ProductLineMatch {

  name: string;

  confidence: number;

  matchedText: string;

}

export interface BrandRecognitionResult {

  brand: ProductBrandMetadata;

  confidence: number;

  matchType: string;

  matchedText: string;

  productLine?: ProductLineMatch;

}