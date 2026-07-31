export interface CartItem{
	productId:number;
	barcode:string;
	name:string;
	brand:string;
	category:string;
	packaging?:string;
	measurement?:number;
	measurementUnit?:string;
	productQuantity?:number;
	quantityUnit?:string;
	srp:number;
	price:number;
	quantity:number;
	subtotal:number;
}