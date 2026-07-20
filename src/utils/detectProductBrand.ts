import {
  PRODUCT_BRAND_METADATA,
  type ProductBrandAlias,
} from "../constants/productBrandMetadata";

export interface BrandDetectionResult {
  brand: string;
  matchedAlias: string;
  matchedAliasType: ProductBrandAlias["type"];
  removeFromProductName: boolean;
  productName: string;
  score: number;
}

interface BrandCandidate {
  brand: string;
  alias: ProductBrandAlias;
  normalizedAlias: string;
  score: number;
}

function normalizeText(
  value: string | null | undefined
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function escapeRegExp(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function containsWholeAlias(
  normalizedInput: string,
  normalizedAlias: string
): boolean {
  const pattern = new RegExp(
    `(?:^|\\s)${escapeRegExp(
      normalizedAlias
    )}(?:$|\\s)`,
    "i"
  );

  return pattern.test(normalizedInput);
}

function removeMatchedAlias(
  originalInput: string,
  aliasValue: string
): string {
  const normalizedAliasParts =
    normalizeText(aliasValue).split(" ");

  const flexibleAliasPattern =
    normalizedAliasParts
      .map(escapeRegExp)
      .join("[\\s\\-.'&]*");

  const pattern = new RegExp(
    `(^|\\s)${flexibleAliasPattern}(?=\\s|$)`,
    "i"
  );

  return originalInput
    .replace(pattern, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateCandidateScore(
  alias: ProductBrandAlias,
  normalizedAlias: string
): number {
  const priority = alias.priority ?? 0;

  // Longer aliases should beat shorter ambiguous ones.
  const lengthScore =
    normalizedAlias.length * 10;

  const wordScore =
    normalizedAlias.split(" ").length * 25;

  return priority + lengthScore + wordScore;
}

export function detectProductBrand(
  input: string
): BrandDetectionResult | null {
  const normalizedInput =
    normalizeText(input);

  if (!normalizedInput) {
    return null;
  }

  const candidates: BrandCandidate[] = [];

  for (
    const [brand, metadata]
    of Object.entries(
      PRODUCT_BRAND_METADATA
    )
  ) {
    for (const aliasEntry of metadata.aliases) {
      const alias =
        typeof aliasEntry === "string"
          ? {
              value: aliasEntry,
              removeFromProductName: true,
              priority: 0,
              type: "brand" as const,
            }
          : aliasEntry;

      if (
        !alias ||
        typeof alias.value !== "string"
      ) {
        continue;
      }

      const normalizedAlias =
        normalizeText(alias.value);

      if (
        !normalizedAlias ||
        !containsWholeAlias(
          normalizedInput,
          normalizedAlias
        )
      ) {
        continue;
      }

      candidates.push({
        brand,
        alias,
        normalizedAlias,
        score: calculateCandidateScore(
          alias,
          normalizedAlias
        ),
      });
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return (
      b.normalizedAlias.length -
      a.normalizedAlias.length
    );
  });

  const bestMatch = candidates[0];

  const cleanedProductName =
    bestMatch.alias.removeFromProductName
      ? removeMatchedAlias(
          input,
          bestMatch.alias.value
        ).trim()
      : input.trim();

  const productName =
    cleanedProductName.length > 0
      ? cleanedProductName
      : input.trim();

  return {
    brand: bestMatch.brand,
    matchedAlias: bestMatch.alias.value,
    matchedAliasType: bestMatch.alias.type,
    removeFromProductName:
      bestMatch.alias.removeFromProductName,
    productName,
    score: bestMatch.score,
  };
}