import type{
  OcrTextBlock,
  ProductImageInput,
  ProductOcrResult,
}from "../../types/productRecognition.types";

export interface ProductOcrProvider{
  recognize(image:ProductImageInput):Promise<ProductOcrResult>;
}

export interface NativeOcrBlock{
  text:string;
  confidence?:number;
  boundingBox?:{
    x:number;
    y:number;
    width:number;
    height:number;
  };
}

export interface NativeOcrResponse{
  text:string;
  blocks?:NativeOcrBlock[];
}

export type NativeOcrRecognizer=(imageUri:string)=>Promise<NativeOcrResponse>;

function createId(index:number):string{
  return `ocr-block-${Date.now()}-${index}`;
}

export function normalizeOcrText(text:string):string{
  return text
    .normalize("NFKC")
    .replace(/[™®©]/g,"")
    .replace(/[ \t]+/g," ")
    .replace(/\n{3,}/g,"\n\n")
    .trim();
}

function mapBlocks(blocks:NativeOcrBlock[]=[]):OcrTextBlock[]{
  return blocks
    .map((block,index)=>{
      const text=block.text.trim();
      return{
        id:createId(index),
        text,
        normalizedText:normalizeOcrText(text),
        confidence:block.confidence,
        boundingBox:block.boundingBox,
      };
    })
    .filter(block=>block.text.length>0);
}

export class ProductOcrService implements ProductOcrProvider{
  constructor(private readonly recognizeNative:NativeOcrRecognizer){}

  async recognize(image:ProductImageInput):Promise<ProductOcrResult>{
    if(!image.uri.trim())throw new Error("Product image URI is required.");
    const startedAt=Date.now();
    const result=await this.recognizeNative(image.uri);
    const rawText=result.text?.trim()??"";
    return{
      image,
      rawText,
      normalizedText:normalizeOcrText(rawText),
      blocks:mapBlocks(result.blocks),
      processingTimeMs:Date.now()-startedAt,
    };
  }
}