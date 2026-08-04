import{
  detectDuplicate,
  extractProductMetadata,
  matchDatabaseProducts,
  productOcrService,
  resolveDuplicate,
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
];

async function main():Promise<void>{
  const image={
    uri:"mock://product-image",
    source:"camera" as const,
  };
  const ocr=await productOcrService.recognize(image);
  const metadata=extractProductMetadata(ocr);
  const matches=matchDatabaseProducts(
    metadata,
    ()=>products,
    {
      limit:5,
      minimumScore:20,
    },
  );
  const duplicate=detectDuplicate(metadata,matches);

  console.log("USE EXISTING");
  console.dir(
    resolveDuplicate({
      recognitionId:"recognition-1",
      duplicate,
      metadata,
      action:"use-existing",
      image,
    }),
    {depth:null},
  );

  console.log("\nUPDATE EXISTING");
  console.dir(
    resolveDuplicate({
      recognitionId:"recognition-1",
      duplicate,
      metadata,
      action:"update-existing",
      image,
    }),
    {depth:null},
  );

  console.log("\nSAVE NEW");
  console.dir(
    resolveDuplicate({
      recognitionId:"recognition-1",
      duplicate,
      metadata,
      action:"save-new",
      barcode:"480001000099",
      image,
    }),
    {depth:null},
  );
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});