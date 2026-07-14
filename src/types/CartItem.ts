export interface CartItem {
  productId: number;

  barcode: string;

  name: string;

  category: string;

  unit?: string;

  price: number;

  quantity: number;

  subtotal: number;
}