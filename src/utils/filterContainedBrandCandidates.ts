import { BrandCandidate } from "../types/BrandCandidate";

function normalize(
  value: string
): string {

  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}

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