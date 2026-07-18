// src/constants/productUnits.ts

export const PRODUCT_UNIT_GROUPS = [
  "Individual",
  "Packaging",
  "Food",
  "Weight",
  "Volume",
  "Length",
  "Area",
  "Hardware",
  "Medicine",
  "Pet Supplies",
  "Miscellaneous",
] as const;

export type ProductUnitGroup =
  typeof PRODUCT_UNIT_GROUPS[number];

export interface ProductUnitMetadata {
  name: string;
  group: ProductUnitGroup;
  aliases: string[];
}

export const PRODUCT_UNIT_METADATA: ProductUnitMetadata[] = [
  // =====================================================
  // Individual
  // =====================================================

  {
    name: "Piece",
    group: "Individual",
    aliases: [
      "pc",
      "pcs",
      "piece",
      "pieces",
      "each",
      "ea",
    ],
  },
  {
    name: "Unit",
    group: "Individual",
    aliases: [
      "unit",
      "units",
    ],
  },
  {
    name: "Item",
    group: "Individual",
    aliases: [
      "item",
      "items",
    ],
  },
  {
    name: "Pair",
    group: "Individual",
    aliases: [
      "pair",
      "pairs",
      "pr",
    ],
  },
  {
    name: "Set",
    group: "Individual",
    aliases: [
      "set",
      "sets",
    ],
  },

  // =====================================================
  // Packaging
  // =====================================================

  {
    name: "Pack",
    group: "Packaging",
    aliases: [
      "pack",
      "packs",
      "pk",
      "pkg",
    ],
  },
  {
    name: "Packet",
    group: "Packaging",
    aliases: [
      "packet",
      "packets",
      "pkt",
    ],
  },
  {
    name: "Box",
    group: "Packaging",
    aliases: [
      "box",
      "boxes",
      "bx",
    ],
  },
  {
    name: "Carton",
    group: "Packaging",
    aliases: [
      "carton",
      "cartons",
      "ctn",
    ],
  },
  {
    name: "Case",
    group: "Packaging",
    aliases: [
      "case",
      "cases",
      "cs",
    ],
  },
  {
    name: "Bundle",
    group: "Packaging",
    aliases: [
      "bundle",
      "bundles",
      "bdl",
    ],
  },
  {
    name: "Bag",
    group: "Packaging",
    aliases: [
      "bag",
      "bags",
    ],
  },
  {
    name: "Pouch",
    group: "Packaging",
    aliases: [
      "pouch",
      "pouches",
    ],
  },
  {
    name: "Sachet",
    group: "Packaging",
    aliases: [
      "sachet",
      "sachets",
      "sct",
    ],
  },
  {
    name: "Wrapper",
    group: "Packaging",
    aliases: [
      "wrapper",
      "wrappers",
    ],
  },
  {
    name: "Wrap",
    group: "Packaging",
    aliases: [
      "wrap",
      "wraps",
    ],
  },
  {
    name: "Roll",
    group: "Packaging",
    aliases: [
      "roll",
      "rolls",
      "rl",
    ],
  },
  {
    name: "Ream",
    group: "Packaging",
    aliases: [
      "ream",
      "reams",
    ],
  },
  {
    name: "Tube",
    group: "Packaging",
    aliases: [
      "tube",
      "tubes",
    ],
  },
  {
    name: "Stick",
    group: "Packaging",
    aliases: [
      "stick",
      "sticks",
    ],
  },
  {
    name: "Strip",
    group: "Packaging",
    aliases: [
      "strip",
      "strips",
    ],
  },
  {
    name: "Blister Pack",
    group: "Packaging",
    aliases: [
      "blister",
      "blister pack",
      "blister packs",
    ],
  },
  {
    name: "Bottle",
    group: "Packaging",
    aliases: [
      "bottle",
      "bottles",
      "btl",
      "btls",
    ],
  },
  {
    name: "Jug",
    group: "Packaging",
    aliases: [
      "jug",
      "jugs",
    ],
  },
  {
    name: "Jar",
    group: "Packaging",
    aliases: [
      "jar",
      "jars",
    ],
  },
  {
    name: "Can",
    group: "Packaging",
    aliases: [
      "can",
      "cans",
    ],
  },
  {
    name: "Tin",
    group: "Packaging",
    aliases: [
      "tin",
      "tins",
    ],
  },
  {
    name: "Drum",
    group: "Packaging",
    aliases: [
      "drum",
      "drums",
    ],
  },
  {
    name: "Bucket",
    group: "Packaging",
    aliases: [
      "bucket",
      "buckets",
      "pail",
      "pails",
    ],
  },
  {
    name: "Tub",
    group: "Packaging",
    aliases: [
      "tub",
      "tubs",
    ],
  },
  {
    name: "Cup",
    group: "Packaging",
    aliases: [
      "cup",
      "cups",
    ],
  },
  {
    name: "Tray",
    group: "Packaging",
    aliases: [
      "tray",
      "trays",
    ],
  },
  {
    name: "Basket",
    group: "Packaging",
    aliases: [
      "basket",
      "baskets",
    ],
  },
  {
    name: "Crate",
    group: "Packaging",
    aliases: [
      "crate",
      "crates",
    ],
  },
  {
    name: "Pallet",
    group: "Packaging",
    aliases: [
      "pallet",
      "pallets",
    ],
  },
  {
    name: "Cylinder",
    group: "Packaging",
    aliases: [
      "cylinder",
      "cylinders",
      "tank",
    ],
  },

  // =====================================================
  // Food
  // =====================================================

  {
    name: "Slice",
    group: "Food",
    aliases: [
      "slice",
      "slices",
    ],
  },
  {
    name: "Loaf",
    group: "Food",
    aliases: [
      "loaf",
      "loaves",
    ],
  },
  {
    name: "Serving",
    group: "Food",
    aliases: [
      "serving",
      "servings",
    ],
  },
  {
    name: "Portion",
    group: "Food",
    aliases: [
      "portion",
      "portions",
    ],
  },
  {
    name: "Dozen",
    group: "Food",
    aliases: [
      "dozen",
      "dozens",
      "doz",
      "12 pieces",
      "12 pcs",
    ],
  },
  {
    name: "Half Dozen",
    group: "Food",
    aliases: [
      "half dozen",
      "6 pieces",
      "6 pcs",
    ],
  },
  {
    name: "Bunch",
    group: "Food",
    aliases: [
      "bunch",
      "bunches",
    ],
  },
  {
    name: "Cluster",
    group: "Food",
    aliases: [
      "cluster",
      "clusters",
    ],
  },
  {
    name: "Head",
    group: "Food",
    aliases: [
      "head",
      "heads",
    ],
  },
  {
    name: "Ear",
    group: "Food",
    aliases: [
      "ear",
      "ears",
    ],
  },
  {
    name: "Bulb",
    group: "Food",
    aliases: [
      "bulb",
      "bulbs",
    ],
  },
  {
    name: "Clove",
    group: "Food",
    aliases: [
      "clove",
      "cloves",
    ],
  },
  {
    name: "Stalk",
    group: "Food",
    aliases: [
      "stalk",
      "stalks",
    ],
  },
  {
    name: "Sprig",
    group: "Food",
    aliases: [
      "sprig",
      "sprigs",
    ],
  },
  {
    name: "Leaf",
    group: "Food",
    aliases: [
      "leaf",
      "leaves",
    ],
  },
  {
    name: "Fillet",
    group: "Food",
    aliases: [
      "fillet",
      "fillets",
    ],
  },
  {
    name: "Cut",
    group: "Food",
    aliases: [
      "cut",
      "cuts",
    ],
  },
  {
    name: "Block",
    group: "Food",
    aliases: [
      "block",
      "blocks",
    ],
  },
  {
    name: "Bar",
    group: "Food",
    aliases: [
      "bar",
      "bars",
    ],
  },

  // =====================================================
  // Weight
  // =====================================================

  {
    name: "Microgram",
    group: "Weight",
    aliases: [
      "microgram",
      "micrograms",
      "mcg",
      "μg",
      "ug",
    ],
  },
  {
    name: "Milligram",
    group: "Weight",
    aliases: [
      "milligram",
      "milligrams",
      "mg",
    ],
  },
  {
    name: "Gram",
    group: "Weight",
    aliases: [
      "gram",
      "grams",
      "g",
      "gm",
      "gms",
    ],
  },
  {
    name: "Kilogram",
    group: "Weight",
    aliases: [
      "kilogram",
      "kilograms",
      "kg",
      "kgs",
      "kilo",
      "kilos",
    ],
  },
  {
    name: "Metric Ton",
    group: "Weight",
    aliases: [
      "metric ton",
      "metric tons",
      "tonne",
      "tonnes",
      "mt",
    ],
  },
  {
    name: "Ounce",
    group: "Weight",
    aliases: [
      "ounce",
      "ounces",
      "oz",
    ],
  },
  {
    name: "Pound",
    group: "Weight",
    aliases: [
      "pound",
      "pounds",
      "lb",
      "lbs",
    ],
  },

  // =====================================================
  // Volume
  // =====================================================

  {
    name: "Drop",
    group: "Volume",
    aliases: [
      "drop",
      "drops",
      "gtt",
    ],
  },
  {
    name: "Teaspoon",
    group: "Volume",
    aliases: [
      "teaspoon",
      "teaspoons",
      "tsp",
    ],
  },
  {
    name: "Tablespoon",
    group: "Volume",
    aliases: [
      "tablespoon",
      "tablespoons",
      "tbsp",
      "tbs",
    ],
  },
  {
    name: "Fluid Ounce",
    group: "Volume",
    aliases: [
      "fluid ounce",
      "fluid ounces",
      "fl oz",
      "floz",
    ],
  },
  {
    name: "Pint",
    group: "Volume",
    aliases: [
      "pint",
      "pints",
      "pt",
    ],
  },
  {
    name: "Quart",
    group: "Volume",
    aliases: [
      "quart",
      "quarts",
      "qt",
    ],
  },
  {
    name: "Gallon",
    group: "Volume",
    aliases: [
      "gallon",
      "gallons",
      "gal",
    ],
  },
  {
    name: "Milliliter",
    group: "Volume",
    aliases: [
      "milliliter",
      "milliliters",
      "millilitre",
      "millilitres",
      "ml",
      "mL",
    ],
  },
  {
    name: "Centiliter",
    group: "Volume",
    aliases: [
      "centiliter",
      "centiliters",
      "centilitre",
      "centilitres",
      "cl",
      "cL",
    ],
  },
  {
    name: "Deciliter",
    group: "Volume",
    aliases: [
      "deciliter",
      "deciliters",
      "decilitre",
      "decilitres",
      "dl",
      "dL",
    ],
  },
  {
    name: "Liter",
    group: "Volume",
    aliases: [
      "liter",
      "liters",
      "litre",
      "litres",
      "l",
      "L",
      "ltr",
      "ltrs",
    ],
  },

  // =====================================================
  // Length
  // =====================================================

  {
    name: "Millimeter",
    group: "Length",
    aliases: [
      "millimeter",
      "millimeters",
      "millimetre",
      "millimetres",
      "mm",
    ],
  },
  {
    name: "Centimeter",
    group: "Length",
    aliases: [
      "centimeter",
      "centimeters",
      "centimetre",
      "centimetres",
      "cm",
    ],
  },
  {
    name: "Meter",
    group: "Length",
    aliases: [
      "meter",
      "meters",
      "metre",
      "metres",
      "m",
    ],
  },
  {
    name: "Kilometer",
    group: "Length",
    aliases: [
      "kilometer",
      "kilometers",
      "kilometre",
      "kilometres",
      "km",
    ],
  },
  {
    name: "Inch",
    group: "Length",
    aliases: [
      "inch",
      "inches",
      "in",
    ],
  },
  {
    name: "Foot",
    group: "Length",
    aliases: [
      "foot",
      "feet",
      "ft",
    ],
  },
  {
    name: "Yard",
    group: "Length",
    aliases: [
      "yard",
      "yards",
      "yd",
    ],
  },

  // =====================================================
  // Area
  // =====================================================

  {
    name: "Square Meter",
    group: "Area",
    aliases: [
      "square meter",
      "square meters",
      "square metre",
      "square metres",
      "sqm",
      "sq m",
      "m2",
      "m²",
    ],
  },
  {
    name: "Square Foot",
    group: "Area",
    aliases: [
      "square foot",
      "square feet",
      "sq ft",
      "sqft",
      "ft2",
      "ft²",
    ],
  },

  // =====================================================
  // Hardware
  // =====================================================

  {
    name: "Sheet",
    group: "Hardware",
    aliases: [
      "sheet",
      "sheets",
    ],
  },
  {
    name: "Panel",
    group: "Hardware",
    aliases: [
      "panel",
      "panels",
    ],
  },
  {
    name: "Rod",
    group: "Hardware",
    aliases: [
      "rod",
      "rods",
    ],
  },
  {
    name: "Pipe",
    group: "Hardware",
    aliases: [
      "pipe",
      "pipes",
    ],
  },
  {
    name: "Coil",
    group: "Hardware",
    aliases: [
      "coil",
      "coils",
    ],
  },
  {
    name: "Spool",
    group: "Hardware",
    aliases: [
      "spool",
      "spools",
    ],
  },
  {
    name: "Reel",
    group: "Hardware",
    aliases: [
      "reel",
      "reels",
    ],
  },
  {
    name: "Length",
    group: "Hardware",
    aliases: [
      "length",
      "lengths",
    ],
  },

  // =====================================================
  // Medicine
  // =====================================================

  {
    name: "Tablet",
    group: "Medicine",
    aliases: [
      "tablet",
      "tablets",
      "tab",
      "tabs",
    ],
  },
  {
    name: "Capsule",
    group: "Medicine",
    aliases: [
      "capsule",
      "capsules",
      "cap",
      "caps",
    ],
  },
  {
    name: "Caplet",
    group: "Medicine",
    aliases: [
      "caplet",
      "caplets",
    ],
  },
  {
    name: "Softgel",
    group: "Medicine",
    aliases: [
      "softgel",
      "softgels",
      "soft gel",
      "soft gels",
    ],
  },
  {
    name: "Pill",
    group: "Medicine",
    aliases: [
      "pill",
      "pills",
    ],
  },
  {
    name: "Ampoule",
    group: "Medicine",
    aliases: [
      "ampoule",
      "ampoules",
      "ampule",
      "ampules",
    ],
  },
  {
    name: "Vial",
    group: "Medicine",
    aliases: [
      "vial",
      "vials",
    ],
  },
  {
    name: "Dose",
    group: "Medicine",
    aliases: [
      "dose",
      "doses",
      "dosage",
    ],
  },
  {
    name: "Application",
    group: "Medicine",
    aliases: [
      "application",
      "applications",
      "apply",
    ],
  },
  {
    name: "Patch",
    group: "Medicine",
    aliases: [
      "patch",
      "patches",
    ],
  },
  {
    name: "Suppository",
    group: "Medicine",
    aliases: [
      "suppository",
      "suppositories",
    ],
  },

  // =====================================================
  // Pet Supplies
  // =====================================================

  {
    name: "Pellet",
    group: "Pet Supplies",
    aliases: [
      "pellet",
      "pellets",
    ],
  },
  {
    name: "Brick",
    group: "Pet Supplies",
    aliases: [
      "brick",
      "bricks",
    ],
  },

  // =====================================================
  // Miscellaneous
  // =====================================================

  {
    name: "Bundle of 10",
    group: "Miscellaneous",
    aliases: [
      "bundle 10",
      "bundle of 10",
      "10 pack",
      "pack of 10",
    ],
  },
  {
    name: "Bundle of 50",
    group: "Miscellaneous",
    aliases: [
      "bundle 50",
      "bundle of 50",
      "50 pack",
      "pack of 50",
    ],
  },
  {
    name: "Bundle of 100",
    group: "Miscellaneous",
    aliases: [
      "bundle 100",
      "bundle of 100",
      "100 pack",
      "pack of 100",
    ],
  },
  {
    name: "Kit",
    group: "Miscellaneous",
    aliases: [
      "kit",
      "kits",
    ],
  },
  {
    name: "Assortment",
    group: "Miscellaneous",
    aliases: [
      "assortment",
      "assortments",
      "assorted",
    ],
  },
];

/*
 * Existing components can continue using this flat array.
 */
export const PRODUCT_UNITS = PRODUCT_UNIT_METADATA.map(
  unit => unit.name
);

/*
 * Creates a strict union type:
 *
 * "Piece" | "Pack" | "Box" | ...
 */
export type ProductUnit =
  typeof PRODUCT_UNIT_METADATA[number]["name"];

/*
 * Units organized by section.
 */
export const PRODUCT_UNITS_BY_GROUP =
  PRODUCT_UNIT_GROUPS.reduce<
    Record<ProductUnitGroup, string[]>
  >(
    (result, group) => {
      result[group] =
        PRODUCT_UNIT_METADATA
          .filter(unit => unit.group === group)
          .map(unit => unit.name);

      return result;
    },
    {
      Individual: [],
      Packaging: [],
      Food: [],
      Weight: [],
      Volume: [],
      Length: [],
      Area: [],
      Hardware: [],
      Medicine: [],
      "Pet Supplies": [],
      Miscellaneous: [],
    }
  );

  function normalizeUnitSearch(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9μ²]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchProductUnits(
  query: string
): ProductUnitMetadata[] {
  const normalizedQuery =
    normalizeUnitSearch(query);

  if (!normalizedQuery) {
    return PRODUCT_UNIT_METADATA;
  }

  return PRODUCT_UNIT_METADATA.filter(
    unit => {
      const searchableTerms = [
        unit.name,
        unit.group,
        ...unit.aliases,
      ];

      return searchableTerms.some(term =>
        normalizeUnitSearch(term).includes(
          normalizedQuery
        )
      );
    }
  );
}

export function getProductUnitMetadata(
  name: string
): ProductUnitMetadata | undefined {
  return PRODUCT_UNIT_METADATA.find(
    unit => unit.name === name
  );
}

export const PRODUCT_UNIT_DROPDOWN_ITEMS =
  PRODUCT_UNIT_METADATA.map(unit => ({
    label: unit.name,
    value: unit.name,
    keywords: [
      unit.name,
      ...unit.aliases,
    ],
    section: unit.group,
  }));