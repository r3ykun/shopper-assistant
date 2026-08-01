export type BrandHierarchyRelationType=
	|"prefix"
	|"normalized-prefix"
	|"family-stem"
	|"descriptor-child"
	|"category-context";

export interface BrandHierarchyCandidate{
	parentId:string;
	parentName:string;
	childId:string;
	childName:string;
	productLineName:string;
	confidence:number;
	reasons:BrandHierarchyRelationType[];
}

export interface BrandHierarchyResult{
	confirmed:BrandHierarchyCandidate[];
	ambiguous:BrandHierarchyCandidate[];
}