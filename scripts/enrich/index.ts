import type { BrandMetadata } from "./types";

export interface MetadataEnricher {
  name: string;

  enrich(
    brands: Map<string, BrandMetadata>
  ): void;
}

const enrichers: MetadataEnricher[] = [];

export function registerMetadataEnricher(
  enricher: MetadataEnricher
) {
  enrichers.push(enricher);
}

export function runMetadataEnrichment(
  brands: Map<string, BrandMetadata>
) {
  for (const enricher of enrichers) {
    console.log(
      `Running enrichment: ${enricher.name}`
    );

    enricher.enrich(brands);
  }
}