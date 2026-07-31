import { recognizeProduct } from "../../src/utils/product/recognizeProduct";

const products=[
	" Lucky   Me   Pancit   Canton   Chilimansi ",
	"Nescafé    Classic",
	"Royal   Tru-Orange",
];

for(const product of products){
	console.log(`\n${product}`);
	console.dir(
		recognizeProduct(product),
		{depth:null}
	);
}