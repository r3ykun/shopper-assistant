import{extractPrimaryBrand}from "../../src/services/productRecognition/brandExtraction.service";
import{extractPrimaryMeasurement}from "../../src/services/productRecognition/measurementExtraction.service";
import{extractProductName}from "../../src/services/productRecognition/productNameExtraction.service";
import{extractPrimaryProductLine}from "../../src/services/productRecognition/productLineExtraction.service";
import{extractPrimaryVariant}from "../../src/services/productRecognition/variantExtraction.service";

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
  `ANCHOR
CHEESE
CHEDDAR SLICES
200 g`,
  `3M
COMMAND
UTILITY HOOKS
6 PCS`,
];

for(const sample of samples){
  const brand=extractPrimaryBrand(sample);
  const productLine=brand?extractPrimaryProductLine(sample,brand):undefined;
  const variant=brand?extractPrimaryVariant(sample,brand,productLine):undefined;
  const measurement=extractPrimaryMeasurement(sample);
  console.log("\nINPUT");
  console.log(sample);
  console.log("\nRESULT");
  console.dir(
    extractProductName(
      sample,
      brand,
      productLine,
      variant,
      measurement,
    ),
    {depth:null},
  );
}