import{PRODUCT_BRAND_METADATA}from "../../src/constants/productBrandMetadata";
import type{
  ProductBrandMetadata,
  ProductLineMetadata,
  ProductVariantMetadata,
}from "../../src/constants/productBrandMetadata.types";
import{extractPrimaryBrand}from "../../src/services/productRecognition/brandExtraction.service";
import{extractPrimaryProductLine}from "../../src/services/productRecognition/productLineExtraction.service";
import{
  extractPrimaryVariant,
  extractVariantCandidates,
}from "../../src/services/productRecognition/variantExtraction.service";

interface VariantFixture{
  brand:ProductBrandMetadata;
  productLine?:ProductLineMetadata;
  variant:ProductVariantMetadata;
}

function findVariantFixture():VariantFixture|undefined{
  const brands=Object.values(PRODUCT_BRAND_METADATA)as ProductBrandMetadata[];
  for(const brand of brands){
    const brandVariant=brand.variants?.[0];
    if(brandVariant)return{brand,variant:brandVariant};
    for(const productLine of Object.values(brand.productLines??{})){
      const variant=productLine.variants?.[0];
      if(variant)return{brand,productLine,variant};
    }
  }
  return undefined;
}

const fixture=findVariantFixture();

if(!fixture){
  console.log("No variants found in PRODUCT_BRAND_METADATA.");
  process.exit(0);
}

const sample=[
  fixture.brand.name,
  fixture.productLine?.name,
  fixture.variant.name,
  "SAMPLE PRODUCT",
].filter(Boolean).join("\n");

const brand=extractPrimaryBrand(sample);
const productLine=brand
  ?extractPrimaryProductLine(sample,brand)
  :undefined;

console.log("METADATA FIXTURE");
console.dir(fixture,{depth:null});

console.log("\nINPUT");
console.log(sample);

console.log("\nBRAND");
console.log(brand);

console.log("\nPRODUCT LINE");
console.log(productLine);

console.log("\nPRIMARY VARIANT");
console.log(
  brand
    ?extractPrimaryVariant(sample,brand,productLine)
    :undefined,
);

console.log("\nCANDIDATES");
console.log(
  brand
    ?extractVariantCandidates(sample,brand,productLine)
    :[],
);