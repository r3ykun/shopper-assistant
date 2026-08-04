import{Directory,File,Paths}from "expo-file-system";
import type{ProductImageInput}from "../../types/productRecognition.types";
import type{
  ProductImageSource,
  ProductImageType,
}from "../../types/productImage.types";

export interface SaveProductImageInput{
  sourceUri:string;
  productId?:number|string;
  recognitionId?:string;
  type:ProductImageType;
  source:ProductImageSource;
  fileName?:string;
  mimeType?:string;
  width?:number;
  height?:number;
}

export interface SavedProductImage{
  uri:string;
  fileName:string;
  mimeType:string;
  width?:number;
  height?:number;
}

const PRODUCT_IMAGES_DIRECTORY=
  new Directory(Paths.document,"product-images");

function sanitize(value:string):string{
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g,"-")
    .replace(/^-+|-+$/g,"");
}

function getExtension(
  sourceUri:string,
  mimeType?:string,
  fileName?:string,
):string{
  const nameExtension=fileName
    ?.split(".")
    .pop()
    ?.toLowerCase();

  if(nameExtension&&nameExtension!==fileName?.toLowerCase()){
    return nameExtension;
  }

  const cleanUri=sourceUri.split("?")[0];
  const uriExtension=cleanUri
    .split(".")
    .pop()
    ?.toLowerCase();

  if(
    uriExtension&&
    ["jpg","jpeg","png","webp","heic"].includes(uriExtension)
  ){
    return uriExtension;
  }

  const mimeExtensions:Record<string,string>={
    "image/jpeg":"jpg",
    "image/jpg":"jpg",
    "image/png":"png",
    "image/webp":"webp",
    "image/heic":"heic",
  };

  return mimeExtensions[mimeType??""]??"jpg";
}

function getMimeType(extension:string,mimeType?:string):string{
  if(mimeType)return mimeType;

  const mimeTypes:Record<string,string>={
    jpg:"image/jpeg",
    jpeg:"image/jpeg",
    png:"image/png",
    webp:"image/webp",
    heic:"image/heic",
  };

  return mimeTypes[extension]??"image/jpeg";
}

function createFileName(
  input:SaveProductImageInput,
  extension:string,
):string{
  const owner=input.productId!==undefined
    ?`product-${sanitize(String(input.productId))}`
    :input.recognitionId
      ?`recognition-${sanitize(input.recognitionId)}`
      :"unassigned";

  const type=sanitize(input.type);
  const unique=`${Date.now()}-${Math.random()
    .toString(36)
    .slice(2,10)}`;

  return`${owner}-${type}-${unique}.${extension}`;
}

function ensureRootDirectory():void{
  PRODUCT_IMAGES_DIRECTORY.create({
    idempotent:true,
    intermediates:true,
  });
}

export async function saveProductImage(
  input:SaveProductImageInput,
):Promise<SavedProductImage>{
  const sourceUri=input.sourceUri.trim();

  if(!sourceUri){
    throw new Error("Product image source URI is required.");
  }

  ensureRootDirectory();

  const extension=getExtension(
    sourceUri,
    input.mimeType,
    input.fileName,
  );

  const fileName=createFileName(input,extension);
  const sourceFile=new File(sourceUri);
  const destinationFile=new File(
    PRODUCT_IMAGES_DIRECTORY,
    fileName,
  );

  if(!sourceFile.exists){
    throw new Error("Product image source file was not found.");
  }

  await sourceFile.copy(destinationFile,{
    overwrite:false,
  });

  return{
    uri:destinationFile.uri,
    fileName,
    mimeType:getMimeType(extension,input.mimeType),
    width:input.width,
    height:input.height,
  };
}

export function deleteStoredProductImage(uri:string):boolean{
  const file=new File(uri);

  if(!file.exists)return false;

  file.delete();
  return true;
}

export function storedProductImageExists(uri:string):boolean{
  return new File(uri).exists;
}

export function getProductImagesDirectoryUri():string{
  ensureRootDirectory();
  return PRODUCT_IMAGES_DIRECTORY.uri;
}

export function toProductImageInput(
  saved:SavedProductImage,
  source:"camera"|"gallery",
):ProductImageInput{
  return{
    uri:saved.uri,
    width:saved.width,
    height:saved.height,
    fileName:saved.fileName,
    mimeType:saved.mimeType,
    source,
  };
}