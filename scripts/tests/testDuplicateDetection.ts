import{
  detectDuplicate,
  detectDuplicates,
  extractProductMetadata,
  matchDatabaseProducts,
  productOcrService,
  type DatabaseProduct,
}from "../../src/services/productRecognition";

const products:DatabaseProduct[]=[
  {
    id:1,
    barcode:"480001000001",
    name:"Nestlé Chuckie Chocolate Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Chocolate",
    measurement:250,
    measurementUnit:"mL",
  },
  {
    id:2,
    barcode:"480001000002",
    name:"Nestlé Chuckie Chocolate Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Chocolate",
    measurement:1,
    measurementUnit:"L",
  },
  {
    id:3,
    barcode:"480001000003",
    name:"Nestlé Fresh Milk",
    brand:"Nestlé",
    category:"Grocery",
    subcategory:"Milk",
    measurement:250,
    measurementUnit:"mL",
  },
];

async function main():Promise<void>{
  const ocr=await productOcrService.recognize({
    uri:"mock://product-image",
    source:"camera",
  });

  const metadata=extractProductMetadata(ocr);

  const matches=matchDatabaseProducts(
    metadata,
    ()=>products,
    {
      limit:5,
      minimumScore:20,
    },
  );

  console.log("PRIMARY DUPLICATE");
  console.dir(
    detectDuplicate(
      metadata,
      matches,
    ),
    {depth:null},
  );

  console.log("\nALL DUPLICATES");
  console.dir(
    detectDuplicates(
      metadata,
      matches,
    ),
    {depth:null},
  );

  console.log("\nBARCODE DUPLICATE");
  const barcodeMatches=matchDatabaseProducts(
    metadata,
    ()=>products,
    {
      barcode:"480001000001",
      limit:5,
      minimumScore:20,
    },
  );

  console.dir(
    detectDuplicate(
      metadata,
      barcodeMatches,
      "480001000001",
    ),
    {depth:null},
  );
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});