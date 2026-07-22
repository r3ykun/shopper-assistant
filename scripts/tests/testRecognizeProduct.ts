import { recognizeProduct } from "../../src/utils/product/recognizeProduct";

const products=[
	"Lucky Me Pancit Canton Chilimansi",
	"Lucky Me Instant Mami Chicken",
	"Lucky Me Supreme Bulalo",
];

for(const product of products){
	console.log(`\n${product}`);
	console.dir(
		recognizeProduct(product),
		{depth:null}
	);
}