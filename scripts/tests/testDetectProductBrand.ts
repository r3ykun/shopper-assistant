import {detectProductBrand} from "../../src/utils/brand/detectProductBrand";

const tests=[
	"Chocolate Nestle Chuckie",
	"Perfume Bench Bottle",
	"Shampoo Head & Shoulders Sachet",
	"Canton Lucky Me Original",
];

for(const test of tests){
	console.log("\n"+test);
	console.dir(
		detectProductBrand(test),
		{depth:null}
	);
}