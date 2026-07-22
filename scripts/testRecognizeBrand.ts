import { recognizeBrand } from "../src/utils/recognizeBrand";

const tests = [

  "Coca-Cola",

  "Coca Cola",

  "Baby Bench",

  "Nescafe",

  "3M",

  "Coca Cola Zero",

  "Sprite Zero",

  "Nestle Chuckie",

  "Alaska Evaporada",

];

for (const input of tests) {

  console.log("\n" + input);

  console.table(

    recognizeBrand(input).map(

      candidate => ({

        brand: candidate.brand.name,

        confidence: candidate.confidence,

        type: candidate.matchType,

        matched: candidate.matchedText,

      })

    )

  );

}