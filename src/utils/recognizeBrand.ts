import { PRODUCT_BRAND_METADATA } from "../constants/productBrandMetadata"
import { BrandCandidate } from "../types/BrandCandidate";
import { scoreBrandAlias } from "./scoreBrandCandidate";
import { rankBrandCandidates } from "./rankBrandCandidates";
import { deduplicateBrandCandidates } from "./deduplicateBrandCandidates";
import { filterContainedBrandCandidates } from "./filterContainedBrandCandidates";


export function recognizeBrand(
  text: string
): BrandCandidate[] {

  const candidates: BrandCandidate[] = [];

  const search = normalize(text);

  for (const brand of Object.values(PRODUCT_BRAND_METADATA)) {

    let bestAlias:
    typeof brand.aliases[number] | undefined;
    let bestLength = -1;

    for (const alias of brand.aliases) {

        const aliasText =
            normalize(alias.value);

        const words =
            search.split(/\s+/);

        const isMatch =
            search === aliasText ||
            words.includes(aliasText) ||
            search.startsWith(aliasText + " ") ||
            search.endsWith(" " + aliasText);

        if (!isMatch) {continue;}
        if (aliasText.length > bestLength) {
            bestAlias = alias;
            bestLength =
            aliasText.length;
        }
    }

    if (bestAlias) {candidates.push({
        brand,
        confidence:
        scoreBrandAlias(text, bestAlias),
        matchType:
        bestAlias.type,
        matchedText:
        bestAlias.value,
    });
    }
  }

    return rankBrandCandidates(
        filterContainedBrandCandidates(
            deduplicateBrandCandidates(candidates)
        )
    );

}

function normalize(
  value: string
): string {

  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}