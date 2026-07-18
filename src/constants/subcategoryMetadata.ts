import type {
  ProductUnit,
} from "./units";
import {
  SUBCATEGORY_UNITS,
} from "./subcategoryUnits"

export interface SubcategoryMetadataItem {
  category: string;

  productKeywords: string[];

  shoppingAliases: string[];

  defaultUnit?: ProductUnit;

  commonUnits?: ProductUnit[];
}

export const SUBCATEGORY_METADATA: Record<
  string,
  SubcategoryMetadataItem
> = {
  "Air Conditioners": {
    category: "Appliances",
    productKeywords: [
      "Air Conditioners",
      "air conditioner",
    ],
    shoppingAliases: [],
  },

  "Air Fryers": {
    category: "Appliances",
    productKeywords: [
      "Air Fryers",
      "air fryer",
    ],
    shoppingAliases: [],
  },

  "Air Purifiers": {
    category: "Appliances",
    productKeywords: [
      "Air Purifiers",
      "air purifier",
    ],
    shoppingAliases: [],
  },

  "Blenders": {
    category: "Appliances",
    productKeywords: [
      "Blenders",
      "blender",
    ],
    shoppingAliases: [],
  },

  "Bread Makers": {
    category: "Appliances",
    productKeywords: [
      "Bread Makers",
      "bread maker",
    ],
    shoppingAliases: [],
  },

  "Ceiling Fans": {
    category: "Appliances",
    productKeywords: [
      "Ceiling Fans",
      "ceiling fan",
    ],
    shoppingAliases: [],
  },

  "Clothes Drying Cabinets": {
    category: "Appliances",
    productKeywords: [
      "Clothes Drying Cabinets",
      "clothes drying cabinet",
    ],
    shoppingAliases: [],
  },

  "Coffee Makers": {
    category: "Appliances",
    productKeywords: [
      "Coffee Makers",
      "coffee maker",
    ],
    shoppingAliases: [],
  },

  "Curling Irons": {
    category: "Appliances",
    productKeywords: [
      "Curling Irons",
      "curling iron",
    ],
    shoppingAliases: [],
  },

  "Deep Fryers": {
    category: "Appliances",
    productKeywords: [
      "Deep Fryers",
      "deep fryer",
    ],
    shoppingAliases: [],
  },

  "Dehumidifiers": {
    category: "Appliances",
    productKeywords: [
      "Dehumidifiers",
      "dehumidifier",
    ],
    shoppingAliases: [],
  },

  "Desk Fans": {
    category: "Appliances",
    productKeywords: [
      "Desk Fans",
      "desk fan",
    ],
    shoppingAliases: [],
  },

  "Dryers": {
    category: "Appliances",
    productKeywords: [
      "Dryers",
      "dryer",
    ],
    shoppingAliases: [],
  },

  "Electric Fans": {
    category: "Appliances",
    productKeywords: [
      "Electric Fans",
      "electric fan",
    ],
    shoppingAliases: [],
  },

  "Electric Heaters": {
    category: "Appliances",
    productKeywords: [
      "Electric Heaters",
      "electric heater",
    ],
    shoppingAliases: [],
  },

  "Electric Kettles": {
    category: "Appliances",
    productKeywords: [
      "Electric Kettles",
      "electric kettle",
    ],
    shoppingAliases: [],
  },

  "Electric Ovens": {
    category: "Appliances",
    productKeywords: [
      "Electric Ovens",
      "electric oven",
    ],
    shoppingAliases: [],
  },

  "Electric Stoves": {
    category: "Appliances",
    productKeywords: [
      "Electric Stoves",
      "electric stove",
    ],
    shoppingAliases: [],
  },

  "Espresso Machines": {
    category: "Appliances",
    productKeywords: [
      "Espresso Machines",
      "espresso machine",
    ],
    shoppingAliases: [],
  },

  "Exhaust Fans": {
    category: "Appliances",
    productKeywords: [
      "Exhaust Fans",
      "exhaust fan",
    ],
    shoppingAliases: [],
  },

  "Food Processors": {
    category: "Appliances",
    productKeywords: [
      "Food Processors",
      "food processor",
    ],
    shoppingAliases: [],
  },

  "Freezers": {
    category: "Appliances",
    productKeywords: [
      "Freezers",
      "freezer",
    ],
    shoppingAliases: [],
  },

  "Garment Steamers": {
    category: "Appliances",
    productKeywords: [
      "Garment Steamers",
      "garment steamer",
    ],
    shoppingAliases: [],
  },

  "Gas Stoves": {
    category: "Appliances",
    productKeywords: [
      "Gas Stoves",
      "gas stove",
    ],
    shoppingAliases: [],
  },

  "Hair Dryers": {
    category: "Appliances",
    productKeywords: [
      "Hair Dryers",
      "hair dryer",
    ],
    shoppingAliases: [],
  },

  "Hair Straighteners": {
    category: "Appliances",
    productKeywords: [
      "Hair Straighteners",
      "hair straightener",
    ],
    shoppingAliases: [],
  },

  "Humidifiers": {
    category: "Appliances",
    productKeywords: [
      "Humidifiers",
      "humidifier",
    ],
    shoppingAliases: [],
  },

  "Ice Makers": {
    category: "Appliances",
    productKeywords: [
      "Ice Makers",
      "ice maker",
    ],
    shoppingAliases: [],
  },

  "Induction Cookers": {
    category: "Appliances",
    productKeywords: [
      "Induction Cookers",
      "induction cooker",
    ],
    shoppingAliases: [],
  },

  "Irons": {
    category: "Appliances",
    productKeywords: [
      "Irons",
      "iron",
    ],
    shoppingAliases: [],
  },

  "Juicers": {
    category: "Appliances",
    productKeywords: [
      "Juicers",
      "juicer",
    ],
    shoppingAliases: [],
  },

  "Microwave Ovens": {
    category: "Appliances",
    productKeywords: [
      "Microwave Ovens",
      "microwave oven",
    ],
    shoppingAliases: [],
  },

  "Mixers": {
    category: "Appliances",
    productKeywords: [
      "Mixers",
      "mixer",
    ],
    shoppingAliases: [],
  },

  "Multi Cookers": {
    category: "Appliances",
    productKeywords: [
      "Multi Cookers",
      "multi cooker",
    ],
    shoppingAliases: [],
  },

  "Pressure Cookers": {
    category: "Appliances",
    productKeywords: [
      "Pressure Cookers",
      "pressure cooker",
    ],
    shoppingAliases: [],
  },

  "Range Hoods": {
    category: "Appliances",
    productKeywords: [
      "Range Hoods",
      "range hood",
    ],
    shoppingAliases: [],
  },

  "Refrigerators": {
    category: "Appliances",
    productKeywords: [
      "Refrigerators",
      "refrigerator",
    ],
    shoppingAliases: [],
  },

  "Rice Cookers": {
    category: "Appliances",
    productKeywords: [
      "Rice Cookers",
      "rice cooker",
    ],
    shoppingAliases: [],
  },

  "Robot Vacuums": {
    category: "Appliances",
    productKeywords: [
      "Robot Vacuums",
      "robot vacuum",
    ],
    shoppingAliases: [],
  },

  "Sandwich Makers": {
    category: "Appliances",
    productKeywords: [
      "Sandwich Makers",
      "sandwich maker",
    ],
    shoppingAliases: [],
  },

  "Sewing Machines": {
    category: "Appliances",
    productKeywords: [
      "Sewing Machines",
      "sewing machine",
    ],
    shoppingAliases: [],
  },

  "Slow Cookers": {
    category: "Appliances",
    productKeywords: [
      "Slow Cookers",
      "slow cooker",
    ],
    shoppingAliases: [],
  },

  "Stand Fans": {
    category: "Appliances",
    productKeywords: [
      "Stand Fans",
      "stand fan",
    ],
    shoppingAliases: [],
  },

  "Steam Cleaners": {
    category: "Appliances",
    productKeywords: [
      "Steam Cleaners",
      "steam cleaner",
    ],
    shoppingAliases: [],
  },

  "Toaster Ovens": {
    category: "Appliances",
    productKeywords: [
      "Toaster Ovens",
      "toaster oven",
    ],
    shoppingAliases: [],
  },

  "Vacuum Cleaners": {
    category: "Appliances",
    productKeywords: [
      "Vacuum Cleaners",
      "vacuum cleaner",
    ],
    shoppingAliases: [],
  },

  "Waffle Makers": {
    category: "Appliances",
    productKeywords: [
      "Waffle Makers",
      "waffle maker",
    ],
    shoppingAliases: [],
  },

  "Washing Machines": {
    category: "Appliances",
    productKeywords: [
      "Washing Machines",
      "washing machine",
    ],
    shoppingAliases: [],
  },

  "Water Dispensers": {
    category: "Appliances",
    productKeywords: [
      "Water Dispensers",
      "water dispenser",
    ],
    shoppingAliases: [],
  },

  "Water Heaters": {
    category: "Appliances",
    productKeywords: [
      "Water Heaters",
      "water heater",
    ],
    shoppingAliases: [],
  },

  "Water Purifiers": {
    category: "Appliances",
    productKeywords: [
      "Water Purifiers",
      "water purifier",
    ],
    shoppingAliases: [],
  },

  "Air Compressors": {
    category: "Automotive",
    productKeywords: [
      "Air Compressors",
      "air compressor",
    ],
    shoppingAliases: [],
  },

  "Air Filters": {
    category: "Automotive",
    productKeywords: [
      "Air Filters",
      "air filter",
    ],
    shoppingAliases: [],
  },

  "Amplifiers": {
    category: "Automotive",
    productKeywords: [
      "Amplifiers",
      "amplifier",
    ],
    shoppingAliases: [],
  },

  "Automotive Bulbs": {
    category: "Automotive",
    productKeywords: [
      "Automotive Bulbs",
      "automotive bulb",
    ],
    shoppingAliases: [],
  },

  "Battery Accessories": {
    category: "Automotive",
    productKeywords: [
      "Battery Accessories",
      "battery accessory",
    ],
    shoppingAliases: [],
  },

  "Battery Chargers": {
    category: "Automotive",
    productKeywords: [
      "Battery Chargers",
      "battery charger",
    ],
    shoppingAliases: [],
  },

  "Battery Terminals": {
    category: "Automotive",
    productKeywords: [
      "Battery Terminals",
      "battery terminal",
    ],
    shoppingAliases: [],
  },

  "Brake Fluid": {
    category: "Automotive",
    productKeywords: [
      "Brake Fluid",
    ],
    shoppingAliases: [],
  },

  "Cabin Filters": {
    category: "Automotive",
    productKeywords: [
      "Cabin Filters",
      "cabin filter",
    ],
    shoppingAliases: [],
  },

  "Car Audio": {
    category: "Automotive",
    productKeywords: [
      "Car Audio",
    ],
    shoppingAliases: [],
  },

  "Car Batteries": {
    category: "Automotive",
    productKeywords: [
      "Car Batteries",
      "car battery",
    ],
    shoppingAliases: [],
  },

  "Car Chargers": {
    category: "Automotive",
    productKeywords: [
      "Car Chargers",
      "car charger",
    ],
    shoppingAliases: [],
  },

  "Car Fuses": {
    category: "Automotive",
    productKeywords: [
      "Car Fuses",
      "car fuse",
    ],
    shoppingAliases: [],
  },

  "Car Organizers": {
    category: "Automotive",
    productKeywords: [
      "Car Organizers",
      "car organizer",
    ],
    shoppingAliases: [],
  },

  "Car Shampoo": {
    category: "Automotive",
    productKeywords: [
      "Car Shampoo",
    ],
    shoppingAliases: [],
  },

  "Car Tools": {
    category: "Automotive",
    productKeywords: [
      "Car Tools",
      "car tool",
    ],
    shoppingAliases: [],
  },

  "Cleaning Supplies": {
    category: "Automotive",
    productKeywords: [
      "Cleaning Supplies",
      "cleaning supply",
    ],
    shoppingAliases: [],
  },

  "Coolant": {
    category: "Automotive",
    productKeywords: [
      "Coolant",
    ],
    shoppingAliases: [],
  },

  "Dash Cameras": {
    category: "Automotive",
    productKeywords: [
      "Dash Cameras",
      "dash camera",
    ],
    shoppingAliases: [],
  },

  "Emergency Kits": {
    category: "Automotive",
    productKeywords: [
      "Emergency Kits",
      "emergency kit",
    ],
    shoppingAliases: [],
  },

  "Engine Additives": {
    category: "Automotive",
    productKeywords: [
      "Engine Additives",
      "engine additive",
    ],
    shoppingAliases: [],
  },

  "Engine Oil": {
    category: "Automotive",
    productKeywords: [
      "Engine Oil",
    ],
    shoppingAliases: [],
  },

  "Floor Mats": {
    category: "Automotive",
    productKeywords: [
      "Floor Mats",
      "floor mat",
    ],
    shoppingAliases: [],
  },

  "Fog Lights": {
    category: "Automotive",
    productKeywords: [
      "Fog Lights",
      "fog light",
    ],
    shoppingAliases: [],
  },

  "Fuel Additives": {
    category: "Automotive",
    productKeywords: [
      "Fuel Additives",
      "fuel additive",
    ],
    shoppingAliases: [],
  },

  "Fuel Filters": {
    category: "Automotive",
    productKeywords: [
      "Fuel Filters",
      "fuel filter",
    ],
    shoppingAliases: [],
  },

  "Gear Oil": {
    category: "Automotive",
    productKeywords: [
      "Gear Oil",
    ],
    shoppingAliases: [],
  },

  "Glass Cleaners": {
    category: "Automotive",
    productKeywords: [
      "Glass Cleaners",
      "glass cleaner",
    ],
    shoppingAliases: [],
  },

  "Grease": {
    category: "Automotive",
    productKeywords: [
      "Grease",
    ],
    shoppingAliases: [],
  },

  "Headlights": {
    category: "Automotive",
    productKeywords: [
      "Headlights",
      "headlight",
    ],
    shoppingAliases: [],
  },

  "Ignition Coils": {
    category: "Automotive",
    productKeywords: [
      "Ignition Coils",
      "ignition coil",
    ],
    shoppingAliases: [],
  },

  "Inner Tubes": {
    category: "Automotive",
    productKeywords: [
      "Inner Tubes",
      "inner tube",
    ],
    shoppingAliases: [],
  },

  "Jack Stands": {
    category: "Automotive",
    productKeywords: [
      "Jack Stands",
      "jack stand",
    ],
    shoppingAliases: [],
  },

  "Jacks": {
    category: "Automotive",
    productKeywords: [
      "Jacks",
      "jack",
    ],
    shoppingAliases: [],
  },

  "Jumper Cables": {
    category: "Automotive",
    productKeywords: [
      "Jumper Cables",
      "jumper cable",
    ],
    shoppingAliases: [],
  },

  "Lubricants": {
    category: "Automotive",
    productKeywords: [
      "Lubricants",
      "lubricant",
    ],
    shoppingAliases: [],
  },

  "Microfiber Cloths": {
    category: "Automotive",
    productKeywords: [
      "Microfiber Cloths",
      "microfiber cloth",
    ],
    shoppingAliases: [],
  },

  "Motorcycle Accessories": {
    category: "Automotive",
    productKeywords: [
      "Motorcycle Accessories",
      "motorcycle accessory",
    ],
    shoppingAliases: [],
  },

  "Motorcycle Helmets": {
    category: "Automotive",
    productKeywords: [
      "Motorcycle Helmets",
      "motorcycle helmet",
    ],
    shoppingAliases: [],
  },

  "Motorcycle Parts": {
    category: "Automotive",
    productKeywords: [
      "Motorcycle Parts",
      "motorcycle part",
    ],
    shoppingAliases: [],
  },

  "Oil Filters": {
    category: "Automotive",
    productKeywords: [
      "Oil Filters",
      "oil filter",
    ],
    shoppingAliases: [],
  },

  "Phone Holders": {
    category: "Automotive",
    productKeywords: [
      "Phone Holders",
      "phone holder",
    ],
    shoppingAliases: [],
  },

  "Polish": {
    category: "Automotive",
    productKeywords: [
      "Polish",
    ],
    shoppingAliases: [],
  },

  "Power Steering Fluid": {
    category: "Automotive",
    productKeywords: [
      "Power Steering Fluid",
    ],
    shoppingAliases: [],
  },

  "Pressure Washers": {
    category: "Automotive",
    productKeywords: [
      "Pressure Washers",
      "pressure washer",
    ],
    shoppingAliases: [],
  },

  "Radiator Fluid": {
    category: "Automotive",
    productKeywords: [
      "Radiator Fluid",
    ],
    shoppingAliases: [],
  },

  "Seat Covers": {
    category: "Automotive",
    productKeywords: [
      "Seat Covers",
      "seat cover",
    ],
    shoppingAliases: [],
  },

  "Signal Lights": {
    category: "Automotive",
    productKeywords: [
      "Signal Lights",
      "signal light",
    ],
    shoppingAliases: [],
  },

  "Spark Plugs": {
    category: "Automotive",
    productKeywords: [
      "Spark Plugs",
      "spark plug",
    ],
    shoppingAliases: [],
  },

  "Steering Wheel Covers": {
    category: "Automotive",
    productKeywords: [
      "Steering Wheel Covers",
      "steering wheel cover",
    ],
    shoppingAliases: [],
  },

  "Subwoofers": {
    category: "Automotive",
    productKeywords: [
      "Subwoofers",
      "subwoofer",
    ],
    shoppingAliases: [],
  },

  "Tail Lights": {
    category: "Automotive",
    productKeywords: [
      "Tail Lights",
      "tail light",
    ],
    shoppingAliases: [],
  },

  "Tire Repair Kits": {
    category: "Automotive",
    productKeywords: [
      "Tire Repair Kits",
      "tire repair kit",
    ],
    shoppingAliases: [],
  },

  "Tires": {
    category: "Automotive",
    productKeywords: [
      "Tires",
      "tire",
    ],
    shoppingAliases: [],
  },

  "Tow Ropes": {
    category: "Automotive",
    productKeywords: [
      "Tow Ropes",
      "tow rope",
    ],
    shoppingAliases: [],
  },

  "Transmission Fluid": {
    category: "Automotive",
    productKeywords: [
      "Transmission Fluid",
    ],
    shoppingAliases: [],
  },

  "Wax": {
    category: "Automotive",
    productKeywords: [
      "Wax",
    ],
    shoppingAliases: [],
  },

  "Wheel Covers": {
    category: "Automotive",
    productKeywords: [
      "Wheel Covers",
      "wheel cover",
    ],
    shoppingAliases: [],
  },

  "Wheel Rims": {
    category: "Automotive",
    productKeywords: [
      "Wheel Rims",
      "wheel rim",
    ],
    shoppingAliases: [],
  },

  "Windshield Wipers": {
    category: "Automotive",
    productKeywords: [
      "Windshield Wipers",
      "windshield wiper",
    ],
    shoppingAliases: [],
  },

  "Wiper Blades": {
    category: "Automotive",
    productKeywords: [
      "Wiper Blades",
      "wiper blade",
    ],
    shoppingAliases: [],
  },

  "Baby Bath Accessories": {
    category: "Baby Care",
    productKeywords: [
      "Baby Bath Accessories",
      "baby bath accessory",
    ],
    shoppingAliases: [],
  },

  "Baby Bibs": {
    category: "Baby Care",
    productKeywords: [
      "Baby Bibs",
      "baby bib",
    ],
    shoppingAliases: [],
  },

  "Baby Blankets": {
    category: "Baby Care",
    productKeywords: [
      "Baby Blankets",
      "baby blanket",
    ],
    shoppingAliases: [
      "kumot ng baby",
    ],
  },

  "Baby Bottles": {
    category: "Baby Care",
    productKeywords: [
      "Baby Bottles",
      "baby bottle",
    ],
    shoppingAliases: [
      "feeding bottle",
      "dede bottle",
    ],
  },

  "Baby Cereal": {
    category: "Baby Care",
    productKeywords: [
      "Baby Cereal",
    ],
    shoppingAliases: [],
  },

  "Baby Clothing": {
    category: "Baby Care",
    productKeywords: [
      "Baby Clothing",
    ],
    shoppingAliases: [],
  },

  "Baby Cream": {
    category: "Baby Care",
    productKeywords: [
      "Baby Cream",
    ],
    shoppingAliases: [],
  },

  "Baby Diapers": {
    category: "Baby Care",
    productKeywords: [
      "Baby Diapers",
      "baby diaper",
    ],
    shoppingAliases: [
      "diaper",
      "lampin",
    ],
  },

  "Baby Feeding Accessories": {
    category: "Baby Care",
    productKeywords: [
      "Baby Feeding Accessories",
      "baby feeding accessory",
    ],
    shoppingAliases: [],
  },

  "Baby Formula": {
    category: "Baby Care",
    productKeywords: [
      "Baby Formula",
    ],
    shoppingAliases: [
      "baby milk",
      "gatas ng baby",
    ],
  },

  "Baby Lotion": {
    category: "Baby Care",
    productKeywords: [
      "Baby Lotion",
    ],
    shoppingAliases: [
      "lotion ng baby",
    ],
  },

  "Baby Oil": {
    category: "Baby Care",
    productKeywords: [
      "Baby Oil",
    ],
    shoppingAliases: [
      "oil ng baby",
    ],
  },

  "Baby Powder": {
    category: "Baby Care",
    productKeywords: [
      "Baby Powder",
    ],
    shoppingAliases: [
      "baby pulbos",
    ],
  },

  "Baby Safety": {
    category: "Baby Care",
    productKeywords: [
      "Baby Safety",
    ],
    shoppingAliases: [],
  },

  "Baby Shampoo": {
    category: "Baby Care",
    productKeywords: [
      "Baby Shampoo",
    ],
    shoppingAliases: [
      "shampoo ng baby",
    ],
  },

  "Baby Snacks": {
    category: "Baby Care",
    productKeywords: [
      "Baby Snacks",
      "baby snack",
    ],
    shoppingAliases: [],
  },

  "Baby Soap": {
    category: "Baby Care",
    productKeywords: [
      "Baby Soap",
    ],
    shoppingAliases: [
      "sabon ng baby",
    ],
  },

  "Baby Towels": {
    category: "Baby Care",
    productKeywords: [
      "Baby Towels",
      "baby towel",
    ],
    shoppingAliases: [],
  },

  "Baby Toys": {
    category: "Baby Care",
    productKeywords: [
      "Baby Toys",
      "baby toy",
    ],
    shoppingAliases: [],
  },

  "Baby Utensils": {
    category: "Baby Care",
    productKeywords: [
      "Baby Utensils",
      "baby utensil",
    ],
    shoppingAliases: [],
  },

  "Baby Wash": {
    category: "Baby Care",
    productKeywords: [
      "Baby Wash",
    ],
    shoppingAliases: [],
  },

  "Bottle Cleaners": {
    category: "Baby Care",
    productKeywords: [
      "Bottle Cleaners",
      "bottle cleaner",
    ],
    shoppingAliases: [],
  },

  "Bottle Nipples": {
    category: "Baby Care",
    productKeywords: [
      "Bottle Nipples",
      "bottle nipple",
    ],
    shoppingAliases: [
      "tsupon",
    ],
  },

  "Bottle Sterilizers": {
    category: "Baby Care",
    productKeywords: [
      "Bottle Sterilizers",
      "bottle sterilizer",
    ],
    shoppingAliases: [],
  },

  "Diaper Rash Cream": {
    category: "Baby Care",
    productKeywords: [
      "Diaper Rash Cream",
    ],
    shoppingAliases: [],
  },

  "Pacifiers": {
    category: "Baby Care",
    productKeywords: [
      "Pacifiers",
      "pacifier",
    ],
    shoppingAliases: [
      "tsupon",
    ],
  },

  "Teethers": {
    category: "Baby Care",
    productKeywords: [
      "Teethers",
      "teether",
    ],
    shoppingAliases: [],
  },

  "Training Pants": {
    category: "Baby Care",
    productKeywords: [
      "Training Pants",
      "training pant",
    ],
    shoppingAliases: [
      "diaper pants",
    ],
  },

  "Acne Treatment": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Acne Treatment",
    ],
    shoppingAliases: [],
  },

  "Anti-Aging": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Anti-Aging",
      "anti aging",
    ],
    shoppingAliases: [],
  },

  "Artificial Nails": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Artificial Nails",
      "artificial nail",
    ],
    shoppingAliases: [],
  },

  "BB Cream": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "BB Cream",
    ],
    shoppingAliases: [
      "bbcream",
    ],
  },

  "Beauty Sponges": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Beauty Sponges",
      "beauty sponge",
    ],
    shoppingAliases: [],
  },

  "Beauty Tools": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Beauty Tools",
      "beauty tool",
    ],
    shoppingAliases: [],
  },

  "Blush": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Blush",
    ],
    shoppingAliases: [],
  },

  "Body Mist": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Body Mist",
    ],
    shoppingAliases: [
      "pabango",
      "mist",
    ],
  },

  "Bronzer": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Bronzer",
    ],
    shoppingAliases: [],
  },

  "CC Cream": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "CC Cream",
    ],
    shoppingAliases: [
      "cccream",
    ],
  },

  "Concealer": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Concealer",
    ],
    shoppingAliases: [],
  },

  "Contour": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Contour",
    ],
    shoppingAliases: [],
  },

  "Cotton Pads": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Cotton Pads",
      "cotton pad",
    ],
    shoppingAliases: [],
  },

  "Cuticle Care": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Cuticle Care",
    ],
    shoppingAliases: [],
  },

  "Exfoliator": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Exfoliator",
    ],
    shoppingAliases: [],
  },

  "Eyebrow Gel": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Eyebrow Gel",
    ],
    shoppingAliases: [],
  },

  "Eyebrow Pencil": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Eyebrow Pencil",
    ],
    shoppingAliases: [],
  },

  "Eyelash Glue": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Eyelash Glue",
    ],
    shoppingAliases: [],
  },

  "Eyeliner": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Eyeliner",
    ],
    shoppingAliases: [
      "eye liner",
    ],
  },

  "Eyeshadow": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Eyeshadow",
    ],
    shoppingAliases: [
      "eye shadow",
    ],
  },

  "Face Cream": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Face Cream",
    ],
    shoppingAliases: [],
  },

  "Face Powder": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Face Powder",
    ],
    shoppingAliases: [
      "powder",
      "pulbos",
    ],
  },

  "Face Serum": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Face Serum",
    ],
    shoppingAliases: [],
  },

  "Face Toner": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Face Toner",
    ],
    shoppingAliases: [],
  },

  "Facial Cleanser": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Facial Cleanser",
    ],
    shoppingAliases: [],
  },

  "Facial Scrub": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Facial Scrub",
    ],
    shoppingAliases: [],
  },

  "Facial Wash": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Facial Wash",
    ],
    shoppingAliases: [],
  },

  "False Eyelashes": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "False Eyelashes",
      "false eyelash",
    ],
    shoppingAliases: [],
  },

  "Foundation": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Foundation",
    ],
    shoppingAliases: [
      "face foundation",
    ],
  },

  "Highlighter": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Highlighter",
    ],
    shoppingAliases: [],
  },

  "Lip Gloss": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Lip Gloss",
    ],
    shoppingAliases: [],
  },

  "Lip Liner": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Lip Liner",
    ],
    shoppingAliases: [],
  },

  "Lip Tint": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Lip Tint",
    ],
    shoppingAliases: [
      "liptint",
    ],
  },

  "Lipstick": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Lipstick",
    ],
    shoppingAliases: [
      "lip stick",
    ],
  },

  "Loose Powder": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Loose Powder",
    ],
    shoppingAliases: [],
  },

  "Makeup": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Makeup",
    ],
    shoppingAliases: [
      "cosmetics",
    ],
  },

  "Makeup Brushes": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Makeup Brushes",
      "makeup brush",
    ],
    shoppingAliases: [],
  },

  "Makeup Remover": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Makeup Remover",
    ],
    shoppingAliases: [
      "makeup cleanser",
    ],
  },

  "Mascara": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Mascara",
    ],
    shoppingAliases: [
      "eyelash mascara",
    ],
  },

  "Micellar Water": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Micellar Water",
    ],
    shoppingAliases: [
      "micellar",
    ],
  },

  "Moisturizer": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Moisturizer",
    ],
    shoppingAliases: [
      "face moisturizer",
    ],
  },

  "Nail Polish": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Nail Polish",
    ],
    shoppingAliases: [],
  },

  "Nail Polish Remover": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Nail Polish Remover",
    ],
    shoppingAliases: [],
  },

  "Pressed Powder": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Pressed Powder",
    ],
    shoppingAliases: [],
  },

  "Primer": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Primer",
    ],
    shoppingAliases: [],
  },

  "Setting Spray": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Setting Spray",
    ],
    shoppingAliases: [],
  },

  "Sunblock": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Sunblock",
    ],
    shoppingAliases: [],
  },

  "Sunscreen": {
    category: "Beauty & Cosmetics",
    productKeywords: [
      "Sunscreen",
    ],
    shoppingAliases: [
      "spf",
    ],
  },

  "Blu-rays": {
    category: "Books & Media",
    productKeywords: [
      "Blu-rays",
      "blu rays",
      "blu-ray",
    ],
    shoppingAliases: [],
  },

  "Books": {
    category: "Books & Media",
    productKeywords: [
      "Books",
      "book",
    ],
    shoppingAliases: [],
  },

  "Calendars": {
    category: "Books & Media",
    productKeywords: [
      "Calendars",
      "calendar",
    ],
    shoppingAliases: [],
  },

  "Children's Books": {
    category: "Books & Media",
    productKeywords: [
      "Children's Books",
      "children's book",
    ],
    shoppingAliases: [],
  },

  "Comic Books": {
    category: "Books & Media",
    productKeywords: [
      "Comic Books",
      "comic book",
    ],
    shoppingAliases: [],
  },

  "DVDs": {
    category: "Books & Media",
    productKeywords: [
      "DVDs",
      "dvd",
    ],
    shoppingAliases: [],
  },

  "Gift Cards": {
    category: "Books & Media",
    productKeywords: [
      "Gift Cards",
      "gift card",
    ],
    shoppingAliases: [],
  },

  "Journals": {
    category: "Books & Media",
    productKeywords: [
      "Journals",
      "journal",
    ],
    shoppingAliases: [],
  },

  "Magazines": {
    category: "Books & Media",
    productKeywords: [
      "Magazines",
      "magazine",
    ],
    shoppingAliases: [],
  },

  "Maps": {
    category: "Books & Media",
    productKeywords: [
      "Maps",
      "map",
    ],
    shoppingAliases: [],
  },

  "Music CDs": {
    category: "Books & Media",
    productKeywords: [
      "Music CDs",
      "music cd",
    ],
    shoppingAliases: [],
  },

  "Newspapers": {
    category: "Books & Media",
    productKeywords: [
      "Newspapers",
      "newspaper",
    ],
    shoppingAliases: [],
  },

  "Novels": {
    category: "Books & Media",
    productKeywords: [
      "Novels",
      "novel",
    ],
    shoppingAliases: [],
  },

  "Planners": {
    category: "Books & Media",
    productKeywords: [
      "Planners",
      "planner",
    ],
    shoppingAliases: [],
  },

  "Reference Books": {
    category: "Books & Media",
    productKeywords: [
      "Reference Books",
      "reference book",
    ],
    shoppingAliases: [],
  },

  "Textbooks": {
    category: "Books & Media",
    productKeywords: [
      "Textbooks",
      "textbook",
    ],
    shoppingAliases: [],
  },

  "Vinyl Records": {
    category: "Books & Media",
    productKeywords: [
      "Vinyl Records",
      "vinyl record",
    ],
    shoppingAliases: [],
  },

  "Activewear": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Activewear",
    ],
    shoppingAliases: [],
  },

  "Belts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Belts",
      "belt",
    ],
    shoppingAliases: [],
  },

  "Blouses": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Blouses",
      "blouse",
    ],
    shoppingAliases: [],
  },

  "Boots": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Boots",
      "boot",
    ],
    shoppingAliases: [],
  },

  "Boxers": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Boxers",
      "boxer",
    ],
    shoppingAliases: [],
  },

  "Bracelets": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Bracelets",
      "bracelet",
    ],
    shoppingAliases: [],
  },

  "Bras": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Bras",
      "bra",
    ],
    shoppingAliases: [],
  },

  "Caps": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Caps",
      "cap",
    ],
    shoppingAliases: [],
  },

  "Children's Clothing": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Children's Clothing",
    ],
    shoppingAliases: [],
  },

  "Coats": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Coats",
      "coat",
    ],
    shoppingAliases: [],
  },

  "Dresses": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Dresses",
      "dresse",
    ],
    shoppingAliases: [],
  },

  "Earrings": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Earrings",
      "earring",
    ],
    shoppingAliases: [],
  },

  "Fashion Accessories": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Fashion Accessories",
      "fashion accessory",
    ],
    shoppingAliases: [],
  },

  "Gloves": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Gloves",
      "glove",
    ],
    shoppingAliases: [],
  },

  "Handbags": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Handbags",
      "handbag",
    ],
    shoppingAliases: [],
  },

  "Hats": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Hats",
      "hat",
    ],
    shoppingAliases: [],
  },

  "Heels": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Heels",
      "heel",
    ],
    shoppingAliases: [],
  },

  "Hoodies": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Hoodies",
      "hoody",
    ],
    shoppingAliases: [],
  },

  "Jackets": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Jackets",
      "jacket",
    ],
    shoppingAliases: [],
  },

  "Jeans": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Jeans",
      "jean",
    ],
    shoppingAliases: [],
  },

  "Jewelry": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Jewelry",
    ],
    shoppingAliases: [],
  },

  "Leggings": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Leggings",
      "legging",
    ],
    shoppingAliases: [],
  },

  "Luggage": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Luggage",
    ],
    shoppingAliases: [],
  },

  "Maternity Wear": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Maternity Wear",
    ],
    shoppingAliases: [],
  },

  "Necklaces": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Necklaces",
      "necklace",
    ],
    shoppingAliases: [],
  },

  "Panties": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Panties",
      "panty",
    ],
    shoppingAliases: [],
  },

  "Pants": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Pants",
      "pant",
    ],
    shoppingAliases: [],
  },

  "Polo Shirts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Polo Shirts",
      "polo shirt",
    ],
    shoppingAliases: [],
  },

  "Rings": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Rings",
      "ring",
    ],
    shoppingAliases: [],
  },

  "Sandals": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Sandals",
      "sandal",
    ],
    shoppingAliases: [],
  },

  "Scarves": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Scarves",
      "scarf",
    ],
    shoppingAliases: [],
  },

  "School Uniforms": {
    category: "Clothing & Accessories",
    productKeywords: [
      "School Uniforms",
      "school uniform",
    ],
    shoppingAliases: [],
  },

  "Shirts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Shirts",
      "shirt",
    ],
    shoppingAliases: [],
  },

  "Shoes": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Shoes",
      "shoe",
    ],
    shoppingAliases: [],
  },

  "Shorts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Shorts",
      "short",
    ],
    shoppingAliases: [],
  },

  "Skirts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Skirts",
      "skirt",
    ],
    shoppingAliases: [],
  },

  "Sleepwear": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Sleepwear",
    ],
    shoppingAliases: [],
  },

  "Slippers": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Slippers",
      "slipper",
    ],
    shoppingAliases: [],
  },

  "Sneakers": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Sneakers",
      "sneaker",
    ],
    shoppingAliases: [],
  },

  "Socks": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Socks",
      "sock",
    ],
    shoppingAliases: [],
  },

  "Sunglasses": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Sunglasses",
      "sunglasse",
    ],
    shoppingAliases: [],
  },

  "Sweaters": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Sweaters",
      "sweater",
    ],
    shoppingAliases: [],
  },

  "Swimwear": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Swimwear",
    ],
    shoppingAliases: [],
  },

  "T-Shirts": {
    category: "Clothing & Accessories",
    productKeywords: [
      "T-Shirts",
      "t shirts",
      "t-shirt",
    ],
    shoppingAliases: [],
  },

  "Undergarments": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Undergarments",
      "undergarment",
    ],
    shoppingAliases: [],
  },

  "Wallets": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Wallets",
      "wallet",
    ],
    shoppingAliases: [],
  },

  "Watches": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Watches",
      "watche",
    ],
    shoppingAliases: [],
  },

  "Work Uniforms": {
    category: "Clothing & Accessories",
    productKeywords: [
      "Work Uniforms",
      "work uniform",
    ],
    shoppingAliases: [],
  },

  "Adapters": {
    category: "Electronics",
    productKeywords: [
      "Adapters",
      "adapter",
    ],
    shoppingAliases: [],
  },

  "Arduino Boards": {
    category: "Electronics",
    productKeywords: [
      "Arduino Boards",
      "arduino board",
    ],
    shoppingAliases: [],
  },

  "Bluetooth Speakers": {
    category: "Electronics",
    productKeywords: [
      "Bluetooth Speakers",
      "bluetooth speaker",
    ],
    shoppingAliases: [],
  },

  "Breadboards": {
    category: "Electronics",
    productKeywords: [
      "Breadboards",
      "breadboard",
    ],
    shoppingAliases: [],
  },

  "Capacitors": {
    category: "Electronics",
    productKeywords: [
      "Capacitors",
      "capacitor",
    ],
    shoppingAliases: [],
  },

  "CCTV Systems": {
    category: "Electronics",
    productKeywords: [
      "CCTV Systems",
      "cctv system",
    ],
    shoppingAliases: [],
  },

  "Chargers": {
    category: "Electronics",
    productKeywords: [
      "Chargers",
      "charger",
      "phone charger",
      "fast charger",
    ],
    shoppingAliases: [],
  },

  "Charging Cables": {
    category: "Electronics",
    productKeywords: [
      "Charging Cables",
      "charging cable",
    ],
    shoppingAliases: [],
  },

  "Computer Cases": {
    category: "Electronics",
    productKeywords: [
      "Computer Cases",
      "computer case",
    ],
    shoppingAliases: [],
  },

  "Computer Components": {
    category: "Electronics",
    productKeywords: [
      "Computer Components",
      "computer component",
    ],
    shoppingAliases: [],
  },

  "Computer Monitors": {
    category: "Electronics",
    productKeywords: [
      "Computer Monitors",
      "computer monitor",
    ],
    shoppingAliases: [],
  },

  "Cooling Fans": {
    category: "Electronics",
    productKeywords: [
      "Cooling Fans",
      "cooling fan",
    ],
    shoppingAliases: [],
  },

  "Desktop Computers": {
    category: "Electronics",
    productKeywords: [
      "Desktop Computers",
      "desktop computer",
    ],
    shoppingAliases: [],
  },

  "DisplayPort Cables": {
    category: "Electronics",
    productKeywords: [
      "DisplayPort Cables",
      "displayport cable",
    ],
    shoppingAliases: [],
  },

  "Drones": {
    category: "Electronics",
    productKeywords: [
      "Drones",
      "drone",
    ],
    shoppingAliases: [],
  },

  "Earphones": {
    category: "Electronics",
    productKeywords: [
      "Earphones",
      "earphone",
    ],
    shoppingAliases: [],
  },

  "Electronic Components": {
    category: "Electronics",
    productKeywords: [
      "Electronic Components",
      "electronic component",
    ],
    shoppingAliases: [],
  },

  "ESP32 Boards": {
    category: "Electronics",
    productKeywords: [
      "ESP32 Boards",
      "esp32 board",
    ],
    shoppingAliases: [],
  },

  "Extension Outlets": {
    category: "Electronics",
    productKeywords: [
      "Extension Outlets",
      "extension outlet",
    ],
    shoppingAliases: [],
  },

  "External Hard Drives": {
    category: "Electronics",
    productKeywords: [
      "External Hard Drives",
      "external hard drive",
    ],
    shoppingAliases: [],
  },

  "Feature Phones": {
    category: "Electronics",
    productKeywords: [
      "Feature Phones",
      "feature phone",
    ],
    shoppingAliases: [],
  },

  "Fitness Trackers": {
    category: "Electronics",
    productKeywords: [
      "Fitness Trackers",
      "fitness tracker",
    ],
    shoppingAliases: [],
  },

  "Graphics Cards": {
    category: "Electronics",
    productKeywords: [
      "Graphics Cards",
      "graphics card",
    ],
    shoppingAliases: [],
  },

  "HDMI Cables": {
    category: "Electronics",
    productKeywords: [
      "HDMI Cables",
      "hdmi cable",
    ],
    shoppingAliases: [],
  },

  "Headphones": {
    category: "Electronics",
    productKeywords: [
      "Headphones",
      "headphone",
    ],
    shoppingAliases: [],
  },

  "Keyboards": {
    category: "Electronics",
    productKeywords: [
      "Keyboards",
      "keyboard",
    ],
    shoppingAliases: [],
  },

  "LAN Cables": {
    category: "Electronics",
    productKeywords: [
      "LAN Cables",
      "lan cable",
    ],
    shoppingAliases: [],
  },

  "Laptops": {
    category: "Electronics",
    productKeywords: [
      "Laptops",
      "laptop",
    ],
    shoppingAliases: [],
  },

  "LCD Displays": {
    category: "Electronics",
    productKeywords: [
      "LCD Displays",
      "lcd display",
    ],
    shoppingAliases: [],
  },

  "Lightning Cables": {
    category: "Electronics",
    productKeywords: [
      "Lightning Cables",
      "lightning cable",
    ],
    shoppingAliases: [],
  },

  "Mechanical Keyboards": {
    category: "Electronics",
    productKeywords: [
      "Mechanical Keyboards",
      "mechanical keyboard",
    ],
    shoppingAliases: [],
  },

  "Memory Cards": {
    category: "Electronics",
    productKeywords: [
      "Memory Cards",
      "memory card",
    ],
    shoppingAliases: [],
  },

  "Mice": {
    category: "Electronics",
    productKeywords: [
      "Mice",
    ],
    shoppingAliases: [],
  },

  "Microcontrollers": {
    category: "Electronics",
    productKeywords: [
      "Microcontrollers",
      "microcontroller",
    ],
    shoppingAliases: [],
  },

  "Microphones": {
    category: "Electronics",
    productKeywords: [
      "Microphones",
      "microphone",
    ],
    shoppingAliases: [],
  },

  "Mini PCs": {
    category: "Electronics",
    productKeywords: [
      "Mini PCs",
      "mini pc",
    ],
    shoppingAliases: [],
  },

  "Mobile Phones": {
    category: "Electronics",
    productKeywords: [
      "Mobile Phones",
      "mobile phone",
    ],
    shoppingAliases: [],
  },

  "Modems": {
    category: "Electronics",
    productKeywords: [
      "Modems",
      "modem",
    ],
    shoppingAliases: [],
  },

  "Motherboards": {
    category: "Electronics",
    productKeywords: [
      "Motherboards",
      "motherboard",
    ],
    shoppingAliases: [],
  },

  "Mouse Pads": {
    category: "Electronics",
    productKeywords: [
      "Mouse Pads",
      "mouse pad",
    ],
    shoppingAliases: [],
  },

  "Network Switches": {
    category: "Electronics",
    productKeywords: [
      "Network Switches",
      "network switche",
    ],
    shoppingAliases: [],
  },

  "Networking Devices": {
    category: "Electronics",
    productKeywords: [
      "Networking Devices",
      "networking device",
    ],
    shoppingAliases: [],
  },

  "OLED Displays": {
    category: "Electronics",
    productKeywords: [
      "OLED Displays",
      "oled display",
    ],
    shoppingAliases: [],
  },

  "Power Adapters": {
    category: "Electronics",
    productKeywords: [
      "Power Adapters",
      "power adapter",
    ],
    shoppingAliases: [],
  },

  "Power Banks": {
    category: "Electronics",
    productKeywords: [
      "Power Banks",
      "power bank",
      "energizer",
      "duracell",
      "eveready",
      "panasonic battery",
      "rechargeable battery",
    ],
    shoppingAliases: [],
  },

  "Power Supplies": {
    category: "Electronics",
    productKeywords: [
      "Power Supplies",
      "power supply",
    ],
    shoppingAliases: [],
  },

  "Printer Accessories": {
    category: "Electronics",
    productKeywords: [
      "Printer Accessories",
      "printer accessory",
    ],
    shoppingAliases: [],
  },

  "Printers": {
    category: "Electronics",
    productKeywords: [
      "Printers",
      "printer",
    ],
    shoppingAliases: [],
  },

  "Processors": {
    category: "Electronics",
    productKeywords: [
      "Processors",
      "processor",
    ],
    shoppingAliases: [],
  },

  "Projectors": {
    category: "Electronics",
    productKeywords: [
      "Projectors",
      "projector",
    ],
    shoppingAliases: [],
  },

  "RAM": {
    category: "Electronics",
    productKeywords: [
      "RAM",
    ],
    shoppingAliases: [],
  },

  "Raspberry Pi": {
    category: "Electronics",
    productKeywords: [
      "Raspberry Pi",
    ],
    shoppingAliases: [],
  },

  "Relays": {
    category: "Electronics",
    productKeywords: [
      "Relays",
      "relay",
    ],
    shoppingAliases: [],
  },

  "Resistors": {
    category: "Electronics",
    productKeywords: [
      "Resistors",
      "resistor",
    ],
    shoppingAliases: [],
  },

  "Scanners": {
    category: "Electronics",
    productKeywords: [
      "Scanners",
      "scanner",
    ],
    shoppingAliases: [],
  },

  "Security Cameras": {
    category: "Electronics",
    productKeywords: [
      "Security Cameras",
      "security camera",
    ],
    shoppingAliases: [],
  },

  "Sensors": {
    category: "Electronics",
    productKeywords: [
      "Sensors",
      "sensor",
    ],
    shoppingAliases: [],
  },

  "Servo Motors": {
    category: "Electronics",
    productKeywords: [
      "Servo Motors",
      "servo motor",
    ],
    shoppingAliases: [],
  },

  "Smart Watches": {
    category: "Electronics",
    productKeywords: [
      "Smart Watches",
      "smart watche",
    ],
    shoppingAliases: [],
  },

  "Smartphones": {
    category: "Electronics",
    productKeywords: [
      "Smartphones",
      "smartphone",
    ],
    shoppingAliases: [],
  },

  "Speakers": {
    category: "Electronics",
    productKeywords: [
      "Speakers",
      "speaker",
    ],
    shoppingAliases: [],
  },

  "SSDs": {
    category: "Electronics",
    productKeywords: [
      "SSDs",
      "ssd",
    ],
    shoppingAliases: [],
  },

  "Stepper Motors": {
    category: "Electronics",
    productKeywords: [
      "Stepper Motors",
      "stepper motor",
    ],
    shoppingAliases: [],
  },

  "Streaming Devices": {
    category: "Electronics",
    productKeywords: [
      "Streaming Devices",
      "streaming device",
    ],
    shoppingAliases: [],
  },

  "Surge Protectors": {
    category: "Electronics",
    productKeywords: [
      "Surge Protectors",
      "surge protector",
    ],
    shoppingAliases: [],
  },

  "Tablets": {
    category: "Electronics",
    productKeywords: [
      "Tablets",
      "tablet",
    ],
    shoppingAliases: [],
  },

  "Televisions": {
    category: "Electronics",
    productKeywords: [
      "Televisions",
      "television",
    ],
    shoppingAliases: [],
  },

  "Thermal Paste": {
    category: "Electronics",
    productKeywords: [
      "Thermal Paste",
    ],
    shoppingAliases: [],
  },

  "Transistors": {
    category: "Electronics",
    productKeywords: [
      "Transistors",
      "transistor",
    ],
    shoppingAliases: [],
  },

  "TV Boxes": {
    category: "Electronics",
    productKeywords: [
      "TV Boxes",
      "tv box",
    ],
    shoppingAliases: [],
  },

  "USB Cables": {
    category: "Electronics",
    productKeywords: [
      "USB Cables",
      "usb cable",
      "type c cable",
    ],
    shoppingAliases: [],
  },

  "USB Flash Drives": {
    category: "Electronics",
    productKeywords: [
      "USB Flash Drives",
      "usb flash drive",
    ],
    shoppingAliases: [],
  },

  "USB Hubs": {
    category: "Electronics",
    productKeywords: [
      "USB Hubs",
      "usb hub",
    ],
    shoppingAliases: [],
  },

  "VR Headsets": {
    category: "Electronics",
    productKeywords: [
      "VR Headsets",
      "vr headset",
    ],
    shoppingAliases: [],
  },

  "Webcams": {
    category: "Electronics",
    productKeywords: [
      "Webcams",
      "webcam",
    ],
    shoppingAliases: [],
  },

  "Wi-Fi Extenders": {
    category: "Electronics",
    productKeywords: [
      "Wi-Fi Extenders",
      "wi fi extenders",
      "wi-fi extender",
    ],
    shoppingAliases: [],
  },

  "Wi-Fi Routers": {
    category: "Electronics",
    productKeywords: [
      "Wi-Fi Routers",
      "wi fi routers",
      "wi-fi router",
    ],
    shoppingAliases: [],
  },

  "Wireless Earbuds": {
    category: "Electronics",
    productKeywords: [
      "Wireless Earbuds",
      "wireless earbud",
    ],
    shoppingAliases: [],
  },

  "Beef": {
    category: "Fresh Food",
    productKeywords: [
      "Beef",
    ],
    shoppingAliases: [
      "baka",
    ],
  },

  "Chicken": {
    category: "Fresh Food",
    productKeywords: [
      "Chicken",
    ],
    shoppingAliases: [
      "manok",
    ],
  },

  "Citrus Fruits": {
    category: "Fresh Food",
    productKeywords: [
      "Citrus Fruits",
      "citrus fruit",
    ],
    shoppingAliases: [],
  },

  "Crab": {
    category: "Fresh Food",
    productKeywords: [
      "Crab",
    ],
    shoppingAliases: [
      "alimasag",
    ],
  },

  "Duck": {
    category: "Fresh Food",
    productKeywords: [
      "Duck",
    ],
    shoppingAliases: [],
  },

  "Fish": {
    category: "Fresh Food",
    productKeywords: [
      "Fish",
      "bangus",
      "tilapia",
      "tuna",
      "salmon",
    ],
    shoppingAliases: [
      "isda",
    ],
  },

  "Fresh Dairy": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Dairy",
    ],
    shoppingAliases: [],
  },

  "Fresh Eggs": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Eggs",
      "fresh egg",
    ],
    shoppingAliases: [
      "itlog",
    ],
  },

  "Fresh Fruits": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Fruits",
      "fresh fruit",
      "banana",
      "mango",
      "apple",
    ],
    shoppingAliases: [],
  },

  "Fresh Herbs": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Herbs",
      "fresh herb",
    ],
    shoppingAliases: [],
  },

  "Fresh Meat": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Meat",
      "ground meat",
      "hotdog",
      "bacon",
      "sausage",
    ],
    shoppingAliases: [
      "karne",
    ],
  },

  "Fresh Mushrooms": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Mushrooms",
      "fresh mushroom",
    ],
    shoppingAliases: [],
  },

  "Fresh Tofu": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Tofu",
    ],
    shoppingAliases: [],
  },

  "Fresh Vegetables": {
    category: "Fresh Food",
    productKeywords: [
      "Fresh Vegetables",
      "fresh vegetable",
      "onion",
      "garlic",
      "potato",
      "tomato",
      "carrot",
      "cabbage",
    ],
    shoppingAliases: [],
  },

  "Leafy Vegetables": {
    category: "Fresh Food",
    productKeywords: [
      "Leafy Vegetables",
      "leafy vegetable",
    ],
    shoppingAliases: [
      "dahon",
    ],
  },

  "Pork": {
    category: "Fresh Food",
    productKeywords: [
      "Pork",
    ],
    shoppingAliases: [
      "baboy",
    ],
  },

  "Root Crops": {
    category: "Fresh Food",
    productKeywords: [
      "Root Crops",
      "root crop",
    ],
    shoppingAliases: [
      "kamote",
      "gabi",
    ],
  },

  "Seafood": {
    category: "Fresh Food",
    productKeywords: [
      "Seafood",
      "squid",
    ],
    shoppingAliases: [
      "lamang dagat",
    ],
  },

  "Shellfish": {
    category: "Fresh Food",
    productKeywords: [
      "Shellfish",
    ],
    shoppingAliases: [],
  },

  "Shrimp": {
    category: "Fresh Food",
    productKeywords: [
      "Shrimp",
    ],
    shoppingAliases: [],
  },

  "Tropical Fruits": {
    category: "Fresh Food",
    productKeywords: [
      "Tropical Fruits",
      "tropical fruit",
    ],
    shoppingAliases: [],
  },

  "Turkey": {
    category: "Fresh Food",
    productKeywords: [
      "Turkey",
    ],
    shoppingAliases: [],
  },

  "Frozen Desserts": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Desserts",
      "frozen dessert",
    ],
    shoppingAliases: [],
  },

  "Frozen Dumplings": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Dumplings",
      "frozen dumpling",
    ],
    shoppingAliases: [],
  },

  "Frozen Fruits": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Fruits",
      "frozen fruit",
    ],
    shoppingAliases: [],
  },

  "Frozen Meals": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Meals",
      "frozen meal",
    ],
    shoppingAliases: [
      "ready meal",
      "frozen food",
    ],
  },

  "Frozen Meat": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Meat",
      "hotdog",
      "burger patty",
    ],
    shoppingAliases: [
      "frozen karne",
    ],
  },

  "Frozen Pizza": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Pizza",
      "pizza",
    ],
    shoppingAliases: [],
  },

  "Frozen Seafood": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Seafood",
    ],
    shoppingAliases: [],
  },

  "Frozen Snacks": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Snacks",
      "frozen snack",
    ],
    shoppingAliases: [],
  },

  "Frozen Vegetables": {
    category: "Frozen Food",
    productKeywords: [
      "Frozen Vegetables",
      "frozen vegetable",
    ],
    shoppingAliases: [],
  },

  "Ice Cream": {
    category: "Frozen Food",
    productKeywords: [
      "Ice Cream",
    ],
    shoppingAliases: [
      "sorbetes",
    ],
  },

  "Agricultural Equipment": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Agricultural Equipment",
    ],
    shoppingAliases: [],
  },

  "Animal Supplements": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Animal Supplements",
      "animal supplement",
    ],
    shoppingAliases: [],
  },

  "Chainsaws": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Chainsaws",
      "chainsaw",
    ],
    shoppingAliases: [],
  },

  "Chemical Fertilizers": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Chemical Fertilizers",
      "chemical fertilizer",
    ],
    shoppingAliases: [],
  },

  "Compost": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Compost",
    ],
    shoppingAliases: [],
  },

  "Farm Tools": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Farm Tools",
      "farm tool",
    ],
    shoppingAliases: [],
  },

  "Fertilizers": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Fertilizers",
      "fertilizer",
    ],
    shoppingAliases: [],
  },

  "Flower Seeds": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Flower Seeds",
      "flower seed",
    ],
    shoppingAliases: [],
  },

  "Fruit Seeds": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Fruit Seeds",
      "fruit seed",
    ],
    shoppingAliases: [],
  },

  "Fungicides": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Fungicides",
      "fungicide",
    ],
    shoppingAliases: [],
  },

  "Garden Gloves": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Garden Gloves",
      "garden glove",
    ],
    shoppingAliases: [],
  },

  "Garden Rakes": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Garden Rakes",
      "garden rake",
    ],
    shoppingAliases: [],
  },

  "Garden Shovels": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Garden Shovels",
      "garden shovel",
    ],
    shoppingAliases: [],
  },

  "Garden Soil": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Garden Soil",
    ],
    shoppingAliases: [],
  },

  "Greenhouses": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Greenhouses",
      "greenhouse",
    ],
    shoppingAliases: [],
  },

  "Herbicides": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Herbicides",
      "herbicide",
    ],
    shoppingAliases: [],
  },

  "Hose Nozzles": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Hose Nozzles",
      "hose nozzle",
    ],
    shoppingAliases: [],
  },

  "Irrigation Supplies": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Irrigation Supplies",
      "irrigation supply",
    ],
    shoppingAliases: [],
  },

  "Leaf Blowers": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Leaf Blowers",
      "leaf blower",
    ],
    shoppingAliases: [],
  },

  "Livestock Feed": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Livestock Feed",
    ],
    shoppingAliases: [],
  },

  "Organic Fertilizers": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Organic Fertilizers",
      "organic fertilizer",
    ],
    shoppingAliases: [],
  },

  "Pesticides": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Pesticides",
      "pesticide",
    ],
    shoppingAliases: [],
  },

  "Plant Nutrients": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Plant Nutrients",
      "plant nutrient",
    ],
    shoppingAliases: [],
  },

  "Plant Pots": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Plant Pots",
      "plant pot",
    ],
    shoppingAliases: [],
  },

  "Planters": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Planters",
      "planter",
    ],
    shoppingAliases: [],
  },

  "Potting Mix": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Potting Mix",
    ],
    shoppingAliases: [],
  },

  "Poultry Feed": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Poultry Feed",
    ],
    shoppingAliases: [],
  },

  "Seed Trays": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Seed Trays",
      "seed tray",
    ],
    shoppingAliases: [],
  },

  "Seedlings": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Seedlings",
      "seedling",
    ],
    shoppingAliases: [],
  },

  "Seeds": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Seeds",
      "seed",
    ],
    shoppingAliases: [],
  },

  "Sprinklers": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Sprinklers",
      "sprinkler",
    ],
    shoppingAliases: [],
  },

  "Vegetable Seeds": {
    category: "Garden & Agriculture",
    productKeywords: [
      "Vegetable Seeds",
      "vegetable seed",
    ],
    shoppingAliases: [],
  },

  "Alcoholic Beverages": {
    category: "Grocery",
    productKeywords: [
      "Alcoholic Beverages",
      "alcoholic beverage",
    ],
    shoppingAliases: [],
  },

  "Baby Food": {
    category: "Grocery",
    productKeywords: [
      "Baby Food",
    ],
    shoppingAliases: [
      "pagkain ng baby",
    ],
  },

  "Baking Mixes": {
    category: "Grocery",
    productKeywords: [
      "Baking Mixes",
      "baking mix",
    ],
    shoppingAliases: [],
  },

  "Baking Supplies": {
    category: "Grocery",
    productKeywords: [
      "Baking Supplies",
      "baking supply",
      "baking powder",
      "baking soda",
      "yeast",
      "chocolate chips",
      "vanilla",
    ],
    shoppingAliases: [],
  },

  "Beer": {
    category: "Grocery",
    productKeywords: [
      "Beer",
    ],
    shoppingAliases: [],
  },

  "Biscuits": {
    category: "Grocery",
    productKeywords: [
      "Biscuits",
      "biscuit",
    ],
    shoppingAliases: [
      "biskwit",
    ],
  },

  "Bottled Water": {
    category: "Grocery",
    productKeywords: [
      "Bottled Water",
    ],
    shoppingAliases: [
      "water",
      "tubig",
    ],
  },

  "Bread & Bakery": {
    category: "Grocery",
    productKeywords: [
      "Bread & Bakery",
      "bread and bakery",
      "bread bakery",
      "gardenia",
      "baker's bread",
      "monay",
      "pandesal",
      "ensaymada",
      "croissant",
      "donut",
      "cake",
      "bread",
      "bakery",
    ],
    shoppingAliases: [
      "tinapay",
      "loaf",
    ],
  },

  "Breakfast Cereals": {
    category: "Grocery",
    productKeywords: [
      "Breakfast Cereals",
      "breakfast cereal",
      "cereals",
      "pancake mix",
    ],
    shoppingAliases: [],
  },

  "Butter & Margarine": {
    category: "Grocery",
    productKeywords: [
      "Butter & Margarine",
      "butter and margarine",
      "butter margarine",
      "butter",
      "margarine",
    ],
    shoppingAliases: [],
  },

  "Cakes & Pastries": {
    category: "Grocery",
    productKeywords: [
      "Cakes & Pastries",
      "cakes and pastries",
      "cakes pastries",
      "cakes & pastry",
      "cakes",
      "pastries",
    ],
    shoppingAliases: [],
  },

  "Candy": {
    category: "Grocery",
    productKeywords: [
      "Candy",
    ],
    shoppingAliases: [
      "kendi",
    ],
  },

  "Canned Fish": {
    category: "Grocery",
    productKeywords: [
      "Canned Fish",
      "century tuna",
      "mega sardines",
      "555 sardines",
      "san marino",
      "ligo sardines",
    ],
    shoppingAliases: [
      "tuna",
      "sardinas",
    ],
  },

  "Canned Fruits": {
    category: "Grocery",
    productKeywords: [
      "Canned Fruits",
      "canned fruit",
    ],
    shoppingAliases: [],
  },

  "Canned Meals": {
    category: "Grocery",
    productKeywords: [
      "Canned Meals",
      "canned meal",
    ],
    shoppingAliases: [],
  },

  "Canned Meat": {
    category: "Grocery",
    productKeywords: [
      "Canned Meat",
      "argentina corned beef",
      "purefoods corned beef",
      "spam",
      "youngstown",
    ],
    shoppingAliases: [
      "de lata",
    ],
  },

  "Canned Vegetables": {
    category: "Grocery",
    productKeywords: [
      "Canned Vegetables",
      "canned vegetable",
    ],
    shoppingAliases: [],
  },

  "Cheese": {
    category: "Grocery",
    productKeywords: [
      "Cheese",
    ],
    shoppingAliases: [],
  },

  "Chips": {
    category: "Grocery",
    productKeywords: [
      "Chips",
      "chip",
    ],
    shoppingAliases: [],
  },

  "Chocolate": {
    category: "Grocery",
    productKeywords: [
      "Chocolate",
    ],
    shoppingAliases: [],
  },

  "Chocolate Drinks": {
    category: "Grocery",
    productKeywords: [
      "Chocolate Drinks",
      "chocolate drink",
    ],
    shoppingAliases: [],
  },

  "Cocktail Mixers": {
    category: "Grocery",
    productKeywords: [
      "Cocktail Mixers",
      "cocktail mixer",
    ],
    shoppingAliases: [],
  },

  "Coffee": {
    category: "Grocery",
    productKeywords: [
      "Coffee",
      "nescafe",
      "kopiko",
      "great taste",
      "san mig coffee",
      "blend 45",
      "barako",
      "arabica",
      "instant coffee",
      "ground coffee",
      "3 in 1",
      "coffee mix",
    ],
    shoppingAliases: [
      "kape",
      "3in1",
    ],
  },

  "Condensed Milk": {
    category: "Grocery",
    productKeywords: [
      "Condensed Milk",
    ],
    shoppingAliases: [
      "condensed",
      "kondensada",
      "malapot na gatas",
    ],
  },

  "Condiments": {
    category: "Grocery",
    productKeywords: [
      "Condiments",
      "condiment",
      "silver swan",
      "datu puti",
      "mang tomas",
      "ketchup",
      "oyster sauce",
      "chili sauce",
      "mayonnaise",
      "mustard",
    ],
    shoppingAliases: [
      "sawsawan",
    ],
  },

  "Cookies": {
    category: "Grocery",
    productKeywords: [
      "Cookies",
      "cookie",
    ],
    shoppingAliases: [],
  },

  "Cooking Oil": {
    category: "Grocery",
    productKeywords: [
      "Cooking Oil",
      "golden fry",
      "baguio oil",
      "datu puti oil",
      "palm oil",
      "canola oil",
      "olive oil",
      "coconut oil",
    ],
    shoppingAliases: [
      "mantika",
      "oil",
    ],
  },

  "Crackers": {
    category: "Grocery",
    productKeywords: [
      "Crackers",
      "cracker",
    ],
    shoppingAliases: [],
  },

  "Cream": {
    category: "Grocery",
    productKeywords: [
      "Cream",
    ],
    shoppingAliases: [],
  },

  "Dairy Milk": {
    category: "Grocery",
    productKeywords: [
      "Dairy Milk",
      "fresh milk",
    ],
    shoppingAliases: [
      "milk",
    ],
  },

  "Dessert Mixes": {
    category: "Grocery",
    productKeywords: [
      "Dessert Mixes",
      "dessert mix",
    ],
    shoppingAliases: [],
  },

  "Diet & Specialty Food": {
    category: "Grocery",
    productKeywords: [
      "Diet & Specialty Food",
      "diet and specialty food",
      "diet specialty food",
      "diet",
      "specialty food",
    ],
    shoppingAliases: [],
  },

  "Dried Fish": {
    category: "Grocery",
    productKeywords: [
      "Dried Fish",
    ],
    shoppingAliases: [],
  },

  "Dried Food": {
    category: "Grocery",
    productKeywords: [
      "Dried Food",
    ],
    shoppingAliases: [],
  },

  "Dried Fruits": {
    category: "Grocery",
    productKeywords: [
      "Dried Fruits",
      "dried fruit",
    ],
    shoppingAliases: [],
  },

  "Eggs": {
    category: "Grocery",
    productKeywords: [
      "Eggs",
      "egg",
    ],
    shoppingAliases: [
      "itlog",
    ],
  },

  "Energy Drinks": {
    category: "Grocery",
    productKeywords: [
      "Energy Drinks",
      "energy drink",
      "red bull",
      "sting",
      "cobra energy drink",
      "monster energy",
    ],
    shoppingAliases: [],
  },

  "Evaporated Milk": {
    category: "Grocery",
    productKeywords: [
      "Evaporated Milk",
    ],
    shoppingAliases: [
      "evap",
      "evaporada",
      "malagnaw na gatas",
    ],
  },

  "Fish Sauce": {
    category: "Grocery",
    productKeywords: [
      "Fish Sauce",
    ],
    shoppingAliases: [],
  },

  "Flour": {
    category: "Grocery",
    productKeywords: [
      "Flour",
    ],
    shoppingAliases: [],
  },

  "Gluten-Free Food": {
    category: "Grocery",
    productKeywords: [
      "Gluten-Free Food",
      "gluten free food",
    ],
    shoppingAliases: [],
  },

  "Grains": {
    category: "Grocery",
    productKeywords: [
      "Grains",
      "grain",
    ],
    shoppingAliases: [],
  },

  "Gum & Mints": {
    category: "Grocery",
    productKeywords: [
      "Gum & Mints",
      "gum and mints",
      "gum mints",
      "gum & mint",
      "gum",
      "mints",
    ],
    shoppingAliases: [],
  },

  "Herbs & Spices": {
    category: "Grocery",
    productKeywords: [
      "Herbs & Spices",
      "herbs and spices",
      "herbs spices",
      "herbs & spice",
      "herbs",
      "spices",
    ],
    shoppingAliases: [],
  },

  "Honey": {
    category: "Grocery",
    productKeywords: [
      "Honey",
    ],
    shoppingAliases: [],
  },

  "Instant Meals": {
    category: "Grocery",
    productKeywords: [
      "Instant Meals",
      "instant meal",
    ],
    shoppingAliases: [],
  },

  "Instant Noodles": {
    category: "Grocery",
    productKeywords: [
      "Instant Noodles",
      "instant noodle",
      "lucky me",
      "nissin",
      "payless",
      "quickchow",
      "yakisoba",
      "indomie",
      "mi goreng",
      "maggi",
      "pancit canton",
      "ramen",
      "cup noodles",
      "oishi noodles",
    ],
    shoppingAliases: [],
  },

  "International Food": {
    category: "Grocery",
    productKeywords: [
      "International Food",
    ],
    shoppingAliases: [],
  },

  "Jams & Preserves": {
    category: "Grocery",
    productKeywords: [
      "Jams & Preserves",
      "jams and preserves",
      "jams preserves",
      "jams & preserve",
      "jams",
      "preserves",
    ],
    shoppingAliases: [],
  },

  "Juices": {
    category: "Grocery",
    productKeywords: [
      "Juices",
      "juice",
      "tropicana",
      "minute maid",
      "del monte juice",
      "mango juice",
      "pineapple juice",
      "orange juice",
    ],
    shoppingAliases: [
      "inumin",
    ],
  },

  "Milk Drinks": {
    category: "Grocery",
    productKeywords: [
      "Milk Drinks",
      "milk drink",
    ],
    shoppingAliases: [],
  },

  "Nuts & Seeds": {
    category: "Grocery",
    productKeywords: [
      "Nuts & Seeds",
      "nuts and seeds",
      "nuts seeds",
      "nuts & seed",
      "nuts",
      "seeds",
    ],
    shoppingAliases: [],
  },

  "Oatmeal": {
    category: "Grocery",
    productKeywords: [
      "Oatmeal",
    ],
    shoppingAliases: [],
  },

  "Organic Food": {
    category: "Grocery",
    productKeywords: [
      "Organic Food",
    ],
    shoppingAliases: [],
  },

  "Pasta": {
    category: "Grocery",
    productKeywords: [
      "Pasta",
      "spaghetti",
      "macaroni",
      "lasagna",
      "pancit",
      "fettuccine",
    ],
    shoppingAliases: [],
  },

  "Pasta Sauce": {
    category: "Grocery",
    productKeywords: [
      "Pasta Sauce",
    ],
    shoppingAliases: [],
  },

  "Peanut Butter": {
    category: "Grocery",
    productKeywords: [
      "Peanut Butter",
    ],
    shoppingAliases: [],
  },

  "Plant-Based Milk": {
    category: "Grocery",
    productKeywords: [
      "Plant-Based Milk",
      "plant based milk",
    ],
    shoppingAliases: [],
  },

  "Popcorn": {
    category: "Grocery",
    productKeywords: [
      "Popcorn",
    ],
    shoppingAliases: [],
  },

  "Powdered Drinks": {
    category: "Grocery",
    productKeywords: [
      "Powdered Drinks",
      "powdered drink",
    ],
    shoppingAliases: [],
  },

  "Powdered Milk": {
    category: "Grocery",
    productKeywords: [
      "Powdered Milk",
    ],
    shoppingAliases: [
      "gatas",
    ],
  },

  "Processed Meat": {
    category: "Grocery",
    productKeywords: [
      "Processed Meat",
    ],
    shoppingAliases: [],
  },

  "Ready-to-Drink Coffee": {
    category: "Grocery",
    productKeywords: [
      "Ready-to-Drink Coffee",
      "ready to drink coffee",
    ],
    shoppingAliases: [],
  },

  "Ready-to-Drink Tea": {
    category: "Grocery",
    productKeywords: [
      "Ready-to-Drink Tea",
      "ready to drink tea",
      "brewed",
      "iced tea",
    ],
    shoppingAliases: [],
  },

  "Ready-to-Eat Meals": {
    category: "Grocery",
    productKeywords: [
      "Ready-to-Eat Meals",
      "ready to eat meals",
      "ready-to-eat meal",
    ],
    shoppingAliases: [],
  },

  "Rice": {
    category: "Grocery",
    productKeywords: [
      "Rice",
      "sinandomeng",
      "angelica",
      "rc rice",
      "jasmine rice",
      "malagkit",
      "brown rice",
      "red rice",
      "black rice",
      "premium rice",
      "dinorado",
    ],
    shoppingAliases: [
      "kanin",
    ],
  },

  "Salt": {
    category: "Grocery",
    productKeywords: [
      "Salt",
    ],
    shoppingAliases: [],
  },

  "Seasonings": {
    category: "Grocery",
    productKeywords: [
      "Seasonings",
      "seasoning",
      "maggi magic sarap",
      "knorr",
      "ajinomoto",
      "sinigang mix",
      "calamansi powder",
      "pepper",
      "garlic powder",
      "onion powder",
    ],
    shoppingAliases: [
      "pampalasa",
    ],
  },

  "Snacks": {
    category: "Grocery",
    productKeywords: [
      "Snacks",
      "snack",
      "nova",
      "chippy",
      "piatos",
      "mr chips",
      "jack n jill",
      "skyflakes",
      "rebisco",
      "chicharon",
      "cheese curls",
      "pretzels",
      "piattos",
      "oishi",
    ],
    shoppingAliases: [
      "chichirya",
    ],
  },

  "Soft Drinks": {
    category: "Grocery",
    productKeywords: [
      "Soft Drinks",
      "soft drink",
      "coca cola",
      "coca-cola",
      "coke",
      "sprite",
      "royal",
      "pepsi",
      "mountain dew",
      "seven up",
      "7up",
      "rc cola",
      "mirinda",
      "fanta",
    ],
    shoppingAliases: [
      "softdrink",
      "softdrinks",
    ],
  },

  "Soup & Broth": {
    category: "Grocery",
    productKeywords: [
      "Soup & Broth",
      "soup and broth",
      "soup broth",
      "soup",
      "broth",
    ],
    shoppingAliases: [],
  },

  "Soy Sauce": {
    category: "Grocery",
    productKeywords: [
      "Soy Sauce",
    ],
    shoppingAliases: [],
  },

  "Sparkling Water": {
    category: "Grocery",
    productKeywords: [
      "Sparkling Water",
    ],
    shoppingAliases: [],
  },

  "Spirits": {
    category: "Grocery",
    productKeywords: [
      "Spirits",
      "spirit",
    ],
    shoppingAliases: [],
  },

  "Sports Drinks": {
    category: "Grocery",
    productKeywords: [
      "Sports Drinks",
      "sports drink",
      "gatorade",
      "pocari sweat",
      "powerade",
    ],
    shoppingAliases: [],
  },

  "Spreads": {
    category: "Grocery",
    productKeywords: [
      "Spreads",
      "spread",
    ],
    shoppingAliases: [],
  },

  "Sugar": {
    category: "Grocery",
    productKeywords: [
      "Sugar",
    ],
    shoppingAliases: [],
  },

  "Sugar-Free Food": {
    category: "Grocery",
    productKeywords: [
      "Sugar-Free Food",
      "sugar free food",
    ],
    shoppingAliases: [],
  },

  "Sweeteners": {
    category: "Grocery",
    productKeywords: [
      "Sweeteners",
      "sweetener",
    ],
    shoppingAliases: [],
  },

  "Tea": {
    category: "Grocery",
    productKeywords: [
      "Tea",
    ],
    shoppingAliases: [],
  },

  "Vegetarian & Vegan Food": {
    category: "Grocery",
    productKeywords: [
      "Vegetarian & Vegan Food",
      "vegetarian and vegan food",
      "vegetarian vegan food",
      "vegetarian",
      "vegan food",
    ],
    shoppingAliases: [],
  },

  "Vinegar": {
    category: "Grocery",
    productKeywords: [
      "Vinegar",
    ],
    shoppingAliases: [],
  },

  "Wine": {
    category: "Grocery",
    productKeywords: [
      "Wine",
    ],
    shoppingAliases: [],
  },

  "Yogurt": {
    category: "Grocery",
    productKeywords: [
      "Yogurt",
      "dutch mill",
    ],
    shoppingAliases: [],
  },

  "Adhesives": {
    category: "Hardware",
    productKeywords: [
      "Adhesives",
      "adhesive",
      "glue",
      "contact cement",
    ],
    shoppingAliases: [
      "pandikit",
    ],
  },

  "Allen Keys": {
    category: "Hardware",
    productKeywords: [
      "Allen Keys",
      "allen key",
    ],
    shoppingAliases: [],
  },

  "Anchors": {
    category: "Hardware",
    productKeywords: [
      "Anchors",
      "anchor",
    ],
    shoppingAliases: [],
  },

  "Bolts & Nuts": {
    category: "Hardware",
    productKeywords: [
      "Bolts & Nuts",
      "bolts and nuts",
      "bolts nuts",
      "bolts & nut",
      "hex bolt",
      "carriage bolt",
      "wing nut",
      "bolts",
      "nuts",
    ],
    shoppingAliases: [
      "bolt",
      "nut",
      "turnilyo at nut",
    ],
  },

  "Bricks": {
    category: "Hardware",
    productKeywords: [
      "Bricks",
      "brick",
    ],
    shoppingAliases: [],
  },

  "Cabinet Handles": {
    category: "Hardware",
    productKeywords: [
      "Cabinet Handles",
      "cabinet handle",
    ],
    shoppingAliases: [],
  },

  "Cabinet Knobs": {
    category: "Hardware",
    productKeywords: [
      "Cabinet Knobs",
      "cabinet knob",
    ],
    shoppingAliases: [],
  },

  "Cable Ties": {
    category: "Hardware",
    productKeywords: [
      "Cable Ties",
      "cable tie",
    ],
    shoppingAliases: [
      "zip tie",
      "tie wrap",
    ],
  },

  "Caulking": {
    category: "Hardware",
    productKeywords: [
      "Caulking",
    ],
    shoppingAliases: [],
  },

  "Cement": {
    category: "Hardware",
    productKeywords: [
      "Cement",
    ],
    shoppingAliases: [],
  },

  "Chains": {
    category: "Hardware",
    productKeywords: [
      "Chains",
      "chain",
    ],
    shoppingAliases: [],
  },

  "Chisels": {
    category: "Hardware",
    productKeywords: [
      "Chisels",
      "chisel",
    ],
    shoppingAliases: [],
  },

  "Circuit Breakers": {
    category: "Hardware",
    productKeywords: [
      "Circuit Breakers",
      "circuit breaker",
    ],
    shoppingAliases: [],
  },

  "Clamps": {
    category: "Hardware",
    productKeywords: [
      "Clamps",
      "clamp",
    ],
    shoppingAliases: [],
  },

  "Combination Locks": {
    category: "Hardware",
    productKeywords: [
      "Combination Locks",
      "combination lock",
    ],
    shoppingAliases: [],
  },

  "Concrete Mix": {
    category: "Hardware",
    productKeywords: [
      "Concrete Mix",
    ],
    shoppingAliases: [],
  },

  "Concrete Nails": {
    category: "Hardware",
    productKeywords: [
      "Concrete Nails",
      "concrete nail",
    ],
    shoppingAliases: [],
  },

  "Conduits": {
    category: "Hardware",
    productKeywords: [
      "Conduits",
      "conduit",
    ],
    shoppingAliases: [],
  },

  "Construction Adhesive": {
    category: "Hardware",
    productKeywords: [
      "Construction Adhesive",
    ],
    shoppingAliases: [],
  },

  "Construction Materials": {
    category: "Hardware",
    productKeywords: [
      "Construction Materials",
      "construction material",
      "gypsum board",
    ],
    shoppingAliases: [],
  },

  "Deadbolts": {
    category: "Hardware",
    productKeywords: [
      "Deadbolts",
      "deadbolt",
    ],
    shoppingAliases: [],
  },

  "Door Closers": {
    category: "Hardware",
    productKeywords: [
      "Door Closers",
      "door closer",
    ],
    shoppingAliases: [],
  },

  "Door Locks": {
    category: "Hardware",
    productKeywords: [
      "Door Locks",
      "door lock",
    ],
    shoppingAliases: [],
  },

  "Drawer Slides": {
    category: "Hardware",
    productKeywords: [
      "Drawer Slides",
      "drawer slide",
    ],
    shoppingAliases: [],
  },

  "Drill Bits": {
    category: "Hardware",
    productKeywords: [
      "Drill Bits",
      "drill bit",
    ],
    shoppingAliases: [],
  },

  "Drop Cloths": {
    category: "Hardware",
    productKeywords: [
      "Drop Cloths",
      "drop cloth",
    ],
    shoppingAliases: [],
  },

  "Drywall Screws": {
    category: "Hardware",
    productKeywords: [
      "Drywall Screws",
      "drywall screw",
    ],
    shoppingAliases: [],
  },

  "Dust Masks": {
    category: "Hardware",
    productKeywords: [
      "Dust Masks",
      "dust mask",
    ],
    shoppingAliases: [],
  },

  "Ear Protection": {
    category: "Hardware",
    productKeywords: [
      "Ear Protection",
    ],
    shoppingAliases: [],
  },

  "Electrical Cables": {
    category: "Hardware",
    productKeywords: [
      "Electrical Cables",
      "electrical cable",
    ],
    shoppingAliases: [],
  },

  "Electrical Outlets": {
    category: "Hardware",
    productKeywords: [
      "Electrical Outlets",
      "electrical outlet",
    ],
    shoppingAliases: [
      "outlet",
      "saksakan",
    ],
  },

  "Electrical Supplies": {
    category: "Hardware",
    productKeywords: [
      "Electrical Supplies",
      "electrical supply",
      "wire",
      "switch",
      "outlet",
      "breaker",
    ],
    shoppingAliases: [],
  },

  "Electrical Tape": {
    category: "Hardware",
    productKeywords: [
      "Electrical Tape",
    ],
    shoppingAliases: [
      "electric tape",
    ],
  },

  "Electrical Wires": {
    category: "Hardware",
    productKeywords: [
      "Electrical Wires",
      "electrical wire",
    ],
    shoppingAliases: [
      "kable",
    ],
  },

  "Epoxy": {
    category: "Hardware",
    productKeywords: [
      "Epoxy",
    ],
    shoppingAliases: [],
  },

  "Extension Cords": {
    category: "Hardware",
    productKeywords: [
      "Extension Cords",
      "extension cord",
    ],
    shoppingAliases: [],
  },

  "Eye Bolts": {
    category: "Hardware",
    productKeywords: [
      "Eye Bolts",
      "eye bolt",
    ],
    shoppingAliases: [],
  },

  "Face Shields": {
    category: "Hardware",
    productKeywords: [
      "Face Shields",
      "face shield",
    ],
    shoppingAliases: [],
  },

  "Fasteners": {
    category: "Hardware",
    productKeywords: [
      "Fasteners",
      "fastener",
    ],
    shoppingAliases: [],
  },

  "Faucets": {
    category: "Hardware",
    productKeywords: [
      "Faucets",
      "faucet",
    ],
    shoppingAliases: [
      "gripo",
    ],
  },

  "Files": {
    category: "Hardware",
    productKeywords: [
      "Files",
      "file",
    ],
    shoppingAliases: [],
  },

  "Finishing Nails": {
    category: "Hardware",
    productKeywords: [
      "Finishing Nails",
      "finishing nail",
    ],
    shoppingAliases: [],
  },

  "Fire Extinguishers": {
    category: "Hardware",
    productKeywords: [
      "Fire Extinguishers",
      "fire extinguisher",
    ],
    shoppingAliases: [],
  },

  "Furniture Casters": {
    category: "Hardware",
    productKeywords: [
      "Furniture Casters",
      "furniture caster",
    ],
    shoppingAliases: [],
  },

  "Fuses": {
    category: "Hardware",
    productKeywords: [
      "Fuses",
      "fuse",
    ],
    shoppingAliases: [],
  },

  "Garden Hoes": {
    category: "Hardware",
    productKeywords: [
      "Garden Hoes",
      "garden hoe",
    ],
    shoppingAliases: [],
  },

  "Garden Hoses": {
    category: "Hardware",
    productKeywords: [
      "Garden Hoses",
      "garden hose",
    ],
    shoppingAliases: [],
  },

  "Gardening Tools": {
    category: "Hardware",
    productKeywords: [
      "Gardening Tools",
      "gardening tool",
    ],
    shoppingAliases: [],
  },

  "GI Pipes": {
    category: "Hardware",
    productKeywords: [
      "GI Pipes",
      "gi pipe",
    ],
    shoppingAliases: [],
  },

  "Grass Cutters": {
    category: "Hardware",
    productKeywords: [
      "Grass Cutters",
      "grass cutter",
    ],
    shoppingAliases: [],
  },

  "Gravel": {
    category: "Hardware",
    productKeywords: [
      "Gravel",
    ],
    shoppingAliases: [],
  },

  "Grinding Discs": {
    category: "Hardware",
    productKeywords: [
      "Grinding Discs",
      "grinding disc",
    ],
    shoppingAliases: [],
  },

  "Hammers": {
    category: "Hardware",
    productKeywords: [
      "Hammers",
      "hammer",
    ],
    shoppingAliases: [
      "martilyo",
    ],
  },

  "Hand Saws": {
    category: "Hardware",
    productKeywords: [
      "Hand Saws",
      "hand saw",
    ],
    shoppingAliases: [
      "lagari",
    ],
  },

  "Hand Tools": {
    category: "Hardware",
    productKeywords: [
      "Hand Tools",
      "hand tool",
      "wrench",
      "saw",
    ],
    shoppingAliases: [
      "tools",
      "gamit",
    ],
  },

  "Hard Hats": {
    category: "Hardware",
    productKeywords: [
      "Hard Hats",
      "hard hat",
    ],
    shoppingAliases: [],
  },

  "Hinges": {
    category: "Hardware",
    productKeywords: [
      "Hinges",
      "hinge",
    ],
    shoppingAliases: [
      "bisagra",
    ],
  },

  "Hollow Blocks": {
    category: "Hardware",
    productKeywords: [
      "Hollow Blocks",
      "hollow block",
    ],
    shoppingAliases: [],
  },

  "Hooks": {
    category: "Hardware",
    productKeywords: [
      "Hooks",
      "hook",
    ],
    shoppingAliases: [],
  },

  "Hose Connectors": {
    category: "Hardware",
    productKeywords: [
      "Hose Connectors",
      "hose connector",
    ],
    shoppingAliases: [],
  },

  "Insulation Materials": {
    category: "Hardware",
    productKeywords: [
      "Insulation Materials",
      "insulation material",
    ],
    shoppingAliases: [],
  },

  "Junction Boxes": {
    category: "Hardware",
    productKeywords: [
      "Junction Boxes",
      "junction box",
    ],
    shoppingAliases: [],
  },

  "Keys": {
    category: "Hardware",
    productKeywords: [
      "Keys",
      "key",
    ],
    shoppingAliases: [],
  },

  "Lamp Holders": {
    category: "Hardware",
    productKeywords: [
      "Lamp Holders",
      "lamp holder",
    ],
    shoppingAliases: [],
  },

  "LED Bulbs": {
    category: "Hardware",
    productKeywords: [
      "LED Bulbs",
      "led bulb",
    ],
    shoppingAliases: [],
  },

  "Levels": {
    category: "Hardware",
    productKeywords: [
      "Levels",
      "level",
    ],
    shoppingAliases: [],
  },

  "Light Bulbs": {
    category: "Hardware",
    productKeywords: [
      "Light Bulbs",
      "light bulb",
    ],
    shoppingAliases: [
      "bulb",
      "bombilya",
    ],
  },

  "Locks": {
    category: "Hardware",
    productKeywords: [
      "Locks",
      "lock",
    ],
    shoppingAliases: [],
  },

  "Lumber": {
    category: "Hardware",
    productKeywords: [
      "Lumber",
    ],
    shoppingAliases: [],
  },

  "Machine Screws": {
    category: "Hardware",
    productKeywords: [
      "Machine Screws",
      "machine screw",
    ],
    shoppingAliases: [],
  },

  "Masking Tape": {
    category: "Hardware",
    productKeywords: [
      "Masking Tape",
    ],
    shoppingAliases: [],
  },

  "Metal Sheets": {
    category: "Hardware",
    productKeywords: [
      "Metal Sheets",
      "metal sheet",
    ],
    shoppingAliases: [],
  },

  "Nails": {
    category: "Hardware",
    productKeywords: [
      "Nails",
      "nail",
      "common nail",
    ],
    shoppingAliases: [
      "pako",
    ],
  },

  "Padlocks": {
    category: "Hardware",
    productKeywords: [
      "Padlocks",
      "padlock",
    ],
    shoppingAliases: [
      "kandado",
    ],
  },

  "Paint Remover": {
    category: "Hardware",
    productKeywords: [
      "Paint Remover",
    ],
    shoppingAliases: [],
  },

  "Paint Rollers": {
    category: "Hardware",
    productKeywords: [
      "Paint Rollers",
      "paint roller",
    ],
    shoppingAliases: [],
  },

  "Paint Thinner": {
    category: "Hardware",
    productKeywords: [
      "Paint Thinner",
    ],
    shoppingAliases: [],
  },

  "Paint Trays": {
    category: "Hardware",
    productKeywords: [
      "Paint Trays",
      "paint tray",
    ],
    shoppingAliases: [],
  },

  "Painting Supplies": {
    category: "Hardware",
    productKeywords: [
      "Painting Supplies",
      "painting supply",
      "brush",
      "roller",
      "thinner",
    ],
    shoppingAliases: [],
  },

  "Pipe Clamps": {
    category: "Hardware",
    productKeywords: [
      "Pipe Clamps",
      "pipe clamp",
    ],
    shoppingAliases: [],
  },

  "Pipe Insulation": {
    category: "Hardware",
    productKeywords: [
      "Pipe Insulation",
    ],
    shoppingAliases: [],
  },

  "Pipe Sealants": {
    category: "Hardware",
    productKeywords: [
      "Pipe Sealants",
      "pipe sealant",
    ],
    shoppingAliases: [],
  },

  "Pliers": {
    category: "Hardware",
    productKeywords: [
      "Pliers",
      "plier",
    ],
    shoppingAliases: [
      "plays",
    ],
  },

  "Plumbing Supplies": {
    category: "Hardware",
    productKeywords: [
      "Plumbing Supplies",
      "plumbing supply",
      "pipe",
      "connector",
    ],
    shoppingAliases: [],
  },

  "Plywood": {
    category: "Hardware",
    productKeywords: [
      "Plywood",
    ],
    shoppingAliases: [],
  },

  "Power Tools": {
    category: "Hardware",
    productKeywords: [
      "Power Tools",
      "power tool",
      "drill",
      "grinder",
      "circular saw",
      "jigsaw",
      "sander",
    ],
    shoppingAliases: [],
  },

  "PPR Pipes & Fittings": {
    category: "Hardware",
    productKeywords: [
      "PPR Pipes & Fittings",
      "ppr pipes and fittings",
      "ppr pipes fittings",
      "ppr pipes & fitting",
      "ppr pipes",
    ],
    shoppingAliases: [],
  },

  "Pruning Shears": {
    category: "Hardware",
    productKeywords: [
      "Pruning Shears",
      "pruning shear",
    ],
    shoppingAliases: [],
  },

  "PVC Pipes & Fittings": {
    category: "Hardware",
    productKeywords: [
      "PVC Pipes & Fittings",
      "pvc pipes and fittings",
      "pvc pipes fittings",
      "pvc pipes & fitting",
      "pvc pipe",
      "elbow",
      "tee",
      "coupling",
      "pvc pipes",
    ],
    shoppingAliases: [
      "tubo",
      "pvc fitting",
    ],
  },

  "Rakes": {
    category: "Hardware",
    productKeywords: [
      "Rakes",
      "rake",
    ],
    shoppingAliases: [
      "kalaykay",
    ],
  },

  "Reflective Vests": {
    category: "Hardware",
    productKeywords: [
      "Reflective Vests",
      "reflective vest",
    ],
    shoppingAliases: [],
  },

  "Respirators": {
    category: "Hardware",
    productKeywords: [
      "Respirators",
      "respirator",
    ],
    shoppingAliases: [],
  },

  "Rivets": {
    category: "Hardware",
    productKeywords: [
      "Rivets",
      "rivet",
    ],
    shoppingAliases: [],
  },

  "Roof Sealants": {
    category: "Hardware",
    productKeywords: [
      "Roof Sealants",
      "roof sealant",
    ],
    shoppingAliases: [],
  },

  "Roofing Nails": {
    category: "Hardware",
    productKeywords: [
      "Roofing Nails",
      "roofing nail",
    ],
    shoppingAliases: [],
  },

  "Roofing Sheets": {
    category: "Hardware",
    productKeywords: [
      "Roofing Sheets",
      "roofing sheet",
    ],
    shoppingAliases: [],
  },

  "Ropes": {
    category: "Hardware",
    productKeywords: [
      "Ropes",
      "rope",
    ],
    shoppingAliases: [
      "lubid",
    ],
  },

  "Safety Equipment": {
    category: "Hardware",
    productKeywords: [
      "Safety Equipment",
      "helmet",
      "gloves",
      "goggles",
      "mask",
      "harness",
    ],
    shoppingAliases: [],
  },

  "Safety Glasses": {
    category: "Hardware",
    productKeywords: [
      "Safety Glasses",
      "safety glasse",
    ],
    shoppingAliases: [],
  },

  "Safety Harnesses": {
    category: "Hardware",
    productKeywords: [
      "Safety Harnesses",
      "safety harnesse",
    ],
    shoppingAliases: [],
  },

  "Safety Shoes": {
    category: "Hardware",
    productKeywords: [
      "Safety Shoes",
      "safety shoe",
    ],
    shoppingAliases: [],
  },

  "Sand": {
    category: "Hardware",
    productKeywords: [
      "Sand",
    ],
    shoppingAliases: [],
  },

  "Sandpaper": {
    category: "Hardware",
    productKeywords: [
      "Sandpaper",
    ],
    shoppingAliases: [
      "liha",
    ],
  },

  "Saw Blades": {
    category: "Hardware",
    productKeywords: [
      "Saw Blades",
      "saw blade",
    ],
    shoppingAliases: [],
  },

  "Screwdrivers": {
    category: "Hardware",
    productKeywords: [
      "Screwdrivers",
      "screwdriver",
    ],
    shoppingAliases: [
      "distornilyador",
    ],
  },

  "Screws": {
    category: "Hardware",
    productKeywords: [
      "Screws",
      "screw",
      "self tapping screw",
    ],
    shoppingAliases: [
      "turnilyo",
    ],
  },

  "Sealants": {
    category: "Hardware",
    productKeywords: [
      "Sealants",
      "sealant",
      "caulk",
      "rtv sealant",
    ],
    shoppingAliases: [],
  },

  "Self-Tapping Screws": {
    category: "Hardware",
    productKeywords: [
      "Self-Tapping Screws",
      "self tapping screws",
      "self-tapping screw",
    ],
    shoppingAliases: [],
  },

  "Shovels": {
    category: "Hardware",
    productKeywords: [
      "Shovels",
      "shovel",
    ],
    shoppingAliases: [
      "pala",
    ],
  },

  "Shower Heads": {
    category: "Hardware",
    productKeywords: [
      "Shower Heads",
      "shower head",
    ],
    shoppingAliases: [],
  },

  "Silicone Sealant": {
    category: "Hardware",
    productKeywords: [
      "Silicone Sealant",
    ],
    shoppingAliases: [],
  },

  "Smart Locks": {
    category: "Hardware",
    productKeywords: [
      "Smart Locks",
      "smart lock",
    ],
    shoppingAliases: [],
  },

  "Sockets": {
    category: "Hardware",
    productKeywords: [
      "Sockets",
      "socket",
    ],
    shoppingAliases: [],
  },

  "Spades": {
    category: "Hardware",
    productKeywords: [
      "Spades",
      "spade",
    ],
    shoppingAliases: [],
  },

  "Sprayers": {
    category: "Hardware",
    productKeywords: [
      "Sprayers",
      "sprayer",
    ],
    shoppingAliases: [],
  },

  "Steel Bars": {
    category: "Hardware",
    productKeywords: [
      "Steel Bars",
      "steel bar",
    ],
    shoppingAliases: [],
  },

  "Steel Wires": {
    category: "Hardware",
    productKeywords: [
      "Steel Wires",
      "steel wire",
    ],
    shoppingAliases: [
      "alambre",
    ],
  },

  "Super Glue": {
    category: "Hardware",
    productKeywords: [
      "Super Glue",
    ],
    shoppingAliases: [],
  },

  "Tape Measures": {
    category: "Hardware",
    productKeywords: [
      "Tape Measures",
      "tape measure",
    ],
    shoppingAliases: [
      "metro",
    ],
  },

  "Thread Seal Tape": {
    category: "Hardware",
    productKeywords: [
      "Thread Seal Tape",
    ],
    shoppingAliases: [],
  },

  "Tool Sets": {
    category: "Hardware",
    productKeywords: [
      "Tool Sets",
      "tool set",
    ],
    shoppingAliases: [],
  },

  "Tool Storage": {
    category: "Hardware",
    productKeywords: [
      "Tool Storage",
    ],
    shoppingAliases: [],
  },

  "Turnbuckles": {
    category: "Hardware",
    productKeywords: [
      "Turnbuckles",
      "turnbuckle",
    ],
    shoppingAliases: [],
  },

  "Utility Knives": {
    category: "Hardware",
    productKeywords: [
      "Utility Knives",
      "utility knife",
    ],
    shoppingAliases: [
      "utility cutter",
    ],
  },

  "Valves": {
    category: "Hardware",
    productKeywords: [
      "Valves",
      "valve",
    ],
    shoppingAliases: [],
  },

  "Varnish": {
    category: "Hardware",
    productKeywords: [
      "Varnish",
    ],
    shoppingAliases: [],
  },

  "Vises": {
    category: "Hardware",
    productKeywords: [
      "Vises",
      "vise",
    ],
    shoppingAliases: [],
  },

  "Wall Plugs": {
    category: "Hardware",
    productKeywords: [
      "Wall Plugs",
      "wall plug",
    ],
    shoppingAliases: [
      "tox",
      "wall anchor",
    ],
  },

  "Wall Switches": {
    category: "Hardware",
    productKeywords: [
      "Wall Switches",
      "wall switche",
    ],
    shoppingAliases: [
      "switch",
      "switch ng ilaw",
    ],
  },

  "Washers": {
    category: "Hardware",
    productKeywords: [
      "Washers",
      "washer",
    ],
    shoppingAliases: [],
  },

  "Water Hoses": {
    category: "Hardware",
    productKeywords: [
      "Water Hoses",
      "water hose",
    ],
    shoppingAliases: [],
  },

  "Water Pumps": {
    category: "Hardware",
    productKeywords: [
      "Water Pumps",
      "water pump",
    ],
    shoppingAliases: [],
  },

  "Watering Cans": {
    category: "Hardware",
    productKeywords: [
      "Watering Cans",
      "watering can",
    ],
    shoppingAliases: [],
  },

  "Wheelbarrows": {
    category: "Hardware",
    productKeywords: [
      "Wheelbarrows",
      "wheelbarrow",
    ],
    shoppingAliases: [],
  },

  "Wire Brushes": {
    category: "Hardware",
    productKeywords: [
      "Wire Brushes",
      "wire brush",
    ],
    shoppingAliases: [],
  },

  "Wood Glue": {
    category: "Hardware",
    productKeywords: [
      "Wood Glue",
    ],
    shoppingAliases: [],
  },

  "Wood Screws": {
    category: "Hardware",
    productKeywords: [
      "Wood Screws",
      "wood screw",
    ],
    shoppingAliases: [],
  },

  "Wood Stain": {
    category: "Hardware",
    productKeywords: [
      "Wood Stain",
    ],
    shoppingAliases: [],
  },

  "Work Gloves": {
    category: "Hardware",
    productKeywords: [
      "Work Gloves",
      "work glove",
    ],
    shoppingAliases: [],
  },

  "Wrenches": {
    category: "Hardware",
    productKeywords: [
      "Wrenches",
      "wrench",
    ],
    shoppingAliases: [
      "liyabe",
    ],
  },

  "Artificial Plants": {
    category: "Home & Living",
    productKeywords: [
      "Artificial Plants",
      "artificial plant",
    ],
    shoppingAliases: [],
  },

  "Bed Frames": {
    category: "Home & Living",
    productKeywords: [
      "Bed Frames",
      "bed frame",
    ],
    shoppingAliases: [],
  },

  "Beds": {
    category: "Home & Living",
    productKeywords: [
      "Beds",
      "bed",
    ],
    shoppingAliases: [],
  },

  "Bedsheets": {
    category: "Home & Living",
    productKeywords: [
      "Bedsheets",
      "bedsheet",
    ],
    shoppingAliases: [],
  },

  "Blankets": {
    category: "Home & Living",
    productKeywords: [
      "Blankets",
      "blanket",
    ],
    shoppingAliases: [],
  },

  "Blinds": {
    category: "Home & Living",
    productKeywords: [
      "Blinds",
      "blind",
    ],
    shoppingAliases: [],
  },

  "Bookcases": {
    category: "Home & Living",
    productKeywords: [
      "Bookcases",
      "bookcase",
    ],
    shoppingAliases: [],
  },

  "Ceiling Lights": {
    category: "Home & Living",
    productKeywords: [
      "Ceiling Lights",
      "ceiling light",
    ],
    shoppingAliases: [],
  },

  "Chairs": {
    category: "Home & Living",
    productKeywords: [
      "Chairs",
      "chair",
    ],
    shoppingAliases: [],
  },

  "Clocks": {
    category: "Home & Living",
    productKeywords: [
      "Clocks",
      "clock",
    ],
    shoppingAliases: [],
  },

  "Closet Organizers": {
    category: "Home & Living",
    productKeywords: [
      "Closet Organizers",
      "closet organizer",
    ],
    shoppingAliases: [],
  },

  "Coffee Tables": {
    category: "Home & Living",
    productKeywords: [
      "Coffee Tables",
      "coffee table",
    ],
    shoppingAliases: [],
  },

  "Comforters": {
    category: "Home & Living",
    productKeywords: [
      "Comforters",
      "comforter",
    ],
    shoppingAliases: [],
  },

  "Cushions": {
    category: "Home & Living",
    productKeywords: [
      "Cushions",
      "cushion",
    ],
    shoppingAliases: [],
  },

  "Decorations": {
    category: "Home & Living",
    productKeywords: [
      "Decorations",
      "decoration",
    ],
    shoppingAliases: [],
  },

  "Diffusers": {
    category: "Home & Living",
    productKeywords: [
      "Diffusers",
      "diffuser",
    ],
    shoppingAliases: [],
  },

  "Dining Tables": {
    category: "Home & Living",
    productKeywords: [
      "Dining Tables",
      "dining table",
    ],
    shoppingAliases: [],
  },

  "Doormats": {
    category: "Home & Living",
    productKeywords: [
      "Doormats",
      "doormat",
    ],
    shoppingAliases: [],
  },

  "Floor Lamps": {
    category: "Home & Living",
    productKeywords: [
      "Floor Lamps",
      "floor lamp",
    ],
    shoppingAliases: [],
  },

  "Furniture": {
    category: "Home & Living",
    productKeywords: [
      "Furniture",
    ],
    shoppingAliases: [],
  },

  "Home Fragrance": {
    category: "Home & Living",
    productKeywords: [
      "Home Fragrance",
    ],
    shoppingAliases: [],
  },

  "Indoor Plants": {
    category: "Home & Living",
    productKeywords: [
      "Indoor Plants",
      "indoor plant",
    ],
    shoppingAliases: [],
  },

  "Lamps": {
    category: "Home & Living",
    productKeywords: [
      "Lamps",
      "lamp",
    ],
    shoppingAliases: [],
  },

  "Laundry Hampers": {
    category: "Home & Living",
    productKeywords: [
      "Laundry Hampers",
      "laundry hamper",
    ],
    shoppingAliases: [],
  },

  "LED Strips": {
    category: "Home & Living",
    productKeywords: [
      "LED Strips",
      "led strip",
    ],
    shoppingAliases: [],
  },

  "Mattress Protectors": {
    category: "Home & Living",
    productKeywords: [
      "Mattress Protectors",
      "mattress protector",
    ],
    shoppingAliases: [],
  },

  "Mattresses": {
    category: "Home & Living",
    productKeywords: [
      "Mattresses",
      "mattresse",
    ],
    shoppingAliases: [],
  },

  "Picture Frames": {
    category: "Home & Living",
    productKeywords: [
      "Picture Frames",
      "picture frame",
    ],
    shoppingAliases: [],
  },

  "Pillows": {
    category: "Home & Living",
    productKeywords: [
      "Pillows",
      "pillow",
    ],
    shoppingAliases: [],
  },

  "Quilts": {
    category: "Home & Living",
    productKeywords: [
      "Quilts",
      "quilt",
    ],
    shoppingAliases: [],
  },

  "Rugs": {
    category: "Home & Living",
    productKeywords: [
      "Rugs",
      "rug",
    ],
    shoppingAliases: [],
  },

  "Shoe Racks": {
    category: "Home & Living",
    productKeywords: [
      "Shoe Racks",
      "shoe rack",
    ],
    shoppingAliases: [],
  },

  "Sofas": {
    category: "Home & Living",
    productKeywords: [
      "Sofas",
      "sofa",
    ],
    shoppingAliases: [],
  },

  "Storage Baskets": {
    category: "Home & Living",
    productKeywords: [
      "Storage Baskets",
      "storage basket",
    ],
    shoppingAliases: [],
  },

  "Storage Boxes": {
    category: "Home & Living",
    productKeywords: [
      "Storage Boxes",
      "storage box",
    ],
    shoppingAliases: [],
  },

  "Table Lamps": {
    category: "Home & Living",
    productKeywords: [
      "Table Lamps",
      "table lamp",
    ],
    shoppingAliases: [],
  },

  "Tables": {
    category: "Home & Living",
    productKeywords: [
      "Tables",
      "table",
    ],
    shoppingAliases: [],
  },

  "Vases": {
    category: "Home & Living",
    productKeywords: [
      "Vases",
      "vase",
    ],
    shoppingAliases: [],
  },

  "Wall Art": {
    category: "Home & Living",
    productKeywords: [
      "Wall Art",
    ],
    shoppingAliases: [],
  },

  "Wardrobes": {
    category: "Home & Living",
    productKeywords: [
      "Wardrobes",
      "wardrobe",
    ],
    shoppingAliases: [],
  },

  "Bathroom Accessories": {
    category: "Home Improvement",
    productKeywords: [
      "Bathroom Accessories",
      "bathroom accessory",
    ],
    shoppingAliases: [],
  },

  "Bathroom Fixtures": {
    category: "Home Improvement",
    productKeywords: [
      "Bathroom Fixtures",
      "bathroom fixture",
    ],
    shoppingAliases: [],
  },

  "Bathtubs": {
    category: "Home Improvement",
    productKeywords: [
      "Bathtubs",
      "bathtub",
    ],
    shoppingAliases: [],
  },

  "Cabinets": {
    category: "Home Improvement",
    productKeywords: [
      "Cabinets",
      "cabinet",
    ],
    shoppingAliases: [],
  },

  "Carbon Monoxide Detectors": {
    category: "Home Improvement",
    productKeywords: [
      "Carbon Monoxide Detectors",
      "carbon monoxide detector",
    ],
    shoppingAliases: [],
  },

  "Carpets": {
    category: "Home Improvement",
    productKeywords: [
      "Carpets",
      "carpet",
    ],
    shoppingAliases: [],
  },

  "CCTV Accessories": {
    category: "Home Improvement",
    productKeywords: [
      "CCTV Accessories",
      "cctv accessory",
    ],
    shoppingAliases: [],
  },

  "Ceiling Panels": {
    category: "Home Improvement",
    productKeywords: [
      "Ceiling Panels",
      "ceiling panel",
    ],
    shoppingAliases: [],
  },

  "Curtain Rods": {
    category: "Home Improvement",
    productKeywords: [
      "Curtain Rods",
      "curtain rod",
    ],
    shoppingAliases: [],
  },

  "Curtains": {
    category: "Home Improvement",
    productKeywords: [
      "Curtains",
      "curtain",
    ],
    shoppingAliases: [],
  },

  "Door Bells": {
    category: "Home Improvement",
    productKeywords: [
      "Door Bells",
      "door bell",
    ],
    shoppingAliases: [],
  },

  "Doors": {
    category: "Home Improvement",
    productKeywords: [
      "Doors",
      "door",
    ],
    shoppingAliases: [],
  },

  "Flooring": {
    category: "Home Improvement",
    productKeywords: [
      "Flooring",
    ],
    shoppingAliases: [],
  },

  "Furniture Hardware": {
    category: "Home Improvement",
    productKeywords: [
      "Furniture Hardware",
    ],
    shoppingAliases: [],
  },

  "Home Automation": {
    category: "Home Improvement",
    productKeywords: [
      "Home Automation",
    ],
    shoppingAliases: [],
  },

  "Home Security": {
    category: "Home Improvement",
    productKeywords: [
      "Home Security",
    ],
    shoppingAliases: [],
  },

  "Kitchen Cabinets": {
    category: "Home Improvement",
    productKeywords: [
      "Kitchen Cabinets",
      "kitchen cabinet",
    ],
    shoppingAliases: [],
  },

  "Laminate Flooring": {
    category: "Home Improvement",
    productKeywords: [
      "Laminate Flooring",
    ],
    shoppingAliases: [],
  },

  "Mirrors": {
    category: "Home Improvement",
    productKeywords: [
      "Mirrors",
      "mirror",
    ],
    shoppingAliases: [],
  },

  "Roofing Materials": {
    category: "Home Improvement",
    productKeywords: [
      "Roofing Materials",
      "roofing material",
    ],
    shoppingAliases: [],
  },

  "Shelves": {
    category: "Home Improvement",
    productKeywords: [
      "Shelves",
      "shelf",
    ],
    shoppingAliases: [],
  },

  "Sinks": {
    category: "Home Improvement",
    productKeywords: [
      "Sinks",
      "sink",
    ],
    shoppingAliases: [],
  },

  "Smart Lighting": {
    category: "Home Improvement",
    productKeywords: [
      "Smart Lighting",
    ],
    shoppingAliases: [],
  },

  "Smart Plugs": {
    category: "Home Improvement",
    productKeywords: [
      "Smart Plugs",
      "smart plug",
    ],
    shoppingAliases: [],
  },

  "Smart Sensors": {
    category: "Home Improvement",
    productKeywords: [
      "Smart Sensors",
      "smart sensor",
    ],
    shoppingAliases: [],
  },

  "Smoke Detectors": {
    category: "Home Improvement",
    productKeywords: [
      "Smoke Detectors",
      "smoke detector",
    ],
    shoppingAliases: [],
  },

  "Storage Cabinets": {
    category: "Home Improvement",
    productKeywords: [
      "Storage Cabinets",
      "storage cabinet",
    ],
    shoppingAliases: [],
  },

  "Tiles": {
    category: "Home Improvement",
    productKeywords: [
      "Tiles",
      "tile",
    ],
    shoppingAliases: [],
  },

  "Toilets": {
    category: "Home Improvement",
    productKeywords: [
      "Toilets",
      "toilet",
    ],
    shoppingAliases: [],
  },

  "Vinyl Flooring": {
    category: "Home Improvement",
    productKeywords: [
      "Vinyl Flooring",
    ],
    shoppingAliases: [],
  },

  "Wall Panels": {
    category: "Home Improvement",
    productKeywords: [
      "Wall Panels",
      "wall panel",
    ],
    shoppingAliases: [],
  },

  "Wallpaper": {
    category: "Home Improvement",
    productKeywords: [
      "Wallpaper",
    ],
    shoppingAliases: [],
  },

  "Window Blinds": {
    category: "Home Improvement",
    productKeywords: [
      "Window Blinds",
      "window blind",
    ],
    shoppingAliases: [],
  },

  "Windows": {
    category: "Home Improvement",
    productKeywords: [
      "Windows",
      "window",
    ],
    shoppingAliases: [],
  },

  "Wood Flooring": {
    category: "Home Improvement",
    productKeywords: [
      "Wood Flooring",
    ],
    shoppingAliases: [],
  },

  "Air Freshener": {
    category: "Household",
    productKeywords: [
      "Air Freshener",
      "glade",
      "air wick",
      "ambipur",
    ],
    shoppingAliases: [
      "room spray",
      "pabango sa kwarto",
    ],
  },

  "Aluminum Foil": {
    category: "Household",
    productKeywords: [
      "Aluminum Foil",
    ],
    shoppingAliases: [],
  },

  "Baking Paper": {
    category: "Household",
    productKeywords: [
      "Baking Paper",
    ],
    shoppingAliases: [],
  },

  "Bathroom Cleaner": {
    category: "Household",
    productKeywords: [
      "Bathroom Cleaner",
    ],
    shoppingAliases: [
      "panlinis ng banyo",
    ],
  },

  "Bleach": {
    category: "Household",
    productKeywords: [
      "Bleach",
      "zonrox",
      "clorox",
    ],
    shoppingAliases: [],
  },

  "Brooms": {
    category: "Household",
    productKeywords: [
      "Brooms",
      "broom",
    ],
    shoppingAliases: [],
  },

  "Brushes": {
    category: "Household",
    productKeywords: [
      "Brushes",
      "brush",
    ],
    shoppingAliases: [],
  },

  "Buckets": {
    category: "Household",
    productKeywords: [
      "Buckets",
      "bucket",
    ],
    shoppingAliases: [
      "timba",
    ],
  },

  "Candles": {
    category: "Household",
    productKeywords: [
      "Candles",
      "candle",
    ],
    shoppingAliases: [
      "kandila",
    ],
  },

  "Cleaning Cloths": {
    category: "Household",
    productKeywords: [
      "Cleaning Cloths",
      "cleaning cloth",
    ],
    shoppingAliases: [
      "basahan",
      "cleaning rag",
    ],
  },

  "Cleaning Gloves": {
    category: "Household",
    productKeywords: [
      "Cleaning Gloves",
      "cleaning glove",
    ],
    shoppingAliases: [],
  },

  "Cleaning Tools": {
    category: "Household",
    productKeywords: [
      "Cleaning Tools",
      "cleaning tool",
    ],
    shoppingAliases: [],
  },

  "Clothes Hangers": {
    category: "Household",
    productKeywords: [
      "Clothes Hangers",
      "clothes hanger",
    ],
    shoppingAliases: [
      "sampayan hanger",
    ],
  },

  "Clothespins": {
    category: "Household",
    productKeywords: [
      "Clothespins",
      "clothespin",
    ],
    shoppingAliases: [
      "sipit",
    ],
  },

  "Dehumidifier": {
    category: "Household",
    productKeywords: [
      "Dehumidifier",
    ],
    shoppingAliases: [],
  },

  "Dishwasher Detergent": {
    category: "Household",
    productKeywords: [
      "Dishwasher Detergent",
    ],
    shoppingAliases: [],
  },

  "Dishwashing Liquid": {
    category: "Household",
    productKeywords: [
      "Dishwashing Liquid",
      "joy dishwashing",
      "smart dishwashing",
      "sunlight dishwashing",
      "axion dishwashing",
      "dawn",
    ],
    shoppingAliases: [
      "panghugas",
      "sabon panghugas",
    ],
  },

  "Dishwashing Paste": {
    category: "Household",
    productKeywords: [
      "Dishwashing Paste",
    ],
    shoppingAliases: [
      "panghugas",
    ],
  },

  "Dishwashing Sponges": {
    category: "Household",
    productKeywords: [
      "Dishwashing Sponges",
      "dishwashing sponge",
    ],
    shoppingAliases: [
      "sponge",
      "espongha",
    ],
  },

  "Disinfectant": {
    category: "Household",
    productKeywords: [
      "Disinfectant",
    ],
    shoppingAliases: [
      "disinfecting spray",
      "pang-disinfect",
    ],
  },

  "Disposable Cups": {
    category: "Household",
    productKeywords: [
      "Disposable Cups",
      "disposable cup",
    ],
    shoppingAliases: [
      "paper cup",
      "plastic cup",
    ],
  },

  "Disposable Cutlery": {
    category: "Household",
    productKeywords: [
      "Disposable Cutlery",
    ],
    shoppingAliases: [
      "plastic spoon",
      "plastic fork",
    ],
  },

  "Disposable Plates": {
    category: "Household",
    productKeywords: [
      "Disposable Plates",
      "disposable plate",
    ],
    shoppingAliases: [
      "paper plate",
      "plastic plate",
    ],
  },

  "Drain Cleaner": {
    category: "Household",
    productKeywords: [
      "Drain Cleaner",
    ],
    shoppingAliases: [],
  },

  "Dustpans": {
    category: "Household",
    productKeywords: [
      "Dustpans",
      "dustpan",
    ],
    shoppingAliases: [
      "pandakot",
    ],
  },

  "Emergency Supplies": {
    category: "Household",
    productKeywords: [
      "Emergency Supplies",
      "emergency supply",
    ],
    shoppingAliases: [],
  },

  "Fabric Conditioner": {
    category: "Household",
    productKeywords: [
      "Fabric Conditioner",
      "downy",
      "comfort fabric",
      "del fabric",
      "sofelle",
      "comfort fabric conditioner",
      "del fabric conditioner",
    ],
    shoppingAliases: [
      "fabcon",
    ],
  },

  "Facial Tissue": {
    category: "Household",
    productKeywords: [
      "Facial Tissue",
    ],
    shoppingAliases: [],
  },

  "Floor Cleaner": {
    category: "Household",
    productKeywords: [
      "Floor Cleaner",
      "mr clean",
      "pinesol",
      "lysol",
    ],
    shoppingAliases: [
      "panlinis ng sahig",
    ],
  },

  "Food Storage Bags": {
    category: "Household",
    productKeywords: [
      "Food Storage Bags",
      "food storage bag",
    ],
    shoppingAliases: [
      "ziplock",
      "zip bag",
    ],
  },

  "Food Storage Containers": {
    category: "Household",
    productKeywords: [
      "Food Storage Containers",
      "food storage container",
    ],
    shoppingAliases: [
      "lalagyan ng pagkain",
    ],
  },

  "Furniture Polish": {
    category: "Household",
    productKeywords: [
      "Furniture Polish",
    ],
    shoppingAliases: [],
  },

  "Garbage Bags": {
    category: "Household",
    productKeywords: [
      "Garbage Bags",
      "garbage bag",
    ],
    shoppingAliases: [
      "trash bag",
      "basurahan bag",
    ],
  },

  "Glass Cleaner": {
    category: "Household",
    productKeywords: [
      "Glass Cleaner",
    ],
    shoppingAliases: [
      "panlinis ng salamin",
    ],
  },

  "Insecticide": {
    category: "Household",
    productKeywords: [
      "Insecticide",
    ],
    shoppingAliases: [],
  },

  "Ironing Supplies": {
    category: "Household",
    productKeywords: [
      "Ironing Supplies",
      "ironing supply",
    ],
    shoppingAliases: [],
  },

  "Kitchen Cleaner": {
    category: "Household",
    productKeywords: [
      "Kitchen Cleaner",
    ],
    shoppingAliases: [
      "panlinis ng kusina",
    ],
  },

  "Laundry Additives": {
    category: "Household",
    productKeywords: [
      "Laundry Additives",
      "laundry additive",
    ],
    shoppingAliases: [],
  },

  "Laundry Baskets": {
    category: "Household",
    productKeywords: [
      "Laundry Baskets",
      "laundry basket",
    ],
    shoppingAliases: [
      "basket ng damit",
    ],
  },

  "Laundry Detergent": {
    category: "Household",
    productKeywords: [
      "Laundry Detergent",
      "tide",
      "ariel",
      "surf detergent",
      "breeze detergent",
      "champion detergent",
      "fab",
      "fab detergent",
    ],
    shoppingAliases: [
      "sabong panlaba",
    ],
  },

  "Laundry Soap": {
    category: "Household",
    productKeywords: [
      "Laundry Soap",
    ],
    shoppingAliases: [
      "sabong panlaba",
    ],
  },

  "Lighters": {
    category: "Household",
    productKeywords: [
      "Lighters",
      "lighter",
    ],
    shoppingAliases: [
      "sindi",
    ],
  },

  "Matches": {
    category: "Household",
    productKeywords: [
      "Matches",
      "match",
    ],
    shoppingAliases: [
      "posporo",
    ],
  },

  "Metal Polish": {
    category: "Household",
    productKeywords: [
      "Metal Polish",
    ],
    shoppingAliases: [],
  },

  "Moisture Absorber": {
    category: "Household",
    productKeywords: [
      "Moisture Absorber",
    ],
    shoppingAliases: [],
  },

  "Mold & Mildew Remover": {
    category: "Household",
    productKeywords: [
      "Mold & Mildew Remover",
      "mold and mildew remover",
      "mold mildew remover",
      "mold",
      "mildew remover",
    ],
    shoppingAliases: [],
  },

  "Mops": {
    category: "Household",
    productKeywords: [
      "Mops",
      "mop",
    ],
    shoppingAliases: [],
  },

  "Mosquito Repellent": {
    category: "Household",
    productKeywords: [
      "Mosquito Repellent",
    ],
    shoppingAliases: [
      "katol",
      "lamok repellent",
    ],
  },

  "Multipurpose Cleaner": {
    category: "Household",
    productKeywords: [
      "Multipurpose Cleaner",
    ],
    shoppingAliases: [
      "general cleaner",
    ],
  },

  "Paper Towels": {
    category: "Household",
    productKeywords: [
      "Paper Towels",
      "paper towel",
    ],
    shoppingAliases: [
      "kitchen towel",
    ],
  },

  "Pest Control": {
    category: "Household",
    productKeywords: [
      "Pest Control",
    ],
    shoppingAliases: [],
  },

  "Plastic Wrap": {
    category: "Household",
    productKeywords: [
      "Plastic Wrap",
    ],
    shoppingAliases: [],
  },

  "Scrubbers": {
    category: "Household",
    productKeywords: [
      "Scrubbers",
      "scrubber",
    ],
    shoppingAliases: [
      "scrub",
    ],
  },

  "Shoe Care": {
    category: "Household",
    productKeywords: [
      "Shoe Care",
    ],
    shoppingAliases: [],
  },

  "Stain Remover": {
    category: "Household",
    productKeywords: [
      "Stain Remover",
    ],
    shoppingAliases: [],
  },

  "Straws": {
    category: "Household",
    productKeywords: [
      "Straws",
      "straw",
    ],
    shoppingAliases: [],
  },

  "Table Napkins": {
    category: "Household",
    productKeywords: [
      "Table Napkins",
      "table napkin",
    ],
    shoppingAliases: [
      "napkin",
      "table tissue",
    ],
  },

  "Toilet Cleaner": {
    category: "Household",
    productKeywords: [
      "Toilet Cleaner",
      "harpic",
      "sani flush",
    ],
    shoppingAliases: [
      "panlinis ng toilet",
      "panlinis ng banyo",
    ],
  },

  "Toilet Paper": {
    category: "Household",
    productKeywords: [
      "Toilet Paper",
    ],
    shoppingAliases: [],
  },

  "Trash Bins": {
    category: "Household",
    productKeywords: [
      "Trash Bins",
      "trash bin",
    ],
    shoppingAliases: [
      "trash can",
      "garbage can",
      "basurahan",
    ],
  },

  "Wax Paper": {
    category: "Household",
    productKeywords: [
      "Wax Paper",
    ],
    shoppingAliases: [],
  },

  "Wet Wipes": {
    category: "Household",
    productKeywords: [
      "Wet Wipes",
      "wet wipe",
    ],
    shoppingAliases: [
      "wipes",
    ],
  },

  "Bakeware": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Bakeware",
    ],
    shoppingAliases: [],
  },

  "Baking Trays": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Baking Trays",
      "baking tray",
    ],
    shoppingAliases: [],
  },

  "Bottle Openers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Bottle Openers",
      "bottle opener",
    ],
    shoppingAliases: [],
  },

  "Bowls": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Bowls",
      "bowl",
    ],
    shoppingAliases: [],
  },

  "Cake Pans": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Cake Pans",
      "cake pan",
    ],
    shoppingAliases: [],
  },

  "Can Openers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Can Openers",
      "can opener",
    ],
    shoppingAliases: [],
  },

  "Chopsticks": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Chopsticks",
      "chopstick",
    ],
    shoppingAliases: [],
  },

  "Colanders": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Colanders",
      "colander",
    ],
    shoppingAliases: [],
  },

  "Cookware": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Cookware",
    ],
    shoppingAliases: [],
  },

  "Cups": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Cups",
      "cup",
    ],
    shoppingAliases: [],
  },

  "Cutting Boards": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Cutting Boards",
      "cutting board",
    ],
    shoppingAliases: [],
  },

  "Dinnerware": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Dinnerware",
    ],
    shoppingAliases: [],
  },

  "Flatware": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Flatware",
    ],
    shoppingAliases: [],
  },

  "Food Containers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Food Containers",
      "food container",
    ],
    shoppingAliases: [],
  },

  "Food Storage": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Food Storage",
    ],
    shoppingAliases: [],
  },

  "Forks": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Forks",
      "fork",
    ],
    shoppingAliases: [],
  },

  "Frying Pans": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Frying Pans",
      "frying pan",
    ],
    shoppingAliases: [],
  },

  "Glasses": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Glasses",
      "glasse",
    ],
    shoppingAliases: [],
  },

  "Graters": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Graters",
      "grater",
    ],
    shoppingAliases: [],
  },

  "Kitchen Shears": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Kitchen Shears",
      "kitchen shear",
    ],
    shoppingAliases: [],
  },

  "Kitchen Towels": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Kitchen Towels",
      "kitchen towel",
    ],
    shoppingAliases: [],
  },

  "Kitchen Utensils": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Kitchen Utensils",
      "kitchen utensil",
    ],
    shoppingAliases: [],
  },

  "Knife Sets": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Knife Sets",
      "knife set",
    ],
    shoppingAliases: [],
  },

  "Knives": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Knives",
      "knife",
    ],
    shoppingAliases: [],
  },

  "Ladles": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Ladles",
      "ladle",
    ],
    shoppingAliases: [],
  },

  "Lunch Containers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Lunch Containers",
      "lunch container",
    ],
    shoppingAliases: [],
  },

  "Measuring Cups": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Measuring Cups",
      "measuring cup",
    ],
    shoppingAliases: [],
  },

  "Measuring Spoons": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Measuring Spoons",
      "measuring spoon",
    ],
    shoppingAliases: [],
  },

  "Mixing Bowls": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Mixing Bowls",
      "mixing bowl",
    ],
    shoppingAliases: [],
  },

  "Mugs": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Mugs",
      "mug",
    ],
    shoppingAliases: [],
  },

  "Napkins": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Napkins",
      "napkin",
    ],
    shoppingAliases: [],
  },

  "Oven Mitts": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Oven Mitts",
      "oven mitt",
    ],
    shoppingAliases: [],
  },

  "Peelers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Peelers",
      "peeler",
    ],
    shoppingAliases: [],
  },

  "Placemats": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Placemats",
      "placemat",
    ],
    shoppingAliases: [],
  },

  "Plates": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Plates",
      "plate",
    ],
    shoppingAliases: [],
  },

  "Saucepans": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Saucepans",
      "saucepan",
    ],
    shoppingAliases: [],
  },

  "Serving Platters": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Serving Platters",
      "serving platter",
    ],
    shoppingAliases: [],
  },

  "Serving Trays": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Serving Trays",
      "serving tray",
    ],
    shoppingAliases: [],
  },

  "Serving Utensils": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Serving Utensils",
      "serving utensil",
    ],
    shoppingAliases: [],
  },

  "Spatulas": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Spatulas",
      "spatula",
    ],
    shoppingAliases: [],
  },

  "Spoons": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Spoons",
      "spoon",
    ],
    shoppingAliases: [],
  },

  "Stock Pots": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Stock Pots",
      "stock pot",
    ],
    shoppingAliases: [],
  },

  "Strainers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Strainers",
      "strainer",
    ],
    shoppingAliases: [],
  },

  "Table Knives": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Table Knives",
      "table knife",
    ],
    shoppingAliases: [],
  },

  "Tablecloths": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Tablecloths",
      "tablecloth",
    ],
    shoppingAliases: [],
  },

  "Tongs": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Tongs",
      "tong",
    ],
    shoppingAliases: [],
  },

  "Tumblers": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Tumblers",
      "tumbler",
    ],
    shoppingAliases: [],
  },

  "Whisks": {
    category: "Kitchen & Dining",
    productKeywords: [
      "Whisks",
      "whisk",
    ],
    shoppingAliases: [],
  },

  "Allergy Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Allergy Medicine",
      "loratadine",
      "cetirizine",
      "allerta",
      "benadryl",
    ],
    shoppingAliases: [
      "gamot sa allergy",
    ],
  },

  "Antacids": {
    category: "Medicine & Health",
    productKeywords: [
      "Antacids",
      "antacid",
      "kremil s",
      "gaviscon",
      "mylanta",
      "alka seltzer",
    ],
    shoppingAliases: [
      "gamot sa hyperacidity",
    ],
  },

  "Antibiotics": {
    category: "Medicine & Health",
    productKeywords: [
      "Antibiotics",
      "antibiotic",
    ],
    shoppingAliases: [],
  },

  "Antifungal": {
    category: "Medicine & Health",
    productKeywords: [
      "Antifungal",
    ],
    shoppingAliases: [],
  },

  "Antiseptics": {
    category: "Medicine & Health",
    productKeywords: [
      "Antiseptics",
      "antiseptic",
    ],
    shoppingAliases: [
      "panglinis ng sugat",
    ],
  },

  "Antiviral": {
    category: "Medicine & Health",
    productKeywords: [
      "Antiviral",
    ],
    shoppingAliases: [],
  },

  "Bandages": {
    category: "Medicine & Health",
    productKeywords: [
      "Bandages",
      "bandage",
      "band aid",
    ],
    shoppingAliases: [],
  },

  "Betadine": {
    category: "Medicine & Health",
    productKeywords: [
      "Betadine",
      "povidone iodine",
    ],
    shoppingAliases: [],
  },

  "Blood Pressure Monitors": {
    category: "Medicine & Health",
    productKeywords: [
      "Blood Pressure Monitors",
      "blood pressure monitor",
    ],
    shoppingAliases: [],
  },

  "Blood Sugar Monitors": {
    category: "Medicine & Health",
    productKeywords: [
      "Blood Sugar Monitors",
      "blood sugar monitor",
    ],
    shoppingAliases: [],
  },

  "Calcium": {
    category: "Medicine & Health",
    productKeywords: [
      "Calcium",
    ],
    shoppingAliases: [],
  },

  "Cold Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Cold Medicine",
      "decolgen",
      "neozep",
      "sinutab",
      "dayquil",
    ],
    shoppingAliases: [
      "gamot sa sipon",
      "sipon medicine",
    ],
  },

  "Cotton": {
    category: "Medicine & Health",
    productKeywords: [
      "Cotton",
    ],
    shoppingAliases: [
      "bulak",
    ],
  },

  "Cough Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Cough Medicine",
      "robitussin",
      "ascof",
      "solmux",
      "lagundi",
      "dextromethorphan",
    ],
    shoppingAliases: [
      "gamot sa ubo",
    ],
  },

  "Diarrhea Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Diarrhea Medicine",
    ],
    shoppingAliases: [
      "gamot sa diarrhea",
      "gamot sa pagtatae",
    ],
  },

  "Digestive Health": {
    category: "Medicine & Health",
    productKeywords: [
      "Digestive Health",
    ],
    shoppingAliases: [],
  },

  "Ear Drops": {
    category: "Medicine & Health",
    productKeywords: [
      "Ear Drops",
      "ear drop",
    ],
    shoppingAliases: [
      "patak sa tenga",
    ],
  },

  "Eye Drops": {
    category: "Medicine & Health",
    productKeywords: [
      "Eye Drops",
      "eye drop",
    ],
    shoppingAliases: [
      "patak sa mata",
    ],
  },

  "Face Masks": {
    category: "Medicine & Health",
    productKeywords: [
      "Face Masks",
      "face mask",
    ],
    shoppingAliases: [
      "mask",
    ],
  },

  "Fever Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Fever Medicine",
    ],
    shoppingAliases: [
      "gamot sa lagnat",
      "fever meds",
    ],
  },

  "First Aid Kits": {
    category: "Medicine & Health",
    productKeywords: [
      "First Aid Kits",
      "first aid kit",
      "antiseptic wipe",
    ],
    shoppingAliases: [
      "first aid",
      "emergency kit",
    ],
  },

  "Fish Oil": {
    category: "Medicine & Health",
    productKeywords: [
      "Fish Oil",
    ],
    shoppingAliases: [],
  },

  "Flu Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Flu Medicine",
    ],
    shoppingAliases: [
      "gamot sa trangkaso",
    ],
  },

  "Gauze": {
    category: "Medicine & Health",
    productKeywords: [
      "Gauze",
    ],
    shoppingAliases: [
      "gasa",
    ],
  },

  "Herbal Supplements": {
    category: "Medicine & Health",
    productKeywords: [
      "Herbal Supplements",
      "herbal supplement",
    ],
    shoppingAliases: [],
  },

  "Hydrogen Peroxide": {
    category: "Medicine & Health",
    productKeywords: [
      "Hydrogen Peroxide",
    ],
    shoppingAliases: [
      "agua oxigenada",
    ],
  },

  "Iron Supplements": {
    category: "Medicine & Health",
    productKeywords: [
      "Iron Supplements",
      "iron supplement",
      "iron",
    ],
    shoppingAliases: [],
  },

  "Laxatives": {
    category: "Medicine & Health",
    productKeywords: [
      "Laxatives",
      "laxative",
    ],
    shoppingAliases: [
      "gamot sa constipation",
    ],
  },

  "Medical Gloves": {
    category: "Medicine & Health",
    productKeywords: [
      "Medical Gloves",
      "medical glove",
    ],
    shoppingAliases: [],
  },

  "Medical Supplies": {
    category: "Medicine & Health",
    productKeywords: [
      "Medical Supplies",
      "medical supply",
    ],
    shoppingAliases: [],
  },

  "Medical Tape": {
    category: "Medicine & Health",
    productKeywords: [
      "Medical Tape",
    ],
    shoppingAliases: [],
  },

  "Multivitamins": {
    category: "Medicine & Health",
    productKeywords: [
      "Multivitamins",
      "multivitamin",
      "enervon",
      "cherifer",
      "supradyn",
      "centrum",
    ],
    shoppingAliases: [],
  },

  "Nasal Spray": {
    category: "Medicine & Health",
    productKeywords: [
      "Nasal Spray",
    ],
    shoppingAliases: [],
  },

  "Nebulizers": {
    category: "Medicine & Health",
    productKeywords: [
      "Nebulizers",
      "nebulizer",
    ],
    shoppingAliases: [],
  },

  "Over-the-Counter Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Over-the-Counter Medicine",
      "over the counter medicine",
    ],
    shoppingAliases: [],
  },

  "Pain Relief": {
    category: "Medicine & Health",
    productKeywords: [
      "Pain Relief",
      "biogesic",
      "alaxan",
      "advil",
      "medicol",
      "tylenol",
      "mefenamic",
      "buscopan",
      "flanax",
      "mefenamic acid",
      "paracetamol",
      "ibuprofen",
    ],
    shoppingAliases: [
      "gamot sa sakit",
      "gamot sa sakit ng ulo",
    ],
  },

  "Prescription Medicine": {
    category: "Medicine & Health",
    productKeywords: [
      "Prescription Medicine",
    ],
    shoppingAliases: [],
  },

  "Probiotics": {
    category: "Medicine & Health",
    productKeywords: [
      "Probiotics",
      "probiotic",
    ],
    shoppingAliases: [],
  },

  "Thermometers": {
    category: "Medicine & Health",
    productKeywords: [
      "Thermometers",
      "thermometer",
    ],
    shoppingAliases: [
      "pangkuha ng temperature",
    ],
  },

  "Vitamin C": {
    category: "Medicine & Health",
    productKeywords: [
      "Vitamin C",
    ],
    shoppingAliases: [],
  },

  "Vitamin D": {
    category: "Medicine & Health",
    productKeywords: [
      "Vitamin D",
    ],
    shoppingAliases: [],
  },

  "Vitamins": {
    category: "Medicine & Health",
    productKeywords: [
      "Vitamins",
      "vitamin",
    ],
    shoppingAliases: [
      "bitamina",
    ],
  },

  "Bundles": {
    category: "Other",
    productKeywords: [
      "Bundles",
      "bundle",
    ],
    shoppingAliases: [],
  },

  "Clearance Items": {
    category: "Other",
    productKeywords: [
      "Clearance Items",
      "clearance item",
    ],
    shoppingAliases: [],
  },

  "Custom Items": {
    category: "Other",
    productKeywords: [
      "Custom Items",
      "custom item",
    ],
    shoppingAliases: [],
  },

  "Limited Edition": {
    category: "Other",
    productKeywords: [
      "Limited Edition",
    ],
    shoppingAliases: [],
  },

  "Miscellaneous": {
    category: "Other",
    productKeywords: [
      "Miscellaneous",
    ],
    shoppingAliases: [],
  },

  "Promotional Items": {
    category: "Other",
    productKeywords: [
      "Promotional Items",
      "promotional item",
    ],
    shoppingAliases: [],
  },

  "Refurbished Items": {
    category: "Other",
    productKeywords: [
      "Refurbished Items",
      "refurbished item",
    ],
    shoppingAliases: [],
  },

  "Seasonal Items": {
    category: "Other",
    productKeywords: [
      "Seasonal Items",
      "seasonal item",
    ],
    shoppingAliases: [],
  },

  "Uncategorized": {
    category: "Other",
    productKeywords: [
      "Uncategorized",
    ],
    shoppingAliases: [],
  },

  "Unknown": {
    category: "Other",
    productKeywords: [
      "Unknown",
    ],
    shoppingAliases: [],
  },

  "Baby Shower Supplies": {
    category: "Party & Events",
    productKeywords: [
      "Baby Shower Supplies",
      "baby shower supply",
    ],
    shoppingAliases: [],
  },

  "Balloon Accessories": {
    category: "Party & Events",
    productKeywords: [
      "Balloon Accessories",
      "balloon accessory",
    ],
    shoppingAliases: [],
  },

  "Balloons": {
    category: "Party & Events",
    productKeywords: [
      "Balloons",
      "balloon",
    ],
    shoppingAliases: [],
  },

  "Banners": {
    category: "Party & Events",
    productKeywords: [
      "Banners",
      "banner",
    ],
    shoppingAliases: [],
  },

  "Birthday Candles": {
    category: "Party & Events",
    productKeywords: [
      "Birthday Candles",
      "birthday candle",
    ],
    shoppingAliases: [],
  },

  "Cake Toppers": {
    category: "Party & Events",
    productKeywords: [
      "Cake Toppers",
      "cake topper",
    ],
    shoppingAliases: [],
  },

  "Christmas Decorations": {
    category: "Party & Events",
    productKeywords: [
      "Christmas Decorations",
      "christmas decoration",
    ],
    shoppingAliases: [],
  },

  "Confetti": {
    category: "Party & Events",
    productKeywords: [
      "Confetti",
    ],
    shoppingAliases: [],
  },

  "Costumes": {
    category: "Party & Events",
    productKeywords: [
      "Costumes",
      "costume",
    ],
    shoppingAliases: [],
  },

  "Event Decorations": {
    category: "Party & Events",
    productKeywords: [
      "Event Decorations",
      "event decoration",
    ],
    shoppingAliases: [],
  },

  "Gift Bags": {
    category: "Party & Events",
    productKeywords: [
      "Gift Bags",
      "gift bag",
    ],
    shoppingAliases: [],
  },

  "Gift Boxes": {
    category: "Party & Events",
    productKeywords: [
      "Gift Boxes",
      "gift box",
    ],
    shoppingAliases: [],
  },

  "Gift Ribbons": {
    category: "Party & Events",
    productKeywords: [
      "Gift Ribbons",
      "gift ribbon",
    ],
    shoppingAliases: [],
  },

  "Gift Wrap": {
    category: "Party & Events",
    productKeywords: [
      "Gift Wrap",
    ],
    shoppingAliases: [],
  },

  "Greeting Cards": {
    category: "Party & Events",
    productKeywords: [
      "Greeting Cards",
      "greeting card",
    ],
    shoppingAliases: [],
  },

  "Halloween Decorations": {
    category: "Party & Events",
    productKeywords: [
      "Halloween Decorations",
      "halloween decoration",
    ],
    shoppingAliases: [],
  },

  "Invitations": {
    category: "Party & Events",
    productKeywords: [
      "Invitations",
      "invitation",
    ],
    shoppingAliases: [],
  },

  "Masks": {
    category: "Party & Events",
    productKeywords: [
      "Masks",
      "mask",
    ],
    shoppingAliases: [],
  },

  "Party Decorations": {
    category: "Party & Events",
    productKeywords: [
      "Party Decorations",
      "party decoration",
    ],
    shoppingAliases: [],
  },

  "Party Favors": {
    category: "Party & Events",
    productKeywords: [
      "Party Favors",
      "party favor",
    ],
    shoppingAliases: [],
  },

  "Party Hats": {
    category: "Party & Events",
    productKeywords: [
      "Party Hats",
      "party hat",
    ],
    shoppingAliases: [],
  },

  "Photo Booth Props": {
    category: "Party & Events",
    productKeywords: [
      "Photo Booth Props",
      "photo booth prop",
    ],
    shoppingAliases: [],
  },

  "Streamers": {
    category: "Party & Events",
    productKeywords: [
      "Streamers",
      "streamer",
    ],
    shoppingAliases: [],
  },

  "Table Covers": {
    category: "Party & Events",
    productKeywords: [
      "Table Covers",
      "table cover",
    ],
    shoppingAliases: [],
  },

  "Wedding Supplies": {
    category: "Party & Events",
    productKeywords: [
      "Wedding Supplies",
      "wedding supply",
    ],
    shoppingAliases: [],
  },

  "Adult Diapers": {
    category: "Personal Care",
    productKeywords: [
      "Adult Diapers",
      "adult diaper",
    ],
    shoppingAliases: [],
  },

  "Aftershave": {
    category: "Personal Care",
    productKeywords: [
      "Aftershave",
    ],
    shoppingAliases: [],
  },

  "Baby Wipes": {
    category: "Personal Care",
    productKeywords: [
      "Baby Wipes",
      "baby wipe",
    ],
    shoppingAliases: [
      "wipes",
      "baby tissue",
    ],
  },

  "Bath Accessories": {
    category: "Personal Care",
    productKeywords: [
      "Bath Accessories",
      "bath accessory",
    ],
    shoppingAliases: [],
  },

  "Body Cream": {
    category: "Personal Care",
    productKeywords: [
      "Body Cream",
    ],
    shoppingAliases: [],
  },

  "Body Lotion": {
    category: "Personal Care",
    productKeywords: [
      "Body Lotion",
      "vaseline",
      "ponds",
      "nivea",
      "johnson's baby lotion",
    ],
    shoppingAliases: [],
  },

  "Body Spray": {
    category: "Personal Care",
    productKeywords: [
      "Body Spray",
    ],
    shoppingAliases: [
      "spray",
      "pabango",
    ],
  },

  "Body Wash": {
    category: "Personal Care",
    productKeywords: [
      "Body Wash",
      "dove body wash",
      "palmer's",
      "lux",
    ],
    shoppingAliases: [
      "liquid soap",
      "body soap",
    ],
  },

  "Cologne": {
    category: "Personal Care",
    productKeywords: [
      "Cologne",
    ],
    shoppingAliases: [
      "pabango",
    ],
  },

  "Combs": {
    category: "Personal Care",
    productKeywords: [
      "Combs",
      "comb",
    ],
    shoppingAliases: [
      "suklay",
    ],
  },

  "Conditioner": {
    category: "Personal Care",
    productKeywords: [
      "Conditioner",
    ],
    shoppingAliases: [
      "hair conditioner",
    ],
  },

  "Cotton Balls": {
    category: "Personal Care",
    productKeywords: [
      "Cotton Balls",
      "cotton ball",
    ],
    shoppingAliases: [
      "cotton",
    ],
  },

  "Cotton Buds": {
    category: "Personal Care",
    productKeywords: [
      "Cotton Buds",
      "cotton bud",
    ],
    shoppingAliases: [
      "ear buds",
    ],
  },

  "Dental Floss": {
    category: "Personal Care",
    productKeywords: [
      "Dental Floss",
    ],
    shoppingAliases: [],
  },

  "Deodorant": {
    category: "Personal Care",
    productKeywords: [
      "Deodorant",
    ],
    shoppingAliases: [],
  },

  "Disposable Gloves": {
    category: "Personal Care",
    productKeywords: [
      "Disposable Gloves",
      "disposable glove",
    ],
    shoppingAliases: [],
  },

  "Face Mask": {
    category: "Personal Care",
    productKeywords: [
      "Face Mask",
    ],
    shoppingAliases: [
      "mask",
    ],
  },

  "Feminine Care": {
    category: "Personal Care",
    productKeywords: [
      "Feminine Care",
    ],
    shoppingAliases: [],
  },

  "Foot Care": {
    category: "Personal Care",
    productKeywords: [
      "Foot Care",
    ],
    shoppingAliases: [],
  },

  "Hair Accessories": {
    category: "Personal Care",
    productKeywords: [
      "Hair Accessories",
      "hair accessory",
    ],
    shoppingAliases: [
      "hair tie",
      "ponytail",
      "hair clip",
    ],
  },

  "Hair Brushes": {
    category: "Personal Care",
    productKeywords: [
      "Hair Brushes",
      "hair brush",
    ],
    shoppingAliases: [
      "hairbrush",
      "brush",
    ],
  },

  "Hair Color": {
    category: "Personal Care",
    productKeywords: [
      "Hair Color",
    ],
    shoppingAliases: [],
  },

  "Hair Styling": {
    category: "Personal Care",
    productKeywords: [
      "Hair Styling",
    ],
    shoppingAliases: [],
  },

  "Hair Treatment": {
    category: "Personal Care",
    productKeywords: [
      "Hair Treatment",
    ],
    shoppingAliases: [],
  },

  "Hand Cream": {
    category: "Personal Care",
    productKeywords: [
      "Hand Cream",
    ],
    shoppingAliases: [],
  },

  "Hand Sanitizer": {
    category: "Personal Care",
    productKeywords: [
      "Hand Sanitizer",
    ],
    shoppingAliases: [],
  },

  "Lip Balm": {
    category: "Personal Care",
    productKeywords: [
      "Lip Balm",
    ],
    shoppingAliases: [],
  },

  "Mouthwash": {
    category: "Personal Care",
    productKeywords: [
      "Mouthwash",
    ],
    shoppingAliases: [
      "mouth rinse",
    ],
  },

  "Nail Care": {
    category: "Personal Care",
    productKeywords: [
      "Nail Care",
    ],
    shoppingAliases: [],
  },

  "Nail Clippers": {
    category: "Personal Care",
    productKeywords: [
      "Nail Clippers",
      "nail clipper",
    ],
    shoppingAliases: [
      "pang-gupit ng kuko",
    ],
  },

  "Panty Liners": {
    category: "Personal Care",
    productKeywords: [
      "Panty Liners",
      "panty liner",
    ],
    shoppingAliases: [
      "liner",
      "pantyliner",
    ],
  },

  "Perfume": {
    category: "Personal Care",
    productKeywords: [
      "Perfume",
    ],
    shoppingAliases: [
      "pabango",
    ],
  },

  "Petroleum Jelly": {
    category: "Personal Care",
    productKeywords: [
      "Petroleum Jelly",
    ],
    shoppingAliases: [
      "petroleum",
    ],
  },

  "Razors": {
    category: "Personal Care",
    productKeywords: [
      "Razors",
      "razor",
    ],
    shoppingAliases: [
      "pang-ahit",
    ],
  },

  "Rubbing Alcohol": {
    category: "Personal Care",
    productKeywords: [
      "Rubbing Alcohol",
      "isopropyl alcohol",
    ],
    shoppingAliases: [
      "alcohol",
    ],
  },

  "Sanitary Napkins": {
    category: "Personal Care",
    productKeywords: [
      "Sanitary Napkins",
      "sanitary napkin",
    ],
    shoppingAliases: [
      "napkin",
      "pads",
    ],
  },

  "Shampoo": {
    category: "Personal Care",
    productKeywords: [
      "Shampoo",
      "head and shoulders",
      "head & shoulders",
      "sunsilk",
      "cream silk",
      "pantene",
      "clear shampoo",
      "tresemme",
    ],
    shoppingAliases: [
      "siyampu",
    ],
  },

  "Shaving Cream": {
    category: "Personal Care",
    productKeywords: [
      "Shaving Cream",
    ],
    shoppingAliases: [],
  },

  "Soap": {
    category: "Personal Care",
    productKeywords: [
      "Soap",
      "safeguard",
      "dove beauty bar",
      "bioderm",
      "irish spring",
      "kojie san",
      "lifebuoy",
    ],
    shoppingAliases: [
      "body soap",
      "sabon",
    ],
  },

  "Tampons": {
    category: "Personal Care",
    productKeywords: [
      "Tampons",
      "tampon",
    ],
    shoppingAliases: [],
  },

  "Tissues": {
    category: "Personal Care",
    productKeywords: [
      "Tissues",
      "tissue",
    ],
    shoppingAliases: [],
  },

  "Toothbrush": {
    category: "Personal Care",
    productKeywords: [
      "Toothbrush",
    ],
    shoppingAliases: [
      "sipilyo",
    ],
  },

  "Toothpaste": {
    category: "Personal Care",
    productKeywords: [
      "Toothpaste",
      "colgate",
      "closeup",
      "close up",
      "sensodyne",
      "happee toothpaste",
      "aquafresh",
    ],
    shoppingAliases: [
      "pasta ng ngipin",
    ],
  },

  "Travel Toiletries": {
    category: "Personal Care",
    productKeywords: [
      "Travel Toiletries",
      "travel toiletry",
    ],
    shoppingAliases: [],
  },

  "Aquarium Decorations": {
    category: "Pet Supplies",
    productKeywords: [
      "Aquarium Decorations",
      "aquarium decoration",
    ],
    shoppingAliases: [],
  },

  "Aquarium Filters": {
    category: "Pet Supplies",
    productKeywords: [
      "Aquarium Filters",
      "aquarium filter",
    ],
    shoppingAliases: [],
  },

  "Aquarium Lighting": {
    category: "Pet Supplies",
    productKeywords: [
      "Aquarium Lighting",
    ],
    shoppingAliases: [],
  },

  "Aquarium Pumps": {
    category: "Pet Supplies",
    productKeywords: [
      "Aquarium Pumps",
      "aquarium pump",
    ],
    shoppingAliases: [],
  },

  "Aquariums": {
    category: "Pet Supplies",
    productKeywords: [
      "Aquariums",
      "aquarium",
    ],
    shoppingAliases: [],
  },

  "Bird Cages": {
    category: "Pet Supplies",
    productKeywords: [
      "Bird Cages",
      "bird cage",
    ],
    shoppingAliases: [],
  },

  "Bird Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Bird Food",
    ],
    shoppingAliases: [
      "pagkain ng ibon",
      "birdfood",
    ],
  },

  "Cat Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Cat Food",
      "whiskas",
      "me-o",
      "smartheart cat",
      "royal canin cat",
      "friskies",
    ],
    shoppingAliases: [
      "pagkain ng pusa",
      "catfood",
    ],
  },

  "Cat Litter": {
    category: "Pet Supplies",
    productKeywords: [
      "Cat Litter",
    ],
    shoppingAliases: [
      "buhangin ng pusa",
    ],
  },

  "Chew Toys": {
    category: "Pet Supplies",
    productKeywords: [
      "Chew Toys",
      "chew toy",
    ],
    shoppingAliases: [],
  },

  "Dog Cages": {
    category: "Pet Supplies",
    productKeywords: [
      "Dog Cages",
      "dog cage",
    ],
    shoppingAliases: [],
  },

  "Dog Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Dog Food",
      "pedigree",
      "doggo dog food",
      "aozi dog",
      "royal canin dog",
      "alpo",
      "cesar",
    ],
    shoppingAliases: [
      "pagkain ng aso",
      "dogfood",
    ],
  },

  "Fish Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Fish Food",
    ],
    shoppingAliases: [
      "pagkain ng isda",
      "fishfood",
    ],
  },

  "Hamster Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Hamster Food",
    ],
    shoppingAliases: [],
  },

  "Litter Boxes": {
    category: "Pet Supplies",
    productKeywords: [
      "Litter Boxes",
      "litter box",
    ],
    shoppingAliases: [],
  },

  "Litter Scoops": {
    category: "Pet Supplies",
    productKeywords: [
      "Litter Scoops",
      "litter scoop",
    ],
    shoppingAliases: [],
  },

  "Pet Beds": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Beds",
      "pet bed",
    ],
    shoppingAliases: [],
  },

  "Pet Blankets": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Blankets",
      "pet blanket",
    ],
    shoppingAliases: [],
  },

  "Pet Bowls": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Bowls",
      "pet bowl",
    ],
    shoppingAliases: [
      "food bowl",
      "water bowl",
    ],
  },

  "Pet Brushes": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Brushes",
      "pet brush",
    ],
    shoppingAliases: [],
  },

  "Pet Carriers": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Carriers",
      "pet carrier",
    ],
    shoppingAliases: [],
  },

  "Pet Cleaning Supplies": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Cleaning Supplies",
      "pet cleaning supply",
    ],
    shoppingAliases: [],
  },

  "Pet Clothing": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Clothing",
    ],
    shoppingAliases: [],
  },

  "Pet Collars": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Collars",
      "dog collars",
      "dog collar",
    ],
    shoppingAliases: [
      "cat collar",
      "kwelyo",
    ],
  },

  "Pet Conditioner": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Conditioner",
    ],
    shoppingAliases: [],
  },

  "Pet Feeders": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Feeders",
      "pet feeder",
    ],
    shoppingAliases: [],
  },

  "Pet Grooming": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Grooming",
    ],
    shoppingAliases: [],
  },

  "Pet Harnesses": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Harnesses",
      "pet harnesse",
    ],
    shoppingAliases: [],
  },

  "Pet Leashes": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Leashes",
      "dog leashes",
      "dog leash",
      "cat leash",
      "cat leashes",
    ],
    shoppingAliases: [
      "tali ng aso",
      "tali ng pusa",
    ],
  },

  "Pet Medicine": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Medicine",
    ],
    shoppingAliases: [],
  },

  "Pet Nail Clippers": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Nail Clippers",
      "pet nail clipper",
    ],
    shoppingAliases: [],
  },

  "Pet Shampoo": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Shampoo",
      "johnson pet shampoo",
      "tropiclean",
    ],
    shoppingAliases: [],
  },

  "Pet Soap": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Soap",
    ],
    shoppingAliases: [],
  },

  "Pet Supplements": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Supplements",
      "pet supplement",
    ],
    shoppingAliases: [],
  },

  "Pet Toothbrush": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Toothbrush",
    ],
    shoppingAliases: [],
  },

  "Pet Toothpaste": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Toothpaste",
    ],
    shoppingAliases: [],
  },

  "Pet Toys": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Toys",
      "pet toy",
    ],
    shoppingAliases: [
      "dog toy",
      "cat toy",
    ],
  },

  "Pet Training": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Training",
    ],
    shoppingAliases: [],
  },

  "Pet Treats": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Treats",
      "pet treat",
      "dog biscuit",
      "cat treat",
      "chew toy snack",
    ],
    shoppingAliases: [
      "pet snacks",
    ],
  },

  "Pet Vitamins": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Vitamins",
      "pet vitamin",
    ],
    shoppingAliases: [],
  },

  "Pet Water Dispensers": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Water Dispensers",
      "pet water dispenser",
    ],
    shoppingAliases: [],
  },

  "Pet Wipes": {
    category: "Pet Supplies",
    productKeywords: [
      "Pet Wipes",
      "pet wipe",
    ],
    shoppingAliases: [],
  },

  "Rabbit Food": {
    category: "Pet Supplies",
    productKeywords: [
      "Rabbit Food",
    ],
    shoppingAliases: [],
  },

  "Scratching Posts": {
    category: "Pet Supplies",
    productKeywords: [
      "Scratching Posts",
      "scratching post",
    ],
    shoppingAliases: [],
  },

  "Bibles": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Bibles",
      "bible",
    ],
    shoppingAliases: [],
  },

  "Crosses": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Crosses",
      "crosse",
    ],
    shoppingAliases: [],
  },

  "Cultural Decorations": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Cultural Decorations",
      "cultural decoration",
    ],
    shoppingAliases: [],
  },

  "Festival Supplies": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Festival Supplies",
      "festival supply",
    ],
    shoppingAliases: [],
  },

  "Holy Water Bottles": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Holy Water Bottles",
      "holy water bottle",
    ],
    shoppingAliases: [],
  },

  "Incense": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Incense",
    ],
    shoppingAliases: [],
  },

  "Incense Holders": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Incense Holders",
      "incense holder",
    ],
    shoppingAliases: [],
  },

  "Offering Envelopes": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Offering Envelopes",
      "offering envelope",
    ],
    shoppingAliases: [],
  },

  "Prayer Books": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Prayer Books",
      "prayer book",
    ],
    shoppingAliases: [],
  },

  "Religious Decorations": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Religious Decorations",
      "religious decoration",
    ],
    shoppingAliases: [],
  },

  "Religious Jewelry": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Religious Jewelry",
    ],
    shoppingAliases: [],
  },

  "Religious Statues": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Religious Statues",
      "religious statue",
    ],
    shoppingAliases: [],
  },

  "Rosaries": {
    category: "Religious & Cultural Items",
    productKeywords: [
      "Rosaries",
      "rosary",
    ],
    shoppingAliases: [],
  },

  "Backpacks": {
    category: "School & Office Supplies",
    productKeywords: [
      "Backpacks",
      "backpack",
    ],
    shoppingAliases: [
      "bag",
    ],
  },

  "Ballpens": {
    category: "School & Office Supplies",
    productKeywords: [
      "Ballpens",
      "ballpen",
      "panda pen",
    ],
    shoppingAliases: [
      "bolpen",
    ],
  },

  "Binder Clips": {
    category: "School & Office Supplies",
    productKeywords: [
      "Binder Clips",
      "binder clip",
    ],
    shoppingAliases: [],
  },

  "Binders": {
    category: "School & Office Supplies",
    productKeywords: [
      "Binders",
      "binder",
    ],
    shoppingAliases: [],
  },

  "Bond Paper": {
    category: "School & Office Supplies",
    productKeywords: [
      "Bond Paper",
      "vellum paper",
    ],
    shoppingAliases: [
      "short bond paper",
      "long bond paper",
    ],
  },

  "Calculators": {
    category: "School & Office Supplies",
    productKeywords: [
      "Calculators",
      "calculator",
    ],
    shoppingAliases: [],
  },

  "Chalk": {
    category: "School & Office Supplies",
    productKeywords: [
      "Chalk",
    ],
    shoppingAliases: [],
  },

  "Colored Paper": {
    category: "School & Office Supplies",
    productKeywords: [
      "Colored Paper",
      "cartolina",
      "manila paper",
    ],
    shoppingAliases: [
      "color paper",
    ],
  },

  "Colored Pencils": {
    category: "School & Office Supplies",
    productKeywords: [
      "Colored Pencils",
      "colored pencil",
    ],
    shoppingAliases: [
      "color pencil",
    ],
  },

  "Compasses": {
    category: "School & Office Supplies",
    productKeywords: [
      "Compasses",
      "compass",
    ],
    shoppingAliases: [],
  },

  "Correction Fluid": {
    category: "School & Office Supplies",
    productKeywords: [
      "Correction Fluid",
    ],
    shoppingAliases: [
      "liquid eraser",
    ],
  },

  "Correction Tape": {
    category: "School & Office Supplies",
    productKeywords: [
      "Correction Tape",
    ],
    shoppingAliases: [
      "white tape",
    ],
  },

  "Crayons": {
    category: "School & Office Supplies",
    productKeywords: [
      "Crayons",
      "crayon",
      "crayola",
      "jumbo crayon",
    ],
    shoppingAliases: [
      "krayola",
    ],
  },

  "Desk Organizers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Desk Organizers",
      "desk organizer",
    ],
    shoppingAliases: [],
  },

  "Document Holders": {
    category: "School & Office Supplies",
    productKeywords: [
      "Document Holders",
      "document holder",
    ],
    shoppingAliases: [],
  },

  "Envelopes": {
    category: "School & Office Supplies",
    productKeywords: [
      "Envelopes",
      "envelope",
    ],
    shoppingAliases: [
      "sobre",
    ],
  },

  "Erasers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Erasers",
      "eraser",
    ],
    shoppingAliases: [
      "pambura",
    ],
  },

  "Folders": {
    category: "School & Office Supplies",
    productKeywords: [
      "Folders",
      "folder",
    ],
    shoppingAliases: [],
  },

  "Gel Pens": {
    category: "School & Office Supplies",
    productKeywords: [
      "Gel Pens",
      "gel pen",
      "dong a pen",
      "dong-a pen",
    ],
    shoppingAliases: [],
  },

  "Glue": {
    category: "School & Office Supplies",
    productKeywords: [
      "Glue",
      "elmer's glue",
      "white glue",
    ],
    shoppingAliases: [
      "paste",
      "pandikit",
    ],
  },

  "Glue Sticks": {
    category: "School & Office Supplies",
    productKeywords: [
      "Glue Sticks",
      "glue stick",
      "stick glue",
    ],
    shoppingAliases: [],
  },

  "Highlighters": {
    category: "School & Office Supplies",
    productKeywords: [
      "Highlighters",
      "highlighter",
    ],
    shoppingAliases: [],
  },

  "Index Cards": {
    category: "School & Office Supplies",
    productKeywords: [
      "Index Cards",
      "index card",
    ],
    shoppingAliases: [],
  },

  "Labels": {
    category: "School & Office Supplies",
    productKeywords: [
      "Labels",
      "label",
    ],
    shoppingAliases: [],
  },

  "Laminating Supplies": {
    category: "School & Office Supplies",
    productKeywords: [
      "Laminating Supplies",
      "laminating supply",
    ],
    shoppingAliases: [],
  },

  "Loose Leaf Paper": {
    category: "School & Office Supplies",
    productKeywords: [
      "Loose Leaf Paper",
    ],
    shoppingAliases: [],
  },

  "Lunch Boxes": {
    category: "School & Office Supplies",
    productKeywords: [
      "Lunch Boxes",
      "lunch box",
    ],
    shoppingAliases: [
      "baunan",
    ],
  },

  "Markers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Markers",
      "marker",
      "sharpie",
      "artline",
      "permanent marker",
    ],
    shoppingAliases: [
      "pentel pen",
    ],
  },

  "Mechanical Pencils": {
    category: "School & Office Supplies",
    productKeywords: [
      "Mechanical Pencils",
      "mechanical pencil",
    ],
    shoppingAliases: [],
  },

  "Notebooks": {
    category: "School & Office Supplies",
    productKeywords: [
      "Notebooks",
      "notebook",
      "oxford notebook",
      "spiral notebook",
    ],
    shoppingAliases: [
      "kwaderno",
    ],
  },

  "Office Accessories": {
    category: "School & Office Supplies",
    productKeywords: [
      "Office Accessories",
      "office accessory",
    ],
    shoppingAliases: [],
  },

  "Office Chairs": {
    category: "School & Office Supplies",
    productKeywords: [
      "Office Chairs",
      "office chair",
    ],
    shoppingAliases: [],
  },

  "Oil Pastels": {
    category: "School & Office Supplies",
    productKeywords: [
      "Oil Pastels",
      "oil pastel",
    ],
    shoppingAliases: [],
  },

  "Paint": {
    category: "School & Office Supplies",
    productKeywords: [
      "Paint",
      "boysen paint",
      "dulux",
      "glidden",
      "latex paint",
      "enamel paint",
    ],
    shoppingAliases: [
      "pintura",
    ],
  },

  "Paint Brushes": {
    category: "School & Office Supplies",
    productKeywords: [
      "Paint Brushes",
      "paint brush",
    ],
    shoppingAliases: [],
  },

  "Paper Clips": {
    category: "School & Office Supplies",
    productKeywords: [
      "Paper Clips",
      "paper clip",
    ],
    shoppingAliases: [],
  },

  "Pencils": {
    category: "School & Office Supplies",
    productKeywords: [
      "Pencils",
      "pencil",
      "mongol pencil",
      "faber castell pencil",
      "staedtler",
    ],
    shoppingAliases: [
      "lapis",
    ],
  },

  "Pens": {
    category: "School & Office Supplies",
    productKeywords: [
      "Pens",
      "pen",
      "pilot pen",
      "faber castell pen",
      "pentel",
      "uni-ball",
    ],
    shoppingAliases: [
      "ballpoint",
    ],
  },

  "Printer Ink": {
    category: "School & Office Supplies",
    productKeywords: [
      "Printer Ink",
    ],
    shoppingAliases: [
      "ink",
      "printer cartridge",
    ],
  },

  "Printer Paper": {
    category: "School & Office Supplies",
    productKeywords: [
      "Printer Paper",
    ],
    shoppingAliases: [],
  },

  "Printer Toner": {
    category: "School & Office Supplies",
    productKeywords: [
      "Printer Toner",
    ],
    shoppingAliases: [
      "toner",
    ],
  },

  "Protractors": {
    category: "School & Office Supplies",
    productKeywords: [
      "Protractors",
      "protractor",
    ],
    shoppingAliases: [],
  },

  "Rulers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Rulers",
      "ruler",
    ],
    shoppingAliases: [
      "regla",
    ],
  },

  "School Bags": {
    category: "School & Office Supplies",
    productKeywords: [
      "School Bags",
      "school bag",
    ],
    shoppingAliases: [
      "bag",
    ],
  },

  "Scissors": {
    category: "School & Office Supplies",
    productKeywords: [
      "Scissors",
      "scissor",
    ],
    shoppingAliases: [
      "gunting",
    ],
  },

  "Sharpeners": {
    category: "School & Office Supplies",
    productKeywords: [
      "Sharpeners",
      "sharpener",
    ],
    shoppingAliases: [
      "pantasa",
    ],
  },

  "Staplers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Staplers",
      "stapler",
    ],
    shoppingAliases: [],
  },

  "Staples": {
    category: "School & Office Supplies",
    productKeywords: [
      "Staples",
      "staple",
    ],
    shoppingAliases: [],
  },

  "Sticky Notes": {
    category: "School & Office Supplies",
    productKeywords: [
      "Sticky Notes",
      "sticky note",
    ],
    shoppingAliases: [],
  },

  "Water Bottles": {
    category: "School & Office Supplies",
    productKeywords: [
      "Water Bottles",
      "water bottle",
    ],
    shoppingAliases: [
      "tumbler",
    ],
  },

  "Watercolors": {
    category: "School & Office Supplies",
    productKeywords: [
      "Watercolors",
      "watercolor",
    ],
    shoppingAliases: [],
  },

  "Whiteboard Markers": {
    category: "School & Office Supplies",
    productKeywords: [
      "Whiteboard Markers",
      "whiteboard marker",
    ],
    shoppingAliases: [],
  },

  "Whiteboards": {
    category: "School & Office Supplies",
    productKeywords: [
      "Whiteboards",
      "whiteboard",
    ],
    shoppingAliases: [],
  },

  "Writing Pads": {
    category: "School & Office Supplies",
    productKeywords: [
      "Writing Pads",
      "writing pad",
      "long pad",
      "short pad",
    ],
    shoppingAliases: [
      "yellow pad",
    ],
  },

  "Convenience Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Convenience Fees",
      "convenience fee",
    ],
    shoppingAliases: [],
  },

  "Delivery Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Delivery Fees",
      "delivery fee",
    ],
    shoppingAliases: [],
  },

  "Gift Wrapping": {
    category: "Services & Fees",
    productKeywords: [
      "Gift Wrapping",
    ],
    shoppingAliases: [],
  },

  "Installation Services": {
    category: "Services & Fees",
    productKeywords: [
      "Installation Services",
      "installation service",
    ],
    shoppingAliases: [],
  },

  "Membership Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Membership Fees",
      "membership fee",
    ],
    shoppingAliases: [],
  },

  "Processing Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Processing Fees",
      "processing fee",
    ],
    shoppingAliases: [],
  },

  "Rental Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Rental Fees",
      "rental fee",
    ],
    shoppingAliases: [],
  },

  "Repair Services": {
    category: "Services & Fees",
    productKeywords: [
      "Repair Services",
      "repair service",
    ],
    shoppingAliases: [],
  },

  "Service Charges": {
    category: "Services & Fees",
    productKeywords: [
      "Service Charges",
      "service charge",
    ],
    shoppingAliases: [],
  },

  "Shipping Fees": {
    category: "Services & Fees",
    productKeywords: [
      "Shipping Fees",
      "shipping fee",
    ],
    shoppingAliases: [],
  },

  "Subscriptions": {
    category: "Services & Fees",
    productKeywords: [
      "Subscriptions",
      "subscription",
    ],
    shoppingAliases: [],
  },

  "Warranty Services": {
    category: "Services & Fees",
    productKeywords: [
      "Warranty Services",
      "warranty service",
    ],
    shoppingAliases: [],
  },

  "Badminton Rackets": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Badminton Rackets",
      "badminton racket",
    ],
    shoppingAliases: [],
  },

  "Badminton Shuttlecocks": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Badminton Shuttlecocks",
      "badminton shuttlecock",
    ],
    shoppingAliases: [],
  },

  "Barbells": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Barbells",
      "barbell",
    ],
    shoppingAliases: [],
  },

  "Baseballs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Baseballs",
      "baseball",
    ],
    shoppingAliases: [],
  },

  "Basketballs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Basketballs",
      "basketball",
    ],
    shoppingAliases: [],
  },

  "Beach Accessories": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Beach Accessories",
      "beach accessory",
    ],
    shoppingAliases: [],
  },

  "Bicycles": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Bicycles",
      "bicycle",
    ],
    shoppingAliases: [],
  },

  "Bike Accessories": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Bike Accessories",
      "bike accessory",
    ],
    shoppingAliases: [],
  },

  "Bike Helmets": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Bike Helmets",
      "bike helmet",
    ],
    shoppingAliases: [],
  },

  "Boxing Gloves": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Boxing Gloves",
      "boxing glove",
    ],
    shoppingAliases: [],
  },

  "Camping Chairs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Camping Chairs",
      "camping chair",
    ],
    shoppingAliases: [],
  },

  "Camping Tables": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Camping Tables",
      "camping table",
    ],
    shoppingAliases: [],
  },

  "Camping Tents": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Camping Tents",
      "camping tent",
    ],
    shoppingAliases: [],
  },

  "Coolers": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Coolers",
      "cooler",
    ],
    shoppingAliases: [],
  },

  "Dumbbells": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Dumbbells",
      "dumbbell",
    ],
    shoppingAliases: [],
  },

  "Elbow Pads": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Elbow Pads",
      "elbow pad",
    ],
    shoppingAliases: [],
  },

  "Exercise Bikes": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Exercise Bikes",
      "exercise bike",
    ],
    shoppingAliases: [],
  },

  "Fishing Baits": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fishing Baits",
      "fishing bait",
    ],
    shoppingAliases: [],
  },

  "Fishing Hooks": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fishing Hooks",
      "fishing hook",
    ],
    shoppingAliases: [],
  },

  "Fishing Lines": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fishing Lines",
      "fishing line",
    ],
    shoppingAliases: [],
  },

  "Fishing Reels": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fishing Reels",
      "fishing reel",
    ],
    shoppingAliases: [],
  },

  "Fishing Rods": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fishing Rods",
      "fishing rod",
    ],
    shoppingAliases: [],
  },

  "Fitness Equipment": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Fitness Equipment",
    ],
    shoppingAliases: [],
  },

  "Flashlights": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Flashlights",
      "flashlight",
    ],
    shoppingAliases: [],
  },

  "Footballs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Footballs",
      "football",
    ],
    shoppingAliases: [],
  },

  "Golf Balls": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Golf Balls",
      "golf ball",
    ],
    shoppingAliases: [],
  },

  "Golf Clubs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Golf Clubs",
      "golf club",
    ],
    shoppingAliases: [],
  },

  "Helmets": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Helmets",
      "helmet",
    ],
    shoppingAliases: [],
  },

  "Hiking Backpacks": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Hiking Backpacks",
      "hiking backpack",
    ],
    shoppingAliases: [],
  },

  "Jump Ropes": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Jump Ropes",
      "jump rope",
    ],
    shoppingAliases: [],
  },

  "Knee Pads": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Knee Pads",
      "knee pad",
    ],
    shoppingAliases: [],
  },

  "Lanterns": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Lanterns",
      "lantern",
    ],
    shoppingAliases: [],
  },

  "Life Jackets": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Life Jackets",
      "life jacket",
    ],
    shoppingAliases: [],
  },

  "Picnic Supplies": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Picnic Supplies",
      "picnic supply",
    ],
    shoppingAliases: [],
  },

  "Protective Gear": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Protective Gear",
    ],
    shoppingAliases: [],
  },

  "Punching Bags": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Punching Bags",
      "punching bag",
    ],
    shoppingAliases: [],
  },

  "Resistance Bands": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Resistance Bands",
      "resistance band",
    ],
    shoppingAliases: [],
  },

  "Sleeping Bags": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Sleeping Bags",
      "sleeping bag",
    ],
    shoppingAliases: [],
  },

  "Soccer Balls": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Soccer Balls",
      "soccer ball",
    ],
    shoppingAliases: [],
  },

  "Softballs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Softballs",
      "softball",
    ],
    shoppingAliases: [],
  },

  "Sports Bags": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Sports Bags",
      "sports bag",
    ],
    shoppingAliases: [],
  },

  "Sports Bottles": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Sports Bottles",
      "sports bottle",
    ],
    shoppingAliases: [],
  },

  "Swimming Caps": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Swimming Caps",
      "swimming cap",
    ],
    shoppingAliases: [],
  },

  "Swimming Goggles": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Swimming Goggles",
      "swimming goggle",
    ],
    shoppingAliases: [],
  },

  "Table Tennis Balls": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Table Tennis Balls",
      "table tennis ball",
    ],
    shoppingAliases: [],
  },

  "Table Tennis Paddles": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Table Tennis Paddles",
      "table tennis paddle",
    ],
    shoppingAliases: [],
  },

  "Tennis Balls": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Tennis Balls",
      "tennis ball",
    ],
    shoppingAliases: [],
  },

  "Tennis Rackets": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Tennis Rackets",
      "tennis racket",
    ],
    shoppingAliases: [],
  },

  "Treadmills": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Treadmills",
      "treadmill",
    ],
    shoppingAliases: [],
  },

  "Trekking Poles": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Trekking Poles",
      "trekking pole",
    ],
    shoppingAliases: [],
  },

  "Volleyballs": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Volleyballs",
      "volleyball",
    ],
    shoppingAliases: [],
  },

  "Weight Plates": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Weight Plates",
      "weight plate",
    ],
    shoppingAliases: [],
  },

  "Yoga Blocks": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Yoga Blocks",
      "yoga block",
    ],
    shoppingAliases: [],
  },

  "Yoga Mats": {
    category: "Sports & Outdoors",
    productKeywords: [
      "Yoga Mats",
      "yoga mat",
    ],
    shoppingAliases: [],
  },

  "Ashtrays": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Ashtrays",
      "ashtray",
    ],
    shoppingAliases: [],
  },

  "Cigarette Cases": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Cigarette Cases",
      "cigarette case",
    ],
    shoppingAliases: [],
  },

  "Cigarette Filters": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Cigarette Filters",
      "cigarette filter",
    ],
    shoppingAliases: [],
  },

  "Cigarettes": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Cigarettes",
      "cigarette",
    ],
    shoppingAliases: [],
  },

  "Cigars": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Cigars",
      "cigar",
    ],
    shoppingAliases: [],
  },

  "Humidors": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Humidors",
      "humidor",
    ],
    shoppingAliases: [],
  },

  "Pipe Tobacco": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Pipe Tobacco",
    ],
    shoppingAliases: [],
  },

  "Rolling Papers": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Rolling Papers",
      "rolling paper",
    ],
    shoppingAliases: [],
  },

  "Smoking Pipes": {
    category: "Tobacco Accessories",
    productKeywords: [
      "Smoking Pipes",
      "smoking pipe",
    ],
    shoppingAliases: [],
  },

  "Action Figures": {
    category: "Toys & Games",
    productKeywords: [
      "Action Figures",
      "action figure",
    ],
    shoppingAliases: [],
  },

  "Arts & Crafts": {
    category: "Toys & Games",
    productKeywords: [
      "Arts & Crafts",
      "arts and crafts",
      "arts crafts",
      "arts & craft",
      "arts",
      "crafts",
    ],
    shoppingAliases: [],
  },

  "Board Games": {
    category: "Toys & Games",
    productKeywords: [
      "Board Games",
      "board game",
    ],
    shoppingAliases: [],
  },

  "Bubbles": {
    category: "Toys & Games",
    productKeywords: [
      "Bubbles",
      "bubble",
    ],
    shoppingAliases: [],
  },

  "Building Blocks": {
    category: "Toys & Games",
    productKeywords: [
      "Building Blocks",
      "building block",
    ],
    shoppingAliases: [],
  },

  "Card Games": {
    category: "Toys & Games",
    productKeywords: [
      "Card Games",
      "card game",
    ],
    shoppingAliases: [],
  },

  "Checkers": {
    category: "Toys & Games",
    productKeywords: [
      "Checkers",
      "checker",
    ],
    shoppingAliases: [],
  },

  "Chess Sets": {
    category: "Toys & Games",
    productKeywords: [
      "Chess Sets",
      "chess set",
    ],
    shoppingAliases: [],
  },

  "Collectibles": {
    category: "Toys & Games",
    productKeywords: [
      "Collectibles",
      "collectible",
    ],
    shoppingAliases: [],
  },

  "Coloring Books": {
    category: "Toys & Games",
    productKeywords: [
      "Coloring Books",
      "coloring book",
    ],
    shoppingAliases: [],
  },

  "Construction Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Construction Toys",
      "construction toy",
    ],
    shoppingAliases: [],
  },

  "Doctor Playsets": {
    category: "Toys & Games",
    productKeywords: [
      "Doctor Playsets",
      "doctor playset",
    ],
    shoppingAliases: [],
  },

  "Dolls": {
    category: "Toys & Games",
    productKeywords: [
      "Dolls",
      "doll",
    ],
    shoppingAliases: [],
  },

  "Educational Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Educational Toys",
      "educational toy",
    ],
    shoppingAliases: [],
  },

  "Gaming Accessories": {
    category: "Toys & Games",
    productKeywords: [
      "Gaming Accessories",
      "gaming accessory",
    ],
    shoppingAliases: [],
  },

  "Gaming Consoles": {
    category: "Toys & Games",
    productKeywords: [
      "Gaming Consoles",
      "gaming console",
    ],
    shoppingAliases: [],
  },

  "Jigsaw Puzzles": {
    category: "Toys & Games",
    productKeywords: [
      "Jigsaw Puzzles",
      "jigsaw puzzle",
    ],
    shoppingAliases: [],
  },

  "Kitchen Playsets": {
    category: "Toys & Games",
    productKeywords: [
      "Kitchen Playsets",
      "kitchen playset",
    ],
    shoppingAliases: [],
  },

  "Kites": {
    category: "Toys & Games",
    productKeywords: [
      "Kites",
      "kite",
    ],
    shoppingAliases: [],
  },

  "Learning Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Learning Toys",
      "learning toy",
    ],
    shoppingAliases: [],
  },

  "Musical Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Musical Toys",
      "musical toy",
    ],
    shoppingAliases: [],
  },

  "Outdoor Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Outdoor Toys",
      "outdoor toy",
    ],
    shoppingAliases: [],
  },

  "Play Dough": {
    category: "Toys & Games",
    productKeywords: [
      "Play Dough",
    ],
    shoppingAliases: [],
  },

  "Pretend Play": {
    category: "Toys & Games",
    productKeywords: [
      "Pretend Play",
    ],
    shoppingAliases: [],
  },

  "Puzzles": {
    category: "Toys & Games",
    productKeywords: [
      "Puzzles",
      "puzzle",
    ],
    shoppingAliases: [],
  },

  "Remote Control Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Remote Control Toys",
      "remote control toy",
    ],
    shoppingAliases: [],
  },

  "Rubik's Cubes": {
    category: "Toys & Games",
    productKeywords: [
      "Rubik's Cubes",
      "rubik's cube",
    ],
    shoppingAliases: [],
  },

  "Slime": {
    category: "Toys & Games",
    productKeywords: [
      "Slime",
    ],
    shoppingAliases: [],
  },

  "Stuffed Toys": {
    category: "Toys & Games",
    productKeywords: [
      "Stuffed Toys",
      "stuffed toy",
    ],
    shoppingAliases: [],
  },

  "Tool Playsets": {
    category: "Toys & Games",
    productKeywords: [
      "Tool Playsets",
      "tool playset",
    ],
    shoppingAliases: [],
  },

  "Toy Cars": {
    category: "Toys & Games",
    productKeywords: [
      "Toy Cars",
      "toy car",
    ],
    shoppingAliases: [],
  },

  "Toy Instruments": {
    category: "Toys & Games",
    productKeywords: [
      "Toy Instruments",
      "toy instrument",
    ],
    shoppingAliases: [],
  },

  "Toy Storage": {
    category: "Toys & Games",
    productKeywords: [
      "Toy Storage",
    ],
    shoppingAliases: [],
  },

  "Toy Trains": {
    category: "Toys & Games",
    productKeywords: [
      "Toy Trains",
      "toy train",
    ],
    shoppingAliases: [],
  },

  "Toy Trucks": {
    category: "Toys & Games",
    productKeywords: [
      "Toy Trucks",
      "toy truck",
    ],
    shoppingAliases: [],
  },

  "Trading Cards": {
    category: "Toys & Games",
    productKeywords: [
      "Trading Cards",
      "trading card",
    ],
    shoppingAliases: [],
  },

  "Video Games": {
    category: "Toys & Games",
    productKeywords: [
      "Video Games",
      "video game",
    ],
    shoppingAliases: [],
  },

  "Water Guns": {
    category: "Toys & Games",
    productKeywords: [
      "Water Guns",
      "water gun",
    ],
    shoppingAliases: [],
  },
};

/**
 * Returns every term that may represent a
 * subcategory in a shopping-list entry.
 */
export const getShoppingTerms = (
  subcategory: string
): string[] => {
  const metadata =
    SUBCATEGORY_METADATA[subcategory];

  if (!metadata) {
    return [];
  }

  return [
    subcategory,
    ...metadata.productKeywords,
    ...metadata.shoppingAliases,
  ];
};

export function getSubcategoryMetadata(
  subcategory: string
): SubcategoryMetadataItem | undefined {
  const metadata =
    SUBCATEGORY_METADATA[subcategory];

  const unitMetadata =
    SUBCATEGORY_UNITS[subcategory];

  if (!metadata && !unitMetadata) {
    return undefined;
  }

  return {
    ...metadata,
    defaultUnit:
      unitMetadata?.defaultUnit,
    commonUnits:
      unitMetadata?.commonUnits,
  };
}
