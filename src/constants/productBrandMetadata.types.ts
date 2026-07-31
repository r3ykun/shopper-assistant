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
  value: string;
  type: ProductBrandAliasType;
  priority: number;
  strength?: ProductBrandMatchStrength;
  removeFromProductName?: boolean;
  categories?: string[];
  subcategories?: string[];
  requiresCategoryContext?: boolean;
}

export interface ProductLineAlias {
  value: string;
  type?: "official" | "abbreviation" | "commonName" | "misspelling";
  priority?: number;
}

export interface ProductLineMetadata{
	name:string;
	aliases?:ProductLineAlias[];
	categories?:string[];
	subcategories?:string[];
	preserveInProductName?:boolean;
	keywords?:string[];
	variants?:ProductVariantMetadata[];
}

export interface ProductVariantMetadata{
	name:string;
	aliases?:string[];
	categories?:string[];
	subcategories?:string[];
	keywords?:string[];
	priority?:number;
	exclusiveToProductLine?:boolean;
}

export interface ProductManufacturerReference {
  id: string;

  name: string;
}

export interface ProductBrandMetadata {
  id: string;
  name: string;
  aliases?: ProductBrandAlias[];
  productLines?: Record<string, ProductLineMetadata>;
  variants?: ProductVariantMetadata[];
  categories?: string[];
  subcategories?: string[];
  manufacturerId?: string;
  manufacturer?: ProductManufacturerReference;
  keywords?: string[];
  deprecated?: boolean;
  replacedByBrandId?: string;
}

export type ProductBrandMetadataMap = Record<string, ProductBrandMetadata>;