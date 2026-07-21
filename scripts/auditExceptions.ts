export const PROMOTED_PRODUCT_LINE_EXCEPTIONS =
  new Set<string>([
    "mega::chef::megachef",
  ]);

export const EQUIVALENT_BRAND_EXCEPTIONS =
  new Set<string>();

export const ALIAS_CONFLICT_EXCEPTIONS =
  new Set<string>();

export function promotedProductLineKey(
  brandId: string,
  lineId: string,
  promotedBrandId: string
): string {
  return `${brandId}::${lineId}::${promotedBrandId}`;
}