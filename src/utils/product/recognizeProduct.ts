//shopper-assistant\src\utils\product\recognizeProduct.ts
import {ProductRecognitionResult} from "../../types/ProductRecognitionResult";
import {normalize} from "../normalize";
import {recognizeBrand} from "../brand/recognizeBrand";
import {selectBestBrand} from "../brand/selectBestBrand";
import {recognizeProductLine} from "./recognizeProductLine";
import {findVariant} from "./findVariant";
import {reconstructProductName} from "./reconstructProductName";
import {calculateProductConfidence} from "./calculateProductConfidence";
import {PRODUCT_CONFIDENCE} from "../../constants/productConfidence";

export function recognizeProduct(
	text:string
):ProductRecognitionResult{
	const candidates=recognizeBrand(text);
	const brand=selectBestBrand(candidates,text);

	if(!brand){
		return{
			confidence:0,
		};
	}

	const productLine=recognizeProductLine(
		brand,
		text
	);

	const productLineMetadata=
		productLine
			?Object.values(
				brand.brand.productLines??{}
			).find(
				line=>
					normalize(line.name)===
					normalize(productLine.name)
			)
			:undefined;

	const variant=findVariant(
		brand.brand,
		productLineMetadata,
		text
	);

	const productName=reconstructProductName({
		brand,
		productLine,
		variant,
	});

	const confidence=calculateProductConfidence({
		brand,
		productLine,
		variant,
	});

	if(confidence<PRODUCT_CONFIDENCE.minimum){
		return{
			confidence,
		};
	}

	return{
		brand,
		productLine,
		variant,
		productName,
		confidence,
	};
}