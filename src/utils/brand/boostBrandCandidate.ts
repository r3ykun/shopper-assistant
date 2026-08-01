//shopper-assistant\src\utils\brand\boostBrandCandidate.ts
import { BrandCandidate } from "../../types/BrandCandidate";

export function boostBrandCandidate(
  candidate: BrandCandidate,
  input: string
): number {

  let score = candidate.confidence;

  const search = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const matched = candidate.matchedText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (search.startsWith(matched)) {
    score += 0.05;
  }

  if (search.endsWith(matched)) {
    score += 0.05;
  }

  if (search.includes(matched)) {
    score += 0.05;
  }

  if (
    matched.replace(/\s+/g, "") ===
    search.replace(/\s+/g, "")
  ) {
    score += 0.10;
  }

  return Math.min(score, 1);
}