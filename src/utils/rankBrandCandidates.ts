import { BrandCandidate } from "../types/BrandCandidate";

export function rankBrandCandidates(
  candidates: BrandCandidate[]
): BrandCandidate[] {

  return [...candidates].sort(

    (a, b) => {

      if (b.confidence !== a.confidence) {
        return b.confidence - a.confidence;
      }

      return a.brand.name.localeCompare(
        b.brand.name
      );

    }

  );

}