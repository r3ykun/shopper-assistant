import { recognizeProduct } from "../../src/utils/product/recognizeProduct";

const products=[
	"Nestle Chuckie 180ml",
	"Nescafe Classic Twin Pack",
	"Lucky Me Pancit Canton Chilimansi",
	"Bear Brand Fortified",
	"Coke Zero Sugar",
];

for(const product of products){
	console.log(`\n${product}`);
	console.dir(
		recognizeProduct(product),
		{depth:null}
	);
}