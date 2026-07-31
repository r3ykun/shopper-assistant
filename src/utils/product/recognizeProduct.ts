import {ProductRecognitionResult} from "../../types/ProductRecognitionResult";
import {normalize} from "../normalize";
import {recognizeBrand} from "../brand/recognizeBrand";
import {selectBestBrand} from "../brand/selectBestBrand";
import {recognizeProductLine} from "./recognizeProductLine";
import {findVariant} from "./findVariant";
import {reconstructProductName} from "./reconstructProductName";

export function recognizeProduct(
	text:string
):ProductRecognitionResult{
	const candidates=recognizeBrand(text);
	const brand=selectBestBrand(candidates,text);
	const productLine=recognizeProductLine(brand,text);

	const productLineMetadata=
		brand&&productLine
			?Object.values(
				brand.brand.productLines??{}
			).find(line=>
				normalize(line.name)===
				normalize(productLine.name)
			)
			:undefined;

	const variant=brand
		?findVariant(
			brand.brand,
			productLineMetadata,
			text
		)
		:undefined;

	const productName=reconstructProductName({
		brand,
		productLine,
		variant,
	});

	return{
		brand,
		productLine,
		variant,
		productName,
	};
}