// shopper-assistant/src/validateProductBrandMetadata.ts
import {
  normalizeBrandText,
} from "../shopper-assistant/src/utils/buildProductBrandIndex";

import type {
  ProductBrandMetadataMap,
} from "../shopper-assistant/src/constants/productBrandMetadata.types";

export interface ProductBrandMetadataIssue {
  level: "error" | "warning";
  brandId?: string;
  message: string;
}

export function validateProductBrandMetadata(
  metadataMap: ProductBrandMetadataMap
): ProductBrandMetadataIssue[] {
  const issues: ProductBrandMetadataIssue[] = [];

  const knownIds = new Set<string>();
  const globalAliases = new Map<
    string,
    Array<{
      brandId: string;
      value: string;
      requiresContext: boolean;
    }>
  >();

  for (
    const [recordKey, metadata]
    of Object.entries(metadataMap)
  ) {
    if (!metadata.id.trim()) {
      issues.push({
        level: "error",
        brandId: recordKey,
        message: "Brand ID is empty.",
      });
    }

    if (recordKey !== metadata.id) {
      issues.push({
        level: "error",
        brandId: metadata.id,
        message:
          `Object key "${recordKey}" does not match ` +
          `brand ID "${metadata.id}".`,
      });
    }

    if (knownIds.has(metadata.id)) {
      issues.push({
        level: "error",
        brandId: metadata.id,
        message: "Duplicate brand ID.",
      });
    }

    knownIds.add(metadata.id);

    if (!metadata.name.trim()) {
      issues.push({
        level: "error",
        brandId: metadata.id,
        message: "Canonical brand name is empty.",
      });
    }

    if (
      metadata.replacedByBrandId ===
      metadata.id
    ) {
      issues.push({
        level: "error",
        brandId: metadata.id,
        message:
          "A brand cannot replace itself.",
      });
    }

    const localAliases = new Set<string>();

    const aliasValues = [
      metadata.name,
      ...(metadata.aliases ?? []).map(
        alias => alias.value
      ),
    ];

    for (const value of aliasValues) {
      const normalized =
        normalizeBrandText(value);

      if (!normalized) {
        issues.push({
          level: "error",
          brandId: metadata.id,
          message: "An alias is empty.",
        });

        continue;
      }

      if (localAliases.has(normalized)) {
        issues.push({
          level: "warning",
          brandId: metadata.id,
          message:
            `Duplicate normalized alias: "${value}".`,
        });
      }

      localAliases.add(normalized);

      const metadataAlias =
        metadata.aliases?.find(
          alias => alias.value === value
        );

      const globalMatches =
        globalAliases.get(normalized) ?? [];

      globalMatches.push({
        brandId: metadata.id,
        value,
        requiresContext:
          metadataAlias
            ?.requiresCategoryContext ??
          false,
      });

      globalAliases.set(
        normalized,
        globalMatches
      );
    }

    const productLineNames =
      new Set<string>();

    for (
      const productLine
      of Object.values(metadata.productLines ?? [])
    ) {
      const normalizedLine =
        normalizeBrandText(productLine.name);

      if (!normalizedLine) {
        issues.push({
          level: "error",
          brandId: metadata.id,
          message:
            "A product line has an empty name.",
        });

        continue;
      }

      if (
        productLineNames.has(normalizedLine)
      ) {
        issues.push({
          level: "warning",
          brandId: metadata.id,
          message:
            `Duplicate product line: ` +
            `"${productLine.name}".`,
        });
      }

      productLineNames.add(normalizedLine);
    }
  }

  for (
    const [alias, matches]
    of globalAliases.entries()
  ) {
    const distinctBrands = new Set(
      matches.map(match => match.brandId)
    );

    if (distinctBrands.size <= 1) {
      continue;
    }

    const allRequireContext =
      matches.every(
        match => match.requiresContext
      );

    issues.push({
      level: allRequireContext
        ? "warning"
        : "error",

      message:
        `Alias "${alias}" is shared by: ` +
        `${Array.from(distinctBrands).join(", ")}. ` +
        (
          allRequireContext
            ? "Category context is required."
            : "At least one alias lacks context restrictions."
        ),
    });
  }

  for (
    const metadata
    of Object.values(metadataMap)
  ) {
    if (
      metadata.replacedByBrandId &&
      !knownIds.has(
        metadata.replacedByBrandId
      )
    ) {
      issues.push({
        level: "error",
        brandId: metadata.id,
        message:
          `Unknown replacement brand ID: ` +
          `"${metadata.replacedByBrandId}".`,
      });
    }
  }

  return issues;
}