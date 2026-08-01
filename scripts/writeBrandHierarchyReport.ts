import {mkdirSync,writeFileSync} from "fs";
import {dirname} from "path";
import {BrandHierarchyCandidate} from "./brandHierarchy.types";

export function writeBrandHierarchyReport(
	outputPath:string,
	candidates:BrandHierarchyCandidate[]
):void{
	mkdirSync(
		dirname(outputPath),
		{recursive:true}
	);

	writeFileSync(
		outputPath,
		JSON.stringify(
			candidates.sort(
				(a,b)=>
					b.confidence-a.confidence||
					a.childName.localeCompare(
						b.childName
					)
			),
			null,
			2
		),
		"utf8"
	);
}