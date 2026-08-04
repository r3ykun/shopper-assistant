import{productOcrService}from "../../src/services/productRecognition";

async function main():Promise<void>{
  const result=await productOcrService.recognize({
    uri:"mock://product-image",
    source:"camera",
  });
  console.log(JSON.stringify(result,null,2));
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});