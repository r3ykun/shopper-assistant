import { PRODUCT_CATEGORY_ALIASES } from "./productCategoryAliases";

const EXTRA_SHOPPING_ALIASES: Record<string, string[]> = {
  // Grocery
  Rice: ["kanin"],
  "Bread & Bakery": ["tinapay", "loaf"],
  "Canned Fish": ["tuna", "sardinas"],
  "Canned Meat": ["de lata"],
  "Cooking Oil": ["mantika", "oil"],
  Condiments: ["sawsawan"],
  Seasonings: ["pampalasa"],
  Snacks: ["chichirya"],
  Biscuits: ["biskwit"],
  Candy: ["kendi"],
  "Dairy Milk": ["milk"],
  "Powdered Milk": ["powdered milk", "gatas"],
  "Evaporated Milk": ["evap", "evaporada", "malagnaw na gatas"],
  "Condensed Milk": ["condensed", "kondensada", "malapot na gatas"],
  Eggs: ["itlog"],
  Coffee: ["kape", "3in1", "3 in 1"],
  "Soft Drinks": ["softdrink", "softdrinks"],
  Juices: ["inumin"],
  "Bottled Water": ["water", "tubig"],

  // Fresh Food
  "Leafy Vegetables": ["dahon", "leafy vegetables"],
  "Root Crops": ["root crops", "kamote", "gabi"],
  "Fresh Meat": ["karne"],
  Beef: ["baka"],
  Pork: ["baboy"],
  Chicken: ["manok"],
  Seafood: ["lamang dagat"],
  Fish: ["isda"],
  Crab: ["alimasag"],
  "Fresh Eggs": ["itlog"],

  // Frozen Food
  "Frozen Meat": ["frozen karne"],
  "Frozen Meals": ["ready meal", "frozen food"],
  "Frozen Pizza": ["pizza"],
  "Ice Cream": ["sorbetes"],

  // Household
  "Laundry Detergent": ["sabong panlaba"],
  "Laundry Soap": ["sabong panlaba"],
  "Fabric Conditioner": ["fabcon"],
  Bleach: ["zonrox"],
  "Dishwashing Liquid": ["panghugas", "sabon panghugas"],
  "Dishwashing Paste": ["panghugas"],
  "Dishwashing Sponges": ["sponge", "espongha"],
  Scrubbers: ["scrub"],
  "Floor Cleaner": ["panlinis ng sahig"],
  "Toilet Cleaner": ["panlinis ng toilet", "panlinis ng banyo"],
  "Bathroom Cleaner": ["panlinis ng banyo"],
  "Glass Cleaner": ["panlinis ng salamin"],
  "Kitchen Cleaner": ["panlinis ng kusina"],
  "Multipurpose Cleaner": ["general cleaner"],
  Disinfectant: ["disinfecting spray", "pang-disinfect"],
  "Air Freshener": ["room spray", "pabango sa kwarto"],
  "Mosquito Repellent": ["katol", "lamok repellent"],
  "Garbage Bags": ["trash bag", "basurahan bag"],
  "Trash Bins": ["trash can", "garbage can", "basurahan"],
  "Paper Towels": ["kitchen towel"],
  "Table Napkins": ["napkin", "table tissue"],
  "Wet Wipes": ["wipes"],
  "Food Storage Bags": ["ziplock", "zip bag"],
  "Food Storage Containers": ["lalagyan ng pagkain"],
  "Disposable Plates": ["paper plate", "plastic plate"],
  "Disposable Cups": ["paper cup", "plastic cup"],
  "Disposable Cutlery": ["plastic spoon", "plastic fork"],
  "Cleaning Cloths": ["basahan", "cleaning rag"],
  Dustpans: ["pandakot"],
  Buckets: ["timba"],
  "Clothes Hangers": ["sampayan hanger"],
  Clothespins: ["sipit"],
  "Laundry Baskets": ["basket ng damit"],
  Candles: ["kandila"],
  Matches: ["posporo"],
  Lighters: ["sindi"],

  // Personal Care
  Soap: ["body soap", "sabon"],
  "Body Wash": ["liquid soap", "body soap"],
  Shampoo: ["siyampu"],
  Conditioner: ["hair conditioner"],
  Toothpaste: ["pasta ng ngipin"],
  Toothbrush: ["sipilyo"],
  Mouthwash: ["mouth rinse"],
  "Sanitary Napkins": ["napkin", "pads"],
  "Panty Liners": ["liner", "pantyliner"],
  "Baby Wipes": ["wipes", "baby wipes", "baby tissue"],
  "Cotton Balls": ["cotton"],
  "Cotton Buds": ["ear buds"],
  "Face Mask": ["mask"],
  Perfume: ["pabango"],
  Cologne: ["pabango"],
  "Body Spray": ["spray", "pabango"],
  "Petroleum Jelly": ["petroleum"],
  Razors: ["pang-ahit"],
  "Nail Clippers": ["pang-gupit ng kuko"],
  Combs: ["suklay"],
  "Hair Brushes": ["hairbrush", "brush"],
  "Hair Accessories": ["hair tie", "ponytail", "hair clip"],

  // Beauty & Cosmetics
  Makeup: ["cosmetics"],
  Foundation: ["face foundation"],
  "BB Cream": ["bbcream"],
  "CC Cream": ["cccream"],
  "Face Powder": ["powder", "pulbos"],
  Lipstick: ["lip stick"],
  "Lip Tint": ["liptint"],
  Mascara: ["eyelash mascara"],
  Eyeliner: ["eye liner"],
  Eyeshadow: ["eye shadow"],
  "Makeup Remover": ["makeup cleanser"],
  "Micellar Water": ["micellar"],
  Moisturizer: ["face moisturizer"],
  Sunscreen: ["spf"],
  "Body Mist": ["pabango", "mist"],

  // Baby Care
  "Baby Formula": ["baby milk", "gatas ng baby"],
  "Baby Food": ["pagkain ng baby"],
  "Baby Bottles": ["feeding bottle", "dede bottle"],
  "Bottle Nipples": ["tsupon"],
  "Baby Diapers": ["diaper", "lampin"],
  "Training Pants": ["diaper pants"],
  "Baby Powder": ["baby pulbos"],
  "Baby Lotion": ["lotion ng baby"],
  "Baby Shampoo": ["shampoo ng baby"],
  "Baby Soap": ["sabon ng baby"],
  "Baby Oil": ["oil ng baby"],
  Pacifiers: ["tsupon"],
  "Baby Blankets": ["kumot ng baby"],

  // Medicine & Health
  "Pain Relief": ["gamot sa sakit", "gamot sa sakit ng ulo"],
  "Fever Medicine": ["gamot sa lagnat", "fever meds"],
  "Cold Medicine": ["gamot sa sipon", "sipon medicine"],
  "Cough Medicine": ["gamot sa ubo"],
  "Flu Medicine": ["gamot sa trangkaso"],
  "Allergy Medicine": ["gamot sa allergy"],
  Antiseptics: ["panglinis ng sugat"],
  Vitamins: ["bitamina"],
  "Iron Supplements": ["iron"],
  Antacids: ["gamot sa hyperacidity"],
  "Diarrhea Medicine": ["gamot sa diarrhea", "gamot sa pagtatae"],
  Laxatives: ["gamot sa constipation"],
  Gauze: ["gasa"],
  Cotton: ["bulak"],
  "Hydrogen Peroxide": ["agua oxigenada"],
  "Rubbing Alcohol": ["alcohol", "isopropyl alcohol"],
  Thermometers: ["pangkuha ng temperature"],
  "Face Masks": ["mask"],
  "First Aid Kits": ["first aid", "emergency kit"],
  "Eye Drops": ["patak sa mata"],
  "Ear Drops": ["patak sa tenga"],

  // School & Office Supplies
  Notebooks: ["kwaderno"],
  "Writing Pads": ["yellow pad"],
  "Bond Paper": ["short bond paper", "long bond paper"],
  "Colored Paper": ["color paper"],
  Pens: ["ballpoint"],
  Ballpens: ["bolpen"],
  Markers: ["pentel pen"],
  Pencils: ["lapis"],
  "Colored Pencils": ["color pencil"],
  Crayons: ["krayola"],
  Erasers: ["pambura"],
  Sharpeners: ["pantasa"],
  "Correction Tape": ["correction tape", "white tape"],
  "Correction Fluid": ["correction fluid", "liquid eraser"],
  Glue: ["paste", "pandikit"],
  Scissors: ["gunting"],
  Rulers: ["regla"],
  Envelopes: ["sobre"],
  "Printer Ink": ["ink", "printer cartridge"],
  "Printer Toner": ["toner"],
  "School Bags": ["bag"],
  Backpacks: ["bag"],
  "Lunch Boxes": ["baunan"],
  "Water Bottles": ["tumbler"],

  // Hardware
  "Hand Tools": ["tools", "gamit"],
  Hammers: ["martilyo"],
  Screwdrivers: ["distornilyador"],
  Wrenches: ["liyabe"],
  Pliers: ["plays"],
  "Tape Measures": ["metro"],
  "Utility Knives": ["utility cutter"],
  "Hand Saws": ["lagari"],
  Nails: ["pako"],
  Screws: ["turnilyo"],
  "Bolts & Nuts": ["bolt", "nut", "turnilyo at nut"],
  "Wall Plugs": ["tox", "wall anchor"],
  "Cable Ties": ["zip tie", "tie wrap"],
  Ropes: ["lubid"],
  "Steel Wires": ["alambre"],
  Adhesives: ["pandikit"],
  Paint: ["pintura"],
  Sandpaper: ["liha"],
  "Light Bulbs": ["bulb", "bombilya"],
  "Electrical Wires": ["kable"],
  "Electrical Tape": ["electric tape"],
  "Wall Switches": ["switch", "switch ng ilaw"],
  "Electrical Outlets": ["outlet", "saksakan"],
  Faucets: ["gripo"],
  "PVC Pipes & Fittings": ["pvc pipe", "tubo", "pvc fitting"],
  Padlocks: ["kandado"],
  Hinges: ["bisagra"],
  Shovels: ["pala"],
  Rakes: ["kalaykay"],
  "Garden Gloves": ["garden gloves"],

  // Pet Supplies
  "Dog Food": ["pagkain ng aso", "dogfood"],
  "Cat Food": ["pagkain ng pusa", "catfood"],
  "Fish Food": ["pagkain ng isda", "fishfood"],
  "Bird Food": ["pagkain ng ibon", "birdfood"],
  "Pet Treats": ["pet snacks"],
  "Cat Litter": ["buhangin ng pusa"],
  "Pet Bowls": ["food bowl", "water bowl"],
  "Pet Collars": ["cat collar", "kwelyo"],
  "Pet Leashes": ["tali ng aso", "tali ng pusa"],
  "Pet Toys": ["dog toy", "cat toy"],
};

const normalizeAlias = (value: string): string => value.trim().toLowerCase();

const addUniqueAliases = (
  target: Record<string, string[]>,
  subcategory: string,
  aliases: string[]
): void => {
  const existingAliases = target[subcategory] ?? [];
  const normalizedAliases = new Set(existingAliases.map(normalizeAlias));

  for (const alias of aliases) {
    const trimmedAlias = alias.trim();

    if (!trimmedAlias) {
      continue;
    }

    const normalizedAlias = normalizeAlias(trimmedAlias);

    if (!normalizedAliases.has(normalizedAlias)) {
      existingAliases.push(trimmedAlias);
      normalizedAliases.add(normalizedAlias);
    }
  }

  target[subcategory] = existingAliases;
};

const createShoppingAliases = (): Record<string, string[]> => {
  const aliases: Record<string, string[]> = {};

  for (const productAlias of PRODUCT_CATEGORY_ALIASES) {
    addUniqueAliases(aliases, productAlias.subcategory, [
      productAlias.subcategory,
      ...productAlias.keywords,
    ]);
  }

  for (const [subcategory, extraAliases] of Object.entries(
    EXTRA_SHOPPING_ALIASES
  )) {
    addUniqueAliases(aliases, subcategory, extraAliases);
  }

  return aliases;
};

export const SHOPPING_ALIASES: Record<string, string[]> =
  createShoppingAliases();