import { create } from "zustand";

import { CartItem } from "../types/CartItem";

type CartStore = {

  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (productId: number) => void;

  updateQuantity: (
    productId: number,
    quantity: number
  ) => void;

  updatePrice: (
    productId: number,
    price: number
  ) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;

};

export const useCartStore =
create<CartStore>((set, get) => ({

  items: [],

  addItem(item) {
    const existing = get().items.find(
      cartItem =>
        cartItem.productId === item.productId
    );

    if (existing) {
      set({
        items: get().items.map(cartItem =>
          cartItem.productId === item.productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                subtotal:
                  (cartItem.quantity + item.quantity) *
                  cartItem.price,
              }
            : cartItem
        ),
      });

      return;
    }

    set({
      items: [
        ...get().items,
        {
          ...item,
          subtotal: item.quantity * item.price,
        },
      ],
    });
  },

  removeItem(productId) {

    set({

      items:
        get().items.filter(
          item =>
            item.productId !== productId
        ),

    });

  },

  updateQuantity(productId, quantity) {
    const validatedQuantity =
      Math.max(1, Math.floor(quantity));

    set({
      items: get().items.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: validatedQuantity,
              subtotal:
                validatedQuantity *
                item.price,
            }
          : item
      ),
    });
  },

  updatePrice(productId, price) {
    const validatedPrice =
      Math.max(0, price);

    set({
      items: get().items.map(item =>
        item.productId === productId
          ? {
              ...item,
              price: validatedPrice,
              subtotal:
                item.quantity *
                validatedPrice,
            }
          : item
      ),
    });
  },

  clearCart() {

    set({

      items: [],

    });

  },

  totalItems() {

    return get().items.reduce(

      (sum, item) =>
        sum + item.quantity,

      0

    );

  },

  totalPrice() {

    return get().items.reduce(

      (sum, item) =>
        sum + item.subtotal,

      0

    );

  },

}));