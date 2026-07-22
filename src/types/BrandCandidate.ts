// src/types/BrandCandidate.ts

import { ProductBrandMetadata } from "../constants/productBrandMetadata.types";

export interface BrandCandidate {

    brand: ProductBrandMetadata;

    confidence: number;

    matchType:
    | "official"
    | "abbreviation"
    | "commonName"
    | "nickname"
    | "formerName"
    | "misspelling"
    | "keyword"
    | "productLine"
    | "variant"
    | "fuzzy";

    matchedText: string;

}