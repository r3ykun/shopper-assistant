import {BrandCandidate} from "../../types/BrandCandidate";

interface ReconstructProductNameArgs{
	brand?:BrandCandidate;
	productLine?:{
		name:string;
	};
	variant?:{
		name:string;
	};
}

export function reconstructProductName({
	brand,
	productLine,
	variant,
}:ReconstructProductNameArgs){
	const parts:string[]=[];

	const append=(value?:string)=>{
		if(!value)return;

		const normalized=value.toLowerCase();

		if(parts.some(
			part=>part.toLowerCase()===normalized
		)){
			return;
		}

		parts.push(value);
	};

	append(brand?.brand.name);
	append(productLine?.name);
	append(variant?.name);

	return parts
        .join(" ")
        .replace(/\s+/g," ")
        .replace(/\s+([-/])/g,"$1")
        .replace(/([-/])\s+/g,"$1")
        .trim();
}