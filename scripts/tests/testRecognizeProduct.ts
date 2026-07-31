import { recognizeProduct } from "../../src/utils/product/recognizeProduct";

const products=[
	"Chocolate Nestle Chuckie",
	"Perfume Bench Bottle",
	"Shampoo Head & Shoulders Sachet",
	"Canton Lucky Me Original",
];

for(const product of products){
	console.log(`\n${product}`);
	console.dir(
		recognizeProduct(product),
		{depth:null}
	);
}