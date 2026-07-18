import {
  PRODUCT_BRAND_METADATA,
} from "../constants/productBrandMetadata";

console.log(
  "Product brand metadata:",
  PRODUCT_BRAND_METADATA
);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitleCase(value: string) {
  return value.replace(
    /\b\w/g,
    character => character.toUpperCase()
  );
}

export interface BrandDetectionResult {
  brand: string;
  productName: string;
  matchedAlias: string;
}

export function detectProductBrand(
  text: string
): BrandDetectionResult | null {
  const normalized = normalize(text);

  if (!normalized) {
    return null;
  }

  for (
    const [brand, metadata]
    of Object.entries(
      PRODUCT_BRAND_METADATA
    )
  ) {
    for (const alias of metadata.aliases) {
      const normalizedAlias =
        normalize(alias);

      if (!normalizedAlias) {
        continue;
      }

      const aliasPattern = new RegExp(
        `(^|\\s)${escapeRegExp(
          normalizedAlias
        )}(?=\\s|$)`,
        "i"
      );

      if (!aliasPattern.test(normalized)) {
        continue;
      }

      const cleanedName = normalized
        .replace(aliasPattern, " ")
        .replace(/\s+/g, " ")
        .trim();

      return {
        brand,
        matchedAlias: alias,
        productName:
          toTitleCase(cleanedName),
      };
    }
  }

  return null;
}

function escapeRegExp(value: string) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}