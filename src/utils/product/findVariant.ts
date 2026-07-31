import {ProductBrandMetadata,ProductLineMetadata} from "../../constants/productBrandMetadata.types";
import {normalize} from "../normalize";
import {findVariantByKeyword} from "./findVariantByKeyword";

export function findVariant(
	brand:ProductBrandMetadata,
	productLine:ProductLineMetadata|undefined,
	text:string
){
	const search=normalize(text);

	const variants=[
		...(productLine?.variants??[]),
		...(brand.variants??[])
	];

	let best:{
		name:string;
		confidence:number;
		matchedText:string;
		length:number;
	}|undefined;

	for(const variant of variants){
		const value=normalize(variant.name);

		const matched=
			search===value||
			search.startsWith(value+" ")||
			search.endsWith(" "+value)||
			search.includes(" "+value+" ");

		if(!matched)continue;

		const priority=variant.priority??0;

		const score=
			value.length+
			priority+
			(
				variant.exclusiveToProductLine&&productLine
					?10000
					:0
			);

		if(
			!best||
			score>best.length
		){
			best={
				name:variant.name,
				confidence:1,
				matchedText:variant.name,
				length:score,
			};
		}
	}

	if(best){
		return{
			name:best.name,
			confidence:best.confidence,
			matchedText:best.matchedText,
		};
	}

	return findVariantByKeyword(
		brand,
		productLine,
		text
	);
}