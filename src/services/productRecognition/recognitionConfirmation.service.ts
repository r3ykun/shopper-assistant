import type{
  ExtractedProductMetadata,
  ProductImageInput,
}from "../../types/productRecognition.types";

export interface ProductConfirmationDraft{
  recognitionId:string;
  barcode:string;
  name:string;
  brand:string;
  productLine:string;
  variant:string;
  category:string;
  subcategory:string;
  measurement:string;
  measurementUnit:string;
  image?:ProductImageInput;
  matchedProductId?:number|string;
}

export interface ProductConfirmationErrors{
  barcode?:string;
  name?:string;
  category?:string;
  measurement?:string;
  measurementUnit?:string;
}

export interface ProductConfirmationValidation{
  valid:boolean;
  errors:ProductConfirmationErrors;
}

export interface CreateProductConfirmationDraftInput{
  recognitionId:string;
  metadata:ExtractedProductMetadata;
  image?:ProductImageInput;
  barcode?:string;
  matchedProductId?:number|string;
}

function text(value:string|undefined):string{
  return value?.trim()??"";
}

export function createProductConfirmationDraft(
  input:CreateProductConfirmationDraftInput,
):ProductConfirmationDraft{
  const measurement=input.metadata.measurement;
  return{
    recognitionId:input.recognitionId,
    barcode:text(input.barcode),
    name:text(input.metadata.productName),
    brand:text(input.metadata.brand?.name),
    productLine:text(input.metadata.productLine?.name),
    variant:text(input.metadata.variant?.name),
    category:text(input.metadata.category),
    subcategory:text(input.metadata.subcategory),
    measurement:measurement
      ?String(measurement.normalizedValue??measurement.value)
      :"",
    measurementUnit:measurement
      ?text(measurement.normalizedUnit??measurement.unit)
      :"",
    image:input.image,
    matchedProductId:input.matchedProductId,
  };
}

export function updateProductConfirmationDraft(
  draft:ProductConfirmationDraft,
  changes:Partial<ProductConfirmationDraft>,
):ProductConfirmationDraft{
  return{
    ...draft,
    ...changes,
    recognitionId:draft.recognitionId,
  };
}

export function validateProductConfirmationDraft(
  draft:ProductConfirmationDraft,
):ProductConfirmationValidation{
  const errors:ProductConfirmationErrors={};
  const measurement=draft.measurement.trim();
  if(!draft.barcode.trim()){
    errors.barcode="Barcode is required.";
  }else if(!/^\d{6,18}$/.test(draft.barcode.trim())){
    errors.barcode="Enter a valid barcode.";
  }
  if(!draft.name.trim()){
    errors.name="Product name is required.";
  }
  if(!draft.category.trim()){
    errors.category="Category is required.";
  }
  if(!measurement){
    errors.measurement="Measurement is required.";
  }else if(
    !Number.isFinite(Number(measurement))||
    Number(measurement)<=0
  ){
    errors.measurement="Enter a valid measurement.";
  }
  if(!draft.measurementUnit.trim()){
    errors.measurementUnit="Measurement unit is required.";
  }
  return{
    valid:Object.keys(errors).length===0,
    errors,
  };
}

export function sanitizeProductConfirmationDraft(
  draft:ProductConfirmationDraft,
):ProductConfirmationDraft{
  return{
    ...draft,
    barcode:draft.barcode.replace(/\D/g,"").trim(),
    name:draft.name.trim(),
    brand:draft.brand.trim(),
    productLine:draft.productLine.trim(),
    variant:draft.variant.trim(),
    category:draft.category.trim(),
    subcategory:draft.subcategory.trim(),
    measurement:draft.measurement.trim(),
    measurementUnit:draft.measurementUnit.trim(),
  };
}