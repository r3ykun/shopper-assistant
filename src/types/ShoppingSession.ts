import { CartItem } from "./CartItem";

export interface ShoppingSession {

  storeId: number;

  storeName: string;

  startedAt: string;

  items: CartItem[];

}