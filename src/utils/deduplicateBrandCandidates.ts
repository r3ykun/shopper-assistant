import { BrandCandidate } from "../types/BrandCandidate";

export function deduplicateBrandCandidates(
  candidates: BrandCandidate[]
): BrandCandidate[] {

  const map = new Map<
    string,
    BrandCandidate
  >();

    for (const candidate of candidates) {

    const existing = map.get(
        candidate.brand.id
    );

    if (!existing) {

        map.set(
        candidate.brand.id,
        candidate
        );

        continue;

    }

    if (
        candidate.confidence >
        existing.confidence
    ) {

        map.set(
        candidate.brand.id,
        candidate
        );

    }

    }

  return [...map.values()];

}