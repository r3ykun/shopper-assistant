// shopper-assistant/src/utils/product/rankProductRecognition.ts
import {ProductRecognitionResult} from "../../types/ProductRecognitionResult";

export function rankProductRecognition(
	results:ProductRecognitionResult[]
){
	return results.sort((a,b)=>{
		if(b.confidence!==a.confidence){
			return b.confidence-a.confidence;
		}

		const aSpecificity=
			Number(!!a.variant)+
			Number(!!a.productLine);

		const bSpecificity=
			Number(!!b.variant)+
			Number(!!b.productLine);

		if(bSpecificity!==aSpecificity){
			return bSpecificity-aSpecificity;
		}

		return(
			(b.productName?.length??0)-
			(a.productName?.length??0)
		);
	});
}