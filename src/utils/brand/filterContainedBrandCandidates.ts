import { BrandCandidate } from "../../types/BrandCandidate";

import {normalize} from "../normalize";

export function filterContainedBrandCandidates(
  candidates: BrandCandidate[]
): BrandCandidate[] {

  return candidates.filter(candidate => {

    const current =
      normalize(candidate.matchedText);

    return !candidates.some(other => {

      if (other === candidate) {
        return false;
      }

      const compare =
        normalize(other.matchedText);

      return (
        compare.length > current.length &&
        compare.includes(current)
      );

    });

  });

}