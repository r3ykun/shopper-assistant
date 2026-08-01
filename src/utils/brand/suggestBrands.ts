//shopper-assistant/src/utils/brand/suggestBrands.ts
import { PRODUCT_BRAND_METADATA } from "../../constants/productBrandMetadata";
import { similarityScore } from "./similarityScore";

export interface BrandSuggestion {

  brand: string;

  score: number;

}

import {normalize} from "../normalize";

export function suggestBrands(
  input: string,
  limit = 5
): BrandSuggestion[] {

  const search =
    normalize(input);

  const suggestions: BrandSuggestion[] = [];

  for (const brand of Object.values(PRODUCT_BRAND_METADATA)) {

    let best = 0;

    for (const alias of brand.aliases) {

      const score =
        similarityScore(
          search,
          normalize(alias.value)
        );

      if (score > best) {
        best = score;
      }

    }

    suggestions.push({

      brand: brand.name,

      score: best,

    });

  }

    return suggestions
        .filter(
            suggestion =>
            suggestion.score >= 0.65
        )
        .sort(
            (a, b) => b.score - a.score
        )
        .slice(0, limit);

}