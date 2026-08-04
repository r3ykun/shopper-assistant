import type{
  ExtractedProductMetadata,
  ProductMatchCandidate,
  ProductMatchReason,
}from "../../types/productRecognition.types";

export interface MatchableProduct{
  id:number|string;
  barcode?:string;
  name:string;
  brand?:string;
  category?:string;
  subcategory?:string;
  measurement?:number;
  unit?:string;
}

function normalize(value:string|undefined):string{
  return(value??"")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/&/g," and ")
    .replace(/[^a-z0-9]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function tokenize(value:string|undefined):Set<string>{
  return new Set(
    normalize(value)
      .split(" ")
      .filter(token=>token.length>1),
  );
}

function diceSimilarity(left:string|undefined,right:string|undefined):number{
  const a=tokenize(left);
  const b=tokenize(right);
  if(a.size===0||b.size===0)return 0;
  let intersection=0;
  for(const token of a){
    if(b.has(token))intersection++;
  }
  return(2*intersection)/(a.size+b.size);
}

function exact(left:string|undefined,right:string|undefined):boolean{
  const a=normalize(left);
  const b=normalize(right);
  return Boolean(a&&b&&a===b);
}

function normalizeUnit(unit:string|undefined):string{
  const value=normalize(unit).replace(/\s+/g,"");
  const aliases:Record<string,string>={
    milliliter:"ml",
    milliliters:"ml",
    millilitre:"ml",
    millilitres:"ml",
    liter:"l",
    liters:"l",
    litre:"l",
    litres:"l",
    gram:"g",
    grams:"g",
    kilogram:"kg",
    kilograms:"kg",
    milligram:"mg",
    milligrams:"mg",
    piece:"pc",
    pieces:"pc",
    pcs:"pc",
  };
  return aliases[value]??value;
}

function measurementMatches(
  metadata:ExtractedProductMetadata,
  product:MatchableProduct,
):boolean{
  const detected=metadata.measurement;
  if(!detected||product.measurement===undefined||!product.unit)return false;
  return detected.value===product.measurement&&
    normalizeUnit(detected.unit)===normalizeUnit(product.unit);
}

function hasComparableMeasurement(
  metadata:ExtractedProductMetadata,
  product:MatchableProduct,
):boolean{
  return Boolean(
    metadata.measurement&&
    product.measurement!==undefined&&
    product.unit
  );
}

function productNameContainsRequiredParts(
  metadata:ExtractedProductMetadata,
  product:MatchableProduct,
):boolean{
  const name=normalize(product.name);
  const required=[
    metadata.brand?.name,
    metadata.productLine?.name,
    metadata.variant?.name,
  ].filter(Boolean)as string[];
  return required.every(value=>name.includes(normalize(value)));
}

function addReason(
  reasons:ProductMatchReason[],
  field:ProductMatchReason["field"],
  score:number,
  description:string,
):void{
  if(score===0)return;
  reasons.push({field,score,description});
}

function scoreProduct(
  metadata:ExtractedProductMetadata,
  product:MatchableProduct,
  barcode?:string,
):ProductMatchCandidate{
  const reasons:ProductMatchReason[]=[];
  let score=0;

  if(barcode&&product.barcode&&barcode===product.barcode){
    score=100;
    addReason(reasons,"barcode",100,"Exact barcode match");
  }else{
    if(exact(metadata.brand?.name,product.brand)){
      score+=25;
      addReason(reasons,"brand",25,"Exact brand match");
    }else{
      const brandSimilarity=diceSimilarity(metadata.brand?.name,product.brand);
      if(brandSimilarity>=0.6){
        const brandScore=Math.round(brandSimilarity*18);
        score+=brandScore;
        addReason(reasons,"brand",brandScore,"Similar brand");
      }
    }

    const exactName=exact(metadata.productName,product.name);
    const nameSimilarity=diceSimilarity(metadata.productName,product.name);

    if(exactName){
    score+=40;
    addReason(reasons,"productName",40,"Exact product-name match");
    }else if(nameSimilarity>0){
    const nameScore=Math.round(nameSimilarity*35);
    score+=nameScore;
    addReason(
        reasons,
        "productName",
        nameScore,
        `${Math.round(nameSimilarity*100)}% product-name similarity`,
    );
    }

    if(metadata.productLine&&normalize(product.name).includes(normalize(metadata.productLine.name))){
      score+=10;
      addReason(reasons,"productLine",10,"Product line found in product name");
    }

    if(metadata.variant&&normalize(product.name).includes(normalize(metadata.variant.name))){
      score+=10;
      addReason(reasons,"variant",10,"Variant found in product name");
    }

    if(!productNameContainsRequiredParts(metadata,product)){
    score-=15;
    addReason(
        reasons,
        "productName",
        -15,
        "Missing detected brand, product line, or variant",
    );
    }

    if(measurementMatches(metadata,product)){
    score+=15;
    addReason(reasons,"measurement",15,"Exact measurement match");
    }else if(hasComparableMeasurement(metadata,product)){
    score-=20;
    addReason(reasons,"measurement",-20,"Measurement mismatch");
    }

    if(exact(metadata.category,product.category)){
      score+=4;
      addReason(reasons,"category",4,"Category match");
    }

    if(exact(metadata.subcategory,product.subcategory)){
      score+=1;
      addReason(reasons,"subcategory",1,"Subcategory match");
    }
  }

  return{
    productId:product.id,
    barcode:product.barcode,
    brand:product.brand,
    productName:product.name,
    productLine:metadata.productLine?.name,
    variant:metadata.variant?.name,
    measurement:product.measurement!==undefined&&product.unit
      ?{
        value:product.measurement,
        unit:product.unit,
        rawText:`${product.measurement} ${product.unit}`,
        normalizedValue:product.measurement,
        normalizedUnit:product.unit,
      }
      :undefined,
    category:product.category,
    subcategory:product.subcategory,
    score:Math.max(0,Math.min(100,score)),
    reasons,
  };
}

export function matchProducts(
  metadata:ExtractedProductMetadata,
  products:MatchableProduct[],
  options?:{
    barcode?:string;
    limit?:number;
    minimumScore?:number;
  },
):ProductMatchCandidate[]{
  const limit=options?.limit??5;
  const minimumScore=options?.minimumScore??20;

  return products
    .map(product=>scoreProduct(metadata,product,options?.barcode))
    .filter(candidate=>candidate.score>=minimumScore)
    .sort((a,b)=>
      b.score-a.score||
      a.productName.localeCompare(b.productName)
    )
    .slice(0,limit);
}