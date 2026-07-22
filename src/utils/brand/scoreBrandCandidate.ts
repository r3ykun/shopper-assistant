import { BRAND_CONFIDENCE } from "../../constants/brandConfidence";

import {
  ProductBrandAlias,
} from "../../constants/productBrandMetadata.types";

import {normalize} from "../normalize";

export function scoreBrandAlias(
  input: string,
  alias: ProductBrandAlias
): number {

  const search = normalize(input);

  const candidate = normalize(alias.value);

  let score =
    BRAND_CONFIDENCE[alias.type] ??
    BRAND_CONFIDENCE.keyword;

  if (search === candidate) {

    score += 0.10;

  } else if (
    search.startsWith(candidate)
  ) {

    score += 0.07;

  } else if (
    search.includes(candidate)
  ) {

    score += 0.05;

  }

  return Math.min(score, 1);

}