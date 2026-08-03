//shopper-assistant/src/stores/useStoreStore.ts
import { create } from "zustand";
import { Store } from "../database/entities/Store";

type StoreState = {
  selectedStore: Store | null;

  setSelectedStore: (store: Store) => void;

  clearSelectedStore: () => void;
};

export const useStoreStore = create<StoreState>((set) => ({
  selectedStore: null,

  setSelectedStore: (store) =>
    set({
      selectedStore: store,
    }),

  clearSelectedStore: () =>
    set({
      selectedStore: null,
    }),
}));