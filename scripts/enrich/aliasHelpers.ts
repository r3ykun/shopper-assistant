import type { BrandMetadata, BrandAliasMetadata } from "./types";

function normalizeAliasValue(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

function addGeneratedAlias(
  brand: BrandMetadata,
  value: string,
  type: BrandAliasMetadata["type"],
  priority: number,
  strength: BrandAliasMetadata["strength"]
): void {
  const normalized = normalizeAliasValue(value);

  if (
    normalized.length < 3 ||
    normalized.toLowerCase() === brand.name.toLowerCase() ||
    brand.aliases.some(
      alias =>
        alias.value.toLowerCase() ===
        normalized.toLowerCase()
    )
  ) {
    return;
  }

  brand.aliases.push({
    value: normalized,
    type,
    priority,
    strength,
  });
}
