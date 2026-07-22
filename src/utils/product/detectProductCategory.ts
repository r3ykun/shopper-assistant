import {
  SUBCATEGORY_METADATA,
} from "../../constants/subcategoryMetadata";

export type ProductCategoryMatchType =
  | "subcategory"
  | "productKeyword"
  | "shoppingAlias";

export type DetectionConfidence =
  | "high"
  | "medium"
  | "low";

export interface DetectedProductCategory {
  category: string;
  subcategory: string;
  matchedTerm: string;
  matchedBy: ProductCategoryMatchType;
  score: number;
  confidence: DetectionConfidence;
}

interface DetectionCandidate {
  category: string;
  subcategory: string;
  originalTerm: string;
  normalizedTerm: string;
  matchedBy: ProductCategoryMatchType;
  wordCount: number;
}

interface ScoredDetection {
  category: string;
  subcategory: string;
  score: number;
  bestMatchedTerm: string;
  bestMatchedBy: ProductCategoryMatchType;
  bestIndividualScore: number;
  matchedTerms: Set<string>;
}

function normalizeText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWordCount(
  normalizedValue: string
): number {
  if (!normalizedValue) {
    return 0;
  }

  return normalizedValue
    .split(" ")
    .filter(Boolean)
    .length;
}

function getBaseScore(
  matchedBy: ProductCategoryMatchType
): number {
  switch (matchedBy) {
    case "subcategory":
      return 100;

    case "productKeyword":
      return 85;

    case "shoppingAlias":
      return 70;

    default:
      return 0;
  }
}

function getConfidence(
  score: number
): DetectionConfidence {
  if (score >= 140) {
    return "high";
  }

  if (score >= 90) {
    return "medium";
  }

  return "low";
}

/*
 * Candidates are created only once when this
 * module is imported.
 */
const DETECTION_CANDIDATES:
  DetectionCandidate[] =
  Object.entries(
    SUBCATEGORY_METADATA
  )
    .flatMap(
      ([subcategory, metadata]) => {
        const normalizedSubcategory =
          normalizeText(subcategory);

        const uniqueTerms = new Map<
          string,
          {
            originalTerm: string;
            matchedBy: ProductCategoryMatchType;
          }
        >();

        function addTerm(
          term: string,
          matchedBy: ProductCategoryMatchType
        ) {
          const normalizedTerm =
            normalizeText(term);

          if (!normalizedTerm) {
            return;
          }

          const existing =
            uniqueTerms.get(normalizedTerm);

          /*
           * Preserve the strongest match type when
           * the same normalized term appears more
           * than once.
           */
          if (existing) {
            const existingScore =
              getBaseScore(existing.matchedBy);

            const newScore =
              getBaseScore(matchedBy);

            if (existingScore >= newScore) {
              return;
            }
          }

          uniqueTerms.set(
            normalizedTerm,
            {
              originalTerm: term,
              matchedBy,
            }
          );
        }

        addTerm(
          subcategory,
          "subcategory"
        );

        for (
          const keyword
          of metadata.productKeywords ?? []
        ) {
          const normalizedKeyword =
            normalizeText(keyword);

          addTerm(
            keyword,
            normalizedKeyword ===
              normalizedSubcategory
              ? "subcategory"
              : "productKeyword"
          );
        }

        for (
          const alias
          of metadata.shoppingAliases ?? []
        ) {
          addTerm(
            alias,
            "shoppingAlias"
          );
        }

        return Array.from(
          uniqueTerms.entries()
        ).map(
          ([
            normalizedTerm,
            termData,
          ]) => ({
            category: metadata.category,
            subcategory,
            originalTerm:
              termData.originalTerm,
            normalizedTerm,
            matchedBy:
              termData.matchedBy,
            wordCount:
              getWordCount(normalizedTerm),
          })
        );
      }
    )
    .sort((a, b) => {
      /*
       * Prefer terms containing more words.
       */
      if (b.wordCount !== a.wordCount) {
        return b.wordCount - a.wordCount;
      }

      /*
       * Then prefer longer phrases.
       */
      return (
        b.normalizedTerm.length -
        a.normalizedTerm.length
      );
    });

function calculateCandidateScore(
  candidate: DetectionCandidate,
  normalizedName: string
): number {
  const searchableName =
    ` ${normalizedName} `;

  const searchableTerm =
    ` ${candidate.normalizedTerm} `;

  const isExactMatch =
    normalizedName ===
    candidate.normalizedTerm;

  const isPhraseMatch =
    searchableName.includes(
      searchableTerm
    );

  if (!isExactMatch && !isPhraseMatch) {
    return 0;
  }

  let score =
    getBaseScore(candidate.matchedBy);

  /*
   * Exact product-name matches should be very
   * strong.
   */
  if (isExactMatch) {
    score += 80;
  }

  /*
   * Reward more specific phrases.
   */
  score += candidate.wordCount * 15;

  score += Math.min(
    candidate.normalizedTerm.length,
    40
  );

  /*
   * Weak one-word terms receive a penalty.
   * This reduces false matches from generic words.
   */
  if (
    candidate.wordCount === 1 &&
    candidate.normalizedTerm.length <= 3
  ) {
    score -= 60;
  } else if (
    candidate.wordCount === 1 &&
    candidate.normalizedTerm.length <= 4
  ) {
    score -= 30;
  }

  return Math.max(score, 0);
}

export function detectProductCategory(
  productName: string
): DetectedProductCategory | null {
  const normalizedName =
    normalizeText(productName);

  if (normalizedName.length < 3) {
    return null;
  }

  const scoredDetections =
    new Map<string, ScoredDetection>();

  for (
    const candidate
    of DETECTION_CANDIDATES
  ) {
    const individualScore =
      calculateCandidateScore(
        candidate,
        normalizedName
      );

    if (individualScore <= 0) {
      continue;
    }

    const key =
      `${candidate.category}::${candidate.subcategory}`;

    const existing =
      scoredDetections.get(key);

    if (!existing) {
      scoredDetections.set(
        key,
        {
          category: candidate.category,
          subcategory:
            candidate.subcategory,
          score: individualScore,
          bestMatchedTerm:
            candidate.originalTerm,
          bestMatchedBy:
            candidate.matchedBy,
          bestIndividualScore:
            individualScore,
          matchedTerms: new Set([
            candidate.normalizedTerm,
          ]),
        }
      );

      continue;
    }

    /*
     * Do not award duplicate points for the same
     * normalized term.
     */
    if (
      !existing.matchedTerms.has(
        candidate.normalizedTerm
      )
    ) {
      existing.matchedTerms.add(
        candidate.normalizedTerm
      );

      /*
       * Additional matches support the result,
       * but contribute less than the strongest
       * initial match.
       */
      existing.score += Math.round(
        individualScore * 0.35
      );
    }

    if (
      individualScore >
      existing.bestIndividualScore
    ) {
      existing.bestIndividualScore =
        individualScore;

      existing.bestMatchedTerm =
        candidate.originalTerm;

      existing.bestMatchedBy =
        candidate.matchedBy;
    }
  }

  const rankedResults =
    Array.from(
      scoredDetections.values()
    ).sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (
        b.bestIndividualScore !==
        a.bestIndividualScore
      ) {
        return (
          b.bestIndividualScore -
          a.bestIndividualScore
        );
      }

      /*
       * Stable alphabetical tie-breaking prevents
       * inconsistent results between runs.
       */
      const categoryComparison =
        a.category.localeCompare(
          b.category
        );

      if (categoryComparison !== 0) {
        return categoryComparison;
      }

      return a.subcategory.localeCompare(
        b.subcategory
      );
    });

  const bestMatch =
    rankedResults[0];

  if (!bestMatch) {
    return null;
  }

  /*
   * Reject extremely weak matches.
   */
  if (bestMatch.score < 65) {
    return null;
  }

  return {
    category: bestMatch.category,
    subcategory:
      bestMatch.subcategory,
    matchedTerm:
      bestMatch.bestMatchedTerm,
    matchedBy:
      bestMatch.bestMatchedBy,
    score: bestMatch.score,
    confidence:
      getConfidence(bestMatch.score),
  };
}