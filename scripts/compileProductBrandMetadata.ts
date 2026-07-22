//shopper-assistant\scripts\compileProductBrandMetadata.ts
import { writeFileSync } from "fs";
import { resolve } from "path";
import { PRODUCT_BRANDS } from "../src/constants/brands";
import { enrichAliases } from "./enrich/enrichAliases";
import strict from "assert/strict";

interface LegacyBrand {
  category: string;
  brand: string;
}

interface ProductLineMetadata{
	name:string;
	aliases:string[];
	categories?:string[];
	subcategories?:string[];
	keywords?:string[];
	preserveInProductName?:boolean;
	variants?:ProductVariantMetadata[];
}

interface ProductVariantMetadata {
  name: string;
  aliases: string[];
  categories: string[];
  subcategories: string[];
  keywords: string[];
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
  productLines:Record<string,ProductLineMetadata>;
  variants: ProductVariantMetadata[];
  keywords: string[];
}

interface ProductLineExtractionResult {
  confirmedChildIds: Set<string>;
  confirmedRelations: number;
}

interface VariantExtractionResult {
  confirmedChildIds: Set<string>;
  extractedVariants: number;
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
  lineName:string,
  brand:BrandMetadata
):string[]{
  const lineId=slugify(lineName);

  const lines=[
    `${quote(lineId)}:{`,
    `  name:${quote(lineName)},`,
    "  aliases:[",
    "    {",
    `      value:${quote(lineName)},`,
    '      type:"official",',
    "      priority:90,",
    "    },",
    "  ],",
  ];

  if(brand.categories.length){
    lines.push(
      `  categories:${JSON.stringify([...brand.categories].sort((a,b)=>a.localeCompare(b)))},`
    );
  }

  if(brand.subcategories.length){
    lines.push(
      `  subcategories:${JSON.stringify([...brand.subcategories].sort((a,b)=>a.localeCompare(b)))},`
    );
  }

  const keywords:string[]=[];
  addKeywordTokens(keywords,lineName);

  if(keywords.length){
    lines.push(
      `  keywords:${JSON.stringify([...new Set(keywords)].sort((a,b)=>a.localeCompare(b)))},`
    );
  }

  lines.push(
    "  preserveInProductName:true,",
    "},"
  );

  return lines;
}

function generateVariant(
  variant: ProductVariantMetadata
): string[] {
  const lines = [
    "{",
    `  name: ${quote(variant.name)},`,
  ];

  if (variant.aliases.length > 0) {
    lines.push(
      `  aliases: ${JSON.stringify(
        [...variant.aliases].sort(
          (a, b) =>
            a.localeCompare(b)
        )
      )},`
    );
  }

  if (variant.categories.length > 0) {
    lines.push(
      `  categories: ${JSON.stringify(
        [...variant.categories].sort(
          (a, b) =>
            a.localeCompare(b)
        )
      )},`
    );
  }

  if (
    variant.subcategories.length > 0
  ) {
    lines.push(
      `  subcategories: ${JSON.stringify(
        [...variant.subcategories].sort(
          (a, b) =>
            a.localeCompare(b)
        )
      )},`
    );
  }

  if (variant.keywords.length > 0) {
    lines.push(
      `  keywords: ${JSON.stringify(
        [...variant.keywords].sort((a, b) =>
          a.localeCompare(b)
        )
      )},`
    );
  }

  lines.push("},");

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

    const variants = [...brand.variants]
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  if (variants.length > 0) {
    lines.push("  variants: [");

    for (const variant of variants) {
      lines.push(
        ...indentLines(
          generateVariant(variant),
          4
        )
      );
    }

    lines.push("  ],");
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

const KEYWORD_STOP_WORDS = new Set([
  "and", "the", "with", "for", "from", "brand", "product",
  "products", "original", "classic", "regular",
]);

const KEYWORD_EXPANSIONS: Record<
  string,
  string[]
> = {
  coffee: [
    "coffee",
    "instant coffee",
    "ground coffee",
    "coffee drink",
    "caffeine",
  ],

  espresso: [
    "coffee",
    "espresso",
  ],

  cappuccino: [
    "coffee",
    "cappuccino",
  ],

  latte: [
    "coffee",
    "latte",
  ],

  mocha: [
    "coffee",
    "mocha",
    "chocolate coffee",
  ],

  chocolate: [
    "chocolate",
    "cocoa",
  ],

  cocoa: [
    "chocolate",
    "cocoa",
  ],

  milk: [
    "milk",
    "dairy",
  ],

  cheese: [
    "cheese",
    "dairy",
  ],

  yogurt: [
    "yogurt",
    "dairy",
  ],

  yoghurt: [
    "yogurt",
    "dairy",
  ],

  noodle: [
    "noodles",
    "instant noodles",
  ],

  noodles: [
    "noodles",
    "instant noodles",
  ],

  canton: [
    "noodles",
    "pancit canton",
    "instant noodles",
  ],

  ramen: [
    "ramen",
    "noodles",
    "instant noodles",
  ],

  biscuit: [
    "biscuits",
    "cookies",
    "snacks",
  ],

  biscuits: [
    "biscuits",
    "cookies",
    "snacks",
  ],

  cookie: [
    "cookies",
    "biscuits",
    "snacks",
  ],

  cookies: [
    "cookies",
    "biscuits",
    "snacks",
  ],

  cracker: [
    "crackers",
    "biscuits",
    "snacks",
  ],

  crackers: [
    "crackers",
    "biscuits",
    "snacks",
  ],

  chips: [
    "chips",
    "snacks",
  ],

  candy: [
    "candy",
    "sweets",
  ],

  juice: [
    "juice",
    "fruit drink",
    "beverage",
  ],

  soda: [
    "soda",
    "soft drink",
    "beverage",
  ],

  cola: [
    "cola",
    "soft drink",
    "soda",
    "beverage",
  ],

  water: [
    "water",
    "drinking water",
    "beverage",
  ],

  shampoo: [
    "shampoo",
    "hair care",
  ],

  conditioner: [
    "conditioner",
    "hair care",
  ],

  soap: [
    "soap",
    "body care",
    "personal care",
  ],

  toothpaste: [
    "toothpaste",
    "oral care",
  ],

  toothbrush: [
    "toothbrush",
    "oral care",
  ],

  detergent: [
    "detergent",
    "laundry",
    "cleaning",
  ],

  bleach: [
    "bleach",
    "laundry",
    "cleaning",
  ],

  cleaner: [
    "cleaner",
    "cleaning",
    "household",
  ],

  medicine: [
    "medicine",
    "medication",
    "drug",
  ],

  vitamin: [
    "vitamins",
    "medicine",
  ],

  vitamins: [
    "vitamins",
    "medicine",
  ],
};

function normalizeKeyword(
  value: string
): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[™®]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function addKeyword(
  target: string[],
  value: string
): void {
  const normalized =
    normalizeKeyword(value);

  if (
    normalized.length < 2 ||
    KEYWORD_STOP_WORDS.has(normalized)
  ) {
    return;
  }

  if (
    target.some(
      keyword =>
        keyword.toLowerCase() ===
        normalized
    )
  ) {
    return;
  }

  target.push(normalized);
}

function addKeywordTokens(
  target: string[],
  value: string
): void {
  const normalized =
    normalizeKeyword(value);

  if (!normalized) {
    return;
  }

  addKeyword(target, normalized);

  const tokens = normalized.split(" ");

  for (const token of tokens) {
    if (
      token.length < 3 ||
      KEYWORD_STOP_WORDS.has(token)
    ) {
      continue;
    }

    addKeyword(target, token);

    const expansions =
      KEYWORD_EXPANSIONS[token] ?? [];

    for (const expansion of expansions) {
      addKeyword(target, expansion);
    }
  }
}

const KNOWN_PRODUCT_LINES=new Map<string,string[]>([
	["Nestlé",["Chuckie","Coffee Mate"]],
  ["Lucky Me!",[
    "Pancit Canton", "Instant Mami", "Supreme", 
    "Lomi", "Spicy Labuyo", "La Paz Batchoy",
  ]],
]);

function mergeKnownProductLines(
	brands:Map<string,BrandMetadata>,
	confirmedChildIds:Set<string>
){
	const allBrands=[...brands.values()];

	for(const[parentName,lineNames]of KNOWN_PRODUCT_LINES){
		const parent=allBrands.find(
			b=>b.name===parentName
		);
		if(!parent)continue;

		for(const lineName of lineNames){
      const child=allBrands.find(
        b=>b.name.toLowerCase()===lineName.toLowerCase()
      );

      if(child){
        parent.productLines[lineName]??={
          name:lineName,
          aliases:[lineName],
          preserveInProductName:true,
        };
        confirmedChildIds.add(child.id);
        continue;
      }

      parent.productLines[lineName]??={
        name:lineName,
        aliases:[lineName],
        preserveInProductName:true,
      };
		}
	}
}
function generateMetadataKeywords(
  brands: Map<string, BrandMetadata>
): void {
  for (const brand of brands.values()) {
    brand.keywords = [];

    addKeywordTokens(
      brand.keywords,
      brand.name
    );

    for (const alias of brand.aliases) {
      addKeywordTokens(
        brand.keywords,
        alias.value
      );
    }

    for (
      const category of brand.categories
    ) {
      addKeywordTokens(
        brand.keywords,
        category
      );
    }

    for (
      const subcategory of
        brand.subcategories
    ) {
      addKeywordTokens(
        brand.keywords,
        subcategory
      );
    }

    for (const variant of brand.variants) {
      variant.keywords = [];

      addKeywordTokens(
        variant.keywords,
        variant.name
      );

      for (
        const alias of variant.aliases
      ) {
        addKeywordTokens(
          variant.keywords,
          alias
        );
      }

      for (
        const category of
          variant.categories
      ) {
        addKeywordTokens(
          variant.keywords,
          category
        );
      }

      for (
        const subcategory of
          variant.subcategories
      ) {
        addKeywordTokens(
          variant.keywords,
          subcategory
        );
      }

      for (
        const keyword of
          variant.keywords
      ) {
        addKeyword(
          brand.keywords,
          keyword
        );
      }

      variant.keywords.sort(
        (a, b) =>
          a.localeCompare(b)
      );
    }

    brand.keywords.sort(
      (a, b) =>
        a.localeCompare(b)
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

  const variantExtraction =
    extractVariants(brands);

  console.log(
    `Extracted variants: ${variantExtraction.extractedVariants}`
  );

  const extraction=extractProductLines(
    brands,
    variantExtraction.confirmedChildIds
  );

  mergeKnownProductLines(
    brands,
    extraction.confirmedChildIds
  );

  const luckyMe=brands.get("lucky-me");

if(luckyMe){
	luckyMe.productLines??={};

	luckyMe.productLines["pancit-canton"]??={
		name:"Pancit Canton",
		aliases:["Pancit Canton"],
		categories:["Grocery"],
		keywords:[
			"pancit canton",
			"pancit",
			"canton",
			"instant noodles",
			"noodles",
		],
		preserveInProductName:true,
	};
}

  const confirmedChildIds=new Set<string>([
    ...variantExtraction.confirmedChildIds,
    ...extraction.confirmedChildIds,
  ]);

  removeConfirmedProductLineBrands(
    brands,
    confirmedChildIds
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

  enrichAliases(mergedBrands);

  generateMetadataKeywords(
    mergedBrands
  );

  const generatedKeywordCount = [
    ...mergedBrands.values(),
  ].reduce(
    (total, brand) =>
      total + brand.keywords.length,
    0
  );

  console.log(
    `Generated keywords: ${generatedKeywordCount}`
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

function createBrandMetadata(
  name: string
): BrandMetadata {
  return {
    id: slugify(name),
    name,
    aliases: [],
    categories: [],
    subcategories: [],
    productLines: {},
    variants: [],
    keywords: [],
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

const KNOWN_VARIANT_SUFFIXES = [
  "Zero Sugar",
  "Sugar Free",
  "No Sugar",
  "Less Sugar",
  "Low Sugar",
  "Extra Hot",
  "Extra Spicy",
  "Low Fat",
  "Non Fat",
  "Full Cream",
  "Milk Chocolate",
  "Dark Chocolate",
  "White Chocolate",
  "Unsweetened",
  "Unsalted",
  "Salted",
  "Original",
  "Classic",
  "Regular",
  "Diet",
  "Light",
  "Lite",
  "Mild",
  "Spicy",
  "Hot",
  "Sweet",
  "Chilimansi",
  "Calamansi",
  "Barbecue",
  "BBQ",
  "Cheese",
  "Chocolate",
  "Vanilla",
  "Strawberry",
  "Mango",
  "Lemon",
  "Orange",
  "Apple",
  "Grape",
  "Chicken",
  "Beef",
  "Pork",
  "Seafood",
].sort(
  (a, b) =>
    b.length - a.length
);

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
    const merged =
      new Map<string, BrandMetadata>();

    for (const brand of brands.values()) {
      const normalizedKey =
        equivalentBrandKey(brand.name);

      const preferredName =
        PREFERRED_BRAND_NAMES.get(
          normalizedKey
        );

      const id = slugify(
        preferredName ?? brand.name
      );

      const existing = merged.get(id);

      if (!existing) {
        merged.set(id, {
          ...brand,
          id,
          aliases: [
            ...brand.aliases,
          ],
          categories: [
            ...brand.categories,
          ],
          subcategories: [
            ...brand.subcategories,
          ],
          productLines: {
            ...brand.productLines,
          },
          variants: brand.variants.map(
            variant => ({
              ...variant,
              aliases: [
                ...variant.aliases,
              ],
              categories: [
                ...variant.categories,
              ],
              subcategories: [
                ...variant.subcategories,
              ],
              keywords: [
                ...variant.keywords,
              ],
            })
          ),
        });

        continue;
      }

      const existingHasDiacritics =
        hasNonAsciiCharacters(
          existing.name
        );

      const incomingHasDiacritics =
        hasNonAsciiCharacters(
          brand.name
        );

      if (
        incomingHasDiacritics &&
        !existingHasDiacritics
      ) {
        const previousName =
          existing.name;

        existing.name = brand.name;

        addBrandAlias(
          existing,
          previousName
        );
      } else {
        addBrandAlias(
          existing,
          brand.name
        );
      }

      for (
        const alias of brand.aliases
      ) {
        addBrandAlias(
          existing,
          alias.value
        );
      }

      for (
        const category of
          brand.categories
      ) {
        addUnique(
          existing.categories,
          category
        );
      }

      for (
        const subcategory of
          brand.subcategories
      ) {
        addUnique(
          existing.subcategories,
          subcategory
        );
      }

      Object.assign(
        existing.productLines,
        brand.productLines
      );

      for (const keyword of brand.keywords) {
        addUnique(
          existing.keywords,
          keyword
        );
      }

      for (
        const variant of
          brand.variants
      ) {
        addVariantMetadata(
          existing,
          variant.name,
          variant.categories,
          variant.subcategories
        );

        const mergedVariant =
          existing.variants.find(
            existingVariant =>
              existingVariant.name
                .toLowerCase() ===
              variant.name.toLowerCase()
          );

        if (!mergedVariant) {
          continue;
        }

        for (
          const alias of
            variant.aliases
        ) {
          addUnique(
            mergedVariant.aliases,
            alias
          );
        }

        for (
          const keyword of
            variant.keywords
        ) {
          addUnique(
            mergedVariant.keywords,
            keyword
          );
        }
      }
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

  function extractTrailingVariant(
    value: string
  ): {
    baseName: string;
    variantName: string;
  } | null {
    const normalizedValue =
      normalizeText(value);

    const normalizedLower =
      normalizedValue.toLowerCase();

    for (const variantName of KNOWN_VARIANT_SUFFIXES) {
      const variantLower =
        variantName.toLowerCase();

      const index =
        normalizedLower.indexOf(variantLower);

      if (index === -1) {
        continue;
      }

      const before = normalizedValue
        .slice(0, index)
        .trim();

      const after = normalizedValue
        .slice(index + variantName.length)
        .trim();

      let baseName = before;

      if (after.length > 0) {
        const remainder = after
          .replace(
            /^[\d.\sxXMLLmlkgKG()\-]+/,
            ""
          )
          .trim();

        if (remainder.length > 0) {
          baseName =
            `${before} ${remainder}`.trim();
        }
      }

      return {
        baseName,
        variantName,
      };
    }

    return null;
  }

  function addVariantMetadata(
    brand: BrandMetadata,
    variantName: string,
    categories: string[],
    subcategories: string[]
  ): boolean {
    const normalizedName =
      normalizeText(variantName);

    const existing = brand.variants.find(
      variant =>
        variant.name.toLowerCase() ===
        normalizedName.toLowerCase()
    );

    if (existing) {
      for (const category of categories) {
        addUnique(
          existing.categories,
          category
        );
      }

      for (const subcategory of subcategories) {
        addUnique(
          existing.subcategories,
          subcategory
        );
      }

      return false;
    }

    brand.variants.push({
        name: normalizedName,
        aliases: [],
        categories: [...categories],
        subcategories: [...subcategories],
        keywords: [],
    });

    return true;
  }

  function extractVariants(
    brands: Map<string, BrandMetadata>
  ): VariantExtractionResult {
    const allBrands = [...brands.values()];

    const confirmedChildIds =
      new Set<string>();

    let extractedVariants = 0;

    for (const parent of allBrands) {
      const prefix =
        `${parent.name.toLowerCase()} `;

      for (const child of allBrands) {
        if (child.id === parent.id) {
          continue;
        }

        if (
          !child.name
            .toLowerCase()
            .startsWith(prefix)
        ) {
          continue;
        }

        const remainder = child.name
          .slice(parent.name.length)
          .trim();

        const extracted =
          extractTrailingVariant(remainder);

        if (!extracted) {
          continue;
        }

        const wasAdded = addVariantMetadata(
          parent,
          extracted.variantName,
          child.categories,
          child.subcategories
        );

        if (wasAdded) {
          extractedVariants++;
        }

        if (
            extracted.baseName &&
            extracted.baseName !== extracted.variantName &&
            !isExcludedProductLine(
                parent.name,
                extracted.baseName
            )
        ) {
          parent.productLines[
            extracted.baseName
          ]??={
            name:extracted.baseName,
            aliases:[],
          };
        }

        confirmedChildIds.add(child.id);
      }
    }

    return {
      confirmedChildIds,
      extractedVariants,
    };
  }

  function extractProductLines(
    brands: Map<string, BrandMetadata>,
    excludedChildIds: Set<string> =
      new Set<string>()
  ): ProductLineExtractionResult {
    const allBrands = [...brands.values()];

    const confirmedChildIds =
      new Set<string>();

    let confirmedRelations = 0;

    for (const parent of allBrands) {
      const prefix =
        `${parent.name.toLowerCase()} `;

      const candidates = allBrands.filter(
        child => {
          if (child.id === parent.id) {
            return false;
          }

          if (
            excludedChildIds.has(child.id)
          ) {
            return false;
          }

          return child.name
            .toLowerCase()
            .startsWith(prefix);
        }
      );

      if (candidates.length === 0) {
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

        parent.productLines[lineName]={
          name:lineName,
          aliases:[],
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