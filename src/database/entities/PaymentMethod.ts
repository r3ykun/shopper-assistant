//shopper-assistant\src\database\entities\PaymentMethod.ts
export interface PaymentMethod{
	id:number;
	name:string;
	type:string;
	enabled:number;
	createdAt?:string;
}