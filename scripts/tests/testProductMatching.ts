import{
  extractProductMetadata,
  matchProducts,
  productOcrService,
  type MatchableProduct,
}from "../../src/services/productRecognition";

const products:MatchableProduct[]=[
  {
    id:1,
    barcode:"480001000001",
    name:"Nestlé Chuckie Chocolate Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Chocolate",
    measurement:250,
    unit:"mL",
  },
  {
    id:2,
    barcode:"480001000002",
    name:"Nestlé Chuckie Chocolate Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Chocolate",
    measurement:1,
    unit:"L",
  },
  {
    id:3,
    barcode:"480001000003",
    name:"Nestlé Fresh Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Milk",
    measurement:250,
    unit:"mL",
  },
  {
    id:4,
    barcode:"480001000004",
    name:"Dove Intense Repair Shampoo",
    brand:"Dove",
    category:"Personal Care",
    subcategory:"Shampoo",
    measurement:340,
    unit:"mL",
  },
];

async function main():Promise<void>{
  const ocr=await productOcrService.recognize({
    uri:"mock://product-image",
    source:"camera",
  });
  const metadata=extractProductMetadata(ocr);
  const matches=matchProducts(metadata,products,{
    limit:5,
    minimumScore:20,
  });
  console.dir(matches,{depth:null});
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});