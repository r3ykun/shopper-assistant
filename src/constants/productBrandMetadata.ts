export type ProductBrandAliasType =
  | "brand"
  | "productLine"
  | "variant"
  | "abbreviation"
  | "formerName"
  | "commonName"
  | "nickname"
  | "misspelling";

export interface ProductBrandAlias {
  value: string;
  removeFromProductName: boolean;
  priority?: number;
  type?: ProductBrandAliasType;
}

export interface ProductBrandMetadata {
  aliases: ProductBrandAlias[];
  categories?: string[];
  subcategories?: string[];
}

export const PRODUCT_BRAND_METADATA: Record<
  string,
  ProductBrandMetadata
> = {
  // Grocery — Instant Noodles
  "Lucky Me": {
    aliases: [
      { value: "lucky me", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  Nissin: {
    aliases: [
      { value: "nissin", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "nissin cup noodles", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "cup noodles", removeFromProductName: false, priority: 70, type: "productLine" },
      { value: "yakisoba", removeFromProductName: false, priority: 70, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  Payless: {
    aliases: [
      { value: "payless", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "payless xtra big", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "xtra big", removeFromProductName: false, priority: 70, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  Quickchow: {
    aliases: [
      { value: "quickchow", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "quick chow", removeFromProductName: true, priority: 95, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  Indomie: {
    aliases: [
      { value: "indomie", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "mi goreng", removeFromProductName: false, priority: 75, type: "productLine" },
      { value: "mie goreng", removeFromProductName: false, priority: 75, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles"],
  },

  Maggi: {
    aliases: [
      { value: "maggi", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "magic sarap", removeFromProductName: false, priority: 80, type: "productLine" },
      { value: "maggi magic sarap", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Instant Noodles", "Seasonings"],
  },

  // Grocery — Soft Drinks
  "Coca-Cola": {
    aliases: [
      { value: "coca cola", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "coca-cola", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "coke", removeFromProductName: false, priority: 90, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  Sprite: {
    aliases: [
      { value: "sprite", removeFromProductName: false, priority: 100, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  Royal: {
    aliases: [
      { value: "royal", removeFromProductName: false, priority: 90, type: "productLine" },
      { value: "royal tru orange", removeFromProductName: false, priority: 110, type: "productLine" },
      { value: "royal tru-orange", removeFromProductName: false, priority: 110, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  Pepsi: {
    aliases: [
      { value: "pepsi", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "pepsi cola", removeFromProductName: true, priority: 105, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  "Mountain Dew": {
    aliases: [
      { value: "mountain dew", removeFromProductName: false, priority: 100, type: "productLine" },
      { value: "mtn dew", removeFromProductName: false, priority: 95, type: "abbreviation" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  "7Up": {
    aliases: [
      { value: "7up", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "7 up", removeFromProductName: false, priority: 95, type: "commonName" },
      { value: "seven up", removeFromProductName: false, priority: 90, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  "RC Cola": {
    aliases: [
      { value: "rc cola", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "royal crown cola", removeFromProductName: true, priority: 105, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  Mirinda: {
    aliases: [
      { value: "mirinda", removeFromProductName: false, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  Fanta: {
    aliases: [
      { value: "fanta", removeFromProductName: false, priority: 100, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soft Drinks"],
  },

  // Grocery — Coffee and Chocolate Drinks
  Nescafe: {
    aliases: [
      { value: "nescafe", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "nescafé", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Coffee", "Ready-to-Drink Coffee"],
  },

  Kopiko: {
    aliases: [
      { value: "kopiko", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "kopiko blanca", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "blanca", removeFromProductName: false, priority: 65, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Coffee", "Ready-to-Drink Coffee", "Candy"],
  },

  "Great Taste": {
    aliases: [
      { value: "great taste", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "great taste white", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "great taste granules", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Coffee"],
  },

  "San Mig Coffee": {
    aliases: [
      { value: "san mig coffee", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "san mig", removeFromProductName: true, priority: 75, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Coffee"],
  },

  "Blend 45": {
    aliases: [
      { value: "blend 45", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "blend forty five", removeFromProductName: false, priority: 90, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Coffee"],
  },

  Milo: {
    aliases: [
      { value: "milo", removeFromProductName: false, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Chocolate Drinks", "Powdered Drinks"],
  },

  // Grocery — Canned Goods
  "Century Tuna": {
    aliases: [
      { value: "century tuna", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "century", removeFromProductName: true, priority: 65, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Fish"],
  },

  "Mega Sardines": {
    aliases: [
      { value: "mega sardines", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "mega", removeFromProductName: true, priority: 55, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Fish"],
  },

  "555": {
    aliases: [
      { value: "555 sardines", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "555 tuna", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "555", removeFromProductName: true, priority: 80, type: "brand" },
      { value: "five five five", removeFromProductName: true, priority: 70, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Fish"],
  },

  "San Marino": {
    aliases: [
      { value: "san marino", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "san marino corned tuna", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Fish"],
  },

  Ligo: {
    aliases: [
      { value: "ligo", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "ligo sardines", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Fish"],
  },

  Argentina: {
    aliases: [
      { value: "argentina", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "argentina corned beef", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Meat", "Processed Meat"],
  },

  Purefoods: {
    aliases: [
      { value: "purefoods", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "pure foods", removeFromProductName: true, priority: 90, type: "commonName" },
      { value: "purefoods corned beef", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery", "Fresh Food", "Frozen Food"],
    subcategories: ["Canned Meat", "Processed Meat", "Frozen Meat"],
  },

  Spam: {
    aliases: [
      { value: "spam", removeFromProductName: false, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Meat"],
  },

  Youngstown: {
    aliases: [
      { value: "youngstown", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "youngs town", removeFromProductName: true, priority: 80, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Canned Meat"],
  },

  // Grocery — Snacks
  Oishi: {
    aliases: [
      { value: "oishi", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "oishi noodles", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips", "Crackers", "Instant Noodles"],
  },

  "Jack 'n Jill": {
    aliases: [
      { value: "jack n jill", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "jack 'n jill", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "jack and jill", removeFromProductName: true, priority: 90, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips", "Crackers", "Biscuits", "Cookies"],
  },

  Piattos: {
    aliases: [
      { value: "piattos", removeFromProductName: false, priority: 100, type: "productLine" },
      { value: "piatos", removeFromProductName: false, priority: 85, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips"],
  },

  Nova: {
    aliases: [
      { value: "nova", removeFromProductName: false, priority: 90, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips"],
  },

  Chippy: {
    aliases: [
      { value: "chippy", removeFromProductName: false, priority: 100, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips"],
  },

  "Mr. Chips": {
    aliases: [
      { value: "mr chips", removeFromProductName: false, priority: 100, type: "productLine" },
      { value: "mr. chips", removeFromProductName: false, priority: 100, type: "productLine" },
    ],
    categories: ["Grocery"],
    subcategories: ["Snacks", "Chips"],
  },

  SkyFlakes: {
    aliases: [
      { value: "skyflakes", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "sky flakes", removeFromProductName: false, priority: 90, type: "commonName" },
    ],
    categories: ["Grocery"],
    subcategories: ["Crackers", "Biscuits", "Snacks"],
  },

  Rebisco: {
    aliases: [
      { value: "rebisco", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Crackers", "Biscuits", "Cookies", "Snacks"],
  },

  // Grocery — Milk and Dairy
  "Bear Brand": {
    aliases: [
      { value: "bear brand", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Powdered Milk", "Milk Drinks"],
  },

  "Alaska": {
    aliases: [
      { value: "alaska", removeFromProductName: true, priority: 95, type: "brand" },
      { value: "alaska milk", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Powdered Milk", "Evaporated Milk", "Condensed Milk", "Cream"],
  },

  "Angel": {
    aliases: [
      { value: "angel evaporada", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "angel condensed", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "angel milk", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Evaporated Milk", "Condensed Milk"],
  },

  "Dutch Mill": {
    aliases: [
      { value: "dutch mill", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Yogurt", "Milk Drinks"],
  },

  // Grocery — Condiments and Seasonings
  "Datu Puti": {
    aliases: [
      { value: "datu puti", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "datu puti vinegar", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "datu puti soy sauce", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "datu puti oil", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Vinegar", "Soy Sauce", "Condiments", "Cooking Oil"],
  },

  "Silver Swan": {
    aliases: [
      { value: "silver swan", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Soy Sauce", "Vinegar", "Condiments"],
  },

  "Mang Tomas": {
    aliases: [
      { value: "mang tomas", removeFromProductName: false, priority: 100, type: "brand" },
      { value: "mang tomas all purpose sauce", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Condiments"],
  },

  Knorr: {
    aliases: [
      { value: "knorr", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Seasonings", "Soup & Broth", "Instant Meals"],
  },

  Ajinomoto: {
    aliases: [
      { value: "ajinomoto", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Grocery"],
    subcategories: ["Seasonings"],
  },

  // Household
  Tide: {
    aliases: [
      { value: "tide", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Laundry Detergent"],
  },

  Ariel: {
    aliases: [
      { value: "ariel", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Laundry Detergent"],
  },

  Surf: {
    aliases: [
      { value: "surf detergent", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "surf", removeFromProductName: true, priority: 75, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Laundry Detergent"],
  },

  Breeze: {
    aliases: [
      { value: "breeze detergent", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "breeze", removeFromProductName: true, priority: 65, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Laundry Detergent"],
  },

  Champion: {
    aliases: [
      { value: "champion detergent", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Laundry Detergent"],
  },

  Downy: {
    aliases: [
      { value: "downy", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Fabric Conditioner"],
  },

  Comfort: {
    aliases: [
      { value: "comfort fabric conditioner", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "comfort fabric", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Fabric Conditioner"],
  },

  Zonrox: {
    aliases: [
      { value: "zonrox", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Bleach", "Disinfectant"],
  },

  Clorox: {
    aliases: [
      { value: "clorox", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Bleach", "Disinfectant"],
  },

  Joy: {
    aliases: [
      { value: "joy dishwashing", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "joy dishwashing liquid", removeFromProductName: true, priority: 115, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Dishwashing Liquid"],
  },

  Smart: {
    aliases: [
      { value: "smart dishwashing", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Dishwashing Liquid"],
  },

  Sunlight: {
    aliases: [
      { value: "sunlight dishwashing", removeFromProductName: true, priority: 110, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Dishwashing Liquid"],
  },

  Axion: {
    aliases: [
      { value: "axion dishwashing", removeFromProductName: true, priority: 110, type: "brand" },
      { value: "axion", removeFromProductName: true, priority: 85, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Dishwashing Liquid", "Dishwashing Paste"],
  },

  Lysol: {
    aliases: [
      { value: "lysol", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Floor Cleaner", "Disinfectant", "Multipurpose Cleaner"],
  },

  Harpic: {
    aliases: [
      { value: "harpic", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Toilet Cleaner"],
  },

  Glade: {
    aliases: [
      { value: "glade", removeFromProductName: true, priority: 100, type: "brand" },
    ],
    categories: ["Household"],
    subcategories: ["Air Freshener"],
  },

  "Air Wick": {
    aliases: [
      { value: "air wick", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "airwick", removeFromProductName: true, priority: 90, type: "commonName" },
    ],
    categories: ["Household"],
    subcategories: ["Air Freshener"],
  },

  "Ambi Pur": {
    aliases: [
      { value: "ambi pur", removeFromProductName: true, priority: 100, type: "brand" },
      { value: "ambipur", removeFromProductName: true, priority: 90, type: "commonName" },
    ],
    categories: ["Household", "Automotive"],
    subcategories: ["Air Freshener", "Car Air Fresheners"],
  },
};