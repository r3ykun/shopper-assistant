import type{
  ExtractedProductMetadata,
  ProductMatchCandidate,
}from "../../types/productRecognition.types";
import{
  matchProducts,
  type MatchableProduct,
}from "./productMatching.service";

export interface DatabaseProduct{
  id:number|string;
  barcode?:string;
  name:string;
  brand?:string;
  category?:string;
  subcategory?:string;
  measurement?:number;
  unit?:string;
  measurementUnit?:string;
}

export interface DatabaseProductMatchingOptions{
  barcode?:string;
  limit?:number;
  minimumScore?:number;
}

export type ProductDatabaseProvider=()=>DatabaseProduct[];

function toMatchableProduct(product:DatabaseProduct):MatchableProduct{
  return{
    id:product.id,
    barcode:product.barcode,
    name:product.name,
    brand:product.brand,
    category:product.category,
    subcategory:product.subcategory,
    measurement:product.measurement,
    unit:product.measurementUnit??product.unit,
  };
}

export function matchDatabaseProducts(
  metadata:ExtractedProductMetadata,
  getProducts:ProductDatabaseProvider,
  options?:DatabaseProductMatchingOptions,
):ProductMatchCandidate[]{
  const products=getProducts();
  return matchProducts(
    metadata,
    products.map(toMatchableProduct),
    options,
  );
}