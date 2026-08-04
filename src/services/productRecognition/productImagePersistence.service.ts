import type{
  ProductImage,
  ProductImageSource,
  ProductImageType,
}from "../../types/productImage.types";
import{
  deleteStoredProductImage,
  saveProductImage,
}from "./productImageStorage.service";
import{
  sqliteProductImageRepository,
}from "./sqliteProductImage.repository";

export interface PersistProductImageInput{
  sourceUri:string;
  productId?:number|string;
  recognitionId?:string;
  type:ProductImageType;
  source:ProductImageSource;
  isPrimary?:boolean;
  fileName?:string;
  mimeType?:string;
  width?:number;
  height?:number;
}

export async function persistProductImage(
  input:PersistProductImageInput,
):Promise<ProductImage>{
  const saved=await saveProductImage({
    sourceUri:input.sourceUri,
    productId:input.productId,
    recognitionId:input.recognitionId,
    type:input.type,
    source:input.source,
    fileName:input.fileName,
    mimeType:input.mimeType,
    width:input.width,
    height:input.height,
  });

  try{
    return sqliteProductImageRepository.create({
      productId:input.productId,
      recognitionId:input.recognitionId,
      uri:saved.uri,
      type:input.type,
      source:input.source,
      isPrimary:input.isPrimary,
      width:saved.width,
      height:saved.height,
      mimeType:saved.mimeType,
      fileName:saved.fileName,
    });
  }catch(error){
    deleteStoredProductImage(saved.uri);
    throw error;
  }
}

export function deletePersistedProductImage(id:string):boolean{
  const image=sqliteProductImageRepository.getById(id);

  if(!image)return false;

  sqliteProductImageRepository.delete(id);
  deleteStoredProductImage(image.uri);

  return true;
}

export async function replacePersistedProductImage(
  id:string,
  input:Omit<
    PersistProductImageInput,
    "productId"|"recognitionId"|"isPrimary"
  >,
):Promise<ProductImage>{
  const existing=sqliteProductImageRepository.getById(id);

  if(!existing){
    throw new Error("Product image was not found.");
  }

  const saved=await saveProductImage({
    ...input,
    productId:existing.productId,
    recognitionId:existing.recognitionId,
  });

  try{
    const updated=sqliteProductImageRepository.update({
      id,
      uri:saved.uri,
      type:input.type,
      width:saved.width,
      height:saved.height,
      mimeType:saved.mimeType,
      fileName:saved.fileName,
    });

    deleteStoredProductImage(existing.uri);

    return updated;
  }catch(error){
    deleteStoredProductImage(saved.uri);
    throw error;
  }
}