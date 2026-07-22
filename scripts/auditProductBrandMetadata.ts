//shopper-assistant\scripts\auditProductBrandMetadata.ts
import { PRODUCT_BRAND_METADATA } from "../src/constants/productBrandMetadata";
import type {
  ProductBrandMetadata,
  ProductLineMetadata,
} from "../src/constants/productBrandMetadata.types";
import {
  PROMOTED_PRODUCT_LINE_EXCEPTIONS,
  promotedProductLineKey,
} from "./auditExceptions";

type Brand = ProductBrandMetadata;

interface AuditResult {
  errors: number;
  warnings: number;
}

const result: AuditResult = {
  errors: 0,
  warnings: 0,
};

const metadataEntries = Object.entries(
  PRODUCT_BRAND_METADATA
) as [string, ProductBrandMetadata][];

const brands = Object.values(
  PRODUCT_BRAND_METADATA
) as ProductBrandMetadata[];

function error(message: string): void {
  result.errors++;
  console.log(`❌ ${message}`);
}

function warning(message: string): void {
  result.warnings++;
  console.log(`⚠️  ${message}`);
}

function success(message: string): void {
  console.log(`✅ ${message}`);
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function compactNormalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]s\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function auditDuplicateIds(): void {
  const seen = new Map<string, string>();

  for (const brand of brands) {
    const existingName = seen.get(brand.id);

    if (existingName) {
      error(
        `Duplicate brand ID "${brand.id}" used by "${existingName}" and "${brand.name}"`
      );
      continue;
    }

    seen.set(brand.id, brand.name);
  }

  success("Duplicate ID audit completed");
}

function auditKeyMatchesId(): void {
  for (const [key, brand] of metadataEntries) {
    if (key !== brand.id) {
      error(
        `Metadata key "${key}" does not match brand ID "${brand.id}"`
      );
    }
  }

  success("Metadata key and ID audit completed");
}

function auditEmptyBrandFields(): void {
  for (const brand of brands) {
    if (!brand.id.trim()) {
      error(`Brand "${brand.name}" has an empty ID`);
    }

    if (!brand.name.trim()) {
      error(`Brand with ID "${brand.id}" has an empty canonical name`);
    }
  }

  success("Required brand field audit completed");
}

function auditDuplicateCanonicalNames(): void {
  const seen = new Map<string, Brand>();

  for (const brand of brands) {
    const normalizedName = normalize(brand.name);
    const existing = seen.get(normalizedName);

    if (existing && existing.id !== brand.id) {
      error(
        `Duplicate canonical name "${brand.name}" used by IDs "${existing.id}" and "${brand.id}"`
      );
      continue;
    }

    seen.set(normalizedName, brand);
  }

  success("Duplicate canonical-name audit completed");
}

function auditEquivalentCanonicalNames(): void {
  const groups = new Map<string, Brand[]>();

  for (const brand of brands) {
    const key = compactNormalize(brand.name);

    if (!key) {
      continue;
    }

    const group = groups.get(key) ?? [];
    group.push(brand);
    groups.set(key, group);
  }

  for (const group of groups.values()) {
    if (group.length <= 1) {
      continue;
    }

    warning(
      `Equivalent canonical brands: ${group
        .map(brand => `"${brand.name}" (${brand.id})`)
        .join(", ")}`
    );
  }

  success("Equivalent canonical-name audit completed");
}

function auditMissingCategories(): void {
  for (const brand of brands) {
    if (!brand.categories || brand.categories.length === 0) {
      warning(`Brand "${brand.name}" has no categories`);
      continue;
    }

    for (const category of brand.categories) {
      if (!category.trim()) {
        error(`Brand "${brand.name}" contains an empty category`);
      }
    }
  }

  success("Missing category audit completed");
}

function auditDuplicateCategories(): void {
  for (const brand of brands) {
    const seen = new Set<string>();

    for (const category of brand.categories ?? []) {
      const normalizedCategory = normalize(category);

      if (!normalizedCategory) {
        error(`Brand "${brand.name}" contains an empty category`);
        continue;
      }

      if (seen.has(normalizedCategory)) {
        error(
          `Duplicate category "${category}" inside brand "${brand.name}"`
        );
        continue;
      }

      seen.add(normalizedCategory);
    }
  }

  success("Duplicate category audit completed");
}

function auditDuplicateSubcategories(): void {
  for (const brand of brands) {
    const seen = new Set<string>();

    for (const subcategory of brand.subcategories ?? []) {
      const normalizedSubcategory = normalize(subcategory);

      if (!normalizedSubcategory) {
        error(`Brand "${brand.name}" contains an empty subcategory`);
        continue;
      }

      if (seen.has(normalizedSubcategory)) {
        error(
          `Duplicate subcategory "${subcategory}" inside brand "${brand.name}"`
        );
        continue;
      }

      seen.add(normalizedSubcategory);
    }
  }

  success("Duplicate subcategory audit completed");
}

function auditDuplicateAliases(): void {
  for (const brand of brands) {
    const seen = new Set<string>();

    for (const alias of brand.aliases ?? []) {
      const normalizedAlias = normalize(alias.value);

      if (!normalizedAlias) {
        error(`Brand "${brand.name}" contains an empty alias`);
        continue;
      }

      if (seen.has(normalizedAlias)) {
        error(
          `Duplicate alias "${alias.value}" inside brand "${brand.name}"`
        );
        continue;
      }

      seen.add(normalizedAlias);
    }
  }

  success("Duplicate alias audit completed");
}

function auditAliasConflicts(): void {
  const aliasOwners = new Map<string, Set<string>>();

  const brandsById = new Map<string, ProductBrandMetadata>(
    brands.map(brand => [brand.id, brand])
  );

  for (const brand of brands) {
    const values: string[] = [
      brand.name,
      ...(brand.aliases ?? []).map(alias => alias.value),
    ];

    for (const value of values) {
      const normalizedValue = normalize(value);

      if (!normalizedValue) {
        continue;
      }

      const owners =
        aliasOwners.get(normalizedValue) ??
        new Set<string>();

      owners.add(brand.id);
      aliasOwners.set(normalizedValue, owners);
    }
  }

  for (const [alias, owners] of aliasOwners.entries()) {
    if (owners.size <= 1) {
      continue;
    }

    const ownerBrands = [...owners]
      .map(ownerId => brandsById.get(ownerId))
      .filter(
        (brand): brand is ProductBrandMetadata =>
          brand !== undefined
      );

    const equivalentKeys = new Set(
      ownerBrands.map(brand =>
        compactNormalize(brand.name)
      )
    );

    if (equivalentKeys.size === 1) {
      continue;
    }

    warning(
      `Alias conflict "${alias}" used by: ${ownerBrands
        .map(
          brand =>
            `"${brand.name}" (${brand.id})`
        )
        .join(", ")}`
    );
  }

  success("Alias conflict audit completed");
}

function auditEmptyProductLines(): void {
  for (const brand of brands) {
    if (
      brand.productLines !== undefined &&
      Object.keys(brand.productLines).length === 0
    ) {
      warning(
        `Brand "${brand.name}" has an empty productLines object`
      );
    }
  }

  success("Empty product-line audit completed");
}

function auditProductLines(): void {
  for (const brand of brands) {
    const productLines = brand.productLines;

    if (!productLines) {
      continue;
    }

    const seenIds = new Set<string>();
    const seenNames = new Set<string>();

    const productLineEntries = Object.entries(
      productLines
    ) as [string, ProductLineMetadata][];

    for (const [lineId, productLine] of productLineEntries) {
      const normalizedLineId = normalize(lineId);
      const normalizedLineName = normalize(
        productLine.name
      );

      if (!normalizedLineId) {
        error(
          `Brand "${brand.name}" has an empty product-line ID`
        );
        continue;
      }

      if (!normalizedLineName) {
        error(
          `Brand "${brand.name}" has product line "${lineId}" without a name`
        );
      }

      if (seenIds.has(normalizedLineId)) {
        error(
          `Duplicate product-line ID "${lineId}" inside brand "${brand.name}"`
        );
      }

      seenIds.add(normalizedLineId);

      if (seenNames.has(normalizedLineName)) {
        error(
          `Duplicate product-line name "${productLine.name}" inside brand "${brand.name}"`
        );
      }

      seenNames.add(normalizedLineName);

      if (
        normalizedLineName === normalize(brand.name)
      ) {
        warning(
          `Product line "${productLine.name}" is identical to parent brand "${brand.name}"`
        );
      }

      const aliasValues = new Set<string>();

      for (const alias of productLine.aliases ?? []) {
        const normalizedAlias = normalize(
          alias.value
        );

        if (!normalizedAlias) {
          error(
            `Product line "${brand.name} > ${productLine.name}" contains an empty alias`
          );
          continue;
        }

        if (aliasValues.has(normalizedAlias)) {
          error(
            `Duplicate product-line alias "${alias.value}" inside "${brand.name} > ${productLine.name}"`
          );
          continue;
        }

        aliasValues.add(normalizedAlias);
      }
    }
  }

  success("Product-line audit completed");
}

function auditPromotedProductLines(): void {
  const canonicalBrandNames =
    new Map<string, ProductBrandMetadata>();

  for (const brand of brands) {
    canonicalBrandNames.set(
      compactNormalize(brand.name),
      brand
    );
  }

  for (const brand of brands) {
    const productLines = brand.productLines;

    if (!productLines) {
      continue;
    }

    const lines = Object.entries(
      productLines
    ) as [string, ProductLineMetadata][];

    for (const [lineId, productLine] of lines) {
      const combinedName = compactNormalize(
        `${brand.name} ${productLine.name}`
      );

      const promotedBrand =
        canonicalBrandNames.get(combinedName);

      if (
        !promotedBrand ||
        promotedBrand.id === brand.id
      ) {
        continue;
      }

      const exceptionKey =
        promotedProductLineKey(
          brand.id,
          lineId,
          promotedBrand.id
        );

      if (
        PROMOTED_PRODUCT_LINE_EXCEPTIONS.has(
          exceptionKey
        )
      ) {
        continue;
      }

      warning(
        `Product line "${brand.name} > ${productLine.name}" also exists as canonical brand "${promotedBrand.name}" (${promotedBrand.id})`
      );
    }
  }

  success("Promoted product-line audit completed");
}

function printHeader(): void {
  console.log();
  console.log("==============================================");
  console.log(" PRODUCT BRAND METADATA AUDIT");
  console.log("==============================================");
  console.log();
  console.log(`Brands: ${brands.length}`);
  console.log();
}

function printSummary(): void {
  console.log();
  console.log("==============================================");
  console.log(`Brands inspected: ${brands.length}`);
  console.log(`Errors: ${result.errors}`);
  console.log(`Warnings: ${result.warnings}`);
  console.log();

  if (result.errors > 0) {
    console.log("❌ AUDIT FAILED");
  } else if (result.warnings > 0) {
    console.log("⚠️  AUDIT PASSED WITH WARNINGS");
  } else {
    console.log("✅ AUDIT PASSED");
  }

  console.log("==============================================");
}

function main(): void {
  printHeader();

  auditDuplicateIds();
  auditKeyMatchesId();
  auditEmptyBrandFields();
  auditDuplicateCanonicalNames();
  auditEquivalentCanonicalNames();
  auditMissingCategories();
  auditDuplicateCategories();
  auditDuplicateSubcategories();
  auditDuplicateAliases();
  auditAliasConflicts();
  auditEmptyProductLines();
  auditProductLines();
  auditPromotedProductLines();

  printSummary();

  if (result.errors > 0) {
    process.exitCode = 1;
  }
}

main();