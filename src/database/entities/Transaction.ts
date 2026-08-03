export interface Transaction{
	id:number;
	storeId:number;
	paymentMethod?:string;
	total:number;
	createdAt?:string;
}