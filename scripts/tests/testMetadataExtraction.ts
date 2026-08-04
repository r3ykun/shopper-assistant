import{mockProductOcrRecognizer}from "../../src/services/productRecognition/mockProductOcr.provider";
import{ProductOcrService}from "../../src/services/productRecognition/productOcr.service";
import{extractProductMetadata}from "../../src/services/productRecognition/metadataExtraction.service";

async function main():Promise<void>{
  const service=new ProductOcrService(mockProductOcrRecognizer);
  const ocr=await service.recognize({
    uri:"mock://product-image",
    source:"camera",
  });
  console.dir(extractProductMetadata(ocr),{depth:null});
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});