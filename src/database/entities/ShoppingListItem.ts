export interface ShoppingListItem{
	id:number;
	shoppingListId:number;
	productId?:number;
	itemName?:string;
	quantity:number;
	checked:boolean;
}