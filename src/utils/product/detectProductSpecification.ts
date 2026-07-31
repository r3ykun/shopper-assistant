import {PRODUCT_UNIT_METADATA} from "../../constants/units";

export interface DetectedProductSpecification{
	packaging?:string;
	measurement?:number;
	measurementUnit?:string;
	productName:string;
}

function escapeRegExp(value:string){
	return value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
}

export function detectProductSpecification(
	input:string
):DetectedProductSpecification{
	let productName=input.trim();
	let packaging:string|undefined;
	let measurement:number|undefined;
	let measurementUnit:string|undefined;

	const measurementUnits=PRODUCT_UNIT_METADATA
		.filter(unit=>
			unit.group==="Weight"||
			unit.group==="Volume"
		)
		.flatMap(unit=>
			[unit.name,...unit.aliases].map(alias=>({
				alias,
				unit,
			}))
		)
		.sort((a,b)=>b.alias.length-a.alias.length);

	for(const{alias,unit}of measurementUnits){
		const pattern=new RegExp(
			`(?:^|\\s)(\\d+(?:\\.\\d+)?)\\s*${escapeRegExp(alias)}(?=\\s|$)`,
			"i"
		);
		const match=productName.match(pattern);

		if(!match)continue;

		measurement=Number(match[1]);
		measurementUnit=unit.name;
		productName=productName
			.replace(pattern," ")
			.replace(/\s+/g," ")
			.trim();
		break;
	}

	const packagingUnits=PRODUCT_UNIT_METADATA
		.filter(unit=>unit.group==="Packaging")
		.flatMap(unit=>
			[unit.name,...unit.aliases].map(alias=>({
				alias,
				unit,
			}))
		)
		.sort((a,b)=>b.alias.length-a.alias.length);

	for(const{alias,unit}of packagingUnits){
		const pattern=new RegExp(
			`(?:^|\\s)${escapeRegExp(alias)}(?=\\s|$)`,
			"i"
		);

		if(!pattern.test(productName))continue;

		packaging=unit.name;
		productName=productName
			.replace(pattern," ")
			.replace(/\s+/g," ")
			.trim();
		break;
	}

	return{
		packaging,
		measurement,
		measurementUnit,
		productName,
	};
}