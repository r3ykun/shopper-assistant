import{extractPrimaryBrand}from "../../src/services/productRecognition/brandExtraction.service";
import{
  extractPrimaryProductLine,
  extractProductLineCandidates,
}from "../../src/services/productRecognition/productLineExtraction.service";

const samples=[
  `NESTLE
CHUCKIE
CHOCOLATE MILK
NET CONTENT 250 mL`,
  `NESCAFÉ
CLASSIC
PURE SOLUBLE COFFEE
50 g`,
  `DOVE
INTENSE REPAIR
SHAMPOO
340 mL`,
  `3M
COMMAND
UTILITY HOOKS
6 PCS`,
];

for(const sample of samples){
  const brand=extractPrimaryBrand(sample);
  console.log("\nINPUT");
  console.log(sample);
  console.log("\nBRAND");
  console.log(brand);
  console.log("\nPRIMARY PRODUCT LINE");
  console.log(brand?extractPrimaryProductLine(sample,brand):undefined);
  console.log("\nCANDIDATES");
  console.log(brand?extractProductLineCandidates(sample,brand):[]);
}