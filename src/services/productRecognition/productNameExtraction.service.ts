import type{
  ProductMeasurement,
  RecognizedBrand,
  RecognizedProductLine,
  RecognizedVariant,
  RecognitionConfidence,
}from "../../types/productRecognition.types";

export interface ProductNameExtractionResult{
  name:string;
  sourceLines:string[];
  confidence:RecognitionConfidence;
}

const EXCLUDED_PATTERNS=[
  /\bnet\s+(content|contents|weight|wt|volume)\b/i,
  /\bserving\s+size\b/i,
  /\bnutrition\s+facts\b/i,
  /\bingredients?\b/i,
  /\bmanufactured\b/i,
  /\bdistributed\b/i,
  /\bexpiration\b/i,
  /\bbest\s+before\b/i,
  /\b\d+(?:[.,]\d+)?\s*(ml|l|mg|g|kg|oz|lb|pcs?|pieces?|tablets?|capsules?)\b/i,
];

function normalize(value:string):string{
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function formatProductPart(value:string):string{
  return value
    .toLowerCase()
    .split(/\s+/)
    .map(word=>{
      if(/^\d+[a-z]*$/i.test(word))return word.toUpperCase();
      return word.charAt(0).toUpperCase()+word.slice(1);
    })
    .join(" ");
}

function confidence(score:number):RecognitionConfidence{
  return{
    score:score/100,
    level:score>=85?"high":score>=60?"medium":score>0?"low":"unknown",
  };
}

function isExcluded(line:string):boolean{
  return EXCLUDED_PATTERNS.some(pattern=>pattern.test(line));
}

function isKnownLine(
  line:string,
  brand?:RecognizedBrand,
  productLine?:RecognizedProductLine,
  variant?:RecognizedVariant,
):boolean{
  const normalized=normalize(line);
  return[
    brand?.matchedText,
    brand?.name,
    productLine?.matchedText,
    productLine?.name,
    variant?.matchedText,
    variant?.name,
  ].filter(Boolean).some(value=>normalize(value as string)===normalized);
}

function uniqueParts(parts:string[]):string[]{
  const seen=new Set<string>();
  return parts.filter(part=>{
    const key=normalize(part);
    if(!key||seen.has(key))return false;
    seen.add(key);
    return true;
  });
}

export function extractProductName(
  text:string,
  brand?:RecognizedBrand,
  productLine?:RecognizedProductLine,
  variant?:RecognizedVariant,
  measurement?:ProductMeasurement,
):ProductNameExtractionResult|undefined{
  const lines=text
    .split(/\r?\n/)
    .map(line=>line.trim())
    .filter(Boolean);
  const descriptiveLines=lines.filter(line=>
    !isExcluded(line)&&
    !isKnownLine(line,brand,productLine,variant)&&
    normalize(line)!==normalize(measurement?.rawText??"")
  );
  const productDescriptor=descriptiveLines
    .filter(line=>line.length>=3&&line.length<=60)
    .slice(0,2)
    .map(formatProductPart);
  const parts=uniqueParts([
    brand?.name??"",
    productLine?.name??"",
    variant?.name??"",
    ...productDescriptor,
  ]);
  if(parts.length===0)return undefined;
  let score=40;
  if(brand)score+=20;
  if(productLine)score+=20;
  if(variant)score+=10;
  if(productDescriptor.length>0)score+=10;
  return{
    name:parts.join(" "),
    sourceLines:productDescriptor,
    confidence:confidence(Math.min(100,score)),
  };
}