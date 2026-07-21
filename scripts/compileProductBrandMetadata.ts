import { writeFileSync } from "fs";
import { resolve } from "path";
import { PRODUCT_BRANDS } from "../src/constants/brands";

interface LegacyBrand {
  category: string;
  brand: string;
}

interface ProductLineMetadata {
  aliases: string[];
}

export interface BrandAliasMetadata {
  value: string;
  type: "official" | "abbreviation" | "commonName" | "nickname" | "formerName" | "misspelling";
  priority?: number;
  strength?: "strong" | "normal" | "weak";
}

export interface BrandMetadata {
  id: string;
  name: string;
  aliases: BrandAliasMetadata[];
  categories: string[];
  subcategories: string[];
  productLines: Record<string, ProductLineMetadata>;
}

interface ProductLineExtractionResult {
  confirmedChildIds: Set<string>;
  confirmedRelations: number;
}

interface ProductLineCandidate {
  parentId: string;
  childId: string;

  parentName: string;
  childName: string;

  lineName: string;

  confidence: number;

  reasons: string[];
}

const OUTPUT = resolve(
  __dirname,
  "../src/constants/productBrandMetadata.ts"
);

function scoreProductLineCandidate(
  parent: BrandMetadata,
  child: BrandMetadata,
  lineName: string
): ProductLineCandidate {

  let confidence = 0;

  const reasons: string[] = [];

  if (sharesCategory(parent, child)) {
    confidence += 40;
    reasons.push("same-category");
  }

  if (lineName.length >= 4) {
    confidence += 20;
    reasons.push("reasonable-length");
  }

  if (!lineName.includes("&")) {
    confidence += 10;
    reasons.push("no-ampersand");
  }

  if (!/\d/.test(lineName)) {
    confidence += 10;
    reasons.push("no-numbers");
  }

  if (
    !REJECTED_PRODUCT_LINE_SUFFIXES.has(
      lineName.toLowerCase()
    )
  ) {
    confidence += 20;
    reasons.push("not-blacklisted");
  }

  return {
    parentId: parent.id,
    childId: child.id,

    parentName: parent.name,
    childName: child.name,

    lineName,

    confidence,

    reasons,
  };
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[™®]/g, "")
    .replace(/\s+\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ")")
    .trim();
}

function buildLegacyBrands(): LegacyBrand[] {
  const result: LegacyBrand[] = [];

  for (const [category, brands] of Object.entries(PRODUCT_BRANDS)) {
    for (const brand of brands) {
      const normalized = normalizeText(brand);

      if (!normalized) continue;

      result.push({
        category,
        brand: normalized,
      });
    }
  }

  return result;
}

function uniqueLegacyBrands(
  brands: LegacyBrand[]
): LegacyBrand[] {
  const seen = new Set<string>();

  return brands.filter(item => {
    const key = `${item.category}|${item.brand}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function quote(value: string): string {
  return JSON.stringify(value);
}

function indentLines(lines: string[], spaces: number): string[] {
  const indentation = " ".repeat(spaces);

  return lines.map(line =>
    line ? `${indentation}${line}` : line
  );
}

function generateProductLine(
  lineName: string,
  brand: BrandMetadata
): string[] {
  const lineId = slugify(lineName);

  const lines = [
    `${quote(lineId)}: {`,
    `  name: ${quote(lineName)},`,
    "  aliases: [",
    "    {",
    `      value: ${quote(lineName)},`,
    '      type: "official",',
    "      priority: 90,",
    "    },",
    "  ],",
  ];

  if (brand.categories.length > 0) {
    lines.push(
      `  categories: ${JSON.stringify(
        [...brand.categories].sort((a, b) =>
          a.localeCompare(b)
        )
      )},`
    );
  }

  if (brand.subcategories.length > 0) {
    lines.push(
      `  subcategories: ${JSON.stringify(
        [...brand.subcategories].sort((a, b) =>
          a.localeCompare(b)
        )
      )},`
    );
  }

  lines.push(
    "  preserveInProductName: true,",
    "},"
  );

  return lines;
}

function generateBrandEntry(
  brand: BrandMetadata
): string[] {
  const lines: string[] = [
    `${quote(brand.id)}: {`,
    `  id: ${quote(brand.id)},`,
    `  name: ${quote(brand.name)},`,
    "  aliases: [",
    "    {",
    `      value: ${quote(brand.name)},`,
    '      type: "official",',
    "      priority: 100,",
    '      strength: "strong",',
    "    },",
  ];

  const aliases = [...brand.aliases]
    .filter(
      alias =>
        alias.value.toLowerCase() !==
        brand.name.toLowerCase()
    )
    .sort((a, b) =>
      a.value.localeCompare(b.value)
    );

  for (const alias of aliases) {
    lines.push(
      "    {",
      `      value: ${quote(alias.value)},`,
      `      type: ${quote(alias.type)},`
    );

    if (alias.priority !== undefined) {
      lines.push(
        `      priority: ${alias.priority},`
      );
    }

    if (alias.strength !== undefined) {
      lines.push(
        `      strength: ${quote(alias.strength)},`
      );
    }

    lines.push("    },");
  }

  lines.push("  ],");

  const productLines = Object.keys(
    brand.productLines
  ).sort((a, b) =>
    a.localeCompare(b)
  );

  if (productLines.length > 0) {
    lines.push("  productLines: {");

    for (const lineName of productLines) {
      lines.push(
        ...indentLines(
          generateProductLine(
            lineName,
            brand
          ),
          4
        )
      );
    }

    lines.push("  },");
  }

  if (brand.categories.length > 0) {
    const categories = [
      ...brand.categories,
    ].sort((a, b) =>
      a.localeCompare(b)
    );

    lines.push(
      `  categories: ${JSON.stringify(categories)},`
    );
  }

  if (brand.subcategories.length > 0) {
    const subcategories = [
      ...brand.subcategories,
    ].sort((a, b) =>
      a.localeCompare(b)
    );

    lines.push(
      `  subcategories: ${JSON.stringify(subcategories)},`
    );
  }

  lines.push("},");

  return lines;
}

function validateBrandIds(
  brands: BrandMetadata[]
): void {
  const usedIds = new Map<string, string>();

  for (const brand of brands) {
    if (!brand.id) {
      throw new Error(
        `Unable to generate an ID for brand: ${brand.name}`
      );
    }

    const existing = usedIds.get(brand.id);

    if (existing && existing !== brand.name) {
      throw new Error(
        `Duplicate brand ID "${brand.id}" for "${existing}" and "${brand.name}".`
      );
    }

    usedIds.set(brand.id, brand.name);
  }
}

function generateMetadataFile(
  brands: Map<string, BrandMetadata>
): string {
  const sortedBrands = [...brands.values()]
    .map(brand => ({
      ...brand,
      id: slugify(brand.name),
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  validateBrandIds(sortedBrands);

  const lines = [
    'import type { ProductBrandMetadataMap } from "./productBrandMetadata.types";',
    "",
    "export const PRODUCT_BRAND_METADATA = {",
  ];

  for (const brand of sortedBrands) {
    lines.push(
      ...indentLines(
        generateBrandEntry(brand),
        2
      )
    );
  }

  lines.push(
    "} satisfies ProductBrandMetadataMap;",
    ""
  );

  return lines.join("\n");
}

function writeMetadataFile(
  brands: Map<string, BrandMetadata>
): void {
  const content = generateMetadataFile(brands);

  writeFileSync(
    OUTPUT,
    content,
    "utf8"
  );

  console.log(`Generated: ${OUTPUT}`);
}

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

function main() {
  const legacy = uniqueLegacyBrands(
    buildLegacyBrands()
  );

  console.log(
    `Legacy records: ${legacy.length}`
  );

  const brands = groupExactBrands(legacy);

  console.log(
    `Exact canonical brands: ${brands.size}`
  );

  const extraction =
    extractProductLines(brands);

  removeConfirmedProductLineBrands(
    brands,
    extraction.confirmedChildIds
  );

  console.log(
    `Confirmed product-line relations: ${extraction.confirmedRelations}`
  );

  console.log(
    `Final canonical brands: ${brands.size}`
  );

  const mergedBrands =
    mergeEquivalentBrands(brands);

  console.log(
    `Merged canonical brands: ${mergedBrands.size}`
  );

  generateAutomaticBrandAliases(
    mergedBrands
  );

  const generatedAliasCount = [
    ...mergedBrands.values(),
  ].reduce(
    (total, brand) =>
      total + brand.aliases.length,
    0
  );

  console.log(
    `Generated aliases: ${generatedAliasCount}`
  );

  writeMetadataFile(mergedBrands);
}

function createBrandMetadata(name: string): BrandMetadata {
  return {
    id: slugify(name),
    name,
    aliases: [],
    categories: [],
    subcategories: [],
    productLines: {},
  };
}

function addUnique(target: string[], value: string) {
  if (!target.includes(value)) {
    target.push(value);
  }
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sharesCategory(
  parent: BrandMetadata,
  child: BrandMetadata
): boolean {
  return parent.categories.some(category =>
    child.categories.includes(category)
  );
}

const REJECTED_PRODUCT_LINE_SUFFIXES = new Set([
  "hardware",
  "grocery",
  "medicine",
  "electronics",
  "household",
  "restaurant",
  "supermarket",
  "store",
  "shop",
  "pharmacy",
  "drug",
  "foods",
  "food",
  "company",
  "corporation",
  "international",
  "philippines",
]);

const PRODUCT_LINE_EXCLUSIONS: Record<string, string[]> = {
  Alaska: ["Bear"],
};

function hasNonAsciiCharacters(value: string): boolean {
  return /[^\x00-\x7F]/.test(value);
}

function addBrandAlias(
  brand: BrandMetadata,
  value: string
): void {
  if (
    value.toLowerCase() === brand.name.toLowerCase() ||
    brand.aliases.some(
      alias => alias.value.toLowerCase() === value.toLowerCase()
    )
  ) {
    return;
  }

  brand.aliases.push({
    value,
    type: "commonName",
    priority: 90,
    strength: "strong",
  });
}

function equivalentBrandKey(
  name: string
): string {
  return (
    KNOWN_EQUIVALENT_BRAND_GROUPS.get(
      slugify(name)
    ) ??
    slugify(name)
  );
}

const PREFERRED_BRAND_NAMES =
  new Map<string, string>([
    ["babybench", "Baby Bench"],
    ["bulldog", "Bulldog"],
    ["campbell", "Campbell's"],
    ["clubhouse", "Club House"],
    ["davinci", "Da Vinci"],
    ["max", "Max's"],
    ["oldtown", "Old Town"],
    ["chefschoice", "Chef's Choice"],
    ["jacobs", "Jacob's"],
  ]);

const KNOWN_EQUIVALENT_BRAND_GROUPS =
  new Map<string, string>([
    ["baby-bench", "babybench"],
    ["bull-dog", "bulldog"],
    ["campbell-s", "campbell"],
    ["club-house", "clubhouse"],
    ["da-vinci", "davinci"],
    ["max-s", "max"],
    ["old-town", "oldtown"],
    ["chef-s-choice", "chefschoice"],
    ["chef-schoice", "chefschoice"],
    ["jacob-s", "jacobs"],
  ]);

function mergeEquivalentBrands(
  brands: Map<string, BrandMetadata>
): Map<string, BrandMetadata> {
  const merged = new Map<string, BrandMetadata>();

  for (const brand of brands.values()) {
    const normalizedKey =
      equivalentBrandKey(brand.name);

    const preferredName =
      PREFERRED_BRAND_NAMES.get(normalizedKey);

    const id = slugify(
      preferredName ?? brand.name
    );
    const existing = merged.get(id);

    if (!existing) {
      merged.set(id, {
        ...brand,
        id,
        aliases: [...brand.aliases],
        categories: [...brand.categories],
        subcategories: [...brand.subcategories],
        productLines: { ...brand.productLines },
      });

      continue;
    }

    const existingHasDiacritics =
      hasNonAsciiCharacters(existing.name);

    const incomingHasDiacritics =
      hasNonAsciiCharacters(brand.name);

    if (
      incomingHasDiacritics &&
      !existingHasDiacritics
    ) {
      const previousName = existing.name;

      existing.name = brand.name;
      addBrandAlias(existing, previousName);
    } else {
      addBrandAlias(existing, brand.name);
    }

    for (const alias of brand.aliases) {
      addBrandAlias(existing, alias.value);
    }

    for (const category of brand.categories) {
      addUnique(existing.categories, category);
    }

    for (const subcategory of brand.subcategories) {
      addUnique(existing.subcategories, subcategory);
    }

    Object.assign(
      existing.productLines,
      brand.productLines
    );
  }

  return merged;
}

function isExcludedProductLine(
  parentName: string,
  lineName: string
): boolean {
  const exclusions =
    PRODUCT_LINE_EXCLUSIONS[parentName] ?? [];

  return exclusions.some(
    exclusion =>
      exclusion.toLowerCase() === lineName.toLowerCase()
  );
}

function extractProductLines(
  brands: Map<string, BrandMetadata>
): ProductLineExtractionResult {
  const allBrands = [...brands.values()];
  const confirmedChildIds = new Set<string>();

  let confirmedRelations = 0;

  for (const parent of allBrands) {
    const prefix = `${parent.name.toLowerCase()} `;

    const candidates = allBrands.filter(child => {
      if (child.id === parent.id) {
        return false;
      }

      return child.name
        .toLowerCase()
        .startsWith(prefix);
    });

    if (candidates.length < 2) {
      continue;
    }

    for (const child of candidates) {
      const lineName = child.name
        .slice(parent.name.length)
        .trim();

      if (!lineName) {
        continue;
      }

      const candidate =
        scoreProductLineCandidate(
          parent,
          child,
          lineName
        );

      if (candidate.confidence < 70) {
        continue;
      }

      parent.productLines[lineName] = {
        aliases: [],
      };

      confirmedChildIds.add(child.id);
      confirmedRelations++;
    }
  }

  return {
    confirmedChildIds,
    confirmedRelations,
  };
}

function removeConfirmedProductLineBrands(
  brands: Map<string, BrandMetadata>,
  confirmedChildIds: Set<string>
): void {
  for (const [key, brand] of brands.entries()) {
    if (confirmedChildIds.has(brand.id)) {
      brands.delete(key);
    }
  }
}

function groupExactBrands(
  legacyBrands: LegacyBrand[]
): Map<string, BrandMetadata> {
  const brands = new Map<string, BrandMetadata>();

  for (const item of legacyBrands) {
    const key = item.brand.toLowerCase();

    let metadata = brands.get(key);

    if (!metadata) {
      metadata = createBrandMetadata(item.brand);
      brands.set(key, metadata);
    }

    addUnique(metadata.categories, item.category);
  }

  return brands;
}

main();