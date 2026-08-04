import{
  createProductConfirmationDraft,
  sanitizeProductConfirmationDraft,
  updateProductConfirmationDraft,
  validateProductConfirmationDraft,
}from "../../src/services/productRecognition/recognitionConfirmation.service";
import{extractProductMetadata}from "../../src/services/productRecognition/metadataExtraction.service";
import{mockProductOcrRecognizer}from "../../src/services/productRecognition/mockProductOcr.provider";
import{ProductOcrService}from "../../src/services/productRecognition/productOcr.service";

async function main():Promise<void>{
  const image={
    uri:"mock://product-image",
    source:"camera"as const,
  };
  const service=new ProductOcrService(mockProductOcrRecognizer);
  const ocr=await service.recognize(image);
  const metadata=extractProductMetadata(ocr);
  const initial=createProductConfirmationDraft({
    recognitionId:"recognition-1",
    metadata,
    image,
    barcode:"480001000001",
  });
  const edited=updateProductConfirmationDraft(initial,{
    name:"  Nestlé Chuckie Chocolate Milk  ",
    measurement:"250",
  });
  const sanitized=sanitizeProductConfirmationDraft(edited);
  console.log("INITIAL");
  console.dir(initial,{depth:null});
  console.log("\nSANITIZED");
  console.dir(sanitized,{depth:null});
  console.log("\nVALIDATION");
  console.dir(
    validateProductConfirmationDraft(sanitized),
    {depth:null},
  );
  console.log("\nINVALID");
  console.dir(
    validateProductConfirmationDraft({
      ...sanitized,
      barcode:"",
      name:"",
      measurement:"0",
    }),
    {depth:null},
  );
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});