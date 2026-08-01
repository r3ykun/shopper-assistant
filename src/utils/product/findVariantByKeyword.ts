// shopper-assistant/src/utils/product/findVariantByKeyword.ts
import {ProductBrandMetadata,ProductLineMetadata} from "../../constants/productBrandMetadata.types";
import {normalize} from "../normalize";

export function findVariantByKeyword(
	brand:ProductBrandMetadata,
	productLine:ProductLineMetadata|undefined,
	text:string
){
	const search=normalize(text);

	const variants=productLine?.variants??brand.variants??[];

	let best:{
		name:string;
		matchedText:string;
		score:number;
	}|undefined;

	for(const variant of variants){
		for(const keyword of variant.keywords??[]){
			const value=normalize(keyword);

			if(value.length<4)continue;

			const matched=
				search===value||
				search.startsWith(value+" ")||
				search.endsWith(" "+value)||
				search.includes(" "+value+" ");

			if(!matched)continue;

			let score=
				value.length+
				(variant.priority??0);

			if(
				variant.exclusiveToProductLine&&
				productLine
			){
				score+=10000;
			}

			if(
				productLine?.variants?.includes(variant)
			){
				score+=1000;
			}

			if(!best||score>best.score){
				best={
					name:variant.name,
					matchedText:keyword,
					score,
				};
			}
		}
	}

	if(!best)return;

	return{
		name:best.name,
		confidence:.9,
		matchedText:best.matchedText,
	};
}