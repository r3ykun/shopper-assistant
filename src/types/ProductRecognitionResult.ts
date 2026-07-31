import {BrandCandidate} from "./BrandCandidate";

export interface ProductRecognitionResult{
	brand?:BrandCandidate;
	productLine?:{
		name:string;
		confidence:number;
		matchedText:string;
	};
	variant?:{
		name:string;
		confidence:number;
		matchedText:string;
	};
	productName?:string;
  confidence:number;
}