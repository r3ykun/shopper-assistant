import { BrandCandidate } from "../../types/BrandCandidate";
import { boostBrandCandidate } from "./boostBrandCandidate";

export function rankBrandCandidates(
  candidates: BrandCandidate[],
  text: string
): BrandCandidate[] {

  return [...candidates].sort(

    (a, b) => {

      const boostedA =
        boostBrandCandidate(
          a,
          text
        );

      const boostedB =
        boostBrandCandidate(
          b,
          text
        );

      if (boostedB !== boostedA) {
        return boostedB - boostedA;
      }

      if (b.confidence !== a.confidence) {
        return b.confidence - a.confidence;
      }

      return a.brand.name.localeCompare(
        b.brand.name
      );

    }

  );

}