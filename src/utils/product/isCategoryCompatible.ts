export function isCategoryCompatible(
	required?:string[],
	category?:string
){
	if(
		!required?.length||
		!category
	){
		return true;
	}

	return required.some(
		value=>
			value.toLowerCase()===
			category.toLowerCase()
	);
}