export interface Store {
  id: number;
  name: string;
  shortName: string;
  logo: any;

  category:
    | "Supermarket"
    | "Convenience"
    | "Hardware"
    | "Pharmacy"
    | "Pet Shop"
    | "School Supplies"
    | "Grocery"
    | "Other";
}