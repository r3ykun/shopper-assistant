import fs from "node:fs";
import path from "node:path";

import {
  PRODUCT_CATEGORY_ALIASES,
} from "./src/constants/productCategoryAliases";

import {
  SHOPPING_ALIASES,
} from "./src/constants/shoppingAliases";

interface SubcategoryMetadataItem {
  category: string;
  productKeywords: string[];
  shoppingAliases: string[];
}

const normalize = (value: string): string =>
  value.trim().toLowerCase();

const unique = (values: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();

    if (!trimmed) {
      continue;
    }

    const normalized = normalize(trimmed);

    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    result.push(trimmed);
  }

  return result;
};

const metadata: Record<
  string,
  SubcategoryMetadataItem
> = {};

for (const entry of PRODUCT_CATEGORY_ALIASES) {
  const existing = metadata[entry.subcategory];

  if (existing) {
    /*
     * Normally, a subcategory should belong to only
     * one category. Warn when conflicting data exists.
     */
    if (existing.category !== entry.category) {
      console.warn(
        [
          `Duplicate subcategory "${entry.subcategory}"`,
          `found under "${existing.category}"`,
          `and "${entry.category}".`,
        ].join(" ")
      );
    }

    existing.productKeywords = unique([
      ...existing.productKeywords,
      ...entry.keywords,
    ]);

    continue;
  }

  metadata[entry.subcategory] = {
    category: entry.category,

    productKeywords: unique([
      entry.subcategory,
      ...entry.keywords,
    ]),

    shoppingAliases: [],
  };
}

/*
 * SHOPPING_ALIASES already includes:
 *
 * 1. Product keywords imported from
 *    productCategoryAliases.ts
 *
 * 2. EXTRA_SHOPPING_ALIASES
 *
 * We remove product keywords here so
 * shoppingAliases contains only the additional
 * shopping-list vocabulary.
 */
for (
  const [subcategory, aliases]
  of Object.entries(SHOPPING_ALIASES)
) {
  const existing = metadata[subcategory];

  if (!existing) {
    console.warn(
      `Shopping aliases found for unknown subcategory: "${subcategory}"`
    );

    continue;
  }

  const productKeywordSet = new Set(
    existing.productKeywords.map(normalize)
  );

  existing.shoppingAliases = unique(
    aliases.filter(
      alias =>
        !productKeywordSet.has(
          normalize(alias)
        )
    )
  );
}

/*
 * Sort by category, then subcategory,
 * so the generated file is easier to maintain.
 */
const sortedEntries =
  Object.entries(metadata).sort(
    ([subcategoryA, dataA], [subcategoryB, dataB]) => {
      const categoryComparison =
        dataA.category.localeCompare(
          dataB.category
        );

      if (categoryComparison !== 0) {
        return categoryComparison;
      }

      return subcategoryA.localeCompare(
        subcategoryB
      );
    }
  );

const serializeArray = (
  values: string[],
  indentation: string
): string => {
  if (values.length === 0) {
    return "[]";
  }

  const items = values
    .map(
      value =>
        `${indentation}${JSON.stringify(value)},`
    )
    .join("\n");

  return `[\n${items}\n${indentation.slice(0, -2)}]`;
};

const entriesSource = sortedEntries
  .map(([subcategory, data]) => {
    const productKeywords =
      serializeArray(
        data.productKeywords,
        "      "
      );

    const shoppingAliases =
      serializeArray(
        data.shoppingAliases,
        "      "
      );

    return [
      `  ${JSON.stringify(subcategory)}: {`,
      `    category: ${JSON.stringify(data.category)},`,
      `    productKeywords: ${productKeywords},`,
      `    shoppingAliases: ${shoppingAliases},`,
      `  },`,
    ].join("\n");
  })
  .join("\n\n");

const output = `/**
 * Single source of truth for product-category detection
 * and shopping-list matching.
 *
 * This file was generated from:
 * - productCategoryAliases.ts
 * - shoppingAliases.ts
 */

export interface SubcategoryMetadataItem {
  category: string;

  /**
   * Product names, brands, product families,
   * and direct subcategory terms used when
   * automatically categorizing a product.
   */
  productKeywords: string[];

  /**
   * Additional natural-language terms used
   * when matching shopping-list entries.
   */
  shoppingAliases: string[];
}

export const SUBCATEGORY_METADATA: Record<
  string,
  SubcategoryMetadataItem
> = {
${entriesSource}
};

/**
 * Returns every term that may represent a
 * subcategory in a shopping-list entry.
 */
export const getShoppingTerms = (
  subcategory: string
): string[] => {
  const metadata =
    SUBCATEGORY_METADATA[subcategory];

  if (!metadata) {
    return [];
  }

  return [
    subcategory,
    ...metadata.productKeywords,
    ...metadata.shoppingAliases,
  ];
};
`;

const outputPath = path.resolve(
  process.cwd(),
  "src/constants/subcategoryMetadata.ts"
);

fs.writeFileSync(
  outputPath,
  output,
  "utf8"
);

console.log(
  `Created ${outputPath}`
);

console.log(
  `Merged ${sortedEntries.length} subcategories.`
);