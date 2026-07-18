export interface Product {
    id: number;
    barcode: string;
    name: string;
    brand?: string;
    category?: string;
    subcategory?: string;
    measurement: number;
    unit?: string;
    srp?: number;
    createdAt?: string;
}