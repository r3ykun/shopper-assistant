import assert from "node:assert/strict";

import {
  PRODUCT_BRAND_METADATA,
} from "../../src/constants/productBrandMetadata";

interface AliasMetadata {
  value: string;
  type: string;
  priority?: number;
  strength?: string;
}

interface ProductLineMetadata {
  name?: string;
  aliases?: AliasMetadata[];
}

interface VariantMetadata {
  name: string;
  aliases?: string[];
  categories?: string[];
  subcategories?: string[];
  keywords?: string[];
}

interface BrandMetadata {
  id: string;
  name: string;
  aliases: AliasMetadata[];
  categories?: string[];
  subcategories?: string[];
  productLines?: Record<string, ProductLineMetadata>;
  variants?: VariantMetadata[];
  keywords?: string[];
}

const EXPECTED = {
  canonicalBrands: 4393,
  productLines: 208,
  variants: 18,
  generatedAliases: 12,
} as const;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function countProductLines(
  brands: BrandMetadata[]
): number {
  return brands.reduce(
    (total, brand) =>
      total +
      Object.keys(
        brand.productLines ?? {}
      ).length,
    0
  );
}

function countVariants(
  brands: BrandMetadata[]
): number {
  return brands.reduce(
    (total, brand) =>
      total + (brand.variants?.length ?? 0),
    0
  );
}

function countKeywords(
  brands: BrandMetadata[]
): number {
  return brands.reduce(
    (total, brand) => {
      let count = brand.keywords?.length ?? 0;

      count += Object.values(
        brand.productLines ?? {}
      ).reduce(
        (sum, line: any) =>
          sum + (line.keywords?.length ?? 0),
        0
      );

      count += (brand.variants ?? []).reduce(
        (sum, variant) =>
          sum + (variant.keywords?.length ?? 0),
        0
      );

      return total + count;
    },
    0
  );
}

function countGeneratedAliases(
  brands: BrandMetadata[]
): number {
  return brands.reduce(
    (total, brand) =>
      total +
      brand.aliases.filter(
        alias =>
          alias.type !== "official"
      ).length,
    0
  );
}

function validateBrand(
  key: string,
  brand: BrandMetadata
): void {
  assert.ok(
    brand.id,
    `Brand "${key}" has no ID.`
  );

  assert.equal(
    key,
    brand.id,
    `Metadata key "${key}" does not match ID "${brand.id}".`
  );

  assert.ok(
    brand.name.trim(),
    `Brand "${key}" has an empty name.`
  );

  assert.ok(
    Array.isArray(brand.aliases),
    `Brand "${key}" has no aliases array.`
  );

  const officialAlias =
    brand.aliases.find(
      alias => alias.type === "official"
    );

  assert.ok(
    officialAlias,
    `Brand "${brand.name}" has no official alias.`
  );

  assert.equal(
    officialAlias.value,
    brand.name,
    `Official alias does not match the name of "${brand.name}".`
  );

    const aliasKeys = brand.aliases.map(
    alias =>
        `${alias.type}|${alias.value.toLowerCase()}`
    );

    assert.equal(
    new Set(aliasKeys).size,
    aliasKeys.length,
    `Brand "${brand.name}" has duplicate alias entries.`
    );

  const productLineIds = Object.keys(
    brand.productLines ?? {}
  );

  assert.equal(
    new Set(productLineIds).size,
    productLineIds.length,
    `Brand "${brand.name}" has duplicate product-line IDs.`
  );

  for (const variant of brand.variants ?? []) {
    assert.ok(
      variant.name.trim(),
      `Brand "${brand.name}" has a variant with an empty name.`
    );

    assert.notEqual(
      normalize(variant.name),
      normalize(brand.name),
      `Brand "${brand.name}" contains itself as a variant.`
    );
  }
}

function testRequiredBrands(
  metadata: Record<string, BrandMetadata>
): void {
  const requiredBrands = [
    "3m",
    "7up",
    "coca-cola",
    "nescafe",
  ];

  for (const id of requiredBrands) {
    assert.ok(
      metadata[id],
      `Expected canonical brand "${id}" was not generated.`
    );
  }

  assert.equal(
    metadata["coca-cola"].name,
    "Coca-Cola"
  );

  assert.equal(
    metadata["nescafe"].name,
    "Nescafé"
  );
}

function main(): void {
  const metadata =
    PRODUCT_BRAND_METADATA as Record<
      string,
      BrandMetadata
    >;

  const entries = Object.entries(metadata);
  const brands = Object.values(metadata);

  assert.equal(
    entries.length,
    EXPECTED.canonicalBrands,
    [
      "Canonical-brand count changed.",
      `Expected: ${EXPECTED.canonicalBrands}`,
      `Received: ${entries.length}`,
    ].join("\n")
  );

  for (const [key, brand] of entries) {
    validateBrand(key, brand);
  }

  testRequiredBrands(metadata);

  const productLineCount =
    countProductLines(brands);

  const variantCount =
    countVariants(brands);

  const keywordCount =
    countKeywords(brands);

  const aliasCount =
    countGeneratedAliases(brands);

  assert.equal(
    productLineCount,
    EXPECTED.productLines,
    `Product-line count changed: expected ${EXPECTED.productLines}, received ${productLineCount}.`
  );

  assert.equal(
    variantCount,
    EXPECTED.variants,
    `Variant count changed: expected ${EXPECTED.variants}, received ${variantCount}.`
  );

    console.log("Keyword count:", keywordCount);    

  assert.equal(
    aliasCount,
    EXPECTED.generatedAliases,
    `Generated-alias count changed: expected ${EXPECTED.generatedAliases}, received ${aliasCount}.`
  );

  console.log("");
  console.log("Brand metadata regression tests passed.");
  console.log(`Canonical brands: ${entries.length}`);
  console.log(`Product lines: ${productLineCount}`);
  console.log(`Variants: ${variantCount}`);
  console.log(`Keywords: ${keywordCount}`);
  console.log(`Generated aliases: ${aliasCount}`);
}

main();