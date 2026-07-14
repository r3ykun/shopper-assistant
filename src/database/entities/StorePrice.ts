export interface StorePrice {
  id: number;
  storeId: number;
  productId: number;
  price: number;
  lastUpdated?: string;
}