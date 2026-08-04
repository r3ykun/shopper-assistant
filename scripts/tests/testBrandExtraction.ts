import{
  extractBrandCandidates,
  extractPrimaryBrand,
}from "../../src/services/productRecognition/brandExtraction.service";

const samples=[
  `NESTLE
CHUCKIE
CHOCOLATE MILK
NET CONTENT 250 mL`,
  `NESCAFÉ
CLASSIC
PURE SOLUBLE COFFEE
50 g`,
  `COCA COLA
ORIGINAL TASTE
1.5 L`,
  `DOVE
INTENSE REPAIR
SHAMPOO
340 mL`,
  `VITAMIN C
500 mg
60 TABLETS`,
];

for(const sample of samples){
  console.log("\nINPUT");
  console.log(sample);
  console.log("\nPRIMARY");
  console.log(extractPrimaryBrand(sample));
  console.log("\nCANDIDATES");
  console.log(extractBrandCandidates(sample));
}