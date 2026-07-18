import {
  SUBCATEGORY_METADATA,
} from "../constants/subcategoryMetadata";

export interface DetectedProductCategory {
  category: string;
  subcategory: string;
  matchedTerm: string;
  matchedBy:
    | "subcategory"
    | "productKeyword";
}

interface DetectionCandidate {
  category: string;
  subcategory: string;
  originalKeyword: string;
  normalizedKeyword: string;
  matchedBy:
    | "subcategory"
    | "productKeyword";
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

/*
 * This list is created and sorted only once
 * when the module is imported.
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
          string
        >();

        const allTerms = [
          subcategory,
          ...metadata.productKeywords,
        ];

        for (const term of allTerms) {
          const normalizedTerm =
            normalizeText(term);

          if (!normalizedTerm) {
            continue;
          }

          /*
           * Keep the first version of duplicate
           * keywords regardless of capitalization.
           */
          if (
            !uniqueTerms.has(normalizedTerm)
          ) {
            uniqueTerms.set(
              normalizedTerm,
              term
            );
          }
        }

        return Array.from(
          uniqueTerms.entries()
        ).map(
          ([
            normalizedKeyword,
            originalKeyword,
          ]) => ({
            category: metadata.category,
            subcategory,
            originalKeyword,
            normalizedKeyword,

            matchedBy:
              normalizedKeyword ===
              normalizedSubcategory
                ? "subcategory" as const
                : "productKeyword" as const,
          })
        );
      }
    )
    /*
     * Longer and more specific phrases
     * are checked before shorter phrases.
     */
    .sort(
      (a, b) =>
        b.normalizedKeyword.length -
        a.normalizedKeyword.length
    );

export function detectProductCategory(
  productName: string
): DetectedProductCategory | null {
  const normalizedName =
    normalizeText(productName);

  if (normalizedName.length < 3) {
    return null;
  }

  const searchableName =
    ` ${normalizedName} `;

  for (
    const candidate
    of DETECTION_CANDIDATES
  ) {
    const searchableKeyword =
      ` ${candidate.normalizedKeyword} `;

    if (
      !searchableName.includes(
        searchableKeyword
      )
    ) {
      continue;
    }

    return {
      category: candidate.category,
      subcategory:
        candidate.subcategory,
      matchedTerm:
        candidate.originalKeyword,
      matchedBy:
        candidate.matchedBy,
    };
  }

  return null;
}