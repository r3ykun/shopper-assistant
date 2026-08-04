import type{
  DuplicateDetectionResult,
  ExtractedProductMetadata,
  ProductImageInput,
  ProductMatchCandidate,
  ProductOcrResult,
  ProductRecognitionResult,
}from"../../types/productRecognition.types";
import{detectDuplicate}from "./duplicateDetection.service";
import{
  matchDatabaseProducts,
  type DatabaseProduct,
  type DatabaseProductMatchingOptions,
  type ProductDatabaseProvider,
}from "./databaseProductMatching.service";
import{extractProductMetadata}from "./metadataExtraction.service";
import{productOcrService}from "./productOcr.instance";

export interface ProductRecognitionPipelineOptions
  extends DatabaseProductMatchingOptions{
  barcode?:string;
}

export interface ProductRecognitionPipelineResult{
  recognitionId:string;
  image:ProductImageInput;
  ocr:ProductOcrResult;
  metadata:ExtractedProductMetadata;
  matches:ProductMatchCandidate[];
  duplicate:DuplicateDetectionResult;
  result:ProductRecognitionResult;
}

function createRecognitionId():string{
  return`recognition-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;
}

export async function recognizeProductImage(
  image:ProductImageInput,
  getProducts:ProductDatabaseProvider,
  options?:ProductRecognitionPipelineOptions,
):Promise<ProductRecognitionPipelineResult>{
  const recognitionId=createRecognitionId();
  const ocr=await productOcrService.recognize(image);
  const metadata=extractProductMetadata(ocr);
  const matches=matchDatabaseProducts(
    metadata,
    getProducts,
    {
      barcode:options?.barcode,
      limit:options?.limit??5,
      minimumScore:options?.minimumScore??20,
    },
  );
  const duplicate=detectDuplicate(
    metadata,
    matches,
    options?.barcode,
  );
  const result:ProductRecognitionResult={
    id:recognitionId,
    source:image.source,
    status:"completed",
    startedAt:new Date().toISOString(),
    image,
    ocr,
    metadata,
    matches,
    duplicate,
  };
    return{
        recognitionId,
        image,
        ocr,
        metadata,
        matches,
        duplicate,
        result,
        };
}

export function toDatabaseProducts(
  products:DatabaseProduct[],
):DatabaseProduct[]{
  return products;
}