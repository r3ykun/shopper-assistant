//shopper-assistant/src/utils/brand/scoreBrandCandidate.ts
import {BRAND_CONFIDENCE} from "../../constants/brandConfidence";
import {ProductBrandAlias} from "../../constants/productBrandMetadata.types";
import {normalize} from "../normalize";

export function scoreBrandAlias(
	input:string,
	alias:ProductBrandAlias
):number{
	const search=normalize(input);
	const candidate=normalize(alias.value);

	let score=
		BRAND_CONFIDENCE[
			alias.type
		]??
		BRAND_CONFIDENCE.keyword;

	const candidateWords=
		candidate.split(/\s+/);

	const searchWords=
		search.split(/\s+/);

	const matchedWords=
		candidateWords.filter(
			word=>searchWords.includes(word)
		).length;

	const coverage=
		matchedWords/
		candidateWords.length;

	score+=coverage*0.05;

	if(search===candidate){
		score+=0.10;
	}else if(
		search.startsWith(candidate+" ")||
		search.endsWith(" "+candidate)
	){
		score+=0.07;
	}else if(
		search.includes(" "+candidate+" ")
	){
		score+=0.05;
	}

	if(
		search.length>
		candidate.length
	){
		score+=Math.min(
			0.03,
			(search.length-candidate.length)/200
		);
	}

	return Math.min(score,1);
}