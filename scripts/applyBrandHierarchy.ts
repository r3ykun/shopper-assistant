import {BrandHierarchyCandidate} from "./brandHierarchy.types";

interface ProductLineMetadata{
	name:string;
	aliases?:string[];
	categories?:string[];
	subcategories?:string[];
	preserveInProductName?:boolean;
	keywords?:string[];
	variants?:unknown[];
}

interface MutableBrandMetadata{
	id:string;
	name:string;
	categories:string[];
	subcategories:string[];
	productLines:Record<string,ProductLineMetadata>;
}

function slugify(value:string):string{
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g,"")
		.replace(/&/g," and ")
		.replace(/[^a-z0-9]+/g,"-")
		.replace(/^-+|-+$/g,"");
}

function addUnique(
	values:string[],
	value:string
):void{
	const normalized=value.toLowerCase();

	if(
		values.some(
			item=>item.toLowerCase()===normalized
		)
	){
		return;
	}

	values.push(value);
}

export function applyBrandHierarchy(
	brands:Map<string,MutableBrandMetadata>,
	relations:BrandHierarchyCandidate[]
):Set<string>{
	const removedChildIds=new Set<string>();

	for(const relation of relations){
		const parent=brands.get(
			relation.parentId
		);

		const child=brands.get(
			relation.childId
		);

		if(!parent||!child)continue;

		const key=slugify(
			relation.productLineName
		);

		const line=
			parent.productLines[key]??{
				name:relation.productLineName,
				aliases:[],
				categories:[],
				subcategories:[],
				keywords:[],
				variants:[],
				preserveInProductName:true,
			};

		line.aliases??=[];
		line.categories??=[];
		line.subcategories??=[];
		line.keywords??=[];
		line.variants??=[];

		addUnique(
			line.aliases,
			child.name
		);

		for(const category of child.categories){
			addUnique(
				line.categories,
				category
			);
			addUnique(
				parent.categories,
				category
			);
		}

		for(const subcategory of child.subcategories){
			addUnique(
				line.subcategories,
				subcategory
			);
			addUnique(
				parent.subcategories,
				subcategory
			);
		}

		parent.productLines[key]=line;
		removedChildIds.add(child.id);
	}

	for(const childId of removedChildIds){
		brands.delete(childId);
	}

	return removedChildIds;
}