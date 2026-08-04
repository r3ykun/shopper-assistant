import{PRODUCT_BRAND_METADATA}from "../../constants/productBrandMetadata";
import{PRODUCT_CATEGORY_ALIASES}from "../../constants/productCategoryAliases";
import type{
  ProductBrandMetadata,
  ProductLineMetadata,
  ProductVariantMetadata,
}from "../../constants/productBrandMetadata.types";
import type{
  RecognizedBrand,
  RecognizedProductLine,
  RecognizedVariant,
  RecognitionConfidence,
}from "../../types/productRecognition.types";

export interface CategoryInferenceCandidate{
  category:string;
  subcategory?:string;
  score:number;
  matchedKeywords:string[];
  sources:string[];
  confidence:RecognitionConfidence;
}

interface MutableCandidate{
  category:string;
  subcategory?:string;
  score:number;
  matchedKeywords:Set<string>;
  sources:Set<string>;
}

function normalize(value:string):string{
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/&/g," and ")
    .replace(/[^a-z0-9]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function normalizeCategory(category:string):string{
  const value=normalize(category);
  if(value==="medicine and health"||value==="health and medicine")return"Medicine";
  return category;
}

function isMedicineContext(text:string):boolean{
  return /\b(mg|mcg|tablet|tablets|capsule|capsules|dosage|medicine|drug|paracetamol|ibuprofen|vitamin)\b/i.test(text);
}

function isAmbiguousKeyword(keyword:string):boolean{
  return["anchor","anchors","tablet","tablets","command"].includes(normalize(keyword));
}

function containsKeyword(text:string,keyword:string):boolean{
  const normalizedText=` ${normalize(text)} `;
  const normalizedKeyword=normalize(keyword);
  return normalizedKeyword.length>1&&normalizedText.includes(` ${normalizedKeyword} `);
}

function confidence(score:number):RecognitionConfidence{
  const normalizedScore=Math.max(0,Math.min(100,score));
  return{
    score:normalizedScore/100,
    level:normalizedScore>=85?"high":normalizedScore>=60?"medium":normalizedScore>0?"low":"unknown",
  };
}

function getBrandMetadata(brand?:RecognizedBrand):ProductBrandMetadata|undefined{
  if(!brand)return undefined;
  if(brand.id&&brand.id in PRODUCT_BRAND_METADATA){
    return PRODUCT_BRAND_METADATA[
      brand.id as keyof typeof PRODUCT_BRAND_METADATA
    ]as ProductBrandMetadata;
  }
  return Object.values(PRODUCT_BRAND_METADATA).find(metadata=>
    normalize(metadata.name)===normalize(brand.name)
  )as ProductBrandMetadata|undefined;
}

function getProductLineMetadata(
  brand:ProductBrandMetadata|undefined,
  productLine?:RecognizedProductLine,
):ProductLineMetadata|undefined{
  if(!brand?.productLines||!productLine)return undefined;
  return Object.values(brand.productLines).find(line=>
    normalize(line.name)===normalize(productLine.name)
  );
}

function getVariantMetadata(
  brand:ProductBrandMetadata|undefined,
  line:ProductLineMetadata|undefined,
  variant?:RecognizedVariant,
):ProductVariantMetadata|undefined{
  if(!variant)return undefined;
  const variants=[
    ...(brand?.variants??[]),
    ...(line?.variants??[]),
  ];
  return variants.find(item=>normalize(item.name)===normalize(variant.name));
}

function addCandidate(
  candidates:Map<string,MutableCandidate>,
  category:string,
  subcategory:string|undefined,
  score:number,
  source:string,
  keyword?:string,
):void{
  const normalizedCategory=normalizeCategory(category);
  const key=`${normalize(normalizedCategory)}::${normalize(subcategory??"")}`;
  const existing=candidates.get(key)??{
    category:normalizedCategory,
    subcategory,
    score:0,
    matchedKeywords:new Set<string>(),
    sources:new Set<string>(),
  };
  existing.score+=score;
  existing.sources.add(source);
  if(keyword)existing.matchedKeywords.add(keyword);
  candidates.set(key,existing);
}

export function inferProductCategories(
  text:string,
  brand?:RecognizedBrand,
  productLine?:RecognizedProductLine,
  variant?:RecognizedVariant,
  limit=5,
):CategoryInferenceCandidate[]{
  const candidates=new Map<string,MutableCandidate>();
  const brandMetadata=getBrandMetadata(brand);
  const lineMetadata=getProductLineMetadata(brandMetadata,productLine);
  const variantMetadata=getVariantMetadata(brandMetadata,lineMetadata,variant);

  for(const category of brandMetadata?.categories??[]){
    addCandidate(candidates,category,undefined,25,"brand");
  }

  for(const subcategory of brandMetadata?.subcategories??[]){
    for(const category of brandMetadata?.categories??[]){
      addCandidate(candidates,category,subcategory,20,"brand-subcategory");
    }
  }

  for(const category of lineMetadata?.categories??[]){
    addCandidate(candidates,category,undefined,40,"product-line");
  }

  for(const subcategory of lineMetadata?.subcategories??[]){
    for(const category of lineMetadata?.categories??brandMetadata?.categories??[]){
      addCandidate(candidates,category,subcategory,35,"product-line-subcategory");
    }
  }

  for(const category of variantMetadata?.categories??[]){
    addCandidate(candidates,category,undefined,45,"variant");
  }

  for(const subcategory of variantMetadata?.subcategories??[]){
    for(const category of variantMetadata?.categories??lineMetadata?.categories??brandMetadata?.categories??[]){
      addCandidate(candidates,category,subcategory,40,"variant-subcategory");
    }
  }

    for(const alias of PRODUCT_CATEGORY_ALIASES){
    const matches=alias.keywords.filter(keyword=>containsKeyword(text,keyword));
    if(matches.length===0)continue;
    const validMatches=matches.filter(keyword=>{
        const normalizedKeyword=normalize(keyword);
        if((normalizedKeyword==="tablet"||normalizedKeyword==="tablets")&&isMedicineContext(text)){
        return normalize(alias.category)!=="electronics";
        }
        if((normalizedKeyword==="anchor"||normalizedKeyword==="anchors")&&brand){
        return normalize(brand.name)!=="anchor";
        }
        return true;
    });
    if(validMatches.length===0)continue;
    const longest=Math.max(...validMatches.map(keyword=>normalize(keyword).length));
    let score=25+validMatches.length*10+Math.min(20,longest);
    if(validMatches.every(isAmbiguousKeyword))score-=20;
    score=Math.max(5,Math.min(70,score));
    for(const keyword of validMatches){
        addCandidate(
        candidates,
        alias.category,
        alias.subcategory,
        score,
        "keyword",
        keyword,
        );
    }
    }

    const categoryScores=new Map<string,number>();

    for(const candidate of candidates.values()){
    if(candidate.subcategory)continue;
    categoryScores.set(
        normalize(candidate.category),
        Math.max(
        categoryScores.get(normalize(candidate.category))??0,
        candidate.score,
        ),
    );
    }

    for(const candidate of candidates.values()){
    if(!candidate.subcategory)continue;
    const categoryScore=categoryScores.get(normalize(candidate.category))??0;
    if(categoryScore>0){
        candidate.score+=Math.min(40,Math.round(categoryScore*0.6));
        candidate.sources.add("category-support");
    }
    }

    return[...candidates.values()]
    .map(candidate=>{
        const score=Math.min(100,candidate.score);
        return{
        category:candidate.category,
        subcategory:candidate.subcategory,
        score,
        matchedKeywords:[...candidate.matchedKeywords],
        sources:[...candidate.sources],
        confidence:confidence(score),
        };
    })
    .sort((a,b)=>
      b.score-a.score||
      Number(Boolean(b.subcategory))-Number(Boolean(a.subcategory))||
      a.category.localeCompare(b.category)
    )
    .slice(0,limit);
}

export function inferPrimaryCategory(
  text:string,
  brand?:RecognizedBrand,
  productLine?:RecognizedProductLine,
  variant?:RecognizedVariant,
):CategoryInferenceCandidate|undefined{
  const candidate=inferProductCategories(
    text,
    brand,
    productLine,
    variant,
    1,
  )[0];
  if(!candidate||candidate.confidence.score<0.4)return undefined;
  return candidate;
}