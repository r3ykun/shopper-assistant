import{PRODUCT_BRAND_METADATA}from "../../constants/productBrandMetadata";
import type{ProductBrandMetadata}from "../../constants/productBrandMetadata.types";
import type{RecognizedBrand,RecognitionConfidence}from "../../types/productRecognition.types";

interface BrandCandidate{
  brand:ProductBrandMetadata;
  matchedText:string;
  alias:string;
  score:number;
  lineIndex:number;
}

const brands=Object.values(PRODUCT_BRAND_METADATA)as ProductBrandMetadata[];

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

function containsNormalized(line:string,value:string):boolean{
  const normalizedLine=` ${normalize(line)} `;
  const normalizedValue=normalize(value);
  return normalizedValue.length>0&&normalizedLine.includes(` ${normalizedValue} `);
}

function scoreMatch(
  line:string,
  alias:string,
  priority:number,
  strength:string|undefined,
  lineIndex:number,
):number{
  const normalizedLine=normalize(line);
  const normalizedAlias=normalize(alias);
  const compactLine=compact(line);
  const compactAlias=compact(alias);
  let score=0;
  if(normalizedLine===normalizedAlias)score=100;
  else if(containsNormalized(line,alias))score=90;
  else if(compactAlias.length>=5&&compactLine.includes(compactAlias))score=78;
  else return 0;
  score+=Math.round((priority-80)*0.15);
  if(strength==="strong")score+=4;
  if(strength==="weak")score-=8;
  if(lineIndex===0)score+=3;
  else if(lineIndex<=2)score+=1;
  if(compactAlias.length<=2&&normalizedLine!==normalizedAlias)return 0;
  if(compactAlias.length===3&&normalizedLine!==normalizedAlias)score-=15;
  return Math.max(0,Math.min(100,score));
}

function collectCandidates(text:string):BrandCandidate[]{
  const lines=text
    .split(/\r?\n/)
    .map(line=>line.trim())
    .filter(Boolean);
  const candidates:BrandCandidate[]=[];
  for(const brand of brands){
    const aliases=[
    {value:brand.name,priority:100,strength:"strong" as const},
    ...(brand.aliases??[]),
    ];
    for(const alias of aliases){
      if(!alias.value.trim())continue;
      for(let lineIndex=0;lineIndex<lines.length;lineIndex++){
        const score=scoreMatch(
          lines[lineIndex],
          alias.value,
          alias.priority??80,
          alias.strength,
          lineIndex,
        );
        if(score===0)continue;
        candidates.push({
          brand,
          matchedText:lines[lineIndex],
          alias:alias.value,
          score,
          lineIndex,
        });
      }
    }
  }
    return candidates.sort((a,b)=>
    b.score-a.score||
    a.lineIndex-b.lineIndex||
    b.alias.length-a.alias.length
    );
}

export function extractBrandCandidates(text:string,limit=5):RecognizedBrand[]{
  const candidates=collectCandidates(text);
  const seen=new Set<string>();
  const results:RecognizedBrand[]=[];
  for(const candidate of candidates){
    if(seen.has(candidate.brand.id))continue;
    seen.add(candidate.brand.id);
    results.push({
      id:candidate.brand.id,
      name:candidate.brand.name,
      matchedText:candidate.matchedText,
      alias:candidate.alias,
      confidence:confidence(candidate.score),
    });
    if(results.length>=limit)break;
  }
  return results;
}

export function extractPrimaryBrand(text:string):RecognizedBrand|undefined{
  const candidate=extractBrandCandidates(text,1)[0];
  if(!candidate||candidate.confidence.score<0.6)return undefined;
  return candidate;
}