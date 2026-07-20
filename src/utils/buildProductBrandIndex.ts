//shopper-assistant\src\utils\buildProductBrandIndex.ts
import type {
  ProductBrandAliasType,
  ProductBrandMetadata,
  ProductBrandMetadataMap,
} from "../constants/productBrandMetadata.types";

export type ProductBrandMatchType =
  | "brand"
  | "productLine";

export interface CompiledProductBrandMatch {
  brandId: string;
  brandName: string;

  value: string;
  normalizedValue: string;

  matchType: ProductBrandMatchType;
  aliasType: ProductBrandAliasType;

  productLine?: string;

  priority: number;
  strength: "strong" | "normal" | "weak";

  categories: string[];
  subcategories: string[];

  requiresCategoryContext: boolean;
  preserveInProductName: boolean;
}

export function normalizeBrandText(
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
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueStrings(
  values: Array<string | undefined>
): string[] {
  return Array.from(
    new Set(
      values
        .filter(
          (value): value is string =>
            typeof value === "string" &&
            value.trim().length > 0
        )
        .map(value => value.trim())
    )
  );
}

function getAliasPriority(
  aliasType: ProductBrandAliasType
): number {
  switch (aliasType) {
    case "official":
      return 100;

    case "formerName":
      return 85;

    case "abbreviation":
      return 80;

    case "commonName":
      return 75;

    case "nickname":
      return 70;

    case "misspelling":
      return 50;

    default:
      return 0;
  }
}

export function buildProductBrandIndex(
  metadataMap: ProductBrandMetadataMap
): CompiledProductBrandMatch[] {
  const matches: CompiledProductBrandMatch[] = [];

  for (const metadata of Object.values(metadataMap)) {
    addBrandMatches(matches, metadata);
    addProductLineMatches(matches, metadata);
  }

  const uniqueMatches = new Map<
    string,
    CompiledProductBrandMatch
  >();

  for (const match of matches) {
    const key = [
      match.brandId,
      match.matchType,
      match.productLine ?? "",
      match.normalizedValue,
    ].join("::");

    const existing = uniqueMatches.get(key);

    if (
      !existing ||
      match.priority > existing.priority
    ) {
      uniqueMatches.set(key, match);
    }
  }

  return Array.from(uniqueMatches.values()).sort(
    (a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }

      const bWords =
        b.normalizedValue.split(" ").length;

      const aWords =
        a.normalizedValue.split(" ").length;

      if (bWords !== aWords) {
        return bWords - aWords;
      }

      return (
        b.normalizedValue.length -
        a.normalizedValue.length
      );
    }
  );
}

function addBrandMatches(
  matches: CompiledProductBrandMatch[],
  metadata: ProductBrandMetadata
): void {
  const aliases = [
    {
      value: metadata.name,
      type: "official" as const,
      priority: 120,
      strength: "strong" as const,
      requiresCategoryContext: false,
      categories: metadata.categories,
      subcategories: metadata.subcategories,
    },
    ...(metadata.aliases ?? []),
  ];

  for (const alias of aliases) {
    const normalizedValue =
      normalizeBrandText(alias.value);

    if (!normalizedValue) {
      continue;
    }

    matches.push({
      brandId: metadata.id,
      brandName: metadata.name,

      value: alias.value,
      normalizedValue,

      matchType: "brand",
      aliasType: alias.type,

      priority:
        alias.priority ??
        getAliasPriority(alias.type),

      strength: alias.strength ?? "normal",

      categories: uniqueStrings([
        ...(metadata.categories ?? []),
        ...(alias.categories ?? []),
      ]),

      subcategories: uniqueStrings([
        ...(metadata.subcategories ?? []),
        ...(alias.subcategories ?? []),
      ]),

      requiresCategoryContext:
        alias.requiresCategoryContext ?? false,

      preserveInProductName: false,
    });
  }
}

function addProductLineMatches(
  matches: CompiledProductBrandMatch[],
  metadata: ProductBrandMetadata
): void {
  for (
    const productLine
    of Object.values(
      metadata.productLines ?? {}
    )
  ) {
    const aliases = [
      {
        value: productLine.name,
        type: "official" as const,
        priority: 80,
      },
      ...(productLine.aliases ?? []),
    ];

    for (const alias of aliases) {
      const normalizedValue =
        normalizeBrandText(alias.value);

      if (!normalizedValue) {
        continue;
      }

      matches.push({
        brandId: metadata.id,
        brandName: metadata.name,

        value: alias.value,
        normalizedValue,

        matchType: "productLine",
        aliasType: alias.type ?? "official",

        productLine: productLine.name,

        priority: alias.priority ?? 80,
        strength: "normal",

        categories: uniqueStrings([
          ...(metadata.categories ?? []),
          ...(productLine.categories ?? []),
        ]),

        subcategories: uniqueStrings([
          ...(metadata.subcategories ?? []),
          ...(productLine.subcategories ?? []),
        ]),

        requiresCategoryContext: false,

        preserveInProductName:
          productLine.preserveInProductName ??
          true,
      });
    }
  }
}