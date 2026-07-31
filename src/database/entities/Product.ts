//shopper-assistant\src\database\entities\Product.ts
export interface Product{
	id:number;
	barcode:string;
	name:string;
	brand?:string;
	category?:string;
	subcategory?:string;
	packaging?:string;
	measurement?:number;
	measurementUnit?:string;
	quantity?:number;
	quantityUnit?:string;
	srp?:number;
	createdAt?:string;
}