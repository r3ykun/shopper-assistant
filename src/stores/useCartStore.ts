//shopper-assistant\src\stores\useCartStore.ts
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
  checkoutInProgress:boolean;
  setCheckoutInProgress:(
    value:boolean
  )=>void;
};

export const useCartStore =
create<CartStore>((set, get) => ({

  checkoutInProgress:false,

  setCheckoutInProgress(
    value
  ){
    set({
      checkoutInProgress:value,
    });
  },

  items: [],

  addItem(item) {
    const currentItems = get().items;

    const quantity =
      Math.max(1, Math.floor(item.quantity));

    const price =
      Math.max(0, item.price);

    const existing =
      currentItems.find(
        cartItem =>
          cartItem.productId ===
          item.productId
      );

    if (existing) {
      set({
        items: currentItems.map(
          cartItem => {
            if (
              cartItem.productId !==
              item.productId
            ) {
              return cartItem;
            }

            const updatedQuantity =
              cartItem.quantity +
              quantity;

            return {
              ...cartItem,
              quantity: updatedQuantity,
              subtotal:
                updatedQuantity *
                cartItem.price,
            };
          }
        ),
      });

      return;
    }

    set({
      items: [
        ...currentItems,
        {
          ...item,
          price,
          quantity,
          subtotal: quantity * price,
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