import { recognizeProduct } from "../../src/utils/product/recognizeProduct";

const tests=[
	"Lucky Me Pancit Canton Chilimansi",
	"Lucky Me Pancit Canton Original",
	"Lucky Me Pancit Canton Beef",
	"Lucky Me Pancit Canton Kalamansi",
	"Lucky Me Pancit Canton Extra Hot Chili",
	"Lucky Me Pancit Canton Sweet & Spicy",
	"Lucky Me Instant Mami Chicken",
	"Lucky Me Instant Mami Beef",
	"Lucky Me Instant Mami Hot & Spicy",
	"Lucky Me Supreme Bulalo",
	"Lucky Me Supreme Chicken",
	"Lucky Me Supreme La Paz Batchoy",
];

for (const test of tests) {

  console.log("\n" + test);

  console.dir(

    recognizeProduct(test),

    { depth: null }

  );

}