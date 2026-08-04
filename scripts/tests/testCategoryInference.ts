import{extractPrimaryBrand}from "../../src/services/productRecognition/brandExtraction.service";
import{
  inferPrimaryCategory,
  inferProductCategories,
}from "../../src/services/productRecognition/categoryInference.service";
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
  `PARACETAMOL
500 mg
20 TABLETS`,
];

for(const sample of samples){
  const brand=extractPrimaryBrand(sample);
  const productLine=brand?extractPrimaryProductLine(sample,brand):undefined;
  const variant=brand?extractPrimaryVariant(sample,brand,productLine):undefined;

  console.log("\nINPUT");
  console.log(sample);

  console.log("\nPRIMARY");
  console.dir(
    inferPrimaryCategory(
      sample,
      brand,
      productLine,
      variant,
    ),
    {depth:null},
  );

  console.log("\nCANDIDATES");
  console.dir(
    inferProductCategories(
      sample,
      brand,
      productLine,
      variant,
    ),
    {depth:null},
  );
}