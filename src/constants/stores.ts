import { Store } from "../database/entities/Store";

export const STORES: Store[] = [
  {
    id: 1,
    name: "SM Supermarket",
    shortName: "SM",
    logo: require("../assets/images/stores/SM.png"),
    category: "Supermarket",
  },

  {
    id: 2,
    name: "Robinsons Supermarket",
    shortName: "Robinsons",
    logo: require("../assets/images/stores/rob_market.jpg"),
    category: "Supermarket",
  },

  {
    id: 3,
    name: "Puregold",
    shortName: "Puregold",
    logo: require("../assets/images/stores/puregold.jpg"),
    category: "Supermarket",
  },

  {
    id: 4,
    name: "Alfamart",
    shortName: "Alfamart",
    logo: require("../assets/images/stores/alfamart.png"),
    category: "Convenience",
  },

  {
    id: 5,
    name: "7-Eleven",
    shortName: "7-Eleven",
    logo: require("../assets/images/stores/seven11.jpg"),
    category: "Convenience",
  },

  {
    id: 6,
    name: "Mercury Drug",
    shortName: "Mercury",
    logo: require("../assets/images/stores/mercury.png"),
    category: "Pharmacy",
  },

  {
    id: 7,
    name: "Ace Hardware",
    shortName: "ACE",
    logo: require("../assets/images/stores/ace.png"),
    category: "Hardware",
  },

  {
    id: 8,
    name: "Handyman",
    shortName: "Handyman",
    logo: require("../assets/images/stores/handyman.png"),
    category: "Hardware",
  },

  {
    id: 9,
    name: "MR. D.I.Y.",
    shortName: "MR. D.I.Y.",
    logo: require("../assets/images/stores/DIY.jpg"),
    category: "Hardware",
  },

  {
    id: 10,
    name: "Watsons Pharmacy",
    shortName: "Watsons",
    logo: require("../assets/images/stores/watsons.png"),
    category: "Pharmacy",
  },

  {
    id: 11,
    name: "DALI Everyday Grocery",
    shortName: "DALI",
    logo: require("../assets/images/stores/dali.png"),
    category: "Grocery",
  },

  {
    id: 12,
    name: "Rey-Sal Supermarket",
    shortName: "Rey-Sal",
    logo: require("../assets/images/stores/reysal.jpg"),
    category: "Supermarket",
  },

  {
    id: 13,
    name: "Uncle John's",
    shortName: "Uncle John's",
    logo: require("../assets/images/stores/uncleJohn.jpg"),
    category: "Convenience"
  }
];