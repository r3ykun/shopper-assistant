import { create } from "zustand";

type ScannerFeedbackState = {
  message: string;

  showSuccess: (
    message: string
  ) => void;

  clearFeedback: () => void;
};

export const useScannerFeedbackStore =
  create<ScannerFeedbackState>((set) => ({
    message: "",

    showSuccess: (message) =>
      set({
        message,
      }),

    clearFeedback: () =>
      set({
        message: "",
      }),
  }));