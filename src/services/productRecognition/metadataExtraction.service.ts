import type{
  ExtractedProductMetadata,
  ProductOcrResult,
  RecognitionConfidence,
}from "../../types/productRecognition.types";
import{extractPrimaryBrand}from "./brandExtraction.service";
import{inferPrimaryCategory}from "./categoryInference.service";
import{extractPrimaryMeasurement}from "./measurementExtraction.service";
import{extractProductName}from "./productNameExtraction.service";
import{extractPrimaryProductLine}from "./productLineExtraction.service";
import{extractPrimaryVariant}from "./variantExtraction.service";

function confidence(score:number):RecognitionConfidence{
  const normalized=Math.max(0,Math.min(1,score));
  return{
    score:normalized,
    level:normalized>=0.85?"high":normalized>=0.6?"medium":normalized>0?"low":"unknown",
  };
}

function measurementConfidence(found:boolean,text:string):RecognitionConfidence{
  if(!found)return confidence(0);
  if(/\b(net\s+(content|contents|weight|wt|volume)|contents?|peso\s+neto)\b/i.test(text)){
    return confidence(0.95);
  }
  return confidence(0.7);
}

function average(values:number[]):number{
  const valid=values.filter(value=>value>0);
  if(valid.length===0)return 0;
  return valid.reduce((sum,value)=>sum+value,0)/valid.length;
}

export function extractProductMetadata(
  ocr:ProductOcrResult,
):ExtractedProductMetadata{
  const text=ocr.normalizedText||ocr.rawText;
  const brand=extractPrimaryBrand(text);
  const productLine=brand
    ?extractPrimaryProductLine(text,brand)
    :undefined;
  const variant=brand
    ?extractPrimaryVariant(text,brand,productLine)
    :undefined;
  const measurement=extractPrimaryMeasurement(text);
  const productNameResult=extractProductName(
    text,
    brand,
    productLine,
    variant,
    measurement,
  );
  const categoryResult=inferPrimaryCategory(
    text,
    brand,
    productLine,
    variant,
  );
  const brandScore=brand?.confidence.score??0;
  const productLineScore=productLine?.confidence.score??0;
  const variantScore=variant?.confidence.score??0;
  const productNameScore=productNameResult?.confidence.score??0;
  const categoryScore=categoryResult?.confidence.score??0;
  const measurementScore=measurementConfidence(Boolean(measurement),text).score;
  const overallScore=average([
    brandScore,
    productNameScore,
    measurementScore,
    categoryScore,
    productLineScore,
    variantScore,
  ]);
  return{
    brand,
    productName:productNameResult?.name,
    productLine,
    variant,
    measurement,
    category:categoryResult?.category,
    subcategory:categoryResult?.subcategory,
    rawText:ocr.rawText,
    normalizedText:ocr.normalizedText,
    textBlocks:ocr.blocks,
    confidence:{
      overall:confidence(overallScore),
      productName:productNameResult?.confidence??confidence(0),
      measurement:measurementConfidence(Boolean(measurement),text),
      category:categoryResult?.confidence??confidence(0),
    },
  };
}