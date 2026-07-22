import type { BrandMetadata, BrandAliasMetadata } from "./types";

function normalizeAliasValue(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

function addGeneratedAlias(
  brand: BrandMetadata,
  value: string,
  type: BrandAliasMetadata["type"],
  priority: number,
  strength: BrandAliasMetadata["strength"]
): void {
  const normalized = normalizeAliasValue(value);

  if (
    normalized.length < 3 ||
    normalized.toLowerCase() === brand.name.toLowerCase() ||
    brand.aliases.some(
      alias =>
        alias.value.toLowerCase() ===
        normalized.toLowerCase()
    )
  ) {
    return;
  }

  brand.aliases.push({
    value: normalized,
    type,
    priority,
    strength,
  });
}

function generateAutomaticBrandAliases(
  brands: Map<string, BrandMetadata>
): void {
  for (const brand of brands.values()) {
    const name = brand.name;

    const punctuationAsSpaces = name
      .replace(/[.'’`_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    addGeneratedAlias(
      brand,
      punctuationAsSpaces,
      "commonName",
      95,
      "strong"
    );

    const compactName = name
      .replace(/[^a-zA-Z0-9À-ÿ]+/g, "");

    addGeneratedAlias(
      brand,
      compactName,
      "commonName",
      90,
      "strong"
    );

    if (name.includes("&")) {
      addGeneratedAlias(
        brand,
        name.replace(/\s*&\s*/g, " and "),
        "commonName",
        85,
        "normal"
      );
    }

    if (/\band\b/i.test(name)) {
      addGeneratedAlias(
        brand,
        name.replace(/\band\b/gi, "&"),
        "commonName",
        85,
        "normal"
      );
    }

    const withoutPossessive = name
      .replace(/[’']s\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    addGeneratedAlias(
      brand,
      withoutPossessive,
      "commonName",
      85,
      "normal"
    );
  }
}

export function enrichAliases(
  brands: Map<string, BrandMetadata>
) {
  console.log("Running Alias Enrichment...");
}