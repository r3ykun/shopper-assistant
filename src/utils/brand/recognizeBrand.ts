import { PRODUCT_BRAND_METADATA } from "../../constants/productBrandMetadata";
import { BrandCandidate } from "../../types/BrandCandidate";
import { scoreBrandAlias } from "./scoreBrandCandidate";
import { rankBrandCandidates } from "./rankBrandCandidates";
import { deduplicateBrandCandidates } from "./deduplicateBrandCandidates";
import { filterContainedBrandCandidates } from "./filterContainedBrandCandidates";
import { similarityScore } from "./similarityScore";

export function recognizeBrand(
  text: string
): BrandCandidate[] {

  const candidates: BrandCandidate[] = [];

  const search = normalize(text);

  for (const brand of Object.values(PRODUCT_BRAND_METADATA)) {

    if (!brand.aliases?.length) {
      continue;
    }

    let bestAlias:
      typeof brand.aliases[number]
      | undefined;

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

      if (!isMatch) {
        continue;
      }

      if (
        aliasText.length >
        bestLength
      ) {

        bestAlias = alias;
        bestLength =
          aliasText.length;

      }

    }

    if (bestAlias) {

      candidates.push({

        brand,

        confidence:
          scoreBrandAlias(
            text,
            bestAlias
          ),

        matchType:
          bestAlias.type,

        matchedText:
          bestAlias.value,

      });

      continue;

    }

    let bestScore = 0;

    let bestFuzzyAlias:
      typeof brand.aliases[number]
      | undefined;

    for (const alias of brand.aliases) {

      const score =
        similarityScore(
          search,
          normalize(alias.value)
        );

      if (score > bestScore) {

        bestScore = score;
        bestFuzzyAlias = alias;

      }

    }

    if (
      bestFuzzyAlias &&
      bestScore >= 0.80
    ) {

      candidates.push({

        brand,

        confidence:
          bestScore,

        matchType:
          "fuzzy",

        matchedText:
          bestFuzzyAlias.value,

      });

    }

  }

  return rankBrandCandidates(

    filterContainedBrandCandidates(

      deduplicateBrandCandidates(
        candidates
      )

    ),

    text

  );

}

import {normalize} from "../normalize";