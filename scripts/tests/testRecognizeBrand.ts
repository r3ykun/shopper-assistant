import { recognizeBrand } from "../../src/utils/brand/recognizeBrand";

const tests = [

  "Nescafe",
  "Nescafee",

  "Nestle",
  "Nestlee",

  "Coka Cola",
  "CocaCola",

  "Safeguad",
  "Palmoliv",

  "Colagte",
  "Colgat",

  "Pepsii",
  "Sprtie",

  "Bear Brnad",

  "Tobleron",

  "Head n Shoulders",

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