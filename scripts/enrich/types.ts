export interface ProductLineMetadata {
  aliases: string[];
}

export interface BrandAliasMetadata {
  value: string;

  type:
    | "official"
    | "abbreviation"
    | "commonName"
    | "nickname"
    | "formerName"
    | "misspelling";

  priority?: number;

  strength?: "strong" | "normal" | "weak";
}

export interface BrandMetadata {
  id: string;

  name: string;

  aliases: BrandAliasMetadata[];

  categories: string[];

  subcategories: string[];

  productLines: Record<
    string,
    ProductLineMetadata
  >;
}