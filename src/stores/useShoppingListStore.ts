import { create } from "zustand";

type ShoppingListStore = {
  activeListId: number | null;

  setActiveList: (
    id: number | null
  ) => void;

  clearActiveList: () => void;
};

export const useShoppingListStore =
  create<ShoppingListStore>(set => ({
    activeListId: null,

    setActiveList: id => {
      set({
        activeListId: id,
      });
    },

    clearActiveList: () => {
      set({
        activeListId: null,
      });
    },
  }));