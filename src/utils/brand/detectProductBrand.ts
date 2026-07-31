//shopper-assistant\src\utils\brand\detectProductBrand.ts
import {
  PRODUCT_BRAND_METADATA,
} from "../../constants/productBrandMetadata";

import {
  buildProductBrandIndex,
  normalizeBrandText,
  type CompiledProductBrandMatch,
} from "../buildProductBrandIndex";

export interface BrandDetectionContext {
  category?: string;
  subcategory?: string;
}

export interface BrandDetectionResult {
  brandId: string;
  brand: string;

  matchedAlias: string;
  matchedAliasType:
    | "official"
    | "abbreviation"
    | "commonName"
    | "nickname"
    | "formerName"
    | "misspelling";

  matchType: "brand" | "productLine";

  productLine?: string;
  matchedProductLineAlias?: string;

  removeFromProductName: boolean;
  productName: string;

  score: number;
}

interface BrandCandidate {
  match: CompiledProductBrandMatch;
  score: number;
}

const PRODUCT_BRAND_INDEX =
  buildProductBrandIndex(
    PRODUCT_BRAND_METADATA
  );

function escapeRegExp(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function containsWholeMatch(
  normalizedInput: string,
  normalizedValue: string
): boolean {
  const pattern = new RegExp(
    `(?:^|\\s)${escapeRegExp(
      normalizedValue
    )}(?:$|\\s)`,
    "i"
  );

  return pattern.test(normalizedInput);
}

function valuesMatch(
  expected: string,
  actual?: string
): boolean {
  if (!actual) {
    return false;
  }

  return (
    normalizeBrandText(expected) ===
    normalizeBrandText(actual)
  );
}

function matchesContext(
  match: CompiledProductBrandMatch,
  context?: BrandDetectionContext
): boolean {
  const hasCategoryContext =
    Boolean(
      context?.category &&
      match.categories.some(category =>
        valuesMatch(
          category,
          context.category
        )
      )
    );

  const hasSubcategoryContext =
    Boolean(
      context?.subcategory &&
      match.subcategories.some(
        subcategory =>
          valuesMatch(
            subcategory,
            context.subcategory
          )
      )
    );

  if (
    match.requiresCategoryContext &&
    !hasCategoryContext &&
    !hasSubcategoryContext
  ) {
    return false;
  }

  return true;
}

function calculateCandidateScore(
  match: CompiledProductBrandMatch,
  context?: BrandDetectionContext
): number {
  let score = match.priority;

  score +=
    match.normalizedValue.length * 10;

  score +=
    match.normalizedValue.split(" ")
      .length * 25;

  if (match.strength === "strong") {
    score += 40;
  }

  if (match.strength === "normal") {
    score += 20;
  }

  if (match.strength === "weak") {
    score -= 20;
  }

  if (
    context?.category &&
    match.categories.some(category =>
      valuesMatch(
        category,
        context.category
      )
    )
  ) {
    score += 60;
  }

  if (
    context?.subcategory &&
    match.subcategories.some(
      subcategory =>
        valuesMatch(
          subcategory,
          context.subcategory
        )
    )
  ) {
    score += 80;
  }

  if (match.matchType === "brand") {
    score += 30;
  }

  return score;
}

function removeMatchedValue(
	originalInput:string,
	matchValue:string
):string{
	const exactPattern=escapeRegExp(
		matchValue.trim()
	).replace(/\s+/g,"\\s+");

	const exactRegex=new RegExp(
		`(^|\\s)${exactPattern}(?=\\s|$)`,
		"gi"
	);

	const exactResult=originalInput
		.replace(exactRegex," ")
		.replace(/\s+/g," ")
		.trim();

	if(exactResult!==originalInput.trim()){
		return exactResult;
	}

	const normalizedParts=normalizeBrandText(
		matchValue
	)
		.split(/\s+/)
		.filter(Boolean);

	if(normalizedParts.length===0){
		return originalInput.trim();
	}

	const flexiblePattern=normalizedParts
		.map(part=>{
			if(part==="and"){
				return "(?:and|&)";
			}

			return escapeRegExp(part);
		})
		.join("[\\s\\-.'&+]*");

	const flexibleRegex=new RegExp(
		`(^|\\s)${flexiblePattern}(?=\\s|$)`,
		"gi"
	);

	return originalInput
		.replace(flexibleRegex," ")
		.replace(/\s+([,.;:!?])/g,"$1")
		.replace(/\s+/g," ")
		.replace(/^[,.;:!?\s-]+|[,.;:!?\s-]+$/g,"")
		.trim();
}

function sortCandidates(
  candidates: BrandCandidate[]
): BrandCandidate[] {
  return candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (
      b.match.normalizedValue.length !==
      a.match.normalizedValue.length
    ) {
      return (
        b.match.normalizedValue.length -
        a.match.normalizedValue.length
      );
    }

    return a.match.brandName.localeCompare(
      b.match.brandName
    );
  });
}

export function detectProductBrand(
  input: string,
  context?: BrandDetectionContext
): BrandDetectionResult | null {

  const normalizedInput =
    normalizeBrandText(input);

  if (!normalizedInput) {
    return null;
  }

  const brandCandidates: BrandCandidate[] =
    [];

  for (
    const match
    of PRODUCT_BRAND_INDEX
  ) {
    if (match.matchType !== "brand") {
      continue;
    }

    if (
      !containsWholeMatch(
        normalizedInput,
        match.normalizedValue
      )
    ) {
      continue;
    }

    if (
      !matchesContext(
        match,
        context
      )
    ) {
      continue;
    }

    brandCandidates.push({
      match,
      score: calculateCandidateScore(
        match,
        context
      ),
    });
  }

  if (brandCandidates.length === 0) {
    return null;
  }

  const bestBrand =
    sortCandidates(
      brandCandidates
    )[0];

  const productLineCandidates:
    BrandCandidate[] = [];

  for (
    const match
    of PRODUCT_BRAND_INDEX
  ) {
    if (
      match.matchType !==
      "productLine"
    ) {
      continue;
    }

    if (
      match.brandId !==
      bestBrand.match.brandId
    ) {
      continue;
    }

    if (
      !containsWholeMatch(
        normalizedInput,
        match.normalizedValue
      )
    ) {
      continue;
    }

    if (
      !matchesContext(
        match,
        context
      )
    ) {
      continue;
    }

    productLineCandidates.push({
      match,
      score: calculateCandidateScore(
        match,
        context
      ),
    });
  }

  const bestProductLine =
    productLineCandidates.length > 0
      ? sortCandidates(
          productLineCandidates
        )[0]
      : undefined;

  const shouldRemoveBrand=true;

  const cleanedProductName =
    shouldRemoveBrand
      ? removeMatchedValue(
          input,
          bestBrand.match.value
        )
      : input.trim();

  return {
    brandId:
      bestBrand.match.brandId,

    brand:
      bestBrand.match.brandName,

    matchedAlias:
      bestBrand.match.value,

    matchedAliasType:
      bestBrand.match.aliasType,

    matchType: "brand",

    productLine:
      bestProductLine
        ?.match.productLine,

    matchedProductLineAlias:
      bestProductLine
        ?.match.value,

    removeFromProductName:
      shouldRemoveBrand,

    productName:
      cleanedProductName.length > 0
        ? cleanedProductName
        : input.trim(),

    score:
      bestBrand.score +
      (bestProductLine?.score ?? 0),
  };
}