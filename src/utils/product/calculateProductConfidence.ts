//shopper-assistant/src/utils/product/calculateProductConfidence.ts
import {BrandCandidate} from "../../types/BrandCandidate";

interface Args{
	brand?:BrandCandidate;
	productLine?:unknown;
	variant?:unknown;
}

export function calculateProductConfidence({
	brand,
	productLine,
	variant,
}:Args){
	let score=0;

	if(brand){
		score+=0.60*brand.confidence;
	}

	if(productLine){
		score+=0.25;
	}

	if(variant){
		score+=0.15;
	}

	return Math.min(score,1);
}