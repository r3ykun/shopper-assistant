import{PRODUCT_BRAND_METADATA}from "../../constants/productBrandMetadata";
import type{
  ProductBrandMetadata,
  ProductLineMetadata,
}from "../../constants/productBrandMetadata.types";
import type{
  RecognizedBrand,
  RecognizedProductLine,
  RecognitionConfidence,
}from "../../types/productRecognition.types";

interface ProductLineCandidate{
  name:string;
  matchedText:string;
  alias:string;
  score:number;
  lineIndex:number;
}

function normalize(value:string):string{
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/&/g," and ")
    .replace(/[™®©]/g,"")
    .replace(/[^a-z0-9]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function compact(value:string):string{
  return normalize(value).replace(/\s+/g,"");
}

function confidence(score:number):RecognitionConfidence{
  return{
    score:score/100,
    level:score>=85?"high":score>=60?"medium":score>0?"low":"unknown",
  };
}

function getBrandMetadata(brand:RecognizedBrand):ProductBrandMetadata|undefined{
  if(brand.id&&brand.id in PRODUCT_BRAND_METADATA){
    return PRODUCT_BRAND_METADATA[
      brand.id as keyof typeof PRODUCT_BRAND_METADATA
    ]as ProductBrandMetadata;
  }
  return Object.values(PRODUCT_BRAND_METADATA).find(metadata=>
    normalize(metadata.name)===normalize(brand.name)
  )as ProductBrandMetadata|undefined;
}

function scoreMatch(
  line:string,
  alias:string,
  priority:number,
  lineIndex:number,
):number{
  const normalizedLine=normalize(line);
  const normalizedAlias=normalize(alias);
  const compactLine=compact(line);
  const compactAlias=compact(alias);
  let score=0;
  if(normalizedLine===normalizedAlias)score=100;
  else if(` ${normalizedLine} `.includes(` ${normalizedAlias} `))score=90;
  else if(compactAlias.length>=5&&compactLine.includes(compactAlias))score=78;
  else return 0;
  score+=Math.round((priority-80)*0.15);
  if(lineIndex<=2)score+=2;
  if(compactAlias.length<=2&&normalizedLine!==normalizedAlias)return 0;
  if(compactAlias.length===3&&normalizedLine!==normalizedAlias)score-=15;
  return Math.max(0,Math.min(100,score));
}

function collectAliases(
  line:ProductLineMetadata,
):{value:string;priority:number}[]{
  return[
    {value:line.name,priority:100},
    ...(line.aliases??[]).map(alias=>({
      value:alias.value,
      priority:alias.priority??80,
    })),
  ];
}

export function extractProductLineCandidates(
  text:string,
  brand:RecognizedBrand,
  limit=5,
):RecognizedProductLine[]{
  const metadata=getBrandMetadata(brand);
  if(!metadata?.productLines)return[];
  const lines=text
    .split(/\r?\n/)
    .map(line=>line.trim())
    .filter(Boolean);
  const candidates:ProductLineCandidate[]=[];
  for(const productLine of Object.values(metadata.productLines)){
    for(const alias of collectAliases(productLine)){
      if(!alias.value.trim())continue;
      for(let lineIndex=0;lineIndex<lines.length;lineIndex++){
        const score=scoreMatch(
          lines[lineIndex],
          alias.value,
          alias.priority,
          lineIndex,
        );
        if(score===0)continue;
        candidates.push({
          name:productLine.name,
          matchedText:lines[lineIndex],
          alias:alias.value,
          score,
          lineIndex,
        });
      }
    }
  }
  candidates.sort((a,b)=>
    b.score-a.score||
    b.alias.length-a.alias.length||
    a.lineIndex-b.lineIndex
  );
  const seen=new Set<string>();
  const results:RecognizedProductLine[]=[];
  for(const candidate of candidates){
    const key=normalize(candidate.name);
    if(seen.has(key))continue;
    seen.add(key);
    results.push({
      name:candidate.name,
      matchedText:candidate.matchedText,
      confidence:confidence(candidate.score),
    });
    if(results.length>=limit)break;
  }
  return results;
}

export function extractPrimaryProductLine(
  text:string,
  brand:RecognizedBrand,
):RecognizedProductLine|undefined{
  const candidate=extractProductLineCandidates(text,brand,1)[0];
  if(!candidate||candidate.confidence.score<0.6)return undefined;
  return candidate;
}