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
		...(brand.variants??[]),
	];

	for(const variant of variants){

		const value=normalize(variant.name);

		const matched=
			search===value||
			search.startsWith(value+" ")||
			search.endsWith(" "+value)||
			search.includes(" "+value+" ");

		if(matched){
			return{
				name:variant.name,
				confidence:1,
				matchedText:variant.name,
			};
		}
	}

  return findVariantByKeyword(
    brand,
    productLine,
    text
  );
}