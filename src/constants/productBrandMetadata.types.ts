//shopper-assistant\src\constants\productBrandMetadata.types.ts
export type ProductBrandAliasType =
  | "official"
  | "abbreviation"
  | "commonName"
  | "nickname"
  | "formerName"
  | "misspelling";

export type ProductBrandMatchStrength =
  | "strong"
  | "normal"
  | "weak";

export interface ProductBrandAlias {
  /**
   * Alternate text that may identify the brand.
   */
  value: string;

  /**
   * The purpose or origin of this alias.
   */
  type: ProductBrandAliasType;

  /**
   * Higher values take precedence when multiple
   * brands match the same product name.
   *
   * Recommended range: 0–200.
   */
  priority?: number;

  /**
   * Controls how cautiously the detector should use
   * short or ambiguous aliases.
   */
  strength?: ProductBrandMatchStrength;

  /**
   * Whether matching should require category context.
   *
   * Useful for ambiguous words such as:
   * - Smart
   * - Joy
   * - Champion
   * - Royal
   */
  requiresCategoryContext?: boolean;

  /**
   * Optional category restrictions for this alias.
   */
  categories?: string[];

  /**
   * Optional subcategory restrictions for this alias.
   */
  subcategories?: string[];
}

export interface ProductLineAlias {
  value: string;

  type?:
    | "official"
    | "abbreviation"
    | "commonName"
    | "misspelling";

  priority?: number;
}

export interface ProductLineMetadata {
  /**
   * Canonical product-line name.
   *
   * Examples:
   * - Pancit Canton
   * - Cup Noodles
   * - Blanca
   * - Fortified
   */
  name: string;

  aliases?: ProductLineAlias[];

  categories?: string[];
  subcategories?: string[];

  /**
   * Keep product lines in the final product name
   * unless explicitly disabled.
   */
  preserveInProductName?: boolean;

  /**
   * Optional words commonly associated with this
   * product line.
   */
  keywords?: string[];
}

export interface ProductVariantMetadata {
  /**
   * Canonical variant name.
   *
   * Examples:
   * - Original
   * - Sweet & Spicy
   * - Extra Hot
   * - Twin Pack
   */
  name: string;

  aliases?: string[];

  categories?: string[];
  subcategories?: string[];
}

export interface ProductBrandMetadata {
  /**
   * Stable programmatic identifier.
   *
   * Do not change this when display names change.
   */
  id: string;

  /**
   * Canonical name shown in the UI and database.
   */
  name: string;

  aliases?: ProductBrandAlias[];

  productLines?: Record<
    string,
    ProductLineMetadata
  >;

  variants?: ProductVariantMetadata[];

  categories?: string[];
  subcategories?: string[];

  manufacturer?: string;

  /**
   * Search terms that support detection but are not
   * safe enough to identify the brand by themselves.
   */
  keywords?: string[];

  /**
   * Prevent a deprecated brand from being shown in
   * selection lists while retaining detection support.
   */
  deprecated?: boolean;

  /**
   * Optional replacement for a deprecated brand.
   */
  replacedByBrandId?: string;
}

export type ProductBrandMetadataMap = Record<
  string,
  ProductBrandMetadata
>;