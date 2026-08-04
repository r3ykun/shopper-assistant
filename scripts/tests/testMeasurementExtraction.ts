import{
  extractMeasurementCandidates,
  extractPrimaryMeasurement,
}from "../../src/services/productRecognition/measurementExtraction.service";

const samples=[
  "NESTLE\nCHUCKIE\nCHOCOLATE MILK\nNET CONTENT 250 mL",
  "NET WEIGHT 500g\nSERVING SIZE 30 g",
  "VITAMIN C 500 mg\n60 TABLETS",
  "CONTENTS 1.5 L",
];

for(const sample of samples){
  console.log("\nINPUT");
  console.log(sample);
  console.log("\nPRIMARY");
  console.log(extractPrimaryMeasurement(sample));
  console.log("\nCANDIDATES");
  console.log(extractMeasurementCandidates(sample));
}