import { suggestBrands } from "../../src/utils/brand/suggestBrands";

const tests = [

  "Nescafee",

  "Nestlee",

  "Coka Cola",

  "Colagte",

  "Sprtie",

  "Bear Brnad",

];

for (const input of tests) {

  console.log("\n" + input);

  console.table(
    suggestBrands(input)
  );

}