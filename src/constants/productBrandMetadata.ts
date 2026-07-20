import type {
  ProductBrandMetadataMap,
} from "./productBrandMetadata.types";

export const PRODUCT_BRAND_METADATA = {
  "lucky-me": {
    id: "lucky-me",
    name: "Lucky Me",

    aliases: [
      {
        value: "Lucky Me",
        type: "official",
        priority: 100,
        strength: "strong",
      },
      {
        value: "LuckyMe",
        type: "commonName",
        priority: 90,
        strength: "strong",
      },
    ],

    productLines: {
      "pancit-canton": {
        name: "Pancit Canton",

        aliases: [
          {
            value: "Pancit Canton",
            type: "official",
            priority: 90,
          },
        ],

        categories: ["Grocery"],
        subcategories: ["Instant Noodles"],
        preserveInProductName: true,
      },
    },

    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  nissin: {
    id: "nissin",
    name: "Nissin",

    aliases: [
      {
        value: "Nissin",
        type: "official",
        priority: 100,
        strength: "strong",
      },
    ],

    productLines: {
      "cup-noodles": {
        name: "Cup Noodles",

        aliases: [
          {
            value: "Cup Noodles",
            type: "official",
            priority: 90,
          },
          {
            value: "Cup Noodle",
            type: "commonName",
            priority: 80,
          },
        ],

        categories: ["Grocery"],
        subcategories: ["Instant Noodles"],
        preserveInProductName: true,
      },

      yakisoba: {
        name: "Yakisoba",

        aliases: [
          {
            value: "Yakisoba",
            type: "official",
            priority: 90,
          },
        ],

        categories: ["Grocery"],
        subcategories: ["Instant Noodles"],
        preserveInProductName: true,
      },
    },

    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  "coca-cola": {
    id: "coca-cola",
    name: "Coca-Cola",

    aliases: [
      {
        value: "Coca-Cola",
        type: "official",
        priority: 100,
        strength: "strong",
      },
      {
        value: "Coca Cola",
        type: "commonName",
        priority: 100,
        strength: "strong",
      },
      {
        value: "Coke",
        type: "nickname",
        priority: 85,
        strength: "normal",
        categories: ["Grocery"],
        subcategories: ["Soft Drinks"],
      },
    ],

    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  joy: {
    id: "joy",
    name: "Joy",

    aliases: [
      {
        value: "Joy Dishwashing Liquid",
        type: "official",
        priority: 130,
        strength: "strong",
        categories: ["Household"],
        subcategories: [
          "Dishwashing Liquid",
        ],
      },
      {
        value: "Joy Dishwashing",
        type: "commonName",
        priority: 120,
        strength: "strong",
        categories: ["Household"],
        subcategories: [
          "Dishwashing Liquid",
        ],
      },
      {
        value: "Joy",
        type: "official",
        priority: 50,
        strength: "weak",
        requiresCategoryContext: true,
        categories: ["Household"],
        subcategories: [
          "Dishwashing Liquid",
        ],
      },
    ],

    categories: ["Household"],
    subcategories: ["Dishwashing Liquid"],
  },
} satisfies ProductBrandMetadataMap;