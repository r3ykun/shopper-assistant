import { damerauLevenshteinDistance } from "../damerauLevenshteinDistance";

export function similarityScore(
  a: string,
  b: string
): number {

  const distance =
    damerauLevenshteinDistance(a, b);

  const max =
    Math.max(a.length, b.length);

  if (max === 0) {
    return 1;
  }

    const score = 1 - distance / max;

    return Number(
    Math.max(0, score).toFixed(3)
    );
}