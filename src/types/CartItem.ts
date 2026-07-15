export interface CartItem {
  productId: number;
  barcode: string;
  name: string;
  brand: string;
  category: string;
  unit?: string;
  srp: number;
  price: number;
  quantity: number;
  subtotal: number;
}