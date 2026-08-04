import type{
  ConfirmedProductRecognition,
  DuplicateDetectionResult,
  ExtractedProductMetadata,
  ProductImageInput,
}from "../../types/productRecognition.types";

export type DuplicateResolutionAction=
  |"use-existing"
  |"update-existing"
  |"save-new";

export interface DuplicateResolutionInput{
  recognitionId:string;
  duplicate:DuplicateDetectionResult;
  metadata:ExtractedProductMetadata;
  action:DuplicateResolutionAction;
  barcode?:string;
  image?:ProductImageInput;
}

function requireText(value:string|undefined,field:string):string{
  const result=value?.trim();
  if(!result)throw new Error(`${field} is required.`);
  return result;
}

export function resolveDuplicate(
  input:DuplicateResolutionInput,
):ConfirmedProductRecognition{
  const candidate=input.duplicate.candidate;
  if(
    (input.action==="use-existing"||input.action==="update-existing")&&
    !candidate
  ){
    throw new Error("A duplicate candidate is required.");
  }
  if(input.action==="use-existing"&&candidate){
    return{
      recognitionId:input.recognitionId,
      barcode:candidate.barcode??input.barcode,
      brand:requireText(candidate.brand,"Brand"),
      productName:requireText(candidate.productName,"Product name"),
      productLine:candidate.productLine,
      variant:candidate.variant,
      measurement:candidate.measurement,
      category:requireText(candidate.category,"Category"),
      subcategory:candidate.subcategory,
      imageUri:input.image?.uri,
      matchedProductId:candidate.productId,
      saveMode:"use-existing",
    };
  }
  return{
    recognitionId:input.recognitionId,
    barcode:input.barcode??candidate?.barcode,
    brand:requireText(input.metadata.brand?.name,"Brand"),
    productName:requireText(input.metadata.productName,"Product name"),
    productLine:input.metadata.productLine?.name,
    variant:input.metadata.variant?.name,
    measurement:input.metadata.measurement,
    category:requireText(input.metadata.category,"Category"),
    subcategory:input.metadata.subcategory,
    imageUri:input.image?.uri,
    matchedProductId:input.action==="update-existing"
      ?candidate?.productId
      :undefined,
    saveMode:input.action,
  };
}